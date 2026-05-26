import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ILeadSource {
  _id: string;
  leadSourceId: string;
  leadSourceName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLeadSource {
  leadSourceName: string;
  status?: boolean;
}

export interface IUpdateLeadSource extends Partial<ICreateLeadSource> {}

export interface ILeadSourceQuery {
  status?: boolean;
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

export const leadSourceApi = createApi({
  reducerPath: "leadSourceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["LeadSource"],
  endpoints: (builder) => ({
    // GET /lead-sources
    getAllLeadSources: builder.query<
      PaginatedResponse<ILeadSource[]>,
      ILeadSourceQuery | void
    >({
      query: (params) => ({ url: "/lead-sources", params: params ?? {} }),
      providesTags: ["LeadSource"],
    }),

    // GET /lead-sources/:id
    getLeadSourceById: builder.query<ApiResponse<ILeadSource>, string>({
      query: (id) => `/lead-sources/${id}`,
      providesTags: (_result, _error, id) => [{ type: "LeadSource", id }],
    }),

    // POST /lead-sources
    createLeadSource: builder.mutation<
      ApiResponse<ILeadSource>,
      ICreateLeadSource
    >({
      query: (body) => ({
        url: "/lead-sources",
        method: "POST",
        body,
      }),
      invalidatesTags: ["LeadSource"],
    }),

    // PATCH /lead-sources/:id
    updateLeadSource: builder.mutation<
      ApiResponse<ILeadSource>,
      { id: string; body: IUpdateLeadSource }
    >({
      query: ({ id, body }) => ({
        url: `/lead-sources/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "LeadSource", id },
        "LeadSource",
      ],
    }),

    // DELETE /lead-sources/:id
    deleteLeadSource: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/lead-sources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LeadSource"],
    }),
  }),
});

export const {
  useGetAllLeadSourcesQuery,
  useGetLeadSourceByIdQuery,
  useCreateLeadSourceMutation,
  useUpdateLeadSourceMutation,
  useDeleteLeadSourceMutation,
} = leadSourceApi;
