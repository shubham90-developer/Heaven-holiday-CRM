"use client";

import React, {useState} from "react";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";

import { useRouter } from "next/navigation";

const DebtorsReport = () =>{
    const router = useRouter();
    return(
        <>
        <div className="mb-2">
            <Filter/>
        </div>
        <Card className="p-3">
            <div className="mb-4">
               

                    {/* right side */}
                    <div className="d-flex justify-content-end gap-2 mb-2">

                        <Button
                            variant="outline-primary"
                            size="sm"
                            style={{fontSize:"10px", fontWeight:"bold"}}
                            >Print</Button>
                    </div>
                

                <div className="table-responsive">
                    <table 
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{tableLayout:"fixed", width: "100%"}}
                    >
                        <thead>
                            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}} className="table-dark"
                           >
                            <th>Name/Mobile</th>

                            <th>Balance (FCY)</th>

                            <th>Available Credit (FCY)</th>

                              <th>Net Balance (FCY)</th>

                            <th>Balance (BCY)</th>
                           </tr>
                          
                        </thead>

                        <tbody style={{fontSize:"12px"}}>
                            <tr>
                                <td>
                                    <div className="">
                                         <Icon icon="mdi:account" className="me-1" />Mrs. Aakansha Pawar
                                    </div>
                                    <div>
                                        <Icon icon="mdi:email-outline" className="me-1" />
                                         +91 9921115827
                                    </div>
                                    <div className="">
                                            <Icon icon="mdi:phone" className="me-1"/>
                                             9921115827.aheaven@gmail.com
                                    </div>
                                </td>
                                <td>INR 48,800.00</td>
                                <td>INR 0.00</td>
                                <td>INR 48,800.00</td>
                                <td>INR 48,800.00</td>
                                     </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
        </>
    )
};

export default DebtorsReport;