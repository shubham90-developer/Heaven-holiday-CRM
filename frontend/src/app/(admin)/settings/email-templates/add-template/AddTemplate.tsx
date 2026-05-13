"use client";
import { useRouter } from 'next/navigation';
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
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
  CardHeader,
  CardBody
} from "react-bootstrap";
const AddTemplate = () => {
    const router=useRouter()
  return (
    <>
    <Card className='p-3'>
      <Form>
        <Row className='g-2'>
        <Col md={4}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Template Name *
  </Form.Label>
  <Form.Control size="sm" style={{ fontSize: "10px" }} />
</Col>

{/* Subject */}
<Col md={4}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Subject *
  </Form.Label>
  <Form.Control size="sm" style={{ fontSize: "10px" }} />
</Col>

{/* Status */}
<Col md={4}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Status
  </Form.Label>
  <Form.Select size="sm" style={{ fontSize: "10px" }}>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </Form.Select>
</Col>

<Col md={12}>
  <Form.Label className="text-primary small" style={{ fontSize: "10px" }}>
    Message Body
  </Form.Label>
  <Form.Control
    as="textarea"
    rows={4}
    style={{ fontSize: "10px" }}
  />
</Col>
        </Row>

        <div className='d-flex gap-2 justify-content-end mt-3'>
<Button variant='outline-danger' size='sm'
            onClick={()=>router.push('/settings/email-templates')}
            style={{fontSize:"10px"}}>Cancel</Button>
            <Button variant='success' size='sm'
            style={{fontSize:"10px"}}>Submit</Button>
        </div>
      </Form>
      </Card>
    </>
  )
}

export default AddTemplate
