import { z } from 'zod';

// ── Reusable sub-schemas ──────────────────────────────────────────────────────

const salutationEnum = z.enum(['Mr.', 'Ms.', 'Mrs.', 'Miss', 'Dr.']).optional();

export const supplierContactSchema = z.object({
  salutation: salutationEnum,
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().trim().optional(),
  designation: z.string().trim().optional(),
  department: z.string().trim().optional(),
  email: z.string().email('Invalid email').trim().optional(),
  countryCode: z.string().trim().default('+91'),
  phone: z.string().min(10, 'Invalid phone number').trim(),
  country: z.string().trim().optional(),
  state: z.string().trim().optional(),
  city: z.string().trim().optional(),
  expertiseDestinations: z.string().trim().optional(),
  comments: z.string().trim().optional(),
});

export const supplierBankDetailSchema = z.object({
  accountName: z.string().trim().optional(),
  accountNumber: z.string().min(1, 'Account number is required').trim(),
  bankName: z.string().trim().optional(),
  ifscCode: z.string().trim().optional(),
  swiftCode: z.string().trim().optional(),
  isPrimary: z.boolean().default(false),
  country: z.string().trim().optional(),
  city: z.string().trim().optional(),
  comments: z.string().trim().optional(),
});

// ── Main create schema ────────────────────────────────────────────────────────

export const createSupplierSchema = z.object({
  // Company overview
  companyName: z.string().min(1, 'Company name is required').trim(),
  currency: z
    .enum([
      'INR',
      'USD',
      'EUR',
      'GBP',
      'AED',
      'AUD',
      'CAD',
      'SGD',
      'JPY',
      'CNY',
    ])
    .default('INR'),
  gstRegistered: z.boolean().default(false),
  panNumber: z.string().trim().optional(),

  // Primary contact person
  salutation: salutationEnum,
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().trim().optional(),
  designation: z.string().trim().optional(),
  email: z.string().email('Invalid email').trim(),
  countryCode: z.string().trim().default('+91'),
  phone: z.string().min(10, 'Invalid phone number').trim(),

  // Address
  addressLine1: z.string().trim().optional(),
  addressLine2: z.string().trim().optional(),
  country: z.string().min(1, 'Country is required').trim(),
  state: z.string().trim().optional(),
  city: z.string().min(1, 'City is required').trim(),
  otherCity: z.string().trim().optional(),

  // Business details
  category: z.string().min(1, 'Category is required').trim(),
  services: z.string().min(1, 'Services is required').trim(),
  comments: z.string().trim().optional(),
  expertiseDestinations: z.string().trim().optional(),

  // Sub-collections (optional on create; added via separate endpoints)
  contacts: z.array(supplierContactSchema).default([]),
  bankDetails: z.array(supplierBankDetailSchema).default([]),

  // Meta
  rm: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

// ── Update schema (all fields optional) ──────────────────────────────────────

export const updateSupplierSchema = createSupplierSchema.partial();

// ── Contact / bank add schemas (for dedicated sub-routes) ─────────────────────

export const addContactSchema = supplierContactSchema;
export const addBankDetailSchema = supplierBankDetailSchema;
