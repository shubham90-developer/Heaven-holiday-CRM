"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Button, Form, Row, Col, Card, Table } from "react-bootstrap";

const tabs: string[] = [
  "Create Package",
  "Itinerary",
  "Optional",
  "T & C",
  "Cost Sheet",
  "Manage Inventory",
  "Contributors History",
];

const Addpackage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="p-2">
      {/* Tabs */}
      <div className="d-flex gap-2 flex-wrap mb-3">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            size="sm"
            variant={activeTab === index ? "primary" : "outline-primary"}
            onClick={() => setActiveTab(index)}
          >
            {index + 1} {tab}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="">
        {/* 1. CREATE PACKAGE */}
        {activeTab === 0 && <CreatePackage />}

        {/* 2. ITINERARY */}
        {activeTab === 1 && <Itinerary />}

        {/* 3. OPTIONAL */}
        {activeTab === 2 && <Optional />}

        {/* 4. T&C */}
        {activeTab === 3 && <Terms />}

        {/* 5. COST SHEET */}
        {activeTab === 4 && <CostSheet />}

        {/* 6. INVENTORY */}
        {activeTab === 5 && <Inventory />}

        {/* 7. HISTORY */}
        {activeTab === 6 && <History />}
      </div>
    </div>
  );
};

export default Addpackage;

// ================= COMPONENTS =================

