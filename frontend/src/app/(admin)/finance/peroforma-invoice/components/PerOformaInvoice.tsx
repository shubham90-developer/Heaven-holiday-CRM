"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import { useRouter } from "next/navigation";

const PerformaInvoice =()=>{
    const router = useRouter();

    return(
        <>
        <div className="mb-2">
            <Filter/>
        </div>
        <Card className="p-3">
            <div className="mb-4">

            </div>
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>
                            <th style={{width:"130px"}}>Sr. No</th>

                                <th style={{width:"140px"}}>Date</th>

                            <th style={{width:"140px"}}>Proforma Invoice No</th>

                            <th style={{width:"200px"}}>Customer / Agency Name</th>

                                <th style={{width:"140px"}}>Value</th>

                                    <th style={{width:"140px"}}>Received</th>
                                        <th style={{width:"140px"}}>Balance</th>
                                            <th style={{width:"140px"}}>Due Date</th>
                                                <th style={{width:"140px"}}>Owner</th>
                                                    <th style={{width:"140px"}}>Status</th>
                                                        <th style={{width:"140px"}}>Action</th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize: "12px"}}>
                        <tr>
                    <td colSpan={11}>No data found</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
        </>
    )
}
export default PerformaInvoice;