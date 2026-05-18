"use client";

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
  useCreateFollowUpMutation,
  useGetFollowUpsByLeadQuery,
} from "../../../../../../Redux/followUpApi";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";

interface Props {
  leadId: string;
  queryId: string;
  customerName: string;
  customerType: "B2C" | "B2B";
}

const FollowupModal: React.FC<Props> = ({
  leadId,
  queryId,
  customerName,
  customerType,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [status, setStatus] = useState("");
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [createFollowUp] = useCreateFollowUpMutation();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const staffList = staffData?.data ?? [];

  const getVariant = (value: string, selected: string) =>
    value === selected ? "primary" : "outline-secondary";

  const resolveDate = (): string => {
    const d = new Date();
    if (dateType === "today") return d.toISOString().slice(0, 10);
    if (dateType === "tomorrow") {
      d.setDate(d.getDate() + 1);
      return d.toISOString().slice(0, 10);
    }
    if (dateType === "2days") {
      d.setDate(d.getDate() + 2);
      return d.toISOString().slice(0, 10);
    }
    if (dateType === "3days") {
      d.setDate(d.getDate() + 3);
      return d.toISOString().slice(0, 10);
    }
    return customDate;
  };

  const handleSubmit = async () => {
    setError("");
    if (!assignedTo) {
      setError("Please select a staff member to assign.");
      return;
    }
    const followUpDate = resolveDate();
    if (!followUpDate) {
      setError("Please set a follow-up date.");
      return;
    }

    setSaving(true);
    try {
      await createFollowUp({
        leadId,
        queryId,
        activityType: type,
        direction,
        outcome,
        nextAction: action,
        followUpDate,
        followUpTime: time || "09:00",
        remindBefore: 30,
        assignedTo,
        customerId: leadId,
        customerType,
        details,
        isCompleted,
      }).unwrap();

      // Reset form
      setShowAdd(false);
      setStatus("");
      setType("call");
      setDirection("outgoing");
      setOutcome("answered");
      setAction("callBack");
      setDateType("today");
      setCustomDate("");
      setTime("");
      setAssignedTo("");
      setDetails("");
      setIsCompleted(false);
    } catch (err: any) {
      setError(err?.data?.message ?? "Failed to save follow-up.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        onClick={() => setShowAdd(true)}
        style={{ fontSize: "8px" }}
      >
        Follow Up
      </Button>

      <Modal show={showAdd} onHide={() => setShowAdd(false)} size="sm" centered>
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
            Add Follow Up
            {customerName && (
              <span style={{ fontSize: "11px", opacity: 0.8, marginLeft: 8 }}>
                — {customerName}
              </span>
            )}
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
              className="alert alert-danger py-1"
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
                style={{ fontSize: "10px", textTransform: "capitalize" }}
              >
                {t === "call" ? "Call" : "To Do"}
              </Button>
            ))}
          </div>

          {/* DIRECTION (only for calls) */}
          {type === "call" && (
            <div className="mb-2">
              {(["outgoing", "incoming"] as const).map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={getVariant(d, direction)}
                  onClick={() => setDirection(d)}
                  className="me-2"
                  style={{ fontSize: "10px", textTransform: "capitalize" }}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </Button>
              ))}
            </div>
          )}

          {/* OUTCOME (only for calls) */}
          {type === "call" && (
            <>
              <h6 className="text-primary mt-2" style={{ fontSize: "11px" }}>
                Outcome
              </h6>
              <div className="mb-2">
                {(
                  [
                    ["answered", "Answered"],
                    ["unanswered", "Unanswered"],
                    ["notReachable", "Not Reachable"],
                  ] as const
                ).map(([val, label]) => (
                  <Button
                    key={val}
                    size="sm"
                    variant={getVariant(val, outcome)}
                    onClick={() => setOutcome(val)}
                    className="me-2 mb-1"
                    style={{ fontSize: "10px" }}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* NEXT ACTION */}
          <h6 className="text-primary mt-2" style={{ fontSize: "11px" }}>
            Next Action
          </h6>
          <div className="mb-2 d-flex flex-wrap gap-1">
            {(
              [
                ["callBack", "Call Back"],
                ["todo", "To Do"],
                ["meeting", "Meeting"],
                ["createQuery", "Create Query"],
                ["lost", "Lost"],
              ] as const
            ).map(([val, label]) => (
              <Button
                key={val}
                size="sm"
                variant={getVariant(val, action)}
                onClick={() => setAction(val)}
                style={{ fontSize: "10px" }}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* DATE */}
          <h6 className="text-primary mt-2" style={{ fontSize: "11px" }}>
            Follow-up Date
          </h6>
          <div className="mb-2 d-flex flex-wrap gap-1">
            {(
              [
                ["today", "Today"],
                ["tomorrow", "Tomorrow"],
                ["2days", "In 2 Days"],
                ["3days", "In 3 Days"],
                ["custom", "Custom"],
              ] as const
            ).map(([val, label]) => (
              <Button
                key={val}
                size="sm"
                variant={getVariant(val, dateType)}
                onClick={() => setDateType(val)}
                style={{ fontSize: "10px" }}
              >
                {label}
              </Button>
            ))}
          </div>

          {dateType === "custom" && (
            <Form.Group className="mb-2">
              <Form.Control
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                style={{ fontSize: "10px" }}
              />
            </Form.Group>
          )}

          {/* TIME */}
          <Form.Group className="mb-2">
            <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
              Time
            </Form.Label>
            <Form.Control
              type="time"
              style={{ fontSize: "10px" }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          {/* ASSIGNED TO */}
          <Form.Group className="mb-2">
            <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
              Assigned To <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              style={{ fontSize: "10px" }}
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">— Select Staff —</option>
              {staffList.map((s: any) => (
                <option key={s._id} value={s._id}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* DETAILS */}
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
              placeholder="Notes about this follow-up..."
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Mark as Completed"
            style={{ fontSize: "10px" }}
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />

          {/* TEMPERATURE */}
          <div className="mt-3 d-flex gap-3">
            {(
              [
                ["", "No Status"],
                ["hot", "Hot"],
                ["warm", "Warm"],
                ["cold", "Cold"],
              ] as const
            ).map(([val, label]) => (
              <Form.Check
                key={val}
                type="radio"
                name="leadStatus"
                label={label}
                value={val}
                checked={status === val}
                onChange={(e) => setStatus(e.target.value)}
                style={{ fontSize: "10px" }}
              />
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAdd(false)}
            style={{ fontSize: "10px" }}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{ fontSize: "10px" }}
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  style={{ width: "10px", height: "10px" }}
                />
                Saving…
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowupModal;
