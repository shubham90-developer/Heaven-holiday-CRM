"use client";
import React, { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import SavedMemberModal from './SavedMemberModal';
import SalesOverview from './components/SalesOverview';
import CollectionDetails from './components/CollectionDetails';
import { Icon } from '@iconify/react/dist/iconify.js';
import EMIReminder from './components/EMIReminder';
import SupplierPayment from './components/SupplierPayment';
import NetProfitLoss from './components/NetProfitLoss';
import Summary from './components/Summary';
import Hotel from './components/Hotel';
import Flights from './components/Flights';
import ServicesIncluded from './components/ServicesIncluded';
import Transfers from './components/Transfers';
import Sightseeings from './components/Sightseeings';
import Meals from './components/Meals';
import CashFlow from './components/CashFlow';
import Visa from './components/Visa';
import Others from './components/Others';
import RefundPolicy from './components/RefundPolicy';
import Itinerary from './components/Itinerary';
import Sightseeing from '@/app/(admin)/crm/leads/view-leads/Sightseeing';
const BookingDetail = () => {
  const [showtraveler, setShowTraveler]=useState(true)
  const [showlookfile, setShowLookFile]=useState(true)
  const [savedmember, setSavedMember]=useState(false)
  const [editraveler, setEditTraveler]=useState(false)
    const [services,setServices]=useState(false)
      const [activeTab, setActiveTab]=useState("Hotel")
  return (
    <>
      <Card className="">
        <CardHeader className='d-flex justify-content-between  bg-dark text-white p-2'>
<b>Query Detail</b>
<div className='d-flex gap-2'>
    <span>B2C</span>
    <Form.Check 
    type='checkbox'
    onChange={(e) => setShowLookFile(!showlookfile)}
    style={{fontSize:"12px"}} /> Look File
</div>
        </CardHeader>
        <CardBody>
            <Row className=''  style={{fontSize:'12px'}} >
                     <Col md={6} className='mb-2'>
              <div className="border p-1">
                <b>Package Name:</b> Munnar-Alleppey trip details for Prince
              </div>
            </Col>

                <Col md={6} className='mb-2'>
              <div className="border p-1">
                <b>Start City:</b> Munnar
              </div>
            </Col>

                <Col md={6} className=''>
              <div className="border p-1">
               <b>Destinations:</b> Munnar, Alleppey
              </div>
            </Col>

             <Col md={6} className=''>
              <div className="border p-1">
                  <b>Travel Date:</b> 27 Dec, 2025 - 30 Dec, 2025
              </div>
            </Col>

            </Row>

           <hr></hr>
                  <Row className="mt-3" style={{fontSize:"12px"}} >
            <Col md={2} className="mb-2 fw-bold">Sales Person</Col>

            <Col md={3}>
              <div className="border p-1"><b>Name:</b> RAJENDRA BUGADE</div>
            </Col>
            <Col md={3}>
              <div className="border p-1"><b>Email:</b> b2b.aheaven@gmail.com</div>
            </Col>
            <Col md={4}>

  <div className="border p-1"><b>Mobile Number:</b> +91 8602410707</div>
           
            </Col>
          </Row>

        
             <Row className="mt-2" style={{fontSize:"12px"}} >
            <Col md={2} className="mb-2 fw-bold">Customer Contact</Col>

            <Col md={3}>
              <div className="border p-1"><b>Name:</b> Mr. Prince I</div>
            </Col>
            <Col md={3}>
              <div className="border p-1"><b>Email:</b> Prince@hellogtx.com</div>
            </Col>
            <Col md={4}>
             <div  className='d-flex justify-content-between border p-1'>

              <span className=""><b>Mobile Number:</b> +91 8368874827</span>
               <div>
                  <Button size="sm" variant="primary" className="me-1"><Icon icon="mdi:phone" className='me-1'/></Button>
                  <Button size="sm" variant="success"><Icon icon="mdi:whatsapp" className='me-1'/></Button>
                </div>
              </div>
            </Col>
          </Row>

        </CardBody>
      </Card>
      <Row className='mb-3 align-items-center px-1'>
        <Col md={4} className='align-items-center'>
        <span className='mt-3' style={{fontSize:"16px"}}><strong>Proposal ID</strong>:1974346</span>
        </Col>

        <Col md={8} className='d-flex justify-content-md-end gap-2 flex-wrap'>
      { showlookfile && (
        <div className='d-flex gap-2'>
        <Form.Select size='sm' style={{width:"150px", fontSize:"12px"}}  >
    <option>Only Voucher</option>
    <option>With itinerary</option>
</Form.Select>

<Button size='sm'  variant='danger' style={{fontSize:"12px"}}>Generate Voucher</Button>
   </div>   ) }
<div className='d-flex align-items-center border p-1 gap-2'>
  <span className='small fw-semibold'>Only Voucher</span>
  <div className='d-flex gap-1'>
     <Button size="sm" variant="danger"><Icon icon="mdi:file"/></Button>
      <Button size="sm" variant="warning"> <Icon icon="mdi:mail"/></Button>
      <Button size="sm" variant="success"><Icon icon="mdi:whatsapp"/></Button>
  </div>
</div>

<div className='d-flex align-items-center border p-1 gap-2'>
  <span className='small fw-semibold'>With Ithinerary</span>
  <div className='d-flex gap-1'>
     <Button size="sm"  variant="danger"><Icon icon="mdi:file"/></Button>
      <Button size="sm" variant="warning"> <Icon icon="mdi:mail"/></Button>
      <Button size="sm" variant="success"><Icon icon="mdi:whatsapp"/></Button>
  </div>
</div>


        </Col>
      </Row>

       <Card className="mb-3">
        <CardHeader className="bg-dark text-white d-flex justify-content-between p-2">
        <b>  Traveller Details (2 Adults)</b>
          <Button size='sm' variant='light' 
          onClick={()=>setShowTraveler(!showtraveler)}
          style={{borderRadius:"25%"}}>{ showtraveler ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
        </CardHeader>
        { showtraveler && (
        <CardBody className="p-0">
          <div className='table-responsive'>
          <table className="table table-sm table-bordered align-middle">
            <thead className="table-light" >
              <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                <th>TYPE</th>
                <th>SALUTATION</th>
                <th>FIRST-MIDDLE NAME *</th>
                <th>LAST NAME</th>
                <th>PASSPORT NO.</th>
                <th>ISSUE DATE</th>
                <th>EXPIRY DATE</th>
                <th>DOB</th>
                <th>PAN NO.</th>
                <th>NATIONALITY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody style={{fontSize:"12px"}}>
              <tr>
                <td>Adult</td>
                <td> { editraveler ?  <Form.Select size="sm" style={{fontSize:"10px", width:"100px"}} >
                    <option>-- Select --</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                  </Form.Select>   : "Mr." }</td>
                <td> { editraveler ? <Form.Control size='sm' style={{fontSize:"10px"}} placeholder='prince'/> : "Prince" }</td>
                <td>{ editraveler ? <Form.Control size='sm' style={{fontSize:"10px"}} placeholder='L'/> : "L" }</td>
                <td>{ editraveler ? <Form.Control size='sm' style={{fontSize:"10px"}} placeholder='8976QE2'/> : "8976QE2" }</td>
                <td>{ editraveler ? <Form.Control size='sm' style={{fontSize:"10px"}} placeholder=''/> : "NA" }</td>
                <td>{ editraveler ? <Form.Control size='sm' style={{fontSize:"10px"}} placeholder=''/> : "NA" }</td>
                <td>{ editraveler ? <Form.Control type='date' size='sm' style={{fontSize:"10px"}} placeholder='17/2/2002'/> : "17/2/2002" }</td>
                <td>{ editraveler ? <Form.Control size='sm' style={{fontSize:"10px"}} placeholder=''/> : "NA" }</td>
                <td>{ editraveler ?  <Form.Select size="sm" style={{fontSize:"10px", width:"100px"}} >
                    <option>Select Country</option>
                    <option>India</option>
                  </Form.Select>   : "NA" }</td>
                <td>
                 { editraveler ? 
                   <div className='d-flex'>
                  <span className="me-1 border px-1"
                  onClick={()=>setEditTraveler(!editraveler)}
                  style={{cursor:"pointer"}} title='save changes'>
                    <Icon icon="mdi:check" className='text-success'/></span>
                  <span className='border px-1' title='cancel'
                                    onClick={()=>setEditTraveler(!editraveler)}
                  style={{cursor:"pointer"}}
                  ><Icon icon="mdi:close" className='text-danger'/></span>
                </div>
                 :<Button size="sm" variant="outline-primary" 
                  onClick={()=>setEditTraveler(!editraveler)}
                  title='edit fields'><Icon icon="mdi:edit" /></Button> }
                </td>
              </tr>

              {/* Editable Row */}
              <tr>
                <td><div className='d-flex gap-1'>
                  Adult
                  <span className='border px-1' 
                  style={{cursor:"pointer"}}
                  onClick={()=>setSavedMember(true)}
                  ><Icon icon="mdi:account"/></span>
                </div>
                </td>
 { savedmember && ( <SavedMemberModal onClose={()=> setSavedMember(false)} /> )}
                <td>
                  <Form.Select size="sm" style={{fontSize:"10px", width:"100px"}} >
                    <option>-- Select --</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                  </Form.Select>
                </td>

                <td><Form.Control size="sm"  style={{fontSize:"10px"}}/></td>
                <td><Form.Control size="sm"   style={{fontSize:"10px"}}/></td>
                <td><Form.Control size="sm"   style={{fontSize:"10px"}}/></td>
                <td><Form.Control size="sm"   style={{fontSize:"10px"}}/></td>
                <td><Form.Control size="sm"   style={{fontSize:"10px"}}/></td>
                <td><Form.Control size="sm"  style={{fontSize:"10px"}}/></td>
                <td><Form.Control size="sm"   style={{fontSize:"10px"}}/></td>
                <td><Form.Select size="sm"   style={{fontSize:"10px"}}>
                  <option>Select Country</option>
                  <option>India</option></Form.Select></td>

                <td>
                  <div className='d-flex'>
                  <span className="me-1 border px-1"><Icon icon="mdi:check" className='text-success'/></span>
                  <span className='border px-1'><Icon icon="mdi:close" className='text-danger'/></span>
                </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </CardBody>
        ) }
      </Card>
    
    <SalesOverview/>
    <CollectionDetails/>
    <EMIReminder/>
    <SupplierPayment/>
    <NetProfitLoss/>
    <Summary/>
    <CashFlow/>

  <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b>  Services Included</b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setServices(!services)}
                      style={{borderRadius:"25%"}}>{ services ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ services && (
                      <CardBody className="p-2">
                            <div className='d-flex gap-1'>
                                {["Hotel","Insurance","Others","Sightseeing","Flights","Guide","Meals","Transfers","Visa"].map((item)=>(
                                      <Button key={item}
                                      onClick={()=>setActiveTab(item)}
                                      variant={activeTab===item? "secondary":"outline-secondary"}
                                      size="sm" className="me-2" style={{fontSize:"10px"}}>{item}</Button>
                                ))}
                            </div>
                    </CardBody>
)
}
      </Card>

      { activeTab === "Hotel" && ( <Hotel/>)}
      <Flights/>
      <Transfers/>
      <Sightseeings/>
      <Meals/>
      <Visa/>
      <Others/>
      <RefundPolicy/>
      <Itinerary/>
    </>
  )
}

export default BookingDetail
