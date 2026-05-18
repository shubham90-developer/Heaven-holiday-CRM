"use client";

import React, { useState } from "react";
import { Button, Modal, Table, Spinner } from "react-bootstrap";
import { useGetFollowUpsByLeadQuery } from "../../../../../../Redux/followUpApi";

interface Props {
  queryId: string;
  leadId: string;
  customerName: string;
}

const TouchPointsModal: React.FC<Props> = ({
  queryId,
  leadId,
  customerName,
}) => {
  const [show, setShow] = useState(false);

  const { data, isLoading } = useGetFollowUpsByLeadQuery(leadId, {
    skip: !show || !leadId,
  });

  const followUps = data?.data ?? [];

  // ── Derive touchpoint counts from real follow-up records ────────────────
  const totalCalls = followUps.filter((f) => f.activityType === "call").length;
  const totalTodos = followUps.filter((f) => f.activityType === "todo").length;
  const totalMeetings = followUps.filter(
    (f) => f.nextAction === "meeting",
  ).length;
  const totalSMS = 0; // SMS tracking not yet in followUp model — placeholder

  // ── Current stage derived from latest followup nextAction ────────────────
  const latest = [...followUps].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];

  const currentStage = latest
    ? (latest.nextAction ?? latest.outcome ?? "—")
        .replace(/([A-Z])/g, " $1")
        .trim()
    : "—";

  // ── Lead quality: ratio of answered calls ────────────────────────────────
  const answeredCalls = followUps.filter(
    (f) => f.activityType === "call" && f.outcome === "answered",
  ).length;
  const leadQuality =
    totalCalls === 0
      ? "NA"
      : totalCalls >= 3 && answeredCalls / totalCalls >= 0.6
        ? "Good"
        : answeredCalls === 0
          ? "Cold"
          : "Medium";

  return (
    <>
      <Button
        size="sm"
        onClick={() => setShow(true)}
        style={{ fontSize: "8px" }}
        variant="danger"
      >
        Touch Points
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Modal.Title style={{ fontSize: "15px" }}>
            Touch Points{customerName && ` — ${customerName}`}
          </Modal.Title>
          <button
            onClick={() => setShow(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </Modal.Header>

        <Modal.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" className="text-primary" />
              <p className="mt-2" style={{ fontSize: "12px" }}>
                Loading touch points...
              </p>
            </div>
          ) : (
            <>
              {/* ── Summary row ── */}
              <Table bordered hover>
                <thead style={{ fontSize: "10px" }}>
                  <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Current Stage</th>
                    <th>Lead Quality</th>
                    <th>Total Calls</th>
                    <th>Total Todos</th>
                    <th>Total Meetings</th>
                    <th>Total SMS</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: "10px" }}>
                  <tr>
                    <td>1</td>
                    <td>{customerName || "—"}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {currentStage}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          leadQuality === "Good"
                            ? "bg-success"
                            : leadQuality === "Medium"
                              ? "bg-warning text-dark"
                              : leadQuality === "Cold"
                                ? "bg-primary"
                                : "bg-secondary"
                        }`}
                      >
                        {leadQuality}
                      </span>
                    </td>
                    <td>{totalCalls}</td>
                    <td>{totalTodos}</td>
                    <td>{totalMeetings}</td>
                    <td>{totalSMS}</td>
                  </tr>
                </tbody>
              </Table>

              {/* ── Detail: individual follow-ups ── */}
              {followUps.length > 0 && (
                <>
                  <h6
                    className="mt-3 mb-2 text-primary"
                    style={{ fontSize: "11px" }}
                  >
                    Follow-up History
                  </h6>
                  <Table bordered hover size="sm">
                    <thead style={{ fontSize: "10px" }}>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Direction</th>
                        <th>Outcome</th>
                        <th>Next Action</th>
                        <th>Assigned To</th>
                        <th>Details</th>
                        <th>Done</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "10px" }}>
                      {followUps.map((f) => (
                        <tr key={f._id}>
                          <td>
                            {new Date(f.followUpDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "2-digit",
                              },
                            )}
                            {f.followUpTime && (
                              <div className="text-muted">{f.followUpTime}</div>
                            )}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {f.activityType}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {f.direction ?? "—"}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {f.outcome?.replace(/([A-Z])/g, " $1").trim() ??
                              "—"}
                          </td>
                          <td style={{ textTransform: "capitalize" }}>
                            {f.nextAction?.replace(/([A-Z])/g, " $1").trim() ??
                              "—"}
                          </td>
                          <td>
                            {f.assignedTo
                              ? `${f.assignedTo.firstName} ${f.assignedTo.lastName}`
                              : "—"}
                          </td>
                          <td>{f.details ?? "—"}</td>
                          <td>
                            {f.isCompleted ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {followUps.length === 0 && (
                <p
                  className="text-center text-muted py-3"
                  style={{ fontSize: "12px" }}
                >
                  No follow-up records yet for this lead.
                </p>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TouchPointsModal;
