"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const BookingReport =()=>{
    const router = useRouter();

    return(
        <>
        <Card className="p-3">
            <div className="mb-4">
 <div className="d-flex justify-content-end align-items-center mb-2 border-bottom pb-2">
    <div className="d-flex align-items-center gap-2">
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
          All Bookings
        </Button>

        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
          Next 7 Days
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
           This Month
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
           Next Month
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
           Tommrows Check in
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Toays  Checking
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            On the Trip
        </Button>
           <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
           Cancelled Bookings
        </Button>
    </div>

 </div>
            </div>
          
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>
                            <th style={{width:"230px"}}>Proposal ID</th>

                                <th style={{width:"140px"}}>Booking Date</th>

                            <th style={{width:"140px"}}>Travel Date</th>

                            <th style={{width:"200px"}}>Destination</th>

                                <th style={{width:"140px"}}>PAX</th>

                                    <th style={{width:"140px"}}>Customer Name</th>
                                        <th style={{width:"140px"}}>Source</th>
                                            <th style={{width:"140px"}}>Total Price</th>
                                                <th style={{width:"140px"}}>Owner</th>
                                                    <th style={{width:"140px"}}>Status</th>
                                                      <th style={{width:"140px"}}>Received </th>
                                                     <th style={{width:"140px"}}>Balance</th> 
                                                     
                                                        <th style={{width:"140px"}}>Action</th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize: "12px"}}>
                        <tr>
<td>RAJENDRA BUGADE</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
<td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
        </>
    )
}
export default BookingReport;