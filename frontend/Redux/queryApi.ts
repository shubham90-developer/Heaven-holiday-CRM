import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type RequirementType =
  | "package"
  | "flight"
  | "hotel"
  | "visa"
  | "transfer"
  | "sightseeing"
  | "miscellaneous";

export type QueryStage =
  | "queryCreated"
  | "proposalPending"
  | "proposalSent"
  | "confirmed"
  | "rejected";

export type QueryTemperature = "hot" | "warm" | "cold" | "no-status";

export interface IQuery {
  _id: string;
  leadId: {
    _id: string;
    customerName: string;
    phone: string;
    email?: string;
    type: string; // "B2C" | "B2B"
    source?: string; // populated in getQueryById
  };
  queryNumber: string;
  requirementType: RequirementType;
  queryType: "FIT" | "GIT";
  goingTo: string;
  goingFrom?: string;
  travelDate?: string;
  noOfDays?: number;
  travelers: number;
  priceRange?: string;
  inclusions?: string[];
  theme?: string;
  hotelPreference?: number;
  foodPreference?: string;
  stage: QueryStage;
  temperature: QueryTemperature;
  assignedSales?: { _id: string; firstName: string; lastName: string };
  assignedOps?: { _id: string; firstName: string; lastName: string };
  remark?: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateQuery {
  leadId: string;
  requirementType: RequirementType;
  queryType: "FIT" | "GIT";
  goingTo: string;
  goingFrom?: string;
  travelDate?: string;
  noOfDays?: number;
  travelers: number;
  priceRange?: string;
  inclusions?: string[];
  theme?: string;
  hotelPreference?: number;
  foodPreference?: string;
  stage?: QueryStage;
  temperature?: QueryTemperature;
  assignedSales?: string;
  assignedOps?: string;
  remark?: string;
}

// Matches backend filter params exactly
export interface IGetAllQueriesParams {
  stage?: string;
  temperature?: string;
  assignedSales?: string; // pass "null" string for unAssigned tab
  assignedOps?: string;
  page?: number;
  limit?: number;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: { total: number; page: number; limit: number };
}

export interface IQueryCounts {
  inProgress: number;
  confirmed: number;
  rejected: number;
  unAssigned: number;
}

// ─── BASE QUERY ──────────────────────────────────────────────────────────────

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// ─── QUERY API ───────────────────────────────────────────────────────────────

export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery,
  tagTypes: ["Query"],
  endpoints: (builder) => ({
    // GET /queries  — all queries with filters + pagination
    getAllQueries: builder.query<ApiResponse<IQuery[]>, IGetAllQueriesParams>({
      query: (params = {}) => ({ url: "/queries", params }),
      providesTags: ["Query"],
    }),

    // GET /queries/lead/:leadId  — all queries of a specific lead
    getQueriesByLead: builder.query<ApiResponse<IQuery[]>, string>({
      query: (leadId) => `/queries/lead/${leadId}`,
      providesTags: ["Query"],
    }),

    // GET /queries/counts  — dashboard counts (route must be before /:id in backend)
    getQueryCounts: builder.query<ApiResponse<IQueryCounts>, void>({
      query: () => "/queries/counts",
      providesTags: ["Query"],
    }),

    // GET /queries/:id  — single query with full lead + staff populate
    getQueryById: builder.query<ApiResponse<IQuery>, string>({
      query: (id) => `/queries/${id}`,
      providesTags: ["Query"],
    }),

    // POST /queries
    createQuery: builder.mutation<ApiResponse<IQuery>, ICreateQuery>({
      query: (body) => ({ url: "/queries", method: "POST", body }),
      invalidatesTags: ["Query"],
    }),

    // PATCH /queries/:id  — partial update (uses updateQuerySchema.partial())
    updateQuery: builder.mutation<
      ApiResponse<IQuery>,
      { id: string; body: Partial<ICreateQuery> }
    >({
      query: ({ id, body }) => ({
        url: `/queries/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Query"],
    }),
  }),
});

export const {
  useGetAllQueriesQuery,
  useGetQueriesByLeadQuery,
  useGetQueryCountsQuery,
  useGetQueryByIdQuery,
  useCreateQueryMutation,
  useUpdateQueryMutation,
} = queryApi;
