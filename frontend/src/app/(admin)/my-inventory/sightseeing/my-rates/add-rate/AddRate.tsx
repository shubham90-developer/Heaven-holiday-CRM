"use client";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import CustomFlatpickr from "@/components/CustomFlatpickr";
import Filter from "./Filter";
import {
  useGetSightseeingCitiesQuery,
  useGetSightseeingsByCityQuery,
  useCreateSightseeingRateMutation,
  ISightseeingOption,
} from "../../../../../../../Redux/ratesApi";
import { useGetAllSuppliersQuery } from "../../../../../../../Redux/supplierApi";

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingType = "On Request" | "Real Time";

interface RateRow {
  sightseeingId: string;
  from: string;
  to: string;
  supplier: string;
  currency: string;
  entryFeeAdult: string;
  entryFeeKids: string;
  costMarkup: string;
  bookingType: BookingType | "";
  termsAndConditions: string;
}

const EMPTY_ROW: RateRow = {
  sightseeingId: "",
  from: "",
  to: "",
  supplier: "",
  currency: "INR",
  entryFeeAdult: "",
  entryFeeKids: "",
  costMarkup: "",
  bookingType: "On Request",
  termsAndConditions: "",
};

const CURRENCIES = [
  "INR",
  "USD",
  "EUR",
  "AED",
  "GBP",
  "SGD",
  "AUD",
  "CAD",
  "JPY",
  "CNY",
  "KRW",
];

// ─── Component ────────────────────────────────────────────────────────────────

