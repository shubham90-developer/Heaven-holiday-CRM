"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import { useRouter } from "next/navigation";

const DailyCollection =()=>{
    const router = useRouter();

    return(
        <>
        <div className="mb-2">
            <Filter/>
        </div>
        <Card className="p-3">
            <div className="mb-2">
 <div className="d-flex justify-content-between align-items-center  border-bottom pb-2">
    <div className="d-flex align-items-center gap-2">
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Today
        </Button>

        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Yesterday
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Current Week
        </Button>
        <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize:"10px", fontWeight:"bold"}}>
            Last Week
        </Button>
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
        
        <Button
        variant="outline-primary"
        size="sm"
        style={{fontSize:"10px",fontWeight:"bold"}}>
            Print
        </Button>
    </div>
 </div>
            </div>
            <div className="fw-bold border d-flex align-items-center gap-4 p-2 mb-3">
                <div >Total Collection</div>
                <div>Online</div>
                <div>Offline</div>
            </div>
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>

                            <th style={{width:"230px"}}>Customer Details</th>

                                <th style={{width:"140px"}}>Date</th>

                            <th style={{width:"140px"}}>Receipt No</th>

                            <th style={{width:"200px"}}>Booking ID</th>

                                <th style={{width:"140px"}}>Booking Date</th>

                                    <th style={{width:"140px"}}>Particulars</th>
                                        <th style={{width:"140px"}}>Amt. Received</th>
                                            <th style={{width:"140px"}}>Mode of Payment</th>
                                                <th style={{width:"140px"}}>Owner</th>
                                                    <th style={{width:"140px"}}>Status</th>
                                                      <th style={{width:"140px"}}>Received By</th>
                                                        <th style={{width:"140px"}}>Approved By</th>
                                                        <th style={{width:"140px"}}>Action</th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize: "12px"}}>
                        <tr>
                            <td colSpan={12}>No result found</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
        </>
    )
}
export default DailyCollection;