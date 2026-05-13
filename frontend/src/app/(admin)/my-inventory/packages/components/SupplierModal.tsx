"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

const leadSources = [
  { value: "4513", label: "Agency" },
  { value: "4514", label: "Website" },
  { value: "4515", label: "Facebook" },
  { value: "4516", label: "Tripsgateway" },
  { value: "4517", label: "Website B2B" },
  { value: "4518", label: "Proposal" },
  { value: "4519", label: "GTX Network" },
  { value: "4520", label: "GTX Network Web" },
  { value: "6888", label: "Instagram" },
  { value: "8412", label: "Old Customer" },
  { value: "8413", label: "Reference" },
  { value: "8414", label: "Walk-in" },
  { value: "8569", label: "RAJ SIR" },
  { value: "8570", label: "My Old Client" },
  { value: "8571", label: "Raj Sir Facebook" },
  { value: "8572", label: "3700" },
  { value: "8573", label: "AHH" },
  { value: "9102", label: "Expo Belavagi" },
  { value: "9116", label: "Expo Kolhapur" },
  { value: "9117", label: "Expo Sangli" },
  { value: "9288", label: "PUNE EXPO" },
  { value: "9345", label: "PRANAV SIR" },
  { value: "9346", label: "PRAJWAL SIR" },
  { value: "9347", label: "SANKET SIR" },
  { value: "9348", label: "SAIPRASAD SIR" },
  { value: "9349", label: "JUST DIAL" },
  { value: "9813", label: "KASTURI GROUP" },
  { value: "9817", label: "Pune Expo Jan 2026" },
  { value: "9917", label: "Varsha Bugade" },
  { value: "9940", label: "PRANEETA BUGADE" },
  { value: "9954", label: "Sangli Agri Pandhari" },
];

const SupplierModal: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [leadSource, setLeadSource] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* BUTTON */}
      <Button
        variant="link"
        size="sm"
        style={{ fontSize: "10px" }}
        onClick={handleShow}
      >
        A Heaven Holiday
      </Button>

      {/* MODAL */}
      <Modal show={show} onHide={handleClose} centered>
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>A Heaven Holiday Supplier (Kolhapur)</Modal.Title>

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
          <div className="border p-2">
            <h6 className="text-primary mb-2">Supplier Information</h6>

            <table
              className="table table-bordered mb-0"
              style={{ fontSize: "12px" }}
            >
              <tbody>
                <tr>
                  <td style={{ width: "40%", fontWeight: "500" }}>
                    Supplier Location
                  </td>
                  <td>Kolhapur</td>
                </tr>

                <tr>
                  <td style={{ fontWeight: "500" }}>Email</td>
                  <td>b2b.aheaven@gmail.com</td>
                </tr>

                <tr>
                  <td style={{ fontWeight: "500" }}>Contact</td>
                  <td>8602410707</td>
                </tr>

                <tr>
                  <td style={{ fontWeight: "500" }}>Active Since</td>
                  <td>28-Nov-25</td>
                </tr>

                <tr>
                  <td style={{ fontWeight: "500" }}>Contact Person</td>
                  <td>RAJENDRA BALASO BU</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SupplierModal;
