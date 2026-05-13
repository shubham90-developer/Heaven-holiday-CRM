"use client"


import CustomFlatpickr from "@/components/CustomFlatpickr";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

const B2COfflineTicketModal:React.FC = () =>{
      const [show,setShow]=useState<boolean>(false);
         const [type, setType] = useState("oneway");
        const handleClose =()=> setShow(false)
        const handleShow =() =>setShow(true)

        return(
            <>
             <Button
                            variant="primary"
                            size="sm"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                            onClick={handleShow}
                          >
                            <Icon icon="mdi:account-plus-outline" className="me-1" />
                           B2C Offline Ticket
                          </Button>

 <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header
                  style={{ background: "#274c6b", color: "#fff" }}
                  className="d-flex justify-content-between"
                >
                  <Modal.Title>Offline Ticket</Modal.Title>
        
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



                            <Col md={12}>
                          
                            <div className="d-flex gap-3 mt-3">
                            <Form.Check
                            type="radio"
                            label="One Way"
                            checked={type==="oneway"}
                            onChange={()=>setType("oneway")}
                            style={{fontSize:"10px"}}
                            className="text-primary"
                            />

                            <Form.Check
                                                type="radio"
                                                label="Round Trip"
                                                checked={type === "roundtrip"}
                                                onChange={() => setType("roundtrip")}
                                                style={{ fontSize: "10px" }}
                                                className="text-primary"
                                              />

                                               <Form.Check
                                                type="radio"
                                                label="Multi City"
                                                checked={type === "multicity"}
                                                onChange={() => setType("multicity")}
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
                                                Select Source City *
                                              </Form.Label>
                                              <Form.Control type="text" style={{ fontSize: "10px" }} />
                                            </Form.Group>
                                          </Col>
                      


    <Col md={6}>
    <Form.Group>
        <Form.Label
        style={{fontSize:"10px"}}
        className="text-primary"
        >Select Destination City *</Form.Label>
        <Form.Control
        type="email"
        placeholder="Email Id"
        style={{fontSize:"10px"}}
        />
        </Form.Group>
        </Col>

<Col md={6}>
<Form.Group>
    <Form.Label
    style={{fontSize:"10px"}}
    className="text-primary"
    >Departure Date</Form.Label>
   <CustomFlatpickr
   className="form-control"
   options={{enableTime:false}}
   style={{fontSize:"12px"}}
   />

    </Form.Group></Col>

    <Col md={6}>
<Form.Group>
    <Form.Label
    style={{fontSize:"10px"}}
    className="text-primary"
    >Return Date</Form.Label>
   <CustomFlatpickr
   className="form-control"
   options={{enableTime:false}}
   style={{fontSize:"12px"}}
   />

    </Form.Group></Col>


         <Col md={4}>
                        <Form.Group>
                          <Form.Label
                            style={{ fontSize: "10px" }}
                            className="text-primary"
                          >
                           Adults (+12 yrs)
                          </Form.Label>
                          <Form.Select style={{ fontSize: "10px" }}>
                            <option>Select</option>
                            <option>1.</option>
                            <option>2</option>
                            <option>3</option>
                       
                          </Form.Select>
                        </Form.Group>
                      </Col>

                     <Col md={4}>
                                    <Form.Group>
                                      <Form.Label
                                        style={{ fontSize: "10px" }}
                                        className="text-primary"
                                      >
                                       Child (2-11 yrs)
                                      </Form.Label>
                                      <Form.Select style={{ fontSize: "10px" }}>
                            <option>Select</option>
                            <option>0.</option>
                            <option>1.</option>
                            <option>2</option>
                            <option>3</option>
                       
                          </Form.Select>
                                    </Form.Group>
                                  </Col>

                                    <Col md={4}>
                                    <Form.Group>
                                      <Form.Label
                                        style={{ fontSize: "10px" }}
                                        className="text-primary"
                                      >
                                       Infant (0-2 yrs)
                                      </Form.Label>
                                      <Form.Select style={{ fontSize: "10px" }}>
                            <option>Select</option>
                            <option>0.</option>
                            <option>1.</option>
                            <option>2</option>
                            <option>3</option>
                       
                          </Form.Select>
                                    </Form.Group>
                                  </Col>

      <Col md={4}>
                                    <Form.Group>
                                      <Form.Label
                                        style={{ fontSize: "10px" }}
                                        className="text-primary"
                                      >
                                      Class
                                      </Form.Label>
                                      <Form.Select style={{ fontSize: "10px" }}>
                            <option>Select</option>
                            <option>Economy</option>
                            <option>Premium Economy</option>
                         
                       
                          </Form.Select>
                                    </Form.Group>
                                  </Col>

</Row>

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
        )
}
export default B2COfflineTicketModal;