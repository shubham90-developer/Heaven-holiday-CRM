import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ISuperAdminDocument extends Document {
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const superAdminSchema = new Schema<ISuperAdminDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

superAdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

superAdminSchema.methods.comparePassword = async function (
  candidate: string,
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

const SuperAdmin = mongoose.model<ISuperAdminDocument>(
  'SuperAdmin',
  superAdminSchema,
);
export default SuperAdmin;
