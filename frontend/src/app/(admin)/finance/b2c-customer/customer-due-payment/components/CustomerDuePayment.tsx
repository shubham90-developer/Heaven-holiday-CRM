"use client";
import React from 'react'

import { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import Filter from './Filter';
const CustomerDuePayment = () => {
       const router = useRouter();
       const [editCredit, setEditCredit] = useState(false);
     const pathname = usePathname();
  return (
    <>
      <div className="mb-4">
        <Filter/>
      </div>
        <Card className="p-3">
            <div className="mb-4">
                <div className="d-flex flex-wrap flex-lg-nowrap  gap-2 mb-2 border-bottom pb-2">
                   <Button
                        variant={pathname === '/finance/b2c-customer' ? "primary" : "outline-primary"}
                        onClick={()=>router.push('/finance/b2c-customer')}
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}>
                        Customer List
                    </Button>
                    <Button
                        variant={pathname === '/finance/b2c-customer/customer-due-payment' ? "primary" : "outline-primary"}
                        size="sm"
                        onClick={()=>router.push('/finance/b2c-customer/customer-due-payment')}
                        style={{fontSize:"10px", fontWeight:"bold"}}>
                       Due Payment
                    </Button>
                </div>
            </div>  
              <div className="table-responsive">
                            <table
                            className="table table-sm table-bordered mb-0 align-middle"
                            style={{tableLayout:"fixed", width:"100%"}}>
                                <thead>
                                    <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>
            
                                        <th style={{width:"50px"}}>S. No</th>
            
                                            <th style={{width:"140px"}}>Due Date</th>
            
                                        <th style={{width:"220px"}}>Customer Details</th>
            
                                        <th style={{width:"250px"}}>Booking / Invoice ID</th>
            
                                            <th style={{width:"140px"}}>Amount</th>
                                                            <th style={{width:"140px"}}>Status</th>
                                    </tr>
                                </thead>
            
                                <tbody style={{fontSize: "12px"}}>
                                    <tr>
                                       <td>1</td>
                                       <td>	03/12/2025</td>
                                       <td>
                                        <div><Icon icon="mdi:account" /> Prince L</div>
                                        <div><Icon icon="mdi:email" />Prince@hellogtx.com</div>
                                        <div ><Icon icon="mdi:phone" />+91-8368874827</div>
                                       </td>

                                       <td><div onClick={()=>router.push('/finance/b2c-customer/booking-detail')}
                                        style={{cursor:"pointer"}}>1974346 <Icon icon="mdi:eye" className='ms-1' /></div></td>
                                        <td>INR 131600</td>
                                       <td><span className='text-danger'>Over Due</span></td>
                                    </tr>
                                    
                                  
                                </tbody>
                            </table>
                        </div>
              

                
                        
        </Card>
    </>
  )
}

export default CustomerDuePayment
