import React from 'react'

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

type AddDetailModalProps={
    onClose: () => void;
}

const AddDetailModal = ({onClose}: AddDetailModalProps) => {
  return (
    <>
        <Modal show={true} onHide={onClose} centered >
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Add Sightseeing Detail (Using Google or Manually)</Modal.Title>

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
           
             <Col md={12} className='mb-2'>
           <Form.Label>Sightseeing Name</Form.Label>
                         <Form.Control
                           type="text"
                           placeholder="Enter a location"
                           style={{ fontSize: "10px" }}
                         />
             </Col>
             
       
        </Modal.Body>
         <Modal.Footer>
                  <Button variant="danger" style={{ fontSize: "10px" }}>
                   Add Manually
                  </Button>
                  <Button variant="outline-danger" 
                  onClick={onClose}
                  style={{ fontSize: "10px" }}>
                    Close
                  </Button>
                </Modal.Footer>
             
      </Modal>
    </>
  )
}

export default AddDetailModal

