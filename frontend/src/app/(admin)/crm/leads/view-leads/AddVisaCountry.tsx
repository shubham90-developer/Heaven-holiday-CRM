"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";

const AddVisaCountry =()=>{
const [showVisa,setShowVisa]=useState(0);
    return(
        <>
        <div className="text-end">
        <Button variant="primary" size="sm" className="mb-2 justify-end"
        style={{fontSize:"10px"}}
        onClick={()=>setShowVisa(showVisa+1)}
        >
            <Icon icon="mdi:plus" className="me-1" />
            Add Visa Country
        </Button>
</div>

{[...Array(showVisa)].map((_, index) => (
    <Row key={index}>
        <Col md={6}>
          <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 Country
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
        </Col>
        <Col md={4}>
        <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                  >Date</Form.Label>
                  <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
             </Col>
             <Col md={2}>
                  <Button variant="outline-dark" size="sm" className="mt-3"
                    onClick={()=>setShowVisa(showVisa-1)}
                    ><Icon icon="mdi:minus-circle" /></Button>
        </Col>
    </Row>
))}
        


        </>
    )
}
export default AddVisaCountry;