import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';


const RefundPolicy = () => {
    const [refundpolicy, setRefundPolicy]=useState(false)
  return (
    <>
       <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b> Refund Policy </b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setRefundPolicy(!refundpolicy)}
                      style={{borderRadius:"25%"}}>{ refundpolicy ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ refundpolicy && (
                      <CardBody className="p-0">
                            <div>Refund Policy</div> 
                    </CardBody>
)
}
      </Card>
    </>
  )
}

export default RefundPolicy
