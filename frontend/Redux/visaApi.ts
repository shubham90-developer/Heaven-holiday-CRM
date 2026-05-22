import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type VisaType =
  | "Tourist"
  | "Business"
  | "Student"
  | "Work"
  | "Transit"
  | "Medical"
  | "Conference"
  | "Other";

export type VisaCategory =
  | "Tourism"
  | "Business"
  | "Education"
  | "Employment"
  | "Family"
  | "Medical"
  | "Other";

export type EntryType = "Single Entry" | "Double Entry" | "Multiple Entry";
export type MarkUpType = "Amount" | "Percentage";
export type MarketPlace = "MY B2C" | "MY B2B";

export interface IEmbassyFee {
  currency: string;
  adult: number;
  child: number;
  childAge: number;
  infant: number;
}

export interface IMarkUp {
  marketPlace: MarketPlace;
  currency: string;
  markUpType: MarkUpType;
  adult: number;
  child: number;
  infant: number;
}

export interface IServiceProvider {
  _id?: string;
  display: boolean;
  serviceName: string;
  currency: string;
  fees: number;
  markup: number;
  taxable: boolean;
}

// Populated supplier shape (fields returned by .populate())
export interface ISupplierRef {
  _id: string;
  companyName: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
}

export interface IVisa {
  _id: string;
  visaId: string;

  // Basic Info
  travelersNationality: string;
  countriesCovered: string[];

  // Visa Details
  visaName: string;
  visaType?: VisaType;
  visaCategory?: VisaCategory;
  entryType?: EntryType;
  processingTime?: number;
  passportExpire?: number;
  validityOfVisa?: number;
  duration?: string;
  supplier?: string | ISupplierRef; // ObjectId string on list; populated object on getById

  // Embassy Fee
  embassyFee: IEmbassyFee;

  // Mark Up
  markUp: IMarkUp[];

  // Service Providers
  serviceProviders: IServiceProvider[];

  // Meta
  isActive: boolean;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateVisa {
  travelersNationality: string;
  countriesCovered: string[];
  visaName: string;
  visaType?: VisaType;
  visaCategory?: VisaCategory;
  entryType?: EntryType;
  processingTime?: number;
  passportExpire?: number;
  validityOfVisa?: number;
  duration?: string;
  supplier?: string; // ObjectId string of the Supplier document
  embassyFee?: IEmbassyFee;
  markUp?: IMarkUp[];
  serviceProviders?: Omit<IServiceProvider, "_id">[];
  createdBy: string;
}

export interface IUpdateVisa extends Partial<Omit<ICreateVisa, "createdBy">> {
  updatedBy: string;
}

export interface IVisaQuery {
  visaName?: string;
  travelersNationality?: string;
  countriesCovered?: string;
  visaType?: VisaType;
  visaCategory?: VisaCategory;
  entryType?: EntryType;
  supplier?: string;
  visaId?: string;
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

export const visaApi = createApi({
  reducerPath: "visaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Visa"],
  endpoints: (builder) => ({
    // GET /visas
    getAllVisas: builder.query<PaginatedResponse<IVisa[]>, IVisaQuery | void>({
      query: (params) => ({
        url: "/visas",
        params: params ?? {},
      }),
      providesTags: ["Visa"],
    }),

    // GET /visas/:id
    getVisaById: builder.query<ApiResponse<IVisa>, string>({
      query: (id) => `/visas/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Visa", id }],
    }),

    // POST /visas
    createVisa: builder.mutation<ApiResponse<IVisa>, ICreateVisa>({
      query: (body) => ({
        url: "/visas",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Visa"],
    }),

    // PATCH /visas/:id
    updateVisa: builder.mutation<
      ApiResponse<IVisa>,
      { id: string; body: IUpdateVisa }
    >({
      query: ({ id, body }) => ({
        url: `/visas/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Visa", id },
        "Visa",
      ],
    }),

    // DELETE /visas/:id
    deleteVisa: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/visas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Visa"],
    }),
  }),
});

export const {
  useGetAllVisasQuery,
  useGetVisaByIdQuery,
  useCreateVisaMutation,
  useUpdateVisaMutation,
  useDeleteVisaMutation,
} = visaApi;
