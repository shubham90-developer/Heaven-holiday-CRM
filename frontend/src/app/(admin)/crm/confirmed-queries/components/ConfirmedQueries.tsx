"use client";

import React, { useState } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";

const ConfirmedQueries = () => {
  return (
    <>
      <Card className="p-3">
        <div className="mb-4">
          <Row className="align-items-center">
            {/* Right Section */}
            <Col lg={4}>
              <h6 className="fw-bold">
                Total Record Found :- <span className="text-primary">999</span>
              </h6>
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

                <th style={{ width: "130px" }}>Query Date</th>

                <th style={{ width: "260px" }}>Customer Details</th>

                <th style={{ width: "140px" }}>Pax/ Type</th>

                <th style={{ width: "110px" }}>Description</th>

                <th style={{ width: "90px" }}>Travel Date</th>

                <th style={{ width: "100px" }}>Destinations</th>

                <th style={{ width: "150px" }}> Proposal</th>

                <th style={{ width: "120px" }}>Lead Stage</th>

                <th style={{ width: "120px" }}>Last Updated</th>

                <th style={{ width: "140px" }}>Owner</th>

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

                <td>
                  <div>17-Mar-26</div>
                  <div>10H 48M</div>
                  <div>Q/26/2047192</div>
                </td>

                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:building" className="me-1" />
                    JAC AND TC
                  </div>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    Mr. PRAMOD JAGDALE(1)
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
                  <div>10 Adult(s)</div>
                  <div>
                    <span className="badge bg-success">B2C</span>
                  </div>
                </td>
                <td>
                  <div>Package</div>
                  <div>Old Customer</div>
                </td>

                <td>12-May-26</td>

                <td>Mumbai-Thailand, Pattaya, Bangkok</td>
                <td></td>

                <td>confirmed</td>

                <td>17-Mar-26</td>

                <td>RAJENDRA BUGADE</td>

                <td>
                  <div className="d-flex flex-column gap-1">
                    <span className="action-btn view">
                      <Button
                        variant="success"
                        size="sm"
                        style={{ fontSize: "10px" }}
                        title="View"
                      >
                        <Icon icon="mdi:eye-outline" />
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

      {/* message modal */}
    </>
  );
};

export default ConfirmedQueries;
