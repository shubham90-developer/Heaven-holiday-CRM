import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';


const Others = () => {
    const [others, setOthers]=useState(false)
  return (
    <>
         <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b> Others</b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setOthers(!others)}
                      style={{borderRadius:"25%"}}>{ others ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ others && (
                      <CardBody className="p-0">
                              <div className='table-responsive'>
                              <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light" >
                                  <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
         <th><Form.Check/></th>
           <th>Date</th>
    <th>Item Name</th>
    <th>Item Type</th>
    <th>Cost Type</th>
    <th>Pax Count</th>
    <th>Supplier</th>
    <th>Cost</th>
    <th>Confirmation No.</th>
    <th>Action</th>
                                  </tr>
                                </thead>
<tbody>
    <tr  style={{fontSize:"12px" }}>
<td><Form.Check/></td>
  <td>Dec 27, 2025</td>
    <td>NA</td>
    <td>Travel Insurance</td>
    <td>Total</td>
    <td>2</td>
    <td>NA</td>
    <td>NA</td>
    <td>NA</td>
    <td>—</td>
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

export default Others
