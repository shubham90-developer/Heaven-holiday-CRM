"use client";

import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Icon } from "@iconify/react";

const RemarkBox = () => {
  const [showInput, setShowInput] = useState(false);
 
  const handleShow = () => {
    setShowInput(true);
  };

  const handleCancel = () => {
    setShowInput(false);
  };

  return (
    <div className="position-relative">
          <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={handleShow}
                                style={{ fontSize: "10px", fontWeight: "bold" }}
                                
                              >
                                <Icon icon="mdi:plus" className="me-1" />
                              Remarks
                              </Button>
    

      {showInput && (
        <Row className="align-items-center g-2"
         style={{
            position: "absolute",
            top: "45px",
            left: 0,
            width: "380px",
            background: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            zIndex: 1000,
          }}>
          
          <Col md={8}>
            <Form.Control
              placeholder="Enter Remarks"
             size="sm" style={{ fontSize: "12px" }} 
            />
          </Col>

          <Col md="auto">
            <Button
              variant="primary"
          size="sm"
              className=""
           
            >
              <Icon icon="mdi:check" />
            </Button>
          </Col>

          <Col md="auto">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleCancel}
              className=""
            >
              <Icon icon="mdi:close" />
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default RemarkBox;