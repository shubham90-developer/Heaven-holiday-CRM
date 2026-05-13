import React from 'react'
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";

const Invoice = () => {
  return (
    <>
      <div className='invoice-container m-2'>
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
            <div>Website URL:</div>
            <div>https://www.aheavenholiday.in/</div>
            </div>
                    </div>


            <table className='table table-sm table-bordered mt-3' style={{width:"100%"}}>
                    <tbody>
                    <tr style={{fontSize:"10px"}}>
                        <td colSpan={3}>Customer Name</td>
                       
                        <td> <b>Invoice No.</b></td>
                        <td><b>2026-04-000080</b></td>
                    </tr>
                    <tr style={{fontSize:"10px"}}>
                        <td colSpan={3}></td>
                        <td><b>Invoice / Due Date</b></td>
                    <td><b>12-Apr-26 / 12-Apr-26</b></td>
                    </tr>
                    <tr style={{fontSize:"10px"}}>
                        <td colSpan={3}></td>
                        <td><b>PAN NO.</b></td>
                   <td><b>27AATCA4967A1ZF</b></td>
                    </tr>
                    <tr style={{fontSize:"10px"}}>
                        <td colSpan={3}></td>
                        <td><b>GSTIN Number</b></td>
                        <td></td></tr>
                    <tr style={{fontSize:"10px"}}>
                        <td colSpan={3}></td>
                        <td><b>Client GST</b></td>
                    <td><b>	2140206/V1</b></td>
                    </tr>
                    
                    </tbody>
            </table> 

            <div className='table-responsive mt-3'>
                <table className='table table-sm table-bordered'>
                    <thead>
                        <tr style={{fontSize:"10px"}}>
                        <th >Description of Goods\Services</th>
                        <th >HSN/SAC</th>
                        <th >Qty</th>
                        <th >Rate</th>
                        <th >Total</th>
                        <th colSpan={2}>IGST</th>
                        <th>Total Price</th>
                        </tr>
                        <tr style={{fontSize:"10px"}}>
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
                            <tr style={{fontSize:"10px"}}>
                <td></td>
                <td>998551</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>5%</td>
                <td>0.00</td>
                <td>0</td>
              </tr>

              <tr style={{fontSize:"10px"}}>
                <td colSpan={7} className="text-end">
                  <b>Total Invoice Value</b>
                </td>
                <td>INR 0.00</td>
              </tr>
              <tr style={{fontSize:"10px"}}>
                <td colSpan={7} className="text-end">
                  <b>IGST</b>
                </td>
                <td>0.00</td>
              </tr>
              <tr style={{fontSize:"10px"}}>
                <td colSpan={7} className="text-end">
                  <b>Advance</b>
                </td>
                <td>INR 0</td>
              </tr>
              <tr style={{fontSize:"10px"}}>
                <td colSpan={7} className="text-end">
                  <b>Balance to be paid</b>
                </td>
                <td>INR 0.00</td>
              </tr>
              <tr style={{fontSize:"10px"}}><td colSpan={9}><b>Amount in words only/-</b></td></tr>
                    </tbody>
                </table>
            </div>

<div className='border-bottom p-1' style={{fontSize:"10px"}}>
<b>Notes</b>
</div>

<div className='border-bottom p-1' style={{fontSize:"10px"}}>
Terms and conditions
</div>

<div className='border-bottom p-1' style={{fontSize:"10px"}}>
<b>Payment Terms</b>
</div>
                    
          <div className='border-bottom p-1' style={{fontSize:"10px"}}>
          
            <p>
              Payment needs to be made in the company name A HEAVEN HOSPITALITY PVT LTD you can deposit cheque or DD in our current account as below.
            </p>

            <p><b>Account Name:</b> AHEAVEN HOSPITALITY PVT LTD</p>
            <p><b>Bank Name:</b> YES BANK</p>
            <p><b>Branch:</b> SHIVAJI PARK</p>
            <p><b>Account Number:</b> 004363300003005</p>
          </div>

        
<p className='p-1 text-end' style={{fontSize:"10px"}}>For A HEAVEN HOSPITALITY PVT LTD</p>
<Row className='justify-content-end' style={{fontSize:"10px"}}>
<Col md={3}>
<span className=' d-flex justify-content-end border'>
  <Image src={logo} width={70} height={70} alt="logo" />
</span>
</Col></Row>
       <p className='text-end px-1 ' style={{fontSize:"8px"}}>Authorized Signatory</p>

<hr></hr>
<p className='text-center' style={{fontSize:"8px"}}>Note:- This is an electronically generated invoice and does not require a physical signature</p>
      </div>   
    
    </>
  )
}

export default Invoice
