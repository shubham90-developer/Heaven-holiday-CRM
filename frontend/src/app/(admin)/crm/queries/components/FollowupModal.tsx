"use client";

import React, { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";

const FollowupModal: React.FC = () => {
  const [status, setStatus] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  // TAB STATES
  const [type, setType] = useState<"call" | "todo">("call");
  const [direction, setDirection] = useState<"outgoing" | "incoming">(
    "outgoing",
  );
  const [outcome, setOutcome] = useState<
    "answered" | "unanswered" | "not_reachable"
  >("answered");
  const [action, setAction] = useState<
    "callback" | "todo" | "meeting" | "query" | "lost"
  >("callback");
  const [dateType, setDateType] = useState<
    "today" | "tomorrow" | "2days" | "3days" | "custom"
  >("today");

  // helper
  const getVariant = (value: string, selected: string) =>
    value === selected ? "primary" : "outline-secondary";

  return (
    <>
      {/* BUTTON */}
      <Button
        size="sm"
        onClick={() => setShowAdd(true)}
        style={{ fontSize: "8px" }}
      >
        Follow Up
      </Button>

      {/* ================= ADD MODAL ================= */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} size="md" centered>
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Modal.Title>Add To Do / Follow Up</Modal.Title>

          <button
            onClick={() => setShowAdd(false)}
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
          {/* TYPE */}
          <div className="mb-2">
            <Button
              size="sm"
              variant={getVariant("call", type)}
              onClick={() => setType("call")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Call
            </Button>
            <Button
              size="sm"
              variant={getVariant("todo", type)}
              onClick={() => setType("todo")}
              style={{ fontSize: "10px" }}
            >
              To Do
            </Button>
          </div>

          {/* DIRECTION */}
          <div className="mb-2">
            <Button
              size="sm"
              variant={getVariant("outgoing", direction)}
              onClick={() => setDirection("outgoing")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Outgoing
            </Button>
            <Button
              size="sm"
              variant={getVariant("incoming", direction)}
              onClick={() => setDirection("incoming")}
              style={{ fontSize: "10px" }}
            >
              Incoming
            </Button>
          </div>

          {/* OUTCOME */}
          <h6 className="text-primary mt-2">Out Come</h6>
          <div className="mb-2">
            <Button
              size="sm"
              variant={getVariant("answered", outcome)}
              onClick={() => setOutcome("answered")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Answered
            </Button>
            <Button
              size="sm"
              variant={getVariant("unanswered", outcome)}
              onClick={() => setOutcome("unanswered")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Unanswered
            </Button>
            <Button
              size="sm"
              variant={getVariant("not_reachable", outcome)}
              onClick={() => setOutcome("not_reachable")}
              style={{ fontSize: "10px" }}
            >
              Not Reachable
            </Button>
          </div>

          {/* ACTION */}
          <div className="mb-2">
            <Button
              size="sm"
              variant={getVariant("callback", action)}
              onClick={() => setAction("callback")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Call Back
            </Button>
            <Button
              size="sm"
              variant={getVariant("todo", action)}
              onClick={() => setAction("todo")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              To Do
            </Button>
            <Button
              size="sm"
              variant={getVariant("meeting", action)}
              onClick={() => setAction("meeting")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Meeting
            </Button>
            <Button
              size="sm"
              variant={getVariant("query", action)}
              onClick={() => setAction("query")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Create Query
            </Button>
            <Button
              size="sm"
              variant={getVariant("lost", action)}
              onClick={() => setAction("lost")}
              style={{ fontSize: "10px" }}
            >
              Lost
            </Button>
          </div>

          {/* DATE */}
          <div className="mb-2">
            <Button
              size="sm"
              variant={getVariant("today", dateType)}
              onClick={() => setDateType("today")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Today
            </Button>
            <Button
              size="sm"
              variant={getVariant("tomorrow", dateType)}
              onClick={() => setDateType("tomorrow")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Tomorrow
            </Button>
            <Button
              size="sm"
              variant={getVariant("2days", dateType)}
              onClick={() => setDateType("2days")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              In 2 Days
            </Button>
            <Button
              size="sm"
              variant={getVariant("3days", dateType)}
              onClick={() => setDateType("3days")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              In 3 Days
            </Button>
            <Button
              size="sm"
              variant={getVariant("custom", dateType)}
              onClick={() => setDateType("custom")}
              style={{ fontSize: "10px" }}
            >
              Custom
            </Button>
          </div>

          {/* CUSTOM DATE */}
          {dateType === "custom" && (
            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Custom Date
              </Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          )}

          {/* FORM */}
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Time
              </Form.Label>
              <Form.Control type="time" style={{ fontSize: "10px" }} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Assigned To
              </Form.Label>
              <Form.Control type="text" style={{ fontSize: "10px" }} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Customer
              </Form.Label>
              <Form.Control type="text" style={{ fontSize: "10px" }} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Select
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                style={{ fontSize: "10px" }}
              >
                <option>select Lead</option>
                <option value="1">B2B</option>
                <option value="2">B2C</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Details
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ fontSize: "10px" }}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Completed"
              style={{ fontSize: "10px" }}
            />

            <div className="mt-3 d-flex gap-3">
              <Form.Check
                type="radio"
                name="leadStatus"
                label="No Status"
                value=""
                checked={status === ""}
                onChange={(e) => setStatus(e.target.value)}
                style={{ fontSize: "10px" }}
              />

              <Form.Check
                type="radio"
                name="leadStatus"
                label="Hot"
                value="hot"
                checked={status === "hot"}
                onChange={(e) => setStatus(e.target.value)}
                style={{ fontSize: "10px" }}
              />

              <Form.Check
                type="radio"
                name="leadStatus"
                label="Warm"
                value="warm"
                checked={status === "warm"}
                onChange={(e) => setStatus(e.target.value)}
                style={{ fontSize: "10px" }}
              />

              <Form.Check
                type="radio"
                name="leadStatus"
                label="Cold"
                value="cold"
                checked={status === "cold"}
                onChange={(e) => setStatus(e.target.value)}
                style={{ fontSize: "10px" }}
              />
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAdd(false)}
            style={{ fontSize: "10px" }}
          >
            Cancel
          </Button>
          <Button variant="primary" style={{ fontSize: "10px" }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowupModal;
