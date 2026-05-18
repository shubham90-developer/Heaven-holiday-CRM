import mongoose, { Schema } from 'mongoose';
import { ISupplierDocument } from './supplier.interface';

// ── Sub-schemas ───────────────────────────────────────────────────────────────

const supplierContactSchema = new Schema<any>(
  {
    salutation: {
      type: String,
      enum: ['Mr.', 'Ms.', 'Mrs.', 'Miss', 'Dr.'],
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    designation: { type: String, trim: true },
    department: { type: String, trim: true },
    email: { type: String, trim: true },
    countryCode: { type: String, trim: true, default: '+91' },
    phone: { type: String, required: true, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    expertiseDestinations: { type: String, trim: true },
    comments: { type: String, trim: true },
  },
  { _id: true, timestamps: false },
);

const supplierBankDetailSchema = new Schema<any>(
  {
    accountName: { type: String, trim: true },
    accountNumber: { type: String, required: true, trim: true },
    bankName: { type: String, trim: true },
    ifscCode: { type: String, trim: true },
    swiftCode: { type: String, trim: true },
    isPrimary: { type: Boolean, default: false },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    comments: { type: String, trim: true },
  },
  { _id: true, timestamps: false },
);

// ── Main schema ───────────────────────────────────────────────────────────────

const supplierSchema = new Schema<ISupplierDocument>(
  {
    // Company overview
    companyName: { type: String, required: true, trim: true },
    currency: {
      type: String,
      enum: [
        'INR',
        'USD',
        'EUR',
        'GBP',
        'AED',
        'AUD',
        'CAD',
        'SGD',
        'JPY',
        'CNY',
      ],
      default: 'INR',
    },
    gstRegistered: { type: Boolean, default: false },
    panNumber: { type: String, trim: true },

    // Primary contact person
    salutation: {
      type: String,
      enum: ['Mr.', 'Ms.', 'Mrs.', 'Miss', 'Dr.'],
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    designation: { type: String, trim: true },
    email: { type: String, required: true, trim: true },
    countryCode: { type: String, trim: true, default: '+91' },
    phone: { type: String, required: true, trim: true },

    // Address
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    otherCity: { type: String, trim: true },

    // Business details
    category: { type: String, required: true, trim: true },
    services: { type: String, required: true, trim: true },
    comments: { type: String, trim: true },
    expertiseDestinations: { type: String, trim: true },

    // Sub-collections
    contacts: { type: [supplierContactSchema], default: [] },
    bankDetails: { type: [supplierBankDetailSchema], default: [] },

    // Meta
    rm: { type: Schema.Types.ObjectId, ref: 'Staff' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Supplier = mongoose.model<ISupplierDocument>('Supplier', supplierSchema);
export default Supplier;
