"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

const leadSources = [
  { value: "4513", label: "Agency" },
  { value: "4514", label: "Website" },
];

const B2CLeadModal = ({ show, onHide }: any) => {
  const [leadSource, setLeadSource] = useState<string>("");

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      {/* Header */}
      <Modal.Header
        style={{ background: "#274c6b", color: "#fff" }}
        className="d-flex justify-content-between"
      >
        <Modal.Title>Add Customer</Modal.Title>

        <button
          onClick={onHide}
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
        <Form>
          <Row className="g-1">
            {/* Email */}
            <Col md={12}>
              <Form.Group>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Email ID *
                </Form.Label>
                <Form.Control
                  type="email"
                  size="sm"
                  style={{ fontSize: "12px" }}
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
                  <Form.Control type="text" style={{ fontSize: "12px" }} />
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
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
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
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
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
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
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
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option value="">Select Stage</option>
                  <option>New</option>
                  <option>Call Back</option>
                  <option>Not Interested</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={onHide}
          style={{ fontSize: "12px" }}
        >
          Cancel
        </Button>

        <Button variant="success" size="sm" style={{ fontSize: "12px" }}>
          <Icon
            icon="mdi:account-plus-outline"
            className="me-1"
            style={{ fontSize: "10px" }}
          />
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default B2CLeadModal;
