import { Schema, model } from 'mongoose';
import { ILeadDocument } from './lead.interface';

const LeadSchema = new Schema<ILeadDocument>(
  {
    type: {
      type: String,
      enum: ['B2C', 'B2B'],
      required: true,
    },

    salutation: {
      type: String,
      enum: ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'],
      default: null,
    },
    firstName: {
      type: String,
      trim: true,
      default: null,
    },
    lastName: {
      type: String,
      trim: true,
      default: null,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
      default: null,
    },
    agentType: {
      type: String,
      enum: ['Agency', 'Corporate'],
      default: null,
    },
    remarks: {
      type: String,
      trim: true,
      default: null,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    leadSource: {
      type: Schema.Types.ObjectId,
      ref: 'LeadSource',
      required: true,
    },
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

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
    },
    isDuplicate: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

LeadSchema.pre('save', function (next) {
  if (this.type === 'B2B' && !this.companyName) {
    return next(new Error('companyName is required for B2B leads'));
  }

  if (this.firstName) {
    this.customerName = [this.salutation, this.firstName, this.lastName]
      .filter(Boolean)
      .join(' ');
  }
  next();
});

LeadSchema.index({ phone: 1 });
LeadSchema.index({ leadSource: 1 });
LeadSchema.index({ owner: 1 });
LeadSchema.index({ status: 1, archived: 1 });

export const Lead = model<ILeadDocument>('Lead', LeadSchema);
