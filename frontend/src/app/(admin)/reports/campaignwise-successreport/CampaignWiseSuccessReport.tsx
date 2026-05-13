"use client";

import React, {useState} from "react";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";


import { useRouter } from "next/navigation";

const CampaignWiseSuccessReport = () =>{
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
                        >Current Week</Button>

                             <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Last Week</Button>

                             <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Current Month</Button>

                           <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Last Month</Button>

                             <Button 
                        variant="outline-primary"
                        size="sm"
                        style={{fontSize:"10px", fontWeight:"bold"}}
                        >Over All</Button>

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
                        variant="outline-secondary"
                        size="sm"
                        style={{fontSize: "10PX", fontWeight:"bold"}}
                        >
                            <Icon icon="mdi:file-export"/>
                        </Button>

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

                            <th style={{width:"150px"}} colSpan={3}>#</th>

                            <th style={{width:"500px"}} colSpan={6}>Lead Stage</th>

                            <th style={{width:"500px"}} colSpan={6}>Queries Follow up Stage</th>

                            <th style={{width:"260px"}} colSpan={3}>Proposals Stage</th>

                            <th style={{width:"230px"}} colSpan={3}>Final Output</th>
                           </tr>
                           <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                            

                              <th style={{width:"130px"}}>Source</th>
                          
                          <th style={{width:"90px"}}>Campaign</th>
                          
<th style={{width:"120px"}}>Medium</th>

<th style={{width:"90px"}}>Total</th>

<th>Archived</th>
<th>Lost</th>
<th>Junk</th>
<th>In Process</th>
<th>Lead Converted</th>

<th>Query Created</th>
<th>In Process</th>
<th>No Status</th>
<th>Hot</th>
<th>Warm</th>
<th>Cold</th>

<th>Proposals sent</th>
<th>Proposals Not sent</th>

<th>Verbal</th>
<th>Lost</th>
<th>Won</th>
                           </tr>
                        </thead>

                        <tbody style={{fontSize:"12px"}}>
                            <tr>
                               
                                <td>-</td>
                                <td>-</td>
                                 <td>Total</td>
                                  <td></td>
                                   <td></td>
                                    <td></td>
                                     <td></td>
                                      <td></td>
                                       <td></td>
                                        <td></td>
                                         <td></td>
                                          <td></td>
                                           <td></td>
                                            <td></td>
                                             <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
        </>
    )
};

export default CampaignWiseSuccessReport;