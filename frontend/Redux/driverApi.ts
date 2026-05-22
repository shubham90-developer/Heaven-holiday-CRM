import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ITransportRef {
  _id: string;
  transportId: string;
  carType: string;
  carName: string;
  seatingCapacity: number;
  ac: "Yes" | "No";
  vehicleNumber: string;
}

export interface IDriver {
  _id: string;
  driverId: string;
  driverName: string;
  mobileCountryCode: string;
  mobileNumber: string;
  email?: string;
  languages: string;
  address?: string;
  country: string;
  city: string;
  drivingLicense: string;
  primaryVehicle: ITransportRef;
  image?: string;
  remark?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateDriver {
  driverName: string;
  mobileCountryCode: string;
  mobileNumber: string;
  email?: string;
  languages: string;
  address?: string;
  country: string;
  city: string;
  drivingLicense: string;
  primaryVehicle: string; // Transport ObjectId
  image?: string;
  remark?: string;
}

export interface IUpdateDriver extends Partial<ICreateDriver> {}

export interface IDriverQuery {
  city?: string;
  country?: string;
  primaryVehicle?: string;
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

export const driverApi = createApi({
  reducerPath: "driverApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Driver"],
  endpoints: (builder) => ({
    // GET /drivers
    getAllDrivers: builder.query<
      PaginatedResponse<IDriver[]>,
      IDriverQuery | void
    >({
      query: (params) => ({ url: "/drivers", params: params ?? {} }),
      providesTags: ["Driver"],
    }),

    // GET /drivers/:id
    getDriverById: builder.query<ApiResponse<IDriver>, string>({
      query: (id) => `/drivers/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Driver", id }],
    }),

    // POST /drivers
    createDriver: builder.mutation<ApiResponse<IDriver>, ICreateDriver>({
      query: (body) => ({
        url: "/drivers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Driver"],
    }),

    // PATCH /drivers/:id
    updateDriver: builder.mutation<
      ApiResponse<IDriver>,
      { id: string; body: IUpdateDriver }
    >({
      query: ({ id, body }) => ({
        url: `/drivers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Driver", id },
        "Driver",
      ],
    }),

    // DELETE /drivers/:id
    deleteDriver: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/drivers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const {
  useGetAllDriversQuery,
  useGetDriverByIdQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = driverApi;
