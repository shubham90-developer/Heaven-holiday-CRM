// query.api.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ── enums / literals ─────────────────────────────────────────────────────────

export type RequirementType =
  | "Package"
  | "Flight"
  | "Transfer"
  | "Visa"
  | "Hotel"
  | "Sightseeing"
  | "Miscellaneous";

export type QueryStatus =
  | "new"
  | "inProcess"
  | "confirmed"
  | "rejected"
  | "lost";

export type QueryType = "FIT" | "GIT";

export type TripType = "OneWay" | "RoundTrip" | "MultiCity";

export type FlightClass = "Economy" | "Business" | "First" | "PremiumEconomy";

export type FareType = "Regular" | "Student" | "SeniorCitizen" | "Direct";

export type TransferMode = "Cab" | "Train";

// ── populated refs ────────────────────────────────────────────────────────────

export interface IStaffRef {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface ILeadRef {
  _id: string;
  customerName: string;
  phone: string;
  email: string;
  type: string;
}

// ── sub schemas ──────────────────────────────────────────────────────────────

export interface IPackageInfo {
  queryType?: QueryType;
  goingTo?: string | null;
  goingFrom?: string | null;
  specificDate?: string | null;
  noOfDays?: number | null;
  travelers?: number | null;
  priceRange?: string | null;
  inclusions?: string | null;
  theme?: string | null;
  hotelPreference?: 1 | 2 | 3 | 4 | 5 | null;
  assignToOps?: boolean;
}

export interface IFlightInfo {
  tripType?: TripType;
  isGroup?: boolean;
  sourceCity?: string | null;
  destinationCity?: string | null;
  departureDate?: string | null;
  adults?: number;
  children?: number;
  infants?: number;
  class?: FlightClass;
  fareType?: FareType;
  preferredAirline?: string | null;
  leadSource?: string | null;
  assignToSales?: string | null;
  assignToOps?: boolean;
  addRemark?: string | null;
}

export interface ITransferInfo {
  mode?: TransferMode;
  tripType?: "OneWay" | "RoundTrip";
  goingTo?: string | null;
  goingFrom?: string | null;
  pickupDateTime?: string | null;
  noOfDays?: number | null;
  travelers?: number | null;
  pickupLocation?: string | null;
  preference?: string | null;
  leadSource?: string | null;
  assignToSales?: string | null;
  assignToOps?: boolean;
  addRemark?: string | null;
}

export interface IVisaInfo {
  country?: string | null;
  visaCategory?: string | null;
  entryType?: string | null;
  dateOfTravel?: string | null;
  adults?: number | null;
  child?: number | null;
  childWithFamily?: number | null;
  infant?: number | null;
  duration?: string | null;
  nationality?: string;
  leadSource?: string | null;
  assignToSales?: string | null;
  assignToOps?: boolean;
  addRemark?: string | null;
}

export interface IHotelInfo {
  destination?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  nights?: number;
  travelers?: number;
  nationality?: string;
  starRating?: string;
  foodPreference?: string | null;
  leadSource?: string | null;
  assignToSales?: string | null;
  assignToOps?: boolean;
  addRemarks?: string | null;
}

export interface ISightseeingInfo {
  destination?: string | null;
  duration?: number | null;
  adults?: number;
  children?: number;
  nationality?: string;
  leadSource?: string | null;
  assignToSales?: string | null;
  assignToOps?: boolean;
  addRemark?: string | null;
}

export interface IMiscellaneousInfo {
  service?: string | null;
  destination?: string | null;
  selectDate?: string | null;
  count?: number;
  leadSource?: string | null;
  assignToSales?: string | null;
  assignToOps?: boolean;
  addRemark?: string | null;
}

// ── root query ───────────────────────────────────────────────────────────────

export interface IQuery {
  _id: string;
  lead: ILeadRef;

  requirementType: RequirementType;

  goingFrom?: string | null;
  goingTo?: string | null;
  travelDate?: string | null;

  status: QueryStatus;

  createdBy?: IStaffRef | null;

  packageInfo?: IPackageInfo | null;
  flightInfo?: IFlightInfo | null;
  transferInfo?: ITransferInfo | null;
  visaInfo?: IVisaInfo | null;
  hotelInfo?: IHotelInfo | null;
  sightseeingInfo?: ISightseeingInfo | null;
  miscellaneousInfo?: IMiscellaneousInfo | null;

