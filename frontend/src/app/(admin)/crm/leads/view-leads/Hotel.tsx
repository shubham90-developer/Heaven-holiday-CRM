"use client";

import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

import { useCreateQueryMutation } from "../../../../../../Redux/queryApi";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";
// ── props ─────────────────────────────────────────────────────────────────────
interface Props {
  leadId: string;
  onSuccess?: () => void;
}

const Hotel = ({ leadId, onSuccess }: Props) => {
  const [showSelect, setShowSelect] = useState(false);

  // ── form state ──────────────────────────────────────────────────────────
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [nights, setNights] = useState("1");
  const [nationality, setNationality] = useState("India");
  const [travelers, setTravelers] = useState("1");
  const [starRating, setStarRating] = useState("Any");
  const [foodPreference, setFoodPreference] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [addRemarks, setAddRemarks] = useState("");
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
      requirementType: "Hotel",
      travelDate: checkIn || undefined,
      hotelInfo: {
        destination: destination || null,
        checkIn: checkIn || null,
        checkOut: checkOut || null,
        nights: nights ? Number(nights) : 1,
        travelers: travelers ? Number(travelers) : 1,
        nationality,
        starRating,
        foodPreference: foodPreference || null,
        leadSource: leadSource || null,
        addRemarks: addRemarks || null,
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
            style={{ fontSize: "12px" }}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </Col>

        {/* Check In */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Check In *
          </Form.Label>
          <Form.Control
            type="date"
            size="sm"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </Col>

        {/* Check Out */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Check Out *
          </Form.Label>
          <Form.Control
            type="date"
            size="sm"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </Col>

        {/* Nights */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Nights *
          </Form.Label>
          <Form.Control
            size="sm"
            type="number"
            min={1}
            value={nights}
            onChange={(e) => setNights(e.target.value)}
          />
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

        {/* Travelers */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Travelers
          </Form.Label>
          <Form.Select
            size="sm"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>
        </Col>

        {/* Star Rating */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Star Rating
          </Form.Label>
          <Form.Select
            size="sm"
            value={starRating}
            onChange={(e) => setStarRating(e.target.value)}
          >
            <option>Any</option>
            <option>3 Star</option>
            <option>4 Star</option>
            <option>5 Star</option>
          </Form.Select>
        </Col>

        {/* Food Preference */}
        <Col md={3}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Food Preference
          </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Food Preference"
            value={foodPreference}
            onChange={(e) => setFoodPreference(e.target.value)}
          />
        </Col>

        {/* Lead Source */}
        <Col md={3}>
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

        {/* Add Remarks */}
        <Col md={6}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Add Remarks
          </Form.Label>
          <Form.Control
            size="sm"
            style={{ fontSize: "12px" }}
            value={addRemarks}
            onChange={(e) => setAddRemarks(e.target.value)}
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

      <div className="text-end mt-2">
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

export default Hotel;
