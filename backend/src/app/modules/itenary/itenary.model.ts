import mongoose, { Schema } from 'mongoose';
import { IItinerary } from './itenary.interface';

const ItinerarySchema = new Schema<IItinerary>(
  {
    itineraryId: {
      type: String,
      unique: true,
    },

    // Core Fields
    startCity: { type: String, required: true, trim: true },
    destinationCity: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 5000 }, // stores rich-text HTML

    // Meta
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ─── Auto-generate itineraryId ────────────────────────────────────────────────

ItinerarySchema.pre('save', async function (next) {
  if (!this.itineraryId) {
    const count = await mongoose.model('Itinerary').countDocuments();
    this.itineraryId = `ITN${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// ─── Text index for search ────────────────────────────────────────────────────

ItinerarySchema.index({
  title: 'text',
  startCity: 'text',
  destinationCity: 'text',
});

export default mongoose.model<IItinerary>('Itinerary', ItinerarySchema);
