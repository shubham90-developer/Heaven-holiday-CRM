"use client";

import React, { useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

const QueryFollowupReport =()=>{
    const router = useRouter();

    return(
        <>
       
        <Card className="p-3">
            <div className="table-responsive">
                <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%"}}>
                    <thead>
                        <tr style={{fontSize: "10px", whiteSpace:"nowrap"}}>

                            <th style={{width:"200px"}}>Name</th>

                                <th style={{width:"200px"}}>No. Update (Last 7 days)</th>

                            <th style={{width:"200px"}}>No. Update (Last 3 days)</th>

                            <th style={{width:"200px"}}>No. Update (Last 2 days)</th>
                        </tr>
                    </thead>

                    <tbody style={{fontSize: "12px"}}>
                        <tr>
                            <td>RAJENDRA BUGADE</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
        </>
    )
}
export default QueryFollowupReport;