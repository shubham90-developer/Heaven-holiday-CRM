"use client"

import React, {useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import {Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import B2BVoucherModal from "./B2BVoucherModal";
import B2CVoucherModal from "./B2CVoucherModal";
import Filter from "./Filter";
const Packages = () =>{
    const router =useRouter();


return (
    <>
    <div className="mb-2">
        <Filter/>
    </div>

    <Card className="p-3">
        <div className="p-3">
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
                                                                         UpComing
                                                                        </Button>

                                                                        <Button
                                                                                          variant="outline-primary"
                                                                                        size="sm"
                                                                                          style={{ fontSize: "10px", fontWeight: "600" }}
                                                                                        >
                                                                                          In Trip
                                                                                        </Button>

                                                                                        <Button
                                                                                                          variant="outline-primary"
                                                                                                          size="sm"
                                                                                                          style={{ fontSize: "10px", fontWeight: "600" }}
                                                                                                        >Completed
</Button>
<Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
               Over All
                </Button>

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
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
               Submit
                </Button>
                    </div>

                   <div className="d-flex gap-2 justify-content-end">
                    <B2BVoucherModal/>
                    <B2CVoucherModal/>
                    </div>
            </div>
</div>
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout: "fixed", width:"100%"}}
                >
                    <thead>
                        <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>

                <th style={{ width: "260px" }}>Proposal ID</th>

                <th style={{ width: "140px" }}>Booking Date</th>

                <th style={{ width: "110px" }}>Hotel Name</th>

                <th style={{ width: "260px" }} colSpan={2}>Booking ID</th>

                <th style={{ width: "100px" }}>Check In/Check Out</th>

                <th style={{ width: "150px" }}>PAX</th>

                <th style={{ width: "120px" }}>City Source Type</th>

                <th style={{ width: "160px" }}>Total Amount</th>

                <th style={{ width: "120px" }}>Paid Amount</th>

                <th style={{ width: "140px" }}>Balance</th>

                <th style={{ width: "140px" }}>Customer Details</th>

<th style={{ width: "140px" }}>Booked By</th>

<th style={{ width: "140px" }}>Status</th>

                  <th style={{ width: "140px" }}>Action</th>

                        </tr>
                    </thead>

                    <tbody style={{fontSize:"12px"}}>
                        <tr>
                          
    <td>

    </td>

    <td></td>

    <td></td>

    <td></td>
    <td></td>

    <td>

    </td>

    <td></td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Card>
    </>
);
};
export default Packages;
