"use client";

import React, { useState } from "react";
import { Button, Modal, Form, Nav } from "react-bootstrap";
import { Icon } from "@iconify/react";

const SendMessageModal = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("default");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const message = `Dear Anjali,

Greetings! We tried to reach you for your trip planning but couldn't talk to you.
Pls call RAJENDRA at 8602410707.

Thanks,
A HEAVEN HOSPITALITY PVT LTD
TRVCRM`;

  return (
    <>
      <Button
        variant="primary"
        size="sm"
        onClick={handleShow}
        style={{ fontSize: "10px" }}
        title="Send Message"
      >
        <Icon icon="mdi:chat-outline" width="10" />
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Modal.Title>Choose Message</Modal.Title>

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
          {/* Tabs */}
          <Nav className="mb-4">
            {["default", "whatsapp", "email", "custom"].map((tab) => (
              <Nav.Item key={tab} className="me-2">
                <Button
                  variant={activeTab === tab ? "primary" : "outline-primary"}
                  onClick={() => setActiveTab(tab)}
                  size="sm"
                  style={{ fontSize: "10px" }}
                >
                  {tab === "default" && "Default Message"}
                  {tab === "whatsapp" && "WhatsApp"}
                  {tab === "email" && "Email"}
                  {tab === "custom" && "Custom"}
                </Button>
              </Nav.Item>
            ))}
          </Nav>

          {/* DEFAULT TAB */}
          {activeTab === "default" && (
            <>
              <Form.Check
                type="radio"
                name="defaultMsg"
                label="Phone Didn't Picked"
                className="mb-3"
                defaultChecked
              />

              <div
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "6px",
                  whiteSpace: "pre-line",
                }}
              >
                {message}
              </div>

              <div className="text-end mt-3 d-flex gap-2 justify-content-end">
                <Button
                  variant="success"
                  size="sm"
                  style={{ fontSize: "10px" }}
                >
                  <Icon icon="mdi:whatsapp" width="12" className="mx-1" /> Whats
                  App
                </Button>
                <Button variant="info" size="sm" style={{ fontSize: "10px" }}>
                  <Icon icon="mdi:sms" width="12" className="mx-1" /> SMS
                </Button>
              </div>
            </>
          )}

          {/* WHATSAPP TAB */}
          {activeTab === "whatsapp" && (
            <div className="text-end">
              <Button variant="success" size="sm" style={{ fontSize: "10px" }}>
                Send
              </Button>
            </div>
          )}

          {/* EMAIL TAB */}
          {activeTab === "email" && (
            <>
              <Form.Check
                type="radio"
                name="emailMsg"
                label="Call Back"
                className="mb-2"
              />

              <Form.Check
                type="radio"
                name="emailMsg"
                label="Feedback on Your Recent Travel Experience"
                className="mb-4"
                defaultChecked
              />

              <div className="text-end">
                <Button size="sm" style={{ fontSize: "10px" }}>
                  Send Mail
                </Button>
              </div>
            </>
          )}

          {/* CUSTOM TAB */}
          {activeTab === "custom" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Subject
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  style={{ fontSize: "10px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Message
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Message"
                  style={{ fontSize: "10px" }}
                />
              </Form.Group>

              <div className="text-end">
                <Button
                  variant="success"
                  className="me-2"
                  size="sm"
                  style={{ fontSize: "10px" }}
                >
                  <Icon icon="mdi:whatsapp" width="12" className="mx-1" />{" "}
                  Whatsapp
                </Button>

                <Button size="sm" style={{ fontSize: "10px" }}>
                  <Icon icon="mdi:sms" width="12" className="mx-1" /> Send Mail
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SendMessageModal;
