import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
export type StaffStatus = "active" | "inactive";
export type SignatureType = "default" | "custom";

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
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobile: string;

  roleId: string | { _id: string; title: string };
  departmentId: string | { _id: string; name: string };
  reportTo?:
    | string
    | {
        _id: string;
        firstName: string;
        lastName: string;
      };

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

  createdAt: string;
  updatedAt: string;
}

export interface ICreateStaff {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  countryCode?: string;
  mobile: string;

  roleId: string;
  departmentId: string;
  reportTo?: string;

  senderIdSelf?: boolean;
  senderEmail?: string;

  secureLogin?: boolean;
  apiBooking?: boolean;
  masking?: boolean;
  finance?: boolean;
  archived?: boolean;

  status?: StaffStatus;
  permissions?: IPermissionSection[];

  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  photograph?: string;

  signatureType?: SignatureType;
  signature?: string;
}

export interface IUpdateStaff extends Partial<ICreateStaff> {}

export interface IUpdateStaffFlags {
  secureLogin?: boolean;
  apiBooking?: boolean;
  masking?: boolean;
  finance?: boolean;
  archived?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token"); // ← read token from cookie
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    // GET /api/staff
    getAllStaff: builder.query<ApiResponse<IStaff[]>, { archived?: boolean }>({
      query: ({ archived = false } = {}) => ({
        url: "/staff",
        params: { archived },
      }),

      providesTags: ["Staff"],
    }),

    // GET /api/staff/:id
    getStaffById: builder.query<ApiResponse<IStaff>, string>({
      query: (id) => `/staff/${id}`,

      providesTags: ["Staff"],
    }),

    // POST /api/staff
    createStaff: builder.mutation<ApiResponse<IStaff>, ICreateStaff>({
      query: (body) => ({
        url: "/staff",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Staff"],
    }),

    // PUT /api/staff/:id
    updateStaff: builder.mutation<
      ApiResponse<IStaff>,
      { id: string; body: IUpdateStaff }
    >({
      query: ({ id, body }) => ({
        url: `/staff/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: ["Staff"],
    }),

    // PATCH /api/staff/:id/flags
    updateStaffFlags: builder.mutation<
      ApiResponse<IStaff>,
      { id: string; body: IUpdateStaffFlags }
    >({
      query: ({ id, body }) => ({
        url: `/staff/${id}/flags`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetAllStaffQuery,
  useGetStaffByIdQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useUpdateStaffFlagsMutation,
} = staffApi;
