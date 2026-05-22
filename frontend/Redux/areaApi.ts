import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IArea {
  _id: string;
  areaId: string;
  city: string;
  area: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateArea {
  city: string;
  area: string;
  isActive?: boolean;
}

export type IUpdateArea = Partial<ICreateArea>;

export interface IAreaQuery {
  city?: string;
  area?: string;
  areaId?: string;
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

export const areaApi = createApi({
  reducerPath: "areaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Area"],
  endpoints: (builder) => ({
    // GET /areas
    getAllAreas: builder.query<PaginatedResponse<IArea[]>, IAreaQuery | void>({
      query: (params) => ({
        url: "/areas",
        params: params ?? {},
      }),
      providesTags: ["Area"],
    }),

    // GET /areas/:id
    getAreaById: builder.query<ApiResponse<IArea>, string>({
      query: (id) => `/areas/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Area", id }],
    }),

    // POST /areas
    createArea: builder.mutation<ApiResponse<IArea>, ICreateArea>({
      query: (body) => ({
        url: "/areas",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Area"],
    }),

    // PATCH /areas/:id
    updateArea: builder.mutation<
      ApiResponse<IArea>,
      { id: string; body: IUpdateArea }
    >({
      query: ({ id, body }) => ({
        url: `/areas/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Area", id },
        "Area",
      ],
    }),

    // DELETE /areas/:id
    deleteArea: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/areas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Area"],
    }),
  }),
});

export const {
  useGetAllAreasQuery,
  useGetAreaByIdQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = areaApi;
