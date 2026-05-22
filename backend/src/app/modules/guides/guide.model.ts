import mongoose, { Schema } from 'mongoose';
import { IGuide } from './guide.interface';

const GuideRateSchema = new Schema(
  {
    currency: { type: String, required: true, default: 'INR' },
    perDayRate: { type: Number, required: true, min: 0, default: 0 },
    overnightCharges: { type: Number, required: true, min: 0, default: 0 },
    markUpType: {
      type: String,
      enum: ['Percentage', 'Fixed'],
      required: true,
      default: 'Percentage',
    },
    markUp: { type: Number, min: 0, default: 0 },
    taxes: { type: Number, min: 0, default: 0 },
    total: { type: Number, min: 0, default: 0 },
  },
  { _id: false },
);

const GuideSchema = new Schema<IGuide>(
  {
    guideId: { type: String, unique: true },
    guideName: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    mobileCountryCode: { type: String, required: true, default: '+91' },
    mobileNumber: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    languagesKnown: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: '' },
    image: { type: String, default: '' },
    rates: { type: [GuideRateSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-generate guideId
GuideSchema.pre('save', async function (next) {
  if (!this.guideId) {
    const count = await mongoose.model('Guide').countDocuments();
    this.guideId = `GDE${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Guide = mongoose.model<IGuide>('Guide', GuideSchema);

export default Guide;
