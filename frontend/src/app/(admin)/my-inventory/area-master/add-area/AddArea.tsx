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
import { useRouter} from 'next/navigation';
const AddArea = () => {
    const router=useRouter()
  return (
    <>
        <Card className="p-3">
        <Form>
            <Row className='g-2 mb-3'>
                <Col md={4}>
    
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
        City 
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px"}} />
   
  </Col>

  {/* Address */}
  <Col md={4}>
    
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
       Area
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px"}} />
  
  </Col>

  {/* Currency */}
  <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
      Status
      </Form.Label>
      <Form.Select size="sm" style={{ fontSize: "10px"}}>
        <option>Active</option>
        <option>Inactive</option>
      </Form.Select>
  </Col>
            </Row>
        </Form>

        <div className='d-flex justify-content-end gap-2 '>
            <Button variant='outline-danger' size='sm' 
            onClick={()=>router.push('/my-inventory/area-master')}
            style={{ fontSize: "12px"}}>Cancel</Button>

            <Button variant='success' size='sm' 
            style={{ fontSize: "12px"}}>Submit</Button>
        </div>
      </Card>
    </>
  )
}

export default AddArea
