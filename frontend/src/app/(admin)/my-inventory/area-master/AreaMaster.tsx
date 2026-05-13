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
import Filter from '../hotels/components/Filter';
import { useRouter } from 'next/navigation';
const AreaMaster = () => {
    const router=useRouter()
  return (
    <>
      <div className='mb-2'>
        <Filter/>
      </div>
      <Card className='p-3'>
        <div className='text-end mb-3'>
            <Button variant='primary' size='sm'
            onClick={()=>router.push('/my-inventory/area-master/add-area')}
            style={{ fontSize: "10px"}} ><Icon icon="mdi:plus" className='me-1'/>Add Area Master</Button>
        </div>
         <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
              <th style={{ width: "50px" }}>S.No</th>
    <th style={{ width: "150px" }}>City</th>
    <th style={{ width: "150px" }}>Area</th>
    <th style={{ width: "100px" }}>Status</th>
    <th style={{ width: "100px" }}>Action</th>
              </tr>
              </thead>

              </table>
              </div>
      </Card>
    </>
  )
}

export default AreaMaster
