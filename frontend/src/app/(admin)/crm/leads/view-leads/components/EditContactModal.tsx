import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
import AddVisaCountry from "../AddVisaCountry";

type EditContactModalProps = {
    onClose: ()=>void;
}
const EditContactModal = ({onClose}:EditContactModalProps) => {
  return (
    <>
       <Modal show={true} onHide={onClose} size='lg' centered>
          <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title style={{ fontSize: "14px" }}>
        Edit Customer Contact
          </Modal.Title>

          <button
            onClick={onClose}
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

        {/* BODY */}
        <Modal.Body style={{ fontSize: "12px" }}>
          <Form>
            <Row className="mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Relation *
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select</option>
                  <option>Self</option>
                 
                </Form.Select>
              </Col>

               <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 CRM Lead Source
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select</option>
                  <option>Website</option>
                 <option>Agency</option>
                </Form.Select>
              </Col>


             <Col md={2}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Salutation *
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select</option>
                  <option>Mr.</option>
                  <option>Ms.</option>
                  <option>Miss</option>
                  <option>Mrs.</option>
                
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  First Name *
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Last Name *
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 Email
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>

                     <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 Alternate Email
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>

              <Col md={6}>
              <Form.Label
                    className="text-primary"
                    style={{ fontSize: "12px" }}
                    >Mobile Number *</Form.Label>
                    <div className="d-flex gap-2" style={{ fontSize: "12px" }}>
                        <Form.Control
                        value="+91"
                        readOnly
                        size="sm"
                        style={{ width: "30%" }}/>
                        <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </div>
              </Col>
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 Alternate Mobile
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>
            </Row>


            <Row className="mb-2">
                 <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Country *
                </Form.Label>
                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select</option>
                  <option>India.</option>
                  <option>Icland.</option>
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  State
                </Form.Label>
               
                 
                  <Form.Control size="sm" style={{ fontSize: "12px" }} />
                
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  City *
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>

              <Col md={6}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Pin/Zip Code
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Col>
            </Row>
             <AddVisaCountry/>

          </Form>
        </Modal.Body>

        {/* FOOTER */}
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={onClose}
            style={{ fontSize: "12px" }}
          >
            Cancel
          </Button>

          <Button variant="success" size="sm" style={{ fontSize: "12px" }}>
            <Icon icon="akar-icons:check" className="me-1" /> Submit
          </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default EditContactModal
