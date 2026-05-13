import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

type AddVisitModalProps = {
    onClose: () => void;
}
const AddVisitModal = ({onClose}: AddVisitModalProps) => {
  return (
    <>
       <Modal show={true} onHide={onClose} size="sm" centered>
             <Modal.Header
                style={{ background: "#274c6b", color: "#fff" }}
                className="d-flex justify-content-between"
              >
                <Modal.Title style={{ fontSize: "14px" }}>
               Add Have Been To
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
              <Modal.Body style={{ fontSize: "12px" }}>
                  <Form>
                     <Col md={12}>
                     <Form.Label
                          className="text-primary"
                          style={{ fontSize: "12px" }}
                          >Select Country</Form.Label>
                          <Form.Select size="sm" style={{ fontSize: "12px" }}>
                          <option>Select</option>
                          <option>India</option>
                          <option>Dubai</option>
                          </Form.Select>
                     </Col>
                     <Col md={12} className="mt-2">
                        <Form.Label
                        className="text-primary"
                        style={{ fontSize: "12px" }}
                      >
                      City
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                     </Col>

                      <Col md={12}>
                     <Form.Label
                          className="text-primary"
                          style={{ fontSize: "12px" }}
                          >Select Hotel Type</Form.Label>
                          <Form.Select size="sm" style={{ fontSize: "12px" }}>
                          <option>Select</option>
                          <option>Up to 1*</option>
                          <option>Up to 5*</option>
                          </Form.Select>
                     </Col>
                     <Col md={12} className="mt-2">
                        <Form.Label
                        className="text-primary"
                        style={{ fontSize: "12px" }}
                      >
                     Year
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                     </Col>
                  </Form>
                  </Modal.Body>
      
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

export default AddVisitModal
