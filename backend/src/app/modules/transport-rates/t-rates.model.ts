import mongoose, { Schema } from 'mongoose';
import { ITransportRoute } from './t-rates.interface';
const SeasonSchema = new Schema(
  {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    markUpType: {
      type: String,
      enum: ['Fixed %', 'Percentage'],
      required: true,
      default: 'Fixed %',
    },
    b2c: { type: Number, min: 0, default: 0 },
    b2b: { type: Number, min: 0, default: 0 },
  },
  { _id: false },
);

const TransportRouteSchema = new Schema<ITransportRoute>(
  {
    routeId: { type: String, unique: true },

    // Category
    category: {
      type: String,
      enum: ['itinerary', 'point_to_point', 'sic', 'per_day'],
      required: true,
    },

    // Sub-type — only for point_to_point
    subTypes: {
      type: [String],
      enum: [
        'local_city_tour',
        'airport_transfer',
        'railway_station_transfer',
        'bus_stand_transfer',
        'port_transfer',
        'meal_transfer',
      ],
      default: [],
    },

    // Common fields (not in per_day)
    transportType: {
      type: String,
      enum: ['one_way', 'round_trip'],
      default: null,
    },
    startCity: { type: String, trim: true, default: '' },
    destinationCity: { type: String, trim: true, default: '' },
    routeName: { type: String, trim: true, default: '' },

    // Only itinerary & point_to_point
    citiesIncluded: { type: String, trim: true, default: '' },
    noOfDays: { type: String, default: '' },
    destinationsCovered: { type: String, trim: true, default: '' },
    sightseeingCovered: { type: String, trim: true, default: '' },

    // Common
    description: { type: String, trim: true, default: '' },
    pickupPointArea: { type: String, trim: true, default: '' },
    dropPointArea: { type: String, trim: true, default: '' },
    forWithHotelBYO: { type: String, default: '' },
    forLandOnlyBYO: { type: String, default: '' },

    // Only per_day
    perDayScopeType: {
      type: String,
      enum: ['state', 'country'],
      default: null,
    },
    perDayScopeValue: { type: String, trim: true, default: '' },

    // Pricing
    vehicleCostType: {
      type: String,
      enum: ['normal', 'km_based'],
      required: true,
      default: 'normal',
    },
    currency: { type: String, default: 'INR' },
    seasons: { type: [SeasonSchema], default: [] },

    // Misc
    isWebsite: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-generate routeId
TransportRouteSchema.pre('save', async function (next) {
  if (!this.routeId) {
    const count = await mongoose.model('TransportRoute').countDocuments();
    this.routeId = `TRT${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const TransportRoute = mongoose.model<ITransportRoute>(
  'TransportRoute',
  TransportRouteSchema,
);

export default TransportRoute;
