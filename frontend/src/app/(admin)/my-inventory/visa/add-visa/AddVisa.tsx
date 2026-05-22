"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useGetAllSuppliersQuery } from "../../../../../../Redux/supplierApi";
import { useCreateVisaMutation } from "../../../../../../Redux/visaApi";
import type {
  ICreateVisa,
  IMarkUp,
  IServiceProvider,
  IEmbassyFee,
  MarkUpType,
} from "../../../../../../Redux/visaApi";

interface ServiceProviderRow extends Omit<IServiceProvider, "_id"> {}

const defaultEmbassyFee: IEmbassyFee = {
  currency: "INR",
  adult: 0,
  child: 0,
  childAge: 0,
  infant: 0,
};

const defaultMarkUp: IMarkUp[] = [
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
];

const defaultServiceRow = (): ServiceProviderRow => ({
  display: false,
  serviceName: "",
  currency: "INR",
  fees: 0,
  markup: 0,
  taxable: false,
});

const AddVisa = () => {
  const router = useRouter();

  const { data: suppliersData } = useGetAllSuppliersQuery({});
  const [createVisa, { isLoading, isError, isSuccess }] =
    useCreateVisaMutation();

  const suppliers = suppliersData?.data ?? [];

  // ─── Form state ─────────────────────────────────────────────────────────────
  const [travelersNationality, setTravelersNationality] = useState("India");
  const [countriesCovered, setCountriesCovered] = useState("");
  const [visaName, setVisaName] = useState("");
  const [visaType, setVisaType] = useState<ICreateVisa["visaType"]>(undefined);
  const [visaCategory, setVisaCategory] =
    useState<ICreateVisa["visaCategory"]>("Tourism");
  const [entryType, setEntryType] =
    useState<ICreateVisa["entryType"]>("Single Entry");
  const [processingTime, setProcessingTime] = useState("");
  const [passportExpire, setPassportExpire] = useState("");
  const [validityOfVisa, setValidityOfVisa] = useState("");
  const [duration, setDuration] = useState("");
  const [supplier, setSupplier] = useState("");

  // Embassy Fee
  const [embassyFee, setEmbassyFee] = useState<IEmbassyFee>(defaultEmbassyFee);

  // Markup — fixed two rows
  const [markUp, setMarkUp] = useState<IMarkUp[]>(defaultMarkUp);

  // Service Providers — dynamic rows
  const [serviceProviders, setServiceProviders] = useState<
    ServiceProviderRow[]
  >([defaultServiceRow()]);

  // ─── Embassy fee handler ─────────────────────────────────────────────────────
  const handleEmbassyFeeChange = (
    field: keyof IEmbassyFee,
    value: string | number,
  ) => {
    setEmbassyFee((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Markup handlers ─────────────────────────────────────────────────────────
  const handleMarkUpChange = (
    index: number,
    field: keyof Omit<IMarkUp, "marketPlace">,
    value: string | number,
  ) => {
    setMarkUp((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  // ─── Service provider handlers ───────────────────────────────────────────────
  const handleServiceChange = (
    index: number,
    field: keyof ServiceProviderRow,
    value: string | number | boolean,
  ) => {
    setServiceProviders((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const addServiceRow = () =>
    setServiceProviders((prev) => [...prev, defaultServiceRow()]);

  const removeServiceRow = (index: number) =>
    setServiceProviders((prev) => prev.filter((_, i) => i !== index));

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    try {
      // Replace with real logged-in user ObjectId from your auth state
      const createdBy = "000000000000000000000001";

      const payload: ICreateVisa = {
        travelersNationality,
        countriesCovered: countriesCovered
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        visaName,
        visaType,
        visaCategory,
        entryType,
        processingTime: processingTime ? Number(processingTime) : undefined,
        passportExpire: passportExpire ? Number(passportExpire) : undefined,
        validityOfVisa: validityOfVisa ? Number(validityOfVisa) : undefined,
        duration: duration || undefined,
        supplier: supplier || undefined,
        embassyFee,
        markUp,
        serviceProviders: serviceProviders.filter((s) => s.serviceName.trim()),
        createdBy,
      };

      await createVisa(payload).unwrap();
      router.push("/my-inventory/visa");
    } catch (err) {
      console.error("Failed to create visa:", err);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
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

        {/* Error / Success banners */}
        {isError && (
          <div
            className="alert alert-danger py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Failed to save visa. Please try again.
          </div>
        )}
        {isSuccess && (
          <div
            className="alert alert-success py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Visa saved successfully!
          </div>
        )}

        <Form>
          {/* Nationality & Countries */}
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

          {/* Main visa details block */}
          <div className="my-3 border p-3">
            <Row className="g-2">
              {/* Visa Name */}
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

              {/* Visa Type */}
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
                  value={visaType ?? ""}
                  onChange={(e) =>
                    setVisaType(
                      (e.target.value as ICreateVisa["visaType"]) || undefined,
                    )
                  }
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

              {/* Visa Category */}
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
                  value={visaCategory ?? ""}
                  onChange={(e) =>
                    setVisaCategory(
                      e.target.value as ICreateVisa["visaCategory"],
                    )
                  }
                >
                  <option value="Tourism">Tourism</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                  <option value="Employment">Employment</option>
                  <option value="Family">Family</option>
                  <option value="Medical">Medical</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Col>

              {/* Entry Type */}
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
                  onChange={(e) =>
                    setEntryType(e.target.value as ICreateVisa["entryType"])
                  }
                >
                  <option value="Single Entry">Single Entry</option>
                  <option value="Double Entry">Double Entry</option>
                  <option value="Multiple Entry">Multiple Entry</option>
                </Form.Select>
              </Col>

              {/* Processing Time */}
              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Processing Time
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  type="number"
                  min="0"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                />
              </Col>

              {/* Passport Expire */}
              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Passport Expire (Days)
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  type="number"
                  min="0"
                  value={passportExpire}
                  onChange={(e) => setPassportExpire(e.target.value)}
                />
              </Col>

              {/* Validity */}
              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Validity of Visa (Days)
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  type="number"
                  min="0"
                  value={validityOfVisa}
                  onChange={(e) => setValidityOfVisa(e.target.value)}
                />
              </Col>

              {/* Duration */}
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

              {/* Supplier — dropdown from API */}
              <Col md={4}>
                <Form.Label
                  className="text-primary small"
                  style={{ fontSize: "10px" }}
                >
                  Supplier
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.companyName}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              {/* Embassy Fee Currency */}
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
                    handleEmbassyFeeChange("currency", e.target.value)
                  }
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="AED">AED</option>
                </Form.Select>
              </Col>

              {/* Adult */}
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
                  min="0"
                  style={{ fontSize: "10px" }}
                  value={embassyFee.adult}
                  onChange={(e) =>
                    handleEmbassyFeeChange("adult", Number(e.target.value))
                  }
                />
              </Col>

              {/* Child */}
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
                  min="0"
                  style={{ fontSize: "10px" }}
                  value={embassyFee.child}
                  onChange={(e) =>
                    handleEmbassyFeeChange("child", Number(e.target.value))
                  }
                />
              </Col>

              {/* Child Age */}
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
                  min="0"
                  style={{ fontSize: "10px" }}
                  value={embassyFee.childAge}
                  onChange={(e) =>
                    handleEmbassyFeeChange("childAge", Number(e.target.value))
                  }
                />
              </Col>

              {/* Infant */}
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
                  min="0"
                  style={{ fontSize: "10px" }}
                  value={embassyFee.infant}
                  onChange={(e) =>
                    handleEmbassyFeeChange("infant", Number(e.target.value))
                  }
                />
              </Col>
            </Row>
          </div>

          {/* ── Add Markup ─────────────────────────────────────────────────── */}
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
                          handleMarkUpChange(index, "currency", e.target.value)
                        }
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="AED">AED</option>
                      </Form.Select>
                    </td>

                    <td>
                      <Form.Select
                        size="sm"
                        style={{ fontSize: "10px" }}
                        value={row.markUpType}
                        onChange={(e) =>
                          handleMarkUpChange(
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
                        min="0"
                        style={{ fontSize: "10px" }}
                        value={row.adult}
                        onChange={(e) =>
                          handleMarkUpChange(
                            index,
                            "adult",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min="0"
                        style={{ fontSize: "10px" }}
                        value={row.child}
                        onChange={(e) =>
                          handleMarkUpChange(
                            index,
                            "child",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min="0"
                        style={{ fontSize: "10px" }}
                        value={row.infant}
                        onChange={(e) =>
                          handleMarkUpChange(
                            index,
                            "infant",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Add Service Provider ───────────────────────────────────────── */}
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
                {serviceProviders.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={row.display}
                        onChange={(e) =>
                          handleServiceChange(
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
                        value={row.serviceName}
                        onChange={(e) =>
                          handleServiceChange(
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
                        value={row.currency}
                        onChange={(e) =>
                          handleServiceChange(index, "currency", e.target.value)
                        }
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="AED">AED</option>
                      </Form.Select>
                    </td>

                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        min="0"
                        placeholder="Enter value"
                        style={{ fontSize: "10px" }}
                        value={row.fees}
                        onChange={(e) =>
                          handleServiceChange(
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
                        min="0"
                        placeholder="Enter value"
                        style={{ fontSize: "10px" }}
                        value={row.markup}
                        onChange={(e) =>
                          handleServiceChange(
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
                        checked={row.taxable}
                        onChange={(e) =>
                          handleServiceChange(
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
                        onClick={() => removeServiceRow(index)}
                        size="sm"
                        style={{ fontSize: "10px" }}
                        disabled={serviceProviders.length === 1}
                      >
                        -
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Add More Button */}
            <div className="d-flex justify-content-end mt-2">
              <Button
                size="sm"
                style={{ fontSize: "10px" }}
                onClick={addServiceRow}
                variant="outline-danger"
              >
                Add More
              </Button>
            </div>
          </div>

          <div className="text-end mt-3">
            <Button
              size="sm"
              style={{ fontSize: "10px", fontWeight: "bold" }}
              variant="success"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default AddVisa;
