import React from 'react'
import { useState } from 'react';
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
const Miscellaneous = () => {
    const [showSelect, setShowSelect] = useState(false);

  return (
    <>
      <div>
        <Form>
            <Row>
                <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Service *
    </Form.Label>
    <Form.Select size="sm">
      <option>Select</option>
      <option>Others</option>
      <option>Hotels</option>
    </Form.Select>
  </Col>

  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Destination *
    </Form.Label>
    <Form.Control size="sm" />
  </Col>

  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Select Date *
    </Form.Label>
    <Form.Control type="date" size="sm" />
  </Col>

  {/* Row 2 */}
  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Count *
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" />
  </Col>

  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Lead Source *
    </Form.Label>
    <Form.Select size="sm">
      <option>Select</option>
      <option>Website</option>
      <option>Agency</option>
      <option>Facebook</option>
    </Form.Select>
  </Col>

  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Add Remark
    </Form.Label>
    <Form.Control  size="sm" style={{ fontSize: "12px" }} />
  </Col>

  {/* Row 3 */}
  <Col md={4}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Assign To Sales
    </Form.Label>
    <Form.Select size="sm">
      <option>Self</option>
      <option>Rajendra Bugade</option>
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
    Save Query
  </Button>
</div>
        </Form>
      </div>
    </>
  )
}

export default Miscellaneous
