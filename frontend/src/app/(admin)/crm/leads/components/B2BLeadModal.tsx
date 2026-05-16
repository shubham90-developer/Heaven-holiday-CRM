"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useCreateLeadMutation } from "../../../../../../Redux/leadApi";
const leadSources = [
  { value: "Agency", label: "Agency" },
  { value: "Website B2B", label: "Website B2B" },
  { value: "GTX Network", label: "GTX Network" },
  { value: "GTX Network Web", label: "GTX Network Web" },
  { value: "Reference", label: "Reference" },
  { value: "Walk-in", label: "Walk-in" },
  { value: "Proposal", label: "Proposal" },
];

interface Props {
  onSuccess?: () => void;
}

const B2BLeadModal: React.FC<Props> = ({ onSuccess }) => {
  const [show, setShow] = useState<boolean>(false);
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    source: "",
    leadStage: "new" as const,
  });
  const [error, setError] = useState<string>("");

  const [createLead, { isLoading }] = useCreateLeadMutation();

  const handleClose = () => {
    setShow(false);
    setError("");
    setForm({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      source: "",
      leadStage: "new",
    });
  };

  const handleSubmit = async () => {
    if (!form.companyName || !form.phone) {
      setError("Company Name and Mobile Number are required.");
      return;
    }

    try {
      await createLead({
        customerName: form.contactPerson || form.companyName,
        companyName: form.companyName,
        email: form.email || undefined,
        phone: form.phone,
        type: "B2B",
        source: form.source || "Agency",
        leadStage: form.leadStage,
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
        <Icon icon="mdi:domain" className="me-1" />
        B2B Lead
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Add B2B Lead</Modal.Title>
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
              className="alert alert-danger py-1"
              style={{ fontSize: "11px" }}
            >
              {error}
            </div>
          )}

          <Form>
            <Row className="g-1">
              {/* Company Name */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Company Name *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

              {/* Contact Person */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Contact Person
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    value={form.contactPerson}
                    onChange={(e) =>
                      setForm({ ...form, contactPerson: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>

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
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
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
                    <InputGroup.Text>🇮🇳 +91</InputGroup.Text>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px", padding: "8px" }}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                    />
                  </InputGroup>
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
                    value={form.source}
                    onChange={(e) =>
                      setForm({ ...form, source: e.target.value })
                    }
                    style={{ fontSize: "12px" }}
                  >
                    <option value="">Select Lead Source</option>
                    {leadSources.map((item) => (
                      <option key={item.value} value={item.value}>
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
                    value={form.leadStage}
                    onChange={(e) =>
                      setForm({ ...form, leadStage: e.target.value as any })
                    }
                  >
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
            <Icon icon="mdi:domain" className="me-1" />
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default B2BLeadModal;
