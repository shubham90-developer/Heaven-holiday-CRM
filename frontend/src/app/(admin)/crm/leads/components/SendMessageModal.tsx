"use client";

import React, { useState } from "react";
import { Button, Modal, Form, Nav } from "react-bootstrap";
import { Icon } from "@iconify/react";

interface Props {
  customerName?: string;
  phone?: string;
  leadId?: string;
}

const SendMessageModal: React.FC<Props> = ({
  customerName = "",
  phone = "",
  leadId = "",
}) => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("default");
  const [customSubject, setCustomSubject] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const defaultMessage = `Dear ${customerName || "Customer"},

Greetings! We tried to reach you for your trip planning but couldn't talk to you.
Please call us back at your earliest convenience.

Thanks,
A HEAVEN HOSPITALITY PVT LTD
TRVCРМ`;

  const whatsappLink = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(defaultMessage)}`
    : "#";

  const handleSendSMS = async () => {
    if (!phone) return;
    setSending(true);
    try {
      // TODO: wire to SMS API endpoint
      // await fetch('/api/sms', { method:'POST', body: JSON.stringify({ to: phone, message: defaultMessage }) })
      alert(`SMS would be sent to ${phone}`);
    } finally {
      setSending(false);
    }
  };

  const handleSendEmail = async () => {
    if (!leadId) return;
    setSending(true);
    try {
      // TODO: wire to email API endpoint
      // await fetch('/api/email', { method:'POST', body: JSON.stringify({ leadId, templateId: selectedTemplate }) })
      alert(`Email would be sent for lead ${leadId}`);
    } finally {
      setSending(false);
    }
  };

  const handleSendCustom = async (channel: "whatsapp" | "sms") => {
    if (!customMessage.trim()) return;
    setSending(true);
    try {
      if (channel === "whatsapp" && phone) {
        window.open(
          `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(customMessage)}`,
          "_blank",
        );
      } else {
        // TODO: wire to SMS API
        alert(`Custom SMS would be sent to ${phone}`);
      }
    } finally {
      setSending(false);
    }
  };

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
          <Modal.Title style={{ fontSize: "15px" }}>
            Send Message
            {customerName && (
              <span style={{ fontSize: "12px", opacity: 0.8, marginLeft: 8 }}>
                — {customerName} {phone && `(${phone})`}
              </span>
            )}
          </Modal.Title>
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
                label="Phone Didn't Pick"
                className="mb-3"
                defaultChecked
              />

              <div
                style={{
                  background: "#f8f9fa",
                  padding: "15px",
                  borderRadius: "6px",
                  whiteSpace: "pre-line",
                  fontSize: "11px",
                }}
              >
                {defaultMessage}
              </div>

              <div className="text-end mt-3 d-flex gap-2 justify-content-end">
                <Button
                  variant="success"
                  size="sm"
                  style={{ fontSize: "10px" }}
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  as="a"
                  disabled={!phone}
                >
                  <Icon icon="mdi:whatsapp" width="12" className="mx-1" />
                  WhatsApp
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  style={{ fontSize: "10px" }}
                  onClick={handleSendSMS}
                  disabled={sending || !phone}
                >
                  <Icon icon="mdi:sms" width="12" className="mx-1" /> SMS
                </Button>
              </div>
            </>
          )}

          {/* WHATSAPP TAB */}
          {activeTab === "whatsapp" && (
            <>
              {phone ? (
                <p style={{ fontSize: "11px" }}>
                  Opens WhatsApp chat with{" "}
                  <strong>{customerName || phone}</strong> ({phone})
                </p>
              ) : (
                <p className="text-muted" style={{ fontSize: "11px" }}>
                  No phone number available for this customer.
                </p>
              )}
              <div className="text-end">
                <Button
                  variant="success"
                  size="sm"
                  style={{ fontSize: "10px" }}
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  as="a"
                  disabled={!phone}
                >
                  <Icon icon="mdi:whatsapp" width="12" className="me-1" />
                  Open WhatsApp
                </Button>
              </div>
            </>
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
                <Button
                  size="sm"
                  style={{ fontSize: "10px" }}
                  onClick={handleSendEmail}
                  disabled={sending || !leadId}
                >
                  {sending ? "Sending…" : "Send Mail"}
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
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
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
                  rows={4}
                  placeholder="Type your message..."
                  style={{ fontSize: "10px" }}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </Form.Group>

              <div className="text-end d-flex gap-2 justify-content-end">
                <Button
                  variant="success"
                  size="sm"
                  style={{ fontSize: "10px" }}
                  onClick={() => handleSendCustom("whatsapp")}
                  disabled={sending || !phone || !customMessage.trim()}
                >
                  <Icon icon="mdi:whatsapp" width="12" className="mx-1" />
                  WhatsApp
                </Button>
                <Button
                  size="sm"
                  style={{ fontSize: "10px" }}
                  onClick={() => handleSendCustom("sms")}
                  disabled={sending || !phone || !customMessage.trim()}
                >
                  <Icon icon="mdi:sms" width="12" className="mx-1" /> SMS
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
