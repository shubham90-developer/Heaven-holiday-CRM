"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  useCreateLeadMutation,
  ICreateLead,
} from "../../../../../Redux/leadApi";
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

// Lead stage values aligned with the backend enum
const leadStages = [
  { value: "new", label: "New" },
  { value: "followUp", label: "Call Back" },
  { value: "confirmed", label: "Confirmed" },
  { value: "rejected", label: "Not Interested / Junk / Wrong Number" },
  { value: "lost", label: "Lost Lead" },
];

const initialFormState = {
  salutation: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  source: "",
  leadStage: "" as ICreateLead["leadStage"] | "",
  type: "B2C" as ICreateLead["type"],
};

interface AddCustomerModalProps {
  onSuccess?: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [createLead, { isLoading }] = useCreateLeadMutation();

  const handleClose = () => {
    setShow(false);
    setForm(initialFormState);
    setErrors({});
  };

  const handleShow = () => setShow(true);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
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

    const customerName = [form.salutation, form.firstName, form.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();

    const payload: ICreateLead = {
      customerName,
      phone: form.phone.trim(),
      source: form.source,
      type: form.type,
      ...(form.email && { email: form.email.trim() }),
      ...(form.leadStage && { leadStage: form.leadStage }),
    };

    try {
      await createLead(payload).unwrap();
      console.log("Lead created, calling onSuccess");
      onSuccess?.();
      handleClose();
    } catch (err: any) {
      // Surface server-side errors
      const message =
        err?.data?.message || "Something went wrong. Please try again.";
      setErrors({ server: message });
    }
  };

  return (
    <>
      {/* BUTTON */}
      <Button
        variant="outline-danger"
        size="sm"
        style={{ fontSize: "10px", fontWeight: "bold" }}
        onClick={handleShow}
      >
        <Icon icon="mdi:account-plus" className="me-1" /> Add customer
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Add Lead</Modal.Title>
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
          {/* Server error */}
          {errors.server && (
            <div
              className="alert alert-danger py-1 mb-2"
              style={{ fontSize: "11px" }}
            >
              {errors.server}
            </div>
          )}

          <Form>
            <Row className="g-1">
              {/* Email */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Email ID
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    size="sm"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ fontSize: "10px" }}
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Mobile */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Mobile Number *
                  </Form.Label>
                  <InputGroup size="sm" style={{ fontSize: "10px" }}>
                    <InputGroup.Text>🇮🇳 +91</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      style={{ fontSize: "10px", padding: "8px" }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ fontSize: "10px" }}
                    >
                      {errors.phone}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* Salutation + First Name */}
              <Col md={4}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Salutation
                  </Form.Label>
                  <Form.Select
                    name="salutation"
                    size="sm"
                    value={form.salutation}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  >
                    <option value="">Select</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Miss</option>
                    <option>Dr.</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={8}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    First Name *
                  </Form.Label>
                  <Form.Control
                    name="firstName"
                    size="sm"
                    value={form.firstName}
                    onChange={handleChange}
                    isInvalid={!!errors.firstName}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ fontSize: "10px" }}
                  >
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Last Name */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Last Name
                  </Form.Label>
                  <Form.Control
                    name="lastName"
                    size="sm"
                    value={form.lastName}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                </Form.Group>
              </Col>

              {/* Type (B2C / B2B) */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Lead Type *
                  </Form.Label>
                  <Form.Select
                    name="type"
                    size="sm"
                    value={form.type}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  >
                    <option value="B2C">B2C</option>
                    <option value="B2B">B2B</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Lead Source */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Lead Source *
                  </Form.Label>
                  <Form.Select
                    name="source"
                    size="sm"
                    value={form.source}
                    onChange={handleChange}
                    isInvalid={!!errors.source}
                    style={{ fontSize: "12px" }}
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

              {/* Lead Stage */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Lead Stage
                  </Form.Label>
                  <Form.Select
                    name="leadStage"
                    size="sm"
                    value={form.leadStage}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  >
                    <option value="">Select Stage</option>
                    {leadStages.map((stage) => (
                      <option key={stage.value} value={stage.value}>
                        {stage.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        {/* FOOTER */}
        <Modal.Footer className="justify-content-between">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            style={{ fontSize: "10px" }}
          >
            Cancel
          </Button>

          <Button
            variant="success"
            size="sm"
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

export default AddCustomerModal;
