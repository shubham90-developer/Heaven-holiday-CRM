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
import {useRouter } from 'next/navigation';
const AddRestaturants = () => {
    const router=useRouter();
  return (
    <>
      <Card className="p-3">
        <Form>
            <Row className='g-2'>
                <Col md={4}>
    
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
        City 
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px"}} />
   
  </Col>

  {/* Address */}
  <Col md={4}>
    
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
        Address
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px"}} />
  
  </Col>

  {/* Restaurant Area */}
  <Col md={4}>
  
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
        Restaurant Area
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px"}} />
   
  </Col>

  {/* Supplier Name */}
  <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
        Supplier Name
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px"}} />
  </Col>

  {/* Currency */}
  <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
        Currency 
      </Form.Label>
      <Form.Select size="sm" style={{ fontSize: "10px"}}>
        <option>INR</option>
        <option>USD</option>
      </Form.Select>
  </Col>

  {/* Meal Name */}
  <Col md={4}>
      <Form.Label className="text-primary small" style={{ fontSize: "10px"}}>
        Meal Name
      </Form.Label>
      <Form.Control size="sm" style={{ fontSize: "10px"}} />
  </Col> 

  <Col md={2}>
      <Form.Check label="Preferred" className='text-primary ' style={{ fontSize: "10px"}} />
  </Col> 

   <Col md={2}>
      <Form.Check label="Veg" className='text-primary ' style={{ fontSize: "10px"}} />
  </Col> 

   <Col md={2}>
      <Form.Check label="NonVeg" className='text-primary ' style={{ fontSize: "10px"}} />
  </Col> 
 <Col md={2}>
      <Form.Check label="AI" className='text-primary ' style={{ fontSize: "10px"}} />
  </Col> 

            </Row>
        </Form>

        <div className='d-flex justify-content-end gap-2'>
            <Button variant='outline-danger' size='sm' 
            onClick={()=>router.push('/my-inventory/restaturants')}
            style={{ fontSize: "12px"}}>Cancel</Button>

            <Button variant='danger' size='sm' 
            style={{ fontSize: "12px"}}>Save</Button>
        </div>
      </Card>
    </>
  )
}

export default AddRestaturants
