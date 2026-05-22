"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Modal, Form, Col } from "react-bootstrap";

type AddDetailModalProps = {
  onClose: () => void;
  onApply?: (name: string, latitude: string, longitude: string) => void;
};

const AddDetailModal = ({ onClose, onApply }: AddDetailModalProps) => {
  const [sightseeingName, setSightseeingName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleAddManually = () => {
    if (!sightseeingName.trim()) {
      alert("Please enter a sightseeing name.");
      return;
    }
    onApply?.(sightseeingName.trim(), latitude.trim(), longitude.trim());
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      {/* Header */}
      <Modal.Header
        style={{ background: "#274c6b", color: "#fff" }}
        className="d-flex justify-content-between align-items-center"
      >
        <Modal.Title style={{ fontSize: "14px" }}>
          Add Sightseeing Detail (Using Google or Manually)
        </Modal.Title>
        <button
          onClick={onClose}
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
        <Col md={12} className="mb-2">
          <Form.Label style={{ fontSize: "10px" }}>Sightseeing Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a location"
            style={{ fontSize: "10px" }}
            value={sightseeingName}
            onChange={(e) => setSightseeingName(e.target.value)}
          />
        </Col>

        <Col md={12} className="mb-2">
          <Form.Label style={{ fontSize: "10px" }}>Latitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. 19.0760"
            style={{ fontSize: "10px" }}
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </Col>

        <Col md={12} className="mb-2">
          <Form.Label style={{ fontSize: "10px" }}>Longitude</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. 72.8777"
            style={{ fontSize: "10px" }}
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </Col>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>
        <Button
          variant="danger"
          style={{ fontSize: "10px" }}
          onClick={handleAddManually}
        >
          Add Manually
        </Button>
        <Button
          variant="outline-danger"
          onClick={onClose}
          style={{ fontSize: "10px" }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDetailModal;
