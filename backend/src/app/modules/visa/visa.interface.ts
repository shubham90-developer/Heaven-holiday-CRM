import mongoose, { Document, Schema } from 'mongoose';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const VISA_TYPES = [
  'Tourist',
  'Business',
  'Student',
  'Work',
  'Transit',
  'Medical',
  'Conference',
  'Other',
] as const;

export const VISA_CATEGORIES = [
  'Tourism',
  'Business',
  'Education',
  'Employment',
  'Family',
  'Medical',
  'Other',
] as const;

export const ENTRY_TYPES = [
  'Single Entry',
  'Double Entry',
  'Multiple Entry',
] as const;

export const MARKUP_TYPES = ['Amount', 'Percentage'] as const;

export const MARKET_PLACES = ['MY B2C', 'MY B2B'] as const;

export interface IEmbassyFee {
  currency: string;
  adult: number;
  child: number;
  childAge: number;
  infant: number;
}

export interface IMarkUp {
  marketPlace: (typeof MARKET_PLACES)[number];
  currency: string;
  markUpType: (typeof MARKUP_TYPES)[number];
  adult: number;
  child: number;
  infant: number;
}

export interface IServiceProvider {
  display: boolean;
  serviceName: string;
  currency: string;
  fees: number;
  markup: number;
  taxable: boolean;
}

export interface IVisa extends Document {
  visaId: string;

  // Basic Info
  travelersNationality: string;
  countriesCovered: string[]; // multi-select/tags

  // Visa Details
  visaName: string;
  visaType?: (typeof VISA_TYPES)[number];
  visaCategory?: (typeof VISA_CATEGORIES)[number];
  entryType?: (typeof ENTRY_TYPES)[number];
  processingTime?: number; // in days
  passportExpire?: number; // in days
  validityOfVisa?: number; // in days
  duration?: string;
  supplier?: mongoose.Types.ObjectId;

  // Embassy Fee
  embassyFee: IEmbassyFee;

  // Mark Up — fixed two rows (MY B2C, MY B2B)
  markUp: IMarkUp[];

  // Service Providers — dynamic rows
  serviceProviders: IServiceProvider[];

  // Meta
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
