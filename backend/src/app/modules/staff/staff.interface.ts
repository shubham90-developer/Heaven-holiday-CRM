// staff.interface.ts
import { Document, Types } from 'mongoose';

export type StaffStatus = 'active' | 'inactive';
export type SignatureType = 'default' | 'custom';

export interface IPermissionChild {
  key: string;
  label: string;
  isAllowed: boolean;
}

export interface IPermissionSection {
  key: string;
  title: string;
  isAllowed: boolean;
  children: IPermissionChild[];
}

export interface IStaff {
  firstName: string;
  lastName: string;
  email: string;

  countryCode: string;
  mobile: string;
  roleId: Types.ObjectId;
  departmentId: Types.ObjectId;
  reportTo?: Types.ObjectId;
  senderIdSelf: boolean;
  senderEmail?: string;
  secureLogin: boolean;
  apiBooking: boolean;
  masking: boolean;
  finance: boolean;
  archived: boolean;
  status: StaffStatus;
  permissions: IPermissionSection[];
  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  photograph?: string;
  signatureType: SignatureType;
  signature?: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IStaffDocument extends IStaff, Document {}
