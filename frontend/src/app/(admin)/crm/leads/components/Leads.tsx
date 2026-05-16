"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import SendMessageModal from "./SendMessageModal";
import FollowupModal from "./FollowupModal";
import B2CLeadModal from "./B2CLeadModal";
import B2BLeadModal from "./B2BLeadModal";
import { useRouter } from "next/navigation";
import {
  useGetAllLeadsQuery,
  useGetLeadCountsQuery,
  useBulkAssignLeadsMutation,
  useBulkArchiveLeadsMutation,
  useUpdateLeadMutation,
  ILead,
} from "../../../../../../Redux/leadApi";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";
const Leads = () => {
  const router = useRouter();

  // ── Filters / pagination state ────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<string>("inProcess");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedOwner, setSelectedOwner] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingPhone, setEditingPhone] = useState<{
    id: string;
    value: string;
  } | null>(null);

  // ── API calls ─────────────────────────────────────────────────────────────
  const {
    data: leadsData,
    isLoading,
    refetch,
  } = useGetAllLeadsQuery({
    status: activeTab === "overall" ? undefined : activeTab,
    page,
    limit: 20,
  });

  const { data: countsData } = useGetLeadCountsQuery();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });

  const [bulkAssign, { isLoading: assigning }] = useBulkAssignLeadsMutation();
  const [bulkArchive, { isLoading: archiving }] = useBulkArchiveLeadsMutation();
  const [updateLead] = useUpdateLeadMutation();

  const leads: ILead[] = leadsData?.data ?? [];
  const counts = countsData?.data;
  const staffList = staffData?.data ?? [];

  // ── Helpers ───────────────────────────────────────────────────────────────
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  const getDaysAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 Day";
    return `${days} Days`;
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(leads.map((l) => l._id));
    }
  };

  const handleBulkAssign = async () => {
    if (!selectedOwner || selectedIds.length === 0) return;
    await bulkAssign({ leadIds: selectedIds, owner: selectedOwner });
    setSelectedIds([]);
    refetch();
  };

  const handleBulkArchive = async () => {
    if (selectedIds.length === 0) return;
    await bulkArchive({ leadIds: selectedIds });
    setSelectedIds([]);
    refetch();
  };

  const handlePhoneSave = async (id: string) => {
    if (!editingPhone) return;
    await updateLead({ id, body: { phone: editingPhone.value } });
    setEditingPhone(null);
  };

  const tabConfig = [
    { key: "inProcess", label: "In Process", count: counts?.inProcess ?? 0 },
    { key: "callback", label: "Callback Leads", count: counts?.callback ?? 0 },
    { key: "overall", label: "Overall Leads", count: 0 },
    {
      key: "unassigned",
      label: "Un-Assigned",
      count: counts?.unassigned ?? 0,
    },
  ];

  const filteredLeads = search
    ? leads.filter(
        (l) =>
          l.customerName.toLowerCase().includes(search.toLowerCase()) ||
          l.phone.includes(search) ||
          l.email?.toLowerCase().includes(search.toLowerCase()),
      )
    : leads;

  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>

      <Card className="p-3">
        {/* ── Top action bar ── */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left */}
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
                value={selectedOwner}
                onChange={(e) => setSelectedOwner(e.target.value)}
              >
                <option value="">Select Users</option>
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
                disabled={assigning || selectedIds.length === 0}
                onClick={handleBulkAssign}
              >
                {assigning ? "Assigning..." : "Assign"}
              </Button>

              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                disabled={archiving || selectedIds.length === 0}
                onClick={handleBulkArchive}
              >
                {archiving ? "Archiving..." : "Archive"}
              </Button>
            </div>

            {/* Right */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() => router.push("/crm/leads/lead-bulk-upload")}
              >
                <Icon icon="mdi:upload" className="me-1" />
                B2C
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() => router.push("/crm/leads/lead-b2b-bulk-upload")}
              >
                <Icon icon="mdi:upload" className="me-1" />
                B2B
              </Button>

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
            </div>
          </div>

          {/* ── Tabs + Search ── */}
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {tabConfig.map((tab) => (
                  <Button
                    key={tab.key}
                    variant={
                      activeTab === tab.key ? "primary" : "outline-primary"
                    }
                    size="sm"
                    style={{ fontSize: "10px", fontWeight: "600" }}
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
            </Col>

            <Col lg={4}>
              <h6 className="fw-bold">
                Total Record Found :{" "}
                <span className="text-primary">
                  {leadsData?.pagination?.total ?? 0}
                </span>
              </h6>
              <input
                type="search"
                className="form-control"
                placeholder="Search name, phone, email..."
                style={{ fontSize: "10px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
        </div>

        {/* ── Table ── */}
        {isLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-primary" />
            <p className="mt-2" style={{ fontSize: "12px" }}>
              Loading leads...
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
                        selectedIds.length === leads.length && leads.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th style={{ width: "130px" }}>Lead Date</th>
                  <th style={{ width: "260px" }}>Customer Details</th>
                  <th style={{ width: "140px" }}>Type / Source</th>
                  <th style={{ width: "110px" }}>Travel Date</th>
                  <th style={{ width: "90px" }}>No. of Pax</th>
                  <th style={{ width: "100px" }}>No. of Days</th>
                  <th style={{ width: "150px" }}>Destinations</th>
                  <th style={{ width: "120px" }}>Lead Stage</th>
                  <th style={{ width: "160px" }}>Remark</th>
                  <th style={{ width: "120px" }}>Last Updated</th>
                  <th style={{ width: "140px" }}>Owner</th>
                  <th style={{ width: "70px" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-4 text-muted">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      className={
                        selectedIds.includes(lead._id) ? "table-active" : ""
                      }
                    >
                      {/* Checkbox */}
                      <td>
                        <Form.Check
                          checked={selectedIds.includes(lead._id)}
                          onChange={() => toggleSelect(lead._id)}
                        />
                      </td>

                      {/* Lead Date */}
                      <td>
                        <div>{formatDate(lead.createdAt)}</div>
                        <div className="text-muted">
                          {getDaysAgo(lead.createdAt)}
                        </div>
                        <div className="text-muted" style={{ fontSize: "9px" }}>
                          {lead._id.slice(-7).toUpperCase()}
                        </div>
                      </td>

                      {/* Customer Details */}
                      <td>
                        <div className="fw-semibold">
                          <Icon icon="mdi:account" className="me-1" />
                          {lead.customerName}
                          {lead.isDuplicate && (
                            <span
                              className="text-danger ms-1"
                              style={{ fontSize: "9px" }}
                            >
                              (Duplicate)
                            </span>
                          )}
                        </div>

                        {/* Editable phone */}
                        <div className="d-flex align-items-center gap-1">
                          <Icon icon="mdi:phone" />
                          {editingPhone?.id === lead._id ? (
                            <input
                              type="text"
                              value={editingPhone.value}
                              autoFocus
                              onChange={(e) =>
                                setEditingPhone({
                                  id: lead._id,
                                  value: e.target.value,
                                })
                              }
                              onBlur={() => handlePhoneSave(lead._id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  handlePhoneSave(lead._id);
                              }}
                              className="form-control form-control-sm"
                              style={{ width: "150px", fontSize: "12px" }}
                            />
                          ) : (
                            <>
                              <span>{lead.phone}</span>
                              <Icon
                                icon="mdi:pencil"
                                style={{
                                  cursor: "pointer",
                                  border: "1px dotted #000",
                                  padding: "1px",
                                  background: "#36b7f1",
                                  color: "#fff",
                                  borderRadius: "50%",
                                }}
                                onClick={() =>
                                  setEditingPhone({
                                    id: lead._id,
                                    value: lead.phone,
                                  })
                                }
                              />
                            </>
                          )}
                        </div>

                        {lead.email && (
                          <div>
                            <Icon icon="mdi:email-outline" className="me-1" />
                            {lead.email}
                          </div>
                        )}
                      </td>

                      {/* Type / Source */}
                      <td>
                        <div>Package</div>
                        <div>
                          <span
                            className={`badge ${lead.type === "B2C" ? "bg-success" : "bg-warning text-dark"}`}
                          >
                            {lead.type}
                          </span>
                        </div>
                        <div style={{ fontSize: "10px" }}>{lead.source}</div>
                      </td>

                      {/* Travel Date - from query if available */}
                      <td>NA</td>

                      {/* Pax */}
                      <td>NA</td>

                      {/* Days */}
                      <td></td>

                      {/* Destinations */}
                      <td>NA</td>

                      {/* Lead Stage */}
                      <td>
                        <div className="mb-1">
                          <span
                            className={`badge ${
                              lead.leadStage === "confirmed"
                                ? "bg-success"
                                : lead.leadStage === "rejected"
                                  ? "bg-danger"
                                  : lead.leadStage === "lost"
                                    ? "bg-secondary"
                                    : "bg-warning text-dark"
                            }`}
                          >
                            {lead.leadStage}
                          </span>
                        </div>
                        <FollowupModal
                          leadId={lead._id}
                          customerName={lead.customerName}
                          customerType={lead.type}
                        />
                      </td>

                      {/* Remark */}
                      <td style={{ fontSize: "10px" }}>
                        {lead.remark || "NA"}
                      </td>

                      {/* Last Updated */}
                      <td>{formatDate(lead.updatedAt)}</td>

                      {/* Owner */}
                      <td>
                        {lead.owner
                          ? `${lead.owner.firstName} ${lead.owner.lastName}`
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
                            onClick={() =>
                              router.push(
                                `/crm/leads/view-leads?id=${lead._id}`,
                              )
                            }
                          >
                            <Icon icon="mdi:eye-outline" />
                          </Button>

                          <SendMessageModal />

                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Archive"
                            onClick={() => bulkArchive({ leadIds: [lead._id] })}
                          >
                            <Icon icon="mdi:minus-circle-outline" />
                          </Button>
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
        {leadsData?.pagination && leads.length < leadsData.pagination.total && (
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

export default Leads;
