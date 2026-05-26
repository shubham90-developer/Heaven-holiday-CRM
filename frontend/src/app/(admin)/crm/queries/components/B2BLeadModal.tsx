"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

import { useGetAllLeadSourcesQuery } from "../../../../../../Redux/leadSourcesApi";
import { useCreateLeadMutation } from "../../../../../../Redux/leadApi";

interface Props {
  onSuccess?: () => void;
}

const B2BLeadModal: React.FC<Props> = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [createLead, { isLoading }] = useCreateLeadMutation();

  // ───────────────── LEAD SOURCES ─────────────────
  const { data: leadSourceData } = useGetAllLeadSourcesQuery({
    status: true,
    page: 1,
    limit: 100,
  });

  // ───────────────── FORM STATE ─────────────────
  const [formData, setFormData] = useState({
    type: "B2B" as const,
    agentType: "Agency" as "Agency" | "Corporate",

    companyName: "",

    salutation: "",
    firstName: "",
    lastName: "",

    phone: "",
    email: "",

    leadSource: "",

    remarks: "",
  });

  // ───────────────── HANDLERS ─────────────────
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ───────────────── SUBMIT ─────────────────
  const handleSubmit = async () => {
    try {
      if (!formData.companyName) {
        alert("Company name is required");
        return;
      }

      if (!formData.phone) {
        alert("Phone number is required");
        return;
      }

      if (!formData.leadSource) {
        alert("Lead source is required");
        return;
      }

      await createLead({
        type: "B2B",
        agentType: formData.agentType,

        companyName: formData.companyName,

        salutation: formData.salutation || undefined,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined,

        phone: formData.phone,
        email: formData.email || undefined,

        leadSource: formData.leadSource,

        remarks: formData.remarks || undefined,
      }).unwrap();

      alert("Lead created successfully");

      handleClose();

      setFormData({
        type: "B2B",
        agentType: "Agency",

        companyName: "",

        salutation: "",
        firstName: "",
        lastName: "",

        phone: "",
        email: "",

        leadSource: "",

        remarks: "",
      });

      onSuccess?.();
    } catch (error: any) {
      console.error(error);

      alert(error?.data?.message || "Something went wrong while creating lead");
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
        B2B Customer
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        {/* HEADER */}
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

        {/* BODY */}
        <Modal.Body>
          <Form>
            {/* TYPE + COMPANY */}
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
                    checked={formData.agentType === "Agency"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        agentType: "Agency",
                      })
                    }
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  />

                  <Form.Check
                    type="radio"
                    label="Corporate"
                    checked={formData.agentType === "Corporate"}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        agentType: "Corporate",
                      })
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
                    value={formData.companyName}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* EMAIL + NAME */}
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
                    value={formData.email}
                    onChange={handleChange}
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

                  <Form.Select
                    name="salutation"
                    value={formData.salutation}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  >
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
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
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* LAST NAME + MOBILE */}
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
                    value={formData.lastName}
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
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* LEAD SOURCE */}
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
                    name="leadSource"
                    value={formData.leadSource}
                    onChange={handleChange}
                    style={{ fontSize: "10px" }}
                  >
                    <option value="">Select Lead Source</option>

                    {leadSourceData?.data?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.leadSourceName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* SHOW MORE */}
            <div
              className="mb-2"
              style={{
                color: "#ff6600",
                cursor: "pointer",
                fontSize: "10px",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </div>

            {/* EXTRA */}
            {showMore && (
              <Row className="mb-1">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Remarks
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      style={{ fontSize: "10px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Form>
        </Modal.Body>

        {/* FOOTER */}
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
            onClick={handleSubmit}
            disabled={isLoading}
            style={{ fontSize: "10px" }}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default B2BLeadModal;
