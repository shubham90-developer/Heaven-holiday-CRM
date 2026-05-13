import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';


const Visa = () => {
    const [visa,setVisa]=useState(false)
  return (
    <>
        <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b> Visa (add more) </b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setVisa(!visa)}
                      style={{borderRadius:"25%"}}>{ visa ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ visa && (
                      <CardBody className="p-0">
                              <div className='table-responsive'>
                              <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light" >
                                  <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                         <th>Title</th>
    <th>Supplier</th>
    <th>Cost</th>
    <th>Confirmation No.</th>
    <th>Action</th>
                                  </tr>
                                </thead>
                               </table>
                               </div>
                    </CardBody>
)
}
      </Card>
    </>
  )
}

export default Visa
