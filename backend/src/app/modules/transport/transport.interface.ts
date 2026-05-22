import { Document, Types } from 'mongoose';

export interface ITransport extends Document {
  transportId: string;
  carType: string;
  carName: string;
  seatingCapacity: number;
  ac: 'Yes' | 'No';
  vehicleNumber: string;
  noOfVehicle: number;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
