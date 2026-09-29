import * as React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, pdfFonts, brand } from './theme';
import { BrandHeader, BrandFooter, GoldRule, SellerIdentity, inr, shortDate } from './primitives';
import { brand as currentBrand, brandAddressLine } from '../../common/brand';

/**
 * Input shape for a formal GST invoice PDF. Mirrors the Invoice + InvoiceLineItem
 * Prisma models so the controller just maps DB rows straight through.
 */
export interface FormalInvoiceInput {
  invoiceNumber: string;
  createdAt: Date | string;
  dueDate: Date | string | null;
  notes: string | null;

  subtotal: number;
  gstRate: number;
  gstAmount: number;
  total: number;

  status: string; // DRAFT | PAID | CANCELLED

  lead: {
    name: string;
    email: string | null;
  };

  lineItems: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];

  companyProfile?: {
    legalName?: string;
    brandName?: string;
    gstin?: string | null;
    pan?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    stateCode?: string | null;
    pincode?: string | null;
    phone?: string | null;
    email?: string | null;
    bankName?: string | null;
    accountNumber?: string | null;
    ifscCode?: string | null;
    accountHolder?: string | null;
    upiId?: string | null;
  } | null;
}

/**
 * Formal line-item GST invoice — distinct from the booking pro-forma.
 * This is attached to a Lead (not a Booking) and has explicit line items
 * with quantity × unit price breakdowns.
 */
