"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useParams } from "next/navigation";
import {
  useGetVisaByIdQuery,
  useUpdateVisaMutation,
  IUpdateVisa,
  IMarkUp,
  IServiceProvider,
  IEmbassyFee,
  MarketPlace,
  MarkUpType,
} from "../../../../../../Redux/visaApi";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ServiceProviderRow extends Omit<IServiceProvider, "_id"> {
  _id?: string;
}

interface DocItem {
  id: number;
  name: string;
  checked: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────

const EditVisa = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // ── RTK Query ──
  const {
    data: visaResponse,
    isLoading,
    isError,
  } = useGetVisaByIdQuery(id, {
    skip: !id,
  });
  const [updateVisa, { isLoading: isUpdating }] = useUpdateVisaMutation();

  const visa = visaResponse?.data;

  // ── Basic Info ──
  const [travelersNationality, setTravelersNationality] = useState("");
  const [countriesCovered, setCountriesCovered] = useState("");

  // ── Visa Details ──
  const [visaName, setVisaName] = useState("");
  const [visaType, setVisaType] = useState("");
  const [visaCategory, setVisaCategory] = useState("");
  const [entryType, setEntryType] = useState("Single Entry");
  const [processingTime, setProcessingTime] = useState("");
  const [passportExpire, setPassportExpire] = useState("");
  const [validityOfVisa, setValidityOfVisa] = useState("");
  const [duration, setDuration] = useState("");
  const [supplier, setSupplier] = useState("");

  // ── Embassy Fee ──
  const [embassyFee, setEmbassyFee] = useState<IEmbassyFee>({
    currency: "INR",
    adult: 0,
    child: 0,
    childAge: 0,
    infant: 0,
  });

  // ── Markup ──
  const [markUp, setMarkUp] = useState<IMarkUp[]>([
    {
      marketPlace: "MY B2C",
      currency: "INR",
      markUpType: "Amount",
      adult: 0,
      child: 0,
      infant: 0,
    },
    {
      marketPlace: "MY B2B",
      currency: "INR",
      markUpType: "Amount",
      adult: 0,
      child: 0,
      infant: 0,
    },
  ]);

  // ── Service Providers ──
  const [serviceProviders, setServiceProviders] = useState<
    ServiceProviderRow[]
  >([
    {
      display: false,
      serviceName: "",
      currency: "INR",
      fees: 0,
      markup: 0,
      taxable: false,
    },
  ]);

  // ── Docs ──
  const [docs, setDocs] = useState<DocItem[]>([
    { id: 1, name: "Original Passport", checked: false },
    { id: 2, name: "Photo (35mm x 45mm)", checked: false },
    { id: 3, name: "PAN Card", checked: false },
    { id: 4, name: "Document Radio Button", checked: false },
  ]);

  // ── Error/Success ──
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ── Populate form when visa data loads ──
  useEffect(() => {
    if (!visa) return;

    setTravelersNationality(visa.travelersNationality ?? "");
    setCountriesCovered(visa.countriesCovered?.join(", ") ?? "");
    setVisaName(visa.visaName ?? "");
    setVisaType(visa.visaType ?? "");
    setVisaCategory(visa.visaCategory ?? "");
    setEntryType(visa.entryType ?? "Single Entry");
    setProcessingTime(
      visa.processingTime !== undefined ? String(visa.processingTime) : "",
    );
    setPassportExpire(
      visa.passportExpire !== undefined ? String(visa.passportExpire) : "",
    );
    setValidityOfVisa(
      visa.validityOfVisa !== undefined ? String(visa.validityOfVisa) : "",
    );
    setDuration(visa.duration ?? "");

    // supplier might be a populated object or plain string
    if (visa.supplier) {
      setSupplier(
        typeof visa.supplier === "string"
          ? visa.supplier
          : ((visa.supplier as any)._id ?? ""),
      );
    }

    if (visa.embassyFee) setEmbassyFee(visa.embassyFee);

    if (visa.markUp?.length) setMarkUp(visa.markUp);

    if (visa.serviceProviders?.length) {
      setServiceProviders(visa.serviceProviders);
    }
  }, [visa]);

