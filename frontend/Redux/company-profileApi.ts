import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IBankDetail {
  _id: string;
  accountName: string;
  accountNo: string;
  ifscSortCode: string;
  accountType: string;
  bankName: string;
  branch: string;
  country: string;
  city: string;
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

export interface ICompanyProfile {
  _id: string;
  generalInformation: IGeneralInformation;
  ownerDetail: IOwnerDetail;
  bankDetails: IBankDetail[];
  moreInformation: IMoreInformation;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Input Types ──────────────────────────────────────────────────────────────

export interface ICreateCompanyProfile {
  generalInformation: IGeneralInformation;
  ownerDetail: IOwnerDetail;
  bankDetails?: Omit<IBankDetail, "_id">[];
  moreInformation?: IMoreInformation;
}

export interface IUpdateCompanyProfile {
  generalInformation?: Partial<IGeneralInformation>;
  ownerDetail?: Partial<IOwnerDetail>;
  moreInformation?: Partial<IMoreInformation>;
}

export type IAddBankDetail = Omit<IBankDetail, "_id">;
export type IUpdateBankDetail = Partial<IAddBankDetail>;

// ─── Response Types ───────────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const companyProfileApi = createApi({
  reducerPath: "companyProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["CompanyProfile"],
  endpoints: (builder) => ({
    // GET /company-profile
    getCompanyProfile: builder.query<ApiResponse<ICompanyProfile>, void>({
      query: () => "/company-profile",
      providesTags: ["CompanyProfile"],
    }),

    // POST /company-profile
    createCompanyProfile: builder.mutation<
      ApiResponse<ICompanyProfile>,
      ICreateCompanyProfile
    >({
      query: (body) => ({
        url: "/company-profile",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CompanyProfile"],
    }),

    // PATCH /company-profile
    updateCompanyProfile: builder.mutation<
      ApiResponse<ICompanyProfile>,
      IUpdateCompanyProfile
    >({
      query: (body) => ({
        url: "/company-profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CompanyProfile"],
    }),

    // POST /company-profile/bank-details
    addBankDetail: builder.mutation<ApiResponse<IBankDetail[]>, IAddBankDetail>(
      {
        query: (body) => ({
          url: "/company-profile/bank-details",
          method: "POST",
          body,
        }),
        invalidatesTags: ["CompanyProfile"],
      },
    ),

    // PATCH /company-profile/bank-details/:bankId
    updateBankDetail: builder.mutation<
      ApiResponse<IBankDetail[]>,
      { bankId: string; body: IUpdateBankDetail }
    >({
      query: ({ bankId, body }) => ({
        url: `/company-profile/bank-details/${bankId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CompanyProfile"],
    }),

    // DELETE /company-profile/bank-details/:bankId
    deleteBankDetail: builder.mutation<ApiResponse<IBankDetail[]>, string>({
      query: (bankId) => ({
        url: `/company-profile/bank-details/${bankId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyProfile"],
    }),
  }),
});

export const {
  useGetCompanyProfileQuery,
  useCreateCompanyProfileMutation,
  useUpdateCompanyProfileMutation,
  useAddBankDetailMutation,
  useUpdateBankDetailMutation,
  useDeleteBankDetailMutation,
} = companyProfileApi;
