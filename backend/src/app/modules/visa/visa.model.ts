import mongoose, { Document, Schema } from 'mongoose';
import {
  IVisa,
  IEmbassyFee,
  IMarkUp,
  IServiceProvider,
  MARKET_PLACES,
  MARKUP_TYPES,
  VISA_CATEGORIES,
  VISA_TYPES,
  ENTRY_TYPES,
} from './visa.interface';
const EmbassyFeeSchema = new Schema<IEmbassyFee>(
  {
    currency: { type: String, default: 'INR' },
    adult: { type: Number, default: 0, min: 0 },
    child: { type: Number, default: 0, min: 0 },
    childAge: { type: Number, default: 0, min: 0 },
    infant: { type: Number, default: 0, min: 0 },
  },
  { _id: false },
);

const MarkUpSchema = new Schema<IMarkUp>(
  {
    marketPlace: {
      type: String,
      enum: MARKET_PLACES,
      required: true,
    },
    currency: { type: String, default: 'INR' },
    markUpType: {
      type: String,
      enum: MARKUP_TYPES,
      default: 'Amount',
    },
    adult: { type: Number, default: 0, min: 0 },
    child: { type: Number, default: 0, min: 0 },
    infant: { type: Number, default: 0, min: 0 },
  },
  { _id: false },
);

const ServiceProviderSchema = new Schema<IServiceProvider>(
  {
    display: { type: Boolean, default: false },
    serviceName: { type: String, trim: true, required: true },
    currency: { type: String, default: 'INR' },
    fees: { type: Number, default: 0, min: 0 },
    markup: { type: Number, default: 0, min: 0 },
    taxable: { type: Boolean, default: false },
  },
  { _id: true },
);

// ─── Main Schema ──────────────────────────────────────────────────────────────

const VisaSchema = new Schema<IVisa>(
  {
    visaId: {
      type: String,
      unique: true,
    },

    // Basic Info
    travelersNationality: { type: String, required: true, trim: true },
    countriesCovered: [{ type: String, trim: true }],

    // Visa Details
    visaName: { type: String, required: true, trim: true },
    visaType: { type: String, enum: VISA_TYPES },
    visaCategory: { type: String, enum: VISA_CATEGORIES },
    entryType: {
      type: String,
      enum: ENTRY_TYPES,
      default: 'Single Entry',
    },
    processingTime: { type: Number, min: 0 }, // days
    passportExpire: { type: Number, min: 0 }, // days
    validityOfVisa: { type: Number, min: 0 }, // days
    duration: { type: String, trim: true },
    supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },

    // Embassy Fee
    embassyFee: {
      type: EmbassyFeeSchema,
      default: () => ({
        currency: 'INR',
        adult: 0,
        child: 0,
        childAge: 0,
        infant: 0,
      }),
    },

    // Mark Up — seeded with MY B2C and MY B2B by default
    markUp: {
      type: [MarkUpSchema],
      default: () => [
        {
          marketPlace: 'MY B2C',
          currency: 'INR',
          markUpType: 'Amount',
          adult: 0,
          child: 0,
          infant: 0,
        },
        {
          marketPlace: 'MY B2B',
          currency: 'INR',
          markUpType: 'Amount',
          adult: 0,
          child: 0,
          infant: 0,
        },
      ],
    },

    // Service Providers — dynamic
    serviceProviders: { type: [ServiceProviderSchema], default: [] },

    // Meta
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ─── Auto-generate visaId ─────────────────────────────────────────────────────

VisaSchema.pre('save', async function (next) {
  if (!this.visaId) {
    const count = await mongoose.model('Visa').countDocuments();
    this.visaId = `VIS${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// ─── Text index for search ────────────────────────────────────────────────────

VisaSchema.index({
  visaName: 'text',
  travelersNationality: 'text',
  countriesCovered: 'text',
});

export default mongoose.model<IVisa>('Visa', VisaSchema);
