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
import { useRouter} from 'next/navigation';
import ViewItineraryModal from './ViewItineraryModal';
import { Icon } from '@iconify/react/dist/iconify.js';
import Filter from './Filter';
const Itinerary = () => {
    const router=useRouter()
    const [viewitinerary, setViewItinerary]=useState(false)
  return (
    <>
      <div className='mb-2'>
        <Filter/>
      </div>
      <Card className="p-3">
        <div className='text-end mb-3'>
             <Button variant='primary' size='sm'
                        onClick={()=>router.push('/my-inventory/itinerary-description/add-itinerary')}
                        style={{ fontSize: "10px"}} ><Icon icon="mdi:plus" className='me-1'/>Add Itinerary</Button>
                   
        </div>

      <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
               <th style={{ width: "60px" }}>S.No</th>
    <th style={{ width: "150px" }}>Start City</th>
    <th style={{ width: "180px" }}>Destination City</th>
    <th style={{ width: "200px" }}>Title</th>
    <th style={{ width: "120px" }}>DOW</th>
    <th style={{ width: "120px" }}>Action</th>
              </tr>
              </thead>
            <tbody>
                <tr style={{ fontSize: "12px"}}>
              <td>1</td>
    <td>Almaty</td>
    <td>Almaty</td>
    <td>Almaty-visit to gorky park (entry only) followed by kok tobe tour</td>
    <td>No</td>
    <td>
        <div className='d-flex flex gap-1'>
            <span className='action-btn delete'>
                <Button 
                                            variant="success"
                                            size="sm"
                                            style={{ fontSize: "8px" }}
                                            onClick={()=>setViewItinerary(true)}
                                            title="View"
                                            ><Icon icon="mdi:eye"/></Button>
            </span>
            { viewitinerary && ( <ViewItineraryModal onClose={()=>setViewItinerary(false)} /> )}
              <span className='action-btn delete'>
                <Button 
                                            variant="primary"
                                            size="sm"
                                            style={{ fontSize: "8px" }}
                                              onClick={()=>router.push('/my-inventory/itinerary-description/edit-itinerary')}
                                            title="edit"
                                            ><Icon icon="mdi:edit"/></Button>
            </span>
              <span className='action-btn delete'>
                <Button 
                                            variant="warning"
                                            size="sm"
                                            style={{ fontSize: "8px" }}
                                          
                                            title="Deactive"
                                            ><Icon icon="mdi:check"/></Button>
            </span>
              <span className='action-btn delete'>
                <Button 
                                            variant="danger"
                                            size="sm"
                                            style={{ fontSize: "8px" }}
                                    
                                            title="Delete"
                                            ><Icon icon="mdi:delete"/></Button>
            </span>

        </div>
    </td>
    </tr>
            </tbody>
            </table>
            </div>

      </Card>
    </>
  )
}

export default Itinerary
