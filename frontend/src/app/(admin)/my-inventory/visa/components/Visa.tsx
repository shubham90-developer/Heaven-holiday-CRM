"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import {
  useGetAllVisasQuery,
  useDeleteVisaMutation,
} from "../../../../../../Redux/visaApi";

const PAGE_LIMIT = 20;

const Visa = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isError } = useGetAllVisasQuery({
    page,
    limit: PAGE_LIMIT,
  });

  const [deleteVisa, { isLoading: isDeleting }] = useDeleteVisaMutation();

  const visas = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;
  const hasMore = visas.length < total;
  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this visa?")) return;
    try {
      await deleteVisa(id).unwrap();
    } catch (err) {
      console.error("Failed to deactivate visa:", err);
    }
  };

  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <div className="mb-2">
          <div className="text-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => router.push("/my-inventory/visa/add-visa")}
              style={{ fontSize: "10px", fontWeight: "bold" }}
            >
              <Icon icon="mdi:plus" /> Add Visa
            </Button>
          </div>
        </div>

        {/* Error state */}
        {isError && (
          <div
            className="alert alert-danger py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Failed to load visas. Please try again.
          </div>
        )}

        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "80px" }}>Visa ID</th>
                <th style={{ width: "150px" }}>Nationality</th>
                <th style={{ width: "150px" }}>Country</th>
                <th style={{ width: "150px" }}>Visa Name</th>
                <th style={{ width: "120px" }}>Visa Required</th>
                <th style={{ width: "150px" }}>Visa Category</th>
                <th style={{ width: "150px" }}>Visa Type</th>
                <th style={{ width: "140px" }}>Processing Time</th>
                <th style={{ width: "180px" }}>Passport Expire (Days)</th>
                <th style={{ width: "120px" }}>Validity</th>
                <th style={{ width: "120px" }}>Duration</th>
                <th style={{ width: "120px" }}>Currency</th>
                <th style={{ width: "130px" }}>Adult Rates</th>
                <th style={{ width: "130px" }}>Child Rates</th>
                <th style={{ width: "130px" }}>Infant Rates</th>
                <th style={{ width: "100px" }}>DOW</th>
                <th style={{ width: "100px" }}>Status</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading state */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={18}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {/* Empty state */}
              {!isLoading && !isError && visas.length === 0 && (
                <tr>
                  <td
                    colSpan={18}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    No visas found.
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {visas.map((visa) => (
                <tr key={visa._id} style={{ fontSize: "12px" }}>
                  <td>{visa.visaId}</td>
                  <td>{visa.travelersNationality}</td>
                  <td>{visa.countriesCovered.join(", ") || "--"}</td>
                  <td>{visa.visaName}</td>
                  <td>{visa.visaType || "--"}</td>
                  <td>{visa.visaCategory || "--"}</td>
                  <td>{visa.entryType || "--"}</td>
                  <td>{visa.processingTime ?? "--"}</td>
                  <td>{visa.passportExpire ?? "--"}</td>
                  <td>{visa.validityOfVisa ?? "--"}</td>
                  <td>{visa.duration || "--"}</td>
                  <td>{visa.embassyFee.currency}</td>
                  <td>{visa.embassyFee.adult}</td>
                  <td>{visa.embassyFee.child}</td>
                  <td>{visa.embassyFee.infant}</td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={visa.isActive}
                      readOnly
                    />
                  </td>
                  <td>{visa.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        variant="primary"
                        size="sm"
                        title="Edit"
                        onClick={() =>
                          router.push(
                            `/my-inventory/visa/edit-visa/${visa._id}`,
                          )
                        }
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                      >
                        <Icon icon="mdi:edit" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        title="Deactivate"
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                        disabled={isDeleting || !visa.isActive}
                        onClick={() => handleDelete(visa._id)}
                      >
                        <Icon icon="mdi:close" />
                      </Button>
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

export default Visa;
