import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BookingType = "On Request" | "Real Time";

export interface ISupplierRef {
  _id: string;
  companyName: string;
  city: string;
  country: string;
  currency: string;
}

export interface ISightseeingRef {
  _id: string;
  sightseeingName: string;
  city: string;
  country: string;
}

export interface ISightseeingRate {
  _id: string;
  rateId: string;
  sightseeingId: ISightseeingRef;
  city: string;
  from: string;
  to: string;
  supplier: ISupplierRef;
  currency: string;
  entryFeeAdult: number;
  entryFeeKids: number;
  costMarkup: number;
  bookingType: BookingType;
  termsAndConditions?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSightseeingRate {
  sightseeingId: string;
  city: string;
  from: string;
  to: string;
  supplier: string; // ObjectId string
  currency: string;
  entryFeeAdult: number;
  entryFeeKids: number;
  costMarkup?: number;
  bookingType: BookingType;
  termsAndConditions?: string;
}

export interface IUpdateSightseeingRate extends Partial<ICreateSightseeingRate> {}

export interface ISightseeingRateQuery {
  sightseeingId?: string;
  city?: string;
  supplier?: string;
  currency?: string;
  bookingType?: BookingType;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export interface ISightseeingOption {
  _id: string;
  sightseeingId: string;
  sightseeingName: string;
}

// ─── Response Types ───────────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const sightseeingRateApi = createApi({
  reducerPath: "sightseeingRateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["SightseeingRate"],
  endpoints: (builder) => ({
    // GET /sightseeing-rates
    getAllSightseeingRates: builder.query<
      PaginatedResponse<ISightseeingRate[]>,
      ISightseeingRateQuery | void
    >({
      query: (params) => ({ url: "/sightseeing-rates", params: params ?? {} }),
      providesTags: ["SightseeingRate"],
    }),

    // GET /sightseeing-rates/:id
    getSightseeingRateById: builder.query<
      ApiResponse<ISightseeingRate>,
      string
    >({
      query: (id) => `/sightseeing-rates/${id}`,
      providesTags: (_result, _error, id) => [{ type: "SightseeingRate", id }],
    }),

    // POST /sightseeing-rates
    createSightseeingRate: builder.mutation<
      ApiResponse<ISightseeingRate>,
      ICreateSightseeingRate
    >({
      query: (body) => ({
        url: "/sightseeing-rates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SightseeingRate"],
    }),

    // PATCH /sightseeing-rates/:id
    updateSightseeingRate: builder.mutation<
      ApiResponse<ISightseeingRate>,
      { id: string; body: IUpdateSightseeingRate }
    >({
      query: ({ id, body }) => ({
        url: `/sightseeing-rates/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "SightseeingRate", id },
        "SightseeingRate",
      ],
    }),

    // DELETE /sightseeing-rates/:id
    deleteSightseeingRate: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/sightseeing-rates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SightseeingRate"],
    }),

    // GET /sightseeing-rates/cities
    getSightseeingCities: builder.query<ApiResponse<string[]>, void>({
      query: () => "/sightseeing-rates/cities",
    }),

    // GET /sightseeing-rates/by-city?city=
    getSightseeingsByCity: builder.query<
      ApiResponse<ISightseeingOption[]>,
      string
    >({
      query: (city) => ({
        url: "/sightseeing-rates/by-city",
        params: { city },
      }),
    }),
  }),
});

export const {
  useGetAllSightseeingRatesQuery,
  useGetSightseeingRateByIdQuery,
  useCreateSightseeingRateMutation,
  useUpdateSightseeingRateMutation,
  useDeleteSightseeingRateMutation,
  useGetSightseeingCitiesQuery,
  useGetSightseeingsByCityQuery,
} = sightseeingRateApi;
