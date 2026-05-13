"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
const AddTransport = () => {
    const router=useRouter()
  return (
    <>
      <Card className="p-3">
            <Form>
                <Row>
        <Col md={4}>
              <Form.Label className="text-primary small" style={{fontSize:"10px"}}>
                Car Type
              </Form.Label>
               <Form.Select size="sm"  style={{fontSize:"10px"}}>
        <option>Select</option>
        <option>Luxary </option>
        <option>Standard</option>
      </Form.Select>
          </Col>

         <Col md={4}>
      <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
       Car Name
      </Form.Label>
      <Form.Control
        size="sm"
        style={{fontSize:"10px"}}
      />
  </Col>

   <Col md={4}>
        <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
        Seating Capacity
        </Form.Label>
        <Form.Control
          size="sm"
          style={{fontSize:"10px"}}
        />
    </Col>

      <Col md={4}>
              <Form.Label className="text-primary small" style={{fontSize:"10px"}}>
              AC
              </Form.Label>
               <Form.Select size="sm"  style={{fontSize:"10px"}}>
        <option>Select</option>
        <option>Yes </option>
        <option>No</option>
      </Form.Select>
          </Col>

           <Col md={4}>
        <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
        Vehicle No
        </Form.Label>
        <Form.Control
          size="sm"
          style={{fontSize:"10px"}}
        />
    </Col> 

       <Col md={4}>
        <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
      No of Vehicle
        </Form.Label>
        <Form.Control
          size="sm"
          style={{fontSize:"10px"}}
        />
    </Col> 

       <Col md={4}>
        <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
        Image
        </Form.Label>
        <Form.Control type='file'
          size="sm"
          style={{fontSize:"10px"}}
        />
    </Col>

                </Row>
        <div className='d-flex justify-content-end gap-2'>
              <Button
              variant="outline-danger"
              size="sm"
              onClick={()=>router.push('/my-inventory/vehicles')}
              style={{ fontSize: "12px" }}
            >
            Cancel
            </Button>
              <Button
              variant="success"
              size="sm"
              style={{ fontSize: "12px" }}
            >
             Save
            </Button>
        </div>
            </Form>
      </Card>
    </>
  )
}

export default AddTransport
