"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import CustomFlatpickr from "@/components/CustomFlatpickr";

function OffCanvasExample({ name, ...props }: any) {
  const [show, setShow] = useState(false);
  const [leadSource, setLeadSource] = useState<string>("");
  const [leadStage, setLeadStage] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={handleShow}
        className="me-2"
        size="sm"
        style={{ fontSize: "10px", fontWeight: "bold" }}
      >
        <Icon icon="tabler:filter" width="12" /> {name}
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "900px" }}
      >
        <Offcanvas.Header
          style={{
            background: "#274c6b",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Offcanvas.Title>
            <Icon icon="tabler:filter" className="me-2" />
            Filter Results
          </Offcanvas.Title>

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
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Row className="g-2">
            {/* Customer*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Customer Name
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* Customer phone*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Customer Phone
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* status of RP*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Status of RP
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Submitted</option>
                  <option>Cancelled</option>
                  <option>On Hold</option>
                  <option>Yet To Be Submitted</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Payment To RP*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Payment To RP
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Paid</option>
                  <option>UnPaid</option>
                  <option>Invoice Received</option>
                  <option>Cencelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div style={{ borderTop: "1px dotted #000" }} className="mt-5"></div>
          {/* Buttons */}
          <div className="d-flex justify-content-end mt-1 gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
              Reset
            </Button>

            <Button
              variant="success"
              size="sm"
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
              <Icon
                icon="tabler:search"
                className="me-1"
                style={{ fontSize: "12px" }}
              />
              Filter
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Filter() {
  return (
    <>
      <OffCanvasExample placement="end" name="Filter" />
    </>
  );
}

export default Filter;
