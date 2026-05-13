"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "react-bootstrap";
import AddContactModal from "./AddContactModal";
import AddBankModal from "./AddBankModule";

const currencies = [
  { code: "INR", label: "Indian Rupee (INR)" },
  { code: "USD", label: "US Dollar (USD)" },
  { code: "EUR", label: "Euro (EUR)" },
  { code: "GBP", label: "British Pound (GBP)" },
  { code: "AED", label: "UAE Dirham (AED)" },
  { code: "AUD", label: "Australian Dollar (AUD)" },
  { code: "CAD", label: "Canadian Dollar (CAD)" },
  { code: "SGD", label: "Singapore Dollar (SGD)" },
  { code: "JPY", label: "Japanese Yen (JPY)" },
  { code: "CNY", label: "Chinese Yuan (CNY)" },
];

const AddSupplier = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <Card>
        <CardHeader>
          {" "}
          {/* STEP TABS */}
          <div className="d-flex gap-2 mb-0">
            {[1, 2, 3].map((item) => (
              <Button
                key={item}
                size="sm"
                onClick={() => setStep(item)}
                style={{
                  fontSize: "10px",
                  background: step === item ? "#0d6efd" : "#fff",
                  color: step === item ? "#fff" : "#000",
                  border: "1px solid #0d6efd",
                }}
              >
                {item === 1 && "1 Overview"}
                {item === 2 && "2 Contacts"}
                {item === 3 && "3 Bank"}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardBody>
          <div>
            {/* BODY */}
            <div>
              {/* ================= STEP 1 ================= */}
              {step === 1 && (
                <Form>
                  {/* Company + Currency + GST + PAN */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Company Name *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Currency Type *
                      </Form.Label>

                      <Form.Select size="sm" style={{ fontSize: "12px" }}>
                        <option value="">Select</option>

                        {currencies.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={3} className="">
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="me-2 mt-3 text-primary"
                      >
                        GST Register :
                      </Form.Label>
                      <div className="d-flex align-items-center">
                        <Form.Check
                          type="radio"
                          label="Yes"
                          name="gst"
                          className="me-2"
                          style={{ fontSize: "12px" }}
                        />
                        <Form.Check
                          type="radio"
                          label="No"
                          name="gst"
                          defaultChecked
                          style={{ fontSize: "12px" }}
                        />
                      </div>
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        PAN Number
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>
                  </Row>

                  {/* Name Section */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Salutation
                      </Form.Label>
                      <Form.Select size="sm" style={{ fontSize: "12px" }}>
                        <option>Select</option>
                        <option>Mr.</option>
                        <option>Ms.</option>
                        <option>Mrs.</option>
                        <option>Miss</option>
                        <option>Dr.</option>
                      </Form.Select>
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        First Name *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Last Name
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Designation
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>
                  </Row>

                  {/* Email + Mobile + Address */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Email *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Mobile Number *
                      </Form.Label>
                      <div className="d-flex gap-1">
                        <Form.Control
                          value="+91"
                          readOnly
                          size="sm"
                          style={{ width: "30%", fontSize: "12px" }}
                        />
                        <Form.Control size="sm" style={{ fontSize: "12px" }} />
                      </div>
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Address Line 1
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Address Line 2
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>
                  </Row>

                  {/* Location */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Country *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        State
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        City *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Other Location : City
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>
                  </Row>

                  {/* Category + Services + Comments */}
                  <Row className="mb-2">
                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Category *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Services *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>

                    <Col md={6}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Comments
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        style={{ fontSize: "12px" }}
                      />
                    </Col>
                  </Row>

                  {/* Destination Offered */}
                  <hr />

                  <h6 style={{ fontSize: "12px" }}>Destination Offered</h6>

                  <Row>
                    <Col md={4}>
                      <Form.Label
                        style={{ fontSize: "10px" }}
                        className="text-primary"
                      >
                        Expertise In (Geography) : Destinations *
                      </Form.Label>
                      <Form.Control size="sm" style={{ fontSize: "12px" }} />
                    </Col>
                  </Row>
                </Form>
              )}

              {/* ================= STEP 2 ================= */}
              {step === 2 && (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <h6>Supplier Contacts</h6>
                    <AddContactModal />
                  </div>

                  <table className="table table-bordered table-sm">
                    <thead style={{ fontSize: "12px" }}>
                      <tr>
                        <th>Contact Person</th>
                        <th>Designation</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                      <tr>
                        <td>Mr. Prince K</td>
                        <td>Manager</td>
                        <td>example@gmail.com</td>
                        <td>0000000000</td>
                        <td>
                          <Button
                            variant="success"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="View"
                          >
                            <Icon icon="mdi:eye-outline" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}

              {/* ================= STEP 3 ================= */}
              {step === 3 && (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <h6>Supplier Bank</h6>
                    <AddBankModal />
                  </div>

                  <table className="table table-bordered table-sm">
                    <thead style={{ fontSize: "10px" }}>
                      <tr>
                        <th>Account Name</th>
                        <th>Account Number</th>
                        <th>Bank Name</th>
                        <th>IFSC Code</th>
                        <th>Primary</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "10px" }}>
                      <tr>
                        <td colSpan={6} className="text-center">
                          No records found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </CardBody>
        <CardFooter>
          {/* FOOTER */}
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              style={{ fontSize: "10px" }}
            >
              Cancel
            </Button>

            <div>
              {step > 1 && (
                <Button
                  size="sm"
                  className="me-2"
                  onClick={() => setStep(step - 1)}
                  style={{ fontSize: "10px" }}
                >
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button
                  size="sm"
                  onClick={() => setStep(step + 1)}
                  style={{ fontSize: "10px" }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="success"
                  style={{ fontSize: "10px" }}
                >
                  Finish
                </Button>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddSupplier;
