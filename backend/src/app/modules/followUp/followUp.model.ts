import mongoose, { Schema } from 'mongoose';
import { IFollowUpDocument } from './followUp.interface';

const followUpSchema = new Schema<IFollowUpDocument>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    queryId: { type: Schema.Types.ObjectId, ref: 'Query' },

    activityType: { type: String, enum: ['call', 'todo'], required: true },
    direction: { type: String, enum: ['outgoing', 'incoming'] },
    outcome: { type: String, enum: ['answered', 'unanswered', 'notReachable'] },
    nextAction: {
      type: String,
      enum: ['callBack', 'todo', 'meeting', 'createQuery', 'lost'],
    },

    followUpDate: { type: Date, required: true },
    followUpTime: { type: String, required: true },
    remindBefore: { type: Number, default: 15 }, // minutes

    assignedTo: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    customerType: { type: String, enum: ['B2C', 'B2B'], required: true },

    details: { type: String, trim: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const FollowUp = mongoose.model<IFollowUpDocument>('FollowUp', followUpSchema);
export default FollowUp;
