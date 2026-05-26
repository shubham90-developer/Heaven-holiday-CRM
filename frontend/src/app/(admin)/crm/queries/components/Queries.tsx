"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import SendMessageModal from "./SendMessageModal";
import FollowupModal from "./FollowupModal";
import B2CLeadModal from "./B2CLeadModal";
import B2BLeadModal from "./B2BLeadModal";
import TouchPointsModal from "./TouchPointsModal";
import ProposalModal from "./ProposalModal";
import {
  useGetAllQueriesQuery,
  useGetQueriesByLeadQuery,
  useUpdateQueryMutation,
  useUpdateQueryStatusMutation,
  useDeleteQueryMutation,
  IQuery,
  QueryStatus,
  RequirementType,
} from "../../../../../../Redux/queryApi";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: QueryStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "inProcess", label: "In Process" },
  { value: "confirmed", label: "Confirmed" },
  { value: "rejected", label: "Rejected" },
  { value: "lost", label: "Lost" },
];

const TEMPERATURE_OPTIONS = [
  { key: "hot", label: "Hot", variant: "danger" },
  { key: "warm", label: "Warm", variant: "warning" },
  { key: "cold", label: "Cold", variant: "primary" },
  { key: "", label: "No Status", variant: "dark" },
];

/**
 * Maps UI tab keys → backend `status` query param.
 * undefined = no status filter (show all).
 */
