"use client";

import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import ViewSightseeingModal from "./ViewSightseeingModal";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import {
  useGetAllSightseeingsQuery,
  useDeleteSightseeingMutation,
  ISightseeing,
} from "../../../../../../Redux/sightSeeingApi"; // adjust path as needed

const Sightseeing = () => {
  const router = useRouter();

  // ── UI state ──────────────────────────────────────────────────────────────
  const [viewSightseeing, setViewSightseeing] = useState<ISightseeing | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<ISightseeing[]>([]);

  // ── RTK ───────────────────────────────────────────────────────────────────
  const { data, isLoading, isError, isFetching } = useGetAllSightseeingsQuery(
    { page, limit: 20 },
    {
      // merge new page results into allData
      selectFromResult: (result) => result,
    },
  );

  // Accumulate pages for "Load More"
  React.useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllData(data.data);
      } else {
        setAllData((prev) => [...prev, ...data.data]);
      }
    }
  }, [data]);

  const [deleteSightseeing] = useDeleteSightseeingMutation();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this sightseeing?"))
      return;
    try {
      await deleteSightseeing(id).unwrap();
      // Reset and refetch from page 1
      setPage(1);
      setAllData([]);
    } catch {
      alert("Failed to deactivate. Please try again.");
    }
  };

  const hasMore = data ? allData.length < data.pagination.total : false;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Filter */}
      <div className="mb-2">
        <Filter />
      </div>

      <Card className="p-3">
        {/* Action buttons */}
        <div className="d-flex align-items-center mb-3 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() =>
              router.push("/my-inventory/sightseeing/add-sightseeing")
            }
          >
            <Icon icon="mdi:plus" className="me-1" /> Add Sightseeing
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

        {/* Loading / Error states */}
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
            Failed to load sightseeings. Please try again.
          </div>
        )}

        {/* Table */}
        {!isLoading && (
          <div className="table-responsive">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th>Sightseeing Id</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>Sightseeing Name</th>
                  <th>Sightseeing Type</th>
                  <th>Duration</th>
                  <th>Rates</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                {allData.length === 0 && !isLoading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center"
                      style={{ fontSize: "11px" }}
                    >
                      No sightseeings found.
                    </td>
                  </tr>
                ) : (
                  allData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.sightseeingId}</td>
                      <td>{item.country}</td>
                      <td>{item.city}</td>
                      <td>{item.sightseeingName}</td>
                      <td>{item.category ?? "-"}</td>
                      <td>
                        {item.durationHours > 0 || item.durationMinutes > 0
                          ? `${item.durationHours}h ${item.durationMinutes}m`
                          : "-"}
                      </td>
                      <td>No</td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          {/* View */}
                          <span className="action-btn">
                            <Button
                              variant="success"
                              size="sm"
                              style={{ fontSize: "8px" }}
                              onClick={() => setViewSightseeing(item)}
                              title="View"
                            >
                              <Icon icon="mdi:eye" />
                            </Button>
                          </span>

                          {/* Edit */}
                          <span className="action-btn">
                            <Button
                              variant="info"
                              size="sm"
                              style={{ fontSize: "8px" }}
                              title="Edit"
                              onClick={() =>
                                router.push(
                                  `/my-inventory/sightseeing/edit-sightseeing/${item._id}`,
                                )
                              }
                            >
                              <Icon icon="mdi:pencil" />
                            </Button>
                          </span>

                          {/* Update Rate */}
                          {/* <span className="action-btn">
                            <Button
                              variant="primary"
                              size="sm"
                              style={{ fontSize: "8px" }}
                              title="Update Rate"
                              onClick={() =>
                                router.push(
                                  `/my-inventory/sightseeing/my-rates/edit-sightseeing/${item._id}`,
                                )
                              }
                            >
                              <Icon icon="mdi:update" />
                            </Button>
                          </span> */}

                          {/* Deactivate */}
                          <span className="action-btn">
                            <Button
                              variant="danger"
                              size="sm"
                              style={{ fontSize: "8px" }}
                              title="Deactivate"
                              onClick={() => handleDelete(item._id)}
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

        {/* Load More */}
        {hasMore && (
          <div className="d-flex justify-content-center mt-4">
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
          </div>
        )}
      </Card>

      {/* View Modal */}
      {viewSightseeing && (
        <ViewSightseeingModal
          sightseeing={viewSightseeing}
          onClose={() => setViewSightseeing(null)}
        />
      )}
    </>
  );
};

export default Sightseeing;
