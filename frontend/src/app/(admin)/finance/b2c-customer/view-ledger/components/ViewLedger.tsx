"use client"
import React from 'react'
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
const ViewLedger = () => {
   
  return (
    <>
      <Card className="p-3">
       <h5 className='text-center mb-2'>Mrs. Mamta (1578901) - Ledger</h5>

   <Row className="mb-3 text-center">
            <Col md={3} className='border text-center p-2'>
              <div className="label" style={{fontSize: "12px"}}>Credit Limit</div>
            </Col>
    <Col md={1} className='border text-center p-2'>
     <div className="" style={{fontSize: "12px"}}>0</div>
    </Col>

      <Col md={3} className='border text-center p-2'>
              <div className="label" style={{fontSize: "12px"}}>Credit Consumed</div>
            </Col>
    <Col md={1} className='border text-center p-2'>
     <div className="" style={{fontSize: "12px"}}>0</div>
    </Col>

  <Col md={3} className='border text-center p-2'>
              <div className="label" style={{fontSize: "12px"}}>Bookable Balance</div>
            </Col>
    <Col md={1} className='border text-center p-2'>
     <div className="" style={{fontSize: "12px"}}>0</div>
    </Col>
           
          </Row>


          <div className='table-responsive'>
            <table className='table table-bordered table-sm'
             style={{tableLayout:"fixed", width:"100%"}}>
                <thead>
                     <tr style={{fontSize:"10px"}}>
    <th>Date</th>
    <th>Particular`s</th>
    <th>Ref. No.</th>
    <th>Mode</th>
    <th>Remarks</th>
    <th>Debit Amt.</th>
    <th>Credit Amt.</th>
    <th>Balance</th>
                     </tr>
                </thead>
             <tbody>
                <tr style={{fontSize:"12px"}}>
                    <td>13/04/2026 12:46</td>
    <td>Package</td>
    <td>535904922</td>
    <td>Wallet</td>
    <td>Welcome</td>
    <td></td>
    <td>.00</td>
    <td>.00</td>
                    </tr>
             </tbody>
                </table>

          </div>
      </Card>
    </>
  )
}

export default ViewLedger
