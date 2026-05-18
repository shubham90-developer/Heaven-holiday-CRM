"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useCreateLeadMutation } from "../../../../../../Redux/leadApi";

const leadSources = [
  { value: "4513", label: "Agency" },
  { value: "4514", label: "Website" },
  { value: "4515", label: "Facebook" },
  { value: "4516", label: "Tripsgateway" },
  { value: "4517", label: "Website B2B" },
  { value: "4518", label: "Proposal" },
  { value: "4519", label: "GTX Network" },
  { value: "4520", label: "GTX Network Web" },
  { value: "6888", label: "Instagram" },
  { value: "8412", label: "Old Customer" },
  { value: "8413", label: "Reference" },
  { value: "8414", label: "Walk-in" },
  { value: "8569", label: "RAJ SIR" },
  { value: "8570", label: "My Old Client" },
  { value: "8571", label: "Raj Sir Facebook" },
  { value: "8572", label: "3700" },
  { value: "8573", label: "AHH" },
  { value: "9102", label: "Expo Belavagi" },
  { value: "9116", label: "Expo Kolhapur" },
  { value: "9117", label: "Expo Sangli" },
  { value: "9288", label: "PUNE EXPO" },
  { value: "9345", label: "PRANAV SIR" },
  { value: "9346", label: "PRAJWAL SIR" },
  { value: "9347", label: "SANKET SIR" },
  { value: "9348", label: "SAIPRASAD SIR" },
  { value: "9349", label: "JUST DIAL" },
  { value: "9813", label: "KASTURI GROUP" },
  { value: "9817", label: "Pune Expo Jan 2026" },
  { value: "9917", label: "Varsha Bugade" },
  { value: "9940", label: "PRANEETA BUGADE" },
  { value: "9954", label: "Sangli Agri Pandhari" },
];

interface Props {
  onSuccess?: () => void;
}

const B2CLeadModal: React.FC<Props> = ({ onSuccess }) => {
  const [show, setShow] = useState<boolean>(false);
  const [leadSource, setLeadSource] = useState<string>("");
  const [leadStage, setLeadStage] = useState<string>("");
  const [salutation, setSalutation] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [createLead, { isLoading }] = useCreateLeadMutation();

  const handleClose = () => {
    setShow(false);
    setError("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSalutation("");
    setLeadSource("");
    setLeadStage("");
  };

  const handleSubmit = async () => {
    if (!firstName || !phone) {
      setError("First Name and Mobile Number are required.");
      return;
    }
    try {
      await createLead({
        customerName: `${salutation} ${firstName} ${lastName}`.trim(),
        email: email || undefined,
        phone,
        type: "B2C",
        source: leadSource || "Direct",
        leadStage: (leadStage as any) || "new",
        status: "unassigned",
      }).unwrap();
      handleClose();
      onSuccess?.();
    } catch (err: any) {
      setError(err?.data?.message || "Failed to create lead.");
    }
  };

  return (
    <>
      {/* BUTTON */}
      <Button
        variant="outline-danger"
        size="sm"
        style={{ fontSize: "10px", fontWeight: "bold" }}
        onClick={() => setShow(true)}
      >
        <Icon icon="mdi:account-plus-outline" className="me-1" />
        B2C Customer
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
          {error && (
            <div
              className="alert alert-danger py-1"
              style={{ fontSize: "11px" }}
            >
              {error}
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
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                      style={{ fontSize: "10px", padding: "8px" }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
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
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
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
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
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
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </Col>

              {/* Lead Source */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Lead Source
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                    style={{ fontSize: "12px" }}
                  >
                    <option value="">Select Lead Source</option>
                    {leadSources.map((item) => (
                      <option key={item.value} value={item.label}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
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
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    value={leadStage}
                    onChange={(e) => setLeadStage(e.target.value)}
                  >
                    <option value="">Select Stage</option>
                    <option value="new">New</option>
                    <option value="followUp">Follow Up</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="rejected">Rejected</option>
                    <option value="lost">Lost</option>
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
            style={{ fontSize: "10px" }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            size="sm"
            style={{ fontSize: "10px" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <Icon icon="mdi:account-plus-outline" className="me-1" />
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default B2CLeadModal;
