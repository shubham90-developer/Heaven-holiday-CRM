"use client"


import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";


const leadSources = [
  { value: "4513", label: "Agency" },
  { value: "4514", label: "Website" },
  { value: "4515", label: "Facebook" },
  { value: "4516", label: "Tripsgateway" },
  { value: "4517", label: "Website B2B" },
  { value: "4518", label: "Proposal" },
  { value: "4519", label: "GTX Network" },
  { value: "4520", label: "GTX Network Web" },
  { value: "6888", label: "Instagram" },
  { value: "8412", label: "Old Customer" },
  { value: "8413", label: "Reference" },
  { value: "8414", label: "Walk-in" },
  { value: "8569", label: "RAJ SIR" },
  { value: "8570", label: "My Old Client" },
  { value: "8571", label: "Raj Sir Facebook" },
  { value: "8572", label: "3700" },
  { value: "8573", label: "AHH" },
  { value: "9102", label: "Expo Belavagi" },
  { value: "9116", label: "Expo Kolhapur" },
  { value: "9117", label: "Expo Sangli" },
  { value: "9288", label: "PUNE EXPO" },
  { value: "9345", label: "PRANAV SIR" },
  { value: "9346", label: "PRAJWAL SIR" },
  { value: "9347", label: "SANKET SIR" },
  { value: "9348", label: "SAIPRASAD SIR" },
  { value: "9349", label: "JUST DIAL" },
  { value: "9813", label: "KASTURI GROUP" },
  { value: "9817", label: "Pune Expo Jan 2026" },
  { value: "9917", label: "Varsha Bugade" },
  { value: "9940", label: "PRANEETA BUGADE" },
  { value: "9954", label: "Sangli Agri Pandhari" },
];
const B2CVoucherModal:React.FC = () =>{
    const [show,setShow]=useState<boolean>(false);
     const [leadSource, setLeadSource] = useState<string>("");
    const handleClose =()=> setShow(false)
    const handleShow =() =>setShow(true)

    return(
        <>
          <Button
                variant="outline-danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={handleShow}
              >
                <Icon icon="mdi:account-plus-outline" className="me-1" />
                B2C Voucher
              </Button>

              <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header
                          style={{ background: "#274c6b", color: "#fff" }}
                          className="d-flex justify-content-between"
                        >
                          <Modal.Title>Add Customer</Modal.Title>
                
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
                                        <Row className="g-1">
                                          {/* Email */}
                                          <Col md={12}>
                                            <Form.Group>
                                              <Form.Label
                                                className="text-primary"
                                                style={{ fontSize: "10px" }}
                                              >
                                                Email ID *
                                              </Form.Label>
                                              <Form.Control
                                                type="email"
                                                size="sm"
                                                style={{ fontSize: "10px", padding: "8px" }}
                                              />
                                            </Form.Group>
                                          </Col>
                            
                                          {/* Mobile */}
                                          <Col md={12}>
                                            <Form.Group>
                                              <Form.Label
                                                className="text-primary"
                                                style={{ fontSize: "10px" }}
                                              >
                                                Mobile Number *
                                              </Form.Label>
                            
                                              <InputGroup size="sm" style={{ fontSize: "10px" }}>
                                                <InputGroup.Text>🇮🇳 +91</InputGroup.Text>
                                                <Form.Control
                                                  type="text"
                                                  style={{ fontSize: "10px", padding: "8px" }}
                                                />
                                              </InputGroup>
                                            </Form.Group>
                                          </Col>
                            
                                          {/* Salutation + First Name */}
                                          <Col md={4}>
                                            <Form.Group>
                                              <Form.Label
                                                className="text-primary"
                                                style={{ fontSize: "10px" }}
                                              >
                                                Salutation
                                              </Form.Label>
                                              <Form.Select
                                                size="sm"
                                                style={{ fontSize: "10px", padding: "8px" }}
                                              >
                                                <option>Select</option>
                                                <option>Mr.</option>
                                                <option>Ms.</option>
                                                <option>Mrs.</option>
                                                <option>Miss</option>
                                                <option>Dr.</option>
                                              </Form.Select>
                                            </Form.Group>
                                          </Col>
                            
                                          <Col md={8}>
                                            <Form.Group>
                                              <Form.Label
                                                className="text-primary"
                                                style={{ fontSize: "10px" }}
                                              >
                                                First Name *
                                              </Form.Label>
                                              <Form.Control
                                                size="sm"
                                                style={{ fontSize: "10px", padding: "8px" }}
                                              />
                                            </Form.Group>
                                          </Col>
                            
                                          {/* Last Name */}
                                          <Col md={12}>
                                            <Form.Group>
                                              <Form.Label
                                                className="text-primary"
                                                style={{ fontSize: "10px" }}
                                              >
                                                Last Name
                                              </Form.Label>
                                              <Form.Control
                                                size="sm"
                                                style={{ fontSize: "10px", padding: "8px" }}
                                              />
                                            </Form.Group>
                                          </Col>
                            
                                          {/* Lead Source */}
                                          <Col md={12}>
                                            <Form.Group>
                                              <Form.Label
                                                className="text-primary"
                                                style={{ fontSize: "10px" }}
                                              >
                                                Lead Source
                                              </Form.Label>
                                              <Form.Select
                                                size="sm"
                                                value={leadSource}
                                                onChange={(e) => setLeadSource(e.target.value)}
                                                style={{ fontSize: "12px" }}
                                              >
                                                <option value="">Select Lead Source</option>
                            
                                                {leadSources.map((item) => (
                                                  <option key={item.value} value={item.value}>
                                                    {item.label}
                                                  </option>
                                                ))}
                                              </Form.Select>
                                            </Form.Group>
                                          </Col>
                            
                                          {/* Lead Stage */}
                                          <Col md={12}>
                                            <Form.Group>
                                              <Form.Label
                                                className="text-primary"
                                                style={{ fontSize: "10px" }}
                                              >
                                                Lead Stage
                                              </Form.Label>
                                              <Form.Select
                                                size="sm"
                                                style={{ fontSize: "10px", padding: "8px" }}
                                              >
                                                <option value="">Select Stage</option>
                                                <option value="45">Wrong Number</option>
                                                <option value="48">Can not be Contacted</option>
                                                <option value="49">Not Interested</option>
                                                <option value="47">Junk Lead</option>
                                                <option value="51">Lost Lead</option>
                                                <option value="161">Duplicate</option>
                                                <option value="53">New</option>
                                                <option value="52">Call Back</option>
                                                <option value="159">Destination Closed</option>
                                                <option value="162">Unanswered</option>
                                                <option value="163">Not Reachable</option>
                                              </Form.Select>
                                            </Form.Group>
                                          </Col>
                                        </Row>
                                      </Form>
                        </Modal.Body>

                          <Modal.Footer className="justify-content-between">
                                  <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={handleClose}
                                    style={{ fontSize: "10px" }}
                                  >
                                    Cancel
                                  </Button>
                        
                                  <Button variant="success" size="sm" style={{ fontSize: "10px" }}>
                                    <Icon icon="mdi:account-plus-outline" className="me-1" /> Submit
                                  </Button>
                                </Modal.Footer>
              </Modal>
        </>
    )
};
export default B2CVoucherModal;