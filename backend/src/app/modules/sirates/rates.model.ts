import mongoose, { Document, Schema } from 'mongoose';
import { ISightseeingRate } from './rates.interface';

const SightseeingRateSchema = new Schema<ISightseeingRate>(
  {
    rateId: { type: String, unique: true },
    sightseeingId: {
      type: Schema.Types.ObjectId,
      ref: 'Sightseeing',
      required: true,
    },
    city: { type: String, required: true, trim: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    currency: { type: String, required: true, default: 'INR' },
    entryFeeAdult: { type: Number, required: true, min: 0, default: 0 },
    entryFeeKids: { type: Number, required: true, min: 0, default: 0 },
    costMarkup: { type: Number, min: 0, default: 0 },
    bookingType: {
      type: String,
      enum: ['On Request', 'Real Time'],
      required: true,
      default: 'On Request',
    },
    termsAndConditions: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-generate rateId
SightseeingRateSchema.pre('save', async function (next) {
  if (!this.rateId) {
    const count = await mongoose.model('SightseeingRate').countDocuments();
    this.rateId = `RATE${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const SightseeingRate = mongoose.model<ISightseeingRate>(
  'SightseeingRate',
  SightseeingRateSchema,
);

export default SightseeingRate;
