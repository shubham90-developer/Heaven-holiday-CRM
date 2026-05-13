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

const FlightBookingQueue = () => {
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3">
          <Tab eventKey="home" title="Queue">
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                    <th style={{ width: "110px" }}>
                      Booking Date <br /> Proposal ID
                    </th>

                    <th style={{ width: "110px" }}> Travel Date Time</th>

                    <th style={{ width: "110px" }}> Flight</th>

                    <th style={{ width: "110px" }}>Booking Id PNR No.</th>
                    <th style={{ width: "100px" }}>
                      From / To Dest.
                      <br /> Source Type
                    </th>

                    <th style={{ width: "110px" }}>My Cost Sale Price</th>

                    <th style={{ width: "110px" }} className="text-center">
                      Earnings
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "260px" }} className="text-center">
                      Agency Details
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Booked By
                    </th>
                    <th style={{ width: "100px" }} className="text-center">
                      Owner
                    </th>

                    <th style={{ width: "50px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <div>03-Jan-24</div>
                      <div>QS/24/1002522/V1</div>
                    </td>
                    <td>
                      <div>27-Jan-24</div>
                      <div> 10:00 AM</div>
                    </td>
                    <td> FZ-442 flydubai</td>
                    <td>
                      <div> 56565656</div>
                      <div> Transaction ID: 80352</div>
                    </td>

                    <td>
                      <div> DEL → DXB </div>
                      <div> Agency test</div>
                    </td>
                    <td>
                      <div> INR 16,792.00</div>
                      <div> INR 17,092.00</div>
                    </td>
                    <td>
                      <div> INR 300.00</div>
                    </td>
                    <td> Confirmed - Full Payment</td>

                    <td>
                      <div className="fw-semibold">
                        <Icon icon="mdi:account" className="me-1" />
                        Prince l
                      </div>
                      <div className="fw-semibold">
                        <Icon icon="mdi:email" className="me-1" />
                        Prince@hellogtx.com
                      </div>

                      <div>
                        <Icon icon="mdi:phone" className="me-1" />
                        +91-8368874827
                      </div>
                    </td>
                    <td>RAJENDRA BUGADE</td>
                    <td>RAJENDRA BUGADE</td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Cancel"
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
          <Tab eventKey="profile" title="Hold">
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                    <th style={{ width: "110px" }}>
                      Booking Date <br /> Proposal ID
                    </th>

                    <th style={{ width: "110px" }}> Travel Date Time</th>

                    <th style={{ width: "110px" }}> Flight</th>

                    <th style={{ width: "110px" }}>Booking Id PNR No.</th>
                    <th style={{ width: "100px" }}>
                      From / To Dest.
                      <br /> Source Type
                    </th>

                    <th style={{ width: "110px" }}>My Cost Sale Price</th>

                    <th style={{ width: "110px" }} className="text-center">
                      Earnings
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "260px" }} className="text-center">
                      Agency Details
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Booked By
                    </th>
                    <th style={{ width: "100px" }} className="text-center">
                      Owner
                    </th>

                    <th style={{ width: "50px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <div>03-Jan-24</div>
                      <div>QS/24/1002522/V1</div>
                    </td>
                    <td>
                      <div>27-Jan-24</div>
                      <div> 10:00 AM</div>
                    </td>
                    <td> FZ-442 flydubai</td>
                    <td>
                      <div> 56565656</div>
                      <div> Transaction ID: 80352</div>
                    </td>

                    <td>
                      <div> DEL → DXB </div>
                      <div> Agency test</div>
                    </td>
                    <td>
                      <div> INR 16,792.00</div>
                      <div> INR 17,092.00</div>
                    </td>
                    <td>
                      <div> INR 300.00</div>
                    </td>
                    <td> Confirmed - Full Payment</td>

                    <td>
                      <div className="fw-semibold">
                        <Icon icon="mdi:account" className="me-1" />
                        Prince l
                      </div>
                      <div className="fw-semibold">
                        <Icon icon="mdi:email" className="me-1" />
                        Prince@hellogtx.com
                      </div>

                      <div>
                        <Icon icon="mdi:phone" className="me-1" />
                        +91-8368874827
                      </div>
                    </td>
                    <td>RAJENDRA BUGADE</td>
                    <td>RAJENDRA BUGADE</td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Cancel"
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
          <Tab eventKey="longer-tab" title="Hold Expired">
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                    <th style={{ width: "110px" }}>
                      Booking Date <br /> Proposal ID
                    </th>

                    <th style={{ width: "110px" }}> Travel Date Time</th>

                    <th style={{ width: "110px" }}> Flight</th>

                    <th style={{ width: "110px" }}>Booking Id PNR No.</th>
                    <th style={{ width: "100px" }}>
                      From / To Dest.
                      <br /> Source Type
                    </th>

                    <th style={{ width: "110px" }}>My Cost Sale Price</th>

                    <th style={{ width: "110px" }} className="text-center">
                      Earnings
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "260px" }} className="text-center">
                      Agency Details
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Booked By
                    </th>
                    <th style={{ width: "100px" }} className="text-center">
                      Owner
                    </th>

                    <th style={{ width: "50px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <div>03-Jan-24</div>
                      <div>QS/24/1002522/V1</div>
                    </td>
                    <td>
                      <div>27-Jan-24</div>
                      <div> 10:00 AM</div>
                    </td>
                    <td> FZ-442 flydubai</td>
                    <td>
                      <div> 56565656</div>
                      <div> Transaction ID: 80352</div>
                    </td>

                    <td>
                      <div> DEL → DXB </div>
                      <div> Agency test</div>
                    </td>
                    <td>
                      <div> INR 16,792.00</div>
                      <div> INR 17,092.00</div>
                    </td>
                    <td>
                      <div> INR 300.00</div>
                    </td>
                    <td> Confirmed - Full Payment</td>

                    <td>
                      <div className="fw-semibold">
                        <Icon icon="mdi:account" className="me-1" />
                        Prince l
                      </div>
                      <div className="fw-semibold">
                        <Icon icon="mdi:email" className="me-1" />
                        Prince@hellogtx.com
                      </div>

                      <div>
                        <Icon icon="mdi:phone" className="me-1" />
                        +91-8368874827
                      </div>
                    </td>
                    <td>RAJENDRA BUGADE</td>
                    <td>RAJENDRA BUGADE</td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "10px" }}
                            title="Cancel"
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

export default FlightBookingQueue;
