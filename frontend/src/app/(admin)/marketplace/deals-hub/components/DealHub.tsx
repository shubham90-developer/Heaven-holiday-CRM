"use client"

import React, {useState} from 'react'
import Filter from "./Filter";
import {Icon} from "@iconify/react/dist/iconify.js";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
const DealHub = () => {
   
            const [step,setStep]=useState(1)
  return (
    <>
         <div className="mb-2">
                  <Filter/>
             </div>

    <Card className="p-3">
     
            <div className="">
                <div className="d-flex align-items-center pb-2 gap-2">
                {[1,2].map((item) =>(
                      <Button
                      key={item}
                    variant="outline-primary"
                    size="sm"
                    onClick={()=>setStep(item)}
                    style={{ fontSize: "10px", fontWeight: "bold" }}
                  >
                 {item=== 1 && "Packages"}
                 {item=== 2 && "Visas"}
                  </Button>
                ))}
                </div>
            </div>
           
            { step===1 && (
            <div className="table-responsive">
                 <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout: "fixed", width:"100%"}}
                >
                      <thead>
                                            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                                                <th>
                                                    Supplier Name
                                                </th>
                                                <th>Contact No</th>
                                                <th>Rating</th>
                                                <th>Active since</th>
                                                <th>GST Status</th>
                                                <th>Destination</th>
                                                <th>Head Office</th>
                                                <th>Packages No.</th>
                                                <th>Other Office</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{fontSize:"10px"}}>
                                                        <td >Asam Holidays</td>
                                                        <td>+91-9678005056</td>
                                                        <td>-</td>
                                                        <td>13-Jun-23</td>
                                                        <td>Yes</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>6</td>
                                                        <td>-</td>
                                                        <td>Requested</td>
                                                        <td><span style={{fontSize:"10px",cursor:"pointer"}}>send request</span></td>
                                                    </tr>
                                                </tbody>

                </table>
            </div>
            )}

            {step ===2 &&(
                   <div className="table-responsive">
                 <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout: "fixed", width:"100%"}}
                >
                      <thead>
                                            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                                                <th>
                                                    Supplier Name
                                                </th>
                                                <th>Contact No</th>
                                                <th>Rating</th>
                                                <th>Active since</th>
                                                <th>GST Status</th>
                                                <th>Destination</th>
                                                <th>Head Office</th>
                                                <th>Visa No</th>
                                                <th>Other Office</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{fontSize:"10px"}}>
                                                        <td ><span style={{cursor:"pointer"}}>AIROCITY VISAS</span></td>
                                                        <td><span style={{cursor:"pointer"}}>+91-9084597345</span></td>
                                                        <td>-</td>
                                                        <td>21-Jan-25</td>
                                                        <td>Yes</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>226</td>
                                                        <td>-</td>
                                                        <td>Requested</td>
                                                        <td><span style={{fontSize:"10px",cursor:"pointer"}}>send request</span></td>
                                                    </tr>
                                                </tbody>

                </table>
            </div>
            )}
        </Card>
    </>
  )
}

export default DealHub
