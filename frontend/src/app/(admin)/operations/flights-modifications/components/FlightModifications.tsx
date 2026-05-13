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

const FlightModifications = () => {
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Modification Requested">
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                    <th style={{ width: "110px" }}>
                      Request Date <br /> Proposal ID
                    </th>

                    <th style={{ width: "110px" }}> Travel Date Time</th>

                    <th style={{ width: "110px" }}> Flight</th>

                    <th style={{ width: "110px" }}>Booking Id PNR No.</th>
                    <th style={{ width: "100px" }}>Source</th>

                    <th style={{ width: "110px" }}>From / To Dest.</th>

                    <th style={{ width: "110px" }} className="text-center">
                      My Cost Sale Price
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Earnings
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Type
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "260px" }} className="text-center">
                      Name / Mobile
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Booked By
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <div>10-May-26</div>
                      <div>2047945</div>
                    </td>
                    <td>
                      <div>19-Mar-26</div>
                      <div> 10:00 AM</div>
                    </td>
                    <td> Indigo</td>
                    <td>
                      <div> 2047945</div>
                    </td>
                    <td></td>
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
                      <span className="badge bg-warning">Requested</span>
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
                      <div>Mumbai</div>
                    </td>

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

                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Delete"
                          >
                            <Icon icon="mdi:minus-circle-outline" />
                          </Button>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Modification Completed">
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                    <th style={{ width: "110px" }}>
                      Request Date <br /> Proposal ID
                    </th>

                    <th style={{ width: "110px" }}> Travel Date Time</th>

                    <th style={{ width: "110px" }}> Flight</th>

                    <th style={{ width: "110px" }}>Booking Id PNR No.</th>
                    <th style={{ width: "100px" }}>Source</th>

                    <th style={{ width: "110px" }}>From / To Dest.</th>

                    <th style={{ width: "110px" }} className="text-center">
                      My Cost Sale Price
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Earnings
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Type
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "260px" }} className="text-center">
                      Name / Mobile
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Booked By
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <div>10-May-26</div>
                      <div>2047945</div>
                    </td>
                    <td>
                      <div>19-Mar-26</div>
                      <div> 10:00 AM</div>
                    </td>
                    <td> Indigo</td>
                    <td>
                      <div> 2047945</div>
                    </td>
                    <td></td>
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
                      <span className="badge bg-success">Completed</span>
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
                      <div>Mumbai</div>
                    </td>

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

                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Delete"
                          >
                            <Icon icon="mdi:minus-circle-outline" />
                          </Button>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="longer-tab" title="Cancellation Completed">
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                    <th style={{ width: "110px" }}>
                      Request Date <br /> Proposal ID
                    </th>

                    <th style={{ width: "110px" }}> Travel Date Time</th>

                    <th style={{ width: "110px" }}> Flight</th>

                    <th style={{ width: "110px" }}>Booking Id PNR No.</th>
                    <th style={{ width: "100px" }}>Source</th>

                    <th style={{ width: "110px" }}>From / To Dest.</th>

                    <th style={{ width: "110px" }} className="text-center">
                      My Cost Sale Price
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Earnings
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Type
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "260px" }} className="text-center">
                      Name / Mobile
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Booked By
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <div>10-May-26</div>
                      <div>2047945</div>
                    </td>
                    <td>
                      <div>19-Mar-26</div>
                      <div> 10:00 AM</div>
                    </td>
                    <td> Indigo</td>
                    <td>
                      <div> 2047945</div>
                    </td>
                    <td></td>
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
                      <span className="badge bg-danger">Cancelled</span>
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
                      <div>Mumbai</div>
                    </td>

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

                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Delete"
                          >
                            <Icon icon="mdi:minus-circle-outline" />
                          </Button>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>

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

export default FlightModifications;
