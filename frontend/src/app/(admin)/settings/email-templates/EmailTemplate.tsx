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
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
  CardHeader,
  CardBody
} from "react-bootstrap";
import {useRouter} from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
const EmailTemplate = () => {
    const router=useRouter()
  return (
    <>
    <Card className="p-2">
        <div className='text-end mb-3'>
            <Button variant='primary' size='sm'
            onClick={()=>router.push('/settings/email-templates/add-template')}
            style={{fontSize:"10px"}}><Icon icon="mdi:plus"/>Add Email Template</Button>
        </div>
       
                 <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <thead>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                     <th>Template Name</th>
  <th>Subject</th>
  <th>Status</th>
  <th>Action</th>
                   </tr>
                   </thead>
                <tbody>
                    <tr  style={{fontSize:"12px"}}>
                          <td>Call Back</td>
  <td>Missed Call – Assistance with Your Trip</td>
  <td>Active</td>
  <td>
    <div className='d-flex gap-2'>
        <span className='table-action delete'>
   <Button variant='primary' size='sm' title='edit'
       onClick={()=>router.push('/settings/email-templates/edit-template')}
                    style={{ fontSize: "10px"}} ><Icon icon="mdi:edit"/></Button>
        </span>
        <span className='table-action delete'>
   <Button variant='danger' size='sm' title='delete'
                    style={{ fontSize: "10px"}} ><Icon icon="mdi:delete"/></Button>
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

export default EmailTemplate
