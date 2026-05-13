import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  CardHeader,
  CardBody,
  Row,
  Modal,
  Tab,
} from "react-bootstrap";
import { useRouter} from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
const Summary = () => {
  return (
    <>
      <Card className="mb-3">
  <CardHeader className="bg-secondary text-white p-2">
    <b>Summary</b>
  </CardHeader>

  <CardBody className="p-0">
    <div className="table-responsive">
      <table className="table table-sm table-bordered align-middle">
        <tbody style={{ fontSize: "12px" }}>
          <tr>
            <td><b>Old Cost</b></td>
            <td>INR 277,600.00</td>

            <td><b>Billed to Customer</b></td>
            <td>INR 281,600.00</td>

            <td><b>Original Profit</b></td>
            <td>INR 0.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </CardBody>
</Card>
    </>
  )
}

export default Summary
