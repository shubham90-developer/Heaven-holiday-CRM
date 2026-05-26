import { Document } from 'mongoose';

export type EmailTemplateStatus = 'active' | 'deactive';

export interface IEmailTemplate {
  templateName: string;
  subject: string;
  messageBody: string;
  status: EmailTemplateStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmailTemplateDocument extends IEmailTemplate, Document {}
