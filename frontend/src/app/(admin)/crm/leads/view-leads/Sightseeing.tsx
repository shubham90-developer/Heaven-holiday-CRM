import React from 'react'
import { useState } from "react";
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
const Sightseeing = () => {
    const [showSelect, setShowSelect] = useState(false);
  return (
    <>
      <div>
        <Form>
            <Row>
                  {/* Row 1 */}
  <Col md={6}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Destination *
    </Form.Label>
    <Form.Control size="sm" />
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Duration
    </Form.Label>
    <Form.Control size="sm" placeholder="No. of Days" />
  </Col>

  {/* Row 2 */}
  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Adults
    </Form.Label>
    <Form.Select size="sm">
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Children (0-12)
    </Form.Label>
    <Form.Select size="sm">
      <option>0</option>
      <option>1</option>
      <option>2</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Nationality
    </Form.Label>
    <Form.Select size="sm">
      <option>India</option>
    </Form.Select>
  </Col>


 

  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Lead Source *
    </Form.Label>
    <Form.Select size="sm">
      <option>Select</option>
    </Form.Select>
  </Col>

  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Add Remark
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "12px" }}/>
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
            <div className="text-end mt-3">
  <Button variant="danger" size="sm">
    Save & Continue
  </Button>
</div>
        </Form>
      </div>
    </>
  )
}

export default Sightseeing