const AddRate = () => {
  const router = useRouter();

  const [searchCity, setSearchCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [rows, setRows] = useState<RateRow[]>([{ ...EMPTY_ROW }]);

  // RTK queries
  const { data: citiesData } = useGetSightseeingCitiesQuery();
  const { data: sightseeingsData } = useGetSightseeingsByCityQuery(
    selectedCity,
    {
      skip: !selectedCity,
    },
  );
  const { data: suppliersData } = useGetAllSuppliersQuery({
    status: "active",
    limit: 100,
  });
  const [createRate, { isLoading }] = useCreateSightseeingRateMutation();

  const cities: string[] = citiesData?.data ?? [];
  const sightseeings: ISightseeingOption[] = sightseeingsData?.data ?? [];
  const suppliers = suppliersData?.data ?? [];

  // ── Row helpers ───────────────────────────────────────────────────────────

  const updateRow = (index: number, field: keyof RateRow, value: string) =>
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );

  const addRow = () => setRows((prev) => [...prev, { ...EMPTY_ROW }]);

  const removeRow = (index: number) =>
    setRows((prev) => prev.filter((_, i) => i !== index));

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    const validRows = rows.filter(
      (r) => r.sightseeingId && r.from && r.to && r.supplier && r.bookingType,
    );

    if (validRows.length === 0) {
      alert("Please fill in Sightseeing, From, To, Supplier and Booking Type.");
      return;
    }

    try {
      await Promise.all(
        validRows.map((row) =>
          createRate({
            sightseeingId: row.sightseeingId,
            city: selectedCity,
            from: row.from,
            to: row.to,
            supplier: row.supplier,
            currency: row.currency,
            entryFeeAdult: Number(row.entryFeeAdult) || 0,
            entryFeeKids: Number(row.entryFeeKids) || 0,
            costMarkup: Number(row.costMarkup) || 0,
            bookingType: row.bookingType as BookingType,
            termsAndConditions: row.termsAndConditions,
          }).unwrap(),
        ),
      );
      alert("Rates saved successfully!");
      router.push("/my-inventory/sightseeing/my-rates");
    } catch (err) {
      console.error("Failed to save rates:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="p-2">
        <Filter />
      </div>

      <Card className="p-3">
        {/* Action buttons */}
        <div className="d-flex align-items-center mb-3 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing")}
          >
            <Icon icon="mdi:plus" className="me-1" /> My Sightseeing
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing/my-rates")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Rates
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() =>
              router.push("/my-inventory/sightseeing/my-rates/add-rate")
            }
          >
            <Icon icon="mdi:plus" /> Add Rates
          </Button>
        </div>

        {/* City Search */}
        <Row className="mb-3 align-items-end">
          <Col md={4}>
            <Form.Label style={{ fontSize: "10px" }} className="text-primary">
              City
            </Form.Label>
            <Form.Control
              size="sm"
              style={{ fontSize: "10px" }}
              placeholder="Search city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              list="city-options"
            />
            <datalist id="city-options">
              {cities.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Col>
          <Col md={2}>
            <Button
              variant="danger"
              size="sm"
              style={{ fontSize: "10px" }}
              onClick={() => {
                const match = cities.find((c) =>
                  c.toLowerCase().includes(searchCity.toLowerCase()),
                );
                if (match) setSelectedCity(match);
                else alert("No matching city found.");
              }}
            >
              Search
            </Button>
          </Col>
          {selectedCity && (
            <Col md={6} className="d-flex align-items-end">
              <span
                style={{ fontSize: "10px" }}
                className="text-success fw-bold"
              >
                Showing: {selectedCity}
              </span>
            </Col>
          )}
        </Row>

        {/* Rates Table */}
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th>Select Sightseeing</th>
                <th>From</th>
                <th>To</th>
                <th>Supplier</th>
                <th>Currency</th>
                <th colSpan={2}>Entry Fee</th>
                <th>Cost / Markup</th>
                <th>Booking Type</th>
                <th>T &amp; C</th>
                <th>Action</th>
              </tr>
              <tr style={{ fontSize: "10px" }}>
                <th colSpan={5}></th>
                <th>Adult</th>
                <th>Kids</th>
                <th colSpan={4}></th>
              </tr>
            </thead>

            <tbody style={{ fontSize: "12px" }}>
              {rows.map((row, index) => (
                <tr key={index}>
                  {/* Select Sightseeing */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.sightseeingId}
                      onChange={(e) =>
                        updateRow(index, "sightseeingId", e.target.value)
                      }
                      disabled={!selectedCity}
                    >
                      <option value="">
                        {selectedCity ? "Select" : "Search city first"}
                      </option>
                      {sightseeings.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.sightseeingName}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* From */}
                  <td>
                    <CustomFlatpickr
                      style={{ fontSize: "12px" }}
                      className="form-control form-control-sm"
                      value={row.from}
                      onChange={(dates: Date[]) =>
                        updateRow(
                          index,
                          "from",
                          dates[0] ? dates[0].toISOString().split("T")[0] : "",
                        )
                      }
                    />
                  </td>

                  {/* To */}
                  <td>
                    <CustomFlatpickr
                      style={{ fontSize: "12px" }}
                      className="form-control form-control-sm"
                      value={row.to}
                      onChange={(dates: Date[]) =>
                        updateRow(
                          index,
                          "to",
                          dates[0] ? dates[0].toISOString().split("T")[0] : "",
                        )
                      }
                    />
                  </td>

                  {/* Supplier */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.supplier}
                      onChange={(e) =>
                        updateRow(index, "supplier", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {suppliers.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.companyName}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Currency */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.currency}
                      onChange={(e) =>
                        updateRow(index, "currency", e.target.value)
                      }
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Entry Fee Adult */}
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.entryFeeAdult}
                      onChange={(e) =>
                        updateRow(index, "entryFeeAdult", e.target.value)
                      }
                      min={0}
                      placeholder="0"
                    />
                  </td>

                  {/* Entry Fee Kids */}
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.entryFeeKids}
                      onChange={(e) =>
                        updateRow(index, "entryFeeKids", e.target.value)
                      }
                      min={0}
                      placeholder="0"
                    />
                  </td>

                  {/* Cost / Markup */}
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.costMarkup}
                      onChange={(e) =>
                        updateRow(index, "costMarkup", e.target.value)
                      }
                      min={0}
                      placeholder="0"
                    />
                  </td>

                  {/* Booking Type */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.bookingType}
                      onChange={(e) =>
                        updateRow(index, "bookingType", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="On Request">On Request</option>
                      <option value="Real Time">Real Time</option>
                    </Form.Select>
                  </td>

                  {/* T&C */}
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={row.termsAndConditions}
                      onChange={(e) =>
                        updateRow(index, "termsAndConditions", e.target.value)
                      }
                      placeholder="T&C"
                    />
                  </td>

                  {/* Action */}
                  <td>
                    {rows.length === 1 ? (
                      <Button
                        size="sm"
                        variant="danger"
                        style={{ fontSize: "12px" }}
                        onClick={addRow}
                      >
                        <Icon icon="mdi:plus" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-danger"
                        style={{ fontSize: "12px" }}
                        onClick={() => removeRow(index)}
                      >
                        <Icon icon="mdi:delete" />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save */}
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "600" }}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
            <Icon icon="mdi:reload" className="ms-1" />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddRate;
