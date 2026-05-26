import mongoose, { Schema } from 'mongoose';
import { ILeadSource } from './lead.interface';

const LeadSourceSchema = new Schema<ILeadSource>(
  {
    leadSourceId: { type: String, unique: true },
    leadSourceName: { type: String, required: true, trim: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Auto-generate leadSourceId
LeadSourceSchema.pre('save', async function (next) {
  if (!this.leadSourceId) {
    const count = await mongoose.model('LeadSource').countDocuments();
    this.leadSourceId = `LS${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

const LeadSource = mongoose.model<ILeadSource>('LeadSource', LeadSourceSchema);

export default LeadSource;
