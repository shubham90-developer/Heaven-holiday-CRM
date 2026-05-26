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

import { useGetAllLeadSourcesQuery } from "../../../../../../Redux/leadSourcesApi";
import { useCreateLeadMutation } from "../../../../../../Redux/leadApi";

interface Props {
  onSuccess?: () => void;
}

const B2CLeadModal: React.FC<Props> = ({ onSuccess }) => {
  const [show, setShow] = useState<boolean>(false);

  // ─── FORM STATE ─────────────────────────────────────
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    leadSource: "",
    leadStage: "new",
  });

  // ─── API HOOKS ──────────────────────────────────────
  const { data: leadSourceData, isLoading: leadSourceLoading } =
    useGetAllLeadSourcesQuery({
      status: true,
      page: 1,
      limit: 100,
    });

  const [createLead, { isLoading }] = useCreateLeadMutation();

  // ─── MODAL ──────────────────────────────────────────
  const handleClose = () => {
    setShow(false);

    setFormData({
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      leadSource: "",
      leadStage: "new",
    });
  };

  const handleShow = () => setShow(true);

  // ─── INPUT CHANGE ───────────────────────────────────
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

  // ─── SUBMIT ─────────────────────────────────────────
  const handleSubmit = async () => {
    try {
      if (!formData.firstName) {
        alert("First Name is required");
        return;
      }

      if (!formData.phone) {
        alert("Phone number is required");
        return;
      }

      if (!formData.leadSource) {
        alert("Lead Source is required");
        return;
      }

      const payload = {
        type: "B2C" as const,

        salutation:
          formData.salutation && formData.salutation !== "Select"
            ? formData.salutation
            : undefined,

        firstName: formData.firstName,
        lastName: formData.lastName || undefined,

        email: formData.email || undefined,
        phone: formData.phone,

        leadSource: formData.leadSource,

        leadStage: formData.leadStage as
          | "new"
          | "followUp"
          | "confirmed"
          | "rejected"
          | "lost",

        temperature: "no-status" as const,
        status: "unassigned" as const,
      };

      await createLead(payload).unwrap();

      alert("Lead created successfully");

      handleClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error(error);

      alert(error?.data?.message || "Something went wrong while creating lead");
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
        <Icon icon="mdi:account-plus-outline" className="me-1" />
        B2C Customer
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        {/* HEADER */}
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
          <Form>
            <Row className="g-1">
              {/* EMAIL */}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                </Form.Group>
              </Col>

              {/* MOBILE */}
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
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ fontSize: "10px", padding: "8px" }}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              {/* SALUTATION */}
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
                    name="salutation"
                    value={formData.salutation}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  >
                    <option value="">Select</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Dr">Dr</option>
                    <option value="Prof">Prof</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* FIRST NAME */}
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                </Form.Group>
              </Col>

              {/* LAST NAME */}
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
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  />
                </Form.Group>
              </Col>

              {/* LEAD SOURCE */}
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
                    name="leadSource"
                    value={formData.leadSource}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
                  >
                    <option value="">Select Lead Source</option>

                    {leadSourceLoading ? (
                      <option>Loading...</option>
                    ) : (
                      leadSourceData?.data?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.leadSourceName}
                        </option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* LEAD STAGE */}
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
                    name="leadStage"
                    value={formData.leadStage}
                    onChange={handleChange}
                    style={{ fontSize: "10px", padding: "8px" }}
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
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                Saving...
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

export default B2CLeadModal;
