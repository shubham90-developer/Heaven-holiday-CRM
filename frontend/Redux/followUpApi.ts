import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export interface IFollowUp {
  _id: string;
  leadId: { _id: string; customerName: string; phone: string };
  queryId?: { _id: string; queryNumber: string };
  activityType: "call" | "todo";
  direction?: "outgoing" | "incoming";
  outcome?: "answered" | "unanswered" | "notReachable";
  nextAction?: "callBack" | "todo" | "meeting" | "createQuery" | "lost";
  followUpDate: string;
  followUpTime: string;
  remindBefore: number;
  assignedTo: { _id: string; firstName: string; lastName: string };
  customerId: string;
  customerType: "B2C" | "B2B";
  details?: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface ICreateFollowUp {
  leadId: string;
  queryId?: string;
  activityType: "call" | "todo";
  direction?: "outgoing" | "incoming";
  outcome?: "answered" | "unanswered" | "notReachable";
  nextAction?: "callBack" | "todo" | "meeting" | "createQuery" | "lost";
  followUpDate: string;
  followUpTime: string;
  remindBefore?: number;
  assignedTo: string;
  customerId: string;
  customerType: "B2C" | "B2B";
  details?: string;
  isCompleted?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const followupApi = createApi({
  reducerPath: "followupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["FollowUp"],
  endpoints: (builder) => ({
    getAllFollowUps: builder.query<
      ApiResponse<IFollowUp[]>,
      {
        assignedTo?: string;
        leadId?: string;
        isCompleted?: boolean;
        date?: string;
      }
    >({
      query: (params = {}) => ({ url: "/followups", params }),
      providesTags: ["FollowUp"],
    }),

    getFollowUpsByLead: builder.query<ApiResponse<IFollowUp[]>, string>({
      query: (leadId) => `/followups/lead/${leadId}`,
      providesTags: ["FollowUp"],
    }),

    createFollowUp: builder.mutation<ApiResponse<IFollowUp>, ICreateFollowUp>({
      query: (body) => ({ url: "/followups", method: "POST", body }),
      invalidatesTags: ["FollowUp"],
    }),

    updateFollowUp: builder.mutation<
      ApiResponse<IFollowUp>,
      { id: string; body: Partial<ICreateFollowUp> }
    >({
      query: ({ id, body }) => ({
        url: `/followups/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["FollowUp"],
    }),

    markComplete: builder.mutation<ApiResponse<IFollowUp>, string>({
      query: (id) => ({ url: `/followups/${id}/complete`, method: "PATCH" }),
      invalidatesTags: ["FollowUp"],
    }),
  }),
});

export const {
  useGetAllFollowUpsQuery,
  useGetFollowUpsByLeadQuery,
  useCreateFollowUpMutation,
  useUpdateFollowUpMutation,
  useMarkCompleteMutation,
} = followupApi;
