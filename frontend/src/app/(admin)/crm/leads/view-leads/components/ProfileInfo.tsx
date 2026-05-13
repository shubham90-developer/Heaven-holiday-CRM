import React, { useState } from 'react'
import { Button, Card, CardHeader, Row, Col, CardBody , Form, Table} from 'react-bootstrap';
import { Icon } from "@iconify/react/dist/iconify.js";
import AddDestinationModal from './AddDestinationModal';
import AddVisitModal from './AddVisitModal';

type ProfileInfoProps = {
  title?: string
  children?: React.ReactNode
}

type SectionCardProps = {
  title: string
  children?: React.ReactNode
  showButton?: boolean;
  onAdClick?: () => void;

}

const SectionCard = ({ title, children, showButton=true, onAdClick }: SectionCardProps) => (
  <Card className="shadow-sm mb-2 p-2">
    <CardHeader className="d-flex justify-content-between align-items-center">
      <span style={{fontSize:"12px"}}>{title}</span>
      {showButton && (
      <Button variant='outline-primary' style={{fontSize:"10px"}} size='sm' onClick={onAdClick}> + Add</Button>
      )}
    </CardHeader>
    <CardBody className="p-0">{children}</CardBody>
  </Card>
)

const ProfileInfo = () => {
  const [addDestination, setAddDestination] = useState(false);
  const [addVisit, setAddVisit] = useState(false);
  return (
    <>
      <Card className='shadow-sm mb-8'>
    
        <div className="d-flex justify-content-between p-2">
            <div className='d-flex justify-content-between' style={{fontSize:"12px", fontWeight:"bold" , gap:"80px"}}>
                <span>Payments:</span>
                <span>Total Billed: 0</span>
                <span>Total Paid: 0.0</span>
                <span>Pending: 0.0</span>
            </div>
            <Button size="sm" variant="outline-primary" style={{fontSize:"12px"}}>View</Button>
        </div>
     
      </Card>

    <Row className='g-2 mb-2'>
        <Col md={6}>
        <Card className='shadow-sm h-100 mb-2'>
            <CardHeader style={{fontSize:"12px"}}>
                <strong>Recent Queries</strong>
            </CardHeader>
            <CardBody>
                <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead className='bg-light'>
                        <tr style={{fontSize:"10px"}}>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Plan Type</th>
                        <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr style={{fontSize:"12px"}}>
                                <td>No Record Found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
        </Col>

        <Col md={6}>
        <Card className='shadow-sm  h-100 mb-2'>
            <CardHeader className="d-flex justify-content-between" style={{fontSize:"12px"}}>
                <strong>Customer Profile/Preferences:</strong>
                <strong>Category:NA</strong>
            </CardHeader>
            <CardBody>
                <div className='table-responsive'>
                    <table className="table table-sm table-bordered mb-0 align-middle"
                style={{tableLayout:"fixed", width:"100%", overflowY:"auto", display:"block", height:"200px"}}>
                        <tbody>
                            <tr style={{fontSize:"12px"}} >
                                <td>Date of Birth / Anniversary:</td>
                                <td>NA/NA</td>
                            </tr>
                            <tr style={{fontSize:"12px"}}>
                                <td>Seat Preference</td>
                                <td>NA</td>
                            </tr>
                            <tr style={{fontSize:"12px"}}>
                                <td>Food</td>
                                <td></td>
                            </tr>
                            <tr style={{fontSize:"12px"}}>
                                <td>Hotel</td>
                                <td>NA</td>
                            </tr>
                            <tr style={{fontSize:"12px"}}>
                                <td>Passport</td>
                                <td>No</td>
                            </tr>
                            <tr style={{fontSize:"12px"}}>
                                <td>Marrital Status</td>
                                <td>
                                <Form.Select style={{fontSize:"12px"}}>
                                    <option>Married</option>
                                    <option>Unmarried</option></Form.Select></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
        </Col>

    </Row>

    <Row className="g-3">

      {/* I want to go */}
      <Col md={6}>
        <SectionCard title="I want to go :" onAdClick={() => setAddDestination(true)}>
          <Table  className="mb-0">
            <thead className="bg-light">
              <tr style={{fontSize:"10px"}}>
                <th>Destination</th>
                <th style={{ width: "120px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{fontSize:"12px"}}>
                <td colSpan={2} className="text-center">
                  No record found
                </td>
              </tr>
            </tbody>
          </Table>
        </SectionCard>

        {addDestination && (
          <AddDestinationModal onClose={() => setAddDestination(false)} />
        )}
      </Col>

      {/* Have Been To */}
      <Col md={6}>
        <SectionCard title="Have Been To:" onAdClick={()=>setAddVisit(true)}>
          <Table bordered className="mb-0">
            <thead className="bg-light">
              <tr style={{fontSize:"10px"}}>
                <th>Last Visited</th>
                <th>Country</th>
                <th>City</th>
                <th>Type</th>
                <th style={{ width: "120px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{fontSize:"12px"}}>
                <td colSpan={5} className="text-center">
                  No record found
                </td>
              </tr>
            </tbody>
          </Table>
        </SectionCard>
       
       { addVisit && (
        <AddVisitModal onClose={()=>setAddVisit(false)}/>
       )}
      </Col>

      {/* To Do List */}
      <Col md={6}>
        <SectionCard title="To Do List" showButton={false}>
          <Table bordered className="mb-0">
            <thead className="bg-light">
              <tr style={{fontSize:"10px"}}>
                <th style={{ width: "120px" }}>Update</th>
                <th>Subject (Details)</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button size="sm" variant="outline-primary" style={{fontSize:"10px"}}>Update</Button>
                </td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </Table>
        </SectionCard>
      </Col>

      {/* Remarks */}
      <Col md={6}>
        <SectionCard title="Remarks:" showButton={false}>
          <Table bordered className="mb-0">
            <thead className="bg-light">
              <tr style={{fontSize:"10px"}}>
                <th>#</th>
                <th>Create Date</th>
                <th>Remark Type</th>
                <th>Remark</th>
                <th style={{ width: "120px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{fontSize:"12px"}}>
                <td colSpan={5} className="text-center">
                  No record found
                </td>
              </tr>
            </tbody>
          </Table>
        </SectionCard>
      </Col>

    </Row>

    </>
  )
}

export default ProfileInfo
