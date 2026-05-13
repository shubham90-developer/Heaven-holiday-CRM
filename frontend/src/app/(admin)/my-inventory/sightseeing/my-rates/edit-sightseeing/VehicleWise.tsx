import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody, CardFooter } from "react-bootstrap";
const VehicleWise = () => {
      const [addservice, setAddService]=useState(false)
  return (
    <>
        <CardBody className='p-2'>
                   
        <div className='table-reaponsive'>
          <table  className=" table table-sm table-bordered align-middle"
          style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th>City</th>
                <th>Pick Up Area</th>
                <th>Vehicle</th>
                <th>Capacity</th>
                <th>Supplier</th>
                <th>Currency</th>
                <th>Cost</th>
                <th>Markup (%)</th>
                <th>Total Cost</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr style={{fontSize:'12px'}}>
                <td>
                  <Form.Control defaultValue="Paris" size='sm' style={{fontSize:'12px'}} />
                </td>
                <td>
                  <Form.Control size='sm' style={{fontSize:'12px'}}/>
                </td>
                <td>
                  <Form.Select size='sm' style={{fontSize:'12px'}}>
                    <option>Select</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Control  size='sm' style={{fontSize:'12px'}}/>
                </td>
                <td>
                  <Form.Control size='sm' style={{fontSize:'12px'}}/>
                </td>
                <td>
                  <Form.Select size='sm' style={{fontSize:'12px'}}>
                    <option>INR</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Control placeholder="Cost" size='sm' style={{fontSize:'12px'}}/>
                </td>
                <td>
                  <Form.Control placeholder="Markup" size='sm' style={{fontSize:'12px'}} />
                </td>
                <td>
                  <Form.Control placeholder="Total" size='sm' style={{fontSize:'12px'}}/>
                </td>
                <td>
                  <Button variant="danger" size="sm" style={{fontSize:'12px'}}>
                    +
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>

              {addservice && (
                  <div className='table-responsive'>
          <table  className=" table table-sm table-bordered align-middle"
          style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
             <th>Service Type</th>
<th>Supplier</th>
<th>Currency</th>
<th>Price Type</th>
<th>Total Cost</th>
<th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr style={{fontSize:'12px'}}>
                <td>
                  <Form.Control  size='sm' style={{fontSize:'12px'}} />
                </td>
                <td>
                  <Form.Control size='sm' style={{fontSize:'12px'}}/>
                </td>
                <td>
                  <Form.Select size='sm' style={{fontSize:'12px'}}>
                    <option>Select</option>
                  </Form.Select>
                </td>
                <td>
                <Form.Select size='sm' style={{fontSize:'12px'}}>
                    <option>Select</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Control size='sm' style={{fontSize:'12px'}}/>
                </td>
                <td>
                  <Button variant="danger" size="sm" style={{fontSize:'12px'}}>
                    +
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          </div> 
              )}
          </CardBody>
          <CardFooter>
            <div className='d-flex align-items-center justify-content-between'>
                <span className='text-primary' 
                style={{fontSize:'12px', cursor:'pointer'}}
                onClick={()=>setAddService(!addservice)}
                >Add More Services</span>
                <div className='d-flex gap-2 align-items-center'>
                    <Form.Check label="Display on Website" style={{fontSize:'12px'}} />
                    <Button variant='danger' size='sm' style={{fontSize:'12px'}}>Save & Exit</Button>
                </div>
            </div>
          </CardFooter>
    </>
  )
}

export default VehicleWise
