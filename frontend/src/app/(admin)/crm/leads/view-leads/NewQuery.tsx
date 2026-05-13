"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Button, Modal,Card, Form, Row, Col, CardHeader, NavItem, CardBody } from "react-bootstrap";
import TravelersField from "./TravelersField";
import Sightseeing from "./Sightseeing";
import Miscellaneous from "./Miscellaneous";
import Hotel from "./Hotel";
const NewQuery =()=>{
 const [open, setOpen] = useState(false);
 const [requirementType, setRequirementType] = useState("package");
const [showSelect, setShowSelect] = useState(false);
const [transferType, settransferType] = useState("Cab")
    return(
        <>
            <Card>
                <CardHeader>
                    <div className="bg-dark p-2 mb-2">
                        <h6 className="text-white mb-0">New Query</h6>
                    </div>
                    <Form.Group className="mb-2">
                        <Form.Label 
                         style={{ fontSize: "12px" }}>Requirement Type</Form.Label>
                    <div className="d-flex gap-2 mb-0"
                     style={{ fontSize: "12px" }}>
                        {[ "Package",
                    "Flight",
                    "Transfer",
                    "Visa",
                    "Hotel",
                    "Sightseeing",
                    "Miscellaneous",].map((item)=>(
                            <Form.Check
                            key={item}
                            type="radio"
                            label={item}
                              value={item}
        checked={requirementType === item}
        onChange={(e) => setRequirementType(e.target.value)}
                            />
                        )

                        )}
                    </div>
                    </Form.Group>
                </CardHeader>

                <CardBody className="border">
                   <h6 style={{fontSize:"12px"}}>Lead Info:</h6>
                  
                   <div className="d-flex justify-content-between border p-1 mb-2"  style={{fontSize:"12px"}}>
                    <div ><strong>Going From :</strong></div>
                    <div><strong>Going To :</strong></div>
                    <div><strong></strong></div>
                    <div><strong>Travel Date:</strong><strong></strong></div>
                   </div>
                       { requirementType==="Package" && (
                            <Form>
                                <Row className="mb-2">
                                    <Col md={12}>
                                                         <Form.Label
                                                           style={{ fontSize: "10px" }}
                                                           className="text-primary"
                                                         >
                                                          Query Type
                                                         </Form.Label>
                                                         <div className="d-flex align-iems-center">
                                                            <Form.Check
                                                            type="radio"
                                                            label="FIT (Normal)"
                                                            name="type"
                                                            className="me-2"
                                                            style={{fontSize:"12px"}}/>
                                                            
                                                            <Form.Check
                                                            type="radio"
                                                            label="GIT Group"
                                                            name="type"
                                                            style={{fontSize:"12px"}}/>
                                                            </div></Col>

                                                            <Col md={3}>
                                                               <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                                 Going To
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>

                                                             <Col md={3}>
                                                               <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                                 Going From
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <Col md={3}>
                                                             <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                               Specific Date
                                                                                  </Form.Label>
                                                                                  <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <Col md={3}>
                                            
                                                           <Form.Label
                                                                                   style={{ fontSize: "10px" }}
                                                                                   className="text-primary"
                                                                                 >
                                                                                   No of Days
                                                                                 </Form.Label>
                                                                                 <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <TravelersField/>
                                                            
                                                                                     
                                                                                 <Col md={3}>
                                                                                                      <Form.Label
                                                                                                        style={{ fontSize: "10px" }}
                                                                                                        className="text-primary"
                                                                                                      >
                                                                                                       Price Range
                                                                                                      </Form.Label>
                                                                                                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                                                                    </Col>

                                                                                  <Col md={3}>
                                                                                                       <Form.Label
                                                                                                         style={{ fontSize: "10px" }}
                                                                                                         className="text-primary"
                                                                                                       >
                                                                                                       Inclusions
                                                                                                       </Form.Label>
                                                                                 
                                                                                                       <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                         <option value="">Select</option>
                                                                                                            <option>Hotel</option>
                                                                                                            <option>Flight</option>
                                                                                                            <option>Transfer</option>
                                                                                                            <option>Sightseeing</option>
                                                                                                      
                                                                                                       </Form.Select>
                                                                                                     </Col> 
                                                                                                             <Col md={3}>
                                                                                                                           <Form.Label
                                                                                                                             style={{ fontSize: "10px" }}
                                                                                                                             className="text-primary"
                                                                                                                           >
                                                                                                                            Theme
                                                                                                                           </Form.Label>
                                                                                                     
                                                                                                                           <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                                             <option value="">Select</option>
                                                                                                                                <option>Adventure</option>
                                                                                                                                <option>Honeymoon</option>
                                                                                                                          
                                                                                                                           </Form.Select>
                                                                                                                         </Col>
                                                                                                                           <Col md={3}>
                                                                                                                                               <Form.Label
                                                                                                                                                 style={{ fontSize: "10px" }}
                                                                                                                                                 className="text-primary"
                                                                                                                                               >
                                                                                                                                                Hotel Preference
                                                                                                                                               </Form.Label>
                                                                                                                                              <div className="d-flex align-items-center gap-2">
                                                                                                                                                                      <Form.Check
                                                                                                                                                                        type="radio"
                                                                                                                                                                        label="1"
                                                                                                                                                                        name="preferencce"
                                                                                                                                                                        className="me-2"
                                                                                                                                                                        style={{ fontSize: "12px" }}
                                                                                                                                                                      />
                                                                                                                                                                      <Form.Check
                                                                                                                                                                        type="radio"
                                                                                                                                                                        label="2"
                                                                                                                                                                        name="preferencce"
                                                                                                                                                                        defaultChecked
                                                                                                                                                                        style={{ fontSize: "12px" }}
                                                                                                                                                                      />
                                                                                                                                                                       <Form.Check
                                                                                                                                                                        type="radio"
                                                                                                                                                                        label="3"
                                                                                                                                                                        name="preferencce"
                                                                                                                                                                        defaultChecked
                                                                                                                                                                        style={{ fontSize: "12px" }}
                                                                                                                                                                      />
                                                                                                                                                                       <Form.Check
                                                                                                                                                                        type="radio"
                                                                                                                                                                        label="4"
                                                                                                                                                                        name="preferencce"
                                                                                                                                                                        defaultChecked
                                                                                                                                                                        style={{ fontSize: "12px" }}
                                                                                                                                                                      />
                                                                                                                                                                       <Form.Check
                                                                                                                                                                        type="radio"
                                                                                                                                                                        label="5"
                                                                                                                                                                        name="preferencce"
                                                                                                                                                                        defaultChecked
                                                                                                                                                                        style={{ fontSize: "12px" }}
                                                                                                                                                                      />
                                                                                                                                                                    </div>
                                                                                                                                             </Col>
                                                                                                                                             <Col md={3}>
                                                                                                                                             <Form.Label style={{fontSize:"10px"}}
                                                                                                                                             className="text-primary">Assign To Ops</Form.Label>
                                                                                                                                           <div className="d-flex gap-2">
                                                                                                                                             <Form.Check
                                                                                                                                             type="checkbox"
                                                                                                                                             
                                                                                                                                                style={{ fontSize: "12px" }}
                                                                                                                                            onChange={(e)=>setShowSelect(e.target.checked)}
                                                                                                                                             />
                                                                                                                                             {showSelect &&(
                                                                                                                                                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                                                                    <option value="">Select</option>
                                                                                                                                                    <option>Ops 1</option>
                                                                                                                                                    <option>Ops 2</option>
                                                                                                                                                    </Form.Select>
                                                                                                                                             )
                                                                                                                                             }</div>
                                                                                                                                             </Col>
                                                                                                                       

                                                            

                                </Row>
                                <div className="text-end mt-3">
                                  <Button variant="danger" size="sm" style={{ fontSize: "12px" }}>Save & Continue</Button>
                                </div>
                            </Form>
                       )}

                       { requirementType==="Flight" && (
                        <Form>
                          <Row className="mb-2 mt-2">
                            <Col md={6}>
                             <div className="d-flex gap-3 mb-3">
        <Form.Check
          type="radio"
          label="One Way"
          name="flightType"
          style={{ fontSize: "12px" }}
        />
        <Form.Check
          type="radio"
          label="Round Trip"
          name="flightType"
          style={{ fontSize: "12px" }}
        
        />
        <Form.Check
          type="radio"
          label="Multi City"
        name="flightType"
        style={{ fontSize: "12px" }}
        />
      </div>
</Col>
<Col md={6}>
 <Form.Check type="checkbox" style={{ fontSize: "12px" }} label="Group" className="ms-auto" />
</Col>
      {/* Source / Destination */}
      <Row className="mb-2">
        <Col md={6}>
            <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                               Select Source City
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                           
        </Col>
        <Col md={6}>
             <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                                 Select Destination City
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                           
        </Col>
      </Row>

      {/* Date + Pax */}
      <Row className="mb-2">
        <Col md={6}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Departure Date *
          </Form.Label>
          <Form.Control type="date" size="sm" />
        </Col>

        <Col md={2}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            ADULTS (+12 YRS)
          </Form.Label>
          <Form.Select size="sm">
            <option>1</option>
            <option>2</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            CHILD (2-11 YRS)
          </Form.Label>
          <Form.Select size="sm">
            <option>0</option>
            <option>1</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            INFANT (0-2 YRS)
          </Form.Label>
          <Form.Select size="sm">
            <option>0</option>
            <option>1</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-2">
<Col md={6}>
      {/* Fare Type */}
      <div className="d-flex gap-3 mb-2">
        <Form.Check
          type="radio"
          label="Regular Fares"
          name="fareType"
        style={{ fontSize: "12px" }}
        />
        <Form.Check
          type="radio"
          label="Student Fares"
          name="fareType"
        style={{ fontSize: "12px" }}
        />
        <Form.Check
          type="radio"
          label="Senior Citizen Fares"
          name="fareType"
        style={{ fontSize: "12px" }}
        />

          <Form.Check type="checkbox" style={{ fontSize: "12px" }} label="Direct Flight" />
      </div>
     </Col>

        <Col md={2}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>Class</Form.Label>
          <Form.Select size="sm" style={{ fontSize: "12px" }}>
            <option>Economy</option>
            <option>Business</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Preferred Airline
          </Form.Label>
          <Form.Select size="sm" style={{ fontSize: "12px" }}>
            <option>None selected</option>
            <option>Indigo</option>
            <option>Air India</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Label className="text-primary"style={{ fontSize: "10px" }}>
            Lead Source
          </Form.Label>
          <Form.Select size="sm" style={{ fontSize: "12px" }}>
            <option>RAJ SIR</option>
          </Form.Select>
        </Col>
      
</Row>
      {/* Assign + Remark */}
      <Row className="mb-2">
        <Col md={3}>
          <Form.Label style={{ fontSize: "10px" }} className="text-primary">
            Assign To Sales
          </Form.Label>
          <Form.Select size="sm" style={{ fontSize: "12px" }}>
            <option>Self</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Label style={{ fontSize: "10px" }} className="text-primary">
            Assign To Ops
          </Form.Label>
          <div className="d-flex gap-2">
            <Form.Check
              type="checkbox"
              style={{ fontSize: "12px" }}
              onChange={(e) => setShowSelect(e.target.checked)}
            />
            {showSelect && (
              <Form.Select size="sm">
                <option>Select</option>
                <option>Ops 1</option>
                <option>Ops 2</option>
              </Form.Select>
            )}
          </div>
        </Col>

        <Col md={4}>
          <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
            Add Remark
          </Form.Label>
          <Form.Control as="textarea" rows={1} size="sm" />
        </Col>
      </Row>

      {/* Button */}
      <div className="text-end">
        <Button variant="danger" size="sm">
          Save & Continue
        </Button>
      </div>
                            </Row>
                        </Form>
                       )}


     { requirementType==="Transfer" && (
                        <Form>
                          <Row className="mb-2 mt-2">
                            <Col md={6}>
                             <div className="d-flex gap-3 mb-3">
       {[
        "Cab",
        "Train"
       ].map((item)=>(
        <Form.Check
        key={item}
        type="radio"
        label={item}
        value={item}
        checked={transferType===item}
        onChange={(e)=>settransferType(e.target.value)}/>
       ))}
      </div>
</Col>

{ transferType==="Cab" && (
  <div>
    <Row>
             <Col md={12}>
                                                         <Form.Label
                                                           style={{ fontSize: "10px" }}
                                                           className="text-primary"
                                                         >
                                                          Query Type
                                                         </Form.Label>
                                                         <div className="d-flex align-iems-center">
                                                            <Form.Check
                                                            type="radio"
                                                            label="One Way"
                                                            name="type"
                                                            className="me-2"
                                                            style={{fontSize:"12px"}}/>
                                                            
                                                            <Form.Check
                                                            type="radio"
                                                            label="Round Trip"
                                                            name="type"
                                                            style={{fontSize:"12px"}}/>
                                                            </div></Col>

                                                            <Col md={3}>
                                                               <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                                 Going To
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>

                                                             <Col md={3}>
                                                               <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                                 Going From
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <Col md={3}>
                                                             <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                              Pickup up & Date Time
                                                                                  </Form.Label>
                                                                                  <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <Col md={3}>
                                            
                                                           <Form.Label
                                                                                   style={{ fontSize: "10px" }}
                                                                                   className="text-primary"
                                                                                 >
                                                                                   No of Days
                                                                                 </Form.Label>
                                                                                 <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <TravelersField/>
                                                            
                                                                                     
                                                                                 <Col md={3}>
                                                                                                      <Form.Label
                                                                                                        style={{ fontSize: "10px" }}
                                                                                                        className="text-primary"
                                                                                                      >
                                                                                                    Travelers
                                                                                                      </Form.Label>
                                                                                                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                                                                    </Col>

                                                                                

                                                                                    <Col md={3}>
                                                                                                      <Form.Label
                                                                                                        style={{ fontSize: "10px" }}
                                                                                                        className="text-primary"
                                                                                                      >
                                                                                                  Pickup Location
                                                                                                      </Form.Label>
                                                                                                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                                                                    </Col>

                                                                                                    <Col md={3}>
                                                                                                       <Form.Label
                                                                                                         style={{ fontSize: "10px" }}
                                                                                                         className="text-primary"
                                                                                                       >
                                                                                                      Preference
                                                                                                       </Form.Label>
                                                                                 
                                                                                                       <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                         <option value="">Select</option>
                                                                                                            <option>Luxary</option>
                                                                                                            <option>Standard</option>
                                                                                                            <option>SUV</option>
                                                                          
                                                                                                      
                                                                                                       </Form.Select>
                                                                                                     </Col> 
                                                                                                             <Col md={3}>
                                                                                                                           <Form.Label
                                                                                                                             style={{ fontSize: "10px" }}
                                                                                                                             className="text-primary"
                                                                                                                           >
                                                                                                                          Lead Source
                                                                                                                           </Form.Label>
                                                                                                     
                                                                                                                           <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                                             <option value="">Select</option>
                                                                                                                                <option>Agency</option>
                                                                                                                                <option>Website</option>
                                                                                                                                <option>Facebook</option>
                                                                                                                           </Form.Select>
                                                                                                                         </Col>

                                                                                                                                    <Col md={3}>
                                                                                                      <Form.Label
                                                                                                        style={{ fontSize: "10px" }}
                                                                                                        className="text-primary"
                                                                                                      >
                                                                                                 Add Remark
                                                                                                      </Form.Label>
                                                                                                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                                                                    </Col>


                                                                                                                           <Col md={3}>
                                                                                                                                               <Form.Label
                                                                                                                                                 style={{ fontSize: "10px" }}
                                                                                                                                                 className="text-primary"
                                                                                                                                               >
                                                                                                                                             Assign to sales
                                                                                                                                               </Form.Label>
                                                                                                                                              <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                                             <option value="">Select</option>
                                                                                                                                <option>Self</option>
                                                                                                                                <option>Rajendra Bugade</option>
                                                                                                                                <option>Facebook</option>
                                                                                                                           </Form.Select>
                                                                                                                                             </Col>
                                                                                                                                             <Col md={3}>
                                                                                                                                             <Form.Label style={{fontSize:"10px"}}
                                                                                                                                             className="text-primary">Assign To Ops</Form.Label>
                                                                                                                                           <div className="d-flex gap-2">
                                                                                                                                             <Form.Check
                                                                                                                                             type="checkbox"
                                                                                                                                             
                                                                                                                                                style={{ fontSize: "12px" }}
                                                                                                                                            onChange={(e)=>setShowSelect(e.target.checked)}
                                                                                                                                             />
                                                                                                                                             {showSelect &&(
                                                                                                                                                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                                                                    <option value="">Select</option>
                                                                                                                                                    <option>Ops 1</option>
                                                                                                                                                    <option>Ops 2</option>
                                                                                                                                                    </Form.Select>
                                                                                                                                             )
                                                                                                                                             }</div>
                                                                                                                                             </Col>
                                                                                                                       
    </Row>
     <div className="text-end mt-2">
    <Button variant="danger" size="sm" >Save & Continue</Button></div>
  </div>
)}
{transferType==="Train" && (
  <div>
    <Row>
            <Col md={12}>
                                                         <Form.Label
                                                           style={{ fontSize: "10px" }}
                                                           className="text-primary"
                                                         >
                                                          Query Type
                                                         </Form.Label>
                                                         <div className="d-flex align-iems-center">
                                                            <Form.Check
                                                            type="radio"
                                                            label="One Way"
                                                            name="type"
                                                            className="me-2"
                                                            style={{fontSize:"12px"}}/>
                                                            
                                                            <Form.Check
                                                            type="radio"
                                                            label="Round Trip"
                                                            name="type"
                                                            style={{fontSize:"12px"}}/>
                                                            </div></Col>

                                                            <Col md={4}>
                                                               <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                                From
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>

                                                             <Col md={4}>
                                                               <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                                 To
                                                                                  </Form.Label>
                                                                                    <Form.Control size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <Col md={4}>
                                                             <Form.Label
                                                                                    style={{ fontSize: "10px" }}
                                                                                    className="text-primary"
                                                                                  >
                                                                              Departure Date
                                                                                  </Form.Label>
                                                                                  <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
                                                            </Col>
                                                            <Col md={4}>
                                            
                                                           <Form.Label
                                                                                   style={{ fontSize: "10px" }}
                                                                                   className="text-primary"
                                                                                   size="sm"
                                                                                 >
                                                                                  ADULTS (+12 YEARS)
                                                                                 </Form.Label>
                                                                                <Form.Select  size="sm" style={{ fontSize: "12px" }}>
                                                                                  <option>1</option>
                                                                                  <option>2</option>
                                                                                </Form.Select>
                                                            </Col>
                                                             <Col md={4}>
                                            
                                                           <Form.Label
                                                                                   style={{ fontSize: "10px" }}
                                                                                   className="text-primary"
                                                                                    size="sm"
                                                                                 >
                                                                                  CHILD (2-11 YEARS)
                                                                                 </Form.Label>
                                                                                <Form.Select  size="sm" style={{ fontSize: "12px" }}>
                                                                                  <option>0</option>
                                                                                  <option>1</option>
                                                                                  <option>3</option>
                                                                                </Form.Select>
                                                            </Col>

                                                               <Col md={4}>
                                            
                                                           <Form.Label
                                                                                   style={{ fontSize: "10px" }}
                                                                                   className="text-primary"
                                                                                    size="sm"
                                                                                 >
                                                                                 INFANT (0-2 YEARS)
                                                                                 </Form.Label>
                                                                                <Form.Select  size="sm" style={{ fontSize: "12px" }}>
                                                                                  <option>0</option>
                                                                                  <option>1</option>
                                                                                  <option>3</option>
                                                                                </Form.Select>
                                                            </Col>

                                                               <Col md={4}>
                                            
                                                           <Form.Label
                                                                                   style={{ fontSize: "10px" }}
                                                                                   className="text-primary"
                                                                                    size="sm"
                                                                                 >
                                                                                  CLASSES
                                                                                 </Form.Label>
                                                                                <Form.Select  size="sm" style={{ fontSize: "12px" }}>
                                                                                  <option>AC First Class (1A)</option>
                                                                                  <option>ALL CLASSES</option>
                                                                              
                                                                                </Form.Select>
                                                            </Col>
                                                            
                                                             <Col md={4}>
                                            
                                                           <Form.Label
                                                                                   style={{ fontSize: "10px" }}
                                                                                   className="text-primary"
                                                                                    size="sm"
                                                                                 >
                                                                                 Category
                                                                                 </Form.Label>
                                                                                <Form.Select  size="sm" style={{ fontSize: "12px" }}>
                                                                                  <option>General</option>
                                                                                  <option>Tatkal</option>
                                                                              
                                                                                </Form.Select>
                                                            </Col>

                                                                                                                           <Col md={4}>
                                                                                                                                               <Form.Label
                                                                                                                                                 style={{ fontSize: "10px" }}
                                                                                                                                                 className="text-primary"
                                                                                                                                               >
                                                                                                                                             Assign to sales
                                                                                                                                               </Form.Label>
                                                                                                                                              <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                                             <option value="">Select</option>
                                                                                                                                <option>Self</option>
                                                                                                                                <option>Rajendra Bugade</option>
                                                                                                                                <option>Facebook</option>
                                                                                                                           </Form.Select>
                                                                                                                                             </Col>
                                                                                                                                             <Col md={4}>
                                                                                                                                             <Form.Label style={{fontSize:"10px"}}
                                                                                                                                             className="text-primary">Assign To Ops</Form.Label>
                                                                                                                                           <div className="d-flex gap-2">
                                                                                                                                             <Form.Check
                                                                                                                                             type="checkbox"
                                                                                                                                             
                                                                                                                                                style={{ fontSize: "12px" }}
                                                                                                                                            onChange={(e)=>setShowSelect(e.target.checked)}
                                                                                                                                             />
                                                                                                                                             {showSelect &&(
                                                                                                                                                <Form.Select size="sm" style={{ fontSize: "12px" }}>
                                                                                                                                                    <option value="">Select</option>
                                                                                                                                                    <option>Ops 1</option>
                                                                                                                                                    <option>Ops 2</option>
                                                                                                                                                    </Form.Select>
                                                                                                                                             )
                                                                                                                                             }</div>
                                                                                                                                             </Col>

                                                                                                                       

    </Row>
    <div className="text-end">
    <Button variant="danger" size="sm" >Save & Continue</Button></div>
  </div>
)}
</Row>
</Form>
     )}

{ requirementType === "Visa" && (
  <Form>
    <Row className="mt-2">
       <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Country *
    </Form.Label>
    <Form.Control size="sm" style={{ fontSize: "12px" }} />
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Visa Category *
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "12px" }}>
      <option>Select</option>
      <option>Tourism</option>
      <option>Business</option>
      <option>Student</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Entry Type
    </Form.Label>
    <Form.Select size="sm" style={{ fontSize: "12px" }}>
      <option>Select</option>
      <option>Single Entry</option>
       <option>Multi Entry</option>
        <option>Double Entry</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Date of Travel *
    </Form.Label>
    <Form.Control type="date" size="sm" style={{ fontSize: "12px" }} />
  </Col>

  {/* Row 2 */}
  <Col md={2}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Adult
    </Form.Label>
    <Form.Control size="sm" />
  </Col>

  <Col md={2}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Child
    </Form.Label>
    <Form.Control size="sm" />
  </Col>

  <Col md={2}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Child With Family
    </Form.Label>
    <Form.Control size="sm" />
  </Col>

  <Col md={2}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Infant
    </Form.Label>
    <Form.Control size="sm" />
  </Col>

  <Col md={2}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Duration
    </Form.Label>
    <Form.Control size="sm" />
  </Col>

  <Col md={2}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Nationality *
    </Form.Label>
    <Form.Select size="sm">
      <option>India</option>
    </Form.Select>
  </Col>

  {/* Row 3 */}
  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Lead Source *
    </Form.Label>
    <Form.Select size="sm">
      <option>Select</option>
      <option>Website</option>
      <option>Agency</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Add Remark
    </Form.Label>
    <Form.Control as="textarea" rows={1} size="sm" />
  </Col>

  {/* Row 4 */}
  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Assign To Sales
    </Form.Label>
    <Form.Select size="sm">
      <option>Self</option>
    </Form.Select>
  </Col>

  <Col md={3}>
    <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
      Assign To Ops
    </Form.Label>

    <div className="d-flex align-items-center gap-2">
      <Form.Check
        type="checkbox"
        onChange={(e) => setShowSelect(e.target.checked)}
      />

      {showSelect && (
        <Form.Select size="sm">
          <option>Select</option>
          <option>Ops 1</option>
          <option>Ops 2</option>
        </Form.Select>
      )}
    </div>
  </Col>
   <div className="text-end mt-2">
    <Button variant="danger" size="sm" >Save Query</Button></div>
    </Row>
  </Form>
)}             

   { requirementType ==="Hotel" && ( <Hotel/>)}
   { requirementType ==="Sightseeing" && ( <Sightseeing/>)}
     { requirementType ==="Miscellaneous" && ( <Miscellaneous/>)}
                </CardBody>
            </Card>
        </>
    );
};
export default NewQuery;