  // ── Markup helpers ──
  const updateMarkup = (
    index: number,
    field: keyof IMarkUp,
    value: string | number,
  ) => {
    setMarkUp((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  // ── Service Provider helpers ──
  const addServiceProvider = () => {
    setServiceProviders((prev) => [
      ...prev,
      {
        display: false,
        serviceName: "",
        currency: "INR",
        fees: 0,
        markup: 0,
        taxable: false,
      },
    ]);
  };

  const removeServiceProvider = (index: number) => {
    setServiceProviders((prev) => prev.filter((_, i) => i !== index));
  };

  const updateServiceProvider = (
    index: number,
    field: keyof ServiceProviderRow,
    value: string | number | boolean,
  ) => {
    setServiceProviders((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  // ── Doc toggle ──
  const handleDocChange = (docId: number) => {
    setDocs((prev) =>
      prev.map((item) =>
        item.id === docId ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // ── Submit ──
  const handleSave = async () => {
    setSaveError(null);
    setSaveSuccess(false);

    // Get updatedBy from localStorage/session — adjust to your auth setup
    const updatedBy =
      typeof window !== "undefined"
        ? (localStorage.getItem("userId") ?? "")
        : "";

    const body: IUpdateVisa = {
      updatedBy,
      travelersNationality,
      countriesCovered: countriesCovered
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      visaName,
      ...(visaType && { visaType: visaType as any }),
      ...(visaCategory && { visaCategory: visaCategory as any }),
      entryType: entryType as any,
      ...(processingTime !== "" && { processingTime: Number(processingTime) }),
      ...(passportExpire !== "" && { passportExpire: Number(passportExpire) }),
      ...(validityOfVisa !== "" && { validityOfVisa: Number(validityOfVisa) }),
      ...(duration && { duration }),
      ...(supplier && { supplier }),
      embassyFee,
      markUp,
      serviceProviders: serviceProviders.filter((sp) => sp.serviceName.trim()),
    };

    try {
      await updateVisa({ id, body }).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(
        err?.data?.message ?? "Failed to update visa. Please try again.",
      );
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <Card className="p-3">
        <div className="text-center py-4" style={{ fontSize: "10px" }}>
          Loading visa details...
        </div>
      </Card>
    );
  }

  if (isError || (!isLoading && !visa)) {
    return (
      <Card className="p-3">
        <div
          className="alert alert-danger py-1 mb-2"
          style={{ fontSize: "10px" }}
        >
          Failed to load visa details. Please go back and try again.
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.push("/my-inventory/visa")}
          style={{ fontSize: "10px", fontWeight: "bold" }}
        >
          <Icon icon="mdi:arrow-left" className="me-1" /> Back to Visas
        </Button>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-3">
        <div className="text-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/my-inventory/visa")}
            style={{ fontSize: "10px", fontWeight: "bold" }}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Visa
          </Button>
        </div>
        <hr />

        {saveError && (
          <div
            className="alert alert-danger py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            {saveError}
          </div>
        )}
        {saveSuccess && (
          <div
            className="alert alert-success py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Visa updated successfully!
          </div>
        )}

        <Form>
          {/* ── Basic Info ── */}
          <Row>
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Travelers Nationality
              </Form.Label>
              <Form.Select
                size="sm"
                style={{ fontSize: "10px" }}
                value={travelersNationality}
                onChange={(e) => setTravelersNationality(e.target.value)}
              >
                <option value="">Select Nationality</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Countries Covered
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                placeholder="Enter Countries (comma separated)"
                value={countriesCovered}
                onChange={(e) => setCountriesCovered(e.target.value)}
              />
            </Col>
          </Row>

          {/* ── Visa Details ── */}
          <div className="my-3 border p-3">
            <Row className="g-2">
              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Visa Name *
                </Form.Label>
                <Form.Control
                  size="sm"
                  placeholder="Visa Name"
                  style={{ fontSize: "10px" }}
                  value={visaName}
                  onChange={(e) => setVisaName(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Visa Type
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={visaType}
                  onChange={(e) => setVisaType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Tourist">Tourist</option>
                  <option value="Business">Business</option>
                  <option value="Student">Student</option>
                  <option value="Work">Work</option>
                  <option value="Transit">Transit</option>
                  <option value="Medical">Medical</option>
                  <option value="Conference">Conference</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Visa Category
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={visaCategory}
                  onChange={(e) => setVisaCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Employment">Employment</option>
                  <option value="Family">Family</option>
                  <option value="Medical">Medical</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Entry Type
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={entryType}
                  onChange={(e) => setEntryType(e.target.value)}
                >
                  <option value="Single Entry">Single Entry</option>
                  <option value="Double Entry">Double Entry</option>
                  <option value="Multiple Entry">Multiple Entry</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Processing Time
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  style={{ fontSize: "10px" }}
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Passport Expire (Days)
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  style={{ fontSize: "10px" }}
                  value={passportExpire}
                  onChange={(e) => setPassportExpire(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Validity of Visa (Days)
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  style={{ fontSize: "10px" }}
                  value={validityOfVisa}
                  onChange={(e) => setValidityOfVisa(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Duration
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Supplier
                </Form.Label>
                <Form.Control
                  size="sm"
                  placeholder="Supplier ObjectId"
                  style={{ fontSize: "10px" }}
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </Col>

              {/* ── Embassy Fee ── */}
              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Embassy Fee Currency
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={embassyFee.currency}
                  onChange={(e) =>
                    setEmbassyFee((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </Form.Select>
              </Col>

              <Col md={2}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Adult
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  style={{ fontSize: "10px" }}
                  value={embassyFee.adult}
                  onChange={(e) =>
                    setEmbassyFee((prev) => ({
                      ...prev,
                      adult: Number(e.target.value),
                    }))
                  }
                />
              </Col>

              <Col md={2}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Child
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  style={{ fontSize: "10px" }}
                  value={embassyFee.child}
                  onChange={(e) =>
                    setEmbassyFee((prev) => ({
                      ...prev,
                      child: Number(e.target.value),
                    }))
                  }
                />
              </Col>

              <Col md={2}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Child Age
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  style={{ fontSize: "10px" }}
                  value={embassyFee.childAge}
                  onChange={(e) =>
                    setEmbassyFee((prev) => ({
                      ...prev,
                      childAge: Number(e.target.value),
                    }))
                  }
                />
              </Col>

              <Col md={2}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Infant
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  style={{ fontSize: "10px" }}
                  value={embassyFee.infant}
                  onChange={(e) =>
                    setEmbassyFee((prev) => ({
                      ...prev,
                      infant: Number(e.target.value),
                    }))
                  }
                />
              </Col>
            </Row>
          </div>

          {/* ── Markup ── */}
          <strong style={{ fontSize: "10px" }}>Add Markup</strong>

          <div className="table-responsive my-2">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th style={{ width: "150px" }}>Market Place</th>
                  <th style={{ width: "120px" }}>Currency</th>
                  <th style={{ width: "150px" }}>Mark Up Type</th>
                  <th style={{ width: "120px" }}>Adult</th>
                  <th style={{ width: "120px" }}>Child</th>
                  <th style={{ width: "120px" }}>Infant</th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "10px" }}>
                {markUp.map((row, index) => (
                  <tr key={row.marketPlace}>
                    <td>{row.marketPlace}</td>

                    <td>
                      <Form.Select
                        size="sm"
                        style={{ fontSize: "10px" }}
                        value={row.currency}
                        onChange={(e) =>
                          updateMarkup(index, "currency", e.target.value)
                        }
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                      </Form.Select>
                    </td>

                    <td>
                      <Form.Select
                        size="sm"
                        style={{ fontSize: "10px" }}
                        value={row.markUpType}
                        onChange={(e) =>
                          updateMarkup(
                            index,
                            "markUpType",
                            e.target.value as MarkUpType,
                          )
                        }
                      >
                        <option value="Amount">Amount</option>
                        <option value="Percentage">Percentage</option>
                      </Form.Select>
                    </td>

                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={0}
                        style={{ fontSize: "10px" }}
                        value={row.adult}
                        onChange={(e) =>
                          updateMarkup(index, "adult", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={0}
                        style={{ fontSize: "10px" }}
                        value={row.child}
                        onChange={(e) =>
                          updateMarkup(index, "child", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={0}
                        style={{ fontSize: "10px" }}
                        value={row.infant}
                        onChange={(e) =>
                          updateMarkup(index, "infant", Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Service Providers ── */}
          <strong style={{ fontSize: "10px" }}>Add Service Provider</strong>

          <div className="table-responsive my-2">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th style={{ width: "80px" }}>Display</th>
                  <th style={{ width: "200px" }}>Service Name</th>
                  <th style={{ width: "120px" }}>Currency</th>
                  <th style={{ width: "150px" }}>Fees</th>
                  <th style={{ width: "150px" }}>Markup</th>
                  <th style={{ width: "80px" }}>Taxable</th>
                  <th style={{ width: "80px" }}>Action</th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "10px" }}>
                {serviceProviders.map((sp, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={sp.display}
                        onChange={(e) =>
                          updateServiceProvider(
                            index,
                            "display",
                            e.target.checked,
                          )
                        }
                      />
                    </td>

                    <td>
                      <Form.Control
                        size="sm"
                        placeholder="Enter Title"
                        style={{ fontSize: "10px" }}
                        value={sp.serviceName}
                        onChange={(e) =>
                          updateServiceProvider(
                            index,
                            "serviceName",
                            e.target.value,
                          )
                        }
                      />
                    </td>

                    <td>
                      <Form.Select
                        size="sm"
                        style={{ fontSize: "10px" }}
                        value={sp.currency}
                        onChange={(e) =>
                          updateServiceProvider(
                            index,
                            "currency",
                            e.target.value,
                          )
                        }
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                      </Form.Select>
                    </td>

                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={0}
                        placeholder="Enter value"
                        style={{ fontSize: "10px" }}
                        value={sp.fees}
                        onChange={(e) =>
                          updateServiceProvider(
                            index,
                            "fees",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>

                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min={0}
                        placeholder="Enter value"
                        style={{ fontSize: "10px" }}
                        value={sp.markup}
                        onChange={(e) =>
                          updateServiceProvider(
                            index,
                            "markup",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>

                    <td className="text-center">
                      <Form.Check
                        type="checkbox"
                        style={{ fontSize: "10px" }}
                        checked={sp.taxable}
                        onChange={(e) =>
                          updateServiceProvider(
                            index,
                            "taxable",
                            e.target.checked,
                          )
                        }
                      />
                    </td>

                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{ fontSize: "10px" }}
                        onClick={() => removeServiceProvider(index)}
                        disabled={serviceProviders.length === 1}
                      >
                        -
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-end mt-2">
              <Button
                size="sm"
                style={{ fontSize: "10px" }}
                onClick={addServiceProvider}
                variant="outline-danger"
              >
                Add More
              </Button>
            </div>
          </div>

          {/* ── Document Details ── */}
          <strong style={{ fontSize: "10px" }}>
            Add/Update Visa Document Details
          </strong>

          <Tabs
            defaultActiveKey="Basic Details"
            id="fill-tab-example"
            className="mb-3 py-2"
            variant="pills"
            style={{ fontSize: "10px" }}
          >
            <Tab eventKey="Basic Details" title="Basic Details">
              <Row className="g-2 mb-4">
                <Col md={6}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Docs Required
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    size="sm"
                    style={{ fontSize: "10px" }}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Basic Requirements to visit
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    size="sm"
                    style={{ fontSize: "10px" }}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Embassy Address
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    size="sm"
                    style={{ fontSize: "10px" }}
                  />
                </Col>
              </Row>

              <div className="table-responsive">
                <table
                  className="table table-sm table-bordered mb-0 align-middle"
                  style={{ tableLayout: "fixed", width: "100%" }}
                >
                  <tbody>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <tr
                        key={num}
                        style={{ fontSize: "10px", whiteSpace: "nowrap" }}
                      >
                        <td style={{ width: "180px" }}>Document {num}</td>
                        <td>
                          <Form.Control
                            size="sm"
                            style={{ fontSize: "10px" }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="file"
                            size="sm"
                            style={{ fontSize: "10px" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab>

            <Tab eventKey="fields / doc mapping" title="Fields / Doc Mapping">
              <div>
                <Row className="align-items-center mb-2">
                  <Col md={3}>
                    <div className="d-flex gap-2 align-items-center">
                      <Form.Label
                        className="text-primary small"
                        style={{ fontSize: "10px" }}
                      >
                        Physical Submission
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        name="submissiontype"
                        id="submissionyes"
                        label="Yes"
                        style={{ fontSize: "10px" }}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="submissiontype"
                        id="submissionno"
                        style={{ fontSize: "10px" }}
                      />
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="d-flex gap-2 align-items-center">
                      <Form.Label
                        className="text-primary small"
                        style={{ fontSize: "10px" }}
                      >
                        Physical Interview
                      </Form.Label>
                      <Form.Check
                        type="radio"
                        name="type"
                        id="yes"
                        label="Yes"
                        style={{ fontSize: "10px" }}
                      />
                      <Form.Check
                        type="radio"
                        label="No"
                        name="type"
                        id="no"
                        style={{ fontSize: "10px" }}
                      />
                    </div>
                  </Col>
                </Row>

                <div>
                  {docs.map((item) => (
                    <div
                      key={item.id}
                      className="border mb-2 p-1 d-flex justify-content-between"
                    >
                      <div className="d-flex gap-2">
                        <Form.Check
                          type="checkbox"
                          label={item.name}
                          style={{ fontSize: "10px" }}
                          checked={item.checked}
                          onChange={() => handleDocChange(item.id)}
                        />
                        {item.checked && (
                          <div className="d-flex gap-1">
                            <Icon icon="mdi:alert-circle" className="me-1" />
                            <Form.Check
                              type="checkbox"
                              label="Mandatory"
                              style={{ fontSize: "10px" }}
                              name="required"
                              id={`mandatory-${item.id}`}
                            />
                          </div>
                        )}
                      </div>
                      <span>
                        <Icon icon="mdi:plus" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Tab>
          </Tabs>

          <div className="text-end mt-3">
            <Button
              size="sm"
              style={{ fontSize: "10px", fontWeight: "bold" }}
              variant="success"
              onClick={handleSave}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default EditVisa;
