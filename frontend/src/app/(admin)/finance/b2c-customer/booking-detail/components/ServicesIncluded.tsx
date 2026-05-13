import React from 'react'
import { useState } from 'react'
import Hotel from './Hotel';
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';
const ServicesIncluded = () => {
    const [services,setServices]=useState(false)
    const [activeTab, setActiveTab]=useState("Hotel")
  return (
    <>
        <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b>  Services Included</b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setServices(!services)}
                      style={{borderRadius:"25%"}}>{ services ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ services && (
                      <CardBody className="p-2">
                            <div className='d-flex gap-1'>
                                {["Hotel","Insurance","Others","Sightseeing","Flights","Guide","Meals","Transfers","Visa"].map((item)=>(
                                      <Button key={item}
                                      variant={activeTab===item? "secondary":"outline-secondary"}
                                      size="sm" className="me-2" style={{fontSize:"10px"}}>{item}</Button>
                                ))}
                            </div>
{ activeTab === "Hotel" && ( <Hotel/>)}
                    </CardBody>
)
}
      </Card>
    </>
  )
}

export default ServicesIncluded
