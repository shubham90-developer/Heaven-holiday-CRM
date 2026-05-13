import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { Modal, Button, Card, Col, Row, Form } from 'react-bootstrap'
type AddPointsModalProps = {
        onClose: () => void;
}
const AddPointsModal = ({onClose}: AddPointsModalProps) => {
  const [pointstype, setPointstype] = useState("B2B Agency Wise");
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
                  <div className='d-flex mb-2 gap-3'>
                    <Form.Check
                    type="radio"
                    label="B2B Agency Wise"
                    checked={pointstype === "B2B Agency Wise"}
                    onChange={() => setPointstype("B2B Agency Wise")}

                    name="pointsAction"
                    />

                     <Form.Check
                    type="radio"
                    label="Proposal ID Wise"
                    checked={pointstype === "Proposal ID Wise"}
                    onChange={() => setPointstype("Proposal ID Wise")}
                    name="pointsAction"
                    />
</div>
                    { pointstype === "B2B Agency Wise" && ( 
                             <table className="table table-bordered">
                                                <tbody>
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
                                        <Form.Label className='text-primary' style={{fontSize:"12px"}}>Sales Value:</Form.Label>
                                    </td>
                                       <td>
                                       <Form.Control size="sm" style={{fontSize:"12px"}}/>
                                    </td>
                                      </tr>
                        
                                      <tr >
                                        <td>
                                        
                                        <Form.Label className='text-primary' style={{fontSize:"12px"}}>Reward Percentage:</Form.Label>
                                      
                                    </td>
                                       <td>
                                       
                                       <Form.Control size="sm" style={{fontSize:"12px"}}/>
                                     
                                    </td>
                                      </tr>
                        
                                      <tr >
                                        <td>
                                        
                                        <Form.Label className='text-primary' style={{fontSize:"12px"}}>Reward Points:</Form.Label>
                                      
                                    </td>
                                       <td>
                                       
                                       <Form.Control size="sm" style={{fontSize:"12px"}}/>
                                     
                                    </td>
                                      </tr>
                                                </tbody>
                                            </table>
                    )
                }

                { pointstype === "Proposal ID Wise" && (
                     <table className="table table-bordered">
                                                <tbody>
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
                                        <Form.Label className='text-primary' style={{fontSize:"12px"}}>Sales Value:</Form.Label>
                                    </td>
                                       <td>
                                       <Form.Control size="sm" style={{fontSize:"12px"}}/>
                                    </td>
                                      </tr>
                        
                                      <tr >
                                        <td>
                                        
                                        <Form.Label className='text-primary' style={{fontSize:"12px"}}>Reward Percentage:</Form.Label>
                                      
                                    </td>
                                       <td>
                                       
                                       <Form.Control size="sm" style={{fontSize:"12px"}}/>
                                     
                                    </td>
                                      </tr>
                        
                                      <tr >
                                        <td>
                                        
                                        <Form.Label className='text-primary' style={{fontSize:"12px"}}>Reward Points:</Form.Label>
                                      
                                    </td>
                                       <td>
                                       
                                       <Form.Control size="sm" style={{fontSize:"12px"}}/>
                                     
                                    </td>
                                      </tr>

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

export default AddPointsModal
