import mongoose, { Schema } from 'mongoose';
import { IDriver } from './driver.interface';

const DriverSchema = new Schema<IDriver>(
  {
    driverId: { type: String, unique: true },
    driverName: { type: String, required: true, trim: true },
    mobileCountryCode: { type: String, required: true, default: '+91' },
    mobileNumber: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    languages: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: '' },
    country: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    drivingLicense: { type: String, required: true, trim: true },
    primaryVehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Transport',
      required: true,
    },
    image: { type: String, default: '' },
    remark: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-generate driverId
DriverSchema.pre('save', async function (next) {
  if (!this.driverId) {
    const count = await mongoose.model('Driver').countDocuments();
    this.driverId = `DRV${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Driver = mongoose.model<IDriver>('Driver', DriverSchema);

export default Driver;