// ✅ CREATE PACKAGE
const CreatePackage: React.FC = () => {
  return (
    <>
      <Card className="p-3">
        <Form>
          {/* Package Options */}
          <div className="d-flex align-items-center flex-wrap gap-3 mb-3">
            <Form.Check
              type="radio"
              name="packageMode"
              label="Readymade Package"
              defaultChecked
              className="fw-medium"
            />

            <Form.Check type="checkbox" label="Fixed Departure" />
            <Form.Check type="checkbox" label="Bus Route Package" />
            <Form.Check type="checkbox" label="Common Flight" />
            <Form.Check type="checkbox" label="Cruise" />
            <Form.Check type="checkbox" label="Event" />
          </div>

          {/* Package Type */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="text-dark small fw-medium">Package Type</span>

            <Form.Check
              type="radio"
              name="packageType"
              label="Domestic"
              defaultChecked
            />
            <Form.Check type="radio" name="packageType" label="Inbound" />
            <Form.Check type="radio" name="packageType" label="International" />
          </div>
          <Row className="g-3">
            {/* Row 1 */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Package Name
                </Form.Label>
                <Form.Control size="sm" placeholder="Enter package name" />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Starting From
                </Form.Label>
                <Form.Control size="sm" placeholder="City" />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label className="text-primary small">End City</Form.Label>
                <Form.Control size="sm" placeholder="City" />
              </Form.Group>
            </Col>

            {/* Row 2 */}

            <Col md={4}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Destination Covered ?
                </Form.Label>
                <Form.Control size="sm" placeholder="Destination" />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="text-primary small">Supplier</Form.Label>
                <Form.Control size="sm" placeholder="Supplier name" />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Package Category
                </Form.Label>
                <div className="d-flex flex-wrap gap-3 pt-1">
                  <Form.Check type="checkbox" label="Budget" />
                  <Form.Check type="checkbox" label="Standard" />
                  <Form.Check type="checkbox" label="Deluxe" />
                  <Form.Check type="checkbox" label="Luxury" />
                  <Form.Check type="checkbox" label="Premium" />
                </div>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Package Theme
                </Form.Label>
                <Form.Select size="sm">
                  <option>Honeymoon</option>
                  <option>Adventure</option>
                  <option>Wildlife</option>
                  <option>Beach</option>
                  <option>Family</option>
                  <option>Sports</option>
                  <option>Cruise</option>
                  <option>Religions</option>
                  <option>Hill Station</option>
                  <option>Heritage</option>
                  <option>Culture</option>
                  <option>Weekend</option>
                  <option>New Year</option>
                  <option>Festivals & Events</option>
                  <option>Romantic</option>
                  <option>Shopping & Nightlife</option>
                  <option>Offbeat</option>
                  <option>Offbeat</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Package Inclusive
                </Form.Label>
                <Form.Select size="sm">
                  <option>Flight</option>
                  <option>Hotel</option>
                  <option>Transfer</option>
                  <option>Visa</option>
                  <option>Guide</option>
                  <option>Meals</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Package Specification
                </Form.Label>
                <Form.Select size="sm">
                  <option>Daily Itinerary Based</option>
                  <option>Only Hotel</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Upload Image (Recommend size W:800px & H:600px)
                </Form.Label>
                <Form.Control
                  size="sm"
                  placeholder="Supplier name"
                  type="file"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-primary small">
                  Youtube Url
                </Form.Label>
                <Form.Control
                  size="sm"
                  placeholder="  Youtube Url"
                  type="url"
                />
              </Form.Group>
            </Col>

            {/* Row 3 */}
            <Col md={12}>
              <Form.Group>
                <Form.Label className="text-primary small">Overview</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write overview..."
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button size="sm" variant="outline-danger" className="me-2 px-3">
              Cancel
            </Button>
            <Button size="sm" variant="warning" className="px-3">
              Save & Next
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

// ✅ ITINERARY
const Itinerary: React.FC = () => {
  return (
    <div>
      <h6>Add Cities, Nights & Itinerary</h6>

      <Row className="g-2 mt-2">
        <Col md={6}>
          <Form.Control size="sm" placeholder="Add Hotel City" />
        </Col>

        <Col md={4}>
          <Form.Control size="sm" placeholder="No. of Nights" />
        </Col>

        <Col md={2}>
          <Button size="sm" variant="danger">
            + Add City
          </Button>
        </Col>
      </Row>

      <div className="mt-3">
        <div className="border p-2 mb-2">
          Day 1 - Update Itinerary & Accommodation
        </div>
        <div className="border p-2 mb-2">
          Day 2 - Update Itinerary & Accommodation
        </div>
      </div>
    </div>
  );
};

// ✅ OPTIONAL
const Optional: React.FC = () => {
  return (
    <div>
      <h6>Addon Items</h6>
      <div className="border p-2">No Records Found</div>

      <h6 className="mt-3">Visa</h6>
      <div className="border p-2">No Records Found</div>

      <div className="text-end mt-3">
        <Button size="sm" variant="outline-danger" className="me-2">
          View Listing
        </Button>
        <Button size="sm" variant="success">
          Save & Next
        </Button>
      </div>
    </div>
  );
};

// ✅ TERMS & CONDITIONS
const Terms: React.FC = () => {
  return (
    <Card className="p-3">
      {/* Package Type */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="text-dark small fw-medium">T&C Type</span>

        <Form.Check
          type="radio"
          name="packageType"
          label="Domestic"
          defaultChecked
        />

        <Form.Check type="radio" name="packageType" label="International" />
      </div>
      <h6>Inclusions (International)</h6>
      <Form.Control as="textarea" rows={5} />

      <h6 className="mt-3">Exclusions (International)</h6>
      <Form.Control as="textarea" rows={5} />

      <h6 className="mt-3">Term & Conditions (International)</h6>
      <Form.Control as="textarea" rows={5} />

      <h6 className="mt-3">Cancellation Policy (International)</h6>
      <Form.Control as="textarea" rows={5} />

      <h6 className="mt-3">Travel Basics</h6>
      <Form.Control as="textarea" rows={5} />

      <h6 className="mt-3">Booking Terms</h6>
      <Form.Control as="textarea" rows={5} />

      <h6 className="mt-3">Why use Us</h6>
      <Form.Control as="textarea" rows={5} />

      <h6 className="mt-3">Refund Policy</h6>
      <Form.Control as="textarea" rows={5} />
    </Card>
  );
};

// ✅ COST SHEET
const CostSheet: React.FC = () => {
  return (
    <Card className="p-3">
      <div className="costsheet-wrapper">
        {/* HEADER */}
        <div className="section-header mb-2">Manage Rates/ Season</div>

        {/* ADD SEASON */}
        <div className="table-responsive">
          <Table bordered className="cost-table">
            <thead style={{ fontSize: "10px" }}>
              <tr>
                <th>Currency</th>
                <th>
                  <Form.Control
                    size="sm"
                    defaultValue="INR"
                    style={{ fontSize: "10px" }}
                  />
                </th>
                <th>
                  {" "}
                  <Form.Check
                    label="Add more than 12 pax wise"
                    style={{ fontSize: "10px" }}
                  />
                </th>
                <th>
                  {" "}
                  <Form.Check
                    label="Quote Price"
                    style={{ fontSize: "10px" }}
                  />
                </th>
              </tr>
            </thead>
          </Table>
        </div>

        {/* ADD SEASON */}
        <div className="table-responsive">
          <Table bordered className="cost-table">
            <thead style={{ fontSize: "10px" }}>
              <tr>
                <th>Date*</th>
                <th>Mark UP*</th>
                <th>B2C (INR)</th>
                <th>B2B (INR)</th>
                <th>Common Inventory</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "10px" }}>
              <tr>
                <td>
                  <Form.Control
                    size="sm"
                    defaultValue="INR"
                    type="date"
                    style={{ fontSize: "10px" }}
                  />
                </td>
                <td>
                  <Form.Select size="sm" style={{ fontSize: "10px" }}>
                    <option>Fixed %</option>
                    <option>Fixed Amount</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    type="text"
                    style={{ fontSize: "10px" }}
                  />
                </td>

                <td>
                  <Form.Control
                    size="sm"
                    type="text"
                    style={{ fontSize: "10px" }}
                  />
                </td>
                <td>
                  <Form.Control
                    size="sm"
                    type="text"
                    style={{ fontSize: "10px" }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={5}></td>
                <td>
                  <div className="d-flex gap-1">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      style={{ fontSize: "10px" }}
                    >
                      Add More Season
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      style={{ fontSize: "10px" }}
                    >
                      Add Cost
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* PRICE TABLE */}
        <div className="section-header">Details</div>
        <div className="table-responsive">
          <Table bordered className="cost-table">
            <thead style={{ fontSize: "10px" }}>
              <tr>
                <th>Validity</th>
                <th>Markup</th>
                <th>Cost 2 Pax</th>
                <th>Cost 4 Pax</th>
                <th>Cost 6 Pax</th>
                <th>Cost 8 Pax</th>
                <th>Cost 10 Pax</th>
                <th>Cost 12 Pax</th>
                <th>Single Occupancy</th>
                <th>Extra Adult</th>
                <th>Extra Child</th>
                <th>Extra Child (No Bed)</th>
                <th>Infant</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "10px" }}>
              <tr>
                <td>My Cost INR (12-26 Mar)</td>
                <td>-</td>
                <td>6297</td>
                <td>6297</td>
                <td>6297</td>
                <td>6297</td>
                <td>6297</td>
                <td>6297</td>
                <td>0</td>
                <td>6297</td>
                <td>6297</td>
                <td>5000</td>
                <td>2500</td>
                <td>✏️ 👁️</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* SETTINGS + BOOKING RULES */}

        <Row className="g-1 p-1">
          {/* SETTINGS */}
          <Col md={6}>
            <Card className="p-3 border">
              <div className="section-subheader mb-2">Settings</div>

              <Form.Group className="mb-2" style={{ fontSize: "10px" }}>
                <Form.Label>Minimum Pax Allowed</Form.Label>
                <Form.Control size="sm" defaultValue="1" />
              </Form.Group>

              <Form.Group className="mb-2" style={{ fontSize: "10px" }}>
                <Form.Label>Package Valid Till</Form.Label>
                <Form.Control size="sm" type="date" />
              </Form.Group>

              <Row className="g-2 mb-2" style={{ fontSize: "10px" }}>
                <Col>
                  <Form.Label>Cutoff Days</Form.Label>
                  <Form.Control size="sm" />
                </Col>
                <Col>
                  <Form.Label>Cutoff Time</Form.Label>
                  <Form.Control size="sm" />
                </Col>
              </Row>

              <Form.Group className="mb-2" style={{ fontSize: "10px" }}>
                <Form.Label>Price Range</Form.Label>
                <Form.Control size="sm" />
              </Form.Group>

              <div className="d-flex gap-3">
                <Form.Check
                  type="radio"
                  label="Auto Proposal with Booking"
                  style={{ fontSize: "10px" }}
                />
                <Form.Check
                  type="radio"
                  label="Auto Proposal No Booking"
                  style={{ fontSize: "10px" }}
                />
                <Form.Check
                  type="radio"
                  label="Only Query"
                  style={{ fontSize: "10px" }}
                />
              </div>

              <div className="mt-2">
                <Form.Check label="FIT Rates" style={{ fontSize: "10px" }} />
                <Form.Check label="Room Sharing" style={{ fontSize: "10px" }} />
              </div>
            </Card>
          </Col>

          {/* BOOKING RULES */}
          <Col md={6}>
            <Card className="p-3 border">
              <div className="section-subheader mb-2">Booking Rules</div>

              <Form.Group className="mb-2" style={{ fontSize: "10px" }}>
                <Form.Label>Advance at time of confirmation</Form.Label>
                <Row className="g-2">
                  <Col>
                    <Form.Control
                      size="sm"
                      defaultValue="75"
                      style={{ fontSize: "10px" }}
                    />
                  </Col>
                  <Col>
                    <Form.Select size="sm" style={{ fontSize: "10px" }}>
                      <option>Fixed %</option>
                      <option>Amount</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group className="mb-2" style={{ fontSize: "10px" }}>
                <Form.Label>Balance before (days)</Form.Label>
                <Form.Control size="sm" defaultValue="30" />
              </Form.Group>

              <div className="section-subheader mt-3">TCS</div>
              <Form.Check label="Enable TCS" style={{ fontSize: "10px" }} />

              <div className="mt-2">
                <Form.Check
                  type="radio"
                  label="Default"
                  name="tcs"
                  style={{ fontSize: "10px" }}
                />
                <Form.Check
                  type="radio"
                  label="GST"
                  name="tcs"
                  style={{ fontSize: "10px" }}
                />
                <Form.Check
                  type="radio"
                  label="No GST"
                  name="tcs"
                  style={{ fontSize: "10px" }}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* INTERNAL REMARK */}
        <div className="section-subheader px-2">Internal Remark</div>
        <div className="p-2">
          <Form.Control as="textarea" rows={4} />
        </div>

        {/* DISPLAY URL */}
        <div className="p-2">
          <Form.Check label="Display On" />
          <Form.Control size="sm" className="mt-2" placeholder="https://..." />
        </div>

        {/* ACTIONS */}
        <div className="text-end p-2 border-top">
          <Button size="sm" variant="outline-primary" className="me-2">
            Manage Inventory
          </Button>
          <Button size="sm" variant="outline-secondary" className="me-2">
            View Package
          </Button>
          <Button size="sm" variant="outline-warning" className="me-2">
            Save As Draft
          </Button>
          <Button size="sm" variant="danger">
            Update
          </Button>
        </div>
      </div>
    </Card>
  );
};

