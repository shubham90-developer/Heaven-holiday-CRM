import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ILoginRequest {
  email: string;
  password: string;
}

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

export interface ILoginResponse {
  success: boolean;
  message: string;
  token: string;
  permissions?: IPermissionSection[];
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    superadminLogin: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: "/auth/superadmin/login",
        method: "POST",
        body,
      }),
    }),

    staffLogin: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: "/auth/staff/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSuperadminLoginMutation, useStaffLoginMutation } = authApi;
