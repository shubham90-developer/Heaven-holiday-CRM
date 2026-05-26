import { Document } from 'mongoose';

export interface ITermsConditions extends Document {
  tcDomesticHolidays: string;
  tcInternationalHolidays: string;
  cancellationPolicyDomesticHolidays: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