// ✅ INVENTORY
const Inventory: React.FC = () => {
  return (
    <Card className="p-3">
      <div className="inventory-wrapper">
        {/* Header */}
        <div className="section-title mb-2">Flight Inventory</div>

        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center top-bar px-2">
          <Table bordered className="inventory-table">
            <thead style={{ fontSize: "10px" }}>
              <tr>
                <th>
                  <span>Add Package Cost and Markup from Kolhapur</span>
                </th>
                <th>
                  <div className="d-flex gap-3">
                    <Form.Check
                      type="radio"
                      label="Same"
                      name="type"
                      defaultChecked
                    />
                    <Form.Check type="radio" label="Different" name="type" />
                  </div>
                </th>
              </tr>
            </thead>
          </Table>
        </div>

        {/* Price Detail */}
        <div className="section-header">Price Detail</div>
        <div className="table-responsive">
          <Table bordered className="inventory-table">
            <thead style={{ fontSize: "10px" }}>
              <tr>
                <th>Date</th>
                <th>Currency</th>
                <th>Adult Cost</th>
                <th>Infant Cost</th>
                <th>Markup</th>
                <th>B2C Adult</th>
                <th>B2C Infant</th>
                <th>B2B Adult</th>
                <th>B2B Infant</th>
                <th>Inventory</th>
                <th>Sold</th>
                <th>On Hold</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "10px" }}>
              <tr>
                <td>27/03/2026</td>
                <td>INR</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>Fixed Amount</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>30</td>
                <td>0</td>
                <td>0</td>
                <td>30</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    style={{ fontSize: "10px" }}
                    title="Edit"
                  >
                    <Icon icon="mdi:pencil" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* Onward Flight */}
        <div className="section-header mb-2">Onward Flight</div>
        <Row className="g-2 align-items-end px-2">
          <Col>
            <Form.Control
              size="sm"
              placeholder="Air Lines"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Flight Number"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="From Airport"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="From Terminal"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="To Airport"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="To Terminal"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Departure Time"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Arrival Time"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Duration"
              style={{ fontSize: "10px" }}
            />
          </Col>

          <Col xs="auto">
            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: "10px" }}
              title="add"
            >
              <Icon icon="mdi:plus-circle-outline" />
            </Button>
          </Col>
        </Row>

        {/* Inward Flight */}
        <div className="section-header mt-3 mb-2">Inward Flight</div>
        <Row className="g-2 align-items-end px-2">
          <Col>
            <Form.Control
              size="sm"
              placeholder="Air Lines"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Flight Number"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="From Airport"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="From Terminal"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="To Airport"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="To Terminal"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Departure Time"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Arrival Time"
              style={{ fontSize: "10px" }}
            />
          </Col>
          <Col>
            <Form.Control
              size="sm"
              placeholder="Duration"
              style={{ fontSize: "10px" }}
            />
          </Col>

          <Col xs="auto">
            <Button
              variant="primary"
              size="sm"
              style={{ fontSize: "10px" }}
              title="add"
            >
              <Icon icon="mdi:plus-circle-outline" />
            </Button>
          </Col>
        </Row>

        {/* Submit */}
        <div className="text-end p-2">
          <Button size="sm" variant="success">
            Submit
          </Button>
        </div>
      </div>
    </Card>
  );
};

