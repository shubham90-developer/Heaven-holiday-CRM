import React from 'react'
import { Button, Card, Col, Form, Row, Modal, CardHeader, CardBody } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomFlatpickr from '@/components/CustomFlatpickr';
const UpdateTicket = () => {
  return (
    <>
      <Card className="p-3">
        <Form>
        <Row className='mb-4 g-1'>
            <Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Title *
  </Form.Label>
  <Form.Control size="sm" style={{ fontSize: "10px" }} />
</Col>

{/* Email */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Email Id *
  </Form.Label>
  <Form.Control
    type="email"
    size="sm"
    style={{ fontSize: "10px" }}
  />
</Col>

{/* Mobile */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Mobile *
  </Form.Label>
  <Form.Control
    type="text"
    size="sm"
    style={{ fontSize: "10px" }}
  />
</Col>

{/* Travel Date */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Travel Date *
  </Form.Label>
  <CustomFlatpickr className='form-control form-control-sm' style={{ fontSize: "10px" }}/>
</Col>

{/* One Way / Return */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    One way / Return
  </Form.Label>
  <Form.Select size="sm" style={{ fontSize: "10px" }}>
    <option value="">Select</option>
    <option value="oneway">One Way</option>
    <option value="return">Return</option>
  </Form.Select>
</Col>

{/* Supplier */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Supplier *
  </Form.Label>
  <Form.Control
    size="sm"
    style={{ fontSize: "10px" }}
  />
</Col>

{/* Currency */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Currency *
  </Form.Label>
  <Form.Select size="sm" style={{ fontSize: "10px" }}>
    <option value="INR">INR</option>
    <option value="USD">USD</option>
  </Form.Select>
</Col>

{/* Cabin Class */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Cabin Class *
  </Form.Label>
  <Form.Select size="sm" style={{ fontSize: "10px" }}>
    <option value="economy">Economy</option>
    <option value="business">Business</option>
    <option value="first">First Class</option>
  </Form.Select>
</Col>
        </Row>
        </Form>
      
      <Card>
        <CardHeader className='bg-light p-2 ' style={{ fontSize: "10px", fontWeight:"bold" }}>BOM-BKK</CardHeader>
        <CardBody className='p-2'>
            <Row>
        <Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Flight Option
  </Form.Label>
  <Form.Select
    size="sm"
    style={{ fontSize: "10px" }}
 >
    <option>VietJet Air VJ-761 - 21-04-2026 00:55</option>
 </Form.Select>
</Col>

{/* PNR Number */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    PNR Number *
  </Form.Label>
  <Form.Control
    size="sm"
    style={{ fontSize: "10px" }}
  />
</Col>

{/* GDS PNR */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    GDS PNR
  </Form.Label>
  <Form.Control size="sm" style={{ fontSize: "10px" }} />
</Col>

{/* Booking Id */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Booking Id *
  </Form.Label>
  <Form.Control
    size="sm"
    style={{ fontSize: "10px" }}
  />
</Col>

{/* Check-in Luggage */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Check in Luggage *
  </Form.Label>
  <Form.Control
    type="number"
    size="sm"
    defaultValue="15"
    style={{ fontSize: "10px" }}
  />
</Col>

{/* Cabin Luggage */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Cabin Luggage *
  </Form.Label>
  <Form.Control
    type="number"
    size="sm"
    defaultValue="7"
    style={{ fontSize: "10px" }}
  />
</Col>

{/* Refundable */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Refundable *
  </Form.Label>
  <Form.Select size="sm" defaultValue="no" style={{ fontSize: "10px" }}>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </Form.Select>
</Col>

{/* Meal */}
<Col md={3}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Meal
  </Form.Label>
  <Form.Select size="sm" style={{ fontSize: "10px" }}>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </Form.Select>
</Col>
            </Row>

              <div className="table-responsive mt-3">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
             <th>Airlines *</th>
  <th>Flight No. *</th>
  <th>From Airport *</th>
  <th>From Terminal</th>
  <th>To Airport *</th>
  <th>To Terminal</th>
  <th>Dep. Date/Time *</th>
  <th>Arr. Date/Time *</th>
  <th>Hrs:Min *</th>
  <th>Action</th>
             </tr>
             </thead>
             <tbody>
                <tr>
                    <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                 <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                  <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                   <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                    <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                     <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                      <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                       <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                        <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                        <td><div className='d-flex flex-column align-items-center  '>
                            <Button variant='light' size='sm' style={{fontSize:"10px",fontWeight:"bold"}} ><Icon icon="mdi:plus"/></Button>
                        <span className='text-danger' style={{fontSize:"12px",cursor:"pointer"}}>AddOns</span>
                       </div>
                        </td>
                </tr>
                </tbody>
             </table>
             </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className='bg-light p-2 ' style={{ fontSize: "10px", fontWeight:"bold" }}>Passenger Details</CardHeader>
        <CardBody className='p-2'>

              <div className="table-responsive mt-3">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        <th>Salutation *</th>
  <th>First Name *</th>
  <th>Last Name *</th>
  <th>DOB</th>
  <th>Passport No.</th>
  <th>Expiry Date</th>
  <th>Ticket No.</th>
             </tr>
             <tr style={{fontSize:"10px"}}>
                <th colSpan={7}>ADULT 1</th>
             </tr>
             </thead>
             <tbody>
                <tr>
                    <td><Form.Select size='sm' style={{fontSize:"10px"}}>
                        <option>Mrs.</option>
                        </Form.Select></td>
                 <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                  <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                   <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                    <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                     <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                      <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                      
                </tr>
                </tbody>
             </table>
             </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className='bg-light p-2 ' style={{ fontSize: "10px", fontWeight:"bold" }}>Cost Details</CardHeader>
        <CardBody className='p-2'>

              <div className="table-responsive mt-3">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
       <th>
       </th>
         <th>Pax</th>
  <th>Cost (P.P.)</th>
  <th>Discount (P.P.)</th>
  <th>Markup (P.P.)</th>
  <th>GST</th>
  <th>SSR Price</th>
  <th>Total</th>
             </tr>
             </thead>
             <tbody>
                <tr style={{fontSize:"10px"}}>
                    <td>ADULT (+12 YRS)</td>
                    <td><Form.Select size='sm' style={{fontSize:"10px"}}>
                        <option>9</option>
                        </Form.Select></td>
                 <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                  <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                   <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                    <td><Form.Select size='sm' style={{fontSize:"10px"}}>
                        <option>On Markup</option></Form.Select></td>
                     <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                      <td><Form.Control size='sm' style={{fontSize:"10px"}}/></td>
                      
                </tr>
                <tr style={{fontSize:"10px"}}>
                      <td><b>Total Cost:</b></td>
  <td>9</td>
  <td>126000.00</td>
  <td>0.00</td>
  <td>1800.00</td>
  <td>324.00</td>
  <td>0</td>
  <td>128124.00</td>
                </tr>
                </tbody>
             </table>
             </div>
        </CardBody>
      </Card>

      <Row className='g-3'>
        <Col md={6}>
        <h6 style={{fontSize:"10px", fontWeight:"bold"}}>Fare Rules</h6>
        <Form.Control as="textarea" rows={3} size='sm'/>
        </Col>
        <Col md={6}>
        <h6 style={{fontSize:"10px", fontWeight:"bold"}}>Cancellation Policy</h6>
        <Form.Control as="textarea" rows={3} size='sm'/>
        </Col>
          <Col md={12}>
        <h6 style={{fontSize:"10px", fontWeight:"bold"}}>Internal Remarks</h6>
        <Form.Control as="textarea" rows={3} size='sm'/>
        </Col>
       
      </Row>

      <div className='d-flex justify-content-end gap-2 mt-3'>
          <Button
                                variant="outline-primary"
                                size="sm"
                                style={{ fontSize: "12px" }}
                              >
                               Preview
                              </Button>
          <Button
                                variant="danger"
                                size="sm"
                                style={{ fontSize: "12px" }}
                              >
                               Submit
                              </Button>
      </div>
      </Card>
    </>
  )
}

export default UpdateTicket
