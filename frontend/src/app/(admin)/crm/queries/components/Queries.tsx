"use client";

import React, { useState } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import SendMessageModal from "./SendMessageModal";
import FollowupModal from "./FollowupModal";
import B2CLeadModal from "./B2CLeadModal";
import B2BLeadModal from "./B2BLeadModal";
import TouchPointsModal from "./TouchPointsModal";
import ProposalModal from "./ProposalModal";

const Queries = () => {
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left Section */}

            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
              >
                <option>Assign Sales Users</option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
              </select>

              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Assign
              </Button>
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
              >
                <option>Assign OPS Users</option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
              </select>

              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Assign
              </Button>
            </div>

            {/* right side */}
            <div className="d-flex align-items-center gap-2">
              <B2CLeadModal />
              <B2BLeadModal />

              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
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
          <Row className="align-items-center">
            {/* Left Section */}
            <Col lg={8}>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  Archieve
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  Hot
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  Warm
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  Cold
                </Button>
                <Button
                  variant="dark"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  No Status
                </Button>
              </div>
            </Col>

            {/* Right Section */}
            <Col lg={4}>
              <h6 className="fw-bold">
                Total Record Found :- <span className="text-primary">999</span>
              </h6>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                style={{ fontSize: "10px" }}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom border-top pb-2 pt-2 mt-2">
            {/* Left Section */}

            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                In Process
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Recent
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Confirmed
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Rejected
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Un Assigned
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Call Back
              </Button>
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Overall
              </Button>
            </div>

            {/* right side */}
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
              >
                <option>Select Email Template</option>
                <option value="1">Call Back</option>
                <option value="2">
                  Feedback on Your Recent Travel Experienece
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
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "40px" }}>
                  <Form.Check type="checkbox" />
                </th>

                <th style={{ width: "130px" }}>Query Date</th>

                <th style={{ width: "260px" }}>Customer Details</th>

                <th style={{ width: "140px" }}>Pax/ Type</th>

                <th style={{ width: "110px" }}>Description</th>

                <th style={{ width: "90px" }}>Travel Date</th>

                <th style={{ width: "100px" }}>Destinations</th>

                <th style={{ width: "150px" }}> Proposal</th>

                <th style={{ width: "120px" }}>Lead Stage</th>

                <th style={{ width: "120px" }}>Last Updated</th>

                <th style={{ width: "140px" }}>Owner</th>

                <th style={{ width: "70px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>
                  <Form.Check />
                </td>

                <td>
                  <div>17-Mar-26</div>
                  <div>10H 48M</div>
                  <div>Q/26/2047192</div>
                </td>

                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:building" className="me-1" />
                    JAC AND TC
                  </div>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    Mr. PRAMOD JAGDALE(1)
                  </div>

                  <div>
                    <Icon icon="mdi:phone" className="me-1" />
                    +91 9420543647
                  </div>
                  <div>
                    <Icon icon="mdi:email-outline" className="me-1" />
                    jacandtc@gmail.com
                  </div>
                </td>

                <td>
                  <div>10 Adult(s)</div>
                  <div>
                    <span className="badge bg-success">B2C</span>
                  </div>
                </td>
                <td>
                  <div>Package</div>
                  <div>Old Customer</div>
                </td>

                <td>12-May-26</td>

                <td>Mumbai-Thailand, Pattaya, Bangkok</td>

                <td>
                  <ProposalModal />
                </td>

                <td>
                  <div className="mb-1">
                    <select
                      className="form-select form-select-sm w-auto"
                      style={{ fontSize: "10px" }}
                    >
                      <option value="">Select Status</option>

                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="query_created">Query Created</option>
                      <option value="interested">Interested</option>
                      <option value="call_back">Call Back</option>

                      <option value="follow_up">Follow Up</option>
                      <option value="follow_up_changes">
                        Follow Up - Changes
                      </option>
                      <option value="requirement">Requirement</option>
                      <option value="destination_finalized">
                        Follow Up - Destination Finalized
                      </option>
                      <option value="negotiation">
                        Follow Up - Negotiation
                      </option>
                      <option value="visa_process">
                        Follow Up - Visa In Process
                      </option>

                      <option value="proposal_requested">
                        Proposal Requested
                      </option>
                      <option value="booking_requested">
                        Confirmed Booking Requested
                      </option>
                      <option value="verbal_confirmed">Verbal Confirmed</option>
                      <option value="confirmed">Confirmed</option>

                      <option value="lost_wrong_number">
                        Lost - Wrong Number
                      </option>
                      <option value="lost_not_interested">
                        Lost - Not Interested
                      </option>
                      <option value="lost_plan_changed">
                        Lost - Plan Changed
                      </option>
                      <option value="lost_budget_issue">
                        Lost - Budget Issue
                      </option>
                      <option value="lost_language_issue">
                        Lost - Language Issue
                      </option>
                      <option value="lost_booked_elsewhere">
                        Lost - Booked Elsewhere
                      </option>
                      <option value="lost_plan_postponed">
                        Lost - Plan Postponed
                      </option>
                      <option value="lost_duplicate_lead">
                        Lost - Duplicate Lead
                      </option>
                      <option value="lost_destination_changed">
                        Lost - Destination Changed
                      </option>
                      <option value="lost_different_trip">
                        Lost - Different Trip Booked
                      </option>

                      <option value="query_expired">Query Expired</option>
                    </select>
                  </div>
                  <div className="d-flex gap-1">
                    <FollowupModal />
                    <TouchPointsModal />
                  </div>
                </td>

                <td>17-Mar-26</td>

                <td>RAJENDRA BUGADE</td>

                <td>
                  <div className="d-flex flex-column gap-1">
                    <span className="action-btn view">
                      <Button
                        variant="success"
                        size="sm"
                        style={{ fontSize: "10px" }}
                        title="View"
                      >
                        <Icon icon="mdi:eye-outline" />
                      </Button>
                    </span>

                    <span className="action-btn chat">
                      <SendMessageModal />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "600" }}
          >
            Load More <Icon icon="mdi:reload" className="ms-1" />
          </Button>
        </div>
      </Card>

      {/* message modal */}
    </>
  );
};

export default Queries;
