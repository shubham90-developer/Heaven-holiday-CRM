"use client";
import React from "react";
import Filter from "./Filter";
import { Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useGetAllGuidesQuery,
  useDeleteGuideMutation,
} from "../../../../../../Redux/guideApi";

const ManageGuide = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllGuidesQuery();
  const [deleteGuide] = useDeleteGuideMutation();

  const guides = data?.data ?? [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guide?")) return;
    try {
      await deleteGuide(id).unwrap();
    } catch (error) {
      console.error("Failed to delete guide:", error);
    }
  };

  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left Section */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => router.push("/my-inventory/vehicles/")}
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Manage Transport
              </Button>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  router.push("/my-inventory/vehicles/manage-driver")
                }
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Manage Driver
              </Button>

              <Button
                variant="primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Manage Guide
              </Button>
            </div>

            {/* Right side */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() =>
                  router.push("/my-inventory/vehicles/manage-guide/add-guide")
                }
              >
                <Icon icon="mdi:plus" className="me-1" />
                Add Guide
              </Button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "60px" }}>S.No</th>
                <th style={{ width: "150px" }}>Guide Name</th>
                <th style={{ width: "150px" }}>Destination</th>
                <th style={{ width: "200px" }}>Email</th>
                <th style={{ width: "150px" }}>Mobile No</th>
                <th style={{ width: "120px" }}>Status</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr style={{ fontSize: "12px" }}>
                  <td colSpan={7}>Loading...</td>
                </tr>
              ) : isError ? (
                <tr style={{ fontSize: "12px" }}>
                  <td colSpan={7} className="text-danger">
                    Failed to load guides.
                  </td>
                </tr>
              ) : guides.length === 0 ? (
                <tr style={{ fontSize: "12px" }}>
                  <td colSpan={7}>No results found</td>
                </tr>
              ) : (
                guides.map((guide, index) => (
                  <tr key={guide._id} style={{ fontSize: "12px" }}>
                    <td>{index + 1}</td>
                    <td>{guide.guideName}</td>
                    <td>{guide.destination}</td>
                    <td>{guide.email || "-"}</td>
                    <td>
                      {guide.mobileCountryCode} {guide.mobileNumber}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          guide.isActive ? "bg-success" : "bg-secondary"
                        }`}
                        style={{ fontSize: "10px" }}
                      >
                        {guide.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          style={{ fontSize: "10px", padding: "2px 6px" }}
                          onClick={() =>
                            router.push(
                              `/my-inventory/vehicles/manage-guide/edit-guide/${guide._id}`,
                            )
                          }
                        >
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          style={{ fontSize: "10px", padding: "2px 6px" }}
                          onClick={() => handleDelete(guide._id)}
                        >
                          <Icon icon="mdi:delete" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination info */}
        {data?.pagination && (
          <div className="mt-2 text-muted" style={{ fontSize: "10px" }}>
            Showing {guides.length} of {data.pagination.total} guides
          </div>
        )}
      </Card>
    </>
  );
};

export default ManageGuide;
