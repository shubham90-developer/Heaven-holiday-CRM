import React from 'react'
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

type AddTaxModalProps ={
    onClose: () => void;
}
const AddTaxModal = ({onClose}:AddTaxModalProps) => {
  return (
    <div>
      <Modal show={true} onHide={onClose} centered size="lg">
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Tax Setting</Modal.Title>

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

        <Modal.Body>
         <Form>
            <Row>
                  <Col md={3}>
                                <Form.Label>Tax Label</Form.Label>
                                  <Form.Select style={{ fontSize: "10px" }}>
                                                  <option>GST</option>
                                                  <option>VAT</option>
                                                </Form.Select>
                              </Col>

                               <Col md={3}>
                                <Form.Label>Tax Name *</Form.Label>
                                <Form.Control
                                  type="text"
                           
                                  style={{ fontSize: "10px" }}
                                />
                              </Col>

                               <Col md={3}>
                                <Form.Label>Tax Percentage</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="0"
                                  style={{ fontSize: "10px" }}
                                />
                              </Col>

                               <Col md={3}>
                                <Form.Label>Tax Type *</Form.Label>
                             <Form.Select style={{ fontSize: "10px" }}>
                                              <option>On Total</option>
                                              <option>No Tax</option>
                                         
                                            </Form.Select>
                              </Col>
                
            </Row>
         </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" style={{ fontSize: "10px" }}>
        Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddTaxModal
