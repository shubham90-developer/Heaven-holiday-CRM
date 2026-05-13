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

import React from 'react'

const CashFlow = () => {
  return (
    <>
      <Card className="mb-3">
  <CardHeader className="bg-secondary text-white p-2">
    <b>Cash Flow</b>
  </CardHeader>

  <CardBody className="p-0">
    <div className="table-responsive">
      <table className="table table-sm table-bordered align-middle">
        <thead className="table-light">
          <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
            <th>Cash In</th>
            <th>Cash Out</th>
            <th>Net Balance</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "12px" }}>
          <tr>
            <td>INR 281,600</td>
            <td>INR 0</td>
            <td className="text-success">INR 281,600</td>
          </tr>
        </tbody>
      </table>
    </div>
  </CardBody>
</Card>
    </>
  )
}

export default CashFlow
