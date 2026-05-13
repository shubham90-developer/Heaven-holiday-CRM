import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';

const Flights = () => {
    const [flight, setFlight]=useState(false)
  return (
    <>
        <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b>  Flights (update flight) </b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setFlight(!flight)}
                      style={{borderRadius:"25%"}}>{ flight ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ flight && (
                      <CardBody className="p-0">
                              <div className='table-responsive'>
                              <table className="table table-sm table-bordered align-middle">
                                <thead className="table-light" >
                                  <tr style={{fontSize:"10px", whiteSpace:"nowrap"}}>
                            <th>Pax Name</th>
    <th>Departure Airport</th>
    <th>Departure Time</th>
    <th>Arrival Airport</th>
    <th>Arrival Time</th>
    <th>Flight No - Airline</th>
    <th>Supplier</th>
    <th>Cost</th>
    <th>PNR Number / GDS PNR</th>
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

export default Flights
