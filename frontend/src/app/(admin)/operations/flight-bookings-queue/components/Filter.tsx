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
            {/* booking From Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Booking From Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* booking to Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Booking To Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* travel From Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Travel From Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* travel To Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Travel To Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* Proposal Id */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Proposal ID
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* Flight No/Flight Name */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Flight No/Flight Name
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* booking ID*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Booking ID
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* PNR No*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  PNR No
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* from dest / to dest*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  From Dest / To Dest
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

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

            {/* Customer email*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Customer Email
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

            {/* Company Name*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Company Name
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* Source*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Source
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>B2B</option>
                  <option>B2C</option>
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
