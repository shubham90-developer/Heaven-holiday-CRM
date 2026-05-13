import React from "react";
import { Card, CardBody, Form } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const EmployeePerformance = () => {
  return (
    <Card className="shadow-sm border-0">
      <CardBody>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-semibold d-flex align-items-center gap-2">
            <IconifyIcon
              icon="solar:chart-square-bold-duotone"
              className="text-primary fs-20"
            />
            Employee Performance
          </h6>

          <Form.Select size="sm" style={{ width: "110px", fontSize: "10px" }}>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </Form.Select>
        </div>

        {/* Employee Select */}
        <div className="d-flex align-items-center gap-2 mb-2">
          <Form.Control
            type="text"
            value="RAJENDRA BUGADE"
            readOnly
            className="bg-light"
            style={{ fontSize: "10px", fontWeight: "bold" }}
          />
          <IconifyIcon
            icon="solar:refresh-bold-duotone"
            className="fs-20 text-muted"
          />
        </div>

        {/* Stats */}
        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Total Sales
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Queries In Process
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Proposal Sent
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <div className="d-flex justify-content-between mb-2 text-danger">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            {" "}
            Proposal Pending
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <div className="d-flex justify-content-between mb-2 text-danger">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Queries Lost
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <div className="d-flex justify-content-between mb-2 text-primary">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Verbal Won
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <div className="d-flex justify-content-between mb-3 text-success">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>Won</span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <hr style={{ borderColor: "#e6d9ff", borderWidth: "3px" }} />

        <div className="d-flex justify-content-between mb-2">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Leads In Process
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>

        <div className="d-flex justify-content-between mb-2 text-danger">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Leads Lost
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}> 0</span>
        </div>

        <div className="d-flex justify-content-between">
          <span style={{ fontSize: "12px", fontWeight: "600" }}>
            Leads Converted
          </span>
          <span style={{ fontSize: "12px", fontWeight: "600" }}>0</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default EmployeePerformance;