const TAB_STATUS_MAP: Record<string, QueryStatus | undefined> = {
  inProcess: "inProcess",
  new: "new",
  confirmed: "confirmed",
  rejected: "rejected",
  lost: "lost",
  overall: undefined,
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "NA";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

const getTimeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}H ${mins}M`;
};

/**
 * Extracts a readable destination string from whichever
 * sub-schema is populated on the query.
 */
const getDestination = (query: IQuery): string => {
  if (query.packageInfo?.goingTo) return query.packageInfo.goingTo;
  if (query.flightInfo?.destinationCity)
    return query.flightInfo.destinationCity;
  if (query.transferInfo?.goingTo) return query.transferInfo.goingTo ?? "";
  if (query.hotelInfo?.destination) return query.hotelInfo.destination;
  if (query.sightseeingInfo?.destination)
    return query.sightseeingInfo.destination ?? "";
  if (query.miscellaneousInfo?.destination)
    return query.miscellaneousInfo.destination ?? "";
  return query.goingTo ?? "NA";
};

/**
 * Extracts a readable traveler count from whichever sub-schema is populated.
 */
const getTravelers = (query: IQuery): number | string => {
  if (query.packageInfo?.travelers) return query.packageInfo.travelers;
  if (query.flightInfo) {
    const { adults = 0, children = 0, infants = 0 } = query.flightInfo;
    return adults + children + infants;
  }
  if (query.transferInfo?.travelers) return query.transferInfo.travelers ?? "—";
  if (query.hotelInfo?.travelers) return query.hotelInfo.travelers;
  if (query.sightseeingInfo) {
    const { adults = 0, children = 0 } = query.sightseeingInfo;
    return adults + children;
  }
  return "—";
};

/**
 * Extracts a secondary descriptor (queryType, tripType, mode, etc.)
 * for the Description column.
 */
const getSubType = (query: IQuery): string => {
  if (query.packageInfo?.queryType) return query.packageInfo.queryType;
  if (query.flightInfo?.tripType) return query.flightInfo.tripType ?? "";
  if (query.transferInfo?.mode) return query.transferInfo.mode ?? "";
  if (query.visaInfo?.visaCategory) return query.visaInfo.visaCategory ?? "";
  return "";
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const Queries = () => {
  const [activeTab, setActiveTab] = useState<string>("inProcess");
  const [temperature, setTemperature] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedSales, setSelectedSales] = useState<string>("");
  const [selectedOps, setSelectedOps] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Accumulated rows across pages (for "Load More")
  const [allQueries, setAllQueries] = useState<IQuery[]>([]);

  // ── Build query params from UI state ──────────────────────────────────────
  const queryParams = {
    status: TAB_STATUS_MAP[activeTab],
    createdBy: undefined as string | undefined, // extend if you add a "mine" tab
    page,
    limit: 20,
  };

  const {
    data: queriesData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllQueriesQuery(queryParams);

  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const [updateQuery] = useUpdateQueryMutation();
  const [updateStatus] = useUpdateQueryStatusMutation();
  const [deleteQuery] = useDeleteQueryMutation();

  const staffList = staffData?.data ?? [];

  // ── Accumulate pages; reset when tab / filters change ────────────────────
  useEffect(() => {
    if (!queriesData?.data) return;
    if (page === 1) {
      setAllQueries(queriesData.data);
    } else {
      setAllQueries((prev) => {
        const existingIds = new Set(prev.map((q) => q._id));
        const newRows = queriesData.data.filter((q) => !existingIds.has(q._id));
        return [...prev, ...newRows];
      });
    }
  }, [queriesData]);

  // Reset accumulated list and page when tab / temperature changes
  useEffect(() => {
    setAllQueries([]);
    setPage(1);
    setSelectedIds([]);
  }, [activeTab, temperature]);

  // ── Client-side search filter (customerName / destination) ───────────────
  const filtered = search
    ? allQueries.filter((q) => {
        const name = q.lead?.customerName?.toLowerCase() ?? "";
        const dest = getDestination(q).toLowerCase();
        const term = search.toLowerCase();
        return name.includes(term) || dest.includes(term);
      })
    : allQueries;

  // ── Selection helpers ────────────────────────────────────────────────────
  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleSelectAll = () =>
    setSelectedIds(
      selectedIds.length === filtered.length ? [] : filtered.map((q) => q._id),
    );

  // ── Status change (single row) ───────────────────────────────────────────
  const handleStatusChange = async (id: string, status: string) => {
    await updateStatus({ id, body: { status: status as QueryStatus } });
  };

  // ── Bulk assign sales (stored inside the relevant sub-schema) ────────────
  // Since assignToSales lives inside each sub-schema, we use updateQuery
  // with the appropriate info field. For a bulk operation we patch the
  // common createdBy field as a proxy — adjust to your actual needs.
  const handleBulkAssignSales = async () => {
    if (!selectedSales || selectedIds.length === 0) return;
    await Promise.all(
      selectedIds.map((id) => {
        const query = allQueries.find((q) => q._id === id);
        if (!query) return Promise.resolve();
        // patch the populated sub-schema's assignToSales
        const infoKey = getInfoKey(query.requirementType);
        const existing = (query as any)[infoKey] ?? {};
        return updateQuery({
          id,
          body: {
            requirementType: query.requirementType,
            [infoKey]: { ...existing, assignToSales: selectedSales },
          } as any,
        });
      }),
    );
    setSelectedIds([]);
    setSelectedSales("");
  };

  const handleBulkAssignOps = async () => {
    if (!selectedOps || selectedIds.length === 0) return;
    await Promise.all(
      selectedIds.map((id) => {
        const query = allQueries.find((q) => q._id === id);
        if (!query) return Promise.resolve();
        const infoKey = getInfoKey(query.requirementType);
        const existing = (query as any)[infoKey] ?? {};
        return updateQuery({
          id,
          body: {
            requirementType: query.requirementType,
            [infoKey]: { ...existing, assignToOps: true },
          } as any,
        });
      }),
    );
    setSelectedIds([]);
    setSelectedOps("");
  };

  // ── Delete selected ──────────────────────────────────────────────────────
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    await Promise.all(selectedIds.map((id) => deleteQuery(id)));
    setSelectedIds([]);
  };

  // ── Tabs config ──────────────────────────────────────────────────────────
  const tabs = [
    { key: "inProcess", label: "In Process" },
    { key: "new", label: "New" },
    { key: "confirmed", label: "Confirmed" },
    { key: "rejected", label: "Rejected" },
    { key: "lost", label: "Lost" },
    { key: "overall", label: "Overall" },
  ];

  const total = queriesData?.pagination?.total ?? 0;
  const hasMore = allQueries.length < total;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>

      <Card className="p-3">
        <div className="mb-4">
          {/* ── Top bar ── */}
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left: bulk assign */}
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
                value={selectedSales}
                onChange={(e) => setSelectedSales(e.target.value)}
              >
                <option value="">Assign Sales Users</option>
                {staffList.map((s: any) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </select>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                disabled={!selectedSales || selectedIds.length === 0}
                onClick={handleBulkAssignSales}
              >
                Assign
              </Button>

              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
                value={selectedOps}
                onChange={(e) => setSelectedOps(e.target.value)}
              >
                <option value="">Assign OPS Users</option>
                {staffList.map((s: any) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </select>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                disabled={!selectedOps || selectedIds.length === 0}
                onClick={handleBulkAssignOps}
              >
                Assign
              </Button>
            </div>

            {/* Right: create lead modals + refresh + export */}
            <div className="d-flex align-items-center gap-2">
              <B2CLeadModal onSuccess={refetch} />
              <B2BLeadModal onSuccess={refetch} />
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={refetch}
                disabled={isFetching}
              >
                <Icon icon={isFetching ? "mdi:loading" : "mdi:refresh"} />
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                <Icon icon="mdi:file-export" />
              </Button>
            </div>
          </div>

          {/* ── Temperature filters + total + search ── */}
          <Row className="align-items-center mb-2">
            <Col lg={8}>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                  disabled={selectedIds.length === 0}
                  onClick={handleDeleteSelected}
                >
                  Delete
                </Button>

                {TEMPERATURE_OPTIONS.map((t) => (
                  <Button
                    key={t.key}
                    variant={
                      temperature === t.key ? t.variant : `outline-${t.variant}`
                    }
                    size="sm"
                    style={{ fontSize: "10px", fontWeight: "600" }}
                    onClick={() => setTemperature(t.key)}
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </Col>

            <Col lg={4}>
              <h6 className="fw-bold">
                Total Record Found:{" "}
                <span className="text-primary">{total}</span>
              </h6>
              <input
                type="search"
                className="form-control"
                placeholder="Search name, destination..."
                style={{ fontSize: "10px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>

          {/* ── Stage tabs ── */}
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom border-top pb-2 pt-2">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  variant={
                    activeTab === tab.key ? "primary" : "outline-primary"
                  }
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "bold" }}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
              >
                <option>Select Email Template</option>
                <option value="1">Call Back</option>
                <option value="2">
                  Feedback on Your Recent Travel Experience
                </option>
              </select>
              <Button
                variant="danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Email
              </Button>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        {isLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-primary" />
            <p className="mt-2" style={{ fontSize: "12px" }}>
              Loading queries...
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th style={{ width: "40px" }}>
                    <Form.Check
                      type="checkbox"
                      checked={
                        selectedIds.length === filtered.length &&
                        filtered.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th style={{ width: "130px" }}>Query Date</th>
                  <th style={{ width: "260px" }}>Customer Details</th>
                  <th style={{ width: "140px" }}>Pax / Type</th>
                  <th style={{ width: "110px" }}>Description</th>
                  <th style={{ width: "90px" }}>Travel Date</th>
                  <th style={{ width: "100px" }}>Destinations</th>
                  <th style={{ width: "150px" }}>Proposal</th>
                  <th style={{ width: "160px" }}>Query Status</th>
                  <th style={{ width: "120px" }}>Last Updated</th>
                  <th style={{ width: "140px" }}>Created By</th>
                  <th style={{ width: "70px" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center py-4 text-muted">
                      No queries found
                    </td>
                  </tr>
                ) : (
                  filtered.map((query) => (
                    <tr
                      key={query._id}
                      className={
                        selectedIds.includes(query._id) ? "table-active" : ""
                      }
                    >
                      {/* Checkbox */}
                      <td>
                        <Form.Check
                          checked={selectedIds.includes(query._id)}
                          onChange={() => toggleSelect(query._id)}
                        />
                      </td>

                      {/* Query Date */}
                      <td>
                        <div>{formatDate(query.createdAt)}</div>
                        <div className="text-muted">
                          {getTimeAgo(query.createdAt)}
                        </div>
                      </td>

                      {/* Customer Details */}
                      <td>
                        {query.lead?.customerName && (
                          <div className="fw-semibold">
                            <Icon icon="mdi:account" className="me-1" />
                            {query.lead.customerName}
                          </div>
                        )}
                        {query.lead?.phone && (
                          <div>
                            <Icon icon="mdi:phone" className="me-1" />
                            {query.lead.phone}
                          </div>
                        )}
                        {query.lead?.email && (
                          <div>
                            <Icon icon="mdi:email-outline" className="me-1" />
                            {query.lead.email}
                          </div>
                        )}
                      </td>

                      {/* Pax / Type */}
                      <td>
                        <div>{getTravelers(query)} Traveler(s)</div>
                        <span
                          className={`badge ${
                            query.lead?.type === "B2B"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {query.lead?.type ?? "B2C"}
                        </span>
                      </td>

                      {/* Description */}
                      <td>
                        <div>{query.requirementType}</div>
                        <div style={{ fontSize: "10px", color: "#666" }}>
                          {getSubType(query)}
                        </div>
                      </td>

                      {/* Travel Date */}
                      <td>{formatDate(query.travelDate ?? undefined)}</td>

                      {/* Destinations */}
                      <td>
                        {query.goingFrom ? `${query.goingFrom} → ` : ""}
                        {getDestination(query)}
                      </td>

                      {/* Proposal */}
                      <td>
                        <ProposalModal queryId={query._id} />
                      </td>

                      {/* Query Status */}
                      <td>
                        <div className="mb-1">
                          <select
                            className="form-select form-select-sm w-auto"
                            style={{ fontSize: "10px" }}
                            value={query.status}
                            onChange={(e) =>
                              handleStatusChange(query._id, e.target.value)
                            }
                          >
                            {STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="d-flex gap-1">
                          <FollowupModal
                            leadId={query.lead?._id ?? ""}
                            queryId={query._id}
                            customerName={query.lead?.customerName ?? ""}
                            customerType={
                              (query.lead?.type as "B2C" | "B2B") ?? "B2C"
                            }
                          />
                          <TouchPointsModal
                            queryId={query._id}
                            customerName={query.lead?.customerName ?? ""}
                          />
                        </div>
                      </td>

                      {/* Last Updated */}
                      <td>{formatDate(query.updatedAt)}</td>

                      {/* Created By */}
                      <td>
                        {query.createdBy
                          ? `${query.createdBy.firstName} ${query.createdBy.lastName}`
                          : "—"}
                      </td>

                      {/* Action */}
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <Button
                            variant="success"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="View"
                          >
                            <Icon icon="mdi:eye-outline" />
                          </Button>
                          <SendMessageModal />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Load More ── */}
        {!isLoading && hasMore && (
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: "10px", fontWeight: "600" }}
              disabled={isFetching}
              onClick={() => setPage((p) => p + 1)}
            >
              {isFetching ? (
                <>
                  <Icon icon="mdi:loading" className="me-1" spin /> Loading...
                </>
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

export default Queries;

// ─── util (module-level, not inside component) ───────────────────────────────

function getInfoKey(requirementType: RequirementType): string {
  const map: Record<RequirementType, string> = {
    Package: "packageInfo",
    Flight: "flightInfo",
    Transfer: "transferInfo",
    Visa: "visaInfo",
    Hotel: "hotelInfo",
    Sightseeing: "sightseeingInfo",
    Miscellaneous: "miscellaneousInfo",
  };
  return map[requirementType];
}
