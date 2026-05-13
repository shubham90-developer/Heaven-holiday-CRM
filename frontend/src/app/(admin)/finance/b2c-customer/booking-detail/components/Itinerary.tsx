import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table, Accordion, AccordionItem, AccordionHeader, AccordionBody} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';

const Itinerary = () => {
    const [itinerary, setItinerary]=useState(false)
  return (
    <>
       <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b> Day Wise Itinerary</b>
                  
                      <Button size='sm' variant='light' 
                     onClick={()=>setItinerary(!itinerary)}
                      style={{borderRadius:"25%"}}>{ itinerary ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ itinerary && (
                      <CardBody className="p-3">
                            <Accordion >
                                <AccordionItem eventKey='0' className='mb-3'>
                                    <AccordionHeader style={{fontSize:"10px" }}>Day 1</AccordionHeader>
                                    <AccordionBody>

                                    </AccordionBody>
                                </AccordionItem>

                                <AccordionItem eventKey='1' className='mb-3'>
                                    <AccordionHeader style={{fontSize:"10px" }}>Day 2</AccordionHeader>
                                    <AccordionBody>
                                        
                                    </AccordionBody>
                                </AccordionItem>

                                <AccordionItem eventKey='2' className='mb-3'>
                                    <AccordionHeader style={{fontSize:"10px" }}>Day 3</AccordionHeader>
                                    <AccordionBody>
                                        
                                    </AccordionBody>
                                </AccordionItem>

                                <AccordionItem eventKey='3' className='mb-3'>
                                    <AccordionHeader style={{fontSize:"10px" }}>Day 4</AccordionHeader>
                                    <AccordionBody>
                                        
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                    </CardBody>
)
}
      </Card>
   
    </>
  )
}

export default Itinerary
