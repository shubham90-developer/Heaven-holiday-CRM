"use client";
import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";
import Filter from "./Filter";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
const TransportRates = () => {
  const router = useRouter();
  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-2">
        <div className="text-end mb-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              router.push("/my-inventory/transport-rates/add-route")
            }
            style={{ fontSize: "10px" }}
          >
            <Icon icon="mdi:plus" className="me-1" />
            Add Transports Route
          </Button>
        </div>

        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th>S.No</th>
                <th>Route Name</th>
                <th>Start City</th>
                <th>Destination City</th>
                <th>End City</th>
                <th>Transport Type</th>
                <th>Transport Category</th>
                <th>No. Of Days</th>
                <th>DOW</th>
                <th>Cities Covered</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={11}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default TransportRates;
