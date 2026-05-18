"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { ISupplierContact } from "../../../../../../Redux/supplierApi";

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  onSave: (contact: Omit<ISupplierContact, "_id">) => void;
}

const AddContactModal = ({ onSave }: Props) => {
  const [show, setShow] = useState(false);

  // ── Form state ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    designation: "",
    department: "",
    email: "",
    countryCode: "+91",
    phone: "",
    country: "",
    state: "",
    city: "",
    comments: "",
    expertiseDestinations: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!form.firstName || !form.phone) {
      alert("First Name and Mobile Number are required.");
      return;
    }

    onSave({
      salutation: form.salutation as any,
      firstName: form.firstName,
      lastName: form.lastName,
      designation: form.designation,
      department: form.department,
      email: form.email,
      countryCode: form.countryCode,
      phone: form.phone,
      country: form.country,
      state: form.state,
      city: form.city,
      comments: form.comments,
      expertiseDestinations: form.expertiseDestinations,
    });

    // Reset form and close modal
    setForm({
      salutation: "",
      firstName: "",
      lastName: "",
      designation: "",
      department: "",
      email: "",
      countryCode: "+91",
      phone: "",
      country: "",
      state: "",
      city: "",
      comments: "",
      expertiseDestinations: "",
    });
    setShow(false);
  };

  return (
    <>
      <Button
        size="sm"
        style={{ fontSize: "8px" }}
        onClick={() => setShow(true)}
      >
        <Icon icon="mdi:plus" className="me-1" /> Add
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title style={{ fontSize: "14px" }}>
            Add Supplier Contact
          </Modal.Title>
          <button
            onClick={() => setShow(false)}
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

        <Modal.Body style={{ fontSize: "12px" }}>
          <Form>
            <Row className="mb-2">
              <Col md={2}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Salutation *
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="salutation"
                  value={form.salutation}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Miss</option>
                  <option>Mrs.</option>
                  <option>Dr.</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  First Name *
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Last Name
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Designation
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Department
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Email
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Mobile Number *
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    value="+91"
                    readOnly
                    size="sm"
                    style={{ width: "30%", fontSize: "12px" }}
                  />
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>

            <div
              style={{
                background: "#0f3d5e",
                color: "#fff",
                padding: "6px 10px",
                fontSize: "13px",
                marginTop: "10px",
              }}
            >
              Destination Manage
            </div>

            <Row className="mt-2 mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Country
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  State
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  City
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Comments
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Expertise In (Geography) : Destinations
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="expertiseDestinations"
                  value={form.expertiseDestinations}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShow(false)}
            style={{ fontSize: "12px" }}
          >
            Cancel
          </Button>

          <Button
            variant="success"
            size="sm"
            style={{ fontSize: "12px" }}
            onClick={handleSubmit}
          >
            <Icon icon="akar-icons:check" className="me-1" /> Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddContactModal;
