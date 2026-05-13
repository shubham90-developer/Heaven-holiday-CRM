import React from 'react'
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";  
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
type EditCreditModalProps = {
    onClose: ()=>void;
}
const EditCreditModal = ({onClose}:EditCreditModalProps) => {
    const [customerCredit, setCustomerCredit] = useState("Update Credit");
  return (
    <>
      <Modal show={true} onHide={onClose} centered>
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
          >
            <Modal.Title style={{ fontSize: "14px" }}>Customer Credit</Modal.Title>

              <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          </Modal.Header>

          <Modal.Body style={{fontSize:"12px"}}>
         <Form>
            <div className='d-flex gap-2 mb-0'  style={{ fontSize: "12px" }}>
              {["Update Credit", "Update Top Up"].map((item)=>(
                <Form.Check
                key={item}
                type="radio"
                label={item}
                value={item}
                checked={customerCredit ===item}
                onChange={(e) => setCustomerCredit(e.target.value)}
              />))}
                           </div>

                            <Row className="mb-3  mt-2" >
          <Col md={6}>
            <p className='mb-2'><b>Contact Name :</b> Avinash</p>
          
          </Col>
          <Col md={6}>
            <p className='mb-2'><b>Email Id :</b> 8857870323.aheaven@gmail.com</p>
          </Col>
          <Col md={6}>
                      <p className='mb-2'><b>Contact Info :</b> 8857870323</p>
          </Col>
          <Col md={6}>
                 <p className='mb-2'><b>Consumed :</b> Nil</p>
          </Col>
            <Col md={6}>
                     <p className='mb-2'><b>Balance :</b> .00</p>
          </Col>
          <Col md={6}>
                 <p className='mb-2'><b>Previous Limit :</b> .00</p>
          </Col>
        </Row>
                { customerCredit==="Update Credit" && (
                    <Row>
                        <Col md={12}>
                        <div className='d-flex gap-2'>
                          <Form.Check type="radio" label="One Time" name="update" className="mb-2"   style={{fontSize:"12px"}}/>
                          <Form.Check type="radio" label="Recurring" name="update" className="mb-2"   style={{fontSize:"12px"}}/>
                      </div>
                        </Col>
                        <Col md={3}>
              <Form.Label className='text-primary' style={{fontSize:"12px"}}>Currency</Form.Label>
              <Form.Select style={{fontSize:"12px"}}>
                <option>INR</option>
                <option>USD</option>
              </Form.Select>
          </Col>

          <Col md={3}>
              <Form.Label className='text-primary' style={{fontSize:"12px"}}>Transaction type</Form.Label>
              <Form.Select style={{fontSize:"12px"}}>
                <option>Add</option>
                <option>Deduct</option>
              </Form.Select>
          </Col>

          <Col md={3}>
              <Form.Label className='text-primary' style={{fontSize:"12px"}}>Amount</Form.Label>
              <Form.Control type="number" placeholder="Amount" style={{fontSize:"12px"}} />
          </Col>

          <Col md={3}>
              <Form.Label className='text-primary' style={{fontSize:"12px"}}>Credit Days</Form.Label>
              <Form.Control type="number" placeholder="Credit Days" style={{fontSize:"12px"}} />
          </Col>
          <Col md={12}>
          <Form.Label className='text-primary mt-2' style={{fontSize:"12px"}}>Remark</Form.Label>
          <Form.Control as="textarea" rows={2} style={{fontSize:"12px"}} />
        </Col>
                    </Row>
                )  }

                    { customerCredit==="Update Top Up" && (
                        <Row>
                                                    <Col md={3}>
              <Form.Label className='text-primary' style={{fontSize:"12px"}}>Currency</Form.Label>
              <Form.Select style={{fontSize:"12px"}}>
                <option>INR</option>
                <option>USD</option>
              </Form.Select>
          </Col>

          <Col md={3}>
              <Form.Label className='text-primary' style={{fontSize:"12px"}}>Transaction type</Form.Label>
              <Form.Select style={{fontSize:"12px"}}>
                <option>Add</option>
                <option>Deduct</option>
              </Form.Select>
          </Col>

          <Col md={3}>
              <Form.Label className='text-primary' style={{fontSize:"12px"}}>Amount</Form.Label>
              <Form.Control type="number" placeholder="Amount" style={{fontSize:"12px"}} />
          </Col>

          <Col md={12}>
          <Form.Label className='text-primary mt-2' style={{fontSize:"12px"}}>Remark</Form.Label>
          <Form.Control as="textarea" rows={2} style={{fontSize:"12px"}} />
        </Col>

                        </Row>
                    )}
         </Form>
          </Modal.Body>
         <Modal.Footer className="d-flex justify-content-between">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={onClose}
                    style={{ fontSize: "12px" }}
                  >
                    Cancel
                  </Button>
        
                  <Button variant="success" size="sm" style={{ fontSize: "12px" }}>
                    <Icon icon="akar-icons:check" className="me-1" /> Submit
                  </Button>
                </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditCreditModal
