import { Document, Types } from 'mongoose';

export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'rejected';

export interface IProposal {
  queryId: Types.ObjectId;
  leadId: Types.ObjectId;

  packageDetails: {
    hotels?: string[];
    flights?: string[];
    sightseeing?: string[];
    transfers?: string[];
    notes?: string;
  };

  basePrice: number;
  markup: number;
  totalPrice: number;

  status: ProposalStatus;
  sentAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProposalDocument extends IProposal, Document {}
