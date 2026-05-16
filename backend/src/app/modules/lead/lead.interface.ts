import { Document, Types } from 'mongoose';

export type LeadType = 'B2C' | 'B2B';
export type LeadTemperature = 'hot' | 'warm' | 'cold' | 'no-status';
export type LeadStatus = 'unassigned' | 'inProcess' | 'callback' | 'archived';
export type LeadStage = 'new' | 'followUp' | 'confirmed' | 'rejected' | 'lost';

export interface ILead {
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;

  type: LeadType;
  source: string;
  temperature: LeadTemperature;

  status: LeadStatus;
  leadStage: LeadStage;
  isDuplicate: boolean;

  owner: Types.ObjectId;

  remark?: string;
  archived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILeadDocument extends ILead, Document {}
