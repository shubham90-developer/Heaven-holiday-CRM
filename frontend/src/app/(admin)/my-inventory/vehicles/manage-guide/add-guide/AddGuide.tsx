"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import type {
  ICreateGuide,
  IGuideRate,
  MarkUpType,
} from "../../../../../../../Redux/guideApi";
import { useCreateGuideMutation } from "../../../../../../../Redux/guideApi";

const defaultRate: IGuideRate = {
  currency: "INR",
  perDayRate: 0,
  overnightCharges: 0,
  markUpType: "Percentage",
  markUp: 0,
  taxes: 0,
  total: 0,
};

const AddGuide = () => {
  const router = useRouter();
  const [createGuide, { isLoading }] = useCreateGuideMutation();

  const [formData, setFormData] = useState<ICreateGuide>({
    guideName: "",
    destination: "",
    mobileCountryCode: "+91",
    mobileNumber: "",
    email: "",
    languagesKnown: "",
    shortDescription: "",
    image: "",
    rates: [{ ...defaultRate }],
  });

  // ── Generic field handler ──────────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Rate row handler ───────────────────────────────────────────────────────
  const handleRateChange = (
    index: number,
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedRates = prev.rates.map((rate, i) => {
        if (i !== index) return rate;

        const updated: IGuideRate = {
          ...rate,
          [name]:
            name === "currency" || name === "markUpType"
              ? value
              : Number(value),
        };

        // Auto-calculate total whenever relevant fields change
        const perDay =
          name === "perDayRate" ? Number(value) : updated.perDayRate;
        const overnight =
          name === "overnightCharges"
            ? Number(value)
            : updated.overnightCharges;
        const markUp = name === "markUp" ? Number(value) : updated.markUp;
        const taxes = name === "taxes" ? Number(value) : updated.taxes;
        const markUpType: MarkUpType =
          name === "markUpType" ? (value as MarkUpType) : updated.markUpType;

        const base = perDay + overnight;
        const markUpAmount =
          markUpType === "Percentage" ? (base * markUp) / 100 : markUp;
        updated.total = parseFloat((base + markUpAmount + taxes).toFixed(2));

        return updated;
      });

      return { ...prev, rates: updatedRates };
    });
  };

  // ── Image → base64 (or you can upload to S3 and store URL) ────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    try {
      await createGuide(formData).unwrap();
      router.push("/my-inventory/vehicles/manage-guide");
    } catch (error) {
      console.error("Failed to create guide:", error);
      // Add your toast/notification here
    }
  };

  const rate = formData.rates[0]; // single rate row

  return (
    <>
      <Card className="p-3">
        <Form>
          <Row className="mb-2">
            {/* Guide Name */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Guide Name*
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                name="guideName"
                value={formData.guideName}
                onChange={handleChange}
              />
            </Col>

            {/* Destination */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Destination*
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                name="destination"
                value={formData.destination}
                onChange={handleChange}
              />
            </Col>

            {/* Mobile Number */}
            <Col md={2}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Mobile Number *
              </Form.Label>
              <div className="input-group input-group-sm">
                <span className="input-group-text">+91</span>
                <Form.Control
                  style={{ fontSize: "10px" }}
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
            </Col>

            {/* Email */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                E-mail
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Col>

            {/* Languages Known */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Languages Known*
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                name="languagesKnown"
                value={formData.languagesKnown}
                onChange={handleChange}
              />
            </Col>

            {/* Image */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Image
              </Form.Label>
              <Form.Control
                type="file"
                size="sm"
                style={{ fontSize: "10px" }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </Col>

            {/* Short Description */}
            <Col md={6}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Short Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                style={{ fontSize: "10px" }}
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <strong style={{ fontSize: "10px" }}>Rates</strong>

          <div className="table-responsive my-2">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th style={{ width: "120px" }}>Currency</th>
                  <th style={{ width: "140px" }}>Per Day Rate</th>
                  <th style={{ width: "160px" }}>Overnight Charges</th>
                  <th style={{ width: "140px" }}>Mark Up Type</th>
                  <th style={{ width: "120px" }}>Mark Up</th>
                  <th style={{ width: "120px" }}>Taxes</th>
                  <th style={{ width: "140px" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ fontSize: "12px" }}>
                  {/* Currency */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "10px" }}
                      name="currency"
                      value={rate.currency}
                      onChange={(e) => handleRateChange(0, e)}
                    >
                      <option value="">Select</option>
                      <option value="INR">INR</option>
                    </Form.Select>
                  </td>

                  {/* Per Day Rate */}
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "10px" }}
                      type="number"
                      min={0}
                      name="perDayRate"
                      value={rate.perDayRate}
                      onChange={(e) => handleRateChange(0, e)}
                    />
                  </td>

                  {/* Overnight Charges */}
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "10px" }}
                      type="number"
                      min={0}
                      name="overnightCharges"
                      value={rate.overnightCharges}
                      onChange={(e) => handleRateChange(0, e)}
                    />
                  </td>

                  {/* Mark Up Type */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "10px" }}
                      name="markUpType"
                      value={rate.markUpType}
                      onChange={(e) => handleRateChange(0, e)}
                    >
                      <option value="">Select</option>
                      <option value="Percentage">Percentage</option>
                      <option value="Fixed">Fixed</option>
                    </Form.Select>
                  </td>

                  {/* Mark Up */}
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "10px" }}
                      type="number"
                      min={0}
                      name="markUp"
                      value={rate.markUp}
                      onChange={(e) => handleRateChange(0, e)}
                    />
                  </td>

                  {/* Taxes */}
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "10px" }}
                      type="number"
                      min={0}
                      name="taxes"
                      value={rate.taxes}
                      onChange={(e) => handleRateChange(0, e)}
                    />
                  </td>

                  {/* Total — read-only, auto-calculated */}
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "10px" }}
                      type="number"
                      name="total"
                      value={rate.total}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => router.push("/my-inventory/vehicles/manage-guide")}
              style={{ fontSize: "12px" }}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              size="sm"
              style={{ fontSize: "12px" }}
              onClick={handleSubmit}
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

export default AddGuide;
