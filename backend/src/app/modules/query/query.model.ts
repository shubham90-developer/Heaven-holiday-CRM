// query.model.ts
import { Schema, model } from 'mongoose';
import { IQueryDocument } from './query.interface';

const PackageInfoSchema = new Schema(
  {
    queryType: { type: String, enum: ['FIT', 'GIT'] },
    goingTo: { type: String, trim: true, default: null },
    goingFrom: { type: String, trim: true, default: null },
    specificDate: { type: Date, default: null },
    noOfDays: { type: Number, default: null },
    travelers: { type: Number, default: null },
    priceRange: { type: String, default: null },
    inclusions: { type: String, default: null },
    theme: { type: String, default: null },
    hotelPreference: { type: Number, enum: [1, 2, 3, 4, 5], default: null },
    assignToOps: { type: Boolean, default: false },
  },
  { _id: false },
);

const FlightInfoSchema = new Schema(
  {
    tripType: { type: String, enum: ['OneWay', 'RoundTrip', 'MultiCity'] },
    isGroup: { type: Boolean, default: false },
    sourceCity: { type: String, trim: true, default: null },
    destinationCity: { type: String, trim: true, default: null },
    departureDate: { type: Date, default: null },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    infants: { type: Number, default: 0 },
    class: {
      type: String,
      enum: ['Economy', 'Business', 'First', 'PremiumEconomy'],
      default: 'Economy',
    },
    fareType: {
      type: String,
      enum: ['Regular', 'Student', 'SeniorCitizen', 'Direct'],
      default: 'Regular',
    },
    preferredAirline: { type: String, default: null },
    leadSource: { type: String, default: null },
    assignToSales: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    assignToOps: { type: Boolean, default: false },
    addRemark: { type: String, default: null },
  },
  { _id: false },
);

const TransferInfoSchema = new Schema(
  {
    mode: { type: String, enum: ['Cab', 'Train'] },
    tripType: { type: String, enum: ['OneWay', 'RoundTrip'] },
    goingTo: { type: String, trim: true, default: null },
    goingFrom: { type: String, trim: true, default: null },
    pickupDateTime: { type: Date, default: null },
    noOfDays: { type: Number, default: null },
    travelers: { type: Number, default: null },
    pickupLocation: { type: String, default: null },
    preference: { type: String, default: null },
    leadSource: { type: String, default: null },
    assignToSales: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    assignToOps: { type: Boolean, default: false },
    addRemark: { type: String, default: null },
  },
  { _id: false },
);

const VisaInfoSchema = new Schema(
  {
    country: { type: String, trim: true, default: null },
    visaCategory: { type: String, default: null },
    entryType: { type: String, default: null },
    dateOfTravel: { type: Date, default: null },
    adults: { type: Number, default: null },
    child: { type: Number, default: null },
    childWithFamily: { type: Number, default: null },
    infant: { type: Number, default: null },
    duration: { type: String, default: null },
    nationality: { type: String, default: 'India' },
    leadSource: { type: String, default: null },
    assignToSales: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    assignToOps: { type: Boolean, default: false },
    addRemark: { type: String, default: null },
  },
  { _id: false },
);

const HotelInfoSchema = new Schema(
  {
    destination: { type: String, trim: true, default: null },
    checkIn: { type: Date, default: null },
    checkOut: { type: Date, default: null },
    nights: { type: Number, default: 1 },
    travelers: { type: Number, default: 1 },
    nationality: { type: String, default: 'India' },
    starRating: { type: String, default: 'Any' },
    foodPreference: { type: String, default: null },
    leadSource: { type: String, default: null },
    assignToSales: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    assignToOps: { type: Boolean, default: false },
    addRemarks: { type: String, default: null },
  },
  { _id: false },
);

const SightseeingInfoSchema = new Schema(
  {
    destination: { type: String, trim: true, default: null },
    duration: { type: Number, default: null },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    nationality: { type: String, default: 'India' },
    leadSource: { type: String, default: null },
    assignToSales: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    assignToOps: { type: Boolean, default: false },
    addRemark: { type: String, default: null },
  },
  { _id: false },
);

const MiscellaneousInfoSchema = new Schema(
  {
    service: { type: String, default: null },
    destination: { type: String, trim: true, default: null },
    selectDate: { type: Date, default: null },
    count: { type: Number, default: 0 },
    leadSource: { type: String, default: null },
    assignToSales: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    assignToOps: { type: Boolean, default: false },
    addRemark: { type: String, default: null },
  },
  { _id: false },
);

const QuerySchema = new Schema<IQueryDocument>(
  {
    lead: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    requirementType: {
      type: String,
      enum: [
        'Package',
        'Flight',
        'Transfer',
        'Visa',
        'Hotel',
        'Sightseeing',
        'Miscellaneous',
      ],
      required: true,
    },

    // common header
    goingFrom: { type: String, trim: true, default: null },
    goingTo: { type: String, trim: true, default: null },
    travelDate: { type: Date, default: null },

    // type-specific info (only one populated per document)
    packageInfo: { type: PackageInfoSchema, default: null },
    flightInfo: { type: FlightInfoSchema, default: null },
    transferInfo: { type: TransferInfoSchema, default: null },
    visaInfo: { type: VisaInfoSchema, default: null },
    hotelInfo: { type: HotelInfoSchema, default: null },
    sightseeingInfo: { type: SightseeingInfoSchema, default: null },
    miscellaneousInfo: { type: MiscellaneousInfoSchema, default: null },

    createdBy: { type: Schema.Types.ObjectId, ref: 'Staff', default: null },
    status: {
      type: String,
      enum: ['new', 'inProcess', 'confirmed', 'rejected', 'lost'],
      default: 'new',
    },
  },
  { timestamps: true },
);

QuerySchema.index({ lead: 1 });
QuerySchema.index({ requirementType: 1 });
QuerySchema.index({ status: 1 });

export const Query = model<IQueryDocument>('Query', QuerySchema);
