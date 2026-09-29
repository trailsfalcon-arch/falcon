import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { publicBrand } from '../common/brand';

/** Public brand facts for the CRM login screen, candidate portal and website. */
@Public()
@Controller('brand')
export class BrandController {
  @Get()
  get() {
    return publicBrand();
  }
}
