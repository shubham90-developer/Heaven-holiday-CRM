"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import RemarkBox from "./RemarkBox";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "react-bootstrap";
import EditCustomerModal from "./EditCustomerModal";
import NewQuery from "./NewQuery";
import ProfileInfo from "./components/ProfileInfo";
import Queries from "./components/Queries";
import Account from "./components/Account";
import Booking from "./components/Booking";
import Followups from "./components/Followups";
import Contacts from "./components/Contacts";
import Feedback from "./components/Feedback";
import Remarks from "./components/Remarks";
const Profile = () => {
  const [step, setStep] = useState(1);
const[showQuery, setShowQuery] = useState(true);
const [activeTab, setActiveTab] = useState("Profile");
  return (
    <>
    <Card>
       
          <Row className="align-items-center mb-2 px-3 py-1">
        <Col md={6}>
          <div style={{fontSize:"12px"}}>
            Customer Name : Mr. The Wind Dreams{" "} <EditCustomerModal/>
          
          </div>
          <div style={{fontSize:"12px"}}>
           Owner name :{" "}
            <span className="text-primary">Pallavi Laskeshri</span>
          </div>
          <div  style={{fontSize:"12px"}}>
            <strong>Last Remark :</strong>
          </div>
        </Col>

        <Col md={3}>
          <div  style={{fontSize:"12px"}}>
           Contact No : +91 9371759599
          </div>
          <div  style={{fontSize:"12px"}}>
           Customer Type : B2C
          </div>
        </Col>

        <Col md={3} className="text-end">
          <div  style={{fontSize:"12px"}}>
           Email ID :{" "}
            <span className="text-primary">
              9371759599.aheaven@gmail.com
            </span>
          </div>
          <div  style={{fontSize:"12px"}}>
            Active Since :{" "}
            <span className="text-primary">
              28-Mar-26 12:50:21
            </span>
          </div>
        </Col>
      </Row>

      <hr />
       <Row className="align-items-center px-3 mb-2">
        <Col md={2}>

         <RemarkBox/>
        </Col>

        <Col md={3}>
          <Form.Group>
           <Form.Label
                                  style={{ fontSize: "10px" }}
                                  className="fw-bold"
                                >
                                  Date of Birth
                                </Form.Label>
          <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
              <Form.Label
                                  style={{ fontSize: "10px" }}
                                  className="fw-bold"
                                >
                                Anniversary
                                </Form.Label>
          <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
          </Form.Group>
        </Col>

        <Col md={1}>
          <Button variant="outline-danger" size="sm" 
          style={{ fontSize: "10px", fontWeight: "bold" }}>
            Save
          </Button>
        </Col>

        <Col md={3} className="text-end mt-3 mt-md-0">
          <Button variant="outline-primary" size="sm" className="me-2">
           <Icon icon="mdi:thumb-up-outline" width="18" />
          </Button>
          <Button variant="outline-primary" size="sm" className="me-2">
             <Icon icon="mdi:plus" className="me-1" />To Do
          </Button>
        <Button variant="danger" size="sm"
                  onClick={() => setShowQuery(!showQuery)}
                >
                         <Icon icon="mdi:plus" className="me-1" />New Query
                       </Button>
        </Col>
      </Row>
    </Card>

       {showQuery && <NewQuery/>  }

        <Card>
          <div className="d-flex justify-content-between p-2">
          <div className="d-flex gap-2">
            {["Profile","Queries","Bookings","Accounts", "ToDo's/Follow up's", "Contacts", "Feedback", "Remarks"].map((item)=>(
              <span key={item}
              onClick={()=>setActiveTab(item)} 
              style={{fontSize:"12px",
                cursor:"pointer",
              borderBottom:activeTab===item? "2px solid #000":"none"}} >{item}</span>
            )
            )}
          </div>
          <Button variant="outline-danger" size="sm" className="me-2" style={{fontSize:"10px"}}>Update Payment</Button>
        </div>
        </Card>

        <Card>
          { activeTab === "Profile" && ( <ProfileInfo/>)}
          { activeTab === "Queries" && ( <Queries/>)}
          { activeTab === "Bookings" && ( <Booking/>)}
          { activeTab === "Accounts" && ( <Account/>)}
          { activeTab === "ToDo's/Follow up's" && ( <Followups/>)}
            { activeTab === "Contacts" && ( <Contacts/>)}
            { activeTab === "Feedback" && ( <Feedback/>)}
            { activeTab === "Remarks" && ( <Remarks/>)}
        </Card>
     
    </>
  );
};

export default Profile;
