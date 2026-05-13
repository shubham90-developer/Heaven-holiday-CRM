// department.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IDepartmentDocument } from './dept.interface';

const departmentSchema = new Schema<IDepartmentDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    is_operations: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'deactive'],
      default: 'active',
    },
  },
  { timestamps: true },
);

const Department = mongoose.model<IDepartmentDocument>(
  'Department',
  departmentSchema,
);

export default Department;
