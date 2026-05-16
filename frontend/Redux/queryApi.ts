import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

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
    type: string;
  };
  queryNumber: string;
  requirementType: string;
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
  requirementType: string;
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

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: { total: number; page: number; limit: number };
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

// ─── QUERY API ──────────────────────────────────────────────────────────────
export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery,
  tagTypes: ["Query"],
  endpoints: (builder) => ({
    getAllQueries: builder.query<
      ApiResponse<IQuery[]>,
      {
        stage?: string;
        temperature?: string;
        assignedSales?: string;
        assignedOps?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params = {}) => ({ url: "/queries", params }),
      providesTags: ["Query"],
    }),

    getQueriesByLead: builder.query<ApiResponse<IQuery[]>, string>({
      query: (leadId) => `/queries/lead/${leadId}`,
      providesTags: ["Query"],
    }),

    getQueryById: builder.query<ApiResponse<IQuery>, string>({
      query: (id) => `/queries/${id}`,
      providesTags: ["Query"],
    }),

    getQueryCounts: builder.query<
      ApiResponse<{
        inProgress: number;
        confirmed: number;
        rejected: number;
        unAssigned: number;
      }>,
      void
    >({
      query: () => "/queries/counts",
      providesTags: ["Query"],
    }),

    createQuery: builder.mutation<ApiResponse<IQuery>, ICreateQuery>({
      query: (body) => ({ url: "/queries", method: "POST", body }),
      invalidatesTags: ["Query"],
    }),

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
  useGetQueryByIdQuery,
  useGetQueryCountsQuery,
  useCreateQueryMutation,
  useUpdateQueryMutation,
} = queryApi;
