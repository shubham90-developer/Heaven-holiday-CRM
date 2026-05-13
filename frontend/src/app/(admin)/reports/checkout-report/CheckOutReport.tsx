"use client";

import React, {useState} from "react";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";


import { useRouter } from "next/navigation";

const CheckOutReport = () =>{
    const router = useRouter();
    return(
        <>
        <Card className="p-3">
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                    {/* Left Sections */}
                    <div className="d-flex align-items-center gap-2">
                        <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Today</Button>

                             <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Yesterday</Button>

                             <Button 
                        variant="outline-primary"
                       size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Tommrow</Button>

                        <input type="date"
                        className="form-control form-control-sm"
                        style={{fontSize:"10PX"}}
                        />

                         <input type="date"
                        className="form-control form-control-sm"
                        style={{fontSize:"10PX"}}
                        />

                             <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Submit</Button>  


                    </div>

                    {/* right side */}
                    <div className="d-flex align-items-center gap-2">

                        <Button
                            variant="outline-primary"
                            size="sm"
                            style={{fontSize:"10px", fontWeight:"bold"}}
                            >Print</Button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table 
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{tableLayout:"fixed", width: "100%"}}
                    >
                        <thead>
                            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}} className="table-dark"
                           >
                            <th>Plan Type</th>

                            <th>Total</th>
                           </tr>
                          
                        </thead>

                        <tbody style={{fontSize:"12px"}}>
                            <tr>
                                <td>Package</td>
                                <td>1</td>
                                     </tr>

                                       <tr>
                                <td>Total</td>
                                <td>1</td>
                                     </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
        </>
    )
};

export default CheckOutReport;