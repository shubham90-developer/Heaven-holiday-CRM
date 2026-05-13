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
import ViewSightseeingModal from "./ViewSightseeingModal";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

const MyRate = () => {
  const router = useRouter();
  const [viewsightseeingmodal, setViewSightseeingModal]=useState(false)
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center mb-3 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Sightseeing
          </Button>

         <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/my-rates")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Rates
          </Button>

           <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/my-rates/add-rate")}
          >
            <Icon icon="mdi:plus" /> Add Rates
          </Button>
        </div>
       
            <div className="table-responsive">
              <table
                className="table table-sm table-bordered mb-0 align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead>
                  <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
      <th>Sightseeing ID</th>
  <th>City (Country)</th>
  <th>Sightseeing Name</th>
  <th>Sightseeing Type</th>
  <th>From Date</th>
  <th>To Date</th>
  <th>Duration</th>
  <th>Supplier Name</th>
  <th>Booking Type</th>
  <th>DOW</th>
  <th>Action</th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                  
                  <td>2226</td>
  <td>Paris (France)</td>
  <td>Disneyland Paris</td>
  <td></td>
  <td>10-May-23</td>
  <td>30-May-23</td>
  <td>0</td>
  <td>A Heaven Hospitality pvt ltd</td>
  <td>On Request</td>
  <td><Form.Check type="checkbox" /></td>
                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                            <Button 
                            variant="success"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            onClick={()=>setViewSightseeingModal(true)}
                            title="View"
                            ><Icon icon="mdi:eye"/></Button>
                        </span>
                        <span className="action-btn delete">
                          <Button
                            variant="info"
                            size="sm"
                            onClick={()=>router.push("/my-inventory/sightseeing/my-rates/edit-sightseeing")}
                            style={{ fontSize: "8px" }}
                            title="Edit"
                          >
                            <Icon icon="mdi:pencil" />
                          </Button>
                        </span>
                        <span className="action-btn delete">
                          <Button
                            variant="primary"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Update Rate"
                          >
                            <Icon icon="mdi:update" />
                          </Button>
                        </span>

                        <span className="action-btn delete">
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Deactive"
                          >
                            <Icon icon="mdi:close-circle-outline" />
                          </Button>
                        </span>
                      </div>
                      { viewsightseeingmodal && ( <ViewSightseeingModal onClose={()=>setViewSightseeingModal(false)} /> )}
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

export default MyRate;
