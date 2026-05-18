"use client";

import React, { useState } from "react";
import { Button, Modal, Table, Form, Spinner } from "react-bootstrap";
import { useGetProposalsByQueryQuery } from "../../../../../../Redux/proposalApi";

interface Props {
  queryId: string;
}

const PriceModal: React.FC<Props> = ({ queryId }) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<"confirmation" | "availability" | "booking">(
    "confirmation",
  );

  const { data: proposalData, isLoading } = useGetProposalsByQueryQuery(
    queryId,
    { skip: !show },
  );

  const proposals = proposalData?.data ?? [];

  // Use the latest non-rejected proposal as the price reference
  const activeProposal =
    proposals.find((p) => p.status === "accepted") ??
    proposals.find((p) => p.status === "sent") ??
    proposals.find((p) => p.status === "draft") ??
    null;

  const fmt = (n?: number) =>
    n !== undefined ? `INR ${n.toLocaleString("en-IN")}` : "—";

  return (
    <>
      <Button
        size="sm"
        onClick={() => setShow(true)}
        style={{ fontSize: "10px" }}
        variant="link"
      >
        View
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="xl" centered>
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Modal.Title>Price Details</Modal.Title>
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

        <Modal.Body style={{ fontSize: "11px" }}>
          {/* Mode selector */}
          <div className="d-flex gap-4 mb-3">
            {(
              [
                ["confirmation", "Confirmation To Supplier"],
                ["availability", "Availability Check"],
                ["booking", "Booking Confirmation"],
              ] as const
            ).map(([val, label]) => (
              <Form.Check
                key={val}
                type="radio"
                name="priceMode"
                label={label}
                checked={mode === val}
                onChange={() => setMode(val)}
              />
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-4">
              <Spinner animation="border" size="sm" className="text-primary" />
              <p className="mt-2" style={{ fontSize: "12px" }}>
                Loading price details...
              </p>
            </div>
          ) : !activeProposal ? (
            <p className="text-center text-muted py-4">
              No proposal found for this query. Create a proposal first to see
              price details.
            </p>
          ) : (
            <>
              {/* ── Proposal summary ── */}
              <div className="mb-3 p-2 border rounded bg-light">
                <span className="me-4">
                  <strong>Proposal:</strong>{" "}
                  {activeProposal._id.slice(-8).toUpperCase()}
                </span>
                <span className="me-4">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      activeProposal.status === "accepted"
                        ? "bg-success"
                        : activeProposal.status === "sent"
                          ? "bg-primary"
                          : "bg-secondary"
                    }`}
                  >
                    {activeProposal.status}
                  </span>
                </span>
                <span>
                  <strong>Customer:</strong>{" "}
                  {activeProposal.leadId?.customerName ?? "—"}
                </span>
              </div>

              {/* ── Overall services table ── */}
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Services</th>
                    <th>Select</th>
                    <th>Supplier</th>
                    <th>My Cost</th>
                    <th>Mark Up</th>
                    <th>Taxes</th>
                    <th>Sales Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Package (Hotel + Transfer + Sightseeing)</td>
                    <td>
                      <Form.Check type="checkbox" defaultChecked />
                    </td>
                    <td>A HEAVEN HOLIDAY</td>
                    <td>{fmt(activeProposal.basePrice)}</td>
                    <td>{fmt(activeProposal.markup)}</td>
                    <td>—</td>
                    <td>{fmt(activeProposal.totalPrice)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Package Cost</strong>
                    </td>
                    <td colSpan={5}></td>
                    <td>
                      <strong>{fmt(activeProposal.totalPrice)}</strong>
                    </td>
                  </tr>
                </tbody>
              </Table>

              {/* ── Hotels ── */}
              {(activeProposal.packageDetails?.hotels?.length ?? 0) > 0 && (
                <>
                  <h6 className="mt-3">Hotel(s)</h6>
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Hotel</th>
                        <th>Select</th>
                        <th>Supplier</th>
                        <th>My Cost</th>
                        <th>Mark Up</th>
                        <th>Taxes</th>
                        <th>Sales Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeProposal.packageDetails!.hotels!.map(
                        (hotel, i) => (
                          <tr key={i}>
                            <td>{hotel}</td>
                            <td>
                              <Form.Check type="checkbox" />
                            </td>
                            <td>A HEAVEN HOLIDAY</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </Table>
                </>
              )}

              {/* ── Sightseeing ── */}
              {(activeProposal.packageDetails?.sightseeing?.length ?? 0) >
                0 && (
                <>
                  <h6 className="mt-3">Sightseeing(s)</h6>
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Sightseeing</th>
                        <th>Select</th>
                        <th>Supplier</th>
                        <th>My Cost</th>
                        <th>Mark Up</th>
                        <th>Taxes</th>
                        <th>Sales Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeProposal.packageDetails!.sightseeing!.map(
                        (item, i) => (
                          <tr key={i}>
                            <td>{item}</td>
                            <td>
                              <Form.Check type="checkbox" />
                            </td>
                            <td>A HEAVEN HOLIDAY</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </Table>
                </>
              )}

              {/* ── Transfers ── */}
              {(activeProposal.packageDetails?.transfers?.length ?? 0) > 0 && (
                <>
                  <h6 className="mt-3">Transfer(s)</h6>
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Transfer</th>
                        <th>Select</th>
                        <th>Supplier</th>
                        <th>My Cost</th>
                        <th>Mark Up</th>
                        <th>Taxes</th>
                        <th>Sales Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeProposal.packageDetails!.transfers!.map(
                        (item, i) => (
                          <tr key={i}>
                            <td>{item}</td>
                            <td>
                              <Form.Check type="checkbox" />
                            </td>
                            <td>A HEAVEN HOLIDAY</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </Table>
                </>
              )}

              {/* ── Flights ── */}
              {(activeProposal.packageDetails?.flights?.length ?? 0) > 0 && (
                <>
                  <h6 className="mt-3">Flight(s)</h6>
                  <Table bordered size="sm">
                    <thead>
                      <tr>
                        <th>Flight</th>
                        <th>Select</th>
                        <th>Supplier</th>
                        <th>My Cost</th>
                        <th>Mark Up</th>
                        <th>Taxes</th>
                        <th>Sales Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeProposal.packageDetails!.flights!.map(
                        (item, i) => (
                          <tr key={i}>
                            <td>{item}</td>
                            <td>
                              <Form.Check type="checkbox" />
                            </td>
                            <td>A HEAVEN HOLIDAY</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                            <td>—</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </Table>
                </>
              )}

              {/* ── Notes ── */}
              {activeProposal.packageDetails?.notes && (
                <div className="mt-3 p-2 border rounded">
                  <strong>Notes:</strong> {activeProposal.packageDetails.notes}
                </div>
              )}

              {/* All proposals list (mini) */}
              {proposals.length > 1 && (
                <div className="mt-4">
                  <h6 style={{ fontSize: "11px" }}>
                    All Proposals ({proposals.length})
                  </h6>
                  <Table bordered size="sm">
                    <thead style={{ fontSize: "10px" }}>
                      <tr>
                        <th>ID</th>
                        <th>Base Price</th>
                        <th>Markup</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "10px" }}>
                      {proposals.map((p) => (
                        <tr
                          key={p._id}
                          className={
                            p._id === activeProposal._id ? "table-active" : ""
                          }
                        >
                          <td>{p._id.slice(-8).toUpperCase()}</td>
                          <td>{fmt(p.basePrice)}</td>
                          <td>{fmt(p.markup)}</td>
                          <td>{fmt(p.totalPrice)}</td>
                          <td>
                            <span
                              className={`badge ${
                                p.status === "accepted"
                                  ? "bg-success"
                                  : p.status === "sent"
                                    ? "bg-primary"
                                    : p.status === "rejected"
                                      ? "bg-danger"
                                      : "bg-secondary"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td>
                            {new Date(p.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PriceModal;
