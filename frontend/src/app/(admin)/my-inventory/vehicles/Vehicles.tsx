"use client"
import React from 'react'
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import Filter from './Filter'
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
const Vehicles = () => {
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
                variant="primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
               Manage Transport
              </Button>

              <Button
                variant="outline-primary"
                size="sm"
                   onClick={() => router.push("/my-inventory/vehicles/manage-driver")}
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Manage Driver
              </Button>

                <Button
                variant="outline-primary"
                size="sm"
                   onClick={()=>router.push('/my-inventory/vehicles/manage-guide')}
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
                onClick={() => router.push("/my-inventory/vehicles/add-transport")}
              >
                <Icon icon="mdi:plus" className="me-1" />
               Add Transport
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
<th style={{ width: "150px" }}>Car Type</th>
<th style={{ width: "150px" }}>Car</th>
<th style={{ width: "100px" }}>Ac</th>
<th style={{ width: "100px" }}>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr style={{ fontSize: "12px"}}>
                <td>1</td>
<td>Luxury</td>
<td>superadmin car</td>
<td>Yes</td>
<td>Master</td>
            </tr>

        </tbody>

        </table>
        </div>
      </Card>
    </>
  )
}

export default Vehicles
