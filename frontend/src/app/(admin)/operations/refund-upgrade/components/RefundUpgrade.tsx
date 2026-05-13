"use client";

import React, { useState } from "react";
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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

const RefundUpgrade = () => {
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <div className="d-flex justify-content-end mb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
          >
            <Icon icon="mdi:file-export" />
          </Button>
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "50px" }}>Sr No</th>

                <th style={{ width: "110px" }}>Date</th>

                <th style={{ width: "110px" }}> Ref. No</th>

                <th style={{ width: "260px" }}>Customer Details</th>
                <th style={{ width: "100px" }}> Travel Date</th>

                <th style={{ width: "110px" }}>No of Pax (A+K)</th>

                <th style={{ width: "110px" }} className="text-center">
                  Destination
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Policy Amount
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Premium Amount
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Mode of Payment
                </th>
                <th style={{ width: "100px" }} className="text-center">
                  SP fee
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Policy Submitted
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>
                  <div>1</div>
                </td>
                <td>
                  <div>19-Mar-26</div>
                  <div> 10:00 AM</div>
                </td>

                <td>
                  <div> 2047945</div>
                </td>
                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    Dhanraj Walke
                  </div>

                  <div>
                    <Icon icon="mdi:phone" className="me-1" />
                    +91 9822806085
                  </div>
                </td>
                <td>
                  <div>19-Mar-26</div>
                  <div> 10:00 AM</div>
                </td>
                <td>
                  <div> 2</div>
                </td>
                <td>
                  <div> Delhi</div>
                  <div> Mumbai</div>
                </td>
                <td>
                  <div> Rs. 3,000/-</div>
                </td>
                <td>
                  <div> Rs. 1,000/-</div>
                </td>
                <td> Direct</td>

                <td>
                  <div> Rs. 1,000/-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "600" }}
          >
            Load More <Icon icon="mdi:reload" className="ms-1" />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default RefundUpgrade;
