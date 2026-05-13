import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type RoleType = "superAdmin" | "reportManager";
export type RoleStatus = "active" | "inactive";

export interface IRole {
  _id: string;
  title: string;
  description?: string;
  roleType: RoleType;
  status: RoleStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateRole {
  title: string;
  description?: string;
  roleType: RoleType;
  status?: RoleStatus;
}

export interface IUpdateRole {
  title?: string;
  description?: string;
  roleType?: RoleType;
  status?: RoleStatus;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Role"],
  endpoints: (builder) => ({
    // GET /api/roles
    getAllRoles: builder.query<ApiResponse<IRole[]>, void>({
      query: () => "/roles",
      providesTags: ["Role"],
    }),

    // POST /api/roles
    createRole: builder.mutation<ApiResponse<IRole>, ICreateRole>({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),

    // PATCH /api/roles/:id
    updateRole: builder.mutation<
      ApiResponse<IRole>,
      { id: string; body: IUpdateRole }
    >({
      query: ({ id, body }) => ({
        url: `/roles/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Role", id },
        "Role",
      ],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} = roleApi;
