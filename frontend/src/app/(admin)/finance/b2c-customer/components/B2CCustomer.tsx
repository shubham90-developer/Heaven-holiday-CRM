"use client";
import React from 'react'

import { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import EditCreditModal from './EditCreditModal';
import Filter from './Filter';
const B2CCustomer = () => {
       const router = useRouter();
         const pathname = usePathname();
       const [editCredit, setEditCredit] = useState(false);
  return (
    <>
      <div className="mb-4">
        <Filter/>
      </div>
        <Card className="p-3">
            <div className="mb-4">
                <div className="d-flex flex-wrap flex-lg-nowrap  gap-2 mb-2 border-bottom pb-2">
                   <Button
                     variant={pathname==='/finance/b2c-customer' ? "primary" : "outline-primary"}
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
            
                                            <th style={{width:"140px"}}>Customer ID</th>
            
                                        <th style={{width:"220px"}}>Name/Mobile</th>
            
                                        <th style={{width:"250px"}}>Credit Limit</th>
            
                                            <th style={{width:"140px"}}>Credit Limit Type</th>
                                                    <th style={{width:"140px"}}>Credit Consumed</th>   
                                                <th style={{width:"140px"}}>Net Balance</th>
                                                    <th style={{width:"140px"}}>Total Business</th>
                                                        <th style={{width:"140px"}}>RM</th>
                                                            <th style={{width:"140px"}}>Status</th>
                                                                <th style={{width:"140px"}}>Active Since</th>
                                                                 <th style={{width:"140px"}}>Settlement Date</th>
                                                                  <th style={{width:"140px"}}>Stop / Start Wallet</th>
                                                                   <th style={{width:"140px"}}>Update Funds</th>
                                                                    <th style={{width:"150px"}}>View</th>
                                    </tr>
                                </thead>
            
                                <tbody style={{fontSize: "12px"}}>
                                    <tr>
                                       <td>1</td>
                                       <td>1576324</td>
                                       <td>
                                        <div><Icon icon="mdi:account" /> Mr. Avinash Shinde</div>
                                        <div><Icon icon="mdi:email" /> 8857870323.aheaven@gmail.com</div>
                                        <div><Icon icon="mdi:phone" /> +91-8857870323</div>
                                       </td>

                                       <td>0</td>
                                       <td>Recurring</td>
                                       <td>0</td>
                                       <td>0</td>
                                       <td>0</td>
                                       <td>Pallavi Laskeshri</td>
                                       <td>Active</td>
                                       <td>	10/04/2026</td>
                                       <td>10/04/2026</td>
                                       <td><Form.Check type='checkbox'/></td>
                                       <td> <Button variant='primary' size='sm' 
                                       onClick={() => setEditCredit(true)}
                                        style={{fontSize:"12px", fontWeight:"bold"  }}><Icon icon="mdi:edit" /></Button></td>
                                       <td>
                                        <div className='d-flex flex-column gap-1'>
                                            <span className='action-btn view'>
                                        <Button variant='success' size='sm'
                                        title='view'
                                       style={{fontSize:"10px"}} 
                                       onClick={()=>router.push('../finance/b2c-customer/view-ledger')}><Icon icon="mdi:eye"/></Button>
                                       </span>
                                       <span className='action-btn chat'>
                                       <Button variant='primary' size='sm'  style={{fontSize:"10px" }}onClick={()=>router.push('../finance/b2c-customer/view-customer')}>Ledger</Button>
                                        </span>
                                       </div>
                                       </td>
                                    
                                    </tr>
                                    {editCredit && ( <EditCreditModal onClose={() => setEditCredit(false)}/> )}
                                  
                                </tbody>
                            </table>
                        </div>
             

                
                        
        </Card>
    </>
  )
}

export default B2CCustomer
