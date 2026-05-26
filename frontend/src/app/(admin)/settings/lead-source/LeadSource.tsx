"use client";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import {
  useGetAllLeadSourcesQuery,
  useDeleteLeadSourceMutation,
} from "../../../../../Redux/leadSourcesApi";
const LeadSource = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllLeadSourcesQuery();
  const [deleteLeadSource] = useDeleteLeadSourceMutation();

  const leadSources = data?.data ?? [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead source?")) return;
    try {
      await deleteLeadSource(id).unwrap();
    } catch (error) {
      console.error("Failed to delete lead source:", error);
    }
  };

  return (
    <div>
      <Card className="p-3">
        <div className="text-end mb-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/settings/lead-source/add-leadsource")}
            style={{ fontSize: "10px" }}
          >
            <Icon icon="mdi:plus" />
            Add Lead Source
          </Button>
        </div>

        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th>S.No</th>
                <th>Lead ID</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr style={{ fontSize: "12px" }}>
                  <td colSpan={5}>Loading...</td>
                </tr>
              ) : isError ? (
                <tr style={{ fontSize: "12px" }}>
                  <td colSpan={5} className="text-danger">
                    Failed to load lead sources.
                  </td>
                </tr>
              ) : leadSources.length === 0 ? (
                <tr style={{ fontSize: "12px" }}>
                  <td colSpan={5}>No results found</td>
                </tr>
              ) : (
                leadSources.map((leadSource, index) => (
                  <tr key={leadSource._id} style={{ fontSize: "12px" }}>
                    <td>{index + 1}</td>
                    <td>{leadSource.leadSourceId}</td>
                    <td>{leadSource.leadSourceName}</td>
                    <td>
                      <span
                        className={`badge ${
                          leadSource.status ? "bg-success" : "bg-secondary"
                        }`}
                        style={{ fontSize: "10px" }}
                      >
                        {leadSource.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <span className="action-button delete">
                          <Button
                            variant="primary"
                            size="sm"
                            title="edit"
                            onClick={() =>
                              router.push(
                                `/settings/lead-source/edit-leadsource/${leadSource._id}`,
                              )
                            }
                            style={{ fontSize: "10px" }}
                          >
                            <Icon icon="mdi:edit" />
                          </Button>
                        </span>

                        <span className="action-button delete">
                          <Button
                            variant="danger"
                            size="sm"
                            title="delete"
                            onClick={() => handleDelete(leadSource._id)}
                            style={{ fontSize: "10px" }}
                          >
                            <Icon icon="mdi:delete" />
                          </Button>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data?.pagination && (
          <div className="mt-2 text-muted" style={{ fontSize: "10px" }}>
            Showing {leadSources.length} of {data.pagination.total} lead sources
          </div>
        )}
      </Card>
    </div>
  );
};

export default LeadSource;
