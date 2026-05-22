import { Document } from 'mongoose';

export interface IRate {
  rateType: string;
  amount: number;
  currency: string;
}

export interface IRestaurant extends Document {
  restaurantId: string;
  city: string;
  address: string;
  restaurantArea: string;
  supplierName: string;
  currency: string;
  isPreferred: boolean;
  mealName: string;
  isVeg: boolean;
  isNonVeg: boolean;
  isAI: boolean; // All Inclusive
  rates: IRate[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
