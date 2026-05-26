import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmailTemplateStatus = "active" | "deactive";

export interface IEmailTemplate {
  _id: string;
  templateName: string;
  subject: string;
  messageBody: string;
  status: EmailTemplateStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateEmailTemplate {
  templateName: string;
  subject: string;
  messageBody: string;
  status?: EmailTemplateStatus;
}

export interface IUpdateEmailTemplate extends Partial<ICreateEmailTemplate> {}

export interface IEmailTemplateQuery {
  templateName?: string;
  subject?: string;
  status?: EmailTemplateStatus;
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

export const emailTemplateApi = createApi({
  reducerPath: "emailTemplateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["EmailTemplate"],
  endpoints: (builder) => ({
    // GET /email-templates
    getAllEmailTemplates: builder.query<
      PaginatedResponse<IEmailTemplate[]>,
      IEmailTemplateQuery | void
    >({
      query: (params) => ({
        url: "/email-templates",
        params: params ?? {},
      }),
      providesTags: ["EmailTemplate"],
    }),

    // GET /email-templates/:id
    getEmailTemplateById: builder.query<ApiResponse<IEmailTemplate>, string>({
      query: (id) => `/email-templates/${id}`,
      providesTags: (_result, _error, id) => [{ type: "EmailTemplate", id }],
    }),

    // POST /email-templates
    createEmailTemplate: builder.mutation<
      ApiResponse<IEmailTemplate>,
      ICreateEmailTemplate
    >({
      query: (body) => ({
        url: "/email-templates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmailTemplate"],
    }),

    // PATCH /email-templates/:id
    updateEmailTemplate: builder.mutation<
      ApiResponse<IEmailTemplate>,
      { id: string; body: IUpdateEmailTemplate }
    >({
      query: ({ id, body }) => ({
        url: `/email-templates/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "EmailTemplate", id },
        "EmailTemplate",
      ],
    }),

    // PATCH /email-templates/:id/status  — toggle active <-> deactive
    toggleEmailTemplateStatus: builder.mutation<
      ApiResponse<IEmailTemplate>,
      string
    >({
      query: (id) => ({
        url: `/email-templates/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "EmailTemplate", id },
        "EmailTemplate",
      ],
    }),

    // DELETE /email-templates/:id
    deleteEmailTemplate: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/email-templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmailTemplate"],
    }),
  }),
});

export const {
  useGetAllEmailTemplatesQuery,
  useGetEmailTemplateByIdQuery,
  useCreateEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
  useToggleEmailTemplateStatusMutation,
  useDeleteEmailTemplateMutation,
} = emailTemplateApi;