export function FormalInvoiceDocument({ inv }: { inv: FormalInvoiceInput }) {
  const comp = inv.companyProfile;
  // Everything comes from Settings → Company profile. No invented GSTIN, PAN
  // or bank account: a missing value is left off the invoice, not faked.
  const b = currentBrand();
  const brandName = comp?.brandName || b.brandName;
  const address = brandAddressLine({
    ...b,
    address: comp?.address ?? b.address,
    city: comp?.city ?? b.city,
    state: comp?.state ?? b.state,
    pincode: comp?.pincode ?? b.pincode,
  });
  const email = comp?.email || b.email;
  const gstin = comp?.gstin || b.gstin;
  const pan = comp?.pan || b.pan;
  const state = comp?.state || b.state;
  const stateCode = comp?.stateCode || b.stateCode;
  const bank = {
    holder: comp?.accountHolder || b.accountHolder || brandName,
    name: comp?.bankName || b.bankName,
    account: comp?.accountNumber || b.accountNumber,
    ifsc: comp?.ifscCode || b.ifscCode,
    upi: comp?.upiId || b.upiId,
  };
  const hasBank = Boolean(bank.name && bank.account && bank.ifsc);

  return (
    <Document
      title={`Invoice ${inv.invoiceNumber}`}
      author={currentBrand().brandName}
      subject="GST Invoice"
      creator={`${currentBrand().brandName} CRM`}
    >
      <Page size="A4" style={pdfStyles.page}>
        <BrandHeader
          docLabel="Tax Invoice"
          docNumber={inv.invoiceNumber}
          issuedOn={new Date(inv.createdAt)}
        />

        {/* Parties */}
        <View style={pdfStyles.parties}>
          <View style={pdfStyles.partyBox}>
            <Text style={pdfStyles.sectionLabel}>Billed to</Text>
            <Text style={{ ...pdfStyles.para, fontWeight: 700, color: brand.ink }}>
              {inv.lead.name}
            </Text>
            {inv.lead.email && <Text style={pdfStyles.small}>{inv.lead.email}</Text>}
          </View>
          <View style={pdfStyles.partyBox}>
            <Text style={pdfStyles.sectionLabel}>Billed from</Text>
            <Text style={{ ...pdfStyles.para, fontWeight: 700, color: brand.ink }}>
              {brandName}
            </Text>
            {address ? <Text style={pdfStyles.small}>{address}</Text> : null}
            {email ? <Text style={pdfStyles.small}>Email: {email}</Text> : null}
            {gstin || pan ? (
              <Text style={pdfStyles.small}>
                {[gstin && `GSTIN: ${gstin}`, pan && `PAN: ${pan}`].filter(Boolean).join('  |  ')}
              </Text>
            ) : null}
            <Text style={pdfStyles.small}>SAC Code: 998555 (Tour Operator Services)</Text>
            {state ? (
              <Text style={pdfStyles.small}>
                Place of Supply: {state}{stateCode ? ` (Code: ${stateCode})` : ''}
              </Text>
            ) : null}
            {hasBank && (
              <Text style={{ ...pdfStyles.small, marginTop: 4, fontFamily: 'Helvetica-Bold' }}>
                Bank: {bank.name} | A/C: {bank.account} | IFSC: {bank.ifsc}
              </Text>
            )}
          </View>
        </View>

        {/* Status + Due date */}
        {inv.dueDate && (
          <View style={{ marginBottom: 12 }}>
            <Text style={pdfStyles.small}>
              Due date: {shortDate(inv.dueDate)}
            </Text>
          </View>
        )}

        {/* Line items table */}
        <View style={{ marginBottom: 18 }}>
          <Text style={pdfStyles.sectionLabel}>Line items</Text>
          <GoldRule width={20} />
          <View style={pdfStyles.table}>
            <View style={pdfStyles.th}>
              <Text style={{ ...pdfStyles.thText, flex: 4 }}>Description</Text>
              <Text style={{ ...pdfStyles.thText, width: 50, textAlign: 'right' }}>Qty</Text>
              <Text style={{ ...pdfStyles.thText, width: 90, textAlign: 'right' }}>Unit Price</Text>
              <Text style={{ ...pdfStyles.thText, width: 90, textAlign: 'right' }}>Total</Text>
            </View>
            {inv.lineItems.map((item, i) => (
              <View
                key={i}
                style={
                  i === inv.lineItems.length - 1
                    ? { ...pdfStyles.tr, ...pdfStyles.trLast }
                    : pdfStyles.tr
                }
              >
                <Text style={{ ...pdfStyles.td, flex: 4 }}>{item.description}</Text>
                <Text style={{ ...pdfStyles.td, width: 50, textAlign: 'right' }}>
                  {item.quantity}
                </Text>
                <Text style={{ ...pdfStyles.td, width: 90, textAlign: 'right' }}>
                  {inr(item.unitPrice)}
                </Text>
                <Text style={{ ...pdfStyles.td, width: 90, textAlign: 'right', fontWeight: 700 }}>
                  {inr(item.total)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals block */}
        <View
          style={{
            marginBottom: 20,
            padding: 12,
            backgroundColor: brand.parchment,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: brand.border,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
            <Text style={pdfStyles.small}>Taxable value</Text>
            <Text style={{ ...pdfStyles.td, color: brand.text }}>{inr(inv.subtotal)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 2 }}>
            <Text style={pdfStyles.small}>GST @ {inv.gstRate}%</Text>
            <Text style={{ ...pdfStyles.td, color: brand.text }}>{inr(inv.gstAmount)}</Text>
          </View>
          <View
            style={{
              marginTop: 4,
              paddingTop: 6,
              borderTopWidth: 1,
              borderTopColor: brand.border,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ ...pdfStyles.para, fontWeight: 700, color: brand.ink }}>Total</Text>
            <Text style={{ ...pdfStyles.para, fontWeight: 700, color: brand.ink }}>{inr(inv.total)}</Text>
          </View>
          <Text style={{ ...pdfStyles.small, marginTop: 8 }}>
            Line amounts are the GST-inclusive price the guest pays. Taxable value is that total with GST removed, so the lines add up to the amount payable, not to the taxable value.
          </Text>
        </View>

        {/* Grand total banner */}
        <View
          style={{
            marginBottom: 20,
            padding: 16,
            backgroundColor: brand.teal,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 8,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                color: brand.gold,
              }}
            >
              {inv.status === 'PAID' ? 'Paid' : 'Amount due'}
            </Text>
            <Text
              style={{
                fontFamily: pdfFonts.display,
                fontWeight: 700,
                fontSize: 28,
                color: '#FFFFFF',
                marginTop: 2,
                letterSpacing: -0.5,
              }}
            >
              {inr(inv.total)}
            </Text>
          </View>
        </View>

        {/* Bank Transfer & Payment Details — only what Settings holds */}
        {hasBank && (
        <View
          style={{
            marginBottom: 16,
            padding: 10,
            backgroundColor: brand.parchment,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: brand.border,
          }}
        >
          <Text style={{ ...pdfStyles.sectionLabel, marginBottom: 4 }}>Bank Transfer / NEFT / RTGS Details</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 }}>
            <Text style={pdfStyles.small}>Beneficiary Name:</Text>
            <Text style={{ ...pdfStyles.small, fontWeight: 700, color: brand.ink }}>{bank.holder}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 }}>
            <Text style={pdfStyles.small}>Bank Name:</Text>
            <Text style={{ ...pdfStyles.small, color: brand.ink }}>{bank.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 }}>
            <Text style={pdfStyles.small}>Account Number:</Text>
            <Text style={{ ...pdfStyles.small, fontWeight: 700, color: brand.ink }}>{bank.account}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 }}>
            <Text style={pdfStyles.small}>IFSC Code:</Text>
            <Text style={{ ...pdfStyles.small, fontWeight: 700, color: brand.ink }}>{bank.ifsc}</Text>
          </View>
          {bank.upi ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 1 }}>
              <Text style={pdfStyles.small}>UPI:</Text>
              <Text style={{ ...pdfStyles.small, fontWeight: 700, color: brand.ink }}>{bank.upi}</Text>
            </View>
          ) : null}
        </View>
        )}

        {inv.notes && (
          <View style={{ marginTop: 4, marginBottom: 12 }}>
            <Text style={pdfStyles.sectionLabel}>Notes</Text>
            <GoldRule width={20} />
            <Text style={pdfStyles.para}>{inv.notes}</Text>
          </View>
        )}

        <BrandFooter />
      </Page>
    </Document>
  );
}
