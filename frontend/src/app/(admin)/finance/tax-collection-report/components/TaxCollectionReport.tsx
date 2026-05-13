"use client";
import React, { useState} from "react";
import {Button , Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import CustomFlatpickr from "@/components/CustomFlatpickr";

const TaxCollectionReport = () =>{

    const router = useRouter();

    return (
        <>
        <div className="mb-4">
            <Filter/>
        </div>

        <Card className="p-3">
        <div className="mb-4">
        <div className="d-flex  mb-2 border-bottom pb-2">
            <div className="d-flex gap-1">
            <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
                Today
            </Button>
              <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
                Yesterday
            </Button>
              <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
                Current Week
            </Button>
              <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
                Last Week
            </Button>
              <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
                Current Month
            </Button>
              <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
                Last Month
            </Button>
              <Button
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
               Over All
            </Button>
            
              <input type="date" className="form-control form-control-sm" style={{fontSize: "10px"}}/>
                <input type="date" className="form-control form-control-sm" style={{fontSize: "10px"}}/>

              <Button 
            variant="outline-primary"
            size="sm"
            style={{fontSize: "10px", fontWeight:"bold"}}>
                Submit
            </Button>
</div>
        </div>
        </div>

        <div className="table-responsive">
            <table className="table table-sm bordered mb-0 align-middle"
            style={{tableLayout:"fixed", width:"100%"}}>
                <thead>
                    <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                        <th>Invoice Date</th>
    <th>Particulars</th>
    <th>Invoice No.</th>
    <th>Proposal ID</th>
    <th style={{width:"180px"}}>Name / Mobile</th>
    <th>Customer GST No</th>
    <th>Invoice Amount</th>
    <th>CGST</th>
    <th>SGST</th>
    <th>IGST</th>
    <th>Total GST</th>
                    </tr>
                </thead>
    <tbody style={{fontSize: "12px"}}>
        <tr>
              <td>12-Apr-26</td>
  <td>Flight Ticket</td>
  <td>2026-04-000080</td>
  <td>2140206</td>
  <td>
    <div><Icon icon="mdi:account" className="me-1"/>PRAVIN </div>
        <div><Icon icon="mdi:email" className="me-1"/>
    b2b.aheaven@gmail.com </div>
        <div><Icon icon="mdi:phone" className="me-1"/>+91 8368874827 </div>
  </td>
  <td>-</td>
  <td>₹128,124.00</td>
  <td>₹162.00</td>
  <td>₹162.00</td>
  <td>₹0.00</td>
  <td>₹324.00</td>
        </tr>
        </tbody>
            </table>
            </div>

        </Card>
        </>
    )
}
export default TaxCollectionReport;