import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarkUpType = "Percentage" | "Fixed";

export interface IGuideRate {
  currency: string;
  perDayRate: number;
  overnightCharges: number;
  markUpType: MarkUpType;
  markUp: number;
  taxes: number;
  total: number;
}

export interface IGuide {
  _id: string;
  guideId: string;
  guideName: string;
  destination: string;
  mobileCountryCode: string;
  mobileNumber: string;
  email?: string;
  languagesKnown: string;
  shortDescription?: string;
  image?: string;
  rates: IGuideRate[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateGuide {
  guideName: string;
  destination: string;
  mobileCountryCode: string;
  mobileNumber: string;
  email?: string;
  languagesKnown: string;
  shortDescription?: string;
  image?: string;
  rates: IGuideRate[];
}

export interface IUpdateGuide extends Partial<ICreateGuide> {}

export interface IGuideQuery {
  destination?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
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

export const guideApi = createApi({
  reducerPath: "guideApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Guide"],
  endpoints: (builder) => ({
    // GET /guides
    getAllGuides: builder.query<
      PaginatedResponse<IGuide[]>,
      IGuideQuery | void
    >({
      query: (params) => ({ url: "/guides", params: params ?? {} }),
      providesTags: ["Guide"],
    }),

    // GET /guides/:id
    getGuideById: builder.query<ApiResponse<IGuide>, string>({
      query: (id) => `/guides/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Guide", id }],
    }),

    // POST /guides
    createGuide: builder.mutation<ApiResponse<IGuide>, ICreateGuide>({
      query: (body) => ({
        url: "/guides",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Guide"],
    }),

    // PATCH /guides/:id
    updateGuide: builder.mutation<
      ApiResponse<IGuide>,
      { id: string; body: IUpdateGuide }
    >({
      query: ({ id, body }) => ({
        url: `/guides/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Guide", id },
        "Guide",
      ],
    }),

    // DELETE /guides/:id
    deleteGuide: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/guides/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Guide"],
    }),
  }),
});

export const {
  useGetAllGuidesQuery,
  useGetGuideByIdQuery,
  useCreateGuideMutation,
  useUpdateGuideMutation,
  useDeleteGuideMutation,
} = guideApi;
