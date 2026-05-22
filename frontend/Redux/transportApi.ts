import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AcType = "Yes" | "No";

export interface ITransport {
  _id: string;
  transportId: string;
  carType: string;
  carName: string;
  seatingCapacity: number;
  ac: AcType;
  vehicleNumber: string;
  noOfVehicle: number;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTransport {
  carType: string;
  carName: string;
  seatingCapacity: number;
  ac: AcType;
  vehicleNumber: string;
  noOfVehicle: number;
  image?: string;
}

export interface IUpdateTransport extends Partial<ICreateTransport> {}

export interface ITransportQuery {
  carType?: string;
  ac?: AcType;
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

export const transportApi = createApi({
  reducerPath: "transportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Transport"],
  endpoints: (builder) => ({
    // GET /transports
    getAllTransports: builder.query<
      PaginatedResponse<ITransport[]>,
      ITransportQuery | void
    >({
      query: (params) => ({ url: "/transports", params: params ?? {} }),
      providesTags: ["Transport"],
    }),

    // GET /transports/:id
    getTransportById: builder.query<ApiResponse<ITransport>, string>({
      query: (id) => `/transports/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Transport", id }],
    }),

    // POST /transports
    createTransport: builder.mutation<
      ApiResponse<ITransport>,
      ICreateTransport
    >({
      query: (body) => ({
        url: "/transports",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transport"],
    }),

    // PATCH /transports/:id
    updateTransport: builder.mutation<
      ApiResponse<ITransport>,
      { id: string; body: IUpdateTransport }
    >({
      query: ({ id, body }) => ({
        url: `/transports/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Transport", id },
        "Transport",
      ],
    }),

    // DELETE /transports/:id
    deleteTransport: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/transports/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transport"],
    }),
  }),
});

export const {
  useGetAllTransportsQuery,
  useGetTransportByIdQuery,
  useCreateTransportMutation,
  useUpdateTransportMutation,
  useDeleteTransportMutation,
} = transportApi;
