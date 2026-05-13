import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";

const LeadB2BBulkUpload = () => {
  return (
    <>
      <Card className="p-3">
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center mb-0 border-bottom pb-2">
            {/* Left Section */}
            <div className="d-flex align-items-center gap-2">
              <h6>Bulk Upload(B2B Lead)</h6>
            </div>
            {/* right side */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                <Icon icon="mdi:cloud-download" className="me-1" /> Download
                Template
              </Button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "130px" }}>
                  <Form.Control
                    type="text"
                    placeholder="campaign name"
                    style={{ fontSize: "10px" }}
                  />
                </th>

                <th style={{ width: "260px" }}>
                  {" "}
                  <Form.Control
                    type="file"
                    placeholder="name@example.com"
                    style={{ fontSize: "10px" }}
                  />
                </th>

                <th style={{ width: "140px" }}>
                  {" "}
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ fontSize: "10px", fontWeight: "600" }}
                  >
                    Upload <Icon icon="mdi:download" className="ms-1" />
                  </Button>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </Card>

      <Card className="p-3">
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center mb-0 border-bottom pb-2">
            {/* Left Section */}
            <div className="d-flex align-items-center gap-2">
              <h6>Bulk Upload(B2B Lead)</h6>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead
              style={{
                fontSize: "10px",
                whiteSpace: "nowrap",
                background: "#274c6b",
                color: "#fff",
              }}
            >
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "130px", color: "#fff" }}>
                  Lead Source Id
                </th>

                <th style={{ width: "130px", color: "#fff" }}>Lead Source</th>
              </tr>
            </thead>
            <tbody
              style={{
                fontSize: "10px",
              }}
            >
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
              <tr>
                <td>4513</td>
                <td>Agency</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default LeadB2BBulkUpload;
