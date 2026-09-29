-- Falcon Trails rebrand: company profile defaults move to Srinagar and stop
-- carrying another business's phone number and address. Defaults only; any
-- saved profile row is left untouched (edit it in Settings -> Company profile).
ALTER TABLE "CompanyProfile" ALTER COLUMN "legalName" SET DEFAULT 'Falcon Trails';
ALTER TABLE "CompanyProfile" ALTER COLUMN "address" SET DEFAULT '';
ALTER TABLE "CompanyProfile" ALTER COLUMN "city" SET DEFAULT 'Srinagar';
ALTER TABLE "CompanyProfile" ALTER COLUMN "state" SET DEFAULT 'Jammu and Kashmir';
ALTER TABLE "CompanyProfile" ALTER COLUMN "stateCode" SET DEFAULT '01';
ALTER TABLE "CompanyProfile" ALTER COLUMN "pincode" SET DEFAULT '190001';
ALTER TABLE "CompanyProfile" ALTER COLUMN "phone" SET DEFAULT '';
ALTER TABLE "CompanyProfile" ALTER COLUMN "email" SET DEFAULT 'info@falcontrails.in';
ALTER TABLE "CompanyProfile" ALTER COLUMN "website" SET DEFAULT 'https://falcontrails.in';
ALTER TABLE "CompanyProfile" ALTER COLUMN "brandName" SET DEFAULT 'Falcon Trails';
