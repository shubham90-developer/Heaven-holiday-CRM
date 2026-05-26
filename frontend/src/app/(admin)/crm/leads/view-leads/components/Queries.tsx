"use client";

import React from "react";
import { Card, Badge, Spinner, Button, Form } from "react-bootstrap";
import {
  useGetQueriesByLeadQuery,
  useUpdateQueryStatusMutation,
  useDeleteQueryMutation,
} from "../../../../../../../Redux/queryApi";

import type { IQuery, QueryStatus } from "../../../../../../../Redux/queryApi";
import { Icon } from "@iconify/react";

// ── types ─────────────────────────────────────────────────────────────────────

type QueriesProps = {
  leadId: string;
};

// ── helpers ───────────────────────────────────────────────────────────────────

const STATUS_VARIANT: Record<QueryStatus, string> = {
  new: "secondary",
  inProcess: "warning",
  confirmed: "success",
  rejected: "danger",
  lost: "dark",
};

const formatDate = (dateStr?: string | null): string => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB");
};

/** Extracts source (origin) from any query type */
const resolveSource = (q: IQuery): string => {
  switch (q.requirementType) {
    case "Package":
      return q.packageInfo?.goingFrom ?? q.goingFrom ?? "—";
    case "Flight":
      return q.flightInfo?.sourceCity ?? q.goingFrom ?? "—";
    case "Transfer":
      return q.transferInfo?.goingFrom ?? q.goingFrom ?? "—";
    default:
      return q.goingFrom ?? "—";
  }
};

/** Extracts destination from any query type */
const resolveDestination = (q: IQuery): string => {
  switch (q.requirementType) {
    case "Package":
      return q.packageInfo?.goingTo ?? q.goingTo ?? "—";
    case "Flight":
      return q.flightInfo?.destinationCity ?? q.goingTo ?? "—";
    case "Transfer":
      return q.transferInfo?.goingTo ?? q.goingTo ?? "—";
    case "Visa":
      return q.visaInfo?.country ?? "—";
    case "Hotel":
      return q.hotelInfo?.destination ?? q.goingTo ?? "—";
    case "Sightseeing":
      return q.sightseeingInfo?.destination ?? q.goingTo ?? "—";
    case "Miscellaneous":
      return q.miscellaneousInfo?.destination ?? "—";
    default:
      return q.goingTo ?? "—";
  }
};

/** Total PAX count from any query type */
const resolvePax = (q: IQuery): string => {
  switch (q.requirementType) {
    case "Package":
      return q.packageInfo?.travelers != null
        ? String(q.packageInfo.travelers)
        : "—";
    case "Flight": {
      const adults = q.flightInfo?.adults ?? 0;
      const children = q.flightInfo?.children ?? 0;
      const infants = q.flightInfo?.infants ?? 0;
      return String(adults + children + infants);
    }
    case "Transfer":
      return q.transferInfo?.travelers != null
        ? String(q.transferInfo.travelers)
        : "—";
    case "Visa": {
      const adults = q.visaInfo?.adults ?? 0;
      const child = q.visaInfo?.child ?? 0;
      const infant = q.visaInfo?.infant ?? 0;
      return String(adults + child + infant);
    }
    case "Hotel":
      return q.hotelInfo?.travelers != null
        ? String(q.hotelInfo.travelers)
        : "—";
    case "Sightseeing": {
      const adults = q.sightseeingInfo?.adults ?? 0;
      const children = q.sightseeingInfo?.children ?? 0;
      return String(adults + children);
    }
    default:
      return "—";
  }
};

/** Lead source from type-specific info */
const resolveLeadSource = (q: IQuery): string => {
  switch (q.requirementType) {
    case "Flight":
      return q.flightInfo?.leadSource ?? "—";
    case "Transfer":
      return q.transferInfo?.leadSource ?? "—";
    case "Visa":
      return q.visaInfo?.leadSource ?? "—";
    case "Hotel":
      return q.hotelInfo?.leadSource ?? "—";
    case "Sightseeing":
      return q.sightseeingInfo?.leadSource ?? "—";
    case "Miscellaneous":
      return q.miscellaneousInfo?.leadSource ?? "—";
    default:
      return "—";
  }
};

// ── component ─────────────────────────────────────────────────────────────────

