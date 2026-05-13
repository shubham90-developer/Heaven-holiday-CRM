import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
const SalesOverview = () => {
    const [showsales, setShowSales]=useState(true)
  return (
    <>
      <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b>  Sales Overview (Customer)</b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setShowSales(!showsales)}
                      style={{borderRadius:"25%"}}>{ showsales ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ showsales && (
                      <CardBody className="p-0">
                              <div className='table-responsive'>
                              <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light" >
                                  <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                            <th>Booking Date</th>
  <th>Total Cost</th>
  <th>Mark Up</th>
  <th>Discount</th>
  <th>Tax</th>
  <th>Sales Price</th>
  <th>Advance</th>
  <th>Balance</th>
                                  </tr>
                                </thead>
            <tbody style={{fontSize:"12px"}}>
                <tr>
                     <td>Nov 26, 2025</td>
  <td>INR 281,600</td>
  <td>NA</td>
  <td>NA</td>
  <td>NA</td>
  <td>INR 281,600</td>
  <td>INR 281,600</td>
  <td>NA</td>
         </tr>  
          </tbody>
                               </table>
                               </div>
                    </CardBody>
)
}
      </Card>
    </>
  )
}

export default SalesOverview
