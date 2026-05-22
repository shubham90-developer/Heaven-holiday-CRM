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
  useGetQueryCountsQuery,
  useUpdateQueryMutation,
  IQuery,
} from "../../../../../../Redux/queryApi";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const STAGE_OPTIONS = [
  { value: "queryCreated", label: "Query Created" },
  { value: "proposalPending", label: "Proposal Pending" },
  { value: "proposalSent", label: "Proposal Sent" },
  { value: "confirmed", label: "Confirmed" },
  { value: "rejected", label: "Rejected" },
];

const TEMPERATURE_OPTIONS = [
  { key: "hot", label: "Hot", variant: "danger" },
  { key: "warm", label: "Warm", variant: "warning" },
  { key: "cold", label: "Cold", variant: "primary" },
  { key: "", label: "No Status", variant: "dark" },
];

/**
 * Maps UI tab keys → backend `stage` query param.
 * undefined  = don't send the stage filter (show all stages).
 * "null"     = special value the backend treats as assignedSales IS NULL.
 */
const TAB_STAGE_MAP: Record<string, string | undefined> = {
  inProcess: "queryCreated", // shows only queryCreated stage
  recent: undefined, // no stage filter – rely on sort
  confirmed: "confirmed",
  rejected: "rejected",
  unAssigned: undefined, // filtered by assignedSales=null on backend
  callBack: undefined,
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
    stage: TAB_STAGE_MAP[activeTab],
    temperature: temperature || undefined,
    // "null" string → backend converts to { assignedSales: null } filter
    assignedSales: activeTab === "unAssigned" ? "null" : undefined,
    page,
    limit: 20,
  };

  const {
    data: queriesData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllQueriesQuery(queryParams);

  const { data: countsData } = useGetQueryCountsQuery();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const [updateQuery] = useUpdateQueryMutation();

  const counts = countsData?.data;
  const staffList = staffData?.data ?? [];

  // ── Accumulate pages; reset when tab / filters change ────────────────────
  useEffect(() => {
    if (!queriesData?.data) return;
    if (page === 1) {
      // First page (or filter reset) → replace list
      setAllQueries(queriesData.data);
    } else {
      // Subsequent pages → append, deduplicate by _id
      setAllQueries((prev) => {
        const existingIds = new Set(prev.map((q) => q._id));
        const newRows = queriesData.data.filter((q) => !existingIds.has(q._id));
        return [...prev, ...newRows];
      });
    }
  }, [queriesData]);

  // Reset accumulated list and page when tab or temperature changes
  useEffect(() => {
    setAllQueries([]);
    setPage(1);
    setSelectedIds([]);
  }, [activeTab, temperature]);

  // ── Client-side search filter (name / queryNumber / destination) ──────────
  const filtered = search
    ? allQueries.filter(
        (q) =>
          q.leadId?.customerName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          q.queryNumber?.includes(search) ||
          q.goingTo?.toLowerCase().includes(search.toLowerCase()),
      )
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

  // ── Stage change (single row) ────────────────────────────────────────────
  const handleStageChange = async (id: string, stage: string) => {
    await updateQuery({ id, body: { stage: stage as any } });
    // invalidatesTags: ["Query"] on updateQuery auto-refetches all Query endpoints
  };

  // ── Bulk assign sales ────────────────────────────────────────────────────
  const handleBulkAssignSales = async () => {
    if (!selectedSales || selectedIds.length === 0) return;
    await Promise.all(
      selectedIds.map((id) =>
        updateQuery({ id, body: { assignedSales: selectedSales } }),
      ),
    );
    setSelectedIds([]);
    setSelectedSales("");
    // RTK invalidatesTags handles refetch automatically
  };

  // ── Bulk assign ops ──────────────────────────────────────────────────────
  const handleBulkAssignOps = async () => {
    if (!selectedOps || selectedIds.length === 0) return;
    await Promise.all(
      selectedIds.map((id) =>
        updateQuery({ id, body: { assignedOps: selectedOps } }),
      ),
    );
    setSelectedIds([]);
    setSelectedOps("");
  };

  // ── Archive selected (set archived: true) ────────────────────────────────
  const handleArchiveSelected = async () => {
    if (selectedIds.length === 0) return;
    await Promise.all(
      selectedIds.map((id) =>
        updateQuery({ id, body: { archived: true } as any }),
      ),
    );
    setSelectedIds([]);
  };

  // ── Tabs config ──────────────────────────────────────────────────────────
  const tabs = [
    { key: "inProcess", label: "In Process", count: counts?.inProgress ?? 0 },
    { key: "recent", label: "Recent", count: 0 },
    { key: "confirmed", label: "Confirmed", count: counts?.confirmed ?? 0 },
    { key: "rejected", label: "Rejected", count: counts?.rejected ?? 0 },
    { key: "unAssigned", label: "Un Assigned", count: counts?.unAssigned ?? 0 },
    { key: "callBack", label: "Call Back", count: 0 },
    { key: "overall", label: "Overall", count: 0 },
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
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                  disabled={selectedIds.length === 0}
                  onClick={handleArchiveSelected}
                >
                  Archive
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
                placeholder="Search name, query no, destination..."
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
                  {tab.count > 0 && (
                    <span className="badge bg-light text-dark ms-1">
                      {tab.count}
                    </span>
                  )}
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
                  <th style={{ width: "160px" }}>Lead Stage</th>
                  <th style={{ width: "120px" }}>Last Updated</th>
                  <th style={{ width: "140px" }}>Owner</th>
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
                        <div style={{ fontSize: "9px", color: "#666" }}>
                          {query.queryNumber}
                        </div>
                      </td>

                      {/* Customer Details */}
                      <td>
                        {query.leadId?.customerName && (
                          <div className="fw-semibold">
                            <Icon icon="mdi:account" className="me-1" />
                            {query.leadId.customerName}
                          </div>
                        )}
                        {query.leadId?.phone && (
                          <div>
                            <Icon icon="mdi:phone" className="me-1" />
                            {query.leadId.phone}
                          </div>
                        )}
                        {query.leadId?.email && (
                          <div>
                            <Icon icon="mdi:email-outline" className="me-1" />
                            {query.leadId.email}
                          </div>
                        )}
                      </td>

                      {/* Pax / Type */}
                      <td>
                        <div>{query.travelers} Traveler(s)</div>
                        <span
                          className={`badge ${
                            query.leadId?.type === "B2B"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {query.leadId?.type ?? "B2C"}
                        </span>
                      </td>

                      {/* Description */}
                      <td>
                        <div>{query.requirementType}</div>
                        <div style={{ fontSize: "10px", color: "#666" }}>
                          {query.queryType}
                        </div>
                      </td>

                      {/* Travel Date */}
                      <td>{formatDate(query.travelDate)}</td>

                      {/* Destinations */}
                      <td>
                        {query.goingFrom ? `${query.goingFrom} → ` : ""}
                        {query.goingTo}
                      </td>

                      {/* Proposal */}
                      <td>
                        <ProposalModal queryId={query._id} />
                      </td>

                      {/* Lead Stage */}
                      <td>
                        <div className="mb-1">
                          <select
                            className="form-select form-select-sm w-auto"
                            style={{ fontSize: "10px" }}
                            value={query.stage}
                            onChange={(e) =>
                              handleStageChange(query._id, e.target.value)
                            }
                          >
                            {STAGE_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="d-flex gap-1">
                          <FollowupModal
                            leadId={query.leadId?._id ?? ""}
                            queryId={query._id}
                            customerName={query.leadId?.customerName ?? ""}
                            customerType={
                              (query.leadId?.type as "B2C" | "B2B") ?? "B2C"
                            }
                          />
                          <TouchPointsModal
                            queryId={query._id}
                            customerName={query.leadId?.customerName ?? ""}
                          />
                        </div>
                      </td>

                      {/* Last Updated */}
                      <td>{formatDate(query.updatedAt)}</td>

                      {/* Owner */}
                      <td>
                        {query.assignedSales
                          ? `${query.assignedSales.firstName} ${query.assignedSales.lastName}`
                          : "Unassigned"}
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
