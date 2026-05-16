import { Document, Types } from 'mongoose';

export type RequirementType =
  | 'package'
  | 'flight'
  | 'hotel'
  | 'visa'
  | 'transfer'
  | 'sightseeing'
  | 'miscellaneous';

export type QueryType = 'FIT' | 'GIT';

export type QueryStage =
  | 'queryCreated'
  | 'proposalPending'
  | 'proposalSent'
  | 'confirmed'
  | 'rejected';

export type QueryTemperature = 'hot' | 'warm' | 'cold' | 'no-status';

export interface IQuery {
  leadId: Types.ObjectId;
  queryNumber: string;

  requirementType: RequirementType;
  queryType: QueryType;

  goingTo: string;
  goingFrom?: string;
  travelDate?: Date;
  noOfDays?: number;
  travelers: number;

  priceRange?: string;
  inclusions?: string[];
  theme?: string;
  hotelPreference?: number;
  foodPreference?: string;

  stage: QueryStage;
  temperature: QueryTemperature;

  assignedSales?: Types.ObjectId;
  assignedOps?: Types.ObjectId;

  remark?: string;
  archived: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IQueryDocument extends IQuery, Document {}
