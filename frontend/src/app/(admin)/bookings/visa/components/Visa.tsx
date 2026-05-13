"use client"

import React, {useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import {Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Stat from "./Stat";
import Filter from "./Filter";
const Visa = () =>{
    const router =useRouter();


return (
    <>
    <div className="mb-2">
        <Filter/>
    </div>

    <Card className="p-3">
            <Stat/>
            <div className="mb-4">

                <div className="d-flex justify-content-between align-items-center">
                    
                    <div className="d-flex align-items-center gap-2">
                        <Button
                                          variant="outline-primary"
                                          size="sm"
                                          style={{ fontSize: "10px", fontWeight: "600" }}
                                        >
                                         Today
                                        </Button>

                                        <Button
                                                          variant="outline-primary"
                                                          size="sm"
                                                          style={{ fontSize: "10px", fontWeight: "600" }}
                                                        >
                                                       Yesterday
                                                        </Button>

                                                        <Button
                                                                          variant="outline-primary"
                                                                          size="sm"
                                                                          style={{ fontSize: "10px", fontWeight: "600" }}
                                                                        >
                                                                        Current Week
                                                                        </Button>

                                                                        <Button
                                                                                          variant="outline-primary"
                                                                                        size="sm"
                                                                                          style={{ fontSize: "10px", fontWeight: "600" }}
                                                                                        >Last Week
                                                                                        </Button>

                                                                                        <Button
                                                                                                          variant="outline-primary"
                                                                                                          size="sm"
                                                                                                          style={{ fontSize: "10px", fontWeight: "600" }}
                                                                                                        >Current Month
</Button>
<Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
              Last Month
                </Button>

                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
              Over All
                </Button>
                    </div>


            </div>
</div>

<strong style={{ fontSize: "12px"}}>Worklist - Applied Visa Files
</strong>
            <div className="table-responsive mt-2">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout: "fixed", width:"100%"}}
                >
                    <thead>
                        <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
 <th>Proposal ID</th>
    <th>Client / Pax</th>
    <th>Country</th>
    <th>Visa Category | Type</th>
    <th>Travel Date</th>
    <th>Booking Date</th>
    <th>Doc Status</th>
    <th>Payment Status</th>
    <th>Ops User</th>
    <th>Action</th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize:"12px"}}>
                        <tr>
        <td colSpan={10}>No records found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
       
    </Card>
    </>
);
};
export default Visa;
