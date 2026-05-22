"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import ViewSightseeingModal from "./ViewSightseeingModal";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import {
  useGetAllSightseeingRatesQuery,
  useDeleteSightseeingRateMutation,
  ISightseeingRate,
} from "../../../../../../../Redux/ratesApi";

const MyRate = () => {
  const router = useRouter();

  const [viewRate, setViewRate] = useState<ISightseeingRate | null>(null);
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<ISightseeingRate[]>([]);

  // RTK
  const { data, isLoading, isError, isFetching } =
    useGetAllSightseeingRatesQuery({ page, limit: 20 });
  const [deleteRate] = useDeleteSightseeingRateMutation();

  useEffect(() => {
    if (data?.data) {
      console.log("raw rate[0]:", JSON.stringify(data.data[0], null, 2)); // ← add this
      setAllData((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this rate?")) return;
    try {
      await deleteRate(id).unwrap();
      setPage(1);
      setAllData([]);
    } catch {
      alert("Failed to deactivate. Please try again.");
    }
  };

  const hasMore = data ? allData.length < data.pagination.total : false;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center mb-3 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Sightseeing
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/my-rates")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Rates
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() =>
              router.push("/my-inventory/sightseeing/my-rates/add-rate")
            }
          >
            <Icon icon="mdi:plus" /> Add Rates
          </Button>
        </div>

        {/* Loading / Error */}
        {isLoading && (
          <div className="text-center py-3" style={{ fontSize: "12px" }}>
            Loading...
          </div>
        )}
        {isError && (
          <div
            className="text-danger text-center py-3"
            style={{ fontSize: "12px" }}
          >
            Failed to load rates. Please try again.
          </div>
        )}

        {!isLoading && (
          <div className="table-responsive">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th>Sightseeing ID</th>
                  <th>City (Country)</th>
                  <th>Sightseeing Name</th>
                  <th>Sightseeing Type</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Duration</th>
                  <th>Supplier Name</th>
                  <th>Booking Type</th>
                  <th>DOW</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                {allData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={11}
                      className="text-center"
                      style={{ fontSize: "11px" }}
                    >
                      No rates found.
                    </td>
                  </tr>
                ) : (
                  allData.map((rate) => (
                    <tr key={rate._id}>
                      <td>
                        {rate.sightseeingId?.sightseeingName
                          ? rate.rateId
                          : "-"}
                      </td>
                      <td>
                        {rate.city}
                        {rate.sightseeingId?.country
                          ? ` (${rate.sightseeingId.country})`
                          : ""}
                      </td>
                      <td>{rate.sightseeingId?.sightseeingName ?? "-"}</td>
                      <td>{rate.sightseeingId?.city ?? "-"}</td>
                      <td>{formatDate(rate.from)}</td>
                      <td>{formatDate(rate.to)}</td>
                      <td>0</td>
                      <td>
                        {typeof rate.supplier === "object"
                          ? rate.supplier.companyName
                          : "-"}
                      </td>
                      <td>{rate.bookingType}</td>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <span className="action-btn delete">
                            <Button
                              variant="success"
                              size="sm"
                              style={{ fontSize: "8px" }}
                              onClick={() => setViewRate(rate)}
                              title="View"
                            >
                              <Icon icon="mdi:eye" />
                            </Button>
                          </span>
                          <span className="action-btn delete">
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/my-inventory/sightseeing/my-rates/edit-sightseeing/${rate._id}`,
                                )
                              }
                              style={{ fontSize: "8px" }}
                              title="Edit"
                            >
                              <Icon icon="mdi:pencil" />
                            </Button>
                          </span>

                          <span className="action-btn delete">
                            <Button
                              variant="danger"
                              size="sm"
                              style={{ fontSize: "8px" }}
                              title="Deactivate"
                              onClick={() => handleDelete(rate._id)}
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
        )}

        <div className="d-flex justify-content-center mt-4">
          {hasMore && (
            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: "10px", fontWeight: "600" }}
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Load More"}
              <Icon icon="mdi:reload" className="ms-1" />
            </Button>
          )}
        </div>
      </Card>

      {/* View Modal */}
      {viewRate && (
        <ViewSightseeingModal
          rate={viewRate}
          onClose={() => setViewRate(null)}
        />
      )}
    </>
  );
};

export default MyRate;
