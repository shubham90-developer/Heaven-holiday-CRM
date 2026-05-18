"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import {
  useGetAllLeadsQuery,
  useBulkArchiveLeadsMutation,
  useUpdateLeadMutation,
  ILead,
} from "../../../../../Redux/leadApi";

const ArchivedLeads = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // NOTE: Backend getAllLeads hardcodes archived:false — you must apply the patch in
  // BACKEND_PATCH_REQUIRED.ts and add archived?: boolean to Redux leadApi params.
  // After the patch, this will correctly fetch archived leads using archived:true.
  const {
    data: leadsData,
    isLoading,
    refetch,
  } = useGetAllLeadsQuery({ archived: true, page, limit: 20 });

  const [updateLead] = useUpdateLeadMutation();

  const leads: ILead[] = leadsData?.data ?? [];

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

  const handleUnarchive = async (id: string) => {
    await updateLead({
      id,
      body: { archived: false, status: "inProcess" as any },
    });
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
      <Card className="p-3">
        <div className="mb-4">
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
              Loading archived leads...
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
                  <th style={{ width: "100px" }}>Date of Lead</th>
                  <th style={{ width: "140px" }}>Source</th>
                  <th style={{ width: "90px" }}>Type</th>
                  <th style={{ width: "110px" }}>Owner</th>
                  <th style={{ width: "90px" }}>Stage</th>
                  <th style={{ width: "70px" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-muted">
                      No archived leads found
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

                      {/* Date of Lead */}
                      <td>{formatDate(lead.createdAt)}</td>

                      {/* Source */}
                      <td>{lead.source}</td>

                      {/* Type */}
                      <td>
                        <span
                          className={`badge ${
                            lead.type === "B2B"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {lead.type}
                        </span>
                      </td>

                      {/* Owner */}
                      <td>
                        {lead.owner
                          ? `${lead.owner.firstName} ${lead.owner.lastName}`
                          : "Unassigned"}
                      </td>

                      {/* Stage */}
                      <td>
                        <span className="badge bg-secondary">
                          {lead.leadStage}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <Button
                            variant="success"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Restore / Unarchive"
                            onClick={() => handleUnarchive(lead._id)}
                          >
                            <Icon icon="mdi:restore" />
                          </Button>
                          <Button
                            variant="outline-secondary"
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

export default ArchivedLeads;
