"use client";
import React from 'react'
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tabs,
  Tab,
  CardHeader,
  CardBody,
  CardFooter
} from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddDetailModal from './AddDetailModal';
import { useRouter } from 'next/navigation';
const EditSightseeing = () => {
      const router=useRouter()
        const [adddetail,setshowAddDetail]=useState(false)
        const [detail,setDetail]=useState(true)
        const [addoperatingtime, setAddOperatingTime]=useState(0)
        const [otherdetail, setOtherDetail]=useState(false)
    
          const [openIndex, setOpenIndex] = useState<number | null>(null);
    
         const [sections, setSections] = useState([
        { title: "Other Inclusions", open: false, value: "" },
        { title: "Advisory", open: false, value: "" },
            { title: "Cancellation Policy", open: false, value: "" },
          { title: "Refund Policy", open: false, value: "" },
            { title: "Confirmation policy", open: false, value: "" },
            { title: "Term & Condition's", open: false, value: "" },
      ]);
  return (
    <>
 <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center border-bottom pb-2 mb-2 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing")}
          >
            <Icon icon="mdi:eye" className='me-1' /> My Sightseeing
          </Button>

         <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/my-rates")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Rates
          </Button>

           <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/packages/add-package")}
          >
            <Icon icon="mdi:plus" /> Add Rates
          </Button>
        </div>


        <Row >

  {/* Row 1 */}
  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary"style={{fontSize:"10px"}}>Country *</Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Country</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>City *</Form.Label>
      <Form.Select size="sm"  style={{fontSize:"10px"}}>
        <option>City</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
        Sightseeing Name *
      </Form.Label>
      <Form.Control size="sm"  style={{fontSize:"10px"}}  />
    <Form.Label className='text-primary' size="sm"
      onClick={()=>setshowAddDetail(true)}
      style={{fontSize:"10px",cursor:"pointer"}}>Get Place Detail</Form.Label>
  
    </Form.Group>
   
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>Latitude</Form.Label>
      <Form.Control size="sm" style={{fontSize:"10px"}} />
    </Form.Group>
    
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>Longitude</Form.Label>
      <Form.Control size="sm" style={{fontSize:"10px"}} />
    </Form.Group>
  </Col>

{/* Row 2 */}
 
  { adddetail && ( <AddDetailModal onClose={()=>setshowAddDetail(false)} /> )}

  {/* Row 3 */}
 

  <Col md={4} >
    <Form.Group>
      <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
        Image (Recommend size W:800px & H:600px)
      </Form.Label>
      <Form.Control type="file" size="sm"   style={{fontSize:"10px"}}/>
    </Form.Group>
  </Col>

<Col md={4} >
    <Form.Group>
      <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>
       Address
      </Form.Label>
      <Form.Control type="text" size="sm"   style={{fontSize:"10px"}}/>
    </Form.Group>
  </Col>
   <Col md={4}>
     <Form.Label className="text-primary small"  style={{fontSize:"10px"}}>Unique Type</Form.Label>
    <Form.Group>
      <Form.Check type='checkbox' label='Is Unique'  style={{fontSize:"10px"}} />
    </Form.Group>
  </Col>
</Row>

<strong className='mt-3'>More Details</strong>
<Card className='mt-2'>
    <CardHeader className='bg-secondary d-flex align-items-center justify-content-between p-1 px-2 text-white fw-bold'
     onClick={()=>setDetail(!detail)}
       style={{cursor:"pointer"}}>
        Details
         { detail ?  <Icon icon="mdi:minus" 
        className='text-white fw-bold'
        /> :  <Icon icon="mdi:plus" 
        className='text-white fw-bold'
        />}
      
    </CardHeader>
    { detail && (
    <CardBody>
    <Col md={12}>
    <Form.Control as="textarea" rows={3} />
    </Col>
    </CardBody> 
    )}
</Card>

<Card className='mt-2'>
    <CardHeader className='bg-secondary d-flex align-items-center justify-content-between p-1 px-2 text-white fw-bold'
    onClick={()=>setOtherDetail(!otherdetail)}
     style={{cursor:"pointer"}} >
        Other Details
       { otherdetail ?  <Icon icon="mdi:minus" 
        className='text-white fw-bold'
        /> :  <Icon icon="mdi:plus" 
        className='text-white fw-bold'
        />}
    </CardHeader>
    { otherdetail && (
    <CardBody>
   <Row className="g-3">

  {/* Row 1 */}
  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Category
      </Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Select</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Activities
      </Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Select</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary " style={{fontSize:"10px"}}>
        Difficulty Level
      </Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Select</option>
      </Form.Select>
    </Form.Group>
  </Col>

  {/* Row 2 */}
  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Season
      </Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Select</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Days of week
      </Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Select</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Popularity
      </Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Select</option>
      </Form.Select>
    </Form.Group>
  </Col>

  {/* Row 3 */}
  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Things to Carry
      </Form.Label>
      <Form.Select size="sm" style={{fontSize:"10px"}}>
        <option>Select</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Pick up Point
      </Form.Label>
      <Form.Control size="sm" style={{fontSize:"10px"}} />
    </Form.Group>
  </Col>

  <Col md={4}>
    <Form.Group>
      <Form.Label className="text-primary" style={{fontSize:"10px"}}>
        Pick up Time
      </Form.Label>
      <Form.Control size="sm" style={{fontSize:"10px"}} />
    </Form.Group>
  </Col>

  {/* Row 4 - Pax */}
  <Col md={4}>
    <Form.Label className="text-primary" style={{fontSize:"10px"}}>
      Pax
    </Form.Label>
    <div className="d-flex align-items-center gap-2">
      <span style={{fontSize:"10px"}}>Min</span>
      <Form.Control size="sm" style={{fontSize:"10px", width:"60px"}} />
      <span style={{fontSize:"10px"}}>Max</span>
      <Form.Control size="sm" style={{fontSize:"10px", width:"60px"}} />
    </div>
  </Col>

  {/* Duration */}
  <Col md={4}>
    <Form.Label className="text-primary" style={{fontSize:"10px"}}>
      Duration
    </Form.Label>
    <div className="d-flex align-items-center gap-2">
      <span style={{fontSize:"10px"}}>Days</span>
      <Form.Control size="sm" style={{fontSize:"10px", width:"60px"}} />
      <span style={{fontSize:"10px"}}>Min</span>
      <Form.Control size="sm" style={{fontSize:"10px", width:"60px"}} />
    </div>
  </Col>

  {/* Age Group */}
  <Col md={4}>
    <Form.Label className="text-primary" style={{fontSize:"10px"}}>
      Allowed Age Group (Yrs)
    </Form.Label>
    <div className="d-flex align-items-center gap-2">
      <span style={{fontSize:"10px"}}>From</span>
      <Form.Control size="sm" style={{fontSize:"10px", width:"60px"}} />
      <span style={{fontSize:"10px"}}>To</span>
      <Form.Control size="sm" style={{fontSize:"10px", width:"60px"}} />
    </div>
  </Col>

  {/* Operating Time */}
  <Col md={6}>
    <Form.Label className="text-primary" style={{fontSize:"10px"}}>
      Operating Time
    </Form.Label>
    <div className="d-flex align-items-center gap-2">
     <span style={{fontSize:"10px"}}>From</span>
          <Form.Select size="sm" style={{fontSize:"10px", width:"80px"}} >
        <option>15:00</option>
        <option>16:00</option>
        <option>17:00</option>
      </Form.Select>

      <span style={{fontSize:"10px"}}>To</span>
         <Form.Select size="sm" style={{fontSize:"10px", width:"80px"}} >
        <option>15:00</option>
        <option>16:00</option>
        <option>17:00</option>
      </Form.Select>

    <Button size='sm' variant='danger' style={{fontSize:"10px"}} onClick={()=>setAddOperatingTime(addoperatingtime + 1)}><Icon icon="mdi:plus"/></Button>
     </div> 
  { [ ...Array(addoperatingtime)].map((_, index) => (
        <div className="d-flex align-items-center gap-2 mt-2" key={index}>
         <span style={{fontSize:"10px"}}>From</span>
        <Form.Select size="sm" style={{fontSize:"10px", width:"80px"}} >
        <option>15:00</option>
        <option>16:00</option>
        <option>17:00</option>
      </Form.Select>
      <span style={{fontSize:"10px"}}>To</span>
      <Form.Select size="sm" style={{fontSize:"10px", width:"80px"}} >
        <option>15:00</option>
        <option>16:00</option>
        <option>17:00</option>
      </Form.Select>
    <Button size='sm' variant='outline-info' style={{fontSize:"10px"}} onClick={()=>setAddOperatingTime(addoperatingtime - 1)}><Icon icon="mdi:delete"/></Button>
 </div>  ) )}
       
  </Col>

</Row>
    </CardBody> 
    )}
</Card>

{ sections.map((item, index)=>(
<Card className='mt-2' key={index}>
    <CardHeader className='bg-secondary d-flex align-items-center justify-content-between p-1 px-2 text-white fw-bold'
     onClick={()=>setOpenIndex(openIndex === index ? null :index)}
       style={{cursor:"pointer"}}>
       {item.title}
         { openIndex === index ?  <Icon icon="mdi:minus" 
        className='text-white fw-bold'
        /> :  <Icon icon="mdi:plus" 
        className='text-white fw-bold'
        />}
      
    </CardHeader>
    { openIndex === index && (
    <CardBody>
    <Col md={12}>
    <Form.Control as="textarea" rows={3} />
    </Col>
    </CardBody> 
    )}
</Card>
))}
<CardFooter className='text-end'>
<Button variant='danger' size='sm' style={{fontSize:"12px"}}>Save</Button>
</CardFooter>
        </Card>


    </>
  )
}

export default EditSightseeing
