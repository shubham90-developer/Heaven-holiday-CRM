import React from 'react'
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";  
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";

type AddPaymentModalProps = {
    onClose: ()=>void;
}
const AddPaymentModal = ({onClose}:AddPaymentModalProps) => {
  return (
    <>
        <Modal show={true} onHide={onClose} centered>
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
          >
            <Modal.Title style={{ fontSize: "14px" }}>Update Payment</Modal.Title>

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
            <div className='table-responsive'>
                <table className='table table-sm table-bordered mb-0 align-middle'
                style={{tableLayout:"fixed", width:"100%"}}>
                    <tbody>
                        <tr>
                            <td>Package Cost (Inc. GST)</td>
                            <td>INR 128124</td>
                        </tr>
                        <tr>
                            <td>Amount Received</td>
                            <td>INR 0</td>
                        </tr>
                        <tr>
                            <td>OutStanding Bal.</td>
                            <td>INR 128124.00</td>
                        </tr>
                    </tbody>

                </table>
            </div>
          </Modal.Body>
         <Modal.Footer className="d-flex justify-content-between">
                <Button
                    variant="danger"
                    size="sm"
                    onClick={onClose}
                    style={{ fontSize: "12px" }}
                  >
                   Pay Offline
                  </Button>

                    <div className='d-flex gap-2'>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={onClose}
                    style={{ fontSize: "12px" }}
                  >
                    Cancel
                  </Button>
        
                  <Button variant="danger" size="sm" style={{ fontSize: "12px" }}>
                    <Icon icon="akar-icons:check" className="me-1" /> Set Payment Reminder
                  </Button>
                  </div>
                </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddPaymentModal
