"use client";
import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tab,
} from "react-bootstrap";
import { useRouter} from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
const Bookings = () => {
    const router=useRouter()
  return (
    <>
      <Card  className='p-2'>
           <div className='d-flex gap-2 justify-content-end'>
         <Button
                    variant="outline-secondary"
                    size="sm"
                    style={{ fontSize: "10px"}}
                  
                  >
                    <Icon icon="mdi:file-export" />
                  </Button>
                   <Button
                              variant="danger"
                              size="sm"
                              style={{ fontSize: "10px", fontWeight: "bold" }}
                              onClick={() => router.push("/my-inventory/group-departure/bookings/add-inventory")}
                            >
                              <Icon icon="mdi:plus" className='me-1'/> Add Offline Booking
                            </Button>
           </div>

           <hr/>
           <div className='d-flex gap-2 mb-2'>
             <Button
                        variant="outline-primary"
                        size="sm"
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                       
                      >Total Seats (30)
                      </Button>
             <Button
                        variant="outline-primary"
                        size="sm"
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                       
                      >Sold (0)
                      </Button>
         <Button
                        variant="outline-primary"
                        size="sm"
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                       
                      >OnHold (0)
                      </Button>
         <Button
                        variant="outline-primary"
                        size="sm"
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                     
                      >Availability (30)
                      </Button>
           </div>

      <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <thead>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                     <th>Sr No.</th>
    <th>Proposal ID</th>
    <th>Booking Date</th>
    <th>Travel Date</th>
    <th>Pax Name</th>
    <th>No of Pax</th>
    <th>Package Name</th>
    <th>Net Price</th>
    <th>Discount</th>
    <th>Taxes</th>
    <th>Paid</th>
    <th>Balance</th>
    <th>Owner</th>
    <th>Query Status</th>
    <th>Hold Days</th>
    <th>Inventory Status</th>
    <th>Action</th>
                        </tr>
                        </thead>
                        </table>
                        </div>
      </Card>
    </>
  )
}

export default Bookings
