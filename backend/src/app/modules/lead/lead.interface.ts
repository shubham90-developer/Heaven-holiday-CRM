// ============================================================
// types/lead.types.ts
// ============================================================

import { Document, Types } from 'mongoose';

export type LeadType = 'B2C' | 'B2B';
export type LeadTemperature = 'hot' | 'warm' | 'cold' | 'no-status';
export type LeadStatus = 'unassigned' | 'inProcess' | 'callback' | 'archived';
export type LeadStage = 'new' | 'followUp' | 'confirmed' | 'rejected' | 'lost';
export type B2BAgentType = 'Agency' | 'Corporate';

export interface ILead {
  type: LeadType;

  salutation?: string;
  firstName?: string;
  lastName?: string;
  customerName: string;

  companyName?: string;
  agentType?: B2BAgentType;
  remarks?: string;

  phone: string;
  email?: string;

  leadSource: Types.ObjectId;
  temperature: LeadTemperature;
  status: LeadStatus;
  leadStage: LeadStage;

  owner: Types.ObjectId;
  isDuplicate: boolean;
  archived: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILeadDocument extends ILead, Document {}
