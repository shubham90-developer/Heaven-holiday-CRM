"use client";
import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Filter from "./Filter";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useGetAllDriversQuery,
  useDeleteDriverMutation,
} from "../../../../../../Redux/driverApi";
const ManageDriver = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllDriversQuery({
    page: 1,
    limit: 20,
    isActive: true,
  });

  const [deleteDriver] = useDeleteDriverMutation();

  const drivers = data?.data ?? [];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this driver?")) return;
    try {
      await deleteDriver(id).unwrap();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete driver.");
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
                variant="primary"
                size="sm"
                onClick={() =>
                  router.push("/my-inventory/vehicles/manage-driver")
                }
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Manage Driver
              </Button>

              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  router.push("/my-inventory/vehicles/manage-guide")
                }
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
                  router.push("/my-inventory/vehicles/manage-driver/add-driver")
                }
              >
                <Icon icon="mdi:plus" className="me-1" />
                Add Driver Master
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
                <th style={{ width: "150px" }}>Driver Name</th>
                <th style={{ width: "150px" }}>Mobile No</th>
                <th style={{ width: "200px" }}>E-mail</th>
                <th style={{ width: "150px" }}>Country</th>
                <th style={{ width: "150px" }}>City</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center"
                    style={{ fontSize: "12px" }}
                  >
                    Loading...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-danger"
                    style={{ fontSize: "12px" }}
                  >
                    Failed to load drivers.
                  </td>
                </tr>
              ) : drivers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center"
                    style={{ fontSize: "12px" }}
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                drivers.map((driver, index) => (
                  <tr key={driver._id} style={{ fontSize: "12px" }}>
                    <td>{index + 1}</td>
                    <td>{driver.driverName}</td>
                    <td>
                      {driver.mobileCountryCode} {driver.mobileNumber}
                    </td>
                    <td>{driver.email || "-"}</td>
                    <td>{driver.country}</td>
                    <td>{driver.city}</td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn">
                          <Button
                            variant="info"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Edit"
                            onClick={() =>
                              router.push(
                                `/my-inventory/vehicles/manage-driver/edit-driver/${driver._id}`,
                              )
                            }
                          >
                            <Icon icon="mdi:pencil" />
                          </Button>
                        </span>
                        <span className="action-btn">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Deactivate"
                            onClick={() => handleDelete(driver._id)}
                          >
                            <Icon icon="mdi:close-circle-outline" />
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
      </Card>
    </>
  );
};

export default ManageDriver;
