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
            {/* Company Name */}
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

            {/* services */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Services
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select Owner</option>
                  <option value={1}>user 1 </option>
                  <option value={2}>user2 </option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* supplier city */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Supplier City
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* agent location */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Agent Location
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* 
            contact Name */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Contact Name
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* mobile no*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Mobile Number
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* email*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Email Id
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* city*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Expertise City
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* country */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Expertise Country
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select Status</option>
                  <option value={1}>india </option>
                  <option value={2}>america </option>
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
