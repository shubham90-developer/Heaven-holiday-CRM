import React from 'react'
import { useState } from 'react'
import {Card, CardHeader, Row, Col, CardBody,Form, Button, Table} from 'react-bootstrap';
import { Icon } from '@iconify/react/dist/iconify.js';

const Hotel = () => {
    const [hotel, setHotel]=useState(false)
  return (
    <>
       <Card className="mb-3">
             <CardHeader className="bg-secondary text-white d-flex justify-content-between p-2">
                    <b>Hotels </b>
                      <Button size='sm' variant='light' 
                     onClick={()=>setHotel(!hotel)}
                      style={{borderRadius:"25%"}}>{ hotel ?<Icon icon="mdi:minus"/> : <Icon icon="mdi:plus"/> }</Button>
                    </CardHeader>

{ hotel && (
                      <CardBody className="p-0">
                           <div className="table-responsive">
  <table className="table table-sm table-bordered align-middle">
    
    <thead className="table-light">
      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
        <th>HOTEL NAME *</th>
        <th></th>
        <th></th>
        <th>CHECK-IN</th>
        <th>CHECK-OUT</th>
        <th>SUPPLIER</th>
        <th>TOTAL COST</th>
        <th></th>
        <th>CONFIRMATION NO.</th>
        <th>ACTION</th>
      </tr>
    </thead>

    <tbody style={{ fontSize: "12px" }}>

      {/* ===== HOTEL 1 ===== */}
      <tr style={{ backgroundColor: "#bfe3db" }}>
        <td>
          <b>The Munnar Queen</b><br />
          (Munnar)
        </td>
        <td></td>
        <td></td>
        <td>
          Dec 27, 2025<br />
          2:00 PM
        </td>
        <td>
          Dec 29, 2025<br />
          10:00 AM
        </td>
        <td>NA</td>
        <td>NA</td>
        <td></td>
        <td>9099090</td>
        <td>
          <span className="text-success me-2">✔</span>
          <span className="text-danger">✖</span>
        </td>
      </tr>

      {/* Sub Header */}
      <tr style={{ backgroundColor: "#cfeae4", fontSize: "10px" }}>
        <th></th>
        <th>ROOM TYPE</th>
        <th>MEAL PLAN</th>
        <th>ADULT</th>
        <th>EXTRA BED (ADULT)</th>
        <th>EXTRA BED (CHILD)</th>
        <th>NO BED (CHILD)</th>
        <th>INFANT</th>
        <th>GUEST NAME</th>
        <th>COST (INR)</th>
      </tr>

      {/* Sub Data */}
      <tr style={{ backgroundColor: "#d9f0ea" }}>
        <td></td>
        <td>Deluxe</td>
        <td>MAP</td>
        <td>2</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
      </tr>

      {/* ===== HOTEL 2 ===== */}
      <tr style={{ backgroundColor: "#bfe3db" }}>
        <td>
          <b>Ramada Alleppey</b><br />
          (Alleppey)
        </td>
        <td></td>
        <td></td>
        <td>
          Dec 29, 2025<br />
          2:00 PM
        </td>
        <td>
          Dec 30, 2025<br />
          10:00 AM
        </td>
        <td>NA</td>
        <td>NA</td>
        <td></td>
        <td>u7u</td>
        <td>
          <span className="text-success me-2">✔</span>
          <span className="text-danger">✖</span>
        </td>
      </tr>

      {/* Sub Header */}
      <tr style={{ backgroundColor: "#cfeae4", fontSize: "10px" }}>
        <th></th>
        <th>ROOM TYPE</th>
        <th>MEAL PLAN</th>
        <th>ADULT</th>
        <th>EXTRA BED (ADULT)</th>
        <th>EXTRA BED (CHILD)</th>
        <th>NO BED (CHILD)</th>
        <th>INFANT</th>
        <th>GUEST NAME</th>
        <th>COST (INR)</th>
      </tr>

      {/* Sub Data */}
      <tr style={{ backgroundColor: "#d9f0ea" }}>
        <td></td>
        <td>Standard</td>
        <td>MAP</td>
        <td>2</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
        <td>NA</td>
      </tr>

    </tbody>
  </table>
</div>
                    </CardBody>
)
}
      </Card>
    </>
  )
}

export default Hotel
