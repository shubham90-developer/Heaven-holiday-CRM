// query.interface.ts
import { Document, Types } from 'mongoose';

export type RequirementType =
  | 'Package'
  | 'Flight'
  | 'Transfer'
  | 'Visa'
  | 'Hotel'
  | 'Sightseeing'
  | 'Miscellaneous';
export type QueryType = 'FIT' | 'GIT';
export type TripType = 'OneWay' | 'RoundTrip' | 'MultiCity';
export type TransferMode = 'Cab' | 'Train';
export type FlightClass = 'Economy' | 'Business' | 'First' | 'PremiumEconomy';

// ── sub-schemas per requirement type ────────────────────────────────────────

export interface IPackageInfo {
  queryType: QueryType;
  goingTo?: string;
  goingFrom?: string;
  specificDate?: Date;
  noOfDays?: number;
  travelers?: number;
  priceRange?: string;
  inclusions?: string;
  theme?: string;
  hotelPreference?: 1 | 2 | 3 | 4 | 5;
  assignToOps?: boolean;
}

export interface IFlightInfo {
  tripType: TripType;
  isGroup?: boolean;
  sourceCity?: string;
  destinationCity?: string;
  departureDate?: Date;
  adults?: number;
  children?: number; // 2-11 yrs
  infants?: number; // 0-2 yrs
  class?: FlightClass;
  fareType?: 'Regular' | 'Student' | 'SeniorCitizen' | 'Direct';
  preferredAirline?: string;
  leadSource?: string;
  assignToSales?: Types.ObjectId;
  assignToOps?: boolean;
  addRemark?: string;
}

export interface ITransferInfo {
  mode: TransferMode;
  tripType: 'OneWay' | 'RoundTrip';
  goingTo?: string;
  goingFrom?: string;
  pickupDateTime?: Date;
  noOfDays?: number;
  travelers?: number;
  pickupLocation?: string;
  preference?: string;
  leadSource?: string;
  assignToSales?: Types.ObjectId;
  assignToOps?: boolean;
  addRemark?: string;
}

export interface IVisaInfo {
  country?: string;
  visaCategory?: string;
  entryType?: string;
  dateOfTravel?: Date;
  adults?: number;
  child?: number;
  childWithFamily?: number;
  infant?: number;
  duration?: string;
  nationality?: string;
  leadSource?: string;
  assignToSales?: Types.ObjectId;
  assignToOps?: boolean;
  addRemark?: string;
}

export interface IHotelInfo {
  destination?: string;
  checkIn?: Date;
  checkOut?: Date;
  nights?: number;
  travelers?: number;
  nationality?: string;
  starRating?: string;
  foodPreference?: string;
  leadSource?: string;
  assignToSales?: Types.ObjectId;
  assignToOps?: boolean;
  addRemarks?: string;
}

export interface ISightseeingInfo {
  destination?: string;
  duration?: number; // no. of days
  adults?: number;
  children?: number; // 0-12
  nationality?: string;
  leadSource?: string;
  assignToSales?: Types.ObjectId;
  assignToOps?: boolean;
  addRemark?: string;
}

export interface IMiscellaneousInfo {
  service?: string;
  destination?: string;
  selectDate?: Date;
  count?: number;
  leadSource?: string;
  assignToSales?: Types.ObjectId;
  assignToOps?: boolean;
  addRemark?: string;
}

// ── root query interface ─────────────────────────────────────────────────────

export interface IQuery {
  lead: Types.ObjectId;
  requirementType: RequirementType;

  // common header fields (shown in all forms)
  goingFrom?: string;
  goingTo?: string;
  travelDate?: Date;

  // one of these will be populated depending on requirementType
  packageInfo?: IPackageInfo;
  flightInfo?: IFlightInfo;
  transferInfo?: ITransferInfo;
  visaInfo?: IVisaInfo;
  hotelInfo?: IHotelInfo;
  sightseeingInfo?: ISightseeingInfo;
  miscellaneousInfo?: IMiscellaneousInfo;

  createdBy?: Types.ObjectId;
  status?: 'new' | 'inProcess' | 'confirmed' | 'rejected' | 'lost';
}

export interface IQueryDocument extends IQuery, Document {}
