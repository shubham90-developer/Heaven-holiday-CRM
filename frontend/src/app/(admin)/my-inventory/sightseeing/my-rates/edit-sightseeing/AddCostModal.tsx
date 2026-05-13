import React, { use } from 'react'

import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup, Table, Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import VehicleWise from './VehicleWise';
import PaxWise from './PaxWise';
type AddCostModalProps = {
    onClose: () => void;
}
const AddCostModal = ({onClose}: AddCostModalProps) => {
    const [costtype, setCostType]=useState("Vehicle Wise")
  return (
    <>
        <Modal show={true} onHide={onClose} size='lg' centered >
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>SIC Cost (Enter SIC Transfer Cost without Entry Fee) (Currency: INR)</Modal.Title>

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
         
         <Row className="mb-3">
          <Col md={6}>
            <Form.Label style={{fontSize:"12px"}}>B2C Markup</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Adult"
                  size='sm'
              style={{fontSize:"12px"}}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Child"
                  size='sm'
                style={{fontSize:"12px"}}
                />
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Form.Label  style={{fontSize:"12px"}}>B2B Markup</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Adult"
                  size='sm'
                 style={{fontSize:"12px"}}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Child"
                  size='sm'
                 style={{fontSize:"12px"}}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* COST TABLE */}
        <Table bordered>
          <thead>
            <tr  style={{fontSize:"10px"}}>
              <th>Cost</th>
              <th>B2C Cost With Markup</th>
              <th>B2B Cost With Markup</th>
            </tr>
            <tr  style={{fontSize:"10px"}}>
              <th>
                <div className="d-flex justify-content-between">
                  <span>Adult</span>
                  <span>Child</span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between">
                  <span>Adult</span>
                  <span>Child</span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between">
                  <span>Adult</span>
                  <span>Child</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr  style={{fontSize:"12px"}}>
              <td>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      size='sm'
                      style={{fontSize:"12px"}}
                      defaultValue={0}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      size='sm'
                      style={{fontSize:"12px"}}
                      defaultValue={0}
                    />
                  </Col>
                </Row>
              </td>

              <td>
                <Row>
                  <Col>
                    <Form.Control placeholder="Auto" size='sm'  style={{fontSize:"12px"}}/>
                  </Col>
                  <Col>
                    <Form.Control placeholder="Auto" size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                </Row>
              </td>

              <td>
                <Row>
                  <Col>
                    <Form.Control placeholder="Auto" size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                  <Col>
                    <Form.Control placeholder="Auto" size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table>
            <div className='d-flex justify-content-between'>
        <Button variant="primary" size="sm" style={{fontSize:'12px'}}>
          Remove Cost
        </Button>
         <Button variant="danger" size="sm" style={{fontSize:'12px'}}>
          Save
        </Button>
        </div>



        {/* PRIVATE COST SECTION */}
        <Card className="mt-4  rounded shadow-sm">
            <CardHeader className='d-flex gap-2' style={{ background: "#274c6b", color: "#fff" }}>
                PVT COST
                  <Form.Check
            inline
            label="Pax Wise"
            id="Pax Wise"
            name="type"
            type="radio"
            value="Pax Wise"
            onChange={(event)=>setCostType(event.target.value)}
          />
          <Form.Check
            inline
            label="Vehicle Wise"
            id='Vehicle Wise'
            value="Vehicle Wise"
            name="type"
            type="radio"
             onChange={(event)=>setCostType(event.target.value)}
            defaultChecked
          />

            </CardHeader>
   { costtype === "Vehicle Wise" && ( <VehicleWise/> )}
    { costtype === "Pax Wise" && ( <PaxWise/> )}
          
          
        </Card>
       
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddCostModal
