import mongoose, { Schema } from 'mongoose';
import {
  ISightseeing,
  DIFFICULTY_LEVELS,
  SEASONS,
  DAYS_OF_WEEK,
  POPULARITY_LEVELS,
} from './sightseeing.interface';

// ─── Schema ───────────────────────────────────────────────────────────────────

const SightseeingSchema = new Schema<ISightseeing>(
  {
    sightseeingId: {
      type: String,
      unique: true,
    },

    // Basic Info
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    sightseeingName: { type: String, required: true, trim: true },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    address: { type: String, trim: true },

    // Image
    image: { type: String },

    // Rich Text Sections
    details: { type: String },
    otherInclusions: { type: String },
    advisory: { type: String },
    cancellationPolicy: { type: String },
    refundPolicy: { type: String },
    confirmationPolicy: { type: String },
    termsAndConditions: { type: String },

    // Other Details
    category: { type: String, trim: true },
    activities: [{ type: String, trim: true }],
    difficultyLevel: {
      type: String,
      enum: DIFFICULTY_LEVELS,
    },
    season: {
      type: String,
      enum: SEASONS,
    },
    daysOfWeek: [
      {
        type: String,
        enum: DAYS_OF_WEEK,
      },
    ],
    popularity: {
      type: String,
      enum: POPULARITY_LEVELS,
    },
    thingsToCarry: [{ type: String, trim: true }],
    pickUpPoint: { type: String, trim: true },
    pickUpTime: { type: String },

    // Pax
    paxMin: { type: Number, min: 0 },
    paxMax: { type: Number, min: 0 },

    // Duration
    durationHours: { type: Number, min: 0, default: 0 },
    durationMinutes: { type: Number, min: 0, max: 59, default: 0 },

    // Allowed Age Group
    allowedAgeFrom: { type: Number, min: 0, default: 0 },
    allowedAgeTo: { type: Number, min: 0, default: 0 },

    // Meta
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// ─── Auto-generate sightseeingId ──────────────────────────────────────────────

SightseeingSchema.pre('save', async function (next) {
  if (!this.sightseeingId) {
    const count = await mongoose.model('Sightseeing').countDocuments();
    this.sightseeingId = `SIG${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// ─── Text index for search ────────────────────────────────────────────────────

SightseeingSchema.index({
  sightseeingName: 'text',
  city: 'text',
  country: 'text',
  category: 'text',
});

export default mongoose.model<ISightseeing>('Sightseeing', SightseeingSchema);
