import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import { Button, Modal,Card, Form, Row, Col, Table, CardFooter, CardHeader, NavItem, CardBody } from "react-bootstrap";
const PaxWise = () => {
  return (
    <>
    <CardBody className='p-2'>
      <Row className="mb-3">
          <Col md={6}>
            <Form.Label style={{fontSize:"12px"}}>B2C Markup</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Adult"
                  size='sm'
              style={{fontSize:"12px"}}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Child"
                  size='sm'
                style={{fontSize:"12px"}}
                />
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Form.Label  style={{fontSize:"12px"}}>B2B Markup</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Adult"
                  size='sm'
                 style={{fontSize:"12px"}}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Child"
                  size='sm'
                 style={{fontSize:"12px"}}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* COST TABLE */}
        <div className='table-responsive'>
        <Table bordered>
          <thead>
            <tr  style={{fontSize:"10px"}}>
            <th>Pax</th>
<th>Cost (PP)</th>
<th>B2C Cost With Mark Up</th>
<th style={{width:"150px"}}>B2B Cost With Mark Up</th>
<th>Action</th>
            </tr>
            <tr  style={{fontSize:"10px"}}>
                <th>
                    <div className='d-flex justify-content-between'>
                        <span>Form</span>
                        <span>To</span>
                    </div>
                </th>
              <th>
                <div className="d-flex justify-content-between">
                  <span>Adult</span>
                  <span>Child</span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between">
                  <span>Adult</span>
                  <span>Child</span>
                </div>
              </th>
              <th>
                <div className="d-flex justify-content-between">
                  <span>Adult</span>
                  <span>Child</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr  style={{fontSize:"12px"}}>
              <td>
                <Row>
                  <Col>
                    <Form.Control
                      type="number"
                      size='sm'
                      style={{fontSize:"12px"}}
                      defaultValue={0}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      size='sm'
                      style={{fontSize:"12px"}}
                      defaultValue={0}
                    />
                  </Col>
                </Row>
              </td>

              <td>
                <Row>
                  <Col>
                    <Form.Control  size='sm'  style={{fontSize:"12px"}}/>
                  </Col>
                  <Col>
                    <Form.Control size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                </Row>
              </td>

              <td>
                <Row>
                  <Col>
                    <Form.Control  size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                  <Col>
                    <Form.Control size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                </Row>
              </td>

               <td>
                <Row>
                  <Col>
                    <Form.Control size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                  <Col>
                    <Form.Control  size='sm'  style={{fontSize:"12px"}} />
                  </Col>
                </Row>
              </td>

              <td>
                <Button variant='danger' size='sm' style={{fontSize:"12px"}}><Icon icon="mdi:plus" /></Button>
              </td>
            </tr>
          </tbody>
        </Table>
        </div>
        </CardBody>

                  <CardFooter>
            <div className='d-flex align-items-center justify-content-between'>
                <span className='text-primary' 
                style={{fontSize:'12px', cursor:'pointer'}}
                >Add More Services</span>
                <div className='d-flex gap-2 align-items-center'>
                    <Form.Check label="Display on Website" style={{fontSize:'12px'}} />
                    <Button variant='danger' size='sm' style={{fontSize:'12px'}}>Save & Exit</Button>
                </div>
            </div>
          </CardFooter>
    </>
  )
}

export default PaxWise
