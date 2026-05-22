import { Document } from 'mongoose';

export type TransportCategory =
  | 'itinerary'
  | 'point_to_point'
  | 'sic'
  | 'per_day';

export type TransportType = 'one_way' | 'round_trip';

export type VehicleCostType = 'normal' | 'km_based';

export type MarkUpType = 'Fixed %' | 'Percentage';

export type PointToPointSubType =
  | 'local_city_tour'
  | 'airport_transfer'
  | 'railway_station_transfer'
  | 'bus_stand_transfer'
  | 'port_transfer'
  | 'meal_transfer';

export type PerDayScopeType = 'state' | 'country';

export interface ISeason {
  from: Date;
  to: Date;
  markUpType: MarkUpType;
  b2c: number;
  b2b: number;
}

export interface ITransportRoute extends Document {
  routeId: string;

  // Category
  category: TransportCategory;

  // Sub-type — only for point_to_point
  subTypes: PointToPointSubType[];

  // Common fields (not in per_day)
  transportType?: TransportType;
  startCity?: string;
  destinationCity?: string;
  routeName?: string;

  // Only itinerary & point_to_point
  citiesIncluded?: string;
  noOfDays?: string;
  destinationsCovered?: string;
  sightseeingCovered?: string;

  // Common
  description?: string;
  pickupPointArea?: string;
  dropPointArea?: string;

  // BYO info (computed/display)
  forWithHotelBYO?: string;
  forLandOnlyBYO?: string;

  // Only per_day
  perDayScopeType?: PerDayScopeType;
  perDayScopeValue?: string;

  // Pricing
  vehicleCostType: VehicleCostType;
  currency: string;
  seasons: ISeason[];

  // Misc
  isWebsite: boolean;
  isActive: boolean;
}
