import React from 'react'
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";  
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";

type ViewInvoiceModalProps = {
    onClose : ()=>void;
}
const ViewInvoiceModal = ({onClose}:ViewInvoiceModalProps) => {
  return (
    <>
      <Modal show={true} onHide={onClose} size='lg' centered>
            <Modal.Header
                  style={{ background: "#274c6b", color: "#fff" }}
                  className="d-flex justify-content-between"
                  >
                    <Modal.Title style={{ fontSize: "14px" }}>View Invoice</Modal.Title>
        
                      <button
                    onClick={onClose}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                  </Modal.Header>

                  <Modal.Body style={{fontSize:"12px"}}>
                    <div className='d-flex justify-content-between'>
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
            <div>Website URL:</div>
            <div>https://www.aheavenholiday.in/</div>
            </div>
                    </div>


            <table className='table table-sm table-bordered mt-3' style={{width:"100%"}}>
                    <tbody>
                    <tr>
                        <td colSpan={3}>Customer Name</td>
                       
                        <td> <b>Invoice No.</b></td>
                        <td><b>2026-04-000080</b></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b>Invoice / Due Date</b></td>
                    <td><b>12-Apr-26 / 12-Apr-26</b></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b>PAN NO.</b></td>
                    <td><td><b>27AATCA4967A1ZF</b></td></td>
                    </tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b>GSTIN Number</b></td></tr>
                    <tr>
                        <td colSpan={3}></td>
                        <td><b>Client GST</b></td>
                    <td><b>	2140206/V1</b></td>
                    </tr>
                    
                    </tbody>
            </table> 

            <div className='table-responsive mt-3'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr>
                        <th >Description of Goods\Services</th>
                        <th >HSN/SAC</th>
                        <th >Qty</th>
                        <th >Rate</th>
                        <th >Total</th>
                        <th colSpan={2}>IGST</th>
                        <th>Total Price</th>
                        </tr>
                        <tr>
                           <th></th>
                            <th></th>
                             <th></th>
                              <th></th>
                               <th></th>
                               <th>%</th>
                               <th>Amt</th>
                               <th>Balance</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                <td></td>
                <td>998551</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>5%</td>
                <td>0.00</td>
                <td>0</td>
              </tr>

              <tr>
                <td colSpan={7} className="text-end">
                  <b>Total Invoice Value</b>
                </td>
                <td>INR 0.00</td>
              </tr>
              <tr>
                <td colSpan={7} className="text-end">
                  <b>IGST</b>
                </td>
                <td>0.00</td>
              </tr>
              <tr>
                <td colSpan={7} className="text-end">
                  <b>Advance</b>
                </td>
                <td>INR 0</td>
              </tr>
              <tr>
                <td colSpan={7} className="text-end">
                  <b>Balance to be paid</b>
                </td>
                <td>INR 0.00</td>
              </tr>
              <tr><td colSpan={9}><b>Amount in words only/-</b></td></tr>
                    </tbody>
                </table>
            </div>

<div className='border-bottom p-1'>
<b>Notes</b>
</div>

<div className='border-bottom p-1'>
Terms and conditions
</div>

<div className='border-bottom p-1'>
<b>Payment Terms</b>
</div>
                    
          <div className='border-bottom p-1'>
          
            <p>
              Payment needs to be made in the company name A HEAVEN HOSPITALITY PVT LTD you can deposit cheque or DD in our current account as below.
            </p>

            <p><b>Account Name:</b> AHEAVEN HOSPITALITY PVT LTD</p>
            <p><b>Bank Name:</b> YES BANK</p>
            <p><b>Branch:</b> SHIVAJI PARK</p>
            <p><b>Account Number:</b> 004363300003005</p>
          </div>

        
<p className='p-1 text-end'>For A HEAVEN HOSPITALITY PVT LTD</p>
<Row className='justify-content-end'>
<Col md={3}>
<span className=' d-flex justify-content-end border  p-3'>
  <Image src={logo} width={100} height={100} alt="logo" />
</span>
</Col></Row>
       <p className='text-end p-1 '>Authorized Signatory</p>

<hr></hr>
<p className='text-center'>Note:- This is an electronically generated invoice and does not require a physical signature</p>
                  </Modal.Body>

      </Modal>
    </>
  )
}

export default ViewInvoiceModal
