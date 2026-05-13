"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import { useRouter } from "next/navigation";
import B2BOfflineTicketModal from "./B2BOfflineTicketModal";
import B2COfflineTicketModal from "./B2COfflineTicketModal";
const FlightTickets = () =>{
    const router=useRouter();

    return(
        <>
          <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
      <div className="mb-4">
<div className="d-flex justify-content-end gap-2 pb-2">
    <B2COfflineTicketModal/>
    <B2BOfflineTicketModal/>

         <Button 
                            variant="outline-secondary"
                            size="sm"
                            style={{fontSize: "10PX", fontWeight:"bold"}}
                            >
                                <Icon icon="mdi:file-export"/>
                            </Button>


</div>
<div className="table-responsive">
    <table 
    className="table table-sm table-bordered mb-0 align-middle"
    style={{tableLayout:"fixed", width:"100%"}}
    >
        <thead>
            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                  <th style={{ width: "40px" }}>
                                  <Form.Check type="checkbox" />
                                </th>
                
                                <th style={{ width: "130px" }}>Booking Date Proposal ID</th>
                
                                <th style={{ width: "140px" }}>Travel Date Time</th>
                
                                <th style={{ width: "140px" }}>Booking Id. PNR No</th>
                
                                <th style={{ width: "200px" }}>From /To Dest. Source Type</th>
                
                                <th style={{ width: "90px" }}>My Cost Sale Price</th>
                
                                <th style={{ width: "100px" }}>Earnings</th>
                
                                <th style={{ width: "150px" }}>Status</th>
                
                                <th style={{ width: "220px" }}>Agency Details</th>
                
                                <th style={{ width: "160px" }}>PAX</th>
                
                                <th style={{ width: "120px" }}>Booked By</th>
                
                                <th style={{ width: "140px" }}>Owner</th>
                
                                <th style={{ width: "100px" }} className="text-center">
                                  Action
                                </th>
            </tr>
        </thead>

     <tbody style={{ fontSize: "12px" }}>
  <tr>
    <td><Form.Check type="checkbox" /></td>
    <td>
      <div>13-Mar-26 18:08</div>
      <div>QS/25/1960861/V0</div>
    </td>
    <td>
      <div>20-Nov-25 01:05</div>
      <div>20-Nov-25 01:05</div>
    </td>
    <td>
      <div>TG-315 Thai Airways</div>
      <div>TG-315 Thai Airways</div>
    </td>
    <td>
      <div>BLR ⇄ BKK</div>
      <div>Agency</div>
      <div>A HEAVEN HOLIDAY</div>
    </td>
    <td>
      <div>INR 0.00</div>
      <div>INR 0.00</div>
    </td>
    <td>
      <div>INR 0.00</div>
    </td>
    <td>Ticket-Booked</td>
    <td>
      <div className="fw-semibold">
        <Icon icon="mdi:account" className="me-1" />
        Jayashri Kadam Pune
      </div>
      <div>
        <Icon icon="mdi:email-outline" className="me-1" />
        8421135320.aheaven@gmail.com
      </div>
      <div>
        <Icon icon="mdi:phone" className="me-1" />
        +91 9480564346
      </div>
    </td>
    <td>6</td>
    <td>RAJENDRA BUGADE</td>
    <td>RAJENDRA BUGADE</td>
    <td>
      <Form.Select
        size="sm"
        className="w-auto"
        defaultValue=""
        onChange={(e) => {
          const value = e.target.value;
          if (value === "Invoice") router.push('/bookings/flighttickets/invoice');
          else if (value === "e-ticket") router.push('/bookings/flighttickets/e-ticket');
          else if (value === "updateticket") router.push('/bookings/flighttickets/update-ticket');
        }}
        style={{ fontSize: "10px" }}
      >
        <option value="">Select</option>
        <option value="cancel">Cancel</option>
        <option value="Invoice">Invoice</option>
        <option value="e-ticket">E-Ticket</option>
        <option value="e-ticketnoqrcode">E-Ticket (No QR Code)</option>
        <option value="updateticket">Update Ticket</option>
        <option value="nofullfillment">No Fullfillment</option>
      </Form.Select>
    </td>
  </tr>
</tbody>
    </table>
</div>
 <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "600" }}
          >
            Load More <Icon icon="mdi:reload" className="ms-1" />
          </Button>
        </div>
</div>

</Card>
        </>
    )
}
export default FlightTickets;