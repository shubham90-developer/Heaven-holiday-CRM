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
import SupplierModal from "./SupplierModal";

const Packages = () => {
  const router = useRouter();
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center  justify-content-end">
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/packages/add-package")}
          >
            <Icon icon="mdi:plus" /> Add Readymade Package
          </Button>
        </div>
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="mb-3"
          variant="pills"
          style={{ fontSize: "10px" }}
        >
          <Tab eventKey="home" title="Delete">
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
                    <th style={{ width: "110px" }}>Pkg No.</th>

                    <th style={{ width: "250px" }}>Package Name</th>

                    <th style={{ width: "110px" }}> Cities</th>

                    <th style={{ width: "110px" }}>Supplier Name</th>
                    <th style={{ width: "250px" }}>Created By</th>

                    <th style={{ width: "110px" }}>Days</th>

                    <th style={{ width: "110px" }} className="text-center">
                      Type
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Price PP
                    </th>
                    <th style={{ width: "100px" }} className="text-center">
                      Expiry Date
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>

                    <th style={{ width: "50px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <Form.Check />
                    </td>
                    <td>113893</td>
                    <td>FD - Itinerary - Goa</td>
                    <td>Goa</td>
                    <td>
                      <SupplierModal />
                    </td>
                    <td>
                      <div> RAJENDRA BUGADE</div>
                    </td>
                    <td>
                      <div>2N/3D</div>
                    </td>
                    <td> Deluxe</td>
                    <td>
                      <div> INR 7297</div>
                    </td>

                    <td>
                      <div> 31-Dec-26</div>
                    </td>
                    <td>
                      <div>Published</div>
                    </td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                          <Button
                            variant="info"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Edit"
                          >
                            <Icon icon="mdi:pencil" />
                          </Button>
                        </span>
                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Delete"
                          >
                            <Icon icon="mdi:trash-can-outline" />
                          </Button>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Normal">
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
                    <th style={{ width: "110px" }}>Pkg No.</th>

                    <th style={{ width: "250px" }}>Package Name</th>

                    <th style={{ width: "110px" }}> Cities</th>

                    <th style={{ width: "110px" }}>Supplier Name</th>
                    <th style={{ width: "250px" }}>Created By</th>

                    <th style={{ width: "110px" }}>Days</th>

                    <th style={{ width: "110px" }} className="text-center">
                      Type
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Price PP
                    </th>
                    <th style={{ width: "100px" }} className="text-center">
                      Expiry Date
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>

                    <th style={{ width: "50px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <Form.Check />
                    </td>
                    <td>113893</td>
                    <td>FD - Itinerary - Goa</td>
                    <td>Goa</td>
                    <td>
                      <SupplierModal />
                    </td>
                    <td>
                      <div> RAJENDRA BUGADE</div>
                    </td>
                    <td>
                      <div>2N/3D</div>
                    </td>
                    <td> Deluxe</td>
                    <td>
                      <div> INR 7297</div>
                    </td>

                    <td>
                      <div> 31-Dec-26</div>
                    </td>
                    <td>
                      <div>Published</div>
                    </td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                          <Button
                            variant="info"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Edit"
                          >
                            <Icon icon="mdi:pencil" />
                          </Button>
                        </span>
                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Delete"
                          >
                            <Icon icon="mdi:trash-can-outline" />
                          </Button>
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab>
          <Tab eventKey="longer-tab" title=" Expired">
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
                    <th style={{ width: "110px" }}>Pkg No.</th>

                    <th style={{ width: "250px" }}>Package Name</th>

                    <th style={{ width: "110px" }}> Cities</th>

                    <th style={{ width: "110px" }}>Supplier Name</th>
                    <th style={{ width: "250px" }}>Created By</th>

                    <th style={{ width: "110px" }}>Days</th>

                    <th style={{ width: "110px" }} className="text-center">
                      Type
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Price PP
                    </th>
                    <th style={{ width: "100px" }} className="text-center">
                      Expiry Date
                    </th>
                    <th style={{ width: "110px" }} className="text-center">
                      Status
                    </th>

                    <th style={{ width: "50px" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>
                      <Form.Check />
                    </td>
                    <td>113893</td>
                    <td>FD - Itinerary - Goa</td>
                    <td>Goa</td>
                    <td>
                      <SupplierModal />
                    </td>
                    <td>
                      <div> RAJENDRA BUGADE</div>
                    </td>
                    <td>
                      <div>2N/3D</div>
                    </td>
                    <td> Deluxe</td>
                    <td>
                      <div> INR 7297</div>
                    </td>

                    <td>
                      <div> 31-Dec-26</div>
                    </td>
                    <td>
                      <div>Published</div>
                    </td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                          <Button
                            variant="info"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Edit"
                          >
                            <Icon icon="mdi:pencil" />
                          </Button>
                        </span>
                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Delete"
                          >
                            <Icon icon="mdi:trash-can-outline" />
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

export default Packages;
