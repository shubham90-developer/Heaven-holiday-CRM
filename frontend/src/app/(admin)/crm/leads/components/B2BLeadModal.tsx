"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useCreateLeadMutation } from "../../../../../../Redux/leadApi";
import { useGetAllLeadSourcesQuery } from "../../../../../../Redux/leadSourcesApi";

interface Props {
  onSuccess?: () => void;
}

const B2BLeadModal: React.FC<Props> = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
  const [agentType, setAgentType] = useState<"Agency" | "Corporate">("Agency");
  const [showMore, setShowMore] = useState(false);
  const [leadSource, setLeadSource] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const [createLead, { isLoading }] = useCreateLeadMutation();
  const { data: leadSourcesData } = useGetAllLeadSourcesQuery({});
  const leadSources = leadSourcesData?.data ?? [];

  const handleClose = () => {
    setShow(false);
    setError("");
    setAgentType("Agency");
    setCompanyName("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setSalutation("");
    setLeadSource("");
    setRemarks("");
    setShowMore(false);
  };

  const handleSubmit = async () => {
    if (!companyName || !phone || !leadSource) {
      setError("Company Name, Mobile Number and Lead Source are required.");
      return;
    }
    try {
      await createLead({
        type: "B2B",
        agentType,
        companyName,
        salutation: salutation || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email: email || undefined,
        phone,
        leadSource, // ← ObjectId from leadSourcesApi
        leadStage: "new",
        status: "unassigned",
        remarks: remarks || undefined,
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
        B2B Customer
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
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
          {error && (
            <div
              className="alert alert-danger py-1"
              style={{ fontSize: "11px" }}
            >
              {error}
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
                    checked={agentType === "Agency"}
                    onChange={() => setAgentType("Agency")}
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  />
                  <Form.Check
                    type="radio"
                    label="Corporate"
                    checked={agentType === "Corporate"}
                    onChange={() => setAgentType("Corporate")}
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
                    style={{ fontSize: "10px" }}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
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
                    placeholder="Email Id"
                    style={{ fontSize: "10px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <Form.Select
                    style={{ fontSize: "10px" }}
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
                    style={{ fontSize: "10px" }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    style={{ fontSize: "10px" }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                    style={{ fontSize: "10px" }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Lead Source — from API */}
            <Row className="mb-1">
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
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
              <Form.Control
                as="textarea"
                rows={3}
                style={{ fontSize: "10px" }}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={handleClose}
            style={{ fontSize: "10px" }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            style={{ fontSize: "10px" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default B2BLeadModal;
