import { z } from 'zod';

const objectIdString = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, 'Invalid ObjectId');

const starRatingEnum = z.enum([
  '1 Star',
  '2 Star',
  '3 Star',
  '4 Star',
  '5 Star',
  'NA Star',
]);

const propertyTypeEnum = z.enum([
  'Hotel',
  'Resort',
  'Villa',
  'Hostel',
  'Apartment',
  'Guesthouse',
  'Homestay',
]);

const weekendDayEnum = z.enum([
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]);

const childAgePolicyEnum = z.enum([
  '3 year',
  '5 year',
  '6 year',
  '8 year',
  '10 year',
  '12 year',
]);

const roomTypeSchema = z.object({
  roomTypeName: z.string().min(1, 'Room type name is required').trim(),
  description: z.string().optional(),
  maxOccupancy: z.number().int().min(1).default(2),
  extraBedAllowed: z.boolean().default(false),
});

const hotelImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  caption: z.string().optional(),
  isPrimary: z.boolean().default(false),
});

const hotelAmenitySchema = z.object({
  name: z.string().min(1),
  category: z
    .enum(['General', 'Room', 'Dining', 'Recreation', 'Business'])
    .default('General'),
});

// ─── Create ───────────────────────────────────────────────────────────────────

export const createHotelSchema = z.object({
  hotelName: z.string().min(2, 'Hotel name is required').trim(),
  cityName: z.string().min(1, 'City name is required').trim(),
  state: z.string().trim().optional(),
  address: z.string().optional(),
  contactEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  contactNumber: z.string().optional(),
  countryCode: z.string().default('+91'),
  starRating: starRatingEnum.default('NA Star'),
  propertyType: propertyTypeEnum.default('Hotel'),
  checkInTime: z.string().default('11:00'),
  checkOutTime: z.string().default('12:00'),
  weekend: z.array(weekendDayEnum).default(['Saturday', 'Sunday']),
  roomTypes: z.array(roomTypeSchema).default([]),
  childAgePolicy: childAgePolicyEnum.default('3 year'),
  supplier: z.string().optional(),
  currency: z.string().default('INR'),
  dcw: z.string().optional(),
  amenities: z.array(hotelAmenitySchema).default([]),
  images: z.array(hotelImageSchema).default([]),
  description: z.string().optional(),
  createdBy: objectIdString,
});

// ─── Update (all fields optional except updatedBy) ────────────────────────────

export const updateHotelSchema = createHotelSchema
  .omit({ createdBy: true })
  .partial()
  .extend({ updatedBy: objectIdString });

// ─── Query ────────────────────────────────────────────────────────────────────

export const hotelQuerySchema = z.object({
  hotelName: z.string().optional(),
  cityName: z.string().optional(),
  country: z.string().optional(),
  starRating: starRatingEnum.optional(),
  propertyType: propertyTypeEnum.optional(),
  supplier: z.string().optional(),
  hotelId: z.string().optional(),
  isActive: z
    .string()
    .transform((v) => v === 'true')
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
export type HotelQueryInput = z.infer<typeof hotelQuerySchema>;
