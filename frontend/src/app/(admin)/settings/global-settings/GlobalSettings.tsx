"use client";
import React, { useState } from 'react'
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
import CancellationSettings from './components/CancellationSettings';
import UpdatePaymentModal from './components/UpdatePaymentModal';
import TaxSettings from './components/TaxSettings';
const GlobalSettings = () => {
  const [updatepayment,setUpdatePayment] = useState(false)
  return (
    <>
      <div>
        <h5 className='mb-3' style={{fontSize:"12px"}}>Localization and Master Mark Ups</h5>

        <Accordion defaultActiveKey="0">
            <AccordionItem eventKey='0' className='mb-3'>
                <AccordionHeader style={{fontSize:"10px" }}>Localization</AccordionHeader>
                <AccordionBody>
                    <Row className='align-items-center gap-2'  >
                        <Col md={3}>
                        <Form.Label className='text-primary' style={{fontSize:"12px"}}>Localization</Form.Label>
                        <Form.Select style={{fontSize:"12px"}} size='sm'>
                            <option>INR</option>
                            <option>USD</option>
                            <option>AMD</option>
                        </Form.Select>
                        </Col>
                       
                        <Col md={3}>
                         <Form.Label className='text-primary' style={{fontSize:"12px"}}>Time Zone</Form.Label>
                        <Form.Select style={{fontSize:"12px"}} size='sm'>
                            <option>Asia / Kolkata</option>
                            <option>Asia / Kabul</option>
                            <option>Asia / Kolkata</option>
                        </Form.Select>
                        </Col>

                        <Col md={2}>
                         <Form.Label className='text-primary' style={{fontSize:"12px"}}>Country Code</Form.Label>
                        <Form.Control placeholder='+91' size='sm' style={{fontSize:"12px"}} />
                        </Col>

                       <Col md={3}>
                         <Form.Label className='text-primary' style={{fontSize:"12px"}}>Tax Type</Form.Label>
                        <Form.Select style={{fontSize:"12px"}} size='sm'>
                         <option>Select</option>
                            <option>GST</option>
                            <option>VAT</option>
                            
                        </Form.Select>
                        </Col>

                        <Col md={3}>
                         <Form.Label className='text-primary' style={{fontSize:"12px"}}>Title</Form.Label>
                        <Form.Control size='sm' style={{fontSize:"12px"}} />
                        </Col>

                         <Col md={3}>
                         <Form.Label className='text-primary' style={{fontSize:"12px"}}>Invoice Prefix</Form.Label>
                        <Form.Control size='sm' style={{fontSize:"12px"}} />
                        </Col>

                         <Col md={4} >
                         
                         <Form.Label className='text-primary' style={{fontSize:"12px"}}>With Salutation</Form.Label>
                        <Form.Check  />
                       
                        </Col>
                    </Row>
                </AccordionBody>
            </AccordionItem>

            <AccordionItem eventKey='1' className='mb-3'>
              <AccordionHeader style={{fontSize:"12px"}}>
                Offline Payment Link
              </AccordionHeader>
              <AccordionBody>
                <Row>
                  <Col md={6}>
                  <div className='border p-3' style={{fontSize:"12px"}}>
                    https://g07.in/MTE3MTY3M18x
                  </div>
                  </Col>
                    <Col md={6}>
                  <div className='border d-flex gap-2 p-3' style={{fontSize:"12px"}}>
                  <span>Allow Flexi Payment</span>
                  <Form.Check/>
                  </div>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>




            <AccordionItem eventKey='3' className='mb-3'>
              <AccordionHeader style={{fontSize:"12px"}}>API Key Settings</AccordionHeader>
              <AccordionBody>
                <div className='table-responsive'>
                    <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead className='bg-light'>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th>Title</th>
<th>Client Id</th>
<th>User Name</th>
<th>Secret Key/Password</th>
<th>Multi City</th>
<th>Round Trip</th>
<th>Status</th>
                  </tr>
                </thead>

             
              </table>
                </div>
              </AccordionBody>
            </AccordionItem>

      <AccordionItem eventKey='4' className='mb-3'>
      <AccordionHeader style={{fontSize:"12px"}}>Tax Settings</AccordionHeader>
      <AccordionBody>
        <TaxSettings/>
      </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey='5' className='mb-3'>
        
            <AccordionHeader style={{fontSize:"12px"}}>Cancellation Fee Settings</AccordionHeader>
            <AccordionBody>
      <CancellationSettings/>
            </AccordionBody>
      </AccordionItem>

           <AccordionItem eventKey='6' className='mb-3'>
            <AccordionHeader style={{fontSize:"12px"}}>Markup Settings</AccordionHeader>
            <AccordionBody>
              <Card>
                <CardHeader style={{fontSize:"12px"}} className='bg-light p-2'>Hotels API Based Bookings</CardHeader>
                <CardBody>
                  <div className='table-responsive'>
                    <table className='table table-sm table-bordered mb-0 align-middle'
                    style={{tableLayout:"fixed", width:"100%"}}>
                      <thead>
                        <tr style={{fontSize:"10px"}}>
                          <th>Market Place</th>
<th>Hotel Type</th>
<th>Markup Type</th>
<th>My Markup (Per room Per night)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{fontSize:"12px"}}>
                          <td rowSpan={2}>MY B2C</td>
                          <td>Domestic</td>
                          <td>
                        <Form.Select style={{fontSize:"12px"}} size='sm'>
                         <option>Select</option>
                            <option>GST</option>
                            <option>VAT</option>
                        </Form.Select>
                          </td>
                          <td>
                              <Form.Control size='sm' placeholder='0.00' style={{fontSize:"12px"}} />
                          </td>
                        </tr>
                        <tr style={{fontSize:"10px"}}>
                            <td>Domestic</td>
                          <td>
                        <Form.Select style={{fontSize:"12px"}} size='sm'>
                         <option>Select</option>
                            <option>GST</option>
                            <option>VAT</option>
                        </Form.Select>
                          </td>
                          <td>
                              <Form.Control size='sm' placeholder='0.00' style={{fontSize:"12px"}} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader style={{fontSize:"12px"}} className='bg-light p-2'>Flight API Based Bookings</CardHeader>
                <CardBody>
                  <div className='table-responsive'>
                    <table className='table table-sm table-bordered mb-0 align-middle'
                    style={{tableLayout:"fixed", width:"100%"}}>
                      <thead>
                        <tr style={{fontSize:"10px"}}>
                  <th>Market Place</th>
<th>Flight Type</th>
<th>My Commission (%)</th>
<th>My Markup (Fixed)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{fontSize:"12px"}}>
                          <td rowSpan={2}>MY B2C</td>
                          <td>Domestic</td>
                          <td>
                         <Form.Control size='sm' placeholder='0.00' style={{fontSize:"12px"}} />
                          </td>
                          <td>
                              <Form.Control size='sm' placeholder='0.00' style={{fontSize:"12px"}} />
                          </td>
                        </tr>
                        <tr style={{fontSize:"10px"}}>
                            <td>Domestic</td>
                          <td>
                        <Form.Control size='sm' placeholder='0.00' style={{fontSize:"12px"}} />
                          </td>
                          <td>
                              <Form.Control size='sm' placeholder='0.00' style={{fontSize:"12px"}} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </AccordionBody>
           </AccordionItem>

           <AccordionItem eventKey='7' className='mb-3'>
            <AccordionHeader  style={{ fontSize: "12px" }}>Website Settings</AccordionHeader>
            <AccordionBody>
              <Row>
                <Col md={4}>
                  <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  B2B Url
                </Form.Label>
                <Form.Control size="sm" placeholder='Example: https://abc.hellogtx.com/' style={{ fontSize: "12px" }} />
                </Col>

                  <Col md={4}>
                  <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  B2C Url
                </Form.Label>
                <Form.Control size="sm" placeholder='https://www.aheavenholiday.in/' style={{ fontSize: "12px" }} />
                </Col>
              </Row>
            </AccordionBody>
           </AccordionItem>

          <AccordionItem eventKey='8' className='mb-3'>
            <AccordionHeader  style={{ fontSize: "12px" }}>Payment Gateway Settings</AccordionHeader>
            <AccordionBody>
               <Card>
                <CardHeader style={{fontSize:"12px"}} className='bg-light p-2'>Payment Gateway Details</CardHeader>
                <CardBody>
                  <div className='table-responsive'>
                    <table className='table table-sm table-bordered mb-0 align-middle'
                    style={{tableLayout:"fixed", width:"100%"}}>
                      <thead>
                        <tr style={{fontSize:"10px"}}>
                 <th>Payment Option</th>
<th>Merchant Id</th>
<th>Secret Password</th>
<th>Prod Id</th>
<th>Request Hash Key</th>
<th>Response Hash Key</th>
<th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{fontSize:"12px"}}>
                        <td>ATOM</td>
<td>401301</td>
<td>b45d71d2</td>
<td>HOSPITALITY</td>
<td>4988b349524de71737</td>
<td>ee8fb63a07a0c5335f</td>
<td>
  <Button variant='outline-danger' size='sm' style={{fontSize:"12px"}} onClick={()=>setUpdatePayment(true)}>Update</Button>
</td>
{updatepayment && ( <UpdatePaymentModal onClose={()=>setUpdatePayment(false)} />)}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem eventKey='9' className='mb-3'>
            <AccordionHeader>Security Settings</AccordionHeader>
            <AccordionBody>
              <Row>
                <Col md={6}>
                <strong  style={{fontSize:"12px"}}>Mandatory Password Change</strong>
               <div className='d-flex flex-column gap-1 mt-2'>
                <div className='d-flex gap-2 align-items-center'  style={{fontSize:"12px"}}>Staff User : <Form.Control size='sm'   style={{fontSize:"12px",width:"120px"}}/> Days</div>
                 <div className='d-flex gap-2 align-items-center'  style={{fontSize:"12px"}}>B2B User : <Form.Control size='sm'   style={{fontSize:"12px",width:"120px"}}/> Days</div>
                  <div className='d-flex gap-2 align-items-center'  style={{fontSize:"12px"}}>B2C User : <Form.Control size='sm'   style={{fontSize:"12px",width:"120px"}}/> Days</div>
              </div>
                </Col>

                <Col md={6}>
                  <strong  style={{fontSize:"12px"}}>Factor Authentication</strong>
              <div className='d-flex gap-2 mt-2'>
                <Form.Check type='radio' value='None' name='type' id='None' label='None' style={{fontSize:"12px"}} />
                <Form.Check type='radio' value='Email / Mobile' name='type' id='Email / Mobile' label='Email / Mobile' style={{fontSize:"12px"}}/>
                <Form.Check type='radio' value='Google Authentication' name='type' id='Google Authentication' label='Google Authentication' style={{fontSize:"12px"}} />
              </div>
                </Col>
              </Row>
            </AccordionBody>
          </AccordionItem>

          <AccordionItem eventKey='10'>
            <AccordionHeader>Proposal Settings</AccordionHeader>
            <AccordionBody>
              <div className='p-3'>
                            <div className='d-flex gap-2 align-items-center'  style={{fontSize:"12px"}}>Proposal Validity (In Days):  <Form.Control size='sm'   style={{fontSize:"12px",width:"120px"}}/></div>
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

export default GlobalSettings
