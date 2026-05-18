"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import AddCustomerModal from "./AddCustomerModal";
import ReminderEmailModal from "./ReminderEmailModal";
import { useRouter } from "next/navigation";
import {
  useGetAllLeadsQuery,
  useUpdateLeadMutation,
  useBulkAssignLeadsMutation,
  ILead,
} from "../../../../../Redux/leadApi";

import { useGetAllStaffQuery } from "../../../../../Redux/staffApi";
const B2CCustomers = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedOwner, setSelectedOwner] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: leadsData,
    isLoading,
    refetch,
  } = useGetAllLeadsQuery({ type: "B2C", page, limit: 20 });

  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const [bulkAssign, { isLoading: assigning }] = useBulkAssignLeadsMutation();
  const [updateLead] = useUpdateLeadMutation();

  const leads: ILead[] = leadsData?.data ?? [];
  const staffList = staffData?.data ?? [];

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleSelectAll = () => {
    if (selectedIds.length === leads.length) setSelectedIds([]);
    else setSelectedIds(leads.map((l) => l._id));
  };

  const handleBulkAssign = async () => {
    if (!selectedOwner || selectedIds.length === 0) return;
    await bulkAssign({ leadIds: selectedIds, owner: selectedOwner });
    setSelectedIds([]);
    refetch();
  };

  const handleToggleStatus = async (lead: ILead) => {
    const newStatus = lead.status === "archived" ? "inProcess" : "archived";
    await updateLead({ id: lead._id, body: { status: newStatus as any } });
    refetch();
  };

  const filtered = search
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
        <div className="mb-4">
          {/* ── Top bar ── */}
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
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
                disabled={
                  assigning || selectedIds.length === 0 || !selectedOwner
                }
                onClick={handleBulkAssign}
              >
                {assigning ? "Assigning..." : "Assign"}
              </Button>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() =>
                  router.push("/crm/b2c-customers/customer-bulk-upload")
                }
              >
                <Icon icon="mdi:file-import" className="me-1" /> Bulk import
              </Button>
              <AddCustomerModal onSuccess={refetch} />
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
              >
                <Icon icon="mdi:file-export" />
              </Button>
            </div>
          </div>

          {/* ── Total + Search ── */}
          <Row className="align-items-center">
            <Col lg={8}>
              <h6 className="fw-bold">
                Total Record Found :{" "}
                <span className="text-primary">
                  {leadsData?.pagination?.total ?? 0}
                </span>
              </h6>
            </Col>
            <Col lg={4}>
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
              Loading customers...
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
                  <th style={{ width: "260px" }}>Name / Mobile</th>
                  <th style={{ width: "100px" }}>Source</th>
                  <th style={{ width: "140px" }}>RM</th>
                  <th style={{ width: "110px" }}>Last Updated</th>
                  <th style={{ width: "90px" }}>Status</th>
                  <th style={{ width: "70px" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted">
                      No B2C customers found
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <tr
                      key={lead._id}
                      className={
                        selectedIds.includes(lead._id) ? "table-active" : ""
                      }
                    >
                      <td>
                        <Form.Check
                          checked={selectedIds.includes(lead._id)}
                          onChange={() => toggleSelect(lead._id)}
                        />
                      </td>

                      {/* Name / Mobile */}
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
                        <div>
                          <Icon icon="mdi:phone" className="me-1" />
                          {lead.phone}
                        </div>
                        {lead.email && (
                          <div>
                            <Icon icon="mdi:email-outline" className="me-1" />
                            {lead.email}
                          </div>
                        )}
                      </td>

                      {/* Source */}
                      <td>{lead.source}</td>

                      {/* RM / Owner */}
                      <td>
                        {lead.owner
                          ? `${lead.owner.firstName} ${lead.owner.lastName}`
                          : "Unassigned"}
                      </td>

                      {/* Last Updated */}
                      <td>{formatDate(lead.updatedAt)}</td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge ${
                            lead.archived ? "bg-secondary" : "bg-success"
                          }`}
                        >
                          {lead.archived ? "Inactive" : "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <Button
                            variant="success"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="View"
                            onClick={() =>
                              router.push(
                                `/crm/leads/view-leads?id=${lead._id}`,
                              )
                            }
                          >
                            <Icon icon="mdi:eye-outline" />
                          </Button>
                          <Button
                            variant={
                              lead.archived ? "outline-success" : "danger"
                            }
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title={lead.archived ? "Activate" : "Deactivate"}
                            onClick={() => handleToggleStatus(lead)}
                          >
                            <Icon
                              icon={lead.archived ? "mdi:check" : "mdi:close"}
                            />
                          </Button>
                          <ReminderEmailModal />
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

export default B2CCustomers;
