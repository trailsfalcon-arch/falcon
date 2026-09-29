import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BrandService } from '../brand/brand.service';
import { UpdatePricingDto } from './dto/update-pricing.dto';

const SINGLETON_ID = 'default';

/** Company profile fields stored as non-null text. */
const REQUIRED_TEXT = [
  'legalName', 'brandName', 'address', 'city', 'state', 'stateCode', 'pincode',
  'country', 'phone', 'email', 'website', 'operatingRegion', 'documentPrefix',
] as const;

/** Company profile fields that may be cleared. */
const OPTIONAL_TEXT = [
  'tagline', 'gstin', 'pan', 'whatsapp', 'landerUrl', 'logoUrl', 'instagramUrl',
  'facebookUrl', 'bankName', 'accountNumber', 'ifscCode', 'accountHolder', 'upiId',
] as const;

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly brand: BrandService,
  ) {}

  /** Always returns a row — creates defaults on first call. */
  async getPricing() {
    const existing = await this.prisma.pricingSettings.findUnique({
      where: { id: SINGLETON_ID },
    });
    if (existing) return existing;
    return this.prisma.pricingSettings.create({ data: { id: SINGLETON_ID } });
  }

  async updatePricing(dto: UpdatePricingDto) {
    await this.getPricing();
    return this.prisma.pricingSettings.update({
      where: { id: SINGLETON_ID },
      data: { ...dto },
    });
  }

  /** Returns company identity and bank details for invoices and vouchers. */
  async getCompanyProfile() {
    const existing = await this.prisma.companyProfile.findUnique({
      where: { id: SINGLETON_ID },
    });
    if (existing) return existing;
    return this.prisma.companyProfile.create({ data: { id: SINGLETON_ID } });
  }

  async updateCompanyProfile(data: Record<string, unknown>) {
    await this.getCompanyProfile();
    const update: Record<string, string | null> = {};
    for (const key of REQUIRED_TEXT) {
      const v = data?.[key];
      if (typeof v === 'string') update[key] = v.trim().slice(0, 500);
    }
    for (const key of OPTIONAL_TEXT) {
      const v = data?.[key];
      if (typeof v === 'string') update[key] = v.trim() ? v.trim().slice(0, 500) : null;
      else if (v === null) update[key] = null;
    }
    if (update.brandName === '') delete update.brandName;
    if (update.legalName === '') delete update.legalName;
    const saved = await this.prisma.companyProfile.update({
      where: { id: SINGLETON_ID },
      data: update,
    });
    await this.brand.refresh();
    return saved;
  }
}
