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
import Filter from './Filter';

const Tabs:string[]=[
    "In Process",
    "Expired"
]
const GroupDeparture = () => {
  const router=useRouter()
    const [activetab, setActiveTab]=useState<number>(0);
  return (
    <>
      <div className='mb-2'>
        <Filter/>
      </div>
      <Card className='p-3'>
      <div className='d-flex gap-2 mb-3'>
        { Tabs.map((tab,item)=>(
            <Button key={item}
            variant={activetab === item ? "primary" :"outline-primary"}
            size='sm'
            style={{fontSize:'10px'}}
            >{tab}</Button>
        ))}
      </div>

         <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "60px" }}>Sr No.</th>
    <th style={{ width: "120px" }}>Package Id</th>
    <th style={{ width: "200px" }}>Package Name</th>
    <th style={{ width: "180px" }}>Travel Dates</th>
    <th style={{ width: "150px" }}>Supplier</th>
    <th style={{ width: "140px" }}>Departure City</th>
    <th style={{ width: "140px" }}>Start City</th>
    <th style={{ width: "140px" }}>End City</th>
    <th style={{ width: "120px" }}>Rates/Person</th>
    <th style={{ width: "100px" }}>Inventory</th>
    <th style={{ width: "80px" }}>Sold</th>
    <th style={{ width: "80px" }}>Hold</th>
    <th style={{ width: "120px" }}>Availability</th>
    <th style={{ width: "120px" }}>Action</th>
              </tr>
              </thead>
        <tbody>
            <tr style={{ fontSize: "10px"}}>
                 <td>1</td>
    <td>113780</td>
    <td>KASHI</td>
    <td>26th Aug 2026</td>
    <td>A Heaven Holiday</td>
    <td>Mumbai</td>
    <td>Mumbai</td>
    <td>Mumbai</td>
    <td>INR 24991</td>
    <td>30</td>
    <td>0</td>
    <td>0</td>
    <td>
      <span className="text-success fw-semibold">30</span>
    </td>

    {/* ACTION COLUMN */}
    <td>
     
        <div className="text-primary" style={{ cursor: "pointer" }}>
         <span   onClick={() => router.push("/my-inventory/group-departure/bookings")}>Bookings</span>
         <span onClick={() => router.push("/my-inventory/packages/add-package")}> | Update Inventory</span>
        </div>
        <div className="text-primary" style={{ cursor: "pointer" }}>
          <span onClick={() => router.push("/my-inventory/packages/add-package")}>Update Rate</span>
         <span onClick={() => router.push("/my-inventory/group-departure/bookings/add-inventory")}> | Book Offline</span>
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

export default GroupDeparture
