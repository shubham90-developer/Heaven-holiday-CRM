import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IRate {
  rateType: string;
  amount: number;
  currency: string;
}

export interface IRestaurant {
  _id: string;
  restaurantId: string;
  city: string;
  address: string;
  restaurantArea: string;
  supplierName: string;
  currency: string;
  isPreferred: boolean;
  mealName: string;
  isVeg: boolean;
  isNonVeg: boolean;
  isAI: boolean;
  rates: IRate[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateRestaurant {
  city: string;
  address: string;
  restaurantArea: string;
  supplierName: string;
  currency?: string;
  isPreferred?: boolean;
  mealName: string;
  isVeg?: boolean;
  isNonVeg?: boolean;
  isAI?: boolean;
  rates?: IRate[];
  isActive?: boolean;
}

export type IUpdateRestaurant = Partial<ICreateRestaurant>;

export interface IRestaurantQuery {
  city?: string;
  restaurantArea?: string;
  supplierName?: string;
  restaurantId?: string;
  isPreferred?: boolean;
  isVeg?: boolean;
  isNonVeg?: boolean;
  isAI?: boolean;
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

export const restaurantApi = createApi({
  reducerPath: "restaurantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Restaurant"],

  endpoints: (builder) => ({
    // GET /restaurants
    getAllRestaurants: builder.query<
      PaginatedResponse<IRestaurant[]>,
      IRestaurantQuery | void
    >({
      query: (params) => ({
        url: "/restaurants",
        params: params ?? {},
      }),
      providesTags: ["Restaurant"],
    }),

    // GET /restaurants/:id
    getRestaurantById: builder.query<ApiResponse<IRestaurant>, string>({
      query: (id) => `/restaurants/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Restaurant", id }],
    }),

    // POST /restaurants
    createRestaurant: builder.mutation<
      ApiResponse<IRestaurant>,
      ICreateRestaurant
    >({
      query: (body) => ({
        url: "/restaurants",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Restaurant"],
    }),

    // PATCH /restaurants/:id
    updateRestaurant: builder.mutation<
      ApiResponse<IRestaurant>,
      { id: string; body: IUpdateRestaurant }
    >({
      query: ({ id, body }) => ({
        url: `/restaurants/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Restaurant", id },
        "Restaurant",
      ],
    }),

    // DELETE /restaurants/:id
    deleteRestaurant: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/restaurants/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Restaurant"],
    }),
  }),
});

export const {
  useGetAllRestaurantsQuery,
  useGetRestaurantByIdQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = restaurantApi;
