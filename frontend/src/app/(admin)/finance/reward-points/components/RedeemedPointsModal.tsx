"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";

type RedeemedPointsModalProps = {
    onClose: () =>void;
}
const RedeemedPointsModal =( {onClose} : RedeemedPointsModalProps) =>{

    return (
        <>
        <Modal show={true} onHide={onClose} centered >
            <Modal.Header
              style={{ background: "#274c6b", color: "#fff" }}
               className="d-flex justify-content-between"
               >
                <Modal.Title style={{ fontSize: "14px" }}>Redeemed Reward Points</Modal.Title>
               
               <button
               onClick={onClose}
              style={{
                background:"transparent",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                cursor:"pointer"
              }}>
                 ✕
              </button>
               
               </Modal.Header>

               <Modal.Body style={{fontSize:"12px"}}>
                <Form>
                    <table className="table table-bordered">
                        <tbody>
              <tr >
                <td>
                <Form.Label className='text-primary' style={{fontSize:"12px"}}>Proposal ID:</Form.Label>
            </td>
               <td>
               <Form.Control size="sm" style={{fontSize:"12px"}}/>
            </td>
              </tr>

              <tr >
                <td>
                <Form.Label className='text-primary' style={{fontSize:"12px"}}>Agency Name:</Form.Label>
            </td>
               <td>
               <Form.Control size="sm" style={{fontSize:"12px"}}/>
            </td>
              </tr>

              <tr >
                <td>
                
                <Form.Label className='text-primary' style={{fontSize:"12px"}}>Staff Name:</Form.Label>
              
            </td>
               <td>
               
               <Form.Control size="sm" style={{fontSize:"12px"}}/>
             
            </td>
              </tr>

              <tr >
                <td>
                
                <Form.Label className='text-primary' style={{fontSize:"12px"}}>Destination:</Form.Label>
              
            </td>
               <td>
               
               <Form.Control size="sm" style={{fontSize:"12px"}}/>
             
            </td>
              </tr>

              <tr >
                <td>
                
                <Form.Label className='text-primary' style={{fontSize:"12px"}}>Rewarded Points:</Form.Label>
              
            </td>
               <td>
               
               <Form.Control size="sm" style={{fontSize:"12px"}}/>
             
            </td>
              </tr>

              <tr>
                <td>
                <Form.Label className='text-primary' style={{fontSize:"12px"}}>Remarks:</Form.Label>    
                </td>
                <td>
                    <Form.Control as="textarea" rows={3} style={{fontSize:"12px"}}/>
                </td>
              </tr>

                        </tbody>
                    </table>
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
export default RedeemedPointsModal;