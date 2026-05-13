"use client";
import React from 'react'
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
import qrcode from '@/assets/images/qrcode.png';
import { Icon } from '@iconify/react/dist/iconify.js';
const PrintTicket = () => {
  return (
    <>
    <div className='m-1'>
        <div className='d-flex justify-content-between' style={{fontSize:"10px"}}>
                        <span className="logo">
              <Image src={logo} width={100} height={100} alt="logo" />
            </span>
            <div>
                 <div className="fw-bold">A HEAVEN HOSPITALITY PVT LTD</div>
            <div>B-11 , 1st Floor , Prabhakar Plaza,</div>
            <div>Station Road,</div>
            <div>Kolhapur - 416001, Maharashtra (India)</div>
            <div className="">Email ID: b2b.aheaven@gmail.com</div>
            <div>Contact No.: +91 9960793700</div>
            </div>
                    </div>
        
        <div className='d-flex justify-content-between mt-2 border' >
            <div className=' p-2' >
          <div style={{fontSize:"10px"}}><b>Booking Time:</b> 12-Apr-2026 10:53:33</div>
  <div style={{fontSize:"10px"}}><b>Booking ID:</b> GTX1775971413010</div>
  <div style={{fontSize:"10px"}}><b>Customer No.:</b> +91 9480564346</div>
  <div style={{fontSize:"10px"}}><b>Customer Email:</b> b2b.aheaven@gmail.com</div>
  <div style={{fontSize:"10px"}}><b>Booking Status:</b> Ticket - Booked</div>
            </div>

            <div className=' p-2 text-center'>
        <div style={{fontSize:"10px"}}>
C7A89H</div>
            </div>
        </div>

        <div className="mt-2">
    <table 
    className="table table-sm table-bordered mb-0 align-middle"
    style={{tableLayout:"fixed", width:"100%"}}
    >

        <thead>
            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
<th colSpan={6}><Row className='justify-content-between'>
    <Col md={6}>
    <span>Flight Detail </span></Col>
    <Col md={6}>
    <span>*Please verify flight timings & terminal info with the airlines</span>
   </Col>
    </Row></th>
                </tr>

       <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
  <th>Flight</th>
  <th>Class</th>
  <th>Type</th>
  <th>Departing</th>
  <th>Arriving</th>
  <th>Duration</th>
                </tr>
        </thead>

        <tbody>
            <tr style={{fontSize:"10px"}}>
                <td>
    <div><b>VJ-761</b></div>
    <div>VietJet Air</div>
  </td>

  <td>Economy</td>

  <td>Non-Refundable</td>

  <td>
    <div><b>BOM</b></div>
    <div>Tue, 21 Apr 26 00:55</div>
    <div>Mumbai, T-2</div>
  </td>

  <td>
    <div><b>BKK</b></div>
    <div>Tue, 21 Apr 26 05:50</div>
    <div>Bangkok, T-1</div>
  </td>

  <td><b>4h 55m</b></td>
            </tr>
        </tbody>
        </table>
        </div>
      
      <div className="table-responsive mt-2">
    <table 
    className="table table-sm table-bordered mb-0 align-middle"
    style={{tableLayout:"fixed", width:"100%"}}
    >
        <thead>
            <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
             <th colSpan={6}>
                Passenger Details
             </th>
              </tr>
              <tr style={{fontSize:"10px"}}>
                 <th>Sr.</th>
  <th>Name & FF</th>
  <th>Sector</th>
  <th>PNR & Ticket No.</th>
  <th>Baggage (Check-in | Cabin)</th>
  <th>Meal, Seat & Other Preference</th>
              </tr>
              </thead>
              <tbody>
                <tr style={{fontSize:"10px"}}>
                      <td>1.</td>
  <td>
   <div>Mrs UJJWALA JAWAHAR BHOSALE (A)</div>
<div><Image src={qrcode} width={80} height={60} alt='qrcode'/></div>
  </td>
  <td>BOM-BKK</td>
  <td>C7A89H</td>
  <td>15 | 7</td>
  <td></td>
                </tr>
              </tbody>
              </table>
              </div>

    <div className="">
  <div className="bg-light p-1 mt-1 fw-bold border-bottom" style={{fontSize:"10px"}}>
    Fare Details
  </div>

  <table className="table table-sm mb-0">
    <tbody style={{fontSize:"10px"}}>
      <tr>
        <td>Base Price</td>
        <td className="text-end">INR 126,000.00</td>
      </tr>
      <tr>
        <td>Fee & Surcharges</td>
        <td className="text-end">INR 1,800.00</td>
      </tr>
      <tr>
        <td>IGST</td>
        <td className="text-end">INR 324.00</td>
      </tr>
      <tr>
        <td>Meal / Seat / Baggage / Misc Charges</td>
        <td className="text-end">INR 0.00</td>
      </tr>
      <tr className="fw-bold">
        <td>Total Price</td>
        <td className="text-end">INR 128,124.00</td>
      </tr>
    </tbody>
  </table>
</div>

<div className="">
  <div className="bg-light p-2 fw-bold border-bottom" style={{fontSize:"10px"}}>
    Important Information
  </div>

  <div className="p-2" style={{ fontSize: "10px" }}>
    <div>1 - You must web check-in on the airline website and obtain a boarding pass.</div>
    <div>2 - Reach the terminal at least 2 hours prior for domestic and 4 hours for international flights.</div>
    <div>3 - For departure terminal please check with the airline first.</div>
    <div>4 - Date & Time is calculated based on the local time of the city/destination.</div>
    <div>5 - Use Airline PNR for all correspondence directly with the airline.</div>
    <div>6 - For rescheduling/cancellation within 4 hours contact airline directly.</div>
    <div>7 - Travel is subject to airport authority rules.</div>
  </div>
</div>

<div className="border-top mt-2 p-1 d-flex justify-content-between" style={{ fontSize: "10px" }}>
  
  <div className="">
    <div className="fw-bold"><Icon icon="mdi:close" className='fs-16 text-danger'/> Dangerous Goods Not Allowed</div>
    <div className="d-flex gap-3 align-items-center mt-2">
      <span> <Icon icon="mdi:fire" className='fs-16' /> Lighters</span>
      <span><Icon icon="mdi:oil" className='fs-16' /> Flammable</span>
      <span><Icon icon="mdi:biohazard" className='fs-16' /> Toxic</span>
      <span><Icon icon="mdi:spray-bottle" className='fs-16' /> Bleach</span>
    </div>
  </div>

  <div className="">
    <div className="fw-bold"><Icon icon="mdi:check" className='fs-16 text-success'/> Allowed in Hand Baggage</div>
    <div className="d-flex align-items-center gap-3 mt-2">
      <span><Icon icon="mdi:battery" className='fs-16' /> Power Banks</span>
      <span><Icon icon="mdi:car-battery" className='fs-16' /> Lithium Batteries</span>
    </div>
  </div>

</div>

</div>
    </>
  )
}

export default PrintTicket
