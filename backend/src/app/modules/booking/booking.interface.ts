import { Document, Types } from 'mongoose';

export type BookingStatus = 'confirmed' | 'cancelled';
export type PaymentStatus = 'pending' | 'partial' | 'completed';

export interface IBooking {
  proposalId: Types.ObjectId;
  queryId: Types.ObjectId;
  leadId: Types.ObjectId;

  totalAmount: number;
  paidAmount: number;
  balance: number;
  paymentStatus: PaymentStatus;

  status: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBookingDocument extends IBooking, Document {}
