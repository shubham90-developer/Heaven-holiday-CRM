import { Document } from 'mongoose';

export interface IArea extends Document {
  areaId: string;
  city: string;
  area: string;
  isActive: boolean;
}
