"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

const WipPackages = () => {
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
                <th style={{ width: "110px" }}>Sr No</th>

                <th style={{ width: "110px" }}> Travel Date</th>

                <th style={{ width: "110px" }}> Creation Date</th>

                <th style={{ width: "110px" }}>Query ID</th>
                <th style={{ width: "260px" }}>Name/Mobile</th>

                <th style={{ width: "110px" }}>From Destinations</th>

                <th style={{ width: "110px" }} className="text-center">
                  To Destinations
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  No of Days
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Created by
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>1</td>
                <td> 10-May-26</td>
                <td> 19-Mar-26</td>
                <td> 2047945</td>

                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    Dhanraj Walke
                  </div>

                  <div>
                    <Icon icon="mdi:email-outline" className="me-1" />
                    9822806085.aheaven@gmail.com
                  </div>
                  <div>
                    <Icon icon="mdi:phone" className="me-1" />
                    +91 9822806085
                  </div>
                </td>

                <td>
                  <div>Mumbai</div>
                </td>

                <td>Gangtok</td>

                <td> 7</td>

                <td> Pallavi Laskeshri</td>

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

export default WipPackages;
