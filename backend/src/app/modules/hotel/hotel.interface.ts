import { Document, Types } from 'mongoose';

export type StarRating =
  | '1 Star'
  | '2 Star'
  | '3 Star'
  | '4 Star'
  | '5 Star'
  | 'NA Star';
export type PropertyType =
  | 'Hotel'
  | 'Resort'
  | 'Villa'
  | 'Hostel'
  | 'Apartment'
  | 'Guesthouse'
  | 'Homestay';
export type WeekendDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';
export type ChildAgePolicy =
  | '3 year'
  | '5 year'
  | '6 year'
  | '8 year'
  | '10 year'
  | '12 year';

export interface IRoomType {
  roomTypeName: string;
  maxOccupancy: number;
  extraBedAllowed: boolean;
}

export interface IHotelImage {
  url: string;
  caption?: string;
  isPrimary: boolean;
}

export interface IHotelAmenity {
  name: string;
  category: 'General' | 'Room' | 'Dining' | 'Recreation' | 'Business';
}

export interface IHotel extends Document {
  hotelId: string;
  hotelName: string;
  cityName: string;
  state?: string;
  address?: string;
  contactEmail?: string;
  contactNumber?: string;
  countryCode: string;
  starRating: StarRating;
  propertyType: PropertyType;
  checkInTime: string;
  checkOutTime: string;
  weekend: WeekendDay[];
  roomTypes: IRoomType[];
  childAgePolicy: ChildAgePolicy;
  supplier?: string;
  currency: string;
  dcw?: string;
  amenities: IHotelAmenity[];
  images: IHotelImage[];
  description?: string;
  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
