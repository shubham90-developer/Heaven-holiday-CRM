import React from 'react'
import { Card, CardBody, Row, Col } from "react-bootstrap";

type StatItem={
    title:string;
    count:number;
    subText:string
}

const statData: StatItem[] =[
     { title: "UNASSIGNED", count: 1, subText: "Assign Now"},
  { title: "IN PROCESS", count: 0, subText: "With Ops Team" },
  { title: "DOCS PENDING", count: 1, subText: "Waiting From Client"},
  { title: "SUBMITTED", count: 0, subText: "At Embassy/Center" },
  { title: "VISA APPROVED", count: 0, subText: "Approved Visa"},
  { title: "REJECTED", count: 0, subText: "Rejected by Embassy" },
  { title: "VISA DISPATCHED", count: 0, subText: "Dispatched to Client" },
  { title: "OTHER", count: 0, subText: "Miscellaneous "},
]
const Stat = () => {
  return (
    <>
 
   
      <Row className='g-1 mb-3'>
        { statData.map((item, index)=>(
            <Col md={2} key={index}>
                <Card className='shadow-sm p-2 border-0'> 
                    <CardBody>
        <div className='text-primary fs-12'>{item.title}</div>
        <div className='fs-12 text-danger' >{item.count}</div>
        <div  style={{fontSize:"10px"}}>{item.subText}</div>
        <div  style={{fontSize:"12px"}} className='text-danger'>{item.count}</div>
                </CardBody>
                </Card>
            </Col>
        ))}
      </Row>
 
    </>
  )
}

export default Stat
