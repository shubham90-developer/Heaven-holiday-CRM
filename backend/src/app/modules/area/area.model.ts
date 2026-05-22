import mongoose, { Schema } from 'mongoose';
import { IArea } from './area.interface';

const AreaSchema = new Schema<IArea>(
  {
    areaId: {
      type: String,
      unique: true,
    },

    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ─── Auto-generate areaId ─────────────────────────────────────────────────────

AreaSchema.pre('save', async function (next) {
  if (!this.areaId) {
    const count = await mongoose.model('Area').countDocuments();
    this.areaId = `AREA${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// ─── Text index for search ────────────────────────────────────────────────────

AreaSchema.index({ city: 'text', area: 'text' });

export default mongoose.model<IArea>('Area', AreaSchema);
