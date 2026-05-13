"use client";
import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from 'next/navigation';
const EditItinerary = () => {
    const router=useRouter()
  return (
    <>
      <Card className='p-3'>
            <div className='text-end '>
                 <Button
                            variant="secondary"
                            size="sm"
                            style={{ fontSize: "10px", fontWeight: "bold" }}
                            onClick={() => router.push("/my-inventory/itinerary-description")}
                          >
                            <Icon icon="mdi:eye" className="me-1" /> My Itinerary List
                          </Button>
            </div>
    <hr/>
    <Row className="g-3">

  {/* Start City */}
  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary small"  style={{ fontSize: "10px" }}>
        Start City 
      </Form.Label>
      <Form.Control
        size="sm"
     style={{ fontSize: "10px" }}
      />
    </Form.Group>
  </Col>

  {/* Destination City */}
  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary small"  style={{ fontSize: "10px" }}>
        Destination City 
      </Form.Label>
      <Form.Control
        size="sm"
       style={{ fontSize: "10px" }}
      />
    </Form.Group>
  </Col>

  {/* Title */}
  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary small"  style={{ fontSize: "10px" }}>
        Title (100 words maximum)
      </Form.Label>
      <Form.Control
        as="textarea"
        rows={2}
        maxLength={100}

        style={{ fontSize: "10px" }}
      />
      <small className="text-muted">Max 100 characters</small>
    </Form.Group>
  </Col>

</Row>

<div className='d-flex justify-content-end gap-2'>
     <Button
                variant="outline-danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() => router.push("/my-inventory/itinerary-description")}
              >
               Cancel
              </Button>
     <Button
                variant="danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              
              >
                Save
              </Button>
    
</div>
      </Card>
    </>
  )
}

export default EditItinerary
