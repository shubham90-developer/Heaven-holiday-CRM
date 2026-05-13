import React from 'react'
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

type CancelChargeModalProps ={
    onClose: () => void;
}
const CancelChargeModal = ({onClose}:CancelChargeModalProps) => {
  return (
    <>
         <Modal show={true} onHide={onClose} centered size="lg">
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Cancellation Charge</Modal.Title>

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
                                <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Supplier</Form.Label>
                                  <Form.Select style={{ fontSize: "10px" }}>
                                                  <option>GST</option>
                                                  <option>VAT</option>
                                                </Form.Select>
                              </Col>

                     <Col md={3}>
                                <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Service Type</Form.Label>
                                  <Form.Select style={{ fontSize: "10px" }}>
                                                  <option>Flight</option>
                                                  <option>Hotel</option>
                                                </Form.Select>
                              </Col>

          <Col md={3}>
                                <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Market Type</Form.Label>
                                  <Form.Select style={{ fontSize: "10px" }}>
                                                  <option>B2C</option>
                                                  <option>b2b</option>
                                                </Form.Select>
                              </Col>

  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Source Type</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Domestic</option>
      <option>International</option>
    </Form.Select>
  </Col>

  {/* Currency */}
  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Currency</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>INR</option>
      <option>USD</option>
    </Form.Select>
  </Col>

  {/* MarkUp Type */}
  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>MarkUp Type</Form.Label>
    <Form.Select style={{ fontSize: "10px" }}>
      <option>Fixed</option>
      <option>Percentage</option>
    </Form.Select>
  </Col>

  {/* Mark Up */}
  <Col md={3}>
    <Form.Label className='text-primary' style={{ fontSize: "10px" }}>Mark Up</Form.Label>
    <Form.Control
    
      style={{ fontSize: "10px" }}
    />
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
    </>
  )
}

export default CancelChargeModal
