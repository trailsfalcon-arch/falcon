import { Injectable, Logger, Optional } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { decryptSecret } from '../common/crypto';
import { ContentTone, SocialPlatform } from '@prisma/client';
import { brand } from '../common/brand';

export interface GenerateCopyDto {
  destination: string; // e.g. "Leh", "Nubra Valley", "Pangong Tso", "Hanle"
  packageTitle?: string;
  season?: string; // e.g. "Spring", "Summer", "Autumn", "Winter"
  targetPlatform?: SocialPlatform;
  customPrompt?: string;
  tone?: ContentTone;
}

export interface GeneratedVariant {
  tone: ContentTone;
  title: string;
  caption: string;
  hook: string;
  cta: string;
  hashtags: string[];
}

export interface GenerationResult {
  destination: string;
  topic: string;
  variants: GeneratedVariant[];
  suggestedHashtags: string[];
  bestPostingTimes: { day: string; time: string }[];
}

export interface GenerateSocialImageDto {
  destination?: string;
  style?: string;
  customPrompt?: string;
}

export interface GeneratedImageResult {
  url: string;
  prompt: string;
  provider: string;
  model: string;
  base64?: string;
  seed: number;
}

@Injectable()
export class AiGeneratorService {
  private readonly logger = new Logger(AiGeneratorService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Optional() private readonly storage?: StorageService,
  ) {}

  /**
   * Generates a photorealistic travel image for social media using NVIDIA NIM FLUX.1
   * with seamless fallback to Pollinations FLUX.1.
   */
  async generateSocialImage(dto: GenerateSocialImageDto): Promise<GeneratedImageResult> {
    const dest = (dto.destination || 'Ladakh').toLowerCase();
    const style = dto.style || 'FLUX.1 Photorealistic 8K';
    const seed = Math.floor(Math.random() * 1000000);

    let basePrompt = '';
    if (dest.includes('hanle') || dest.includes('star') || dest.includes('dark sky')) {
      basePrompt = 'Award-winning night astrophotography of Hanle Dark Sky Reserve in Ladakh, dazzling Milky Way arching across crystal clear Himalayan night sky, astronomical observatory telescope silhouette, Changthang high altitude plateau, pin-sharp stars';
    } else if (dest.includes('pangong')) {
      basePrompt = 'Breathtaking ultra-realistic photo of Pangong Tso lake in Ladakh, vibrant gradient shades of deep turquoise and azure water, dramatic Himalayan mountain reflections, Tibetan prayer flags fluttering in foreground, bright sunny day';
    } else if (dest.includes('nubra') || dest.includes('hunder')) {
      basePrompt = 'Cinematic aerial drone shot of Hunder white sand dunes in Nubra Valley Ladakh, double-humped Bactrian camels resting in golden hour sunlight, towering snow-draped Karakoram mountain ranges in background';
    } else if (dest.includes('khardung') || dest.includes('pass') || dest.includes('road')) {
      basePrompt = 'Stunning wide-angle shot of Khardung La pass in Ladakh at 17,582 ft, colorful prayer flags blowing in wind, snow-covered mountain peaks, expedition 4x4 SUV parked on scenic mountain road, majestic Himalayan vista';
    } else if (dest.includes('monastery') || dest.includes('thiksey') || dest.includes('diskit') || dest.includes('hemis')) {
      basePrompt = 'Magnificent Thiksey Monastery perched on rocky hill in Ladakh, whitewashed stupas and red gompa buildings, golden morning sunlight, dramatic blue sky with soft clouds, ancient Tibetan Buddhist architecture';
    } else if (dest.includes('turtuk')) {
      basePrompt = 'Idyllic apricot blossom orchards in Turtuk border village Ladakh, traditional stone cottages, majestic Karakoram peaks in background, crystal clear turquoise river, soft ambient daylight';
    } else {
      basePrompt = 'Majestic panoramic view of Leh Palace and Shanti Stupa in Leh Ladakh, dramatic snow-dusted Himalayan mountain backdrop, warm golden hour sunlight, fluttering prayer flags, traditional Ladakhi architecture';
    }

    let styleModifiers = '8k resolution, photorealistic, cinematic lighting, shot on 35mm lens, natural colors, highly detailed';
    if (style.includes('Drone') || style.includes('Aerial')) {
      styleModifiers = 'high-altitude cinematic drone view, sweeping panorama, majestic scale, National Geographic travel photography';
    } else if (style.includes('Golden Hour')) {
      styleModifiers = 'warm golden hour sun flare, long dramatic shadows, amber and violet mountain glow, cinematic atmosphere';
    } else if (style.includes('Night') || style.includes('Astro')) {
      styleModifiers = 'deep space astrophotography, vibrant galactic core, long exposure, crisp mountain silhouette';
    } else if (style.includes('Culture') || style.includes('Monastery')) {
      styleModifiers = 'rich cultural heritage, intricate Buddhist architectural details, colorful silk prayer flags, authentic Himalayan atmosphere';
    }

    const fullPrompt = dto.customPrompt
      ? `${dto.customPrompt}. ${basePrompt}, ${styleModifiers}`
      : `${basePrompt}, ${styleModifiers}`;

    this.logger.log(`Generating social image with prompt: "${fullPrompt.slice(0, 100)}..."`);

    // 1. Try NVIDIA NIM FLUX.1 Schnell if active integration exists
    const nvidiaIntegration = await this.prisma.integration.findFirst({
      where: { provider: 'nvidia', isActive: true },
    });

    if (nvidiaIntegration) {
      try {
        const creds = JSON.parse(decryptSecret(nvidiaIntegration.credentials));
        const apiKey = creds.apiKey;
        if (apiKey) {
          this.logger.log('Attempting image generation via NVIDIA NIM FLUX.1 Schnell...');
          const res = await fetch('https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux-1-schnell', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              prompt: fullPrompt,
              mode: 'base',
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const b64 = data.artifacts?.[0]?.base64;
            if (b64) {
              const base64DataUrl = `data:image/jpeg;base64,${b64}`;
              let storageUrl: string | null = null;
              if (this.storage?.isConfigured) {
                try {
                  const buf = Buffer.from(b64, 'base64');
                  storageUrl = await this.storage.upload(buf, `flux-${Date.now()}.jpg`, 'social');
                } catch (storeErr: any) {
                  this.logger.warn(`Storage upload failed: ${storeErr.message}`);
                }
              }

              const fallbackPublicUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?model=flux&width=1080&height=1080&nologo=true&seed=${seed}`;

              return {
                url: storageUrl || fallbackPublicUrl,
                base64: base64DataUrl,
                prompt: fullPrompt,
                provider: 'nvidia',
                model: 'black-forest-labs/flux-1-schnell',
                seed,
              };
            }
          } else {
            const errText = await res.text();
            this.logger.warn(`NVIDIA NIM FLUX.1 call failed (${res.status}): ${errText.slice(0, 150)}. Failing over to Pollinations FLUX.1.`);
          }
        }
      } catch (err: any) {
        this.logger.warn(`NVIDIA NIM image generation error: ${err.message}. Failing over to Pollinations FLUX.1.`);
      }
    }

    // 2. High-speed, high-resolution Pollinations FLUX.1 fallback
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?model=flux&width=1080&height=1080&nologo=true&seed=${seed}`;

    return {
      url: pollinationsUrl,
      prompt: fullPrompt,
      provider: 'pollinations',
      model: 'flux-1-schnell',
      seed,
    };
  }

  /**
   * Generates 3 specialized social copy variants with curated hashtags and best posting time recommendations.
   */
  async generateSocialCopy(dto: GenerateCopyDto): Promise<GenerationResult> {
    const dest = dto.destination || 'Ladakh';
    const pkg = dto.packageTitle || `${dest} Holiday Experience`;
    const season = dto.season || 'Summer & Autumn';

    this.logger.log(`Generating AI social copy for destination: "${dest}", package: "${pkg}"`);

    // Multi-provider Failover: query all active AI integrations in priority order
    const activeAiIntegrations = this.prisma.integration?.findMany
      ? await this.prisma.integration.findMany({
          where: { category: 'AI', isActive: true },
          orderBy: [{ priority: 'desc' }, { updatedAt: 'desc' }],
        })
      : [];

    let liveAiGenerated: GeneratedVariant[] | null = null;
    let successfulProvider: string | null = null;

    for (const integration of activeAiIntegrations) {
      try {
        const creds = JSON.parse(decryptSecret(integration.credentials));
        const key = creds.apiKey;
        if (!key) continue;

        this.logger.log(`Attempting social generation via AI provider: ${integration.provider}`);

        if (integration.provider === 'google_gemini') {
          liveAiGenerated = await this.callGemini(key, dest, pkg, season, dto.customPrompt, creds.model);
        } else if (integration.provider === 'groq') {
          const model = creds.model || 'llama-3.3-70b-versatile';
          liveAiGenerated = await this.callOpenAiCompatible(
            'https://api.groq.com/openai/v1',
            key,
            model,
            dest,
            pkg,
            season,
            dto.customPrompt,
          );
        } else if (integration.provider === 'openrouter') {
          const model = creds.model || 'meta-llama/llama-3.3-70b-instruct:free';
          liveAiGenerated = await this.callOpenAiCompatible(
            'https://openrouter.ai/api/v1',
            key,
            model,
            dest,
            pkg,
            season,
            dto.customPrompt,
            { 'HTTP-Referer': brand().website, 'X-Title': `${brand().brandName} CRM` },
          );
        } else if (integration.provider === 'mistral') {
          const model = creds.model || 'mistral-small-latest';
          liveAiGenerated = await this.callOpenAiCompatible(
            'https://api.mistral.ai/v1',
            key,
            model,
            dest,
            pkg,
            season,
            dto.customPrompt,
          );
        } else if (integration.provider === 'deepseek') {
          liveAiGenerated = await this.callOpenAiCompatible(
            'https://api.deepseek.com',
            key,
            'deepseek-chat',
            dest,
            pkg,
            season,
            dto.customPrompt,
          );
        } else if (integration.provider === 'nvidia') {
          const model = creds.model || 'meta/llama-3.3-70b-instruct';
          liveAiGenerated = await this.callOpenAiCompatible(
            'https://integrate.api.nvidia.com/v1',
            key,
            model,
            dest,
            pkg,
            season,
            dto.customPrompt,
          );
        } else if (integration.provider === 'cerebras') {
          const model = creds.model || 'llama3.3-70b';
          liveAiGenerated = await this.callOpenAiCompatible(
            'https://api.cerebras.ai/v1',
            key,
            model,
            dest,
            pkg,
            season,
            dto.customPrompt,
          );
        } else if (integration.provider === 'sambanova') {
          const model = creds.model || 'Meta-Llama-3.3-70B-Instruct';
          liveAiGenerated = await this.callOpenAiCompatible(
            'https://api.sambanova.ai/v1',
            key,
            model,
            dest,
            pkg,
            season,
            dto.customPrompt,
          );
        } else if (integration.provider === 'openai') {
          liveAiGenerated = await this.callOpenAi(key, dest, pkg, season, dto.customPrompt);
        } else if (integration.provider === 'anthropic') {
          liveAiGenerated = await this.callAnthropic(key, dest, pkg, season, dto.customPrompt);
        }

        if (liveAiGenerated && liveAiGenerated.length > 0) {
          successfulProvider = integration.provider;
          this.logger.log(`Social AI copy generated successfully via provider: "${successfulProvider}"`);
          break; // Succeeded! Stop trying further providers
        }
      } catch (err: any) {
        this.logger.warn(
          `AI provider "${integration.provider}" failed (${err.message}). Failing over to next configured AI provider...`,
        );
      }
    }

    const variants = liveAiGenerated || this.buildSpecializedVariants(dest, pkg, season, dto.customPrompt);
    const suggestedHashtags = this.curateHashtags(dest);

    return {
      destination: dest,
      topic: `${dest} — ${pkg} (${season})`,
      variants,
      suggestedHashtags,
      bestPostingTimes: [
        { day: 'Wednesday & Friday', time: '11:00 AM – 1:00 PM IST' },
        { day: 'Saturday & Sunday', time: '7:30 PM – 9:30 PM IST' },
      ],
    };
  }

  /**
   * Built-in caption templates, used when no AI integration is configured or
   * the live call fails. They name the business from the company profile and
   * avoid operational promises (vehicle types, inclusions, payment terms), so
   * a fallback post never promises something the business does not do.
   */
  private buildSpecializedVariants(
    dest: string,
    pkg: string,
    season: string,
    customPrompt?: string,
  ): GeneratedVariant[] {
    const d = dest.toLowerCase();
    const isHanle = d.includes('hanle') || d.includes('moriri') || d.includes('star');
    const isNubra = d.includes('nubra') || d.includes('pangong') || d.includes('turtuk') || d.includes('khardung');
    const isRoad = d.includes('manali') || d.includes('bike') || d.includes('srinagar') || d.includes('road');
    const b = brand();
    const team = b.city ? `the ${b.brandName} team in ${b.city}` : `the ${b.brandName} team`;
    const handle = b.instagramUrl.split('/').filter(Boolean).pop();

    // ── Variant 1: Storytelling & Experiential ──────────────────────────────
    const storytellingCaption = isHanle
      ? `At 4,500 m in Hanle, the Milky Way is bright enough to cast a shadow. 🌌\n\nIndia's first Dark Sky Reserve, the Changthang plateau, Tso Moriri at dawn, and Umling La, the highest motorable road on earth.\n\nPlanned by ${team}, sequenced by altitude, around the night you came for.\n\n📍 ${pkg}\n📩 DM us or tap the link in bio for your itinerary.`
      : isNubra
      ? `Over Khardung La, down into the Hunder dunes, and on until the land stops and Pangong's impossible blue begins. 🏔️💙\n\nWe never send anyone to Pangong on day two. Two nights around Leh and a night in Nubra first, so the lake is something you remember for the right reasons.\n\n📍 ${pkg}\n📩 DM us or tap the link in bio for your itinerary.`
      : isRoad
      ? `Five passes above 4,000 m, and a road that is the whole point of the trip. 🛣️🏍️\n\nWe break the journey with overnight stops, so you arrive in Leh acclimatised instead of wrecked. Planned by ${team}.\n\n📍 ${pkg}\n📩 DM us or tap the link in bio for dates.`
      : `${dest}, planned properly. 🏔️\n\nA day-by-day plan built around how you like to travel, with time to actually enjoy each place.\n\nPlanned by ${team}.\n\n📍 ${pkg}\n📩 DM us or tap the link in bio for your itinerary.`;

    // ── Variant 2: Promotional ──────────────────────────────────────────────
    const promoCaption = `${pkg.toUpperCase()} | ${season} 🏔️\n\nPlan ${dest} with ${team}, not a call centre.\n\n👉 DM us${b.phone ? ` or WhatsApp ${b.phone}` : ''} for a day-by-day itinerary and an itemised quote.`;

    // ── Variant 3: Punchy Reel Hook / Short Form ────────────────────────────
    const reelCaption = `This is your sign to finally do ${dest}. ✈️🏔️\n\n3 things you cannot miss:\n1️⃣ Crossing Khardung La at 5,359 m\n2️⃣ Sunrise on Pangong Tso from a shoreline camp\n3️⃣ The Milky Way over Hanle\n\nSave this for your next trip and send it to your travel partner. 📲\n\n${handle ? `Tag @${handle} on your adventures ✨` : ''}`;

    const hashtags = this.curateHashtags(dest);

    return [
      {
        tone: ContentTone.STORYTELLING,
        title: 'Storytelling & Experiential',
        hook: storytellingCaption.split('\n')[0],
        caption: storytellingCaption,
        cta: 'DM us or tap the link in bio for your itinerary.',
        hashtags: hashtags.slice(0, 10),
      },
      {
        tone: ContentTone.PROMOTIONAL,
        title: 'Promotional',
        hook: `${pkg.toUpperCase()} | ${season}`,
        caption: promoCaption,
        cta: 'DM us or WhatsApp for an itemised quote.',
        hashtags: hashtags.slice(0, 8),
      },
      {
        tone: ContentTone.PUNCHY_REEL,
        title: 'Punchy Reel Hook & Viral Tags',
        hook: `This is your sign to finally do ${dest}. ✈️`,
        caption: reelCaption,
        cta: 'Save this reel & share with your travel partner!',
        hashtags: hashtags,
      },
    ];
  }

  private curateHashtags(dest: string): string[] {
    const base = [
      `#${brand().brandName.replace(/[^A-Za-z0-9]/g, '')}`,
      '#Ladakh',
      '#LehLadakh',
      '#IncredibleIndia',
      '#TravelIndia',
      '#Himalayas',
      '#Wanderlust',
    ];

    const destTags: Record<string, string[]> = {
      leh: ['#LehDiaries', '#LehPalace', '#ShantiStupa', '#ThikseyMonastery', '#ShamValley', '#Julley'],
      nubra: ['#NubraValley', '#KhardungLa', '#HunderDunes', '#Turtuk', '#DiskitMonastery'],
      pangong: ['#PangongTso', '#PangongLake', '#ChangLa', '#LadakhLakes'],
      hanle: ['#Hanle', '#HanleDarkSkyReserve', '#DarkSky', '#UmlingLa', '#TsoMoriri', '#Astrophotography'],
      manali: ['#ManaliToLeh', '#ManaliLehHighway', '#Sarchu', '#BaralachaLa', '#HimalayanRoadtrip'],
      bike: ['#LadakhBikeTrip', '#RoyalEnfield', '#ManaliToLeh', '#BikersOfIndia', '#HimalayanRoadtrip'],
      srinagar: ['#SrinagarToLeh', '#ZojiLa', '#Kargil', '#KashmirToLadakh'],
      ladakh: ['#LadakhTourism', '#PangongTso', '#NubraValley', '#KhardungLa', '#LehLadakhDiaries', '#HimalayanRoadtrip'],
    };

    const key = Object.keys(destTags).find((k) => dest.toLowerCase().includes(k)) || 'ladakh';
    return [...destTags[key], ...base];
  }

  private async callOpenAi(apiKey: string, dest: string, pkg: string, season: string, custom?: string) {
    const prompt = `You are an elite travel marketing copywriter for ${brand().brandName}, a ${brand().city || brand().state}-based tour operator covering ${brand().operatingRegion}.
Write 3 Instagram/Facebook captions for destination "${dest}", package "${pkg}", season "${season}".
Tone 1: Evocative storytelling.
Tone 2: High-converting promotional with package perks and clear CTA.
Do not promise specific vehicles, inclusions, support hours, awards or guarantees; the team adds those. ${brand().phone ? `Contact: WhatsApp ${brand().phone}. ` : ''}Do not invent prices, discounts or deadlines. For Ladakh, Indian travellers pay the environmental fee and do not need an Inner Line Permit; foreign nationals need a Protected Area Permit.
Tone 3: Short punchy reel hook.
Include emojis and 10 relevant hashtags.
Return strictly a JSON array of 3 objects with keys: { "tone": "STORYTELLING"|"PROMOTIONAL"|"PUNCHY_REEL", "title": string, "hook": string, "caption": string, "cta": string, "hashtags": string[] }`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    if (!res.ok) throw new Error(`OpenAI HTTP ${res.status}`);
    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return Array.isArray(parsed) ? parsed : parsed.variants || null;
  }

  private async callAnthropic(
    apiKey: string,
    dest: string,
    pkg: string,
    season: string,
    custom?: string,
  ) {
    const prompt = `You are an elite travel marketing copywriter for ${brand().brandName}, a ${brand().city || brand().state}-based tour operator covering ${brand().operatingRegion}.

Write exactly 3 social media captions for:
- Destination: "${dest}"
- Package: "${pkg}"
- Season: "${season}"
${custom ? `- Special focus: "${custom}"` : ''}

Tone 1 (STORYTELLING): Immersive, evocative, sensory — high passes, prayer flags, monasteries, Pangong's blue, the Hanle night sky.
Tone 2 (PROMOTIONAL): High-converting with package highlights and a clear WhatsApp CTA.
Tone 3 (PUNCHY_REEL): Ultra-short viral hook (1–2 lines), 3 bullet highlights, shareable energy.

Do not promise specific vehicles, inclusions, support hours, awards or guarantees; the team adds those. ${brand().phone ? `Contact: WhatsApp ${brand().phone}. ` : ''}Do not invent prices, discounts or deadlines. For Ladakh, Indian travellers pay the environmental fee and do not need an Inner Line Permit; foreign nationals need a Protected Area Permit.
Include authentic emojis. Add 10 destination-specific hashtags (e.g. #LadakhTourism #PangongTso).

Return ONLY a valid JSON array — no markdown, no code fences:
[
  {"tone": "STORYTELLING", "title": "...", "hook": "...", "caption": "...", "cta": "...", "hashtags": ["#...", ...]},
  {"tone": "PROMOTIONAL",  "title": "...", "hook": "...", "caption": "...", "cta": "...", "hashtags": ["#...", ...]},
  {"tone": "PUNCHY_REEL",  "title": "...", "hook": "...", "caption": "...", "cta": "...", "hashtags": ["#...", ...]}
]`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Anthropic API HTTP ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const rawText: string = data?.content?.[0]?.text ?? '';

    // Strip any accidental code fence wrapping
    const jsonStr = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    try {
      const parsed = JSON.parse(jsonStr);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      this.logger.warn('Anthropic returned non-JSON response, falling back to template engine');
      return null;
    }
  }

  private buildSocialPrompt(dest: string, pkg: string, season: string, custom?: string): string {
    return `You are an elite travel marketing copywriter for ${brand().brandName}, a ${brand().city || brand().state}-based tour operator covering ${brand().operatingRegion}.

Write exactly 3 social media captions for:
- Destination: "${dest}"
- Package: "${pkg}"
- Season: "${season}"
${custom ? `- Special focus: "${custom}"` : ''}

Tone 1 (STORYTELLING): Immersive, evocative, sensory — high passes, prayer flags, monasteries, Pangong's blue, the Hanle night sky.
Tone 2 (PROMOTIONAL): High-converting with package highlights and a clear WhatsApp CTA.
Tone 3 (PUNCHY_REEL): Ultra-short viral hook (1–2 lines), 3 bullet highlights, shareable energy.

Do not promise specific vehicles, inclusions, support hours, awards or guarantees; the team adds those. ${brand().phone ? `Contact: WhatsApp ${brand().phone}. ` : ''}Do not invent prices, discounts or deadlines. For Ladakh, Indian travellers pay the environmental fee and do not need an Inner Line Permit; foreign nationals need a Protected Area Permit.
Include authentic emojis. Add 10 destination-specific hashtags.

Return ONLY a valid JSON array — no markdown, no code fences:
[
  {"tone": "STORYTELLING", "title": "...", "hook": "...", "caption": "...", "cta": "...", "hashtags": ["#...", ...]},
  {"tone": "PROMOTIONAL",  "title": "...", "hook": "...", "caption": "...", "cta": "...", "hashtags": ["#...", ...]},
  {"tone": "PUNCHY_REEL",  "title": "...", "hook": "...", "caption": "...", "cta": "...", "hashtags": ["#...", ...]}
]`;
  }

  private async callOpenAiCompatible(
    baseUrl: string,
    apiKey: string,
    model: string,
    dest: string,
    pkg: string,
    season: string,
    custom?: string,
    extraHeaders?: Record<string, string>,
  ) {
    const prompt = this.buildSocialPrompt(dest, pkg, season, custom);
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...(extraHeaders || {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText.slice(0, 150)}`);
    }

    const data = await res.json();
    const rawText: string = data.choices?.[0]?.message?.content ?? '';
    const jsonStr = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    try {
      const parsed = JSON.parse(jsonStr);
      return Array.isArray(parsed) ? parsed : parsed.variants || null;
    } catch {
      this.logger.warn(`Model ${model} returned non-JSON response`);
      return null;
    }
  }

  private async callGemini(
    apiKey: string,
    dest: string,
    pkg: string,
    season: string,
    custom?: string,
    modelName?: string,
  ) {
    const prompt = this.buildSocialPrompt(dest, pkg, season, custom);
    const model = modelName || 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`;

    let res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!res.ok && model !== 'gemini-1.5-flash') {
      const fallbackEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      res = await fetch(fallbackEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
          },
        }),
      });
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API HTTP ${res.status}: ${errText.slice(0, 150)}`);
    }

    const data = await res.json();
    const rawText: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    const jsonStr = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

    try {
      const parsed = JSON.parse(jsonStr);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      this.logger.warn('Gemini returned non-JSON response');
      return null;
    }
  }
}

