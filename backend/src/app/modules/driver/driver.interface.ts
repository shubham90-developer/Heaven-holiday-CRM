import { Document, Types } from 'mongoose';

export interface IDriver extends Document {
  driverId: string;
  driverName: string;
  mobileCountryCode: string;
  mobileNumber: string;
  email?: string;
  languages: string;
  address?: string;
  country: string;
  city: string;
  drivingLicense: string;
  primaryVehicle: Types.ObjectId; // ref: Transport
  image?: string;
  remark?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
