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
import { useRouter } from 'next/navigation';
const Restaturants = () => {
    const router=useRouter()
  return (
    <>
      <Card className="p-3">
        <div className='text-end mb-3'>
    <Button variant='primary' size='sm'
    onClick={()=>router.push('/my-inventory/restaturants/add-restaturants')}
    style={{ fontSize: "10px"}}><Icon icon="mdi:plus" className='me-1'/>Add Restaturants</Button>
        </div>
         <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
               <th style={{ width: "50px" }}>S.No</th>
    <th style={{ width: "150px" }}>Restaurant Area</th>
    <th style={{ width: "250px" }}>Address</th>
    <th style={{ width: "180px" }}>Supplier Name</th>
    <th style={{ width: "120px" }}>Country</th>
    <th style={{ width: "120px" }}>City</th>
    <th style={{ width: "120px" }}>Is Preferred</th>
    <th style={{ width: "100px" }}>Rates</th>
    <th style={{ width: "100px" }}>Update</th>
            
              </tr>
              </thead>

              </table>
              </div>
      </Card>
    </>
  )
}

export default Restaturants
