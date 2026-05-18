"use client";

import React, { useState } from "react";
import { Button, Modal, Table, Form, Spinner } from "react-bootstrap";
import {
  useCreateFollowUpMutation,
  useGetFollowUpsByLeadQuery,
} from "../../../../../../Redux/followUpApi";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";

interface Props {
  leadId: string;
  queryId?: string;
  customerId: string;
  customerType: "B2C" | "B2B";
}

const FollowupModal: React.FC<Props> = ({
  leadId,
  queryId,
  customerId,
  customerType,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
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
  const [temperature, setTemperature] = useState<"" | "hot" | "warm" | "cold">(
    "",
  );

  const [createFollowUp, { isLoading: saving }] = useCreateFollowUpMutation();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const { data: historyData, isLoading: historyLoading } =
    useGetFollowUpsByLeadQuery(leadId, {
      skip: !showHistory || !leadId,
    });

  const staffList = staffData?.data ?? [];
  const history = historyData?.data ?? [];

  const gv = (v: string, s: string) =>
    v === s ? "primary" : "outline-secondary";

  const getFollowUpDate = () => {
    const d = new Date();
    if (dateType === "today") return d.toISOString().split("T")[0];
    if (dateType === "tomorrow") {
      d.setDate(d.getDate() + 1);
      return d.toISOString().split("T")[0];
    }
    if (dateType === "2days") {
      d.setDate(d.getDate() + 2);
      return d.toISOString().split("T")[0];
    }
    if (dateType === "3days") {
      d.setDate(d.getDate() + 3);
      return d.toISOString().split("T")[0];
    }
    return customDate;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

  const handleSubmit = async () => {
    if (!assignedTo) return alert("Please select Assigned To.");
    if (!time) return alert("Please enter a time.");
    const followUpDate = getFollowUpDate();
    if (!followUpDate) return alert("Please pick a date.");
    try {
      await createFollowUp({
        leadId,
        queryId: queryId || undefined,
        activityType: type,
        direction: type === "call" ? direction : undefined,
        outcome: type === "call" ? outcome : undefined,
        nextAction: action,
        followUpDate,
        followUpTime: time,
        remindBefore: 15,
        assignedTo,
        customerId,
        customerType,
        details,
        isCompleted,
      }).unwrap();
      setShowAdd(false);
      setDetails("");
      setTime("");
      setIsCompleted(false);
    } catch {
      alert("Failed to save follow-up.");
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

      {/* ADD MODAL */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} size="md" centered>
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Modal.Title style={{ fontSize: "14px" }}>
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
          {/* Type */}
          <div className="mb-2">
            <Button
              size="sm"
              variant={gv("call", type)}
              onClick={() => setType("call")}
              className="me-2"
              style={{ fontSize: "10px" }}
            >
              Call
            </Button>
            <Button
              size="sm"
              variant={gv("todo", type)}
              onClick={() => setType("todo")}
              style={{ fontSize: "10px" }}
            >
              To Do
            </Button>
          </div>

          {/* Direction */}
          {type === "call" && (
            <div className="mb-2">
              <Button
                size="sm"
                variant={gv("outgoing", direction)}
                onClick={() => setDirection("outgoing")}
                className="me-2"
                style={{ fontSize: "10px" }}
              >
                Outgoing
              </Button>
              <Button
                size="sm"
                variant={gv("incoming", direction)}
                onClick={() => setDirection("incoming")}
                style={{ fontSize: "10px" }}
              >
                Incoming
              </Button>
            </div>
          )}

          {/* Outcome */}
          {type === "call" && (
            <>
              <h6 className="text-primary mt-2" style={{ fontSize: "11px" }}>
                Out Come
              </h6>
              <div className="mb-2">
                {(
                  [
                    { value: "answered", label: "Answered" },
                    { value: "unanswered", label: "Unanswered" },
                    { value: "notReachable", label: "Not Reachable" },
                  ] as const
                ).map((o) => (
                  <Button
                    key={o.value}
                    size="sm"
                    variant={gv(o.value, outcome)}
                    onClick={() => setOutcome(o.value)}
                    className="me-2"
                    style={{ fontSize: "10px" }}
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* Action */}
          <div className="mb-2">
            {(
              [
                { value: "callBack", label: "Call Back" },
                { value: "todo", label: "To Do" },
                { value: "meeting", label: "Meeting" },
                { value: "createQuery", label: "Create Query" },
                { value: "lost", label: "Lost" },
              ] as const
            ).map((a) => (
              <Button
                key={a.value}
                size="sm"
                variant={gv(a.value, action)}
                onClick={() => setAction(a.value)}
                className="me-2 mb-1"
                style={{ fontSize: "10px" }}
              >
                {a.label}
              </Button>
            ))}
          </div>

          {/* Date quick select */}
          <div className="mb-2">
            {(
              [
                { value: "today", label: "Today" },
                { value: "tomorrow", label: "Tomorrow" },
                { value: "2days", label: "In 2 Days" },
                { value: "3days", label: "In 3 Days" },
                { value: "custom", label: "Custom" },
              ] as const
            ).map((d) => (
              <Button
                key={d.value}
                size="sm"
                variant={gv(d.value, dateType)}
                onClick={() => setDateType(d.value)}
                className="me-2 mb-1"
                style={{ fontSize: "10px" }}
              >
                {d.label}
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
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                style={{ fontSize: "10px" }}
              />
            </Form.Group>
          )}

          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Time *
              </Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={{ fontSize: "10px" }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Assigned To *
              </Form.Label>
              <Form.Select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                style={{ fontSize: "10px" }}
              >
                <option value="">Select Staff</option>
                {staffList.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Details
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                style={{ fontSize: "10px" }}
              />
            </Form.Group>
            <Form.Check
              type="checkbox"
              label="Completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              style={{ fontSize: "10px" }}
            />
            <div className="mt-3 d-flex gap-3">
              {(
                [
                  { value: "", label: "No Status" },
                  { value: "hot", label: "Hot" },
                  { value: "warm", label: "Warm" },
                  { value: "cold", label: "Cold" },
                ] as const
              ).map((t) => (
                <Form.Check
                  key={t.value}
                  type="radio"
                  name="leadStatus"
                  label={t.label}
                  value={t.value}
                  checked={temperature === t.value}
                  onChange={(e) =>
                    setTemperature(e.target.value as typeof temperature)
                  }
                  style={{ fontSize: "10px" }}
                />
              ))}
            </div>
          </Form>
          <div className="mt-3">
            <Button
              variant="outline-secondary"
              size="sm"
              style={{ fontSize: "10px" }}
              onClick={() => {
                setShowAdd(false);
                setShowHistory(true);
              }}
            >
              View History
            </Button>
          </div>
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
            disabled={saving}
          >
            {saving ? <Spinner size="sm" animation="border" /> : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* HISTORY MODAL */}
      <Modal
        show={showHistory}
        onHide={() => setShowHistory(false)}
        size="xl"
        centered
      >
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Modal.Title style={{ fontSize: "14px" }}>
            Follow Up History
          </Modal.Title>
          <button
            onClick={() => setShowHistory(false)}
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
          {historyLoading ? (
            <div className="text-center py-3">
              <Spinner size="sm" animation="border" />
            </div>
          ) : history.length === 0 ? (
            <p
              className="text-center text-muted py-3"
              style={{ fontSize: "12px" }}
            >
              No follow-up history found.
            </p>
          ) : (
            <Table bordered hover style={{ fontSize: "10px" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Direction</th>
                  <th>Outcome</th>
                  <th>Next Action</th>
                  <th>Assigned To</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((f, idx) => (
                  <tr key={f._id}>
                    <td>{idx + 1}</td>
                    <td>
                      {formatDate(f.followUpDate)} {f.followUpTime}
                    </td>
                    <td className="text-capitalize">{f.activityType}</td>
                    <td className="text-capitalize">{f.direction ?? "-"}</td>
                    <td className="text-capitalize">{f.outcome ?? "-"}</td>
                    <td className="text-capitalize">{f.nextAction ?? "-"}</td>
                    <td>
                      {f.assignedTo
                        ? `${f.assignedTo.firstName} ${f.assignedTo.lastName}`
                        : "-"}
                    </td>
                    <td>{f.details ?? "-"}</td>
                    <td>
                      <span
                        className={`badge ${f.isCompleted ? "bg-success" : "bg-warning text-dark"}`}
                      >
                        {f.isCompleted ? "Done" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            size="sm"
            style={{ fontSize: "10px" }}
            onClick={() => {
              setShowHistory(false);
              setShowAdd(true);
            }}
          >
            + Add New
          </Button>
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px" }}
            onClick={() => setShowHistory(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FollowupModal;
