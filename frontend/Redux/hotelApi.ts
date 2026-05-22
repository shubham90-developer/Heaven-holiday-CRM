import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StarRating =
  | "1 Star"
  | "2 Star"
  | "3 Star"
  | "4 Star"
  | "5 Star"
  | "NA Star";
export type PropertyType =
  | "Hotel"
  | "Resort"
  | "Villa"
  | "Hostel"
  | "Apartment"
  | "Guesthouse"
  | "Homestay";
export type WeekendDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
export type ChildAgePolicy =
  | "3 year"
  | "5 year"
  | "6 year"
  | "8 year"
  | "10 year"
  | "12 year";
export type AmenityCategory =
  | "General"
  | "Room"
  | "Dining"
  | "Recreation"
  | "Business";

export interface IRoomType {
  _id?: string;
  roomTypeName: string;
  description?: string;
  maxOccupancy: number;
  extraBedAllowed: boolean;
}

export interface IHotelImage {
  _id?: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
}

export interface IHotelAmenity {
  name: string;
  category: AmenityCategory;
}

export interface IHotel {
  _id: string;
  hotelId: string;
  hotelName: string;
  cityName: string;
  country: string;
  state?: string;
  address?: string;
  contactEmail?: string;
  contactNumber?: string;
  countryCode: string;
  starRating: StarRating;
  propertyType: PropertyType;
  checkInTime: string;
  checkOutTime: string;
  weekend: WeekendDay[];
  roomTypes: IRoomType[];
  childAgePolicy: ChildAgePolicy;
  supplier?: string;
  currency: string;
  dcw?: string;
  amenities: IHotelAmenity[];
  images: IHotelImage[];
  description?: string;
  isActive: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateHotel {
  hotelName: string;
  cityName: string;
  country: string;
  state?: string;
  address?: string;
  contactEmail?: string;
  contactNumber?: string;
  countryCode?: string;
  starRating?: StarRating;
  propertyType?: PropertyType;
  checkInTime?: string;
  checkOutTime?: string;
  weekend?: WeekendDay[];
  roomTypes?: Omit<IRoomType, "_id">[];
  childAgePolicy?: ChildAgePolicy;
  supplier?: string;
  currency?: string;
  dcw?: string;
  amenities?: IHotelAmenity[];
  images?: IHotelImage[];
  description?: string;
  createdBy: string;
}

export interface IUpdateHotel extends Partial<Omit<ICreateHotel, "createdBy">> {
  updatedBy: string;
}

export interface IHotelQuery {
  hotelName?: string;
  cityName?: string;
  country?: string;
  starRating?: StarRating;
  propertyType?: PropertyType;
  supplier?: string;
  hotelId?: string;
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

export const hotelApi = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Hotel"],
  endpoints: (builder) => ({
    // GET /hotels  — list with optional filters
    getAllHotels: builder.query<
      PaginatedResponse<IHotel[]>,
      IHotelQuery | void
    >({
      query: (params) => ({
        url: "/hotels",
        params: params ?? {},
      }),
      providesTags: ["Hotel"],
    }),

    // GET /hotels/:id
    getHotelById: builder.query<ApiResponse<IHotel>, string>({
      query: (id) => `/hotels/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Hotel", id }],
    }),

    // POST /hotels
    createHotel: builder.mutation<ApiResponse<IHotel>, ICreateHotel>({
      query: (body) => ({
        url: "/hotels",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Hotel"],
    }),

    // PATCH /hotels/:id  — update anything (info, roomTypes, images, amenities)
    updateHotel: builder.mutation<
      ApiResponse<IHotel>,
      { id: string; body: IUpdateHotel }
    >({
      query: ({ id, body }) => ({
        url: `/hotels/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Hotel", id },
        "Hotel",
      ],
    }),

    // DELETE /hotels/:id  — soft delete
    deleteHotel: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hotel"],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApi;
