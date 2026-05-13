"use client";
import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tabs,
  Tab,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
  CardFooter,
} from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import CustomFlatpickr from '@/components/CustomFlatpickr';
const AddInventoryBooking = () => {
  const router=useRouter()
  return (
    <>
      <Card className='p-3'>
        <Row className='mb-3'>
            <Col md={3}>
            <div style={{fontSize:"12px"}}>
                <strong>Package Name :{" "}</strong>
                <span>KASHI</span>
            </div>
            </Col>
                        <Col md={3}>
            <div style={{fontSize:"12px"}}>
                <strong>Package Id :{" "}</strong>
                <span>113780</span>
            </div>
            </Col>
                        <Col md={3}>
            <div style={{fontSize:"12px"}}>
                <strong>Travel Date :{" "}</strong>
                <span>26/08/2026</span>
            </div>
            </Col>
                        <Col md={3}>
            <div style={{fontSize:"12px"}}>
                <strong>Destination :{" "}</strong>
                <span>Mumbai</span>
            </div>
            </Col>
        </Row>

      <div style={{fontSize:"12px"}}><strong>Add Booking</strong></div>
      <Form>
        <Row className='mb-3'>
           <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Market Place *</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>B2C</option>
      <option>B2B</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Email *</Form.Label>
    <Form.Control
      type="email"
      style={{ fontSize: "10px" }}
    />
  </Col>

  <Col md={2}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Salutation *</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>Mr</option>
      <option>Ms</option>
      <option>Mrs</option>
    </Form.Select>
  </Col>

  <Col md={4}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>First Name *</Form.Label>
    <Form.Control
      type="text"
      style={{ fontSize: "10px" }}
    />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Last Name *</Form.Label>
    <Form.Control
      type="text"
      style={{ fontSize: "10px" }}
    />
  </Col>

  <Col md={2}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Mobile Code</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>+91</option>
      <option>+1</option>
      <option>+44</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Mobile Number *</Form.Label>
    <Form.Control
      type="text"
      style={{ fontSize: "10px" }}
    />
  </Col>

  <Col md={4}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Lead Source</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>Agency</option>
      <option>Website</option>
      <option>Referral</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label  className='text-primary' style={{ fontSize: "10px" }}>Plan Type</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>Package</option>
      <option>Custom</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label  className='text-primary' style={{ fontSize: "10px" }}>Travelers</Form.Label>
    <Form.Control
      type="number"
      style={{ fontSize: "10px" }}
    />
  </Col>

        </Row>
      </Form>

    <div className='border p-3'>
        <div style={{fontSize:"12px"}}><strong>Enter PAX Details</strong></div>
      <Form>
        <Row className='mb-3'>
            <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Relation</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Self</option>
      <option>Spouse</option>
      <option>Child</option>
      <option>Other</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Salutation</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>Mr</option>
      <option>Ms</option>
      <option>Mrs</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>First Name *</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Last Name</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>DOB</Form.Label>
<CustomFlatpickr className='form-control form-control-sm'/>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Passport No.</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Expiry Date</Form.Label>
   <CustomFlatpickr className='form-control form-control-sm'/>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>City</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Country</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>State</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Zip / Postal Code</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={6}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Address</Form.Label>
    <Form.Control as="textarea" rows={2} style={{ fontSize: "10px" }} />
  </Col>

        </Row>
      </Form>

      <Accordion className='mb-3' >
        <AccordionItem eventKey='1' >
          <AccordionHeader>Traveller 2</AccordionHeader>
          <AccordionBody>
            <Row className='g-2'>
                <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Relation</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Others</option>
      <option>Self</option>
      <option>Spouse</option>
      <option>Child</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Salutation</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>Mr</option>
      <option>Ms</option>
      <option>Mrs</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>First Name *</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Last Name</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Email Id</Form.Label>
    <Form.Control type="email" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>DOB</Form.Label>
   <CustomFlatpickr className='form-control form-control-sm'/>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Passport No.</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Expiry Date</Form.Label>
    <CustomFlatpickr className='form-control form-control-sm'/>
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>City</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Country</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>State</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Zip / Postal Code</Form.Label>
    <Form.Control type="text" style={{ fontSize: "10px" }} />
  </Col>

  <Col md={6}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Address</Form.Label>
    <Form.Control as="textarea" rows={2} style={{ fontSize: "10px" }} />
  </Col>

            </Row>
          </AccordionBody>
        </AccordionItem>
      </Accordion>

       <div style={{fontSize:"12px"}}><strong>Enter Payment Details</strong></div>
    <div className="table-responsive mt-2">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>

      {/* Currency + Payment Mode */}
      <tr style={{ fontSize: "10px" }}>
        <th colSpan={2}>Currency</th>
        <th colSpan={2}>
          <Form.Select style={{ fontSize: "10px" }}>
            <option>HKD</option>
            <option>INR</option>
            <option>USD</option>
          </Form.Select>
        </th>

        <th colSpan={2}>Payment Mode</th>
        <th colSpan={2}>
          <Form.Select style={{ fontSize: "10px" }}>
            <option>Draft</option>
            <option>Cash</option>
            <option>Online</option>
          </Form.Select>
        </th>
      </tr>

      {/* Header Row */}
      <tr style={{ fontSize: "10px" }}>
        <th>Service</th>
        <th>Cost</th>
        <th>Markup</th>
        <th>Extra Markup</th>
        <th>Discount</th>
        <th>Tax</th>
        <th>Tax Amount</th>
        <th>Total Cost</th>
      </tr>
    </thead>

    <tbody>
      {/* Data Row */}
      <tr style={{ fontSize: "10px" }}>
        <td>Land Package</td>

        <td>
          <Form.Control
            type="number"
            defaultValue="44982"
            style={{ fontSize: "10px" }}
          />
        </td>

        <td>
          <Form.Control
            type="number"
            defaultValue="5000"
            style={{ fontSize: "10px" }}
          />
        </td>

        <td>
          <Form.Control
            type="number"
            defaultValue="0"
            style={{ fontSize: "10px" }}
          />
        </td>

        <td>
          <Form.Control
            type="number"
            defaultValue="0"
            style={{ fontSize: "10px" }}
          />
        </td>

        <td>
          <Form.Select style={{ fontSize: "10px" }}>
            <option>Tax Extra with text</option>
            <option>GST 5%</option>
            <option>GST 12%</option>
          </Form.Select>
        </td>

        <td>
          <Form.Control
            type="number"
            defaultValue="0"
            style={{ fontSize: "10px" }}
          />
        </td>

        <td>
          <Form.Control
            type="number"
            defaultValue="49982"
            style={{ fontSize: "10px" }}
          />
        </td>
      </tr>

    </tbody>
  </table>
</div>
    

       

     <div className="table-responsive my-3">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>

      {/* Currency + Payment Mode */}
      <tr style={{ fontSize: "10px" }}>
    <th>Final Sale Price</th>
    <th>Advance</th>
    <th>Total Balance</th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td>   <Form.Control
            style={{ fontSize: "10px" }}
          /></td>
          <td>   <Form.Control
            style={{ fontSize: "10px" }}
          /></td>
          <td>   <Form.Control
            style={{ fontSize: "10px" }}
          /></td>
        </tr>
      </tbody>
      </table>
      </div>

         <div style={{fontSize:"12px"}}><strong>Add EMI</strong></div>
<Row className='my-2'>
  <Col md={3}>
       <div style={{fontSize:"12px", fontWeight:"bold"}}>Total Amount : INR 49982/-</div>
        </Col>
        <Col md={3}>
         <div style={{fontSize:"12px", fontWeight:"bold"}}>Advance Received : 0/-</div>
</Col>
</Row>
<Row className='mb-2 align-items-center'>
  <Col md={3}>
     
                  <Form.Label
                                         style={{ fontSize: "10px" }}
                                         className="fw-bold"
                                       >
                                        1st EMI Date :
                                       </Form.Label>
                 <Form.Control  size="sm" style={{ fontSize: "12px" }} />
               
        </Col>
        <Col md={3}>
       <Form.Label
                                         style={{ fontSize: "10px" }}
                                         className="fw-bold"
                                       >
                                        Amount :
                                       </Form.Label>
                 <Form.Control  size="sm" style={{ fontSize: "12px" }} />
               
</Col>
<Col md={3}>
 <Button variant="outline-primary" size="sm" 
          style={{ fontSize: "10px", fontWeight: "bold" }}>
           Add
          </Button>
</Col>
</Row>
<Row className='mb-2'>
  <Col md={3}>
       <div style={{fontSize:"12px", fontWeight:"bold"}}>Balance Amount: INR 49982/-</div>
        </Col>
         <Col md={3}>
       <div style={{fontSize:"12px", fontWeight:"bold"}}>Send Reminders</div>
        </Col>
    <Col md={3}>
     <Form.Check type="checkbox" style={{ fontSize: "12px" }} />
    </Col>

</Row>
<Row>

</Row>
</div>

<CardFooter>
  <div className='d-flex gap-2 justify-content-end'>
      <Button variant="outline-danger" size="sm" 
            onClick={() => router.push("/my-inventory/group-departure/bookings")}
              style={{ fontSize: "10px", fontWeight: "bold" }}>
               Back
              </Button>
                <Button variant="danger" size="sm" 
                        style={{ fontSize: "10px", fontWeight: "bold" }}>
                          Submit
                        </Button>
  </div>
</CardFooter>
      </Card>
    </>
  )
}

export default AddInventoryBooking
