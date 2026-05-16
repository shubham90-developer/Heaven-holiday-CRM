import mongoose, { Schema } from 'mongoose';
import { IProposalDocument } from './proposal.interface';

const proposalSchema = new Schema<IProposalDocument>(
  {
    queryId: { type: Schema.Types.ObjectId, ref: 'Query', required: true },
    leadId: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },

    packageDetails: {
      hotels: [{ type: String }],
      flights: [{ type: String }],
      sightseeing: [{ type: String }],
      transfers: [{ type: String }],
      notes: { type: String },
    },

    basePrice: { type: Number, required: true, default: 0 },
    markup: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    status: {
      type: String,
      enum: ['draft', 'sent', 'accepted', 'rejected'],
      default: 'draft',
    },
    sentAt: { type: Date },
  },
  { timestamps: true },
);

const Proposal = mongoose.model<IProposalDocument>('Proposal', proposalSchema);
export default Proposal;
