"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const MyWalletHistory=()=>{
    const router = useRouter();

    return(
        <>
      
        <Card className="p-3">
           
            <h4 className="text-center mb-2">38003 Ledger</h4>
            <table className="table table-sm table-bordered mb-2">
        <tbody className="fw-bold">
            <tr>
            <td className="border p-1">Wallet Balance</td>
            <td className="border p-1">INR.00</td>
       </tr>
        </tbody>
            </table>
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
                            <td colSpan={8}>No records found</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
        </>
    )
}
export default MyWalletHistory;