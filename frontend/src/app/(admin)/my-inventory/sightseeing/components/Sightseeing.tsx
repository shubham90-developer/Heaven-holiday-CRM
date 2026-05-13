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
import ViewSightseeingModal from "./ViewSightseeingModal"
import { useRouter } from "next/navigation";
import Filter from "./Filter";

const Sightseeing = () => {
  const router = useRouter();
  const [viewsightseeing, setViewSightseeing]=useState(false)
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
            onClick={() => router.push("/my-inventory/sightseeing/add-sightseeing")}
          >
            <Icon icon="mdi:plus" className="me-1" /> Add Sightseeing
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
                     <th>Sightseeing Id</th>
  <th>Country</th>
  <th>City</th>
  <th>Sightseeing Name</th>
  <th>Sightseeing Type</th>
  <th>Duration</th>
  <th>Rates</th>
  <th>Action</th>
                  </tr>
                </thead>

                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                  
                    <td>188440</td>
  <td>Sri Lanka</td>
  <td>Nuwara Eliya</td>
  <td>ravana lake</td>
  <td>-</td>
  <td></td>
  <td>No</td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        <span className="action-btn delete">
                            <Button 
                            variant="success"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            onClick={()=>setViewSightseeing(true)}
                            title="View"
                            ><Icon icon="mdi:eye"/></Button>
                        </span>
                        <span className="action-btn delete">
                          <Button
                            variant="info"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Edit"
                                onClick={() => router.push("/my-inventory/sightseeing/edit-sightseeing")}
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
                              onClick={() => router.push("/my-inventory/sightseeing/my-rates/edit-sightseeing")}
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
                      { viewsightseeing && ( <ViewSightseeingModal onClose={()=>setViewSightseeing(false)} /> )}
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

export default Sightseeing;
