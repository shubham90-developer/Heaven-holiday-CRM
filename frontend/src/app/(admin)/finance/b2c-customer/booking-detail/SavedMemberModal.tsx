import React from 'react'
import { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Modal,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  ListGroup,
} from "react-bootstrap";
import { Icon } from '@iconify/react/dist/iconify.js';
import {useRouter} from "next/navigation";

type SavedMemberModalProps = {
    onClose : () => void;
}
const SavedMemberModal = ({onClose}:SavedMemberModalProps) => {
   const members = [
    "ajay k (Adult)",
    "prince prince (Adult)",
    "Mohit",
    "Rohit",
  ];
  
    return (
    <>
       <Modal show={true} onHide={onClose} size="sm" centered>
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title style={{ fontSize: "14px" }}>
            Saved Members
          </Modal.Title>

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
        <Modal.Body style={{ fontSize: "12px" }}>
          <Form>
          
            <div className='position-relative'>
                <Icon 
                icon="mdi:magnify"
                  style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        color: "#6c757d",
        fontSize: "16px",
      }}/>
        <Form.Control
      type="search"
      size="sm"
      placeholder="Search by name"
      style={{ paddingLeft: "32px" }} 
    />
            </div>
            

      <div style={{maxHeight:"250px", overflowY:"auto"}}>
        <ListGroup variant="flush">
            {members.map((member, i)=>(
                <ListGroup.Item
                key={i}
                className='py-2'
                style={{fontSize:"14px"}}
                >{member}</ListGroup.Item>
            ))}
        </ListGroup>
      </div>

            
         

           
           
          </Form>
        </Modal.Body>

        {/* FOOTER */}
      
      </Modal>
    </>
  )
}

export default SavedMemberModal
