"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tabs,
  Tab,
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useGetAllEmailTemplatesQuery,
  useDeleteEmailTemplateMutation,
  useToggleEmailTemplateStatusMutation,
} from "../../../../../Redux/email-templateApi";

const PAGE_LIMIT = 20;

const EmailTemplate = () => {
  const router = useRouter();

  // ─── Pagination ────────────────────────────────────────────────────────────
  const [page, setPage] = useState(1);

  // ─── RTK hooks ─────────────────────────────────────────────────────────────
  const { data, isLoading, isFetching, isError } = useGetAllEmailTemplatesQuery(
    { page, limit: PAGE_LIMIT },
  );

  const [deleteEmailTemplate, { isLoading: isDeleting }] =
    useDeleteEmailTemplateMutation();

  const [toggleStatus, { isLoading: isToggling }] =
    useToggleEmailTemplateStatusMutation();

  const templates = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;
  const hasMore = templates.length < total;

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    try {
      await deleteEmailTemplate(id).unwrap();
    } catch (err) {
      console.error("Failed to delete template:", err);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleLoadMore = () => setPage((prev) => prev + 1);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Card className="p-2">
        <div className="text-end mb-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              router.push("/settings/email-templates/add-template")
            }
            style={{ fontSize: "10px" }}
          >
            <Icon icon="mdi:plus" />
            Add Email Template
          </Button>
        </div>

        {/* Error state */}
        {isError && (
          <div
            className="alert alert-danger py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Failed to load email templates. Please try again.
          </div>
        )}

        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th>Template Name</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Loading state */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {/* Empty state */}
              {!isLoading && !isError && templates.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    No email templates found.
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {templates.map((template) => (
                <tr key={template._id} style={{ fontSize: "12px" }}>
                  <td>{template.templateName}</td>
                  <td>{template.subject}</td>
                  <td>
                    <span
                      className={`badge ${template.status === "active" ? "bg-success" : "bg-secondary"}`}
                      style={{ fontSize: "10px", cursor: "pointer" }}
                      onClick={() => handleToggleStatus(template._id)}
                      title="Click to toggle status"
                    >
                      {template.status === "active" ? "Active" : "Deactive"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <span className="table-action edit">
                        <Button
                          variant="primary"
                          size="sm"
                          title="Edit"
                          onClick={() =>
                            router.push(
                              `/settings/email-templates/edit-template/${template._id}`,
                            )
                          }
                          style={{ fontSize: "10px" }}
                        >
                          <Icon icon="mdi:edit" />
                        </Button>
                      </span>
                      <span className="table-action delete">
                        <Button
                          variant="danger"
                          size="sm"
                          title="Delete"
                          style={{ fontSize: "10px" }}
                          disabled={isDeleting}
                          onClick={() => handleDelete(template._id)}
                        >
                          <Icon icon="mdi:delete" />
                        </Button>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: "10px", fontWeight: "600" }}
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              {isFetching ? (
                "Loading..."
              ) : (
                <>
                  Load More <Icon icon="mdi:reload" className="ms-1" />
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default EmailTemplate;
