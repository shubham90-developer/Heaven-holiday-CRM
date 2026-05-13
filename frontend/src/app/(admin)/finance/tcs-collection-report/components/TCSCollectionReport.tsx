"use client";
import React, { useState} from "react";
import {Button, Card , Table, Col, Row, Modal, Form} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

const TCSCollectionReport = () => {
    const router = useRouter();

    return (
        <>
        <Card className="p-3">

            <div className="mb-4">
                <Filter/>
            </div>
            <div className="table-responsive">
                <table className="table table-sm table-bordered mb-0 align-middle"
                  style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>
                           
                             <th>Sr. No.</th>
      <th>Booking Date</th>
      <th style={{width:"180px"}}>Customer Details</th>
      <th>Proposal ID</th>
      <th>Destination</th>
      <th>Customer Name</th>
      <th>PAN Card Number</th>
      <th>Amount Collected</th>
      <th>TCS</th>
      <th>Total TCS</th>
      <th>Action</th>
                            </tr>
                    </thead>

                    <tbody style={{fontSize: "12px"}}>
                        <tr>
                            <td>1</td>
                            <td>21-Nov-2025</td>
                            <td>
                                <div><Icon icon="mdi:account" className="me-1"/>Prince l</div>
                                <div><Icon icon="mdi:email" className="me-1"/>Prince@hellogtx.com</div>
                                <div><Icon icon="mdi:phone" className="me-1"/>+91 8368874827</div>
                            </td>

                            <td>1967958</td>
                            <td>Dubai, Abu DhabiDubai, Abu Dhabi</td>

                            <td><div>PRINCE KUMAR</div>
                            <div>PRINCE KUMAR</div></td>
                          
                            <td><div>CLWPK7370L</div>
                            <div>CLWPK7370L</div></td>

                            <td><div>492059</div>
                            <div>51324</div></td>

                                                        
                            <td><div>492059</div>
                            <div>51324</div></td>
                           
                           <td>51323.79</td>

                           <td>View</td>

                            </tr>
                        </tbody>
                </table>
                </div>
            </Card>       
            
             </>
    )
}
export default TCSCollectionReport;