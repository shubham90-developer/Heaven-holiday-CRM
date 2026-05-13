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
    details:"Disneyland Paris, originally Euro Disney Resort, is an entertainment resort in Marne-la-VallÃ©e, a new town located 32 km (20 mi) east of the centre of Paris, and is the most visited theme park in all of Europe. It is owned and operated by The Walt Disney Company and is the only resort outside of the United States to be. The resort covers 4,800 acres (19 km2)[3] and encompasses two theme parks, many resort hotels, a shopping, dining, and entertainment complex, and a golf course, in addition to several additional recreational and entertainment venues. Disneyland Park is the original theme park of the complex, opening with the resort on 12 April 1992. A second theme park, Walt Disney Studios Park, opened in 2002. The resort is the second Disney park to open outside of the United States following the opening of the Tokyo Disney Resort in 1983. Until June 2017, Disney only held a majority stake in the resort, when they bought the remaining shares. In 2017 The Walt Disney Company offered an informal takeover of Euro Disney S.C.A., buying 9% of the company from Kingdom Holding and an open offer of 2 Euro per share for the remaining stock. This brought The Walt Disney Company's total ownership to 85.7%. The Walt Disney company will also invest an additional 1.5 Billion Euro to strengthen the company."
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
          <Modal.Title>View Sightsseeing (Disneyland Paris)</Modal.Title>

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

<Col md={12}>
<div><strong>Details</strong></div>
<div>{data.details}</div>
</Col>
            </Row>
       
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewSightseeingModal
