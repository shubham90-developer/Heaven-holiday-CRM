"use client";

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
  useCreateFollowUpMutation,
  useMarkCompleteMutation,
} from "../../../../../../Redux/followUpApi";

import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";

interface Props {
  leadId: string;
  customerName: string;
  customerType: "B2C" | "B2B";
  queryId?: string;
  onTemperatureChange?: (temp: string) => void;
}

const FollowupModal: React.FC<Props> = ({
  leadId,
  customerName,
  customerType,
  queryId,
  onTemperatureChange,
}) => {
  const [showAdd, setShowAdd] = useState(false);

  // Form state
  const [type, setType] = useState<"call" | "todo">("call");
  const [direction, setDirection] = useState<"outgoing" | "incoming">(
    "outgoing",
  );
  const [outcome, setOutcome] = useState<
    "answered" | "unanswered" | "notReachable"
  >("answered");
  const [action, setAction] = useState<
    "callBack" | "todo" | "meeting" | "createQuery" | "lost"
  >("callBack");
  const [dateType, setDateType] = useState<
    "today" | "tomorrow" | "2days" | "3days" | "custom"
  >("today");
  const [customDate, setCustomDate] = useState("");
  const [time, setTime] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [details, setDetails] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [error, setError] = useState("");

  // API
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const [createFollowUp, { isLoading }] = useCreateFollowUpMutation();

  const staffList = staffData?.data ?? [];

  const getFollowUpDate = (): string => {
    const d = new Date();
    if (dateType === "tomorrow") d.setDate(d.getDate() + 1);
    if (dateType === "2days") d.setDate(d.getDate() + 2);
    if (dateType === "3days") d.setDate(d.getDate() + 3);
    if (dateType === "custom") return customDate || d.toISOString();
    return d.toISOString();
  };

  const handleSubmit = async () => {
    if (!assignedTo) {
      setError("Please select assigned staff.");
      return;
    }

    try {
      await createFollowUp({
        leadId,
        queryId: queryId || undefined,
        activityType: type,
        direction: type === "call" ? direction : undefined,
        outcome: type === "call" ? outcome : undefined,
        nextAction: action,
        followUpDate: getFollowUpDate(),
        followUpTime: time || "10:00",
        remindBefore: 15,
        assignedTo,
        customerId: leadId,
        customerType,
        details,
        isCompleted,
      }).unwrap();

      // update temperature on parent if changed
      if (temperature && onTemperatureChange) {
        onTemperatureChange(temperature);
      }

      setShowAdd(false);
      setError("");
    } catch (err: any) {
      setError(err?.data?.message || "Failed to save follow up.");
    }
  };

  const getVariant = (value: string, selected: string) =>
    value === selected ? "primary" : "outline-secondary";

  return (
    <>
      <Button
        size="sm"
        onClick={() => setShowAdd(true)}
        style={{ fontSize: "8px" }}
      >
        Follow Up
      </Button>

      <Modal show={showAdd} onHide={() => setShowAdd(false)} size="md" centered>
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Modal.Title style={{ fontSize: "15px" }}>
            Add To Do / Follow Up
          </Modal.Title>
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
          {error && (
            <div
              className="alert alert-danger py-1 mb-2"
              style={{ fontSize: "11px" }}
            >
              {error}
            </div>
          )}

          {/* TYPE */}
          <div className="mb-2">
            {(["call", "todo"] as const).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={getVariant(t, type)}
                onClick={() => setType(t)}
                className="me-2"
                style={{ fontSize: "10px" }}
              >
                {t === "call" ? "Call" : "To Do"}
              </Button>
            ))}
          </div>

          {/* DIRECTION */}
          {type === "call" && (
            <div className="mb-2">
              {(["outgoing", "incoming"] as const).map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={getVariant(d, direction)}
                  onClick={() => setDirection(d)}
                  className="me-2"
                  style={{ fontSize: "10px" }}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </Button>
              ))}
            </div>
          )}

          {/* OUTCOME */}
          {type === "call" && (
            <>
              <h6 className="text-primary mt-2" style={{ fontSize: "11px" }}>
                Out Come
              </h6>
              <div className="mb-2">
                {(
                  [
                    { val: "answered", label: "Answered" },
                    { val: "unanswered", label: "Unanswered" },
                    { val: "notReachable", label: "Not Reachable" },
                  ] as const
                ).map(({ val, label }) => (
                  <Button
                    key={val}
                    size="sm"
                    variant={getVariant(val, outcome)}
                    onClick={() => setOutcome(val)}
                    className="me-2"
                    style={{ fontSize: "10px" }}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* NEXT ACTION */}
          <div className="mb-2">
            {(
              [
                { val: "callBack", label: "Call Back" },
                { val: "todo", label: "To Do" },
                { val: "meeting", label: "Meeting" },
                { val: "createQuery", label: "Create Query" },
                { val: "lost", label: "Lost" },
              ] as const
            ).map(({ val, label }) => (
              <Button
                key={val}
                size="sm"
                variant={getVariant(val, action)}
                onClick={() => setAction(val)}
                className="me-2 mb-1"
                style={{ fontSize: "10px" }}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* DATE */}
          <div className="mb-2">
            {(
              [
                { val: "today", label: "Today" },
                { val: "tomorrow", label: "Tomorrow" },
                { val: "2days", label: "In 2 Days" },
                { val: "3days", label: "In 3 Days" },
                { val: "custom", label: "Custom" },
              ] as const
            ).map(({ val, label }) => (
              <Button
                key={val}
                size="sm"
                variant={getVariant(val, dateType)}
                onClick={() => setDateType(val)}
                className="me-2 mb-1"
                style={{ fontSize: "10px" }}
              >
                {label}
              </Button>
            ))}
          </div>

          {dateType === "custom" && (
            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Custom Date
              </Form.Label>
              <Form.Control
                type="date"
                size="sm"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
              />
            </Form.Group>
          )}

          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Time
              </Form.Label>
              <Form.Control
                type="time"
                size="sm"
                style={{ fontSize: "10px" }}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Assigned To *
              </Form.Label>
              <Form.Select
                size="sm"
                style={{ fontSize: "10px" }}
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Select Staff</option>
                {staffList.map((s: any) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Customer
              </Form.Label>
              <Form.Control
                type="text"
                size="sm"
                style={{ fontSize: "10px" }}
                value={customerName}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Details
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                style={{ fontSize: "10px" }}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="Completed"
              style={{ fontSize: "10px" }}
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
            />

            {/* Temperature */}
            <div className="mt-3 d-flex gap-3">
              {[
                { val: "", label: "No Status" },
                { val: "hot", label: "Hot" },
                { val: "warm", label: "Warm" },
                { val: "cold", label: "Cold" },
              ].map(({ val, label }) => (
                <Form.Check
                  key={label}
                  type="radio"
                  name="temperature"
                  label={label}
                  value={val}
                  checked={temperature === val}
                  onChange={(e) => setTemperature(e.target.value)}
                  style={{ fontSize: "10px" }}
                />
              ))}
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
          <Button
            variant="primary"
            style={{ fontSize: "10px" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowupModal;
