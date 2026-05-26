"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

// ── props ─────────────────────────────────────────────────────────────────────
interface Props {
  value: string;
  onChange: (val: string) => void;
}

// ── pax rows config ───────────────────────────────────────────────────────────
const PAX_ROWS = [
  { label: "ADULTS (Twin sharing)", key: "twinSharing" },
  { label: "ADULTS (Triple sharing)", key: "tripleSharing" },
  { label: "ADULTS (Single occupancy)", key: "singleOccupancy" },
  { label: "ADULTS (Quad occupancy)", key: "quadOccupancy" },
  { label: "ADULTS (Quint occupancy)", key: "quintOccupancy" },
  { label: "ADULTS (Hexa occupancy)", key: "hexaOccupancy" },
  { label: "CHILD (WITH BED 2 - 11YRS)", key: "childWithBed" },
  { label: "CHILD (W/O BED 2 - 11YRS)", key: "childWithoutBed" },
  { label: "INFANT (0 - 2YRS)", key: "infant" },
];

const DEFAULT_COUNTS: Record<string, number> = {
  twinSharing: 0,
  tripleSharing: 0,
  singleOccupancy: 0,
  quadOccupancy: 0,
  quintOccupancy: 0,
  hexaOccupancy: 0,
  childWithBed: 0,
  childWithoutBed: 0,
  infant: 0,
};

export default function TravelersField({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>(DEFAULT_COUNTS);

  const handleCountChange = (key: string, val: number) => {
    setCounts((prev) => ({ ...prev, [key]: val < 0 ? 0 : val }));
  };

  const handleDone = () => {
    const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
    onChange(String(total));
    setOpen(false);
  };

  return (
    <Col md={3}>
      <div style={{ position: "relative" }}>
        <Form.Group>
          <Form.Label style={{ fontSize: "10px" }} className="text-primary">
            Travelers
          </Form.Label>

          <div style={{ position: "relative" }}>
            <Form.Control
              readOnly
              value={value || "0"}
              size="sm"
              onClick={() => setOpen((o) => !o)}
              style={{ cursor: "pointer" }}
            />
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
            <h6 className="mb-3" style={{ fontSize: "13px" }}>
              Pax Details
            </h6>

            {PAX_ROWS.map(({ label, key }) => (
              <Form.Group className="mb-2" key={key}>
                <Row className="align-items-center">
                  <Col xs={8}>
                    <Form.Label style={{ fontSize: "12px", marginBottom: 0 }}>
                      {label}
                    </Form.Label>
                  </Col>
                  <Col xs={4}>
                    <Form.Control
                      type="number"
                      min={0}
                      value={counts[key]}
                      className="text-center"
                      size="sm"
                      onChange={(e) =>
                        handleCountChange(key, parseInt(e.target.value) || 0)
                      }
                    />
                  </Col>
                </Row>
              </Form.Group>
            ))}

            <Button
              variant="danger"
              className="w-100 mt-3"
              onClick={handleDone}
              style={{ border: "none", fontWeight: 500 }}
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </Col>
  );
}
