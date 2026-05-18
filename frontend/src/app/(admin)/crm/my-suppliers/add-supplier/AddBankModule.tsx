"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { ISupplierBankDetail } from "../../../../../../Redux/supplierApi";

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  onSave: (bank: Omit<ISupplierBankDetail, "_id">) => void;
}

const AddBankModal = ({ onSave }: Props) => {
  const [show, setShow] = useState(false);

  // ── Form state ─────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
    swiftCode: "",
    isPrimary: false,
    country: "",
    city: "",
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ── Submit ─────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!form.accountNumber) {
      alert("Account Number is required.");
      return;
    }

    onSave({
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      bankName: form.bankName,
      ifscCode: form.ifscCode,
      swiftCode: form.swiftCode,
      isPrimary: form.isPrimary,
      country: form.country,
      city: form.city,
      comments: form.comments,
    });

    // Reset and close
    setForm({
      accountName: "",
      accountNumber: "",
      bankName: "",
      ifscCode: "",
      swiftCode: "",
      isPrimary: false,
      country: "",
      city: "",
      comments: "",
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

      <Modal show={show} onHide={() => setShow(false)} size="sm" centered>
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title style={{ fontSize: "14px" }}>
            Add Supplier Bank
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
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Account Name
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="accountName"
                  value={form.accountName}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Account Number *
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="accountNumber"
                  value={form.accountNumber}
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
                  Bank Name
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  IFSC Code
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="ifscCode"
                  value={form.ifscCode}
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
                  Swift Code
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  name="swiftCode"
                  value={form.swiftCode}
                  onChange={handleChange}
                />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Is Primary
                </Form.Label>
                <div className="d-flex align-items-center gap-3">
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="isPrimary"
                    style={{ fontSize: "12px" }}
                    checked={form.isPrimary === true}
                    onChange={() => setForm((p) => ({ ...p, isPrimary: true }))}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isPrimary"
                    style={{ fontSize: "12px" }}
                    checked={form.isPrimary === false}
                    onChange={() =>
                      setForm((p) => ({ ...p, isPrimary: false }))
                    }
                  />
                </div>
              </Col>
            </Row>

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
            </Row>

            <Row className="mb-2">
              <Col md={12}>
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

export default AddBankModal;
