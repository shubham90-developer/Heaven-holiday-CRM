"use client"

import React, {useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import {Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
const Activities = () =>{
    const router =useRouter();


return (
    <>
    <div className="mb-2">
        <Filter/>
    </div>

    <Card className="p-3">
        <div className="p-3">

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

                <th style={{ width: "60px" }}>S. NO</th>

                <th style={{ width: "140px" }}>Proposal ID</th>

                <th style={{ width: "110px" }}>Travel Date</th>

                  <th style={{ width: "110px" }}>Booking Date</th>

                    <th style={{ width: "110px" }}>Activity Name</th>

                <th style={{ width: "260px" }} colSpan={2}>Activity Details</th>

                <th style={{ width: "100px" }}>Selling Price(INR)</th>

                <th style={{ width: "150px" }}>Received(INR)</th>

                <th style={{ width: "120px" }}>Balance(INR)</th>

                  <th style={{ width: "120px" }}>Customer Details</th>


                <th style={{ width: "160px" }}>Owner</th>

                <th style={{ width: "140px" }}>Status</th>

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

    <td></td>
    <td>PAX</td>

    <td>
Destination
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
export default Activities;
