"use client"

import React, {useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import {Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
const Transfer = () =>{
    const router =useRouter();


return (
    <>
    <div className="mb-2">
        <Filter/>
    </div>

    <Card className="p-3">
        <div className="p-3">
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout: "fixed", width:"100%"}}
                >
                    <thead>
                        <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                            <th style={{width:"40px"}}>
                                <Form.Check type="checkbox"/>
                            </th>

                <th style={{ width: "160px" }}>Proposal ID</th>

                <th style={{ width: "140px" }}>Booking Date</th>

                <th style={{ width: "110px" }}>Travel Date</th>

  <th style={{ width: "110px" }}>Particulars</th>

                <th style={{ width: "260px" }} colSpan={2}>Package Details</th>

                <th style={{ width: "100px" }}>Selling Price(INR)</th>

                <th style={{ width: "150px" }}>Received(INR)</th>

                <th style={{ width: "120px" }}>Balance(INR)</th>

                   <th style={{ width: "300px" }} >Customer Details</th>

                <th style={{ width: "160px" }}>Owner</th>

                <th style={{ width: "140px" }}>Status</th>

                  <th style={{ width: "140px" }}>Action</th>

                        </tr>

                        <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                             <th></th>
                            <th>PAX</th>
                            <th>Destination</th>
                            
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize:"12px"}}>
                        <tr>
                            <td>
                                <Form.Check/>
                            </td>
    <td><div>D/26/1800611/V1</div>

    </td>

    <td> 06-Aug-25</td>

    <td>20-Jul-25</td>

    <td>Trip detail for DYP Hospitality Pvt. Ltd. for Coorg Q/25</td>
    <td>1 Adult(s)</td>

    <td>
Kolhapur - Coorg
    </td>

    <td>51,975.00</td>

<td>1.00</td>
<td>51,974.00</td>
<td>
    <div className="fw-semibold">
                                       <Icon icon="mdi:account" className="me-1" />
                                       DYP Hospitality Pvt. Ltd. SAYAJI HOTEL
                                     </div>
                                       <div>
                                                         <Icon icon="mdi:email-outline" className="me-1" />
                                                       purchase.sayajikolhapur@sayajihotels.com
                                                       </div>
                                               <div className="fw-semibold">
                                                                  <Icon icon="mdi:phone" className="me-1" />
                                                                +91 7722053764
                                                              </div>   
</td>

<td>RAJENDRA (DIRECTOR)</td>
<td>Confirmed - Partial Payment	
</td>
<td><div className="mb-1">
    <select className="form-select form-select-sm w-auto"
    style={{fontSize:"10px"}}>
                    <option value="">Select</option>
            <option value="view">View Proposal</option>
            <option value="modify">Modify Proposal</option>
            <option value="re-send">Re-send Proposal</option>
            <option value="discard"> Discard</option>
            <option value="updatepayment">Update Payment</option>
            <option value="fullfillment"> Fullfillment</option>
        <option value="invoice">Invoice</option>
          <option value="newfullfillment">New Fullfillment</option>
    </select>
    </div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Card>
    </>
);
};
export default Transfer;
