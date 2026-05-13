"use client";
import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js';
import { Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import Filter from './Filter';
const Visa = () => {
    const router=useRouter()
  return (
    <>
         <div className='mb-2'>
        <Filter/>
      </div>
      <Card className='p-3'>
  <div className="mb-2">
    <div className='text-end'>
         <Button
                        variant="primary"
                        size="sm"
                        onClick={() => router.push("/my-inventory/visa/add-visa")}
                        style={{ fontSize: "10px", fontWeight: "bold" }}
                      >
            <Icon icon="mdi:plus"   />       Add Visa
                      </Button>
    </div>
          </div>

         <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <thead>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                      <th style={{ width: "80px" }}>Visa ID</th>
<th style={{ width: "150px" }}>Nationality</th>
<th style={{ width: "150px" }}>Country</th>
<th style={{ width: "150px" }}>Visa Name</th>
<th style={{ width: "120px" }}>Visa Required</th>
<th style={{ width: "150px" }}>Visa Category</th>
<th style={{ width: "150px" }}>Visa Type</th>
<th style={{ width: "140px" }}>Processing Time</th>
<th style={{ width: "180px" }}>Passport Expire (Days)</th>
<th style={{ width: "120px" }}>Validity</th>
<th style={{ width: "120px" }}>Duration</th>
<th style={{ width: "120px" }}>Currency</th>
<th style={{ width: "130px" }}>Adult Rates</th>
<th style={{ width: "130px" }}>Child Rates</th>
<th style={{ width: "130px" }}>Infant Rates</th>
<th style={{ width: "100px" }}>DOW</th>
<th style={{ width: "100px" }}>Status</th>
<th style={{ width: "100px" }}>Action</th>
        </tr>
        </thead>
        <tbody>
            <tr style={{ fontSize: "12px"}}>
                <td>5766</td>
<td>India</td>
<td>United Arab Emirates</td>
<td>DUBAI VISA</td>
<td>e Visa</td>
<td>Tourism</td>
<td>Single Entry</td>
<td>5 working days</td>
<td>180</td>
<td>30</td>
<td>30</td>
<td>INR</td>
<td>8500</td>
<td>5000</td>
<td>3500</td>
<td><Form.Check/></td>
<td>Active</td>
<td>
    <div className='d-flex gap-1'>
      
      <Button
                    variant="primary"
                    size="sm"
                    title='Edit'
                       onClick={() => router.push("/my-inventory/visa/edit-visa")}
                    style={{ fontSize: "10px", fontWeight: "bold" }}
                  >
                    <Icon icon="mdi:edit"/>
                  </Button>
         <Button
                    variant="danger"
                    size="sm"
                    title='Deactive'
                    style={{ fontSize: "10px", fontWeight: "bold" }}
                  >
                    <Icon icon="mdi:close"/>
                  </Button>
      
    </div>
</td>
            </tr>

        </tbody>

        </table>
        </div>
      </Card>
    </>
  )
}

export default Visa
