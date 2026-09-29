import { DEFAULT_BRAND, brand, brandAddressLine, brandFromProfile, publicBrand, setBrand } from './brand';

describe('brand', () => {
  afterEach(() => setBrand(DEFAULT_BRAND));

  it('builds the brand from the company profile row', () => {
    const b = brandFromProfile({
      brandName: 'Acme Tours',
      legalName: '',
      website: 'www.acme-tours.com/about',
      landerUrl: 'go.acme-tours.com',
      whatsapp: '+91 98765-43210',
      documentPrefix: 'ac-1',
      city: 'Jammu',
      state: 'Jammu & Kashmir',
      pincode: '180001',
      address: '',
    });
    expect(b.brandName).toBe('Acme Tours');
    expect(b.legalName).toBe('Acme Tours');
    expect(b.website).toBe('https://www.acme-tours.com');
    expect(b.host).toBe('acme-tours.com');
    expect(b.landerUrl).toBe('https://go.acme-tours.com');
    expect(b.whatsapp).toBe('919876543210');
    expect(b.documentPrefix).toBe('AC1');
    expect(brandAddressLine(b)).toBe('Jammu, Jammu & Kashmir 180001');
  });

  it('falls back to defaults for missing or blank fields', () => {
    const b = brandFromProfile({ brandName: '  ', website: 'not a url at all ::' });
    expect(b.brandName).toBe(DEFAULT_BRAND.brandName);
    expect(b.website).toBe(DEFAULT_BRAND.website);
    expect(b.documentPrefix).toBe('FT');
    expect(brandFromProfile(null)).toBe(DEFAULT_BRAND);
  });

  it('never exposes bank or tax details publicly', () => {
    setBrand(brandFromProfile({ brandName: 'X Travel', accountNumber: '123', gstin: '01ABC', pan: 'P' }));
    const pub = publicBrand() as Record<string, unknown>;
    for (const k of ['accountNumber', 'ifscCode', 'bankName', 'gstin', 'pan', 'upiId', 'documentPrefix']) {
      expect(pub).not.toHaveProperty(k);
    }
    expect(brand().brandName).toBe('X Travel');
  });
});
