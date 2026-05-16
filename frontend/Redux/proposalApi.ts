import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// ─── PROPOSAL API ────────────────────────────────────────────────────────────
export interface IProposal {
  _id: string;
  queryId: string;
  leadId: { _id: string; customerName: string; phone: string };
  packageDetails?: {
    hotels?: string[];
    flights?: string[];
    sightseeing?: string[];
    transfers?: string[];
    notes?: string;
  };
  basePrice: number;
  markup: number;
  totalPrice: number;
  status: "draft" | "sent" | "accepted" | "rejected";
  sentAt?: string;
  createdAt: string;
}

export interface ICreateProposal {
  queryId: string;
  leadId: string;
  packageDetails?: {
    hotels?: string[];
    flights?: string[];
    sightseeing?: string[];
    transfers?: string[];
    notes?: string;
  };
  basePrice: number;
  markup?: number;
  totalPrice: number;
  status?: "draft" | "sent" | "accepted" | "rejected";
}

export const proposalApi = createApi({
  reducerPath: "proposalApi",
  baseQuery,
  tagTypes: ["Proposal"],
  endpoints: (builder) => ({
    getProposalsByQuery: builder.query<ApiResponse<IProposal[]>, string>({
      query: (queryId) => `/proposals/query/${queryId}`,
      providesTags: ["Proposal"],
    }),

    createProposal: builder.mutation<ApiResponse<IProposal>, ICreateProposal>({
      query: (body) => ({ url: "/proposals", method: "POST", body }),
      invalidatesTags: ["Proposal"],
    }),

    updateProposal: builder.mutation<
      ApiResponse<IProposal>,
      { id: string; body: Partial<ICreateProposal> }
    >({
      query: ({ id, body }) => ({
        url: `/proposals/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Proposal"],
    }),

    sendProposal: builder.mutation<ApiResponse<IProposal>, string>({
      query: (id) => ({ url: `/proposals/${id}/send`, method: "PATCH" }),
      invalidatesTags: ["Proposal"],
    }),

    acceptProposal: builder.mutation<
      ApiResponse<{ proposal: IProposal; booking: any }>,
      string
    >({
      query: (id) => ({ url: `/proposals/${id}/accept`, method: "PATCH" }),
      invalidatesTags: ["Proposal"],
    }),

    rejectProposal: builder.mutation<ApiResponse<IProposal>, string>({
      query: (id) => ({ url: `/proposals/${id}/reject`, method: "PATCH" }),
      invalidatesTags: ["Proposal"],
    }),
  }),
});

export const {
  useGetProposalsByQueryQuery,
  useCreateProposalMutation,
  useUpdateProposalMutation,
  useSendProposalMutation,
  useAcceptProposalMutation,
  useRejectProposalMutation,
} = proposalApi;

// ─── BOOKING API ─────────────────────────────────────────────────────────────
export interface IBooking {
  _id: string;
  proposalId: string;
  queryId: {
    _id: string;
    queryNumber: string;
    goingTo: string;
    travelDate?: string;
    travelers: number;
  };
  leadId: {
    _id: string;
    customerName: string;
    phone: string;
    email?: string;
    type: string;
  };
  totalAmount: number;
  paidAmount: number;
  balance: number;
  paymentStatus: "pending" | "partial" | "completed";
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery,
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    getAllBookings: builder.query<
      ApiResponse<IBooking[]>,
      {
        status?: string;
        paymentStatus?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params = {}) => ({ url: "/bookings", params }),
      providesTags: ["Booking"],
    }),

    getBookingById: builder.query<ApiResponse<IBooking>, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: ["Booking"],
    }),

    updateBooking: builder.mutation<
      ApiResponse<IBooking>,
      {
        id: string;
        body: { paidAmount?: number; paymentStatus?: string; status?: string };
      }
    >({
      query: ({ id, body }) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useUpdateBookingMutation,
} = bookingApi;
