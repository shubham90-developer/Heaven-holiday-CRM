import mongoose, { Schema } from 'mongoose';
import { ILeadDocument } from './lead.interface';

const leadSchema = new Schema<ILeadDocument>(
  {
    customerName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },

    type: { type: String, enum: ['B2C', 'B2B'], required: true },
    source: { type: String, required: true, trim: true },
    temperature: {
      type: String,
      enum: ['hot', 'warm', 'cold', 'no-status'],
      default: 'no-status',
    },

    status: {
      type: String,
      enum: ['unassigned', 'inProcess', 'callback', 'archived'],
      default: 'unassigned',
    },
    leadStage: {
      type: String,
      enum: ['new', 'followUp', 'confirmed', 'rejected', 'lost'],
      default: 'new',
    },
    isDuplicate: { type: Boolean, default: false },

    owner: { type: Schema.Types.ObjectId, ref: 'Staff' },

    remark: { type: String, trim: true },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Auto-detect duplicate on save (same phone or email)
leadSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const query: any[] = [{ phone: this.phone }];
  if (this.email) query.push({ email: this.email });

  const existing = await Lead.findOne({ $or: query });
  if (existing) this.isDuplicate = true;

  next();
});

const Lead = mongoose.model<ILeadDocument>('Lead', leadSchema);
export default Lead;
