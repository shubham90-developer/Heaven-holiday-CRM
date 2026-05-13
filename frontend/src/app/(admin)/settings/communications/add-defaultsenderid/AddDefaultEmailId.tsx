import React from 'react'
import { Button, Form, Row, Col, Card, Table } from "react-bootstrap";
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
const AddDefaultEmailId = () => {
    const router=useRouter()
  return (
    <>
        <Card className="p-3">
            <Form>
                <Row>
                    <Col md={4}>
    <Form.Label style={{ fontSize: "12px" }}>
     CC Email Id *
    </Form.Label>
    <Form.Control style={{ fontSize: "10px" }}
      type="email"
      size="sm"
    
    />
  </Col>

  {/* Status */}
  <Col md={4}>
    <Form.Label style={{ fontSize: "12px" }}>
      Status *
    </Form.Label>

    <Form.Select size="sm" style={{ fontSize: "10px" }}>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </Form.Select>
  </Col>

                </Row>

                 <div className='d-flex gap-2 justify-content-end mt-3'>
                <Button variant='outline-danger' size='sm'
                            onClick={()=>router.push('/settings/communications/')}
                            style={{fontSize:"10px"}}>Cancel</Button>
                            <Button variant='success' size='sm'
                            style={{fontSize:"10px"}}>Submit</Button>
                        </div>
            </Form>
      </Card>
    </>
  )
}

export default AddDefaultEmailId
