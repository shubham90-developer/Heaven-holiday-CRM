"use client";

import React, { useState } from "react";
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

const STAGE_OPTIONS = [
  { value: "queryCreated", label: "Query Created" },
  { value: "proposalPending", label: "Proposal Pending" },
  { value: "proposalSent", label: "Proposal Sent" },
  { value: "confirmed", label: "Confirmed" },
  { value: "rejected", label: "Rejected" },
];

// ── CSV export helper ────────────────────────────────────────────────────────
function exportToCSV(queries: IQuery[]) {
  const headers = [
    "Query Number",
    "Query Date",
    "Customer Name",
    "Phone",
    "Email",
    "Type",
    "Travelers",
    "Requirement",
    "Query Type",
    "Going From",
    "Going To",
    "Travel Date",
    "Stage",
    "Temperature",
    "Assigned Sales",
    "Assigned Ops",
  ];

  const rows = queries.map((q) => [
    q.queryNumber,
    new Date(q.createdAt).toLocaleDateString("en-GB"),
    q.leadId?.customerName ?? "",
    q.leadId?.phone ?? "",
    q.leadId?.email ?? "",
    q.leadId?.type ?? "",
    q.travelers,
    q.requirementType,
    q.queryType,
    q.goingFrom ?? "",
    q.goingTo,
    q.travelDate ? new Date(q.travelDate).toLocaleDateString("en-GB") : "",
    q.stage,
    q.temperature,
    q.assignedSales
      ? `${q.assignedSales.firstName} ${q.assignedSales.lastName}`
      : "",
    q.assignedOps ? `${q.assignedOps.firstName} ${q.assignedOps.lastName}` : "",
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `queries_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ── Recent tab: queries created in last 24 hours ─────────────────────────────
function filterRecent(queries: IQuery[]) {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  return queries.filter((q) => new Date(q.createdAt).getTime() >= cutoff);
}

// ── Callback tab: queries whose last followup nextAction is "callBack" ────────
// We filter client-side since the backend has no callback stage field.
// (Upgrade: add a ?nextAction=callBack query param to the backend in future.)
function filterCallBack(queries: IQuery[]) {
  // Until backend supports it, show "queryCreated" + "proposalPending" together
  // as a proxy for needing follow-up. Replace this with a real filter once
  // the backend exposes a callbackDate / callbackFlag field.
  return queries.filter(
    (q) => q.stage === "queryCreated" || q.stage === "proposalPending",
  );
}

const Queries = () => {
  const [activeTab, setActiveTab] = useState<string>("inProcess");
  const [temperature, setTemperature] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedSales, setSelectedSales] = useState<string>("");
  const [selectedOps, setSelectedOps] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [archiving, setArchiving] = useState(false);

  // ── Stage filter mapping ─────────────────────────────────────────────────
  // "recent", "callBack", "overall" fetch all (no stage filter) and are
  // narrowed client-side after the API response.
  const stageMap: Record<string, string | undefined> = {
    inProcess: "queryCreated",
    recent: undefined,
    confirmed: "confirmed",
    rejected: "rejected",
    unAssigned: undefined,
    callBack: undefined,
    overall: undefined,
  };

  const {
    data: queriesData,
    isLoading,
    refetch,
  } = useGetAllQueriesQuery({
    stage: stageMap[activeTab],
    temperature: temperature || undefined,
    assignedSales: activeTab === "unAssigned" ? "null" : undefined,
    page,
    limit: 20,
  });

  const { data: countsData } = useGetQueryCountsQuery();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const [updateQuery] = useUpdateQueryMutation();

  const allQueries: IQuery[] = queriesData?.data ?? [];
  const counts = countsData?.data;
  const staffList = staffData?.data ?? [];

  // ── Apply client-side tab narrowing ─────────────────────────────────────
  const tabFiltered: IQuery[] = (() => {
    if (activeTab === "recent") return filterRecent(allQueries);
    if (activeTab === "callBack") return filterCallBack(allQueries);
    return allQueries;
  })();

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

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map((q) => q._id));
  };

  const handleStageChange = async (id: string, stage: string) => {
    await updateQuery({ id, body: { stage: stage as any } });
  };

  const handleBulkAssignSales = async () => {
    if (!selectedSales || selectedIds.length === 0) return;
    await Promise.all(
      selectedIds.map((id) =>
        updateQuery({ id, body: { assignedSales: selectedSales } }),
      ),
    );
    setSelectedIds([]);
    refetch();
  };

  const handleBulkAssignOps = async () => {
    if (!selectedOps || selectedIds.length === 0) return;
    await Promise.all(
      selectedIds.map((id) =>
        updateQuery({ id, body: { assignedOps: selectedOps } }),
      ),
    );
    setSelectedIds([]);
    refetch();
  };

  // ── Archive selected queries ─────────────────────────────────────────────
  const handleBulkArchive = async () => {
    if (selectedIds.length === 0) return;
    setArchiving(true);
    try {
      await Promise.all(
        selectedIds.map((id) =>
          updateQuery({ id, body: { archived: true } as any }),
        ),
      );
      setSelectedIds([]);
      refetch();
    } finally {
      setArchiving(false);
    }
  };

  // ── Search filter (applied on top of tab filter) ─────────────────────────
  const filtered = search
    ? tabFiltered.filter(
        (q) =>
          q.leadId?.customerName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          q.queryNumber?.includes(search) ||
          q.goingTo?.toLowerCase().includes(search.toLowerCase()),
      )
    : tabFiltered;

  const tabs = [
    { key: "inProcess", label: "In Process", count: counts?.inProgress ?? 0 },
    {
      key: "recent",
      label: "Recent",
      count: filterRecent(allQueries).length,
    },
    { key: "confirmed", label: "Confirmed", count: counts?.confirmed ?? 0 },
    { key: "rejected", label: "Rejected", count: counts?.rejected ?? 0 },
    {
      key: "unAssigned",
      label: "Un Assigned",
      count: counts?.unAssigned ?? 0,
    },
    {
      key: "callBack",
      label: "Call Back",
      count: filterCallBack(allQueries).length,
    },
    {
      key: "overall",
      label: "Overall",
      count: queriesData?.pagination?.total ?? 0,
    },
  ];

  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>

      <Card className="p-3">
        <div className="mb-4">
          {/* ── Top bar ── */}
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left: assign selects */}
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

            {/* Right: B2C/B2B modal + refresh + export */}
            <div className="d-flex align-items-center gap-2">
              <B2CLeadModal onSuccess={refetch} />
              <B2BLeadModal onSuccess={refetch} />
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={refetch}
              >
                <Icon icon="mdi:refresh" />
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                title="Export to CSV"
                onClick={() => exportToCSV(filtered)}
                disabled={filtered.length === 0}
              >
                <Icon icon="mdi:file-export" />
              </Button>
            </div>
          </div>

          {/* ── Temperature filters + total + search ── */}
          <Row className="align-items-center mb-2">
            <Col lg={8}>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {/* Archive selected */}
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                  disabled={selectedIds.length === 0 || archiving}
                  onClick={handleBulkArchive}
                >
                  {archiving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        style={{ width: "10px", height: "10px" }}
                      />
                      Archiving…
                    </>
                  ) : (
                    `Archive${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`
                  )}
                </Button>

                {[
                  { key: "hot", label: "Hot", variant: "danger" },
                  { key: "warm", label: "Warm", variant: "warning" },
                  { key: "cold", label: "Cold", variant: "primary" },
                  { key: "", label: "No Status", variant: "dark" },
                ].map((t) => (
                  <Button
                    key={t.key}
                    variant={
                      temperature === t.key
                        ? t.variant
                        : `outline-${t.variant === "warning" ? "warning" : t.variant}`
                    }
                    size="sm"
                    style={{ fontSize: "10px", fontWeight: "600" }}
                    onClick={() => {
                      setTemperature(t.key);
                      setPage(1);
                    }}
                  >
                    {t.label}
                  </Button>
                ))}
              </div>
            </Col>
            <Col lg={4}>
              <h6 className="fw-bold">
                Total Record Found :{" "}
                <span className="text-primary">
                  {activeTab === "overall" ||
                  activeTab === "recent" ||
                  activeTab === "callBack"
                    ? filtered.length
                    : (queriesData?.pagination?.total ?? 0)}
                </span>
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
                  onClick={() => {
                    setActiveTab(tab.key);
                    setPage(1);
                    setSelectedIds([]);
                  }}
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
                disabled={selectedIds.length === 0}
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
                        filtered.length > 0 &&
                        selectedIds.length === filtered.length
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
                            leadId={query.leadId?._id ?? ""}
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
                            href={`/crm/queries/${query._id}`}
                          >
                            <Icon icon="mdi:eye-outline" />
                          </Button>
                          <SendMessageModal
                            customerName={query.leadId?.customerName ?? ""}
                            phone={query.leadId?.phone ?? ""}
                            leadId={query.leadId?._id ?? ""}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Load More (only for paginated tabs) ── */}
        {activeTab !== "recent" &&
          activeTab !== "callBack" &&
          activeTab !== "overall" &&
          queriesData?.pagination &&
          allQueries.length < queriesData.pagination.total && (
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "600" }}
                onClick={() => setPage((p) => p + 1)}
              >
                Load More <Icon icon="mdi:reload" className="ms-1" />
              </Button>
            </div>
          )}
      </Card>
    </>
  );
};

export default Queries;
