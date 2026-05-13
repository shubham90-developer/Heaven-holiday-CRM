"use client"

import {Icon} from "@iconify/react/dist/iconify.js";

import React, {useState} from "react";
import  Offcanvas from "react-bootstrap/Offcanvas";
import {Row, Col, Form, Button, InputGroup} from "react-bootstrap";
import CustomFlatpickr from "@/components/CustomFlatpickr";

function OffCanvasExample({name, ...props}:any){
    const [show, setShow]=useState(false);

    const handleClose = ()=> setShow(false);
    const handleShow = ()=> setShow(true);

    return (
        <>
        <Button
                variant="outline-primary"
                onClick={handleShow}
                className="me-2"
                size="sm"
                style={{fontSize: "10px", fontWeight: "bold"}}
                >
                    <Icon icon="tabler:filter" width={12} /> {name}
                </Button>

                <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                style={{width:"900px"}}
                >
                    <Offcanvas.Header
                    style={{
                        background: "#274c6b",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                    >
                        <Offcanvas.Title>
                            <Icon icon="tabler:filter" className="me-2"/>
                            Filter Results
                        </Offcanvas.Title>

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
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Row className="g-3">
                             <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize:"12px"}}
                                className="text-primary"
                                >Staff</Form.Label>
                                <Form.Select size="sm" style={{fontSize:"12px"}}>
                                    <option>Select</option>
                                    <option value={1}>PRAJWAL BUGADE</option>
                                    <option value={2}>PRANAV KADAM</option>
                                </Form.Select>
                            </Form.Group>
                            </Col>

                          <Col md={3}>
                          <Form.Group>
                            <Form.Label
                            style={{fontSize: "12PX"}}
                            className="text-primary">Plan</Form.Label>
                            <Form.Select size="sm" style={{fontSize:"12px"}}>
                                <option>Select</option>
                                <option value={1}>Plan A</option>
                                <option value={2}>Plan B</option>
                            </Form.Select>
                            </Form.Group></Col> 

                                                <Col md={3}>
                          <Form.Group>
                            <Form.Label
                            style={{fontSize: "12PX"}}
                            className="text-primary">Status</Form.Label>
                            <Form.Select size="sm" style={{fontSize:"12px"}}>
                                <option>Select</option>
                                <option value={1}>Pending</option>
                                <option value={2}>Approved</option>
                            </Form.Select>
                            </Form.Group></Col> 

                            <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize: "12px"}}
                                className="text-primary"
                                >Customer Name</Form.Label>
                                <Form.Control size="sm" style={{fontSize:"12px"}}/>
                            </Form.Group>
                            </Col>

                              <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize: "12px"}}
                                className="text-primary"
                                >Customer Mobile</Form.Label>
                                <Form.Control size="sm" style={{fontSize:"12px"}}/>
                            </Form.Group>
                            </Col>

                              <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize: "12px"}}
                                className="text-primary"
                                >Customer Email</Form.Label>
                                <Form.Control size="sm" style={{fontSize:"12px"}}/>
                            </Form.Group>
                            </Col>

                               <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize: "12px"}}
                                className="text-primary"
                                >Customer Email</Form.Label>
                                <Form.Control size="sm" style={{fontSize:"12px"}}/>
                            </Form.Group>
                            </Col>

                              <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize: "12px"}}
                                className="text-primary"
                                >Receipt No</Form.Label>
                                <Form.Control size="sm" style={{fontSize:"12px"}}/>
                            </Form.Group>
                            </Col>

                              <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize: "12px"}}
                                className="text-primary"
                                >Transaction No</Form.Label>
                                <Form.Control size="sm" style={{fontSize:"12px"}}/>
                            </Form.Group>
                            </Col>

                              <Col md={3}>
                            <Form.Group>
                                <Form.Label
                                style={{fontSize: "12px"}}
                                className="text-primary"
                                >Ref. No</Form.Label>
                                <Form.Control size="sm" style={{fontSize:"12px"}}/>
                            </Form.Group>
                            </Col>
                        </Row>

                       <div style={{borderTop: "1px dotted #000"}} className="mt-5"></div>
                       <div className="d-flex justify-content-end mt-1 gap-2">
                                 <Button
                                   variant="outline-danger"
                                   size="sm"
                                   style={{ fontSize: "12px", fontWeight: "bold" }}
                                 >
                                   Reset
                                 </Button>
                     
                                 <Button
                                   variant="success"
                                   size="sm"
                                   style={{ fontSize: "12px", fontWeight: "bold" }}
                                 >
                                   <Icon
                                     icon="tabler:search"
                                     className="me-1"
                                     style={{ fontSize: "12px" }}
                                   />
                                   Filter
                                 </Button>
                               </div>
                    </Offcanvas.Body>
                </Offcanvas>
        </>
    )
};

function Filter(){
    return (
        <>
        <OffCanvasExample placement="end" name="Filter"/>
        </>
    )
}
export default Filter;