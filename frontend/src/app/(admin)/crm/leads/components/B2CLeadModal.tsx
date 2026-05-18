"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useCreateLeadMutation } from "../../../../../../Redux/leadApi";

const leadSources = [
  "Agency",
  "Website",
  "Facebook",
  "Tripsgateway",
  "Website B2B",
  "Proposal",
  "GTX Network",
  "GTX Network Web",
  "Instagram",
  "Old Customer",
  "Reference",
  "Walk-in",
  "RAJ SIR",
  "My Old Client",
  "Raj Sir Facebook",
  "PUNE EXPO",
  "PRANAV SIR",
  "PRAJWAL SIR",
  "SANKET SIR",
  "SAIPRASAD SIR",
  "JUST DIAL",
  "KASTURI GROUP",
  "Pune Expo Jan 2026",
  "Expo Belavagi",
  "Expo Kolhapur",
  "Expo Sangli",
  "Sangli Agri Pandhari",
];

const B2CLeadModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [leadStage, setLeadStage] = useState("");
  const [error, setError] = useState("");

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
    setError("");
    if (!phone.trim()) return setError("Mobile number is required.");
    if (!firstName.trim()) return setError("First name is required.");
    const customerName = [salutation, firstName, lastName]
      .filter(Boolean)
      .join(" ");
    try {
      await createLead({
        customerName,
        phone: phone.trim(),
        email: email.trim() || undefined,
        type: "B2C",
        source: leadSource || "Website",
        leadStage: (leadStage as any) || "new",
        status: "inProcess",
      }).unwrap();
      handleClose();
    } catch {
      setError("Failed to create lead. Please try again.");
    }
  };

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        style={{ fontSize: "10px", fontWeight: "bold" }}
        onClick={() => setShow(true)}
      >
        <Icon icon="mdi:account-plus-outline" className="me-1" />
        B2C Customer
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title style={{ fontSize: "14px" }}>Add B2C Lead</Modal.Title>
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
        <Modal.Body>
          {error && (
            <div
              className="alert alert-danger py-1 px-2 mb-2"
              style={{ fontSize: "10px" }}
            >
              {error}
            </div>
          )}
          <Form>
            <Row className="g-1">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Mobile Number *
                  </Form.Label>
                  <InputGroup size="sm">
                    <InputGroup.Text>🇮🇳 +91</InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{ fontSize: "10px", padding: "8px" }}
                      maxLength={10}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
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
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    style={{ fontSize: "10px", padding: "8px" }}
                  >
                    <option value="">Select</option>
                    {["Mr.", "Ms.", "Mrs.", "Miss", "Dr."].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                </Form.Group>
              </Col>
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                </Form.Group>
              </Col>
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
                    style={{ fontSize: "10px" }}
                  >
                    <option value="">Select Lead Source</option>
                    {leadSources.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
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
                    value={leadStage}
                    onChange={(e) => setLeadStage(e.target.value)}
                    style={{ fontSize: "10px", padding: "8px" }}
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
            {isLoading ? (
              <Spinner size="sm" animation="border" />
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

export default B2CLeadModal;
