"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Button, Modal, Table, Form } from "react-bootstrap";
import SendMessageModal from "./SendMessageModal";
import PriceModal from "./PriceModal";

const ProposalModal = () => {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <>
      {/* BUTTON */}
      <Button
        size="sm"
        onClick={() => setShowHistory(true)}
        style={{ fontSize: "10px" }}
        variant="link"
      >
        1 (View Proposal)
      </Button>

      {/* ================= HISTORY MODAL ================= */}
      <Modal
        show={showHistory}
        onHide={() => setShowHistory(false)}
        size="xl"
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
          <Modal.Title>view Proposal</Modal.Title>

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
                <th>Proposal Date/Age</th>
                <th>Proposal ID</th>
                <th>Travel Date</th>
                <th> Type</th>
                <th> No. of Pax</th>
                <th> Destinations</th>
                <th> Offer Price</th>
                <th> Stage</th>
                <th> Owner</th>
                <th> Last Updated</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "10px" }}>
              <tr>
                <td>
                  <div>17-Mar-26</div>
                  <div>10H 29M</div>
                </td>
                <td>
                  <div>QS/26/2113160/V1</div>
                  <div>Q:2047192</div>
                </td>
                <td>
                  <div>12-May-26 -</div>
                  <div>16-May-26</div>
                </td>
                <td>
                  <div>Quick Package Supplier</div>
                </td>
                <td>10 Adult(s)</td>
                <td>Pattaya</td>
                <td>
                  <div> INR 514030</div>
                  <div>
                    <PriceModal />
                  </div>
                </td>
                <td>
                  <div> Proposal Sent</div>
                  <div>Changes | Create EMI</div>
                </td>
                <td>
                  <div> RAJENDRA</div>
                  <div>(DIRECTOR)</div>
                </td>
                <td>
                  <div> 17-Mar-26</div>
                  <div>Delivered</div>
                </td>
                <td>
                  <div className="d-flex flex-column gap-1">
                    <span className="action-btn view">
                      <Button
                        variant="success"
                        size="sm"
                        style={{ fontSize: "10px" }}
                        title="View"
                      >
                        <Icon icon="mdi:eye-outline" />
                      </Button>
                    </span>

                    <span className="action-btn chat">
                      <SendMessageModal />
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProposalModal;
