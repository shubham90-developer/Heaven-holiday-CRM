"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import CustomFlatpickr from "@/components/CustomFlatpickr";

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

const leadStages = [
  { value: "wrong_number", label: "Wrong Number" },
  { value: "not_contactable", label: "Cannot Be Contacted" },
  { value: "not_interested", label: "Not Interested" },
  { value: "junk_lead", label: "Junk Lead" },
  { value: "create_query", label: "Create Query" },
  { value: "lost_lead", label: "Lost Lead" },
  { value: "duplicate", label: "Duplicate" },
  { value: "new", label: "New" },
  { value: "call_back", label: "Call Back" },
  { value: "destination_closed", label: "Destination Closed" },
  { value: "unanswered", label: "Unanswered" },
  { value: "not_reachable", label: "Not Reachable" },
];

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
            {/* Lead Type */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Select Lead Type
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select Lead Type</option>
                  <option value={1}>B2B </option>
                  <option value={2}>B2C </option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Lead quality */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Select Lead Quality
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select Lead Quality</option>
                  <option value={1}>No Status </option>
                  <option value={2}>Hot </option>
                  <option value={2}>Warm </option>
                  <option value={2}>Cold </option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Lead Stage */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Select Lead Stage
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={leadStage}
                  onChange={(e) => setLeadStage(e.target.value)}
                  style={{ fontSize: "12px" }}
                >
                  <option value="">Select Lead Stage</option>

                  {leadStages.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Customer Name */}
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

            {/* company Name */}
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

            {/* Customer Mobile */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Customer Mobile
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* Customer Email */}
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

            {/* Source Destination */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Source/Destination
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* Query Id */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Query Id
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* From Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  From Query Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* To Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  To Query Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* Lead Source */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Select Lead Source
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value)}
                  style={{ fontSize: "12px" }}
                >
                  <option value="">Select Lead Source</option>

                  {leadSources.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* plan Type */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Plan Type
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select Plan</option>
                  <option>Flight</option>
                  <option>Hotel</option>
                  <option>Package</option>
                  <option>Visa</option>
                  <option>Activity</option>
                  <option>Sightseeing</option>
                  <option>Miscellaneous</option>
                  <option>Transfer</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* From Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  From travel Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* From Date */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  To travel Date
                </Form.Label>
                <CustomFlatpickr
                  className="form-control"
                  options={{ enableTime: false }}
                  style={{ fontSize: "12px" }}
                />
              </Form.Group>
            </Col>

            {/* OPS Status */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  OPS Status
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>OPS Status</option>
                  <option>Requested</option>
                  <option>Received</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Assigned To */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Assigned to
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select Owner</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* lead Id */}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Lead Id
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            {/* min pax*/}
            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Min Pax
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
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
