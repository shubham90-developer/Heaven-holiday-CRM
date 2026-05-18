import { Document, Types } from 'mongoose';

// ── Enums / Union types ───────────────────────────────────────────────────────

export type SupplierStatus = 'active' | 'inactive';

export type SupplierCurrency =
  | 'INR'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'AED'
  | 'AUD'
  | 'CAD'
  | 'SGD'
  | 'JPY'
  | 'CNY';

export type SupplierSalutation = 'Mr.' | 'Ms.' | 'Mrs.' | 'Miss' | 'Dr.';

// ── Sub-document interfaces ───────────────────────────────────────────────────

export interface ISupplierContact {
  salutation?: SupplierSalutation;
  firstName: string;
  lastName?: string;
  designation?: string;
  department?: string;
  email?: string;
  countryCode?: string;
  phone: string;
  country?: string;
  state?: string;
  city?: string;
  expertiseDestinations?: string;
  comments?: string;
}

export interface ISupplierBankDetail {
  accountName?: string;
  accountNumber: string;
  bankName?: string;
  ifscCode?: string;
  swiftCode?: string;
  isPrimary: boolean;
  country?: string;
  city?: string;
  comments?: string;
}

// ── Main supplier interface ───────────────────────────────────────────────────

export interface ISupplier {
  // Overview — company
  companyName: string;
  currency: SupplierCurrency;
  gstRegistered: boolean;
  panNumber?: string;

  // Overview — primary contact person
  salutation?: SupplierSalutation;
  firstName: string;
  lastName?: string;
  designation?: string;
  email: string;
  countryCode: string;
  phone: string;

  // Overview — address
  addressLine1?: string;
  addressLine2?: string;
  country: string;
  state?: string;
  city: string;
  otherCity?: string;

  // Overview — business details
  category: string;
  services: string;
  comments?: string;
  expertiseDestinations?: string;

  // Sub-collections (Steps 2 & 3)
  contacts: ISupplierContact[];
  bankDetails: ISupplierBankDetail[];

  // Meta
  rm?: Types.ObjectId; // Relationship Manager → ref Staff
  status: SupplierStatus;
  archived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISupplierDocument extends ISupplier, Document {}
