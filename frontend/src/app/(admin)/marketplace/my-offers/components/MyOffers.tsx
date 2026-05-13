"use client"

import React, {useState} from "react";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import {Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";
import VisaList from "./VisaList";
const MyOffers = () => {
    const router =useRouter();
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
                                                    Packages No
                                                </th>
                                                <th>Package Name</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{fontSize:"10px"}}>
                                                        <td colSpan={2}>No record found</td>
                                                    </tr>
                                                </tbody>

                </table>
            </div>
            )}

            {step ===2 &&(
        <VisaList/>
            )}
        </Card>
    </>
  )
}

export default MyOffers
