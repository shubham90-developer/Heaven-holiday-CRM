"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

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

const B2BLeadModal = ({ show, onHide }: any) => {
  const [leadSource, setLeadSource] = useState<string>("");
  const [showMore, setShowMore] = useState(false);
  const [type, setType] = useState("agency");
  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      {/* Header */}
      <Modal.Header
        style={{ background: "#274c6b", color: "#fff" }}
        className="d-flex justify-content-between"
      >
        <Modal.Title>Add B2B Agent</Modal.Title>

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
      {/* Body */}
      <Modal.Body>
        <Form>
          {/* Type + Company */}
          <Row className="mb-1 align-items-center">
            <Col md={6}>
              <Form.Label style={{ fontSize: "10px" }} className="text-primary">
                Type :
              </Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  label="Agency"
                  checked={type === "agency"}
                  onChange={() => setType("agency")}
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                />
                <Form.Check
                  type="radio"
                  label="Corporate"
                  checked={type === "corporate"}
                  onChange={() => setType("corporate")}
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
                <Form.Control type="text" style={{ fontSize: "10px" }} />
              </Form.Group>
            </Col>
          </Row>

          {/* Email + Name */}
          <Row className="mb-1">
            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Email Id *
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email Id"
                  style={{ fontSize: "10px" }}
                />
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
                <Form.Select style={{ fontSize: "10px" }}>
                  <option>Select</option>
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
                <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                <Form.Select style={{ fontSize: "10px" }}>
                  <option>RAJENDRA BUGADE</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
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
          </Row>

          {/* Show More Toggle */}
          <div
            className="mb-2"
            style={{ color: "#ff6600", cursor: "pointer", fontSize: "10px" }}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </div>

          {/* Extra Fields */}
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
                    <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                    <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                    <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                    <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                    <Form.Control type="text" style={{ fontSize: "10px" }} />
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
                    <Form.Control type="text" style={{ fontSize: "10px" }} />
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
            <Form.Control as="textarea" rows={3} style={{ fontSize: "10px" }} />
          </Form.Group>
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

export default B2BLeadModal;
