import mongoose, { Document, Schema } from 'mongoose';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const DIFFICULTY_LEVELS = [
  'Easy',
  'Moderate',
  'Hard',
  'Extreme',
] as const;
export const SEASONS = [
  'Summer',
  'Winter',
  'Monsoon',
  'Spring',
  'Autumn',
  'All Season',
] as const;
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
export const POPULARITY_LEVELS = [
  'Low',
  'Medium',
  'High',
  'Very High',
] as const;

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ISightseeing extends Document {
  sightseeingId: string;

  // Basic Info
  country: string;
  city: string;
  sightseeingName: string;
  latitude: number;
  longitude: number;
  address?: string;

  // Image
  image?: string; // stored URL after upload

  // Rich Text Sections
  details?: string; // "Details" rich text
  otherInclusions?: string; // "Other inclusions"
  advisory?: string; // "Advisory"
  cancellationPolicy?: string; // "Cancellation Policy"
  refundPolicy?: string; // "Refund Policy"
  confirmationPolicy?: string; // "Confirmation Policy"
  termsAndConditions?: string; // "Term & Condition's"

  // Other Details
  category?: string;
  activities?: string[];
  difficultyLevel?: (typeof DIFFICULTY_LEVELS)[number];
  season?: (typeof SEASONS)[number];
  daysOfWeek?: (typeof DAYS_OF_WEEK)[number][];
  popularity?: (typeof POPULARITY_LEVELS)[number];
  thingsToCarry?: string[];
  pickUpPoint?: string;
  pickUpTime?: string;

  // Pax
  paxMin?: number;
  paxMax?: number;

  // Duration
  durationHours?: number;
  durationMinutes?: number;

  // Allowed Age Group
  allowedAgeFrom?: number;
  allowedAgeTo?: number;

  // Meta
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}
