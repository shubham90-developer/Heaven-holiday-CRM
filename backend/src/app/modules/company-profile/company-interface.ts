import { Document } from 'mongoose';

export interface IBankDetail {
  accountName: string;
  accountNo: string;
  ifscSortCode: string;
  accountType: string;
  bankName: string;
  branch: string;
}

export interface IOwnerDetail {
  fullName: string;
  designation: string;
  contactNo: string;
  role: string;
  mobileNumber: string;
  gstinNumber: string;
  emailId: string;
}

export interface IGeneralInformation {
  companyName: string;
  email: string;
  companyDisplayName: string;
  website?: string;
  contactPerson: string;
  registeredAddress: string;
  mobileNumber: string;
  aboutCompany?: string;
  landlineNumber?: string;
  companyLogo?: string;
}

export interface IMoreInformation {
  senderEmailId?: string;
  natureOfBusiness?: string;
}

export interface ICompanyProfile extends Document {
  generalInformation: IGeneralInformation;
  ownerDetail: IOwnerDetail;
  bankDetails: IBankDetail[];
  moreInformation: IMoreInformation;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
