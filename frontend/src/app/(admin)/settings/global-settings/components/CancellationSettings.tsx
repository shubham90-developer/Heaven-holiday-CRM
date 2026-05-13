import React, { useState } from 'react'
import { Button, Modal, Form, Row, Col, InputGroup, Card, CardHeader, CardBody } from "react-bootstrap";
import CancelChargeModal from './CancelChargeModal';
const CancellationSettings = () => {
    const [cancelcharge, setCancelCharge] = useState(false)
  return (
    <>
       <Card className="p-2 ">
    
    <CardHeader className="d-flex p-1 justify-content-between align-items-center mb-2 bg-light">
      <span style={{ fontSize: "12px", fontWeight: "500" }}>
        API Based Flight & Hotel Cancellation Fee
      </span>

      <Button size="sm"
      onClick={()=>setCancelCharge(true)}
      variant="outline-danger">
        Add
      </Button>
    </CardHeader>
    { cancelcharge && ( <CancelChargeModal onClose={()=>setCancelCharge(false)}/> )}
<CardBody className='p-1'>
    <div className="table-responsive">
      <table
        className="table table-sm table-bordered mb-0 align-middle"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead>
          <tr style={{ fontSize: "10px" }}>
            <th>Supplier</th>
            <th>Service Type</th>
            <th>Market Type</th>
            <th>Source Type</th>
            <th>MarkUp Type</th>
            <th>Mark Up</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "11px" }}>
          <tr>
            <td className="text-center" colSpan={7}>
              No record Found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </CardBody>
  </Card>

  <Card className="p-2">
    
    <CardHeader className="mb-2 p-1 bg-light">
      <span style={{ fontSize: "12px", fontWeight: "500" }}>
        Self Uploaded Series Fare Cancellation Fee
      </span>
    </CardHeader>
<CardBody className='p-1'>
    <div
      className="d-flex align-items-center gap-2 border p-2"
      style={{ fontSize: "11px", background: "#fff" }}
    >
      <span>Before</span>

      <input
        type="text"
        className="form-control form-control-sm"
        style={{ width: "80px", fontSize: "10px" }}
      />

      <span>Days</span>

      <input
        type="text"
        className="form-control form-control-sm"
        style={{ width: "80px", fontSize: "10px" }}
      />

      <span>%</span>

      <input
        type="text"
        className="form-control form-control-sm"
        style={{ width: "80px", fontSize: "10px" }}
      />

      <span>+</span>

      <input
        type="text"
        className="form-control form-control-sm"
        style={{ width: "80px", fontSize: "10px" }}
      />

      {/* ADD BUTTON */}
      <Button
        size="sm"
        variant="outline-danger"
        className="ms-2 "
        style={{ fontWeight: "bold" }}
      >
        +
      </Button>
    </div>
    </CardBody>
  </Card>
    </>
  )
}

export default CancellationSettings
