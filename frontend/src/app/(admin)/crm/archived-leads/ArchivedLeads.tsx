"use client";

import React, { useState } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";

const ArchivedLeads = () => {
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
                <th style={{ width: "260px" }}>Name / Mobile</th>

                <th style={{ width: "100px" }}>Date of Lead</th>

                <th style={{ width: "140px" }}>Source</th>

                <th style={{ width: "110px" }}> Owner</th>

                <th style={{ width: "90px" }}>Stage</th>

                <th style={{ width: "70px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    DIVYA
                  </div>

                  <div>
                    <Icon icon="mdi:phone" className="me-1" />
                    +91 8788898882
                  </div>
                  <div>
                    <Icon icon="mdi:email-outline" className="me-1" />
                    8788898882@gmail.com
                  </div>
                </td>

                <td>
                  <div>26-Feb-26</div>
                </td>
                <td>
                  <div>Old Customer</div>
                </td>

                <td> Sunita Pramod Naik</td>

                <td> Not Interested</td>

                <td>
                  <div className="d-flex flex-column gap-1">
                    <span className="action-btn view">
                      <Button
                        variant="success"
                        size="sm"
                        style={{ fontSize: "10px" }}
                        title="View"
                      >
                        <Icon icon="mdi:check" />
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

export default ArchivedLeads;
