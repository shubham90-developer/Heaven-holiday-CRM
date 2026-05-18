import { Request } from 'express';

export interface userInterface extends Request {
  user?: {
    _id: string;
    email: string;
    role?: string;
    permissions?: {
      key: string;
      title: string;
      isAllowed: boolean;
      children: {
        key: string;
        label: string;
        isAllowed: boolean;
      }[];
    }[];
    status?: string;
    archived?: boolean;
    [key: string]: any; // allow any other fields from Staff or SuperAdmin
  };
}
