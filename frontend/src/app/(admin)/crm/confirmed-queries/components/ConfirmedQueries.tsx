"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetAllQueriesQuery } from "../../../../../../Redux/queryApi";
import { useRouter } from "next/navigation";
import ProposalModal from "../../queries/components/ProposalModal";
import SendMessageModal from "../../leads/components/SendMessageModal";
const ConfirmedQueries = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data: queriesData, isLoading } = useGetAllQueriesQuery({
    stage: "confirmed",
    page,
    limit: 20,
  });
  const queries = queriesData?.data ?? [];

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

  const filtered = search
    ? queries.filter(
        (q) =>
          q.leadId?.customerName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          q.queryNumber?.includes(search) ||
          q.goingTo?.toLowerCase().includes(search.toLowerCase()),
      )
    : queries;

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleSelectAll = () =>
    setSelectedIds(
      selectedIds.length === filtered.length ? [] : filtered.map((q) => q._id),
    );

  return (
    <>
      <Card className="p-3">
        <div className="mb-4">
          <Row className="align-items-center">
            <Col lg={4}>
              <h6 className="fw-bold">
                Total Record Found :{" "}
                <span className="text-primary">
                  {queriesData?.pagination?.total ?? 0}
                </span>
              </h6>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                style={{ fontSize: "10px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
        </div>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-primary" />
            <p className="mt-2" style={{ fontSize: "12px" }}>
              Loading...
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
                  <th style={{ width: "120px" }}>Lead Stage</th>
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
                      No confirmed queries found
                    </td>
                  </tr>
                ) : (
                  filtered.map((query) => (
                    <tr key={query._id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedIds.includes(query._id)}
                          onChange={() => toggleSelect(query._id)}
                        />
                      </td>
                      <td>
                        <div>{formatDate(query.createdAt)}</div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "10px" }}
                        >
                          {getTimeAgo(query.createdAt)}
                        </div>
                        <div style={{ fontSize: "9px", color: "#666" }}>
                          {query.queryNumber}
                        </div>
                      </td>
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
                      <td>
                        <div>{query.travelers} Traveler(s)</div>
                        <span
                          className={`badge ${query.leadId?.type === "B2B" ? "bg-warning text-dark" : "bg-success"}`}
                        >
                          {query.leadId?.type ?? "B2C"}
                        </span>
                      </td>
                      <td>
                        <div>{query.requirementType}</div>
                        <div style={{ fontSize: "10px", color: "#666" }}>
                          {query.queryType}
                        </div>
                      </td>
                      <td>{formatDate(query.travelDate)}</td>
                      <td>
                        {query.goingFrom ? `${query.goingFrom} → ` : ""}
                        {query.goingTo}
                      </td>
                      <td>
                        <ProposalModal queryId={query._id} />
                      </td>
                      <td>
                        <span className="badge bg-success">Confirmed</span>
                      </td>
                      <td>{formatDate(query.updatedAt)}</td>
                      <td>
                        {query.assignedSales
                          ? `${query.assignedSales.firstName} ${query.assignedSales.lastName}`
                          : "Unassigned"}
                      </td>
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <Button
                            variant="success"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="View"
                            onClick={() =>
                              router.push(`/crm/queries/${query._id}`)
                            }
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

        {queriesData?.pagination &&
          queries.length < queriesData.pagination.total && (
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

export default ConfirmedQueries;
