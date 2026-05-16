import { Document, Types } from 'mongoose';

export type ActivityType = 'call' | 'todo';
export type CallDirection = 'outgoing' | 'incoming';
export type CallOutcome = 'answered' | 'unanswered' | 'notReachable';
export type NextAction =
  | 'callBack'
  | 'todo'
  | 'meeting'
  | 'createQuery'
  | 'lost';
export type CustomerType = 'B2C' | 'B2B';

export interface IFollowUp {
  leadId: Types.ObjectId;
  queryId?: Types.ObjectId;

  activityType: ActivityType;
  direction?: CallDirection;
  outcome?: CallOutcome;
  nextAction?: NextAction;

  followUpDate: Date;
  followUpTime: string;
  remindBefore: number; // minutes before

  assignedTo: Types.ObjectId; // ref: Staff
  customerId: Types.ObjectId; // ref: Lead
  customerType: CustomerType;

  details?: string;
  isCompleted: boolean;
  createdAt?: Date;
}

export interface IFollowUpDocument extends IFollowUp, Document {}
