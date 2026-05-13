"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";

const AddDriver = () => {
    const router=useRouter()
  return (
    <>
       <Card className="p-3">
            <Form>
                <Row>
  {/* Driver Name */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Driver Name*
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Mobile Number */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Mobile Number *
    </Form.Label>
    <div className="d-flex">
      <span className="input-group-text" style={{ fontSize: "10px" }}>+91</span>
      <Form.Control size="sm" style={{ fontSize: "10px" }} />
    </div>
  </Col>

  {/* Email */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      E-mail
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Languages */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Languages*
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Address */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Address
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Country */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Country*
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Select Country</option>
      <option>India</option>
      <option>USA</option>
    </Form.Select>
  </Col>

  {/* City */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      City*
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Select City</option>
      <option>Mumbai</option>
      <option>Pune</option>
    </Form.Select>
  </Col>

  {/* Driving License */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Driving License
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Primary Vehicle */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Primary Vehicle
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>Car 1</option>
      <option>Car 2</option>
    </Form.Select>
  </Col>

  {/* Image */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Image
    </Form.Label>
    <Form.Control type="file" size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Remark */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Remark
    </Form.Label>
    <Form.Control as="textarea" rows={2} style={{ fontSize: "10px" }} />
  </Col>

                </Row>
        <div className='d-flex justify-content-end gap-2'>
              <Button
              variant="outline-danger"
              size="sm"
              onClick={()=>router.push('/my-inventory/vehicles/manage-driver')}
              style={{ fontSize: "12px" }}
            >
            Cancel
            </Button>
              <Button
              variant="success"
              size="sm"
              style={{ fontSize: "12px" }}
            >
             Save
            </Button>
        </div>
            </Form>
      </Card>
    </>
  )
}

export default AddDriver
