"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import { useRouter } from "next/navigation";

const SalesReport =()=>{
    const router = useRouter();

    return(
        <>
        <div className="mb-2">
            <Filter/>
        </div>
        <Card className="p-3">
            <div className="mb-4">
 <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
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
    </div>
 </div>
            </div>
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>
                            <th colSpan={5} style={{fontSize: "10px", whiteSpace:"nowrap"}}>Total</th>
                            <th style={{fontSize: "10px", whiteSpace:"nowrap"}}>INR 0.00</th>
                                                        <th style={{fontSize: "10px", whiteSpace:"nowrap"}}>INR 0.00</th>
                                                                        <th style={{fontSize: "10px", whiteSpace:"nowrap"}}>INR 0.00</th>
                                                                                            <th style={{fontSize: "10px", whiteSpace:"nowrap"}}>INR 0.00</th>
                                                                                <th style={{fontSize: "10px", whiteSpace:"nowrap"}}>INR 0.00</th>
                                                                                                            <th style={{fontSize: "10px", whiteSpace:"nowrap"}}>INR 0.00</th>
                                                                                                                                        <th style={{fontSize: "10px", whiteSpace:"nowrap"}}>INR 0.00</th>
                                                                                                                                                                    <th style={{fontSize: "10px", whiteSpace:"nowrap"}}></th>
                            </tr>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>

                            <th style={{width:"230px"}}>Travel Date</th>

                                <th style={{width:"140px"}}>Sales Date</th>

                            <th style={{width:"140px"}}>Customer Details</th>

                            <th style={{width:"200px"}}>Particulars</th>

                                <th style={{width:"140px"}}>Proposal ID</th>

                                    <th style={{width:"140px"}}>Cost INR</th>
                                        <th style={{width:"140px"}}>Discount INR</th>
                                            <th style={{width:"140px"}}>Markup INR</th>
                                                <th style={{width:"140px"}}>TCS INR</th>
                                                    <th style={{width:"140px"}}>Tax INR</th>
                                                      <th style={{width:"140px"}}>Selling Price (INR)</th>
                                                      <th style={{width:"140px"}}>Invoice Value (INR)</th>
                                                        <th style={{width:"140px"}}>Sales By</th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize: "12px"}}>
                        <tr>
                         <td colSpan={9}>No record found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
        </>
    )
}
export default SalesReport;