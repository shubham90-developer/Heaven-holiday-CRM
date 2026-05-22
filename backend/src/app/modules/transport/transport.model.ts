import mongoose, { Schema } from 'mongoose';
import { ITransport } from './transport.interface';

const TransportSchema = new Schema<ITransport>(
  {
    transportId: { type: String, unique: true },
    carType: { type: String, required: true, trim: true },
    carName: { type: String, required: true, trim: true },
    seatingCapacity: { type: Number, required: true, min: 1 },
    ac: { type: String, enum: ['Yes', 'No'], required: true, default: 'Yes' },
    vehicleNumber: { type: String, required: true, trim: true },
    noOfVehicle: { type: Number, required: true, min: 1 },
    image: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-generate transportId
TransportSchema.pre('save', async function (next) {
  if (!this.transportId) {
    const count = await mongoose.model('Transport').countDocuments();
    this.transportId = `TRANS${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const Transport = mongoose.model<ITransport>('Transport', TransportSchema);

export default Transport;
