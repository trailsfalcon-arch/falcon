import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Brand, brand, brandFromProfile, setBrand } from '../common/brand';

const REFRESH_MS = 60_000;

/**
 * Keeps the in-memory brand (common/brand.ts) in step with CompanyProfile.
 * Refreshes on a timer so every instance picks up a Settings change.
 */
@Injectable()
export class BrandService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BrandService.name);
  private timer?: NodeJS.Timeout;

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.refresh();
    this.timer = setInterval(() => void this.refresh(), REFRESH_MS);
    this.timer.unref?.();
  }

  onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  current(): Brand {
    return brand();
  }

  async refresh(): Promise<Brand> {
    try {
      const row = await this.prisma.companyProfile.findUnique({ where: { id: 'default' } });
      setBrand(brandFromProfile(row as any));
    } catch (err: any) {
      // Keep the last good brand; a DB blip must not rename the business.
      this.logger.warn(`Could not load company profile: ${err?.message ?? err}`);
    }
    return brand();
  }
}
