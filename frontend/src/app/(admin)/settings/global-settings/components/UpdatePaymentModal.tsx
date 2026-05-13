import React from 'react'
import { Row, Col, Form, Button, InputGroup, Modal } from "react-bootstrap";

type UpdatePaymentModalProps={
    onClose : () => void;
}
const UpdatePaymentModal = ({onClose} : UpdatePaymentModalProps) => {

  return (
    <>
         <Modal show={true} onHide={onClose} centered >
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Complete Your Payment Settings</Modal.Title>

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
         
            {/* Row 1 */}
            <Row className=" gap-1" style={{ fontSize: "10px" }}>
            <Col md={6}>
             <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select</option>
                  <option >ATOM</option>
                </Form.Select>
            </Col>

              <Col md={6}>
              <Form.Select size="sm" style={{ fontSize: "12px" }}>
                              <option>Select</option>
                              <option >PROD</option>
                              </Form.Select>
            </Col>

              <Col md={6}>
             <Form.Select size="sm" style={{ fontSize: "12px" }}>
                  <option>Select </option>
                  <option >Activate</option>
                
                </Form.Select>
            </Col>

   <Col md={6}>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                 Marchant ID
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
          
            </Col>

            </Row>
       
        </Modal.Body>
        <Modal.Footer>
            <div className='text-end'>
                <Button variant='danger' size='sm' style={{ fontSize: "12px" }}>Submit</Button>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdatePaymentModal
