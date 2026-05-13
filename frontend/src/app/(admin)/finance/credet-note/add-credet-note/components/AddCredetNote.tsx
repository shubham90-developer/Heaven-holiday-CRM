"use client";
import React from 'react'
import { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";  
const AddCredetNote = () => {
    const router = useRouter();
        const [addItem,setAddItem] = useState(0);
  return (
    <>
      <Card className="p-3 ">
        <div className="pb-2 border-bottom text-end">
            <Button variant="danger" size="sm" 
            onClick={()=>router.push("/finance/credet-note")}
            style={{fontSize: "10px"}}><Icon icon="mdi:arrow-left" className='me-1'/> My Credet Note List</Button>
        </div>
        <div className="p-3">
            <Form>
                <Row>
                    <Col md={3}>
            <Form.Label  className="text-primary" style={{fontSize: "10px"}}>Billed To *</Form.Label>
            <Form.Control size="sm"  style={{fontSize: "10px"}} />
        </Col>

        <Col md={2}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Currency</Form.Label>
            <Form.Select size="sm"  style={{fontSize: "10px"}}>
              <option>INR</option>
              <option>USD</option>
            </Form.Select>
        </Col>

        <Col md={2}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Credet Note Date *</Form.Label>
            <Form.Control type="date" size="sm"  style={{fontSize: "10px"}}/>
        </Col>

        <Col md={2}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Payment Due Date *</Form.Label>
            <Form.Control type="date" size="sm"  style={{fontSize: "10px"}}/>
        </Col>

        <Col md={3}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Credet Note Number *</Form.Label>
            <Form.Control type="text" size="sm"  style={{fontSize: "10px"}}/>
        </Col>
    

    
    
        <Col md={3}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Client Address</Form.Label>
            <Form.Control type="text" size="sm"  style={{fontSize: "10px"}}/>
        </Col>

        <Col md={2}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Pin/Postal Code *</Form.Label>
            <Form.Control type="text" size="sm"  style={{fontSize: "10px"}}/>
        </Col>

        <Col md={2}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Client City *</Form.Label>
            <Form.Control type="text" size="sm"  style={{fontSize: "10px"}}/>
        </Col>

        <Col md={3}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Client State</Form.Label>
            <Form.Select size="sm"  style={{fontSize: "10px"}}>
              <option>Select</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
            </Form.Select>
        </Col>

        <Col md={2}>
            <Form.Label className="text-primary" style={{fontSize: "10px"}}>Client GST</Form.Label>
            <Form.Select size="sm"  style={{fontSize: "10px"}}>
              <option>No</option>
              <option>Yes</option>
            </Form.Select>
        </Col>
                </Row>

                <div className='table-responsive'>
                    <table className='table table-sm table-bordered mt-3 align-middle'     style={{ tableLayout: "fixed", width: "100%" }}>
                        <thead>
                            <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
   <th style={{ width: "250px" }}>Category / Description</th>
            <th style={{ width: "100px" }}>Qty</th>
            <th style={{ width: "100px" }}>Rate</th>
            <th style={{ width: "120px" }}>Discount</th>
            <th style={{ width: "120px" }}>Markup</th>
            <th style={{ width: "120px" }}>GST On</th>
            <th style={{ width: "120px" }}>Total GST</th>
            <th style={{ width: "120px" }}>Total Amt.</th>
            <th style={{ width: "50px" }}></th>
                            </tr>
                           
                        </thead>
                           <tbody>
                            <tr>

            <td style={{ minWidth: "250px" }}>
              <Form.Control
                placeholder="Eg:- Flight, Hotel etc..."
                className="mb-2"  size="sm"  style={{fontSize: "10px"}}
              />
              <Form.Control
                placeholder="SAC Code like - 998559"
                className="mb-2" size="sm"  style={{fontSize: "10px"}}
              />
              <Form.Control as="textarea" rows={2}  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Control type="number" defaultValue={1}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Control type="number" defaultValue={0}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Select className="mb-2" size="sm"  style={{fontSize: "10px"}}>
                <option>Fixed</option>
                <option>%</option>
              </Form.Select>
              <Form.Control type="number" defaultValue={0}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Select className="mb-2" size="sm"  style={{fontSize: "10px"}}>
                <option>Fixed</option>
                <option>%</option>
              </Form.Select>
              <Form.Control type="number" defaultValue={0}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Select className="mb-2" size="sm"  style={{fontSize: "10px"}}>
                <option>Total</option>
                <option>Rate</option>
              </Form.Select>
              <Form.Select size="sm"  style={{fontSize: "10px"}}>
                <option>5%</option>
                <option>12%</option>
                <option>18%</option>
              </Form.Select>
            </td>

            <td>
              <Form.Control type="number" size="sm"  style={{fontSize: "10px"}} />
            </td>

            <td style={{fontSize: "10px"}}>
             0.00
            </td>
            <td></td>
          </tr>
       {[...Array(addItem)].map((_, index) =>(
          <tr key={index}>
            <td style={{ minWidth: "250px" }}>
              <Form.Control
                placeholder="Eg:- Flight, Hotel etc..."
                className="mb-2"  size="sm"  style={{fontSize: "10px"}}
              />
              <Form.Control
                placeholder="SAC Code like - 998559"
                className="mb-2" size="sm"  style={{fontSize: "10px"}}
              />
              <Form.Control as="textarea" rows={2}  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Control type="number" defaultValue={1}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Control type="number" defaultValue={0}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Select className="mb-2" size="sm"  style={{fontSize: "10px"}}>
                <option>Fixed</option>
                <option>%</option>
              </Form.Select>
              <Form.Control type="number" defaultValue={0}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Select className="mb-2" size="sm"  style={{fontSize: "10px"}}>
                <option>Fixed</option>
                <option>%</option>
              </Form.Select>
              <Form.Control type="number" defaultValue={0}  size="sm"  style={{fontSize: "10px"}}/>
            </td>

            <td>
              <Form.Select className="mb-2" size="sm"  style={{fontSize: "10px"}}>
                <option>Total</option>
                <option>Rate</option>
              </Form.Select>
              <Form.Select size="sm"  style={{fontSize: "10px"}}>
                <option>5%</option>
                <option>12%</option>
                <option>18%</option>
              </Form.Select>
            </td>

            <td>
              <Form.Control type="number" size="sm"  style={{fontSize: "10px"}} />
            </td>

            <td style={{fontSize: "10px"}}>
                0.00
            </td>
            <td> <Button variant="outline-dark" size="sm" className="mt-3"
                    onClick={()=>setAddItem(addItem-1)}
                    ><Icon icon="mdi:minus-circle" /></Button>
            </td>
          </tr>
      ) )}
        </tbody>

                    </table>
                 
                </div>
                <div className='border '>
               <div className='text-end p-2 border-bottom' >
        <Button variant="outline-primary" size="sm"
                       onClick={() => setAddItem(addItem + 1)} style={{fontSize: "10px"}}>Add more item</Button>  
                </div>
                 <div className='d-flex gap-2 justify-content-end p-2 border-bottom' >
                    <div style={{fontSize: "12px"}} >SubTotal</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
               
                <div className='d-flex gap-2 justify-content-end border-bottom p-2' >
                    <div style={{fontSize: "12px"}}>CGST</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
                <div className='d-flex gap-2 justify-content-end border-bottom p-2' >
                    <div style={{fontSize: "12px"}}>SGST</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
                <div className='d-flex gap-2 justify-content-end border-bottom p-2' >
                    <div style={{fontSize: "12px"}}>IGST</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
             
                <div className='d-flex gap-2 justify-content-end border-bottom p-2' >
                    <div style={{fontSize: "12px"}}>Other Discount</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
                <div className='d-flex gap-2 justify-content-end border-bottom p-2' >
                    <div style={{fontSize: "12px"}}>Total Invoice Value</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
                <div className='d-flex gap-2 justify-content-end border-bottom p-2' >
                    <div style={{fontSize: "12px"}}>Advance</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
                <div className='d-flex gap-2 justify-content-end border-bottom p-2' >
                    <div style={{fontSize: "12px"}}>Balance To Be Paid</div>
        <Form.Control type="number" placeholder='0.00'readOnly size="sm"  style={{fontSize: "10px", maxWidth: "150px"}} /> 
               </div>
              <div className='border-bottom p-2'style={{fontSize: "12px"}} >
                    Notes: <Form.Control as="textarea" rows={3}  size="sm"  style={{fontSize: "10px"}} />  </div>
                                  <div className='border-bottom p-2' style={{fontSize: "12px"}} >
                    Terms & Conditions: <Form.Control as="textarea" rows={3}  size="sm"  style={{fontSize: "10px"}} /> 
                     </div>

                     <div className='d-flex flex-wrap flex-lg-nowrap gap-2 justify-content-end mt-3'>
                 <div className='d-flex gap-2'>
                   <Form.Check type="checkbox" label="Display Markup" className='me-5' style={{fontSize: "12px"}}  />
                </div>
                   <Button variant="outline-danger" size="sm" style={{fontSize: "12px"}}>Preview</Button>
                   <Button variant="danger" size="sm" style={{fontSize: "12px"}}>Save</Button>
               </div>
                  </div>  
            </Form>
            </div> 
      </Card>
    </>
  )
}

export default AddCredetNote
