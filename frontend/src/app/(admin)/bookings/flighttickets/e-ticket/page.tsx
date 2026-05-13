"use client";
import React from "react";
import PageTitle from "@/components/PageTitle";
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import {Icon} from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
const ETicketPage = () => {
const router=useRouter()
  return (
    <>
   <div className="d-flex gap-2 justify-content-center">
               <Button
                            variant="danger"
                             size="sm"
                         style={{ fontSize: "10px", fontWeight: "600" }}
                     >
                      Send Mail
             </Button>
                            <Button
                            variant="danger"
                            onClick={()=>router.push('/bookings/flighttickets/e-ticket/print-ticket')}
                             size="sm"
                         style={{ fontSize: "10px", fontWeight: "600" }}
                     >
                      Print
             </Button>
                            <Button
                            variant="danger"
                             size="sm"
                         style={{ fontSize: "10px", fontWeight: "600" }}
                     >
                     Print Without Price
             </Button>
                            <Button
                            variant="danger"
                             size="sm"
                         style={{ fontSize: "10px", fontWeight: "600" }}
                     >
                     Download
             </Button>
   </div>
      
    </>
  );
};

export default ETicketPage;
