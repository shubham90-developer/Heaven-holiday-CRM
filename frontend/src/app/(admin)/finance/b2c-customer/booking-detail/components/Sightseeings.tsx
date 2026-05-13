import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';

const Sightseeings = () => {
    const [sightseeing, setSightseeing]=useState(false)
  return (
    <>
        <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b> Sightseeings (add more) </b>
                    <div className='d-flex gap-2'>

              <Button size='sm' variant='light' 
                      style={{fontSize:"10px"}}>All SIC</Button>
                       <Button size='sm' variant='light' 
                      style={{fontSize:"10px"}}>All Pvt</Button>
                 <Button size='sm' variant='light' 
                      style={{fontSize:"10px"}}>All Entry Only</Button>
             <Button size='sm' variant='light' 
                      style={{fontSize:"10px"}}>All NA</Button>
                      <Button size='sm' variant='light' 
                     onClick={()=>setSightseeing(!sightseeing)}
                      style={{borderRadius:"25%"}}>{ sightseeing ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                  </div>
</CardHeader>
{ sightseeing && (
                      <CardBody className="p-0">
                              <div className='table-responsive'>
                              <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light" >
                                  <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                <th><Form.Check/></th>
                <th>Date</th>
    <th>Destination *</th>
    <th>Sightseeing *</th>
    <th>Type</th>
    <th>Pick Up Location</th>
    <th>No. of Pax</th>
    <th>Supplier</th>
    <th>Cost</th>
    <th>Confirmation No.</th>
    <th>Action</th>
                                  </tr>
                                </thead>
            <tbody style={{fontSize:"12px"}}>
                <tr>
            <td><Form.Check/></td>
             <td>Dec 27, 2025</td>
    <td>Munnar</td>
    <td>Blossom Garden</td>
    <td>NA</td>
    <td>NA</td>
    <td>A: 2</td>
    <td>NA</td>
    <td>NA</td>
    <td>NA</td>
    <td>—</td>
   <td></td>
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

export default Sightseeings
