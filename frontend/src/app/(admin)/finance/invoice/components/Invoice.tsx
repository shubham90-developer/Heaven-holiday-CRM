"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import AddPaymentModal from "./AddPaymentModal";
import { useRouter } from "next/navigation";

const Invoice = () => {
    const router = useRouter();
    const [addpaymentmodal, setAddPaymentModal] = useState(false)
  return (
    <>
         <div className="mb-2">
            <Filter/>
        </div>
        <Card className="p-3">
            <div className="mb-3">
 <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-center border-bottom pb-2">
    <div className="d-flex flex-wrap flex-lg-nowrap align-items-center gap-2">
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Current Month
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Last Month
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Over All
        </Button>
        <input type="date"
        className="form-control form-control-sm"
        style={{fontSize:"10PX"}}/>

            <input type="date"
        className="form-control form-control-sm"
        style={{fontSize:"10PX"}}/>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Submit
        </Button>
    </div>

    <div className="d-flex gap-2 justify-content-end">
                 <Button 
                                    variant="outline-secondary"
                                    size="sm"
                                    style={{fontSize: "10PX", fontWeight:"bold"}}
                                    >
                                        <Icon icon="mdi:file-export"/>
                                    </Button>
    </div>
 </div>
            </div>
            <div className="text-end mb-2">
                   <Button 
                                    variant="danger"
                                    size="sm"
                                    onClick={()=>router.push("/finance/invoice/add-invoice")}
                                    style={{fontSize: "10PX", fontWeight:"bold"}}
                                    >
                                       <Icon icon="mdi:plus" /> Add Manual Invoice
                                    </Button>
            </div>
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>

                            <th style={{width:"50px"}}>S. No</th>

                                <th style={{width:"140px"}}>Invoice Date</th>

                            <th style={{width:"140px"}}>Invoice No</th>

                            <th style={{width:"250px"}}>Customer Details</th>

                                <th style={{width:"140px"}}>Invoice Value</th>

                                    <th style={{width:"140px"}}>Received</th>
                                        <th style={{width:"140px"}}>Balance</th>
                                            <th style={{width:"140px"}}>Due Date</th>
                                                <th style={{width:"140px"}}>Owner</th>
                                                    <th style={{width:"140px"}}>Status</th>
                                                        <th style={{width:"150px"}}>Action</th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize: "12px"}}>
                        <tr>
                            <td>1</td>
                            <td>01-09-2024</td> 
                            <td>2025-03-000079</td>   
                            <td>
                                <div><Icon icon="mdi:account" className="me-1" />Sagar Shah</div>
                         <div><Icon icon="mdi:email" className="me-1" />9960358588.aheaven@gmail.com</div>
                          <div><Icon icon="mdi:phone" className="me-1" /> 1234567890</div>
                          
                            </td>
                            <td>163,953.00</td>
                            <td>50,000.00</td>
                            <td>INR 113,953.00	</td>
                            <td>29-Mar-26</td>
                            <td>	RAJENDRA BUGADE	</td>
                            <td>Partially Paid</td>
                            <td>
                                <Form.Select size="sm"
                                  defaultValue=""
  onChange={(e) => {
  
    const value=e.target.value;

    e.target.value="";

    if (value === "payment") {
      setAddPaymentModal(true);
    }
     if(value === "modify"){
     
        router.push('/finance/invoice/add-invoice')
    }
    

  }}
  style={{fontSize:"12px"}}
>
  <option value="">Select Action</option>
  <option value="payment">Add a Payment</option>
  <option value="cancel">Cancel Invoice</option>
  <option value="modify">Modify Invoice</option>
   <option value="invoice">Send Invoice</option>
  <option value="whatsapp">Share on WhatsApp</option>
  <option value="email">Send Email</option>
  <option value="reminder">Send Reminder</option>
  <option value="print">View / Print Invoice</option>
</Form.Select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                { addpaymentmodal && ( <AddPaymentModal onClose={()=>setAddPaymentModal(false)} /> )}
            </div>
        </Card>
    </>
  )
}

export default Invoice
