import React from 'react'
import { useState } from 'react';
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
const Hotel = () => {
     const [open, setOpen] = useState(false);
     const [requirementType, setRequirementType] = useState("package");
    const [showSelect, setShowSelect] = useState(false);
  return (
    <>
    <div>
      <Form>
        <Row>
              <Col md={6}>
    <Form.Label className="text-primary"  style={{ fontSize: "10px" }}>
      Destination *
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "12px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Check In *
    </Form.Label>
    <Form.Control type="date" size="sm" />
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Check Out *
    </Form.Label>
    <Form.Control type="date" size="sm" />
  </Col>

  {/* Row 2 */}
  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Nights *
    </Form.Label>
    <Form.Control size="sm" defaultValue="1" />
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Nationality
    </Form.Label>
    <Form.Select size="sm">
      <option>India</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Travelers
    </Form.Label>
    <Form.Select size="sm">
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Star Rating
    </Form.Label>
    <Form.Select size="sm">
      <option>Any</option>
      <option>3 Star</option>
      <option>4 Star</option>
      <option>5 Star</option>
    </Form.Select>
  </Col>

  {/* Row 3 */}
  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Food Preference
    </Form.Label>
    <Form.Control placeholder="Food Preference" size="sm" />
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Lead Source *
    </Form.Label>
    <Form.Select size="sm">
      <option>Select</option>
    </Form.Select>
  </Col>

  <Col md={6}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Add Remarks
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "12px" }} />
  </Col>

  {/* Row 4 */}
  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Assign To Sales
    </Form.Label>
    <Form.Select size="sm">
      <option>Self</option>
    </Form.Select>
  </Col>

  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Assign To Ops
    </Form.Label>

    <div className="d-flex align-items-center gap-2">
      <Form.Check
        type="checkbox"
        onChange={(e) => setShowSelect(e.target.checked)}
      />

      {showSelect && (
        <Form.Select size="sm">
          <option>Select</option>
          <option>Ops 1</option>
          <option>Ops 2</option>
        </Form.Select>
      )}
    </div>
  </Col>

        </Row>
        <div className="text-end ">
  <Button variant="danger" size="sm">
    Save & Continue
  </Button>
</div>
      </Form>

      </div>
    </>
  )
}

export default Hotel
