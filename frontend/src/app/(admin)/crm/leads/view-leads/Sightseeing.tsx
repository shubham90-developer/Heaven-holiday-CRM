"use client";

import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";
import { useCreateQueryMutation } from "../../../../../../Redux/queryApi";
// ── props ─────────────────────────────────────────────────────────────────────
interface Props {
  leadId: string;
  onSuccess?: () => void;
}

const Sightseeing = ({ leadId, onSuccess }: Props) => {
  const [showSelect, setShowSelect] = useState(false);

  // ── form state ──────────────────────────────────────────────────────────
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [nationality, setNationality] = useState("India");
  const [leadSource, setLeadSource] = useState("");
  const [addRemark, setAddRemark] = useState("");
  const [assignToSales, setAssignToSales] = useState("");
  const [assignToOps, setAssignToOps] = useState(false);

  // ── api hooks ───────────────────────────────────────────────────────────
  const [createQuery, { isLoading }] = useCreateQueryMutation();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const staffList = staffData?.data ?? [];

  // ── save ────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    const result = await createQuery({
      lead: leadId,
      requirementType: "Sightseeing",
      sightseeingInfo: {
        destination: destination || null,
        duration: duration ? Number(duration) : null,
        adults,
        children,
        nationality,
        leadSource: leadSource || null,
        addRemark: addRemark || null,
        assignToSales: assignToSales || null,
        assignToOps,
      },
    });
    if ("data" in result) onSuccess?.();
  };

  return (
    <Form>
      <Row className="mt-2 g-2">
        {/* Destination */}
        <Col md={6}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Destination *
          </Form.Label>
          <Form.Control
            size="sm"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Col>

        {/* Duration */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Duration
          </Form.Label>
          <Form.Control
            size="sm"
            placeholder="No. of Days"
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Col>

        {/* Adults */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Adults
          </Form.Label>
          <Form.Select
            size="sm"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Children */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Children (0-12)
          </Form.Label>
          <Form.Select
            size="sm"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Nationality */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Nationality
          </Form.Label>
          <Form.Select
            size="sm"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          >
            <option>India</option>
          </Form.Select>
        </Col>

        {/* Lead Source */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Lead Source *
          </Form.Label>
          <Form.Select
            size="sm"
            value={leadSource}
            onChange={(e) => setLeadSource(e.target.value)}
          >
            <option value="">Select</option>
            <option>Website</option>
            <option>Agency</option>
            <option>Referral</option>
          </Form.Select>
        </Col>

        {/* Add Remark */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Add Remark
          </Form.Label>
          <Form.Control
            size="sm"
            style={{ fontSize: "12px" }}
            value={addRemark}
            onChange={(e) => setAddRemark(e.target.value)}
          />
        </Col>

        {/* Assign To Sales */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Assign To Sales
          </Form.Label>
          <Form.Select
            size="sm"
            value={assignToSales}
            onChange={(e) => setAssignToSales(e.target.value)}
          >
            <option value="">Self</option>
            {staffList.map((s: any) => (
              <option key={s._id} value={s._id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Assign To Ops */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Assign To Ops
          </Form.Label>
          <div className="d-flex align-items-center gap-2">
            <Form.Check
              type="checkbox"
              checked={assignToOps}
              onChange={(e) => {
                setAssignToOps(e.target.checked);
                setShowSelect(e.target.checked);
              }}
            />
            {showSelect && (
              <Form.Select size="sm" style={{ fontSize: "12px" }}>
                <option value="">Select</option>
                {staffList.map((s: any) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName} {s.lastName}
                  </option>
                ))}
              </Form.Select>
            )}
          </div>
        </Col>
      </Row>

      <div className="text-end mt-3">
        <Button
          variant="danger"
          size="sm"
          disabled={isLoading}
          onClick={handleSave}
        >
          {isLoading ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </Form>
  );
};

export default Sightseeing;
