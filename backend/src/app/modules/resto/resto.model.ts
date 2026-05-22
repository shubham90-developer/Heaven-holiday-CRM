import mongoose, { Schema } from 'mongoose';
import { IRestaurant } from './resto.interface';

const RateSchema = new Schema(
  {
    rateType: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true, default: 'INR' },
  },
  { _id: false },
);

const RestaurantSchema = new Schema<IRestaurant>(
  {
    restaurantId: {
      type: String,
      unique: true,
    },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    restaurantArea: { type: String, required: true, trim: true },
    supplierName: { type: String, required: true, trim: true },
    currency: { type: String, required: true, default: 'INR', trim: true },
    isPreferred: { type: Boolean, default: false },
    mealName: { type: String, required: true, trim: true },
    isVeg: { type: Boolean, default: false },
    isNonVeg: { type: Boolean, default: false },
    isAI: { type: Boolean, default: false },
    rates: { type: [RateSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// ── Auto-generate restaurantId ─────────────────────────────────────────────
RestaurantSchema.pre('save', async function (next) {
  if (!this.restaurantId) {
    const count = await mongoose.model('Restaurant').countDocuments();
    this.restaurantId = `REST${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// ── Text index ─────────────────────────────────────────────────────────────
RestaurantSchema.index({
  city: 'text',
  address: 'text',
  restaurantArea: 'text',
  supplierName: 'text',
});

export default mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