// ✅ HISTORY
const History: React.FC = () => {
  const data = [
    {
      date: "23-03-2026",
      screen: "Cost Sheet",
      details: "NA",
      agent: "RAJENDRA BUGADE",
    },
    {
      date: "20-03-2026",
      screen: "Cost Sheet",
      details: "NA",
      agent: "RAJENDRA BUGADE",
    },
    {
      date: "10-03-2026",
      screen: "Cost Sheet",
      details: "Publish Package",
      agent: "RAJENDRA BUGADE",
    },
    {
      date: "10-03-2026",
      screen: "Cost Sheet",
      details: "Booking Rules : Balance before",
      agent: "RAJENDRA BUGADE",
    },
    {
      date: "10-03-2026",
      screen: "Cost Sheet",
      details: "Booking Rules : Advance booking percent",
      agent: "RAJENDRA BUGADE",
    },
    {
      date: "10-03-2026",
      screen: "Cost Sheet",
      details: "Settings : Minimum pax allowed",
      agent: "RAJENDRA BUGADE",
    },
    {
      date: "10-03-2026",
      screen: "Cost Sheet",
      details: "Add rates",
      agent: "RAJENDRA BUGADE",
    },
  ];
  return (
    <>
      <Card className="p-3">
        <div className="history-wrapper">
          <div className="table-responsive">
            <Table bordered hover className="align-middle mb-0">
              <thead className="table-light" style={{ fontSize: "10px" }}>
                <tr>
                  <th style={{ width: "15%" }}>Date</th>
                  <th style={{ width: "20%" }}>Screen Name</th>
                  <th>Details</th>
                  <th style={{ width: "20%" }}>Agent Name</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "10px" }}>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.screen}</td>
                    <td>{item.details}</td>
                    <td className="fw-semibold text-uppercase">{item.agent}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Card>
    </>
  );
};
