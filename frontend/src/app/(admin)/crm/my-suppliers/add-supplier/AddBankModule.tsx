"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const AddBankModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        size="sm"
        style={{ fontSize: "8px" }}
        onClick={() => setShow(true)}
      >
        <Icon icon="mdi:plus" className="me-1" /> Add
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="md" centered>
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

        {/* BODY */}
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
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Account Number *
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
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
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  IFSC Code
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Swift Code *
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
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
                    value="yes"
                    style={{ fontSize: "12px" }}
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="isPrimary"
                    value="no"
                    defaultChecked
                    style={{ fontSize: "12px" }}
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
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  City *
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
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
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        {/* FOOTER */}
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => setShow(false)}
            style={{ fontSize: "12px" }}
          >
            Cancel
          </Button>

          <Button variant="success" size="sm" style={{ fontSize: "12px" }}>
            <Icon icon="akar-icons:check" className="me-1" /> Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBankModal;
