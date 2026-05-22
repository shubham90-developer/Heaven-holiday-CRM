"use client";
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import ViewItineraryModal from "./ViewItineraryModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import {
  useGetAllItinerariesQuery,
  useDeleteItineraryMutation,
  IItinerary,
} from "../../../../../../Redux/itenaryApi";

const PAGE_LIMIT = 20;

const Itinerary = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [viewItineraryId, setViewItineraryId] = useState<string | null>(null);

  const { data, isLoading, isFetching, isError } = useGetAllItinerariesQuery({
    page,
    limit: PAGE_LIMIT,
  });

  const [deleteItinerary, { isLoading: isDeleting }] =
    useDeleteItineraryMutation();

  const itineraries = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;
  const hasMore = itineraries.length < total;

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to deactivate this itinerary?")) return;
    try {
      await deleteItinerary(id).unwrap();
    } catch (err) {
      console.error("Failed to deactivate itinerary:", err);
    }
  };

  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>

      <Card className="p-3">
        <div className="text-end mb-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              router.push("/my-inventory/itinerary-description/add-itinerary")
            }
            style={{ fontSize: "10px" }}
          >
            <Icon icon="mdi:plus" className="me-1" />
            Add Itinerary
          </Button>
        </div>

        {/* Error state */}
        {isError && (
          <div
            className="alert alert-danger py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Failed to load itineraries. Please try again.
          </div>
        )}

        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "60px" }}>S.No</th>
                <th style={{ width: "100px" }}>Itinerary ID</th>
                <th style={{ width: "150px" }}>Start City</th>
                <th style={{ width: "180px" }}>Destination City</th>
                <th style={{ width: "200px" }}>Title</th>
                <th style={{ width: "100px" }}>Status</th>
                <th style={{ width: "120px" }}>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {/* Empty */}
              {!isLoading && !isError && itineraries.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    No itineraries found.
                  </td>
                </tr>
              )}

              {/* Rows */}
              {itineraries.map((itinerary: IItinerary, index: number) => (
                <tr key={itinerary._id} style={{ fontSize: "12px" }}>
                  <td>{(page - 1) * PAGE_LIMIT + index + 1}</td>
                  <td>{itinerary.itineraryId}</td>
                  <td>{itinerary.startCity}</td>
                  <td>{itinerary.destinationCity}</td>
                  <td>{itinerary.title}</td>
                  <td>{itinerary.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <div className="d-flex gap-1">
                      {/* View */}
                      <span className="action-btn">
                        <Button
                          variant="success"
                          size="sm"
                          style={{ fontSize: "8px" }}
                          onClick={() => setViewItineraryId(itinerary._id)}
                          title="View"
                        >
                          <Icon icon="mdi:eye" />
                        </Button>
                      </span>

                      {/* Edit */}
                      <span className="action-btn">
                        <Button
                          variant="primary"
                          size="sm"
                          style={{ fontSize: "8px" }}
                          onClick={() =>
                            router.push(
                              `/my-inventory/itinerary-description/edit-itinerary/${itinerary._id}`,
                            )
                          }
                          title="Edit"
                        >
                          <Icon icon="mdi:edit" />
                        </Button>
                      </span>

                      {/* Deactivate */}
                      <span className="action-btn">
                        <Button
                          variant="warning"
                          size="sm"
                          style={{ fontSize: "8px" }}
                          title="Deactivate"
                          disabled={isDeleting || !itinerary.isActive}
                          onClick={() => handleDelete(itinerary._id)}
                        >
                          <Icon icon="mdi:check" />
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

      {/* View Modal */}
      {viewItineraryId && (
        <ViewItineraryModal
          id={viewItineraryId}
          onClose={() => setViewItineraryId(null)}
        />
      )}
    </>
  );
};

export default Itinerary;
