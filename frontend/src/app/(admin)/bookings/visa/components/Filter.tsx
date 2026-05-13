"use client"

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

import  Offcanvas from "react-bootstrap/Offcanvas";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import CustomFlatpickr from "@/components/CustomFlatpickr";

function OffCanvasExample({name, ...props}:any){
    const [show, setShow]=useState(false);

    const handleClose = ()=> setShow(false);
    const handleShow = ()=> setShow(true);

    return (
        <>
          <Button
                variant="outline-primary"
                onClick={handleShow}
                className="me-2"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                <Icon icon="tabler:filter" width="12" /> {name}
              </Button>

              <Offcanvas 
              show={show}
              onHide={handleClose}
              placement="end"
              style={{width:"900px"}}
              >
                <Offcanvas.Header
                style={{
                    background: "#274c6b",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
                >
                    <Offcanvas.Title>
                        <Icon icon="tabler:filter" className="me-2"/>
                        Filter Results
                    </Offcanvas.Title>

                    <button
                    onClick={handleClose}
                    style={{
                        background:"transparent",
                        border:"none",
                        color:"#fff",
                        fontSize:"18px",
                        cursor: "ponter",
                    }}
                    >
                         ✕
                    </button>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Row className="g-3">
                     <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Proposal ID
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Passport Number */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Passport Number
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Customer Name */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Customer Name
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Agency Name */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Agency Name
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Email */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        E-Mail
      </Form.Label>
      <Form.Control type="email" size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Mobile Number */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Mobile Number
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Ops User */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Ops User
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Status */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Status
      </Form.Label>
      <Form.Select size="sm" style={{ fontSize: "12px" }}>
        <option>-- Select --</option>
        <option>Active</option>
        <option>Pending</option>
        <option>Completed</option>
      </Form.Select>
    </Form.Group>
  </Col>

  {/* Travel Date */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Travel Date
      </Form.Label>
      <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Booking Date From */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Booking From Date
      </Form.Label>
      <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Booking Date To */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Booking To Date
      </Form.Label>
      <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Travel From Date */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Travel From Date
      </Form.Label>
      <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

  {/* Travel To Date */}
  <Col md={3}>
    <Form.Group>
      <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
        Travel To Date
      </Form.Label>
      <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
    </Form.Group>
  </Col>

                    </Row>

                    <div style={{borderTop: "1px dotted #000"}} className="mt-5"></div>
                      <div className="d-flex justify-content-end mt-1 gap-2">
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  style={{ fontSize: "12px", fontWeight: "bold" }}
                                >
                                  Reset
                                </Button>
                    
                                <Button
                                  variant="success"
                                  size="sm"
                                  style={{ fontSize: "12px", fontWeight: "bold" }}
                                >
                                  <Icon
                                    icon="tabler:search"
                                    className="me-1"
                                    style={{ fontSize: "12px" }}
                                  />
                                  Filter
                                </Button>
                              </div>
                </Offcanvas.Body>
              </Offcanvas>
        </>
    )
}

function Filter(){
    return (
        <>
        <OffCanvasExample placement="end" name="Filter"/>
        </>
    )
}

export default Filter;