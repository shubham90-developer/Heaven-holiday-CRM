// staff.model.ts
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IStaffDocument } from './staff.interface';

const permissionChildSchema = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    isAllowed: { type: Boolean, default: false },
  },
  { _id: false },
);

const permissionSectionSchema = new Schema(
  {
    key: { type: String, required: true },
    title: { type: String, required: true },
    isAllowed: { type: Boolean, default: false },
    children: { type: [permissionChildSchema], default: [] },
  },
  { _id: false },
);

const staffSchema = new Schema<IStaffDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    countryCode: { type: String, required: true, default: '+91' },
    mobile: { type: String, required: true, trim: true },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    reportTo: { type: Schema.Types.ObjectId, ref: 'Staff' },
    senderIdSelf: { type: Boolean, default: false },
    senderEmail: { type: String, trim: true },
    secureLogin: { type: Boolean, default: false },
    apiBooking: { type: Boolean, default: false },
    masking: { type: Boolean, default: false },
    finance: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    permissions: { type: [permissionSectionSchema], default: [] },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    address: { type: String, trim: true },
    photograph: { type: String },
    signatureType: {
      type: String,
      enum: ['default', 'custom'],
      default: 'default',
    },
    signature: { type: String },
  },
  { timestamps: true },
);

// Auto-hash password before save
staffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
staffSchema.methods.comparePassword = async function (
  candidate: string,
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

const Staff = mongoose.model<IStaffDocument>('Staff', staffSchema);
export default Staff;
