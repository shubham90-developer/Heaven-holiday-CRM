"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import {
  useCreateLeadMutation,
  ICreateLead,
} from "../../../../../Redux/leadApi";
import { useGetAllStaffQuery } from "../../../../../Redux/staffApi";

const leadSources = [
  { value: "Agency", label: "Agency" },
  { value: "Website", label: "Website" },
  { value: "Facebook", label: "Facebook" },
  { value: "Tripsgateway", label: "Tripsgateway" },
  { value: "Website B2B", label: "Website B2B" },
  { value: "Proposal", label: "Proposal" },
  { value: "GTX Network", label: "GTX Network" },
  { value: "GTX Network Web", label: "GTX Network Web" },
  { value: "Instagram", label: "Instagram" },
  { value: "Old Customer", label: "Old Customer" },
  { value: "Reference", label: "Reference" },
  { value: "Walk-in", label: "Walk-in" },
  { value: "RAJ SIR", label: "RAJ SIR" },
  { value: "My Old Client", label: "My Old Client" },
  { value: "Raj Sir Facebook", label: "Raj Sir Facebook" },
  { value: "AHH", label: "AHH" },
  { value: "Expo Belavagi", label: "Expo Belavagi" },
  { value: "Expo Kolhapur", label: "Expo Kolhapur" },
  { value: "Expo Sangli", label: "Expo Sangli" },
  { value: "PUNE EXPO", label: "PUNE EXPO" },
  { value: "PRANAV SIR", label: "PRANAV SIR" },
  { value: "PRAJWAL SIR", label: "PRAJWAL SIR" },
  { value: "SANKET SIR", label: "SANKET SIR" },
  { value: "SAIPRASAD SIR", label: "SAIPRASAD SIR" },
  { value: "JUST DIAL", label: "JUST DIAL" },
  { value: "KASTURI GROUP", label: "KASTURI GROUP" },
  { value: "Pune Expo Jan 2026", label: "Pune Expo Jan 2026" },
  { value: "Varsha Bugade", label: "Varsha Bugade" },
  { value: "PRANEETA BUGADE", label: "PRANEETA BUGADE" },
  { value: "Sangli Agri Pandhari", label: "Sangli Agri Pandhari" },
];

const initialFormState = {
  subType: "agency", // agency | corporate (UI only, not sent to backend)
  companyName: "",
  email: "",
  salutation: "",
  firstName: "",
  lastName: "",
  phone: "",
  owner: "",
  source: "",
  remark: "",
  // show more fields (not in backend schema, UI only)
  country: "",
  state: "",
  city: "",
  area: "",
  pincode: "",
  address: "",
};

interface B2BLeadModalProps {
  onSuccess?: () => void;
}

const B2BLeadModal: React.FC<B2BLeadModalProps> = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createLead, { isLoading }] = useCreateLeadMutation();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const staffList = staffData?.data ?? [];

  const handleClose = () => {
    setShow(false);
    setForm(initialFormState);
    setErrors({});
    setShowMore(false);
  };

  const handleShow = () => setShow(true);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.companyName.trim())
      newErrors.companyName = "Company name is required.";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      newErrors.phone = "Valid phone number is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address.";
    if (!form.source) newErrors.source = "Lead source is required.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const customerName =
      [form.salutation, form.firstName, form.lastName]
        .filter(Boolean)
        .join(" ")
        .trim() || form.companyName; // fallback to company name if no person name

    const payload: ICreateLead = {
      customerName,
      companyName: form.companyName.trim(),
      phone: form.phone.trim(),
      source: form.source,
      type: "B2B",
      ...(form.email && { email: form.email.trim() }),
      ...(form.owner && { owner: form.owner }),
      ...(form.remark && { remark: form.remark.trim() }),
    };

    try {
      await createLead(payload).unwrap();
      onSuccess?.();
      handleClose();
    } catch (err: any) {
      const message =
        err?.data?.message || "Something went wrong. Please try again.";
      setErrors({ server: message });
    }
  };

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        style={{ fontSize: "10px", fontWeight: "bold" }}
        onClick={handleShow}
      >
        <Icon icon="mdi:account-plus-outline" className="me-1" />
        Add B2B Customer
      </Button>

      <Modal show={show} onHide={handleClose} size="xl" centered>
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Add B2B-Agent</Modal.Title>
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

        {/* Body */}
        <Modal.Body>
          {errors.server && (
            <div
              className="alert alert-danger py-1 mb-2"
              style={{ fontSize: "11px" }}
            >
              {errors.server}
            </div>
          )}

          <Form>
            {/* Type + Company */}
            <Row className="mb-1 align-items-center">
              <Col md={6}>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Type :
                </Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="Agency"
                    checked={form.subType === "agency"}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, subType: "agency" }))
                    }
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  />
                  <Form.Check
                    type="radio"
                    label="Corporate"
                    checked={form.subType === "corporate"}
                    onChange={() =>
                      setForm((prev) => ({ ...prev, subType: "corporate" }))
                    }
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  />
                </div>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Company Name *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    isInvalid={!!errors.companyName}
                    style={{ fontSize: "10px" }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ fontSize: "10px" }}
                  >
                    {errors.companyName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Email + Salutation + First Name */}
            <Row className="mb-1">
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Email Id
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Email Id"
                    style={{ fontSize: "10px" }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ fontSize: "10px" }}
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Salutation
                  </Form.Label>
                  <Form.Select
                    name="salutation"
                    value={form.salutation}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  >
                    <option value="">Select</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Miss.</option>
                    <option>Dr.</option>
                    <option>Prof.</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Last Name + Mobile */}
            <Row className="mb-1">
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  />
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control
                    value="+91"
                    readOnly
                    style={{ fontSize: "10px" }}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Mobile Number *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    style={{ fontSize: "10px" }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ fontSize: "10px" }}
                  >
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* RM + Lead Source */}
            <Row className="mb-1">
              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    RM
                  </Form.Label>
                  <Form.Select
                    name="owner"
                    value={form.owner}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  >
                    <option value="">Select RM</option>
                    {staffList.map((s: any) => (
                      <option key={s._id} value={s._id}>
                        {s.firstName} {s.lastName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Lead Source *
                  </Form.Label>
                  <Form.Select
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    isInvalid={!!errors.source}
                    style={{ fontSize: "10px" }}
                  >
                    <option value="">Select Lead Source</option>
                    {leadSources.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ fontSize: "10px" }}
                  >
                    {errors.source}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Show More Toggle */}
            <div
              className="mb-2"
              style={{ color: "#ff6600", cursor: "pointer", fontSize: "10px" }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </div>

            {/* Extra Fields — UI only, not sent to backend */}
            {showMore && (
              <>
                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Country
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        style={{ fontSize: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        State
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        style={{ fontSize: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        City
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        style={{ fontSize: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Area
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="area"
                        value={form.area}
                        onChange={handleChange}
                        style={{ fontSize: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-1">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Pincode
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleChange}
                        style={{ fontSize: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Address
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        style={{ fontSize: "10px" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            {/* Remarks */}
            <Form.Group>
              <Form.Label style={{ fontSize: "10px" }} className="text-primary">
                Remarks
              </Form.Label>
              <Form.Control
                as="textarea"
                name="remark"
                rows={3}
                value={form.remark}
                onChange={handleChange}
                style={{ fontSize: "10px" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={handleClose}
            disabled={isLoading}
            style={{ fontSize: "10px" }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={isLoading}
            style={{ fontSize: "10px" }}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                />
                Submitting...
              </>
            ) : (
              <>
                <Icon icon="mdi:account-plus-outline" className="me-1" />
                Submit
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default B2BLeadModal;
