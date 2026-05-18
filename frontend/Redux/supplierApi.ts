import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SupplierStatus = "active" | "inactive";
export type SupplierCurrency =
  | "INR"
  | "USD"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD"
  | "SGD"
  | "JPY"
  | "CNY";
export type SupplierSalutation = "Mr." | "Ms." | "Mrs." | "Miss" | "Dr.";

export interface ISupplierContact {
  _id?: string;
  salutation?: SupplierSalutation;
  firstName: string;
  lastName?: string;
  designation?: string;
  department?: string;
  email?: string;
  countryCode?: string;
  phone: string;
  country?: string;
  state?: string;
  city?: string;
  expertiseDestinations?: string;
  comments?: string;
}

export interface ISupplierBankDetail {
  _id?: string;
  accountName?: string;
  accountNumber: string;
  bankName?: string;
  ifscCode?: string;
  swiftCode?: string;
  isPrimary: boolean;
  country?: string;
  city?: string;
  comments?: string;
}

export interface ISupplier {
  _id: string;
  companyName: string;
  currency: SupplierCurrency;
  gstRegistered: boolean;
  panNumber?: string;
  salutation?: SupplierSalutation;
  firstName: string;
  lastName?: string;
  designation?: string;
  email: string;
  countryCode: string;
  phone: string;
  addressLine1?: string;
  addressLine2?: string;
  country: string;
  state?: string;
  city: string;
  otherCity?: string;
  category: string;
  services: string;
  comments?: string;
  expertiseDestinations?: string;
  contacts: ISupplierContact[];
  bankDetails: ISupplierBankDetail[];
  rm?: { _id: string; firstName: string; lastName: string };
  status: SupplierStatus;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSupplier {
  companyName: string;
  currency?: SupplierCurrency;
  gstRegistered?: boolean;
  panNumber?: string;
  salutation?: SupplierSalutation;
  firstName: string;
  lastName?: string;
  designation?: string;
  email: string;
  countryCode?: string;
  phone: string;
  addressLine1?: string;
  addressLine2?: string;
  country: string;
  state?: string;
  city: string;
  otherCity?: string;
  category: string;
  services: string;
  comments?: string;
  expertiseDestinations?: string;
  contacts?: ISupplierContact[];
  bankDetails?: ISupplierBankDetail[];
  rm?: string;
  status?: SupplierStatus;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: { total: number; page: number; limit: number };
}

// ── API ───────────────────────────────────────────────────────────────────────

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Supplier"],
  endpoints: (builder) => ({
    // GET /suppliers
    getAllSuppliers: builder.query<
      ApiResponse<ISupplier[]>,
      {
        status?: string;
        category?: string;
        services?: string;
        city?: string;
        country?: string;
        rm?: string;
        search?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params = {}) => ({ url: "/suppliers", params }),
      providesTags: ["Supplier"],
    }),

    // GET /suppliers/:id
    getSupplierById: builder.query<ApiResponse<ISupplier>, string>({
      query: (id) => `/suppliers/${id}`,
      providesTags: ["Supplier"],
    }),

    // POST /suppliers
    createSupplier: builder.mutation<ApiResponse<ISupplier>, ICreateSupplier>({
      query: (body) => ({ url: "/suppliers", method: "POST", body }),
      invalidatesTags: ["Supplier"],
    }),

    // PATCH /suppliers/:id
    updateSupplier: builder.mutation<
      ApiResponse<ISupplier>,
      { id: string; body: Partial<ICreateSupplier> }
    >({
      query: ({ id, body }) => ({
        url: `/suppliers/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Supplier"],
    }),

    // DELETE /suppliers/:id
    deleteSupplier: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/suppliers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Supplier"],
    }),

    // POST /suppliers/:id/contacts
    addContact: builder.mutation<
      ApiResponse<ISupplierContact[]>,
      { supplierId: string; body: Omit<ISupplierContact, "_id"> }
    >({
      query: ({ supplierId, body }) => ({
        url: `/suppliers/${supplierId}/contacts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Supplier"],
    }),

    // DELETE /suppliers/:id/contacts/:contactId
    removeContact: builder.mutation<
      ApiResponse<ISupplierContact[]>,
      { supplierId: string; contactId: string }
    >({
      query: ({ supplierId, contactId }) => ({
        url: `/suppliers/${supplierId}/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Supplier"],
    }),

    // POST /suppliers/:id/bank-details
    addBankDetail: builder.mutation<
      ApiResponse<ISupplierBankDetail[]>,
      { supplierId: string; body: Omit<ISupplierBankDetail, "_id"> }
    >({
      query: ({ supplierId, body }) => ({
        url: `/suppliers/${supplierId}/bank-details`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Supplier"],
    }),

    // DELETE /suppliers/:id/bank-details/:bankId
    removeBankDetail: builder.mutation<
      ApiResponse<ISupplierBankDetail[]>,
      { supplierId: string; bankId: string }
    >({
      query: ({ supplierId, bankId }) => ({
        url: `/suppliers/${supplierId}/bank-details/${bankId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const {
  useGetAllSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
  useAddContactMutation,
  useRemoveContactMutation,
  useAddBankDetailMutation,
  useRemoveBankDetailMutation,
} = supplierApi;
