"use client"

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const B2BVoucherModal = () =>{
     const [show, setShow] = useState<boolean>(false);
     const [type, setType] = useState("agency");
       const [showMore, setShowMore] = useState(false);
      const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button
      variant="outline-danger"
    size="sm"
    style={{fontSize:"10px", fontWeight: "bold"}}
    onClick={handleShow}
    >
         <Icon icon="mdi:account-plus-outline" className="me-1" />
         B2B Voucher
    </Button>

    <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header
                  style={{ background: "#274c6b", color: "#fff" }}
                  className="d-flex justify-content-between"
                >
                  <Modal.Title>Add-B2B-Agent</Modal.Title>
        
                  <button
                    onClick={handleClose}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-1 align-items-center">
                            <Col md={6}>
                            <Form.Label 
                            style={{fontSize:"10px"}}
                            className="text-primary"
                            >Type :</Form.Label>
                            <div className="d-flex gap-3">
                            <Form.Check
                            type="radio"
                            label="Agency"
                            checked={type==="agency"}
                            onChange={()=>setType("agency")}
                            style={{fontSize:"10px"}}
                            className="text-primary"
                            />

                            <Form.Check
                                                type="radio"
                                                label="Corporate"
                                                checked={type === "corporate"}
                                                onChange={() => setType("corporate")}
                                                style={{ fontSize: "10px" }}
                                                className="text-primary"
                                              />
                                              </div>
                            </Col>

                             <Col md={6}>
                                            <Form.Group>
                                              <Form.Label
                                                style={{ fontSize: "10px" }}
                                                className="text-primary"
                                              >
                                                Company Name *
                                              </Form.Label>
                                              <Form.Control type="text" style={{ fontSize: "10px" }} />
                                            </Form.Group>
                                          </Col>
                        </Row>

<Row className="mb-1">
    <Col md={6}>
    <Form.Group>
        <Form.Label
        style={{fontSize:"10px"}}
        className="text-primary"
        >Email Id *</Form.Label>
        <Form.Control
        type="email"
        placeholder="Email Id"
        style={{fontSize:"10px"}}
        />
        </Form.Group>
        </Col>

         <Col md={2}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            Salutation
                          </Form.Label>
                          <Form.Select style={{ fontSize: "10px" }}>
                            <option>Select</option>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                            <option>Miss.</option>
                            <option>Dr.</option>
                            <option>Prof.</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                     <Col md={4}>
                                    <Form.Group>
                                      <Form.Label
                                        style={{ fontSize: "10px" }}
                                        className="text-primary"
                                      >
                                        First Name
                                      </Form.Label>
                                      <Form.Control type="text" style={{ fontSize: "10px" }} />
                                    </Form.Group>
                                  </Col>

</Row>

<Row className="mb-1">
     <Col md={6}>
                    <Form.Group>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Last Name
                      </Form.Label>
                      <Form.Control type="text" style={{ fontSize: "10px" }} />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                  <Form.Group>
                    <Form.Label>&nbsp;</Form.Label>
                    <Form.Control
                    value="+91"
                    readOnly
                    style={{fontSize:"10px"}}
                    />
                    </Form.Group></Col>

                    <Col md={4}>
                     <Form.Group>
                                      <Form.Label
                                        style={{ fontSize: "10px" }}
                                        className="text-primary"
                                      >
                                        Mobile Number *
                                      </Form.Label>
                                      <Form.Control type="text" style={{ fontSize: "10px" }} />
                                    </Form.Group>
                    </Col>
</Row>

<Row className="mb-1">
    <Col md={6}>
    <Form.Group>
           <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            RM
                          </Form.Label>
                           <Form.Select style={{ fontSize: "10px" }}>
                                              <option>RAJENDRA BUGADE</option>
                                            </Form.Select>
        </Form.Group>
         </Col>


</Row>

{/*Show more toggle */}

<div className="mb-2"
    style={{ color: "#ff6600", cursor: "pointer", fontSize: "10px" }}
    onClick={()=> setShowMore(!showMore)}>
        {showMore ? "Show Less": "Show More"}
</div>

{showMore && (
    <>
     <Row className="mb-1">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            Country
                          </Form.Label>
                          <Form.Control type="text" style={{ fontSize: "10px" }} />
                        </Form.Group>
                      </Col>
    
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            State
                          </Form.Label>
                          <Form.Control type="text" style={{ fontSize: "10px" }} />
                        </Form.Group>
                      </Col>
                    </Row>
    
                    <Row className="mb-1">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            City
                          </Form.Label>
                          <Form.Control type="text" style={{ fontSize: "10px" }} />
                        </Form.Group>
                      </Col>
    
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            Area
                          </Form.Label>
                          <Form.Control type="text" style={{ fontSize: "10px" }} />
                        </Form.Group>
                      </Col>
                    </Row>
    
                    <Row className="mb-1">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            Pincode
                          </Form.Label>
                          <Form.Control type="text" style={{ fontSize: "10px" }} />
                        </Form.Group>
                      </Col>
    
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                            Address
                          </Form.Label>
                          <Form.Control type="text" style={{ fontSize: "10px" }} />
                        </Form.Group>
                      </Col>
                    </Row>
    </>
)}

<Form.Group>
     <Form.Label style={{ fontSize: "10px" }} className="text-primary">
                    Remarks
                  </Form.Label>
    <Form.Control
    as="textarea"
    rows={3}
    style={{fontSize:"10px"}}
    />
</Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                    variant="outline-danger"
                    onClick={handleClose}
                    style={{fontSize:"10px"}}
                    >Cancel</Button>

                      <Button variant="success" style={{ fontSize: "10px" }}>
                                Submit
                              </Button>
                </Modal.Footer>
    </Modal>
    </>
  );
};

export default B2BVoucherModal;