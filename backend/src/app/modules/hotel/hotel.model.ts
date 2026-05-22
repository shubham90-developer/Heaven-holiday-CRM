import mongoose, { Schema } from 'mongoose';
import { IHotel } from './hotel.interface';

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const RoomTypeSchema = new Schema(
  {
    roomTypeName: { type: String, required: true, trim: true },
    description: String,
    maxOccupancy: { type: Number, default: 2 },
    extraBedAllowed: { type: Boolean, default: false },
  },
  { _id: true },
);

const HotelImageSchema = new Schema(
  {
    url: { type: String, required: true },
    caption: String,
    isPrimary: { type: Boolean, default: false },
  },
  { _id: true },
);

const HotelAmenitySchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['General', 'Room', 'Dining', 'Recreation', 'Business'],
      default: 'General',
    },
  },
  { _id: false },
);

// ─── Main Hotel Schema ────────────────────────────────────────────────────────

const HotelSchema = new Schema<IHotel>(
  {
    hotelId: {
      type: String,
      unique: true,
    },

    hotelName: { type: String, required: true, trim: true },
    cityName: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    address: String,

    contactEmail: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    contactNumber: String,
    countryCode: { type: String, default: '+91' },

    starRating: {
      type: String,
      enum: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star', 'NA Star'],
      default: 'NA Star',
    },
    propertyType: {
      type: String,
      enum: [
        'Hotel',
        'Resort',
        'Villa',
        'Hostel',
        'Apartment',
        'Guesthouse',
        'Homestay',
      ],
      default: 'Hotel',
    },

    checkInTime: { type: String, default: '11:00' },
    checkOutTime: { type: String, default: '12:00' },

    weekend: {
      type: [String],
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      default: ['Saturday', 'Sunday'],
    },

    roomTypes: [RoomTypeSchema],

    childAgePolicy: {
      type: String,
      enum: ['3 year', '5 year', '6 year', '8 year', '10 year', '12 year'],
      default: '3 year',
    },

    supplier: String,
    currency: { type: String, default: 'INR' },
    dcw: String,

    amenities: [HotelAmenitySchema],
    images: [HotelImageSchema],
    description: String,

    isActive: { type: Boolean, default: true },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

// ─── Auto-generate hotelId before save ───────────────────────────────────────

HotelSchema.pre('save', async function (next) {
  if (!this.hotelId) {
    // Generate a 6-digit numeric ID like GTX (784724)
    const count = await mongoose.model('Hotel').countDocuments();
    this.hotelId = String(700000 + count + 1);
  }
  next();
});

// ─── Indexes ──────────────────────────────────────────────────────────────────

HotelSchema.index({ hotelName: 'text', cityName: 'text', country: 'text' });
HotelSchema.index({ cityName: 1, country: 1 });
HotelSchema.index({ starRating: 1 });
HotelSchema.index({ propertyType: 1 });
HotelSchema.index({ isActive: 1 });
HotelSchema.index({ hotelId: 1 });

const Hotel = mongoose.model<IHotel>('Hotel', HotelSchema);
export default Hotel;
