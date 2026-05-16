import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export type LeadType = "B2C" | "B2B";
export type LeadTemperature = "hot" | "warm" | "cold" | "no-status";
export type LeadStatus = "unassigned" | "inProcess" | "callback" | "archived";
export type LeadStage = "new" | "followUp" | "confirmed" | "rejected" | "lost";

export interface ILead {
  _id: string;
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;
  type: LeadType;
  source: string;
  temperature: LeadTemperature;
  status: LeadStatus;
  leadStage: LeadStage;
  isDuplicate: boolean;
  owner?: { _id: string; firstName: string; lastName: string };
  remark?: string;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLead {
  customerName: string;
  companyName?: string;
  phone: string;
  email?: string;
  type: LeadType;
  source: string;
  temperature?: LeadTemperature;
  status?: LeadStatus;
  leadStage?: LeadStage;
  owner?: string;
  remark?: string;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: { total: number; page: number; limit: number };
}

interface LeadCounts {
  inProcess: number;
  callback: number;
  unassigned: number;
  archived: number;
}

export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Lead"],
  endpoints: (builder) => ({
    getAllLeads: builder.query<
      ApiResponse<ILead[]>,
      {
        status?: string;
        type?: string;
        temperature?: string;
        owner?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params = {}) => ({ url: "/leads", params }),
      providesTags: ["Lead"],
    }),

    getLeadCounts: builder.query<ApiResponse<LeadCounts>, void>({
      query: () => "/leads/counts",
      providesTags: ["Lead"],
    }),

    getLeadById: builder.query<ApiResponse<ILead>, string>({
      query: (id) => `/leads/${id}`,
      providesTags: ["Lead"],
    }),

    createLead: builder.mutation<ApiResponse<ILead>, ICreateLead>({
      query: (body) => ({ url: "/leads", method: "POST", body }),
      invalidatesTags: ["Lead"],
    }),

    updateLead: builder.mutation<
      ApiResponse<ILead>,
      { id: string; body: Partial<ICreateLead> }
    >({
      query: ({ id, body }) => ({ url: `/leads/${id}`, method: "PATCH", body }),
      invalidatesTags: ["Lead"],
    }),

    bulkAssignLeads: builder.mutation<
      ApiResponse<null>,
      { leadIds: string[]; owner: string }
    >({
      query: (body) => ({ url: "/leads/bulk-assign", method: "PATCH", body }),
      invalidatesTags: ["Lead"],
    }),

    bulkArchiveLeads: builder.mutation<
      ApiResponse<null>,
      { leadIds: string[] }
    >({
      query: (body) => ({ url: "/leads/bulk-archive", method: "PATCH", body }),
      invalidatesTags: ["Lead"],
    }),
  }),
});

export const {
  useGetAllLeadsQuery,
  useGetLeadCountsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useBulkAssignLeadsMutation,
  useBulkArchiveLeadsMutation,
} = leadApi;
