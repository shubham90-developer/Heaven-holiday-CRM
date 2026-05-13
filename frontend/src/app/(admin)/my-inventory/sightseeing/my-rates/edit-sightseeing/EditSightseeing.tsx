"use client";
import React from 'react'
import { useState } from "react";
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
import CustomFlatpickr from '@/components/CustomFlatpickr';
import AddCostModal from './AddCostModal';
import AddPoliciesModal from './AddPoliciesModal';
const EditSightseeing = () => {
    const router=useRouter()
    const [addcost, setShowAddCost]=useState(false)
    const [addpolicies, setAddPolicies]=useState(false)
  return (
    <>
       <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center mb-3 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/add-sightseeing")}
          >
            <Icon icon="mdi:plus" className="me-1" /> Add Sightseeing
          </Button>

         <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/my-rates")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Rates
          </Button>

           <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/my-rates/add-rate")}
          >
            <Icon icon="mdi:plus" /> Add Rates
          </Button>
        </div>
       
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                   <th>Sightseeing Name</th>
  <th>From</th>
  <th>To</th>
  <th>Supplier</th>
  <th>Currency</th>
  <th>Entry Cost</th>
  <th>Manage Cost</th>
  <th>Booking Type</th>
  <th>T & C</th>
  <th>DOW</th>
  <th>Action</th>
                  </tr>
                  <tr style={{ fontSize: "10px"}}>
                    <th colSpan={5}></th>
                    <th>Adult</th>
                    <th>Kids</th>
                    <th colSpan={5}></th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                  
                    <td>Disneyland Paris</td>
  <td><CustomFlatpickr  style={{ fontSize: "12px" }} className='form-control form-control-sm'></CustomFlatpickr> </td>
    
  <td><CustomFlatpickr  style={{ fontSize: "12px" }} className='form-control form-control-sm'></CustomFlatpickr> </td>
  <td>A Heaven Hospitality pvt ltd</td>
  <td><Form.Select size='sm' style={{ fontSize: "12px" }}>
    <option>INR</option>
    <option>KRW</option>
    </Form.Select></td>
  <td><Form.Control type='text' size='sm' style={{ fontSize: "12px" }}  /></td>
  <td><Form.Control type='text' size='sm' style={{ fontSize: "12px" }}  /></td>
<td><span className='text-primary' onClick={()=>setShowAddCost(true)} style={{cursor:"pointer"}}>Click to add</span></td>
{ addcost && ( <AddCostModal onClose={()=>setShowAddCost(false)} />)}
<td>On Request</td>
<td><span className='text-primary' onClick={()=>setAddPolicies(true)} style={{cursor:"pointer"}}>Manage</span></td>
{ addpolicies && ( <AddPoliciesModal onClose={()=>setAddPolicies(false)} /> )}
<td><Form.Check style={{ fontSize: "12px" }} /></td>

                    <td>
                      <Button size='sm' variant='danger' style={{ fontSize: "12px" }}>Update</Button>
                         </td>
                  </tr>
                </tbody>
              </table>
            </div>
         
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "600" }}
          >
            Load More <Icon icon="mdi:reload" className="ms-1" />
          </Button>
        </div>
      </Card>
    </>
  )
}

export default EditSightseeing
