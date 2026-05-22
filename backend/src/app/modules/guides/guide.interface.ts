import { Document } from 'mongoose';

export interface IGuideRate {
  currency: string;
  perDayRate: number;
  overnightCharges: number;
  markUpType: 'Percentage' | 'Fixed';
  markUp: number;
  taxes: number;
  total: number;
}

export interface IGuide extends Document {
  guideId: string;
  guideName: string;
  destination: string;
  mobileCountryCode: string;
  mobileNumber: string;
  email?: string;
  languagesKnown: string;
  shortDescription?: string;
  image?: string;
  rates: IGuideRate[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
