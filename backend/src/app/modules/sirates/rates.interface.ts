import mongoose, { Document } from 'mongoose';

export interface ISightseeingRate extends Document {
  rateId: string;
  sightseeingId: mongoose.Types.ObjectId;
  city: string;
  from: Date;
  to: Date;
  supplier: mongoose.Types.ObjectId;
  currency: string;
  entryFeeAdult: number;
  entryFeeKids: number;
  costMarkup: number;
  bookingType: 'On Request' | 'Real Time';
  termsAndConditions: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
