"use client";

import React, { useState } from "react";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import SendMessageModal from "./SendMessageModal";
import FollowupModal from "./FollowupModal";
import B2CLeadModal from "./B2CLeadModal";
import B2BLeadModal from "./B2BLeadModal";
import { useRouter } from "next/navigation";

const Leads = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("+91 8421135320");

  const handleSave = () => {
    setIsEditing(false);
    // 👉 call API here if needed
  };
  return (
    <>
      {/* filter */}
      <div className="mb-2">
        <Filter />
      </div>
      <Card className="p-3">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left Section */}

            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select form-select-sm w-auto"
                style={{ fontSize: "10px" }}
              >
                <option>Select Users</option>
                <option value="1">User 1</option>
                <option value="2">User 2</option>
                <option value="3">User 3</option>
              </select>

              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Assign
              </Button>

              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                Archive
              </Button>
            </div>

            {/* right side */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() => router.push("/crm/leads/lead-bulk-upload")}
              >
                <Icon icon="mdi:upload" className="me-1" />
                B2C
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() => router.push("/crm/leads/lead-b2b-bulk-upload")}
              >
                <Icon icon="mdi:upload" className="me-1" />
                B2B
              </Button>

              <B2CLeadModal />
              <B2BLeadModal />

              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                <Icon icon="mdi:refresh" />
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                <Icon icon="mdi:file-export" />
              </Button>
            </div>
          </div>
          <Row className="align-items-center">
            {/* Left Section */}
            <Col lg={8}>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  In Process
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  Callback Leads
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  Overall Leads
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  style={{ fontSize: "10px", fontWeight: "600" }}
                >
                  Un-Assigned
                </Button>
              </div>
            </Col>

            {/* Right Section */}
            <Col lg={4}>
              <h6 className="fw-bold">
                Total Record Found :- <span className="text-primary">999</span>
              </h6>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                style={{ fontSize: "10px" }}
              />
            </Col>
          </Row>
        </div>
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

                <th style={{ width: "130px" }}>Lead Date</th>

                <th style={{ width: "260px" }}>Customer Details</th>

                <th style={{ width: "140px" }}>Type / Source</th>

                <th style={{ width: "110px" }}>Travel Date</th>

                <th style={{ width: "90px" }}>No. of Pax</th>

                <th style={{ width: "100px" }}>No. of Days</th>

                <th style={{ width: "150px" }}>Destinations</th>

                <th style={{ width: "120px" }}>Lead Stage</th>

                <th style={{ width: "160px" }}>Remark</th>

                <th style={{ width: "120px" }}>Last Updated</th>

                <th style={{ width: "140px" }}>Owner</th>

                <th style={{ width: "70px" }} className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              <tr>
                <td>
                  <Form.Check />
                </td>

                <td>
                  <div>13-Mar-26 18:08</div>
                  <div>3 Days</div>
                  <div>2895822</div>
                </td>

                <td>
                  <div className="fw-semibold">
                    <Icon icon="mdi:account" className="me-1" />
                    Jayashri Kadam Pune
                  </div>

                  <div className="d-flex align-items-center gap-1">
                    <div className="d-flex align-items-center gap-2">
                      <Icon icon="mdi:phone" />

                      {isEditing ? (
                        <input
                          type="text"
                          value={phone}
                          autoFocus
                          onChange={(e) => setPhone(e.target.value)}
                          onBlur={handleSave}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                          }}
                          className="form-control form-control-sm"
                          style={{ width: "150px", fontSize: "12px" }}
                        />
                      ) : (
                        <>
                          <span>{phone}</span>
                          <Icon
                            icon="mdi:pencil"
                            style={{
                              cursor: "pointer",
                              border: "1px dotted #000",
                              padding: "1px",
                              background: "#36b7f1",
                              color: "#fff",
                              borderRadius: "50%",
                            }}
                            onClick={() => setIsEditing(true)}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <Icon icon="mdi:email-outline" className="me-1" />
                    8421135320.aheaven@gmail.com
                  </div>
                </td>

                <td>
                  <div>Package</div>
                  <div>
                    <span className="badge bg-success">B2C</span>
                  </div>
                  <div>raj sir facebook</div>
                </td>

                <td>NA</td>

                <td>NA</td>

                <td></td>

                <td>NA</td>

                <td>
                  <div className="mb-1">Call Back</div>
                  <FollowupModal />
                </td>
                <td>NA</td>
                <td>13-Mar-26</td>

                <td>
                  Pallavi <br />
                  Laskeshri
                </td>

                <td>
                  <div className="d-flex flex-column gap-1">
                    <span className="action-btn view">
                      <Button
                        variant="success"
                        size="sm"
                        style={{ fontSize: "10px" }}
                        title="View"
                       onClick={() => router.push("/crm/leads/view-leads")}
                      >
                        <Icon icon="mdi:eye-outline" />
                      </Button>
                    </span>

                    <span className="action-btn chat">
                      <SendMessageModal />
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

      {/* message modal */}
    </>
  );
};

export default Leads;
