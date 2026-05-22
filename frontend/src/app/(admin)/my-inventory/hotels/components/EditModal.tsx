"use client";

import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useUpdateHotelMutation } from "../../../../../../Redux/hotelApi";
import {
  IHotel,
  IUpdateHotel,
  WeekendDay,
  ChildAgePolicy,
} from "../../../../../../Redux/hotelApi";

// ─── Props ────────────────────────────────────────────────────────────────────

interface EditModalProps {
  hotel: IHotel;
}

const WEEKEND_DAYS: WeekendDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CHILD_AGE_POLICIES: ChildAgePolicy[] = [
  "3 year",
  "5 year",
  "6 year",
  "8 year",
  "10 year",
  "12 year",
];

// ─── Component ────────────────────────────────────────────────────────────────

const EditModal: React.FC<EditModalProps> = ({ hotel }) => {
  const [show, setShow] = useState<boolean>(false);
  const [form, setForm] = useState<Omit<IUpdateHotel, "updatedBy">>({});
  const [roomTypeInput, setRoomTypeInput] = useState<string>("");

  const [updateHotel, { isLoading, isError, isSuccess }] =
    useUpdateHotelMutation();

  // ─── Seed form from hotel prop when modal opens ────────────────────────────

  useEffect(() => {
    if (show) {
      setForm({
        hotelName: hotel.hotelName,
        cityName: hotel.cityName,
        country: hotel.country,
        state: hotel.state ?? "",
        address: hotel.address ?? "",
        contactEmail: hotel.contactEmail ?? "",
        contactNumber: hotel.contactNumber ?? "",
        countryCode: hotel.countryCode,
        starRating: hotel.starRating,
        propertyType: hotel.propertyType,
        checkInTime: hotel.checkInTime,
        checkOutTime: hotel.checkOutTime,
        weekend: hotel.weekend,
        roomTypes: hotel.roomTypes.map(
          ({ roomTypeName, maxOccupancy, extraBedAllowed }) => ({
            roomTypeName,
            maxOccupancy,
            extraBedAllowed,
          }),
        ),
        childAgePolicy: hotel.childAgePolicy,
        supplier: hotel.supplier ?? "",
        currency: hotel.currency,
        dcw: hotel.dcw ?? "",
        amenities: hotel.amenities,
        images: hotel.images,
        description: hotel.description ?? "",
      });
      setRoomTypeInput("");
    }
  }, [show, hotel]);

  const handleClose = () => {
    setShow(false);
    setForm({});
    setRoomTypeInput("");
  };
  const handleShow = () => setShow(true);

  // ─── Generic field change ──────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ─── Weekend checkboxes ────────────────────────────────────────────────────

  const handleWeekendChange = (day: WeekendDay, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      weekend: checked
        ? [...(prev.weekend ?? []), day]
        : (prev.weekend ?? []).filter((d) => d !== day),
    }));
  };

  // ─── Room type — add on blur/enter ────────────────────────────────────────

  const commitRoomType = () => {
    const name = roomTypeInput.trim();
    if (!name) return;
    setForm((prev) => ({
      ...prev,
      roomTypes: [
        ...(prev.roomTypes ?? []),
        { roomTypeName: name, maxOccupancy: 2, extraBedAllowed: false },
      ],
    }));
    setRoomTypeInput("");
  };

  const handleRoomTypeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitRoomType();
    }
  };

  // ─── Submit ────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    try {
      // Replace with real logged-in user ObjectId from your auth state
      const updatedBy = "000000000000000000000001";

      await updateHotel({
        id: hotel._id,
        body: { ...form, updatedBy },
      }).unwrap();
      handleClose();
    } catch (err) {
      console.error("Failed to update hotel:", err);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* BUTTON */}
      <Button
        variant="info"
        size="sm"
        style={{ fontSize: "8px" }}
        title="Edit"
        onClick={handleShow}
      >
        <Icon icon="mdi:pencil" />
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Edit Hotel</Modal.Title>

          <button
            onClick={handleClose}
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

        {/* BODY */}
        <Modal.Body>
          {/* Error banner */}
          {isError && (
            <div
              className="alert alert-danger py-1 mb-2"
              style={{ fontSize: "10px" }}
            >
              Failed to update hotel. Please try again.
            </div>
          )}

          {isSuccess && (
            <div
              className="alert alert-success py-1 mb-2"
              style={{ fontSize: "10px" }}
            >
              Hotel updated successfully!
            </div>
          )}

          <Form>
            {/* Row 1 */}
            <Row className="mb-3" style={{ fontSize: "10px" }}>
              <Col>
                <Form.Label>Hotel Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="hotelName"
                  value={form.hotelName ?? ""}
                  onChange={handleChange}
                  placeholder="Enter hotel name"
                  style={{ fontSize: "10px" }}
                />
              </Col>

              <Col>
                <Form.Label>City Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="cityName"
                  value={form.cityName ?? ""}
                  onChange={handleChange}
                  placeholder="Enter city name"
                  style={{ fontSize: "10px" }}
                />
              </Col>

              <Col>
                <Form.Label>Contact Email</Form.Label>
                <Form.Control
                  type="email"
                  name="contactEmail"
                  value={form.contactEmail ?? ""}
                  onChange={handleChange}
                  placeholder="Enter email"
                  style={{ fontSize: "10px" }}
                />
              </Col>

              <Col md={2}>
                <Form.Label>Country Code</Form.Label>
                <Form.Select
                  name="countryCode"
                  value={form.countryCode ?? "+91"}
                  onChange={handleChange}
                  style={{ fontSize: "10px" }}
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </Form.Select>
              </Col>

              <Col>
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={form.contactNumber ?? ""}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  style={{ fontSize: "10px" }}
                />
              </Col>
            </Row>

            {/* Row 2 */}
            <Row className="mb-3" style={{ fontSize: "10px" }}>
              <Col>
                <Form.Label>Star Rating</Form.Label>
                <Form.Select
                  name="starRating"
                  value={form.starRating ?? "NA Star"}
                  onChange={handleChange}
                  style={{ fontSize: "10px" }}
                >
                  <option value="NA Star">Select Rating</option>
                  <option value="1 Star">1 Star</option>
                  <option value="2 Star">2 Star</option>
                  <option value="3 Star">3 Star</option>
                  <option value="4 Star">4 Star</option>
                  <option value="5 Star">5 Star</option>
                </Form.Select>
              </Col>

              <Col>
                <Form.Label>Property Type *</Form.Label>
                <Form.Select
                  name="propertyType"
                  value={form.propertyType ?? "Hotel"}
                  onChange={handleChange}
                  style={{ fontSize: "10px" }}
                >
                  <option value="Hotel">Hotel</option>
                  <option value="Resort">Resort</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Guesthouse">Guesthouse</option>
                  <option value="Homestay">Homestay</option>
                </Form.Select>
              </Col>

              <Col>
                <Form.Label>Check In Time</Form.Label>
                <Form.Control
                  type="time"
                  name="checkInTime"
                  value={form.checkInTime ?? "11:00"}
                  onChange={handleChange}
                  style={{ fontSize: "10px" }}
                />
              </Col>

              <Col>
                <Form.Label>Out Time</Form.Label>
                <Form.Control
                  type="time"
                  name="checkOutTime"
                  value={form.checkOutTime ?? "12:00"}
                  onChange={handleChange}
                  style={{ fontSize: "10px" }}
                />
              </Col>
            </Row>

            {/* Row 3 */}
            <Row className="mb-3" style={{ fontSize: "10px" }}>
              <Col md={4}>
                <Form.Label>Weekend</Form.Label>
                <div>
                  {WEEKEND_DAYS.map((day) => (
                    <Form.Check
                      key={day}
                      inline
                      label={day}
                      type="checkbox"
                      checked={(form.weekend ?? []).includes(day)}
                      onChange={(e) =>
                        handleWeekendChange(day, e.target.checked)
                      }
                      style={{ fontSize: "10px" }}
                    />
                  ))}
                </div>
              </Col>

              <Col md={5}>
                <Form.Label>
                  Room Type{" "}
                  <span style={{ color: "#888" }}>(press Enter to add)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={roomTypeInput}
                  onChange={(e) => setRoomTypeInput(e.target.value)}
                  onBlur={commitRoomType}
                  onKeyDown={handleRoomTypeKeyDown}
                  placeholder="Enter room type"
                  style={{ fontSize: "10px" }}
                />
                {/* Chips for added room types */}
                {(form.roomTypes ?? []).length > 0 && (
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {(form.roomTypes ?? []).map((rt, i) => (
                      <span
                        key={i}
                        className="badge bg-secondary"
                        style={{ fontSize: "9px", cursor: "pointer" }}
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            roomTypes: (prev.roomTypes ?? []).filter(
                              (_, idx) => idx !== i,
                            ),
                          }))
                        }
                      >
                        {rt.roomTypeName} ✕
                      </span>
                    ))}
                  </div>
                )}
              </Col>

              <Col md={3}>
                <Form.Label>Child Age</Form.Label>
                <Form.Select
                  name="childAgePolicy"
                  value={form.childAgePolicy ?? "3 year"}
                  onChange={handleChange}
                  style={{ fontSize: "10px" }}
                >
                  {CHILD_AGE_POLICIES.map((policy) => (
                    <option key={policy} value={policy}>
                      {policy}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-danger"
            style={{ fontSize: "10px" }}
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            style={{ fontSize: "10px" }}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving…" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