const Queries = ({ leadId }: QueriesProps) => {
  const {
    data: queriesData,
    isLoading,
    isError,
    refetch,
  } = useGetQueriesByLeadQuery(leadId, { skip: !leadId });

  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateQueryStatusMutation();
  const [deleteQuery, { isLoading: isDeleting }] = useDeleteQueryMutation();

  const queries: IQuery[] = queriesData?.data ?? [];

  const handleStatusChange = async (id: string, status: QueryStatus) => {
    try {
      await updateStatus({ id, body: { status } }).unwrap();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this query?")) return;
    try {
      await deleteQuery(id).unwrap();
    } catch (err) {
      console.error("Failed to delete query:", err);
    }
  };

  return (
    <Card className="p-2">
      <div className="table-responsive">
        <table
          className="table table-sm table-bordered mb-0 align-middle"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead>
            {/* section label row */}
            <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
              <th colSpan={12}>
                Queries
                {!isLoading && queries.length > 0 && (
                  <Badge
                    bg="primary"
                    className="ms-2"
                    style={{ fontSize: "10px" }}
                  >
                    {queries.length}
                  </Badge>
                )}
              </th>
            </tr>

            {/* column headers */}
            <tr
              style={{ fontSize: "10px", whiteSpace: "nowrap" }}
              className="bg-light"
            >
              <th style={{ width: "100px" }}>Query Date</th>
              <th style={{ width: "200px" }}>Query ID</th>
              <th style={{ width: "100px" }}>Travel Date</th>
              <th style={{ width: "110px" }}>Type</th>
              <th style={{ width: "110px" }}>Source</th>
              <th style={{ width: "110px" }}>Destination</th>
              <th style={{ width: "60px" }}>PAX</th>
              <th style={{ width: "100px" }}>Last Update</th>
              <th style={{ width: "80px" }}>Proposals</th>
              <th style={{ width: "130px" }}>Stage</th>
              <th style={{ width: "110px" }}>Owner</th>
              <th style={{ width: "70px" }} className="text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody style={{ fontSize: "12px" }}>
            {/* loading */}
            {isLoading && (
              <tr>
                <td colSpan={12} className="text-center py-3">
                  <Spinner animation="border" size="sm" className="me-2" />
                  Loading queries…
                </td>
              </tr>
            )}

            {/* error */}
            {isError && (
              <tr>
                <td colSpan={12} className="text-center text-danger py-2">
                  Failed to load queries.{" "}
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0"
                    style={{ fontSize: "12px" }}
                    onClick={refetch}
                  >
                    Retry
                  </Button>
                </td>
              </tr>
            )}

            {/* empty */}
            {!isLoading && !isError && queries.length === 0 && (
              <tr>
                <td colSpan={12} className="text-center py-2">
                  No record found
                </td>
              </tr>
            )}

            {/* data rows */}
            {!isLoading &&
              !isError &&
              queries.map((q) => (
                <tr key={q._id}>
                  {/* Query Date */}
                  <td>{formatDate(q.createdAt)}</td>

                  {/* Query ID */}
                  <td
                    className="text-truncate"
                    style={{ maxWidth: "200px" }}
                    title={q._id}
                  >
                    <span className="text-muted" style={{ fontSize: "10px" }}>
                      {q._id}
                    </span>
                  </td>

                  {/* Travel Date */}
                  <td>{formatDate(q.travelDate)}</td>

                  {/* Type */}
                  <td>
                    <Badge bg="info" text="dark" style={{ fontSize: "10px" }}>
                      {q.requirementType}
                    </Badge>
                  </td>

                  {/* Source */}
                  <td className="text-truncate" style={{ maxWidth: "110px" }}>
                    {resolveSource(q)}
                  </td>

                  {/* Destination */}
                  <td className="text-truncate" style={{ maxWidth: "110px" }}>
                    {resolveDestination(q)}
                  </td>

                  {/* PAX */}
                  <td className="text-center">{resolvePax(q)}</td>

                  {/* Last Update */}
                  <td>{formatDate(q.updatedAt)}</td>

                  {/* Proposals — placeholder until proposals API exists */}
                  <td className="text-center">—</td>

                  {/* Stage / Status inline dropdown */}
                  <td>
                    <Form.Select
                      size="sm"
                      value={q.status}
                      style={{ fontSize: "10px" }}
                      disabled={isUpdatingStatus}
                      onChange={(e: any) =>
                        handleStatusChange(q._id, e.target.value as QueryStatus)
                      }
                    >
                      {(
                        [
                          "new",
                          "inProcess",
                          "confirmed",
                          "rejected",
                          "lost",
                        ] as QueryStatus[]
                      ).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Owner */}
                  <td className="text-truncate" style={{ maxWidth: "110px" }}>
                    {q.createdBy
                      ? `${q.createdBy.firstName} ${q.createdBy.lastName}`
                      : "—"}
                  </td>

                  {/* Actions */}
                  <td className="text-center">
                    <div className="d-flex gap-1 justify-content-center">
                      {/* Edit — wire to your edit modal when ready */}
                      <Button
                        variant="outline-primary"
                        size="sm"
                        style={{ padding: "2px 6px" }}
                        title="Edit"
                      >
                        <Icon icon="mdi:pencil-outline" width="14" />
                      </Button>

                      {/* Delete */}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{ padding: "2px 6px" }}
                        title="Delete"
                        disabled={isDeleting}
                        onClick={() => handleDelete(q._id)}
                      >
                        <Icon icon="mdi:trash-can-outline" width="14" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default Queries;
