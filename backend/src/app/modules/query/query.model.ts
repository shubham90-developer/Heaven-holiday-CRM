import mongoose, { Schema } from 'mongoose';
import { IQueryDocument } from './query.interface';

const querySchema = new Schema<IQueryDocument>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    queryNumber: { type: String, unique: true },

    requirementType: {
      type: String,
      enum: [
        'package',
        'flight',
        'hotel',
        'visa',
        'transfer',
        'sightseeing',
        'miscellaneous',
      ],
      required: true,
    },
    queryType: { type: String, enum: ['FIT', 'GIT'], required: true },

    goingTo: { type: String, required: true, trim: true },
    goingFrom: { type: String, trim: true },
    travelDate: { type: Date },
    noOfDays: { type: Number },
    travelers: { type: Number, required: true, default: 1 },

    priceRange: { type: String, trim: true },
    inclusions: [{ type: String }],
    theme: { type: String, trim: true },
    hotelPreference: { type: Number, min: 1, max: 5 },
    foodPreference: { type: String, trim: true },

    stage: {
      type: String,
      enum: [
        'queryCreated',
        'proposalPending',
        'proposalSent',
        'confirmed',
        'rejected',
      ],
      default: 'queryCreated',
    },
    temperature: {
      type: String,
      enum: ['hot', 'warm', 'cold', 'no-status'],
      default: 'no-status',
    },

    assignedSales: { type: Schema.Types.ObjectId, ref: 'Staff' },
    assignedOps: { type: Schema.Types.ObjectId, ref: 'Staff' },

    remark: { type: String, trim: true },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Auto-generate query number before save: Q/YY/randomNumber
querySchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000000 + Math.random() * 9000000); // 7-digit
  this.queryNumber = `Q/${year}/${random}`;

  next();
});

const Query = mongoose.model<IQueryDocument>('Query', querySchema);
export default Query;
