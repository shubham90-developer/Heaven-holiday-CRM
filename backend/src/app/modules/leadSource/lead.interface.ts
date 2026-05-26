import { Document } from 'mongoose';

export interface ILeadSource extends Document {
  leadSourceId: string;
  leadSourceName: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
