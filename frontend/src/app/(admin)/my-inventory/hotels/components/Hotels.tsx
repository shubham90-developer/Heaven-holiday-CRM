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
import SupplierModal from "./AddModal";
import AddModal from "./AddModal";

const Hotels = () => {
  const router = useRouter();
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center  justify-content-end mb-2">
          <AddModal />
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "40px" }}>S.No.</th>
                <th style={{ width: "110px" }}> Hotel ID</th>

                <th style={{ width: "250px" }}>Hotel Name</th>

                <th style={{ width: "110px" }}> City</th>

                <th style={{ width: "110px" }}>Contact Email</th>
                <th style={{ width: "110px" }}>Contact Number</th>

                <th style={{ width: "110px" }}>Category</th>

                <th style={{ width: "110px" }} className="text-center">
                  Type
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Check in
                </th>
                <th style={{ width: "100px" }} className="text-center">
                  Check Out
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Supplier
                </th>

                <th style={{ width: "50px" }} className="text-center">
                  Currency
                </th>

                <th style={{ width: "50px" }} className="text-center">
                  DOW
                </th>
                <th style={{ width: "50px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>1</td>
                <td>766377</td>
                <td>Royal Park Resort Chandigarh</td>
                <td>Chandigarh</td>
                <td>--</td>
                <td>--</td>
                <td>NA Star</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

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

export default Hotels;
