"use client"
import React from 'react'
import Filter from './Filter';
import { Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
const ManageGuide = () => {
    const router=useRouter()
  return (
    <>
               <div className='mb-2'>
              <Filter/>
            </div>
            <Card className='p-3'>
        <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                  {/* Left Section */}
      
                  <div className="d-flex align-items-center gap-2">
      
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={()=>router.push('/my-inventory/vehicles/')}
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                    >
                     Manage Transport
                    </Button>
      
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={()=>router.push('/my-inventory/vehicles/manage-driver')}
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                    >
                      Manage Driver
                    </Button>
      
                      <Button
                      variant="primary"
                      size="sm"
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                    >
                      Manage Guide
                    </Button>
                  </div>
      
                  {/* right side */}
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      style={{ fontSize: "10px", fontWeight: "bold" }}
                      onClick={() => router.push("/my-inventory/vehicles/manage-guide/add-guide")}
                    >
                      <Icon icon="mdi:plus" className="me-1" />
                     Add Guide
                    </Button>
                  </div>
                </div>
                </div>
      
               <div className="table-responsive">
                        <table
                          className="table table-sm table-bordered mb-0 align-middle"
                          style={{ tableLayout: "fixed", width: "100%" }}
                        >
                          <thead>
                            <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        <th style={{ width: "60px" }}>S.No</th>
<th style={{ width: "150px" }}>Guide Name</th>
<th style={{ width: "150px" }}>Destination</th>
<th style={{ width: "200px" }}>Email</th>
<th style={{ width: "150px" }}>Mobile No</th>
<th style={{ width: "120px" }}>Status</th>
<th style={{ width: "100px" }}>Action</th> 
 </tr>
              </thead>
              <tbody>
                <tr style={{fontSize:"12px"}}>
                     <td colSpan={5}>No results found</td>
                  </tr>
      
              </tbody>
              </table>
              </div>
            </Card>
    </>
  )
}

export default ManageGuide
