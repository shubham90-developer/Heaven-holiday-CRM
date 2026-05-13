"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Modal, Dropdown } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

const SupplierPackage = () => {
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "150px" }}>Query Date</th>

                <th style={{ width: "260px" }}> Name/Mobile</th>

                <th style={{ width: "80px" }}> Type</th>

                <th style={{ width: "110px" }}>Description</th>
                <th style={{ width: "100px" }}>Travel Date </th>

                <th style={{ width: "110px" }}> Destinations</th>

                <th style={{ width: "110px" }} className="text-center">
                  Query Status
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Query Date/ Age
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Supplier Agency
                </th>
                <th style={{ width: "260px" }} className="text-center">
                  Name/Mobile
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Proposal Shared
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Enquiry Status
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>
                  <div>28-Nov-25</div>
                  <div>3 Month 20 Days</div>
                  <div>QId: 1936079</div>
                </td>

                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    Prince l
                  </div>

                  <div>
                    <Icon icon="mdi:email-outline" className="me-1" />
                    Prince@hellogtx.com
                  </div>
                  <div>
                    <Icon icon="mdi:phone" className="me-1" />
                    8368874827
                  </div>
                </td>

                <td>B2C</td>
                <td> Package</td>
                <td> 27-Dec-25 </td>
                <td> Dubai </td>
                <td> Query Created </td>

                <td>
                  <div>28-Nov-25</div>
                  <div>3 Month 20 Days</div>
                </td>

                <td> Just Travel</td>

                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    PRANAV KADAM
                  </div>

                  <div>
                    <Icon icon="mdi:email-outline" className="me-1" />
                    kadampranav9600@gmail.com
                  </div>
                  <div>
                    <Icon icon="mdi:phone" className="me-1" />
                    9511708020
                  </div>
                </td>

                <td> No</td>

                <td> NA</td>

                <td>
                  <Form.Select
                    size="sm"
                    aria-label="Default select example"
                    style={{ fontSize: "10px" }}
                  >
                    <option>Select</option>
                    <option value="1">View Mail</option>
                    <option value="2">Resend Query</option>
                    <option value="3">Send Proposal</option>
                    <option value="4">Discard query</option>
                  </Form.Select>
                </td>
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

export default SupplierPackage;
