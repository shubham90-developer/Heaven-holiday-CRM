// department.api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type DepartmentStatus = "active" | "deactive";

export interface IDepartment {
  _id: string;
  name: string;
  is_operations: boolean;
  status: DepartmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateDepartment {
  name: string;
  is_operations?: boolean;
  status?: DepartmentStatus;
}

export interface IUpdateDepartment {
  name?: string;
  is_operations?: boolean;
  status?: DepartmentStatus;
}

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    // GET /api/departments
    getAllDepartments: builder.query<ApiResponse<IDepartment[]>, void>({
      query: () => "/departments",
      providesTags: ["Department"],
    }),

    // POST /api/departments
    createDepartment: builder.mutation<
      ApiResponse<IDepartment>,
      ICreateDepartment
    >({
      query: (body) => ({
        url: "/departments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Department"],
    }),

    // PUT /api/departments/:id
    updateDepartment: builder.mutation<
      ApiResponse<IDepartment>,
      { id: string; body: IUpdateDepartment }
    >({
      query: ({ id, body }) => ({
        url: `/departments/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetAllDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
} = departmentApi;
