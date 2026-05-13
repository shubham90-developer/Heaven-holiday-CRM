"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const CreditNote = () => {
    const router = useRouter();
  return (
    <>
        <Card className="p-3">
            <div className="mb-2">
 <div className="d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-center border-bottom pb-2">
    <div className="d-flex flex-wrap flex-lg-nowrap align-items-center gap-2">
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
            Yeaterday
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
            <div className="text-end mb-2">
                   <Button 
                                    variant="danger"
                                    size="sm"
                                    onClick={()=>router.push("/finance/credet-note/add-credet-note")}
                                    style={{fontSize: "10PX", fontWeight:"bold"}}
                                    >
                                       <Icon icon="mdi:plus" /> Add Manual Credet Note
                                    </Button>
            </div>
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>
                            <th style={{width:"50px"}}>S. No</th>

                                <th style={{width:"140px"}}>Credet Note Date</th>

                            <th style={{width:"140px"}}>Credet Note No</th>

                            <th style={{width:"250px"}}>Customer /Agency Name</th>

                                <th style={{width:"140px"}}>Credet Note Value</th>
                                        <th style={{width:"140px"}}>GST</th>   
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
                           <td colSpan={13}>No record found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    </>
  )
}

export default CreditNote
