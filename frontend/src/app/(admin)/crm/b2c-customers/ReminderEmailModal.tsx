"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const ReminderEmailModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(formData); // 🔥 send to API here
    handleClose();
  };

  return (
    <>
      {/* BUTTON */}
      <Button
        variant="info"
        size="sm"
        style={{ fontSize: "10px", fontWeight: "bold" }}
        onClick={handleShow}
      >
        <Icon icon="mdi:thumbs-up" />
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Send Reminder Email</Modal.Title>

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
            <Row className="g-2">
              {/* Subject */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Subject
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    size="sm"
                    style={{ fontSize: "10px", padding: "8px" }}
                    placeholder="Enter subject"
                  />
                </Form.Group>
              </Col>

              {/* Message */}
              <Col md={12}>
                <Form.Group>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Message
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter message"
                    style={{ fontSize: "10px" }}
                  />
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
          >
            <Icon icon="mdi:send" className="me-1" /> Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReminderEmailModal;
