"use client";

import React, { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";

const TouchPointsModal = () => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <>
      {/* BUTTON */}
      <Button
        size="sm"
        onClick={() => setShowHistory(true)}
        style={{ fontSize: "8px" }}
        variant="danger"
      >
        Touch points
      </Button>

      {/* ================= HISTORY MODAL ================= */}
      <Modal
        show={showHistory}
        onHide={() => setShowHistory(false)}
        size="lg"
        centered
      >
        <Modal.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Modal.Title>Touch Points</Modal.Title>

          <button
            onClick={() => setShowHistory(false)}
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
          <Table bordered hover>
            <thead style={{ fontSize: "10px" }}>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Current Stage</th>
                <th> Lead Quality</th>
                <th> Total Call</th>
                <th> Total Todo</th>
                <th> Total Meeting</th>
                <th> Total SMS</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "10px" }}>
              <tr>
                <td>1</td>
                <td>PRAMOD JAGDALE</td>
                <td>Proposal Sent</td>
                <td> NA</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TouchPointsModal;
