import mongoose, { Schema, Document } from 'mongoose';
import { IRoleDocument } from './roles.interface';

const RoleSchema = new Schema<IRoleDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    roleType: {
      type: String,
      enum: ['superAdmin', 'reportManager'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true },
);

const Role = mongoose.model<IRoleDocument>('Role', RoleSchema);

export default Role;
