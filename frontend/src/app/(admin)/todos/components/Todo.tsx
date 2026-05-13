"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import Filter from "./Filter";

const Todo = () => {
  const router = useRouter();
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
                <th style={{ width: "110px" }}>Stage Type</th>

                <th style={{ width: "110px" }}>Action</th>

                <th style={{ width: "110px" }}> Create Date</th>

                <th style={{ width: "110px" }}>Due Date</th>
                <th style={{ width: "110px" }}>Created by</th>

                <th style={{ width: "110px" }}>Assigned to</th>

                <th style={{ width: "110px" }} className="text-center">
                  Contact
                </th>
                <th style={{ width: "110px" }} className="text-center">
                  Status
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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

export default Todo;
