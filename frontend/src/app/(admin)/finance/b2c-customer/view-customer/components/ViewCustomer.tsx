"use client"
import React from 'react'
import {Button, Card, Col, Form, Row, Modal} from "react-bootstrap";
import { Icon} from "@iconify/react/dist/iconify.js";
import Filter from './Filter';
const ViewCustomer = () => {
   
  return (
    <>
    <div className='mb-2'><Filter/></div>
      <Card className="p-3">
       <h5 className='text-center mb-4'>Mamta Shulka (1578901) - Ledger</h5>


          <div className='table-responsive'>
            <table className='table table-bordered table-sm'
             style={{tableLayout:"fixed", width:"100%"}}>
                <thead>
                     <tr style={{fontSize:"10px"}}>
   <th>Sr.</th>
    <th>Due Date</th>
    <th>Booking / Invoice ID</th>
    <th>Amount</th>
    <th>Status</th>
                     </tr>
                </thead>
             <tbody>
                <tr style={{fontSize:"12px"}}>
                <td colSpan={5}>No results found</td>
                    </tr>
             </tbody>
                </table>

          </div>
      </Card>
    </>
  )
}

export default ViewCustomer

