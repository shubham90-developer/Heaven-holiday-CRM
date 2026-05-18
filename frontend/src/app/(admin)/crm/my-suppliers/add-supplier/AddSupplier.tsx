"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import {
  useCreateSupplierMutation,
  ISupplierContact,
  ISupplierBankDetail,
} from "../../../../../../Redux/supplierApi";

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
  const router = useRouter();
  const [step, setStep] = useState(1);

  // ── Form state ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    companyName: "",
    currency: "INR",
    gstRegistered: false,
    panNumber: "",
    salutation: "",
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    countryCode: "+91",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    state: "",
    city: "",
    otherCity: "",
    category: "",
    services: "",
    comments: "",
    expertiseDestinations: "",
  });

  // Sub-collections built locally before final submit
  const [contacts, setContacts] = useState<Omit<ISupplierContact, "_id">[]>([]);
  const [bankDetails, setBankDetails] = useState<
    Omit<ISupplierBankDetail, "_id">[]
  >([]);

  const [createSupplier, { isLoading }] = useCreateSupplierMutation();

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddContact = (contact: Omit<ISupplierContact, "_id">) => {
    setContacts((prev) => [...prev, contact]);
  };

  const handleRemoveContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddBank = (bank: Omit<ISupplierBankDetail, "_id">) => {
    // If new bank is primary, unset others
    if (bank.isPrimary) {
      setBankDetails((prev) => prev.map((b) => ({ ...b, isPrimary: false })));
    }
    setBankDetails((prev) => [...prev, bank]);
  };

  const handleRemoveBank = (index: number) => {
    setBankDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      await createSupplier({
        ...form,
        currency: form.currency as any,
        salutation: form.salutation as any,
        contacts,
        bankDetails,
      }).unwrap();
      router.push("/crm/my-suppliers");
    } catch (err: any) {
      alert(err?.data?.message ?? "Failed to create supplier");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Card>
        <CardHeader>
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
                {item === 2 && `2 Contacts (${contacts.length})`}
                {item === 3 && `3 Bank (${bankDetails.length})`}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardBody>
          {/* ================= STEP 1: Overview ================= */}
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
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Currency Type *
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                  >
                    {currencies.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={3}>
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
                      name="gstRegistered"
                      className="me-2"
                      style={{ fontSize: "12px" }}
                      checked={form.gstRegistered === true}
                      onChange={() =>
                        setForm((p) => ({ ...p, gstRegistered: true }))
                      }
                    />
                    <Form.Check
                      type="radio"
                      label="No"
                      name="gstRegistered"
                      style={{ fontSize: "12px" }}
                      checked={form.gstRegistered === false}
                      onChange={() =>
                        setForm((p) => ({ ...p, gstRegistered: false }))
                      }
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
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="panNumber"
                    value={form.panNumber}
                    onChange={handleChange}
                  />
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
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="salutation"
                    value={form.salutation}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
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
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Last Name
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Designation
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                  />
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
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
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
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Address Line 1
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="addressLine1"
                    value={form.addressLine1}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Address Line 2
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="addressLine2"
                    value={form.addressLine2}
                    onChange={handleChange}
                  />
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
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    State
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    City *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Other Location : City
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="otherCity"
                    value={form.otherCity}
                    onChange={handleChange}
                  />
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
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Services *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="services"
                    value={form.services}
                    onChange={handleChange}
                  />
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
                    name="comments"
                    value={form.comments}
                    onChange={handleChange}
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
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    name="expertiseDestinations"
                    value={form.expertiseDestinations}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form>
          )}

          {/* ================= STEP 2: Contacts ================= */}
          {step === 2 && (
            <>
              <div className="d-flex justify-content-between mb-2">
                <h6>Supplier Contacts</h6>
                <AddContactModal onSave={handleAddContact} />
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
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">
                        No contacts added yet
                      </td>
                    </tr>
                  ) : (
                    contacts.map((c, i) => (
                      <tr key={i}>
                        <td>
                          {c.salutation} {c.firstName} {c.lastName}
                        </td>
                        <td>{c.designation || "—"}</td>
                        <td>{c.email || "—"}</td>
                        <td>
                          {c.countryCode} {c.phone}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            onClick={() => handleRemoveContact(i)}
                          >
                            <Icon icon="mdi:trash-can-outline" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          )}

          {/* ================= STEP 3: Bank Details ================= */}
          {step === 3 && (
            <>
              <div className="d-flex justify-content-between mb-2">
                <h6>Supplier Bank Details</h6>
                <AddBankModal onSave={handleAddBank} />
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
                  {bankDetails.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-muted">
                        No bank details added yet
                      </td>
                    </tr>
                  ) : (
                    bankDetails.map((b, i) => (
                      <tr key={i}>
                        <td>{b.accountName || "—"}</td>
                        <td>{b.accountNumber}</td>
                        <td>{b.bankName || "—"}</td>
                        <td>{b.ifscCode || "—"}</td>
                        <td>
                          {b.isPrimary ? (
                            <span className="badge bg-success">Yes</span>
                          ) : (
                            <span className="badge bg-secondary">No</span>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            onClick={() => handleRemoveBank(i)}
                          >
                            <Icon icon="mdi:trash-can-outline" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </>
          )}
        </CardBody>

        <CardFooter>
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              style={{ fontSize: "10px" }}
              onClick={() => router.push("/crm/my-suppliers")}
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
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Finish & Save"}
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
