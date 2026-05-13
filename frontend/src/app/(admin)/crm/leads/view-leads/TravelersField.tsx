"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function TravelersField() {
  const [open, setOpen] = useState(false);

  return (
    <Col md={3}>
    <div style={{ position: "relative" }}>
      <Form.Group>
        <Form.Label style={{fontSize:"10px" }} className="text-primary">Travelers</Form.Label>

        <div style={{ position: "relative" }}>
          <Form.Control
          readOnly
            value="17"
           size="sm"
            onClick={() => setOpen(!open)}
            style={{
              cursor: "pointer",
           
            }}
          />

          {/* Dropdown Arrow */}
          <span
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "14px",
            }}
          >
           <Icon icon="mdi:chevron-down" />
          </span>
        </div>
      </Form.Group>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            width: "100%",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <h6 className="mb-3">Pax Details</h6>

          {[
            { label: "ADULTS (Twin sharing)", val: 2 },
            { label: "ADULTS (Triple sharing)", val: 7 },
            { label: "ADULTS (Single occupancy)", val: 0 },
            { label: "ADULTS (Quad occupancy)", val: 8 },
            { label: "ADULTS (Quint occupancy)", val: 0 },
            { label: "ADULTS (Hexa occupancy)", val: 0 },
            { label: "CHILD (WITH BED 2 - 11YRS)", val: 0 },
            { label: "CHILD (W/O BED 2 - 11YRS)", val: 0 },
            { label: "INFANT (0 - 2YRS)", val: 0 },
          ].map((item, i) => (
            <Form.Group className="mb-2" key={i}>
              <Row className="align-items-center">
                <Col xs={8}>
                  <Form.Label style={{ fontSize: "12px", marginBottom: 0 }}>
                    {item.label}
                  </Form.Label>
                </Col>
                <Col xs={4}>
                  <Form.Control
                    type="number"
                    defaultValue={item.val}
                    className="text-center"
                    size="sm"
                  />
                </Col>
              </Row>
            </Form.Group>
          ))}

       
          <Button variant="danger"
            className="w-100 mt-3"
            onClick={() => setOpen(false)}
            style={{
           
              border: "none",
              fontWeight: 500,
            }}
          >
            Done
          </Button>
        </div>
      )}
    </div>
    </Col>
  );
}