  createdAt: string;
  updatedAt: string;
}

// ── create payload ───────────────────────────────────────────────────────────

export type ICreateQuery =
  | ({
      lead: string;
      requirementType: "Package";
      goingFrom?: string;
      goingTo?: string;
      travelDate?: string;
      status?: QueryStatus;
      createdBy?: string;
    } & {
      packageInfo: IPackageInfo;
    })
  | ({
      lead: string;
      requirementType: "Flight";
      goingFrom?: string;
      goingTo?: string;
      travelDate?: string;
      status?: QueryStatus;
      createdBy?: string;
    } & {
      flightInfo: IFlightInfo;
    })
  | ({
      lead: string;
      requirementType: "Transfer";
      goingFrom?: string;
      goingTo?: string;
      travelDate?: string;
      status?: QueryStatus;
      createdBy?: string;
    } & {
      transferInfo: ITransferInfo;
    })
  | ({
      lead: string;
      requirementType: "Visa";
      goingFrom?: string;
      goingTo?: string;
      travelDate?: string;
      status?: QueryStatus;
      createdBy?: string;
    } & {
      visaInfo: IVisaInfo;
    })
  | ({
      lead: string;
      requirementType: "Hotel";
      goingFrom?: string;
      goingTo?: string;
      travelDate?: string;
      status?: QueryStatus;
      createdBy?: string;
    } & {
      hotelInfo: IHotelInfo;
    })
  | ({
      lead: string;
      requirementType: "Sightseeing";
      goingFrom?: string;
      goingTo?: string;
      travelDate?: string;
      status?: QueryStatus;
      createdBy?: string;
    } & {
      sightseeingInfo: ISightseeingInfo;
    })
  | ({
      lead: string;
      requirementType: "Miscellaneous";
      goingFrom?: string;
      goingTo?: string;
      travelDate?: string;
      status?: QueryStatus;
      createdBy?: string;
    } & {
      miscellaneousInfo: IMiscellaneousInfo;
    });

export type IUpdateQuery = Partial<ICreateQuery>;

export interface IUpdateQueryStatus {
  status: QueryStatus;
}

// ── filters ──────────────────────────────────────────────────────────────────

export interface IQueryFilter {
  leadId?: string;
  requirementType?: RequirementType;
  status?: QueryStatus;
  createdBy?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

// ── api responses ────────────────────────────────────────────────────────────

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
    totalPages: number;
  };
}

// ── api ──────────────────────────────────────────────────────────────────────

export const queryApi = createApi({
  reducerPath: "queryApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Query"],

  endpoints: (builder) => ({
    // GET ALL
    getAllQueries: builder.query<
      PaginatedResponse<IQuery[]>,
      IQueryFilter | void
    >({
      query: (params) => ({
        url: "/queries",
        params: params ?? {},
      }),

      providesTags: ["Query"],
    }),

    // GET BY LEAD
    getQueriesByLead: builder.query<ApiResponse<IQuery[]>, string>({
      query: (leadId) => `/queries/lead/${leadId}`,

      providesTags: (_result, _error, leadId) => [
        { type: "Query", id: leadId },
      ],
    }),

    // GET BY ID
    getQueryById: builder.query<ApiResponse<IQuery>, string>({
      query: (id) => `/queries/${id}`,

      providesTags: (_result, _error, id) => [{ type: "Query", id }],
    }),

    // CREATE
    createQuery: builder.mutation<ApiResponse<IQuery>, ICreateQuery>({
      query: (body) => ({
        url: "/queries",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Query"],
    }),

    // UPDATE
    updateQuery: builder.mutation<
      ApiResponse<IQuery>,
      { id: string; body: IUpdateQuery }
    >({
      query: ({ id, body }) => ({
        url: `/queries/${id}`,
        method: "PUT",
        body,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Query", id },
        "Query",
      ],
    }),

    // UPDATE STATUS
    updateQueryStatus: builder.mutation<
      ApiResponse<{ _id: string; status: QueryStatus }>,
      { id: string; body: IUpdateQueryStatus }
    >({
      query: ({ id, body }) => ({
        url: `/queries/${id}/status`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Query", id },
        "Query",
      ],
    }),
    // DELETE
    deleteQuery: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/queries/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Query"],
    }),
  }),
});

// ── hooks ────────────────────────────────────────────────────────────────────

export const {
  useGetAllQueriesQuery,
  useGetQueriesByLeadQuery,
  useGetQueryByIdQuery,
  useCreateQueryMutation,
  useUpdateQueryMutation,
  useUpdateQueryStatusMutation,
  useDeleteQueryMutation,
} = queryApi;
