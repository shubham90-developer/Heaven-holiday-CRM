import mongoose, { Schema } from 'mongoose';
import { ICompanyProfile } from './company-interface';
const BankDetailSchema = new Schema(
  {
    accountName: { type: String, required: true, trim: true },
    accountNo: { type: String, required: true, trim: true },
    ifscSortCode: { type: String, required: true, trim: true },
    accountType: { type: String, required: true, trim: true },
    bankName: { type: String, required: true, trim: true },
    branch: { type: String, required: true, trim: true },
  },
  { _id: true, timestamps: false },
);

const OwnerDetailSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    contactNo: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    gstinNumber: { type: String, required: true, trim: true },
    emailId: { type: String, required: true, trim: true, lowercase: true },
  },
  { _id: false },
);

const GeneralInformationSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    companyDisplayName: { type: String, required: true, trim: true },
    website: { type: String, trim: true, default: '' },
    contactPerson: { type: String, required: true, trim: true },
    registeredAddress: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, trim: true },
    aboutCompany: { type: String, default: '' },
    landlineNumber: { type: String, default: '' },
    companyLogo: { type: String, default: '' },
  },
  { _id: false },
);

const MoreInformationSchema = new Schema(
  {
    senderEmailId: { type: String, trim: true, lowercase: true, default: '' },
    natureOfBusiness: { type: String, trim: true, default: '' },
  },
  { _id: false },
);

const CompanyProfileSchema = new Schema<ICompanyProfile>(
  {
    generalInformation: {
      type: GeneralInformationSchema,
      required: true,
    },
    ownerDetail: {
      type: OwnerDetailSchema,
      required: true,
    },
    bankDetails: {
      type: [BankDetailSchema],
      default: [],
    },
    moreInformation: {
      type: MoreInformationSchema,
      default: {},
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const CompanyProfile = mongoose.model<ICompanyProfile>(
  'CompanyProfile',
  CompanyProfileSchema,
);

export default CompanyProfile;
