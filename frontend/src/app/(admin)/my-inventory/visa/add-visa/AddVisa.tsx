"use client";
import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import { useRouter } from 'next/navigation';

const AddVisa = () => {
    const router=useRouter()
    const [addservice, setAddService]=useState(1)
  return (
    <>
      <Card className='p-3'>
            <div className='text-end'>
            <Button
                                  variant="primary"
                                  size="sm"
                          onClick={() => router.push("/my-inventory/visa")}
                                  style={{ fontSize: "10px", fontWeight: "bold" }}
                                >
                      <Icon icon="mdi:eye" className='me-1'   />       My Visa
                                </Button>      
            </div>
            <hr/>
        <Form>
            <Row >
         <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
        Travelers Nationality
      </Form.Label>
      <Form.Select size="sm" style={{ fontSize: "10px" }}>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
      </Form.Select>
  </Col>

  {/* Countries Covered */}
  <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
        Countries Covered
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px" }} placeholder="Enter Countries" />
  </Col>
            </Row>

<div className='my-3 border p-3'>
    <Row className="g-2">

  {/* Visa Name */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Visa Name *
    </Form.Label>
    <Form.Control size="sm" placeholder="Visa Name" style={{ fontSize: "10px" }} />
  </Col>

  {/* Visa Type */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Visa Type
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Select</option>
      <option>e Visa</option>
      <option>Sticker Visa</option>
    </Form.Select>
  </Col>

  {/* Visa Category */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Visa Category
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Tourism</option>
      <option>Business</option>
    </Form.Select>
  </Col>

  {/* Entry Type */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Entry Type
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>Single Entry</option>
      <option>Multiple Entry</option>
    </Form.Select>
  </Col>

  {/* Processing Time */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Processing Time
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Passport Expire */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Passport Expire (Days)
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Validity */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Validity of Visa (Days)
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Duration */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Duration
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "10px" }} />
  </Col>

  {/* Supplier */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Supplier
    </Form.Label>
    <Form.Control size="sm" placeholder="Supplier" style={{ fontSize: "10px" }} />
  </Col>

  {/* Currency */}
  <Col md={4}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Embassy Fee Currency
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option>INR</option>
      <option>USD</option>
    </Form.Select>
  </Col>

  {/* Adult */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Adult
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

  {/* Child */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Child
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

  {/* Child Age */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Child Age
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

  {/* Infant */}
  <Col md={2}>
    <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
      Infant
    </Form.Label>
    <Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px" }} />
  </Col>

</Row>
</div>


   <strong style={{ fontSize: "10px"}}>Add Markup</strong>

   <div className="table-responsive my-2">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        <th style={{ width: "150px" }}>Market Place</th>
        <th style={{ width: "120px" }}>Currency</th>
        <th style={{ width: "150px" }}>Mark Up Type</th>
        <th style={{ width: "120px" }}>Adult</th>
        <th style={{ width: "120px" }}>Child</th>
        <th style={{ width: "120px" }}>Infant</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "10px" }}>
      <tr>
        <td>MY B2C</td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>INR</option>
          </Form.Select>
        </td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>Amount</option>
            <option>Percentage</option>
          </Form.Select>
        </td>

        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}} /></td>
        <td><Form.Control size="sm" defaultValue="0"  style={{ fontSize: "10px"}}/></td>
        <td><Form.Control size="sm" defaultValue="0"  style={{ fontSize: "10px"}}/></td>
      </tr>

      <tr>
        <td>MY B2B</td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>INR</option>
          </Form.Select>
        </td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>Amount</option>
            <option>Percentage</option>
          </Form.Select>
        </td>

        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}}/></td>
        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}} /></td>
        <td><Form.Control size="sm" defaultValue="0" style={{ fontSize: "10px"}} /></td>
      </tr>
    </tbody>
  </table>
</div>

<strong  style={{ fontSize: "10px"}}>Add Service Provider</strong>
       
       <div className="table-responsive my-2">
  <table
    className="table table-sm table-bordered mb-0 align-middle"
    style={{ tableLayout: "fixed", width: "100%" }}
  >
    <thead>
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        <th style={{ width: "80px" }}>Display</th>
        <th style={{ width: "200px" }}>Service Name</th>
        <th style={{ width: "120px" }}>Currency</th>
        <th style={{ width: "150px" }}>Fees</th>
        <th style={{ width: "150px" }}>Markup</th>
        <th style={{ width: "80px" }}>Taxable</th>
        <th style={{ width: "80px" }}>Action</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "10px" }}>
        { [ ...Array(addservice)].map((_, index) => (
      <tr key={index}>
        <td>
          <Form.Check type="checkbox" />
        </td>

        <td>
          <Form.Control size="sm" placeholder="Enter Title" style={{ fontSize: "10px"}} />
        </td>

        <td>
          <Form.Select size="sm" style={{ fontSize: "10px"}}>
            <option>INR</option>
          </Form.Select>
        </td>

        <td>
          <Form.Control size="sm" placeholder="Enter value" style={{ fontSize: "10px"}} />
        </td>

        <td>
          <Form.Control size="sm" placeholder="Enter value" style={{ fontSize: "10px"}} />
        </td>

        <td className="text-center">
          <Form.Check type="checkbox" style={{ fontSize: "10px"}} />
        </td>

        <td className="text-center">
          <Button variant="outline-danger" 
           onClick={()=>setAddService(addservice - 1)}
          size="sm" style={{ fontSize: "10px"}}>-</Button>
        </td>
      </tr>
        ))}
    </tbody>
  </table>

  {/* Add More Button */}
  <div className="d-flex justify-content-end mt-2">
    <Button size="sm" 
    style={{ fontSize: "10px"}}
    onClick={()=>setAddService(addservice + 1)}
    variant="outline-danger">
      Add More
    </Button>
  </div>
</div>

<div className='text-end mt-3'>
    <Button size="sm" 
    style={{ fontSize: "10px",fontWeight:"bold"}}
    variant="success">
   Save
    </Button>
</div>
        </Form>
        </Card>
    </>
  )
}

export default AddVisa
