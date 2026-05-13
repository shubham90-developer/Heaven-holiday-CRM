"use client";
import React from 'react'
import { Button, Form, Row, Col, Card, Table } from "react-bootstrap";
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
const Template = () => {
    const router=useRouter()
  return (
    <>
      <Card className="p-3">
  <div>
    

      <h5 className="mb-3" style={{ fontSize: "12px"}}>Whatsapp Message</h5>

      <Row>
        
        {/* LEFT SIDE */}
        <Col md={6}>
            <div className='d-flex flex-column gap-1'>
          <Form.Label style={{ fontSize: "10px" }} className='text-primary'>
             Template Name *
             </Form.Label>
             <Form.Control as="textarea" rows={2} style={{ fontSize: "10px" }}
               size="sm"
             

               
             />

         <Form.Label style={{ fontSize: "10px" }} className='text-primary'>
             Formatted Preview:
             </Form.Label>
             <div className='border'></div>
       
         <Form.Label style={{ fontSize: "10px" }} className='text-primary'>
             WhatsApp Text:
             </Form.Label>
             <Form.Control as="textarea" rows={2} style={{ fontSize: "10px" }}
               size="sm"
             />
          {/* Status */}
          <Form.Label style={{ fontSize: "10px" }} className='text-primary'>
             Select Status
             </Form.Label>
            <Form.Select size='sm' style={{ fontSize: "10px" }}>
              <option>Active</option>
              <option>Deactive</option>
            </Form.Select>
        
        </div>
        </Col>

        {/* RIGHT SIDE TABLE */}
        <Col md={6}>
          <div className="table-responsive">
            <table className="table table-bordered table-sm">
              <thead className="table-light">
                <tr style={{ fontSize: "10px" }}>
                  <th>Value</th>
                  <th>Formate</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ fontSize: "10px" }}>
                  <td>Customer Name</td>
                  <td>{`{CustomerName}`} <span className="text-danger">insert</span></td>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <td>Destination</td>
                  <td>{`{Destination}`} <span className="text-danger">insert</span></td>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <td>Landing Page</td>
                  <td className="text-danger">Create Campaign URL</td>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <td>Agent Display Name</td>
                  <td>{`{AgentDisplayName}`} <span className="text-danger">insert</span></td>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <td>Agent EmailId</td>
                  <td>{`{EmailId}`} <span className="text-danger">insert</span></td>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <td>Agency Website</td>
                  <td>{`{AgencyWebsite}`} <span className="text-danger">insert</span></td>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <td>Agent Contact No</td>
                  <td>{`{AgentContactNo}`} <span className="text-danger">insert</span></td>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <td>Url Parameter</td>
                  <td>{`{UrlParameter}`} <span className="text-danger">insert</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>

      </Row>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="outline-danger" size='sm' 
        onClick={()=>router.push('/settings/communications')}
        style={{fontSize:"10px"}}>Cancel</Button>
         <Button variant="danger" size='sm' style={{fontSize:"10px"}}>Submit</Button>
      </div>

   
  </div>
</Card>
    </>
  )
}

export default Template
