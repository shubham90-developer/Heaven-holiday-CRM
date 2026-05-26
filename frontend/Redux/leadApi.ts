// leadApi.ts - Updated

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export type LeadType = "B2C" | "B2B";
export type LeadTemperature = "hot" | "warm" | "cold" | "no-status";
export type LeadStatus = "unassigned" | "inProcess" | "callback" | "archived";

export type LeadStage = "new" | "followUp" | "confirmed" | "rejected" | "lost";

export type B2BAgentType = "Agency" | "Corporate";

// ── Response shape for leadSource after populate ──────────────────────────────
export interface ILeadSource {
  _id: string;
  leadSourceName: string;
  status: boolean;
  leadSourceId: string;
}

export interface ILead {
  _id: string;

  type: LeadType;
  agentType?: B2BAgentType;

  salutation?: string;
  firstName?: string;
  lastName?: string;
  customerName: string;
  companyName?: string;

  phone: string;
  email?: string;

  leadSource?: ILeadSource;
  temperature: LeadTemperature;
  status: LeadStatus;
  leadStage: LeadStage;

  owner?: {
    _id: string;
    firstName: string;
    lastName: string;
  };

  isDuplicate: boolean;
  remarks?: string;
  archived: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ICreateLead {
  type: LeadType;
  agentType?: B2BAgentType;

  salutation?: string;
  firstName?: string;
  lastName?: string;

  customerName?: string;
  companyName?: string;

  phone: string;
  email?: string;

  leadSource: string;

  temperature?: LeadTemperature;
  status?: LeadStatus;
  leadStage?: LeadStage;

  owner?: string;
  remarks?: string;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface LeadCounts {
  inProcess: number;
  callback: number;
  unassigned: number;
  archived: number;
  b2c: number;
  b2b: number;
}

export const leadApi = createApi({
  reducerPath: "leadApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Lead"],

  endpoints: (builder) => ({
    // ───────────────── GET ALL LEADS ─────────────────
    getAllLeads: builder.query<
      ApiResponse<ILead[]>,
      {
        status?: string;
        type?: string;
        temperature?: string;
        owner?: string;
        leadSource?: string;
        agentType?: string;
        search?: string;
        archived?: boolean;
        page?: number;
        limit?: number;
      }
    >({
      query: (params = {}) => ({
        url: "/leads",
        params,
      }),

      providesTags: ["Lead"],
    }),

    // ───────────────── LEAD COUNTS ─────────────────
    getLeadCounts: builder.query<ApiResponse<LeadCounts>, void>({
      query: () => "/leads/counts",

      providesTags: ["Lead"],
    }),

    // ───────────────── GET LEAD BY ID ─────────────────
    getLeadById: builder.query<ApiResponse<ILead>, string>({
      query: (id) => `/leads/${id}`,

      providesTags: ["Lead"],
    }),

    // ───────────────── CREATE LEAD ─────────────────
    createLead: builder.mutation<ApiResponse<ILead>, ICreateLead>({
      query: (body) => ({
        url: "/leads",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Lead"],
    }),

    // ───────────────── UPDATE LEAD ─────────────────
    updateLead: builder.mutation<
      ApiResponse<ILead>,
      {
        id: string;
        body: Partial<ICreateLead>;
      }
    >({
      query: ({ id, body }) => ({
        url: `/leads/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Lead"],
    }),

    // ───────────────── BULK ASSIGN ─────────────────
    bulkAssignLeads: builder.mutation<
      ApiResponse<{ modifiedCount: number }>,
      {
        leadIds: string[];
        owner: string;
      }
    >({
      query: (body) => ({
        url: "/leads/bulk-assign",
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Lead"],
    }),

    // ───────────────── BULK ARCHIVE ─────────────────
    bulkArchiveLeads: builder.mutation<
      ApiResponse<{ modifiedCount: number }>,
      {
        leadIds: string[];
      }
    >({
      query: (body) => ({
        url: "/leads/bulk-archive",
        method: "PATCH",
        body,
      }),

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
