"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import AddCustomerModal from "./AddCustomerModal";

import { useRouter } from "next/navigation";

const B2BCustomers = () => {
  const router = useRouter();
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left Section */}

            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
              >
                <option> Select Users</option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
              </select>

              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Assign
              </Button>
            </div>

            {/* right side */}
            <div className="d-flex align-items-center gap-2">
              <AddCustomerModal />

              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                <Icon icon="mdi:file-export" />
              </Button>
            </div>
          </div>
          <Row className="align-items-center">
            {/* Right Section */}
            <Col lg={8}>
              <h6 className="fw-bold">
                Total Record Found :- <span className="text-primary">999</span>
              </h6>
            </Col>
            <Col lg={4}>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                style={{ fontSize: "10px" }}
              />
            </Col>
          </Row>
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "40px" }}>
                  <Form.Check type="checkbox" />
                </th>

                <th style={{ width: "100px" }}>Agency Id</th>

                <th style={{ width: "260px" }}>Agency Details</th>

                <th style={{ width: "140px" }}>Lead Source</th>

                <th style={{ width: "110px" }}>RM</th>
                <th style={{ width: "110px" }}>Last Updated</th>

                <th style={{ width: "90px" }}>Status</th>

                <th style={{ width: "70px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>
                  <Form.Check />
                </td>
                <td>211077</td>

                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:building" className="me-1" />
                    JAC AND TC (Corporate)
                  </div>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    Mr. PRAMOD JAGDALE
                  </div>

                  <div>
                    <Icon icon="mdi:phone" className="me-1" />
                    +91 9420543647
                  </div>
                  <div>
                    <Icon icon="mdi:email-outline" className="me-1" />
                    jacandtc@gmail.com
                  </div>
                </td>

                <td>
                  <div>Old Customer</div>
                </td>
                <td>
                  <div>Admin</div>
                </td>

                <td> 17-Mar-26</td>

                <td>
                  <span className="badge bg-success">Active</span>
                </td>

                <td>
                  <div className="d-flex flex-column gap-1">
                    <span className="action-btn view">
                      <Button
                        variant="success"
                        size="sm"
                        style={{ fontSize: "8px" }}
                        title="View"
                      >
                        <Icon icon="mdi:eye-outline" />
                      </Button>
                    </span>
                    <span>
                      <Button
                        variant="danger"
                        size="sm"
                        style={{ fontSize: "8px" }}
                        title="Deactivate"
                      >
                        <Icon icon="mdi:close" />
                      </Button>
                    </span>
                  </div>
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

export default B2BCustomers;
