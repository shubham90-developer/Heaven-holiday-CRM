import mongoose, { Schema } from 'mongoose';
import { IEmailTemplateDocument } from './email.interface';

const emailTemplateSchema = new Schema<IEmailTemplateDocument>(
  {
    templateName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    messageBody: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'deactive'],
      default: 'active',
    },
  },
  { timestamps: true },
);

emailTemplateSchema.index({ templateName: 'text', subject: 'text' });

const EmailTemplate = mongoose.model<IEmailTemplateDocument>(
  'EmailTemplate',
  emailTemplateSchema,
);

export default EmailTemplate;
