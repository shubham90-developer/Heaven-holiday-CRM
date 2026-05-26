import mongoose, { Schema } from 'mongoose';
import { ITermsConditions } from './t&c.interface';

const TermsConditionsSchema = new Schema<ITermsConditions>(
  {
    tcDomesticHolidays: { type: String, default: '' },
    tcInternationalHolidays: { type: String, default: '' },
    cancellationPolicyDomesticHolidays: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const TermsConditions = mongoose.model<ITermsConditions>(
  'TermsConditions',
  TermsConditionsSchema,
);

export default TermsConditions;
