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
} from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import SupplierModal from "./AddModal";
import AddModal from "./AddModal";
import EditModal from "./EditModal"; // ← import EditModal
import {
  useGetAllHotelsQuery,
  useDeleteHotelMutation,
} from "../../../../../../Redux/hotelApi"; // ← adjust to your actual path

const Hotels = () => {
  const router = useRouter();

  // ─── Pagination state ──────────────────────────────────────────────────────
  const [page, setPage] = useState(1);

  // ─── RTK Query ─────────────────────────────────────────────────────────────
  const { data, isLoading, isFetching, isError } = useGetAllHotelsQuery({
    page,
    limit: 20,
  });

  const [deleteHotel, { isLoading: isDeleting }] = useDeleteHotelMutation();

  const hotels = data?.data ?? [];
  const total = data?.pagination?.total ?? 0;
  const hasMore = hotels.length < total;

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleLoadMore = () => setPage((prev) => prev + 1);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await deleteHotel(id).unwrap();
    } catch (err) {
      console.error("Failed to delete hotel:", err);
    }
  };

  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center  justify-content-end mb-2">
          <AddModal />
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "40px" }}>S.No.</th>
                <th style={{ width: "110px" }}> Hotel ID</th>
                <th style={{ width: "250px" }}>Hotel Name</th>
                <th style={{ width: "110px" }}> City</th>
                <th style={{ width: "110px" }}>Contact Email</th>
                <th style={{ width: "110px" }}>Contact Number</th>
                <th style={{ width: "110px" }}>Category</th>
                <th style={{ width: "110px" }} className="text-center">
                  Type
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Check in
                </th>
                <th style={{ width: "100px" }} className="text-center">
                  Check Out
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Supplier
                </th>
                <th style={{ width: "50px" }} className="text-center">
                  Currency
                </th>
                <th style={{ width: "50px" }} className="text-center">
                  DOW
                </th>
                <th style={{ width: "50px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              {/* Loading state */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={14}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {/* Error state */}
              {isError && (
                <tr>
                  <td
                    colSpan={14}
                    className="text-center py-3 text-danger"
                    style={{ fontSize: "10px" }}
                  >
                    Failed to load hotels.
                  </td>
                </tr>
              )}

              {/* Empty state */}
              {!isLoading && !isError && hotels.length === 0 && (
                <tr>
                  <td
                    colSpan={14}
                    className="text-center py-3"
                    style={{ fontSize: "10px" }}
                  >
                    No hotels found.
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {hotels.map((hotel, index) => (
                <tr key={hotel._id}>
                  <td>{(page - 1) * 20 + index + 1}</td>
                  <td>{hotel.hotelId}</td>
                  <td>{hotel.hotelName}</td>
                  <td>{hotel.cityName}</td>
                  <td>{hotel.contactEmail || "--"}</td>
                  <td>
                    {hotel.contactNumber
                      ? `${hotel.countryCode} ${hotel.contactNumber}`
                      : "--"}
                  </td>
                  <td>{hotel.starRating}</td>
                  <td className="text-center">{hotel.propertyType}</td>
                  <td className="text-center">{hotel.checkInTime}</td>
                  <td className="text-center">{hotel.checkOutTime}</td>
                  <td className="text-center">{hotel.supplier || "--"}</td>
                  <td className="text-center">{hotel.currency}</td>
                  <td className="text-center">{hotel.dcw || "--"}</td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      {/* ✅ EDIT — passes this row's hotel data to EditModal */}
                      <span className="action-btn edit">
                        <EditModal hotel={hotel} />
                      </span>

                      {/* ✅ DELETE — calls handleDelete with this row's id */}
                      <span className="action-btn delete">
                        <Button
                          variant="danger"
                          size="sm"
                          style={{ fontSize: "8px" }}
                          title="Delete"
                          disabled={isDeleting}
                          onClick={() => handleDelete(hotel._id)}
                        >
                          <Icon icon="mdi:trash-can-outline" />
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

export default Hotels;
