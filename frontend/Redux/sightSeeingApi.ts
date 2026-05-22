import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DifficultyLevel = "Easy" | "Moderate" | "Hard" | "Extreme";
export type Season =
  | "Summer"
  | "Winter"
  | "Monsoon"
  | "Spring"
  | "Autumn"
  | "All Season";
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export type PopularityLevel = "Low" | "Medium" | "High" | "Very High";

export interface ISightseeing {
  _id: string;
  sightseeingId: string;

  // Basic Info
  country: string;
  city: string;
  sightseeingName: string;
  latitude: number;
  longitude: number;
  address?: string;

  // Image
  image?: string;

  // Rich Text Sections
  details?: string;
  otherInclusions?: string;
  advisory?: string;
  cancellationPolicy?: string;
  refundPolicy?: string;
  confirmationPolicy?: string;
  termsAndConditions?: string;

  // Other Details
  category?: string;
  activities: string[];
  difficultyLevel?: DifficultyLevel;
  season?: Season;
  daysOfWeek: DayOfWeek[];
  popularity?: PopularityLevel;
  thingsToCarry: string[];
  pickUpPoint?: string;
  pickUpTime?: string;

  // Pax
  paxMin?: number;
  paxMax?: number;

  // Duration
  durationHours: number;
  durationMinutes: number;

  // Allowed Age Group
  allowedAgeFrom: number;
  allowedAgeTo: number;

  // Meta
  isActive: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSightseeing {
  country: string;
  city: string;
  sightseeingName: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  image?: string;
  details?: string;
  otherInclusions?: string;
  advisory?: string;
  cancellationPolicy?: string;
  refundPolicy?: string;
  confirmationPolicy?: string;
  termsAndConditions?: string;
  category?: string;
  activities?: string[];
  difficultyLevel?: DifficultyLevel;
  season?: Season;
  daysOfWeek?: DayOfWeek[];
  popularity?: PopularityLevel;
  thingsToCarry?: string[];
  pickUpPoint?: string;
  pickUpTime?: string;
  paxMin?: number;
  paxMax?: number;
  durationHours?: number;
  durationMinutes?: number;
  allowedAgeFrom?: number;
  allowedAgeTo?: number;
  createdBy: string;
}

export interface IUpdateSightseeing extends Partial<
  Omit<ICreateSightseeing, "createdBy">
> {
  updatedBy: string;
}

export interface ISightseeingQuery {
  sightseeingName?: string;
  city?: string;
  country?: string;
  category?: string;
  difficultyLevel?: DifficultyLevel;
  season?: Season;
  popularity?: PopularityLevel;
  sightseeingId?: string;
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

export const sightseeingApi = createApi({
  reducerPath: "sightseeingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Sightseeing"],
  endpoints: (builder) => ({
    // GET /sightseeings
    getAllSightseeings: builder.query<
      PaginatedResponse<ISightseeing[]>,
      ISightseeingQuery | void
    >({
      query: (params) => ({
        url: "/sightseeings",
        params: params ?? {},
      }),
      providesTags: ["Sightseeing"],
    }),

    // GET /sightseeings/:id
    getSightseeingById: builder.query<ApiResponse<ISightseeing>, string>({
      query: (id) => `/sightseeings/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Sightseeing", id }],
    }),

    // POST /sightseeings  — uses FormData because of image upload
    createSightseeing: builder.mutation<ApiResponse<ISightseeing>, FormData>({
      query: (formData) => ({
        url: "/sightseeings",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Sightseeing"],
    }),

    // PATCH /sightseeings/:id
    updateSightseeing: builder.mutation<
      ApiResponse<ISightseeing>,
      { id: string; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/sightseeings/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Sightseeing", id },
        "Sightseeing",
      ],
    }),

    // DELETE /sightseeings/:id  — soft delete
    deleteSightseeing: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/sightseeings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sightseeing"],
    }),
  }),
});

export const {
  useGetAllSightseeingsQuery,
  useGetSightseeingByIdQuery,
  useCreateSightseeingMutation,
  useUpdateSightseeingMutation,
  useDeleteSightseeingMutation,
} = sightseeingApi;
