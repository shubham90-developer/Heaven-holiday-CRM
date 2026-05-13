import { Icon } from "@iconify/react";
import { useState } from "react";
import { Button, Modal, Form, Row, Col, InputGroup, Table, Card, CardHeader, CardBody, CardFooter } from "react-bootstrap";
import VehicleWise from './VehicleWise';
import PaxWise from './PaxWise';
type AddPoliciesModalProps = {
    onClose: () => void;
}
const AddPoliciesModal = ({onClose}: AddPoliciesModalProps) => {
   const [policytype, setPolicyType] = useState("Standard")
  return (
    <>
        <Modal show={true} onHide={onClose} size='lg' centered >
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>Policies</Modal.Title>

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

        {/* BODY */}

        <Modal.Body>
         
            <Card>
                <div className="d-flex gap-3">
                    <Form.Label size='sm' style={{ fontSize: "12px" }} >Mark Up Setting :</Form.Label>
              <Form.Check type="radio" label='Standard'
               id="Standard" style={{ fontSize: "12px" }} 
               value='Standard' name="type"
               onChange={(event)=>setPolicyType(event.target.value)}
               />
              <Form.Check  type='radio' label='Customize'
               style={{ fontSize: "12px" }}
                onChange={(event)=>setPolicyType(event.target.value)}
                id="Customize" value='Customize' name="type" />
              
                </div>
            { policytype === "Standard" && ( 
                <div className="mb-4">

                </div>
            )}

               { policytype === "Customize" && ( 
                <div className="p-3">

                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                <Button variant="primary" className='mt-2' size="sm" style={{ fontSize: "12px" }}>Save</Button>
                </div>
            )}

            <div className="text-end">
                 <Button variant="danger" size="sm" style={{ fontSize: "12px" }}>Exit</Button>
            </div>
            </Card>
       
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddPoliciesModal
