"use client";
import React, { useState } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tab,
} from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
const AddRoute = () => {
  const router=useRouter()
  const [transportcategory, setTransportCategory]=useState("Itinerary Transport")
  const [addcity, setAddCity]=useState(1)
  const [region,setRegion]=useState('State')
  const [addseason, setAddSeason]=useState(0)
  return (
    <>
      <Card className="p-3">
      <div className='text-end'>
                          <Button variant='primary' size='sm'
                          onClick={()=>router.push('/my-inventory/transport-rates')}
                          style={{ fontSize: "10px"}} ><Icon icon="mdi:eye" className='me-1'/>Transport Routes Listing</Button>
                      </div>

      <hr/>
      <Form>
      <Row className='g-2'>
        <Col md={12}>
        <div className='d-flex gap-2 align-items-center'>
          <Form.Label  style={{ fontSize: "12px"}} className='text-primary'>Category</Form.Label>
          <Form.Check type='radio' name='type' 
          id='Itinerary Transport' 
          defaultChecked
          onChange={(event)=>setTransportCategory(event.target.value)}
          label='Itinerary Transport'  style={{ fontSize: "12px"}}/>
          <Form.Check type='radio' name='type'
          onChange={(event)=>setTransportCategory(event.target.value)}
          id='Point to Point Transfers' value="Point to Point Transfers" label='Point to Point Transfers'  style={{ fontSize: "12px"}} />
           <Form.Check type='radio' name='type' value='SIC (Ferry Transfer)'
           onChange={(event)=>setTransportCategory(event.target.value)}
           id='SIC (Ferry Transfer)'  label='SIC (Ferry Transfer)'  style={{ fontSize: "12px"}} />
           <Form.Check type='radio' name='type' value='Per Day Cost'
           onChange={(event)=>setTransportCategory(event.target.value)}
           id='Per Day Cost' label='Per Day Cost'  style={{ fontSize: "12px"}} />


          


          </div></Col>

        {transportcategory === "Point to Point Transfers" && (
          <Col md={12}>
            <div className='d-flex gap-2 mb-1'>
              <Form.Check type='checkbox' name='way' id='Local/City / Tour Transfer' label='Local/City / Tour Transfer'  style={{ fontSize: "12px"}}/>
               <Form.Check type='checkbox' name='way' id='Airport Transfer' label='Airport Transfer'  style={{ fontSize: "12px"}}/>
           <Form.Check
  type="checkbox"
  label="Railway Station Transfer"
  name="transportType"
  id="railwayTransfer"
  style={{ fontSize: "12px" }}
/>

<Form.Check
  type="checkbox"
  label="Bus Stand Transfer"
  name="transportType"
  id="busStandTransfer"
  style={{ fontSize: "12px" }}
/>

<Form.Check
  type="checkbox"
  label="Port Transfer"
  name="transportType"
  id="portTransfer"
  style={{ fontSize: "12px" }}
/>

<Form.Check
  type="checkbox"
  label="Meal Transfer"
  name="transportType"
  id="mealTransfer"
  style={{ fontSize: "12px" }}
/>
           
            </div>
          </Col>
        )}
{ transportcategory !== 'Per Day Cost' && (
  <>
          <Col md={3}>
            <Form.Label  style={{ fontSize: "12px"}} className='text-primary'>Transport Type</Form.Label>
           <div className='d-flex gap-2 align-items-center'>
        
          <Form.Check type='radio' name='waytype' id='One Way' label='One Way'  style={{ fontSize: "12px"}}/>
          <Form.Check type='radio' name='waytype' id='Round Trip'  label='Round Trip'  style={{ fontSize: "12px"}} />
          </div>
          </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                 Start City
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Destination City
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
              </Form.Group>
            </Col>

              <Col md={3}>
                          <Form.Group>
                            <Form.Label
                              style={{ fontSize: "12px" }}
                              className="text-primary"
                            >
                             Route Name
                            </Form.Label>
                            <Form.Control size="sm" style={{ fontSize: "12px" }} />
                          </Form.Group>
                        </Col>
</>
)}
      { transportcategory !== 'SIC (Ferry Transfer)' && transportcategory !== 'Per Day Cost'  && (

    <> 
<Row className='mt-2'>
      <Col md={2}>
                          <Form.Group>
                            <Form.Label
                              style={{ fontSize: "12px" }}
                              className="text-primary"
                            >
                                Cities Included
                            </Form.Label>
                         
                          </Form.Group>
                        </Col>

      <Col md={2}>
                          <Form.Group>
                            <Form.Label
                              style={{ fontSize: "12px" }}
                              className="text-primary"
                            >
                               No of Days
                            </Form.Label>
                        </Form.Group>
                        </Col>

      <Col md={3}>
                          <Form.Group>
                            <Form.Label
                              style={{ fontSize: "12px" }}
                              className="text-primary"
                            >
                             Destinations Covered
                            </Form.Label>
                          
                          </Form.Group>
                        </Col>  
          <Col md={3}>
                          <Form.Group>
                            <Form.Label
                              style={{ fontSize: "12px" }}
                              className="text-primary"
                            >
                               Sightseeing Covered
                            </Form.Label>
                  
                          </Form.Group>
                        </Col>
           </Row> 
           { [...Array(addcity)].map((_, index)=>(
            <Row key={index} className='g-1'>
              <Col md={2}>
                          <Form.Group>
                           
                            <Form.Control size="sm" style={{ fontSize: "12px" }} />
                          </Form.Group>
                        </Col>

                <Col md={2}>
                          <Form.Group>
                         
                       <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                       <option>Select</option>
                                       <option>1</option>
                                       <option>2</option>
                                     </Form.Select>
                          </Form.Group>
                        </Col>

                            <Col md={3}>
                          <Form.Group>
                          
                            <Form.Control size="sm" style={{ fontSize: "12px" }} />
                          </Form.Group>
                        </Col>  

                         <Col md={3}>
                          <Form.Group>
                           
                            <Form.Control size="sm" style={{ fontSize: "12px" }} />
                          </Form.Group>
                        </Col>

                               <Col md={2}>
                    <div className='d-flex gap-2'>
                       <Button
              variant="outline-danger"
              size="sm"
               onClick={()=>setAddCity(addcity -1)}
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
            <Icon icon="mdi:minus" />
            </Button>
                    </div>
                        </Col> 
                        </Row>
  ))}
              <div className='text-end'>
                  <Button
              variant="danger"
              size="sm"
              onClick={()=>setAddCity(addcity +1)}
              style={{ fontSize: "10px" }}
            >
            Add City & Sightseeing
            </Button>
              </div>
              </>
)}
     <Col md={6}>
          <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  Description
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
        </Col>
{ transportcategory !== 'Per Day Cost' && (
  <>
         <Col md={3}>
          <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 Pick up Point Area
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
        </Col>

         <Col md={3}>
          <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 Drop Point Area
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
        </Col>

     
  <Col md={12}>
  <div className='d-flex flex-column gap-1'   style={{ fontSize: "10px" }}>
  <strong >For With Hotel BYO :</strong>
  <strong>For Land Only BYO :</strong>
  </div>
  </Col>
 
</>
)}


</Row>


{transportcategory === 'Per Day Cost' && (
  <>
  <Row className='mt-2 align-items-center'>
  <Col md={3}>
     <div className='d-flex gap-2 align-items-center'>
        
          <Form.Check type='radio' name='region' value='State'
          onChange={(event)=>setRegion(event.target.value)}
          id='State' label='State'  style={{ fontSize: "12px"}}/>
          <Form.Check type='radio' name='region' value='Country'
           onChange={(event)=>setRegion(event.target.value)}
          id='Country'  label='Country'  style={{ fontSize: "12px"}} />
          </div>
  </Col>



    

       { region === 'State' ?(
       <Col md={3}>
          <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                State
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
        </Col> )
        : (
           <Col md={3}>
          <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                 Country
                </Form.Label>
                <Form.Control size="sm" style={{ fontSize: "12px" }} />
        </Col> )
  }
  </Row>
  </>
)}
      </Form>

       <div className="p-3 border mt-4">

      {/* Vehicle Type */}
      <div className="mb-3 d-flex gap-2">
         <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
               Vehicle Cost Type
                </Form.Label>
        <Form.Check
          inline
          type="radio"
          label="Normal"
          id="Normal"
            style={{ fontSize: "12px" }}
          name="vehicle"
        />
        <Form.Check
          inline
          type="radio"
          label="KM Based"
          id="KM Based"
            style={{ fontSize: "12px" }}
          name="vehicle"
        />
      </div>
   
      {/* Table */}
      <div className='table-responsive'>
      <table className='table table-sm table-bordered'>
      <tbody>
        <tr  style={{ fontSize: "12px" }} >
          <td><strong>Add Season</strong></td>
          <td>
            Currency
          </td>
          <td colSpan={4}>
            <Col md={3}>
             <Form.Select size='sm' style={{ width: "150px", fontSize:"12px" }}>
          <option>INR</option>
          <option>USD</option>
        </Form.Select></Col>
          </td>
        </tr>
    
          <tr className='bg-light'  style={{ fontSize: "12px" }}>
            <th>From</th>
            <th>To</th>
            <th>Mark Up</th>
            <th>B2C</th>
            <th>B2B</th>
            <th></th>
          </tr>
      
            <tr  style={{ fontSize: "12px" }}>
              <td><Form.Control type="date" size="sm"  style={{ fontSize: "12px" }} /></td>
              <td><Form.Control type="date" size="sm" style={{ fontSize: "12px" }} /></td>
              <td>
                <Form.Select size="sm"  style={{ fontSize: "12px" }}>
                  <option>Fixed %</option>
                  <option>Fixed</option>
                </Form.Select>
              </td>
              <td><Form.Control size="sm"  style={{ fontSize: "12px" }} /></td>
              <td><Form.Control size="sm"  style={{ fontSize: "12px" }} /></td>
           
            </tr>
        
        { [...Array(addseason)].map((_,index)=>(
            <tr key={index} style={{ fontSize: "12px" }}>
              <td><Form.Control type="date" size="sm"  style={{ fontSize: "12px" }} /></td>
              <td><Form.Control type="date" size="sm" style={{ fontSize: "12px" }} /></td>
              <td>
                <Form.Select size="sm"  style={{ fontSize: "12px" }}>
                  <option>Fixed %</option>
                  <option>Fixed</option>
                </Form.Select>
              </td>
              <td><Form.Control size="sm"  style={{ fontSize: "12px" }} /></td>
              <td><Form.Control size="sm"  style={{ fontSize: "12px" }} /></td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  style={{ fontSize: "12px" }}
                >
                  -
                </Button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-2">
        <Button size="sm" variant='outline-primary'
        onClick={()=>setAddSeason(addseason+1)}
        style={{ fontSize: "12px" }} >
          Add More Season
        </Button>
        <Button size="sm" variant="success"  style={{ fontSize: "12px" }}>
          Add Cost
        </Button>
      </div>

      <hr/>

       <div className="d-flex align-items-center justify-content-end gap-3 py-2">
       <Form.Check label='Website' id='Website'  style={{ fontSize: "12px" }}  />
        <Button size="sm" variant='outline-danger'
        onClick={()=>router.push('/my-inventory/transport-rates')}
        style={{ fontSize: "12px" }} >
         Cancel
        </Button>
        <Button size="sm" variant="danger"  style={{ fontSize: "12px" }}>
        Save Route
        </Button>
      </div>
    </div>
      </Card>


      
    </>
  )
}

export default AddRoute
