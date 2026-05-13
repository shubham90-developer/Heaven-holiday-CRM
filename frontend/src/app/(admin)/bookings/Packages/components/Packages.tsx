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
                <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">

                    <div className="d-flex align-items-center gap-2">
                        <select 
                        className="form-select form-select-sm w-auto"
                        style={{fontSize:"10PX"}}
                        >
                            <option>Select Ops users</option>
    <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
                        </select>

                        <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight: "bold"}}>Assign</Button>

            
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <Button
                        variant="outline-danger"
                        size="sm"
                        style={{fontSize:"10px", fontWeight: "bold"}}>
                            Package Ops Report
                        </Button>
                    </div>
                </div>

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
                            <th style={{width:"40px"}}>
                                <Form.Check type="checkbox"/>
                            </th>

                <th style={{ width: "260px" }}>Customer Details</th>

                <th style={{ width: "140px" }}>Proposal ID / Booking Date</th>

                <th style={{ width: "110px" }}>Travel Date</th>

                <th style={{ width: "260px" }} colSpan={2}>Package Details</th>

                <th style={{ width: "100px" }}>Selling Price(INR)</th>

                <th style={{ width: "150px" }}>Received(INR)</th>

                <th style={{ width: "120px" }}>Balance(INR)</th>

                <th style={{ width: "160px" }}>Owner</th>

                <th style={{ width: "120px" }}>Payment/Booking stage</th>

                <th style={{ width: "140px" }}>Voucher Status</th>

                  <th style={{ width: "140px" }}>Action</th>

                        </tr>
                    </thead>

                    <tbody style={{fontSize:"12px"}}>
                        <tr>
                            <td>
                                <Form.Check/>
                            </td>
    <td>

    </td>

    <td></td>

    <td></td>

    <td>Pax</td>
    <td>Destination</td>

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
