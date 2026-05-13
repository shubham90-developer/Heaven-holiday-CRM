"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
const AddGuide = () => {
    const router=useRouter()
  return (
    <>
        <Card className="p-3">
            <Form>
                <Row className='mb-2'>
          <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Guide Name*
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Destination */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Destination*
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Mobile Number */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Mobile Number *
    </Form.Label>
    <div className="input-group input-group-sm">
      <span className="input-group-text">+91</span>
      <Form.Control style={{ fontSize: "10px" }} />
    </div>
  </Col>

  {/* Email */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      E-mail
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Languages Known */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Languages Known*
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Image */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Image
    </Form.Label>
    <Form.Control type="file" size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Short Description */}
  <Col md={6}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Short Description
    </Form.Label>
    <Form.Control
      as="textarea"
      rows={2}
      style={{ fontSize: "10px" }}
    />
  </Col>
                </Row>

        <strong style={{ fontSize: "10px" }}>Rates</strong>

      <div className="table-responsive my-2">
                        <table
                          className="table table-sm table-bordered mb-0 align-middle"
                          style={{ tableLayout: "fixed", width: "100%" }}
                        >
                          <thead>
                            <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
       <th style={{ width: "120px" }}>Currency</th>
<th style={{ width: "140px" }}>Per Day Rate</th>
<th style={{ width: "160px" }}>Overnight Charges</th>
<th style={{ width: "140px" }}>Mark Up Type</th>
<th style={{ width: "120px" }}>Mark Up</th>
<th style={{ width: "120px" }}>Taxes</th>
<th style={{ width: "140px" }}>Total</th>
 </tr>
              </thead>
              <tbody>
                <tr style={{fontSize:"12px"}}>
                <td>
                      <Form.Select size="sm" style={{ fontSize: "10px" }}>
                          <option>Select</option>
                          <option>INR</option>
                        </Form.Select>
                </td>
                <td>
             <Form.Control size="sm" style={{ fontSize: "10px" }} />
                </td>
               <td>
             <Form.Control size="sm" style={{ fontSize: "10px" }} />
                </td>
                  <td>
                      <Form.Select size="sm" style={{ fontSize: "10px" }}>
                          <option>Select</option>
                          <option>Percentage</option>
                        </Form.Select>
                </td>
                 <td>
             <Form.Control size="sm" style={{ fontSize: "10px" }} />
                </td>
                   <td>
             <Form.Control size="sm" style={{ fontSize: "10px" }} />
                </td>
                   <td>
             <Form.Control size="sm" style={{ fontSize: "10px" }} />
                </td>  
                  </tr>
      
              </tbody>
              </table>
              </div>
        <div className='d-flex justify-content-end gap-2'>
              <Button
              variant="outline-danger"
              size="sm"
              onClick={()=>router.push('/my-inventory/vehicles/manage-guide')}
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

export default AddGuide
