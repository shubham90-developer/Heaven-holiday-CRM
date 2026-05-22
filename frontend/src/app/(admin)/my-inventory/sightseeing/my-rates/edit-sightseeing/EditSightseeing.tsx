"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useParams } from "next/navigation";
import CustomFlatpickr from "@/components/CustomFlatpickr";
import AddCostModal from "./AddCostModal";
import AddPoliciesModal from "./AddPoliciesModal";
import {
  useGetSightseeingRateByIdQuery,
  useUpdateSightseeingRateMutation,
  useGetSightseeingCitiesQuery,
  useGetSightseeingsByCityQuery,
  ISightseeingOption,
  IUpdateSightseeingRate,
} from "../../../../../../../Redux/ratesApi";
import { useGetAllSuppliersQuery } from "../../../../../../../Redux/supplierApi";

// ─── Types ─────────────────────────────────────────────────────────────────────

type BookingType = "On Request" | "Real Time";

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

// ─── Component ─────────────────────────────────────────────────────────────────

const EditSightseeing = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [addcost, setShowAddCost] = useState(false);
  const [addpolicies, setAddPolicies] = useState(false);

  // ── Form state ──────────────────────────────────────────────────────────────
  const [selectedCity, setSelectedCity] = useState("");
  const [sightseeingId, setSightseeingId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [supplier, setSupplier] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [entryFeeAdult, setEntryFeeAdult] = useState("");
  const [entryFeeKids, setEntryFeeKids] = useState("");
  const [costMarkup, setCostMarkup] = useState("");
  const [bookingType, setBookingType] = useState<BookingType | "">("");
  const [termsAndConditions, setTermsAndConditions] = useState("");

  // ── RTK queries ─────────────────────────────────────────────────────────────
  const { data: rateData, isLoading: rateLoading } =
    useGetSightseeingRateByIdQuery(id, { skip: !id });

  const { data: citiesData } = useGetSightseeingCitiesQuery();

  const { data: sightseeingsData } = useGetSightseeingsByCityQuery(
    selectedCity,
    { skip: !selectedCity },
  );

  const { data: suppliersData } = useGetAllSuppliersQuery({
    status: "active",
    limit: 100,
  });

  const [updateRate, { isLoading: isUpdating }] =
    useUpdateSightseeingRateMutation();

  const cities: string[] = citiesData?.data ?? [];
  const sightseeings: ISightseeingOption[] = sightseeingsData?.data ?? [];
  const suppliers = suppliersData?.data ?? [];

  // ── Populate form from fetched rate ─────────────────────────────────────────
  useEffect(() => {
    if (rateData?.data) {
      const r = rateData.data;
      setSelectedCity(r.city ?? "");
      setSightseeingId(
        typeof r.sightseeingId === "object"
          ? r.sightseeingId._id
          : r.sightseeingId,
      );
      setFrom(r.from ? r.from.split("T")[0] : "");
      setTo(r.to ? r.to.split("T")[0] : "");
      setSupplier(typeof r.supplier === "object" ? r.supplier._id : r.supplier);
      setCurrency(r.currency ?? "INR");
      setEntryFeeAdult(String(r.entryFeeAdult ?? 0));
      setEntryFeeKids(String(r.entryFeeKids ?? 0));
      setCostMarkup(String(r.costMarkup ?? 0));
      setBookingType(r.bookingType ?? "");
      setTermsAndConditions(r.termsAndConditions ?? "");
    }
  }, [rateData]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if (!sightseeingId || !from || !to || !supplier || !bookingType) {
      alert("Please fill in Sightseeing, From, To, Supplier and Booking Type.");
      return;
    }

    const body: IUpdateSightseeingRate = {
      sightseeingId,
      city: selectedCity,
      from,
      to,
      supplier,
      currency,
      entryFeeAdult: Number(entryFeeAdult) || 0,
      entryFeeKids: Number(entryFeeKids) || 0,
      costMarkup: Number(costMarkup) || 0,
      bookingType: bookingType as BookingType,
      termsAndConditions,
    };

    try {
      await updateRate({ id, body }).unwrap();
      alert("Rate updated successfully!");
      router.push("/my-inventory/sightseeing/my-rates");
    } catch (err) {
      console.error("Failed to update rate:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <Card className="p-3">
        {/* right side */}
        <div className="d-flex align-items-center mb-3 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() =>
              router.push("/my-inventory/sightseeing/add-sightseeing")
            }
          >
            <Icon icon="mdi:plus" className="me-1" /> Add Sightseeing
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

        {/* Loading */}
        {rateLoading && (
          <div className="text-center py-3" style={{ fontSize: "12px" }}>
            Loading rate...
          </div>
        )}

        {!rateLoading && (
          <div className="table-responsive">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th>Sightseeing Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Supplier</th>
                  <th>Currency</th>
                  <th>Entry Cost</th>
                  <th>Manage Cost</th>
                  <th>Booking Type</th>
                  <th>T &amp; C</th>
                  <th>DOW</th>
                  <th>Action</th>
                </tr>
                <tr style={{ fontSize: "10px" }}>
                  <th colSpan={5}></th>
                  <th>Adult</th>
                  <th>Kids</th>
                  <th colSpan={5}></th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                <tr>
                  {/* Sightseeing Name — select driven by city */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={sightseeingId}
                      onChange={(e) => setSightseeingId(e.target.value)}
                    >
                      {/* Show current name as first option if sightseeings haven't loaded yet */}
                      {sightseeings.length === 0 && rateData?.data && (
                        <option value={sightseeingId}>
                          {typeof rateData.data.sightseeingId === "object"
                            ? rateData.data.sightseeingId.sightseeingName
                            : sightseeingId}
                        </option>
                      )}
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
                      value={from}
                      onChange={(dates: Date[]) =>
                        setFrom(
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
                      value={to}
                      onChange={(dates: Date[]) =>
                        setTo(
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
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
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
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
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
                      value={entryFeeAdult}
                      onChange={(e) => setEntryFeeAdult(e.target.value)}
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
                      value={entryFeeKids}
                      onChange={(e) => setEntryFeeKids(e.target.value)}
                      min={0}
                      placeholder="0"
                    />
                  </td>

                  {/* Manage Cost — AddCostModal trigger (costMarkup) */}
                  <td>
                    <span
                      className="text-primary"
                      onClick={() => setShowAddCost(true)}
                      style={{ cursor: "pointer", fontSize: "12px" }}
                    >
                      {costMarkup ? `₹${costMarkup}` : "Click to add"}
                    </span>
                    {addcost && (
                      <AddCostModal onClose={() => setShowAddCost(false)} />
                    )}
                  </td>

                  {/* Booking Type */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={bookingType}
                      onChange={(e) =>
                        setBookingType(e.target.value as BookingType)
                      }
                    >
                      <option value="">Select</option>
                      <option value="On Request">On Request</option>
                      <option value="Real Time">Real Time</option>
                    </Form.Select>
                  </td>

                  {/* T&C — AddPoliciesModal trigger */}
                  <td>
                    <span
                      className="text-primary"
                      onClick={() => setAddPolicies(true)}
                      style={{ cursor: "pointer", fontSize: "12px" }}
                    >
                      {termsAndConditions ? "Edit" : "Manage"}
                    </span>
                    {addpolicies && (
                      <AddPoliciesModal onClose={() => setAddPolicies(false)} />
                    )}
                  </td>

                  {/* DOW */}
                  <td>
                    <Form.Check style={{ fontSize: "12px" }} />
                  </td>

                  {/* Action */}
                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      style={{ fontSize: "12px" }}
                      onClick={handleUpdate}
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Saving..." : "Update"}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="primary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "600" }}
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
            <Icon icon="mdi:reload" className="ms-1" />
          </Button>
        </div>
      </Card>
    </>
  );
};

export default EditSightseeing;
