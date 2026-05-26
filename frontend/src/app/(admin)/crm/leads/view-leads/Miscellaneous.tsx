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

const Miscellaneous = ({ leadId, onSuccess }: Props) => {
  const [showSelect, setShowSelect] = useState(false);

  // ── form state ──────────────────────────────────────────────────────────
  const [service, setService] = useState("");
  const [destination, setDestination] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [count, setCount] = useState("0");
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
      requirementType: "Miscellaneous",
      travelDate: selectDate || undefined,
      miscellaneousInfo: {
        service: service || null,
        destination: destination || null,
        selectDate: selectDate || null,
        count: count ? Number(count) : 0,
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
        {/* Service */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Service *
          </Form.Label>
          <Form.Select
            size="sm"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Select</option>
            <option>Others</option>
            <option>Hotels</option>
          </Form.Select>
        </Col>

        {/* Destination */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Destination *
          </Form.Label>
          <Form.Control
            size="sm"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Col>

        {/* Select Date */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Select Date *
          </Form.Label>
          <Form.Control
            type="date"
            size="sm"
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          />
        </Col>

        {/* Count */}
        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Count *
          </Form.Label>
          <Form.Control
            size="sm"
            type="number"
            min={0}
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
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
            <option>Facebook</option>
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
          {isLoading ? "Saving..." : "Save Query"}
        </Button>
      </div>
    </Form>
  );
};

export default Miscellaneous;
