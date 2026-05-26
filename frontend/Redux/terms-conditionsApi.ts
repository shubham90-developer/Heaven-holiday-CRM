import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ITermsConditions {
  _id: string;
  tcDomesticHolidays: string;
  tcInternationalHolidays: string;
  cancellationPolicyDomesticHolidays: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateTermsConditions {
  tcDomesticHolidays?: string;
  tcInternationalHolidays?: string;
  cancellationPolicyDomesticHolidays?: string;
}

// ─── Response Types ───────────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const termsConditionsApi = createApi({
  reducerPath: "termsConditionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["TermsConditions"],
  endpoints: (builder) => ({
    // GET /terms-conditions
    getTermsConditions: builder.query<ApiResponse<ITermsConditions>, void>({
      query: () => "/terms-conditions",
      providesTags: ["TermsConditions"],
    }),

    // PATCH /terms-conditions
    updateTermsConditions: builder.mutation<
      ApiResponse<ITermsConditions>,
      IUpdateTermsConditions
    >({
      query: (body) => ({
        url: "/terms-conditions",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["TermsConditions"],
    }),
  }),
});

export const { useGetTermsConditionsQuery, useUpdateTermsConditionsMutation } =
  termsConditionsApi;
