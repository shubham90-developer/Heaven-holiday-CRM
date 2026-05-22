import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TransportCategory =
  | "itinerary"
  | "point_to_point"
  | "sic"
  | "per_day";

export type TransportType = "one_way" | "round_trip";

export type VehicleCostType = "normal" | "km_based";

export type MarkUpType = "Fixed %" | "Percentage";

export type PointToPointSubType =
  | "local_city_tour"
  | "airport_transfer"
  | "railway_station_transfer"
  | "bus_stand_transfer"
  | "port_transfer"
  | "meal_transfer";

export type PerDayScopeType = "state" | "country";

export interface ISeason {
  from: string;
  to: string;
  markUpType: MarkUpType;
  b2c: number;
  b2b: number;
}

export interface ITransportRoute {
  _id: string;
  routeId: string;
  category: TransportCategory;
  subTypes: PointToPointSubType[];
  transportType?: TransportType;
  startCity?: string;
  destinationCity?: string;
  routeName?: string;
  citiesIncluded?: string;
  noOfDays?: string;
  destinationsCovered?: string;
  sightseeingCovered?: string;
  description?: string;
  pickupPointArea?: string;
  dropPointArea?: string;
  forWithHotelBYO?: string;
  forLandOnlyBYO?: string;
  perDayScopeType?: PerDayScopeType;
  perDayScopeValue?: string;
  vehicleCostType: VehicleCostType;
  currency: string;
  seasons: ISeason[];
  isWebsite: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTransportRoute {
  category: TransportCategory;
  subTypes?: PointToPointSubType[];
  transportType?: TransportType;
  startCity?: string;
  destinationCity?: string;
  routeName?: string;
  citiesIncluded?: string;
  noOfDays?: string;
  destinationsCovered?: string;
  sightseeingCovered?: string;
  description?: string;
  pickupPointArea?: string;
  dropPointArea?: string;
  forWithHotelBYO?: string;
  forLandOnlyBYO?: string;
  perDayScopeType?: PerDayScopeType;
  perDayScopeValue?: string;
  vehicleCostType: VehicleCostType;
  currency?: string;
  seasons: ISeason[];
  isWebsite?: boolean;
}

export interface IUpdateTransportRoute extends Partial<ICreateTransportRoute> {}

export interface ITransportRouteQuery {
  category?: TransportCategory;
  startCity?: string;
  destinationCity?: string;
  isWebsite?: boolean;
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

export const transportRouteApi = createApi({
  reducerPath: "transportRouteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["TransportRoute"],
  endpoints: (builder) => ({
    // GET /transport-routes
    getAllTransportRoutes: builder.query<
      PaginatedResponse<ITransportRoute[]>,
      ITransportRouteQuery | void
    >({
      query: (params) => ({ url: "/transport-routes", params: params ?? {} }),
      providesTags: ["TransportRoute"],
    }),

    // GET /transport-routes/:id
    getTransportRouteById: builder.query<ApiResponse<ITransportRoute>, string>({
      query: (id) => `/transport-routes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "TransportRoute", id }],
    }),

    // POST /transport-routes
    createTransportRoute: builder.mutation<
      ApiResponse<ITransportRoute>,
      ICreateTransportRoute
    >({
      query: (body) => ({
        url: "/transport-routes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TransportRoute"],
    }),

    // PATCH /transport-routes/:id
    updateTransportRoute: builder.mutation<
      ApiResponse<ITransportRoute>,
      { id: string; body: IUpdateTransportRoute }
    >({
      query: ({ id, body }) => ({
        url: `/transport-routes/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "TransportRoute", id },
        "TransportRoute",
      ],
    }),

    // DELETE /transport-routes/:id
    deleteTransportRoute: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/transport-routes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TransportRoute"],
    }),
  }),
});

export const {
  useGetAllTransportRoutesQuery,
  useGetTransportRouteByIdQuery,
  useCreateTransportRouteMutation,
  useUpdateTransportRouteMutation,
  useDeleteTransportRouteMutation,
} = transportRouteApi;
