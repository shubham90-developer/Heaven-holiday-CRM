import mongoose, { Schema } from 'mongoose';
import { IBookingDocument } from './booking.interface';

const bookingSchema = new Schema<IBookingDocument>(
  {
    proposalId: {
      type: Schema.Types.ObjectId,
      ref: 'Proposal',
      required: true,
    },
    queryId: { type: Schema.Types.ObjectId, ref: 'Query', required: true },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },

    totalAmount: { type: Number, required: true, default: 0 },
    paidAmount: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },

    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'completed'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model<IBookingDocument>('Booking', bookingSchema);
export default Booking;
