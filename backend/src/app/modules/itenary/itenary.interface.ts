import { Document } from 'mongoose';

export interface IItinerary extends Document {
  itineraryId: string;

  // Core fields (from UI)
  startCity: string;
  destinationCity: string;
  title: string;
  description: string; // rich-text HTML from the editor

  // Meta
  isActive: boolean;
}
