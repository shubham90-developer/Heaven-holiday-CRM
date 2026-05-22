import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IItinerary {
  _id: string;
  itineraryId: string;

  // Core Fields
  startCity: string;
  destinationCity: string;
  title: string;
  description: string; // rich-text HTML

  // Meta
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateItinerary {
  startCity: string;
  destinationCity: string;
  title: string;
  description: string;
}

export type IUpdateItinerary = Partial<ICreateItinerary>;

export interface IItineraryQuery {
  startCity?: string;
  destinationCity?: string;
  title?: string;
  itineraryId?: string;
  isActive?: boolean;
  search?: string;
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

export const itineraryApi = createApi({
  reducerPath: "itineraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Itinerary"],
  endpoints: (builder) => ({
    // GET /itineraries
    getAllItineraries: builder.query<
      PaginatedResponse<IItinerary[]>,
      IItineraryQuery | void
    >({
      query: (params) => ({
        url: "/itineraries",
        params: params ?? {},
      }),
      providesTags: ["Itinerary"],
    }),

    // GET /itineraries/:id
    getItineraryById: builder.query<ApiResponse<IItinerary>, string>({
      query: (id) => `/itineraries/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Itinerary", id }],
    }),

    // POST /itineraries
    createItinerary: builder.mutation<
      ApiResponse<IItinerary>,
      ICreateItinerary
    >({
      query: (body) => ({
        url: "/itineraries",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Itinerary"],
    }),

    // PATCH /itineraries/:id
    updateItinerary: builder.mutation<
      ApiResponse<IItinerary>,
      { id: string; body: IUpdateItinerary }
    >({
      query: ({ id, body }) => ({
        url: `/itineraries/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Itinerary", id },
        "Itinerary",
      ],
    }),

    // DELETE /itineraries/:id
    deleteItinerary: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/itineraries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Itinerary"],
    }),
  }),
});

export const {
  useGetAllItinerariesQuery,
  useGetItineraryByIdQuery,
  useCreateItineraryMutation,
  useUpdateItineraryMutation,
  useDeleteItineraryMutation,
} = itineraryApi;
