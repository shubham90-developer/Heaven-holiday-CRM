import React from 'react'

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";


type ViewSightseeingModalProps={
    onClose: () => void;
}

 const data = {
    country: "Sri Lanka",
    city: "Nuwara Eliya",
    name: "ravana lake",
    categoryGroup: "N/A",
    categoryType: "N/A",
    operatingTime: "",
    duration: "0",
    difficulty: "N/A",
    thingsToCarry: "NA",
  };

const ViewSightseeingModal = ({onClose}:ViewSightseeingModalProps) => {
  
  
    return (
    <>
        <Modal show={true} onHide={onClose} centered >
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>View Sightsseeing (Ravana Lake)</Modal.Title>

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
            <Row className="mb-3" style={{ fontSize: "10px" }}>
             <Col md={4} className='mb-2'>
           <div><strong>Country</strong></div>
           <div>{data.country}</div>
           
             </Col>
               <Col md={4} className='mb-2'>
           <div><strong>City</strong></div>
           <div>{data.city}</div>
           
             </Col>
               <Col md={4} className='mb-2'>
           <div><strong>Country</strong></div>
           <div>{data.country}</div>
           
             </Col>
               <Col md={4} className='mb-2'>
           <div><strong>Sightseeing Name</strong></div>
           <div>{data.name}</div>
           
             </Col>
               <Col md={4} className='mb-2'>
           <div><strong>Category Group Type</strong></div>
           <div>{data.categoryType}</div>
           
             </Col>
               <Col md={4} className='mb-2'>
  <div><strong>Operating Time</strong></div>
  <div>{data.operatingTime || "N/A"}</div>
</Col>

<Col md={4} className='mb-2'>
  <div><strong>Duration (In Mins)</strong></div>
  <div>{data.duration}</div>
</Col>

<Col md={4} className='mb-2'>
  <div><strong>Difficulty Level</strong></div>
  <div>{data.difficulty}</div>
</Col>

<Col md={4} className='mb-2'>
  <div><strong>Things to Carry</strong></div>
  <div>{data.thingsToCarry}</div>
</Col>
            </Row>
       
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewSightseeingModal
