"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useCreateLeadMutation } from "../../../../../../Redux/leadApi";
import { useGetAllLeadSourcesQuery } from "../../../../../../Redux/leadSourcesApi";

interface Props {
  onSuccess?: () => void;
}

const B2CLeadModal: React.FC<Props> = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
  const [leadSource, setLeadSource] = useState("");
  const [leadStage, setLeadStage] = useState("");
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const [createLead, { isLoading }] = useCreateLeadMutation();
  const { data: leadSourcesData } = useGetAllLeadSourcesQuery({});
  const leadSources = leadSourcesData?.data ?? [];

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
    if (!firstName || !phone || !leadSource) {
      setError("First Name, Mobile Number and Lead Source are required.");
      return;
    }
    try {
      await createLead({
        type: "B2C",
        salutation: salutation || undefined,
        firstName,
        lastName: lastName || undefined,
        email: email || undefined,
        phone,
        leadSource, // ← ObjectId
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

        {/* Body */}
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
                  <InputGroup size="sm">
                    <InputGroup.Text style={{ fontSize: "10px" }}>
                      🇮🇳 +91
                    </InputGroup.Text>
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
                    <option>Mr</option>
                    <option>Ms</option>
                    <option>Mrs</option>
                    <option>Dr</option>
                    <option>Prof</option>
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

              {/* Lead Source — from API */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Lead Source *
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                    style={{ fontSize: "12px" }}
                  >
                    <option value="">Select Lead Source</option>
                    {leadSources.map((src) => (
                      <option key={src._id} value={src._id}>
                        {" "}
                        {/* ← _id as value */}
                        {src.leadSourceName}
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

        {/* Footer */}
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
