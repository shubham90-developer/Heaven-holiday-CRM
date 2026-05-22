"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  CardHeader,
  CardBody,
  CardFooter,
} from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import AddDetailModal from "./AddDetailModal";
import { useRouter, useParams } from "next/navigation";
import {
  useGetSightseeingByIdQuery,
  useUpdateSightseeingMutation,
} from "../../../../../../Redux/sightSeeingApi"; // adjust path as needed
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ─── Types ────────────────────────────────────────────────────────────────────

type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type DifficultyLevel = "Easy" | "Moderate" | "Hard" | "Extreme";
type Season =
  | "Summer"
  | "Winter"
  | "Monsoon"
  | "Spring"
  | "Autumn"
  | "All Season";
type PopularityLevel = "Low" | "Medium" | "High" | "Very High";

interface OperatingTime {
  from: string;
  to: string;
}

interface FormState {
  country: string;
  city: string;
  sightseeingName: string;
  latitude: string;
  longitude: string;
  address: string;
  image: File | null;
  details: string;
  category: string;
  activities: string[];
  difficultyLevel: DifficultyLevel | "";
  season: Season | "";
  daysOfWeek: DayOfWeek[];
  popularity: PopularityLevel | "";
  thingsToCarry: string[];
  pickUpPoint: string;
  pickUpTime: string;
  paxMin: string;
  paxMax: string;
  durationHours: string;
  durationMinutes: string;
  allowedAgeFrom: string;
  allowedAgeTo: string;
  operatingTimes: OperatingTime[];
  otherInclusions: string;
  advisory: string;
  cancellationPolicy: string;
  refundPolicy: string;
  confirmationPolicy: string;
  termsAndConditions: string;
}

const INITIAL_FORM: FormState = {
  country: "",
  city: "",
  sightseeingName: "",
  latitude: "",
  longitude: "",
  address: "",
  image: null,
  details: "",
  category: "",
  activities: [],
  difficultyLevel: "",
  season: "",
  daysOfWeek: [],
  popularity: "",
  thingsToCarry: [],
  pickUpPoint: "",
  pickUpTime: "",
  paxMin: "",
  paxMax: "",
  durationHours: "",
  durationMinutes: "",
  allowedAgeFrom: "",
  allowedAgeTo: "",
  operatingTimes: [{ from: "15:00", to: "16:00" }],
  otherInclusions: "",
  advisory: "",
  cancellationPolicy: "",
  refundPolicy: "",
  confirmationPolicy: "",
  termsAndConditions: "",
};

const TIME_OPTIONS = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const RICH_TEXT_SECTIONS: { title: string; key: keyof FormState }[] = [
  { title: "Other Inclusions", key: "otherInclusions" },
  { title: "Advisory", key: "advisory" },
  { title: "Cancellation Policy", key: "cancellationPolicy" },
  { title: "Refund Policy", key: "refundPolicy" },
  { title: "Confirmation Policy", key: "confirmationPolicy" },
  { title: "Term & Condition's", key: "termsAndConditions" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const EditSightseeing = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  // RTK
  const { data: sightseeingData, isLoading: isFetching } =
    useGetSightseeingByIdQuery(id, { skip: !id });
  const [updateSightseeing, { isLoading: isUpdating, isError }] =
    useUpdateSightseeingMutation();

  // UI state
  const [showAddDetail, setShowAddDetail] = useState(false);
  const [detailOpen, setDetailOpen] = useState(true);
  const [otherDetailOpen, setOtherDetailOpen] = useState(false);
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  // ── Prefill form when data loads ──────────────────────────────────────────
  useEffect(() => {
    if (sightseeingData?.data) {
      const s = sightseeingData.data;
      setForm({
        country: s.country ?? "",
        city: s.city ?? "",
        sightseeingName: s.sightseeingName ?? "",
        latitude: String(s.latitude ?? ""),
        longitude: String(s.longitude ?? ""),
        address: s.address ?? "",
        image: null, // can't prefill file input
        details: s.details ?? "",
        category: s.category ?? "",
        activities: s.activities ?? [],
        difficultyLevel: (s.difficultyLevel as DifficultyLevel) ?? "",
        season: (s.season as Season) ?? "",
        daysOfWeek: (s.daysOfWeek as DayOfWeek[]) ?? [],
        popularity: (s.popularity as PopularityLevel) ?? "",
        thingsToCarry: s.thingsToCarry ?? [],
        pickUpPoint: s.pickUpPoint ?? "",
        pickUpTime: s.pickUpTime ?? "",
        paxMin: s.paxMin !== undefined ? String(s.paxMin) : "",
        paxMax: s.paxMax !== undefined ? String(s.paxMax) : "",
        durationHours: String(s.durationHours ?? ""),
        durationMinutes: String(s.durationMinutes ?? ""),
        allowedAgeFrom: String(s.allowedAgeFrom ?? ""),
        allowedAgeTo: String(s.allowedAgeTo ?? ""),
        operatingTimes: [{ from: "15:00", to: "16:00" }],
        otherInclusions: s.otherInclusions ?? "",
        advisory: s.advisory ?? "",
        cancellationPolicy: s.cancellationPolicy ?? "",
        refundPolicy: s.refundPolicy ?? "",
        confirmationPolicy: s.confirmationPolicy ?? "",
        termsAndConditions: s.termsAndConditions ?? "",
      });
    }
  }, [sightseeingData]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTextInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setField(e.target.name as keyof FormState, e.target.value as any);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setField("image", e.target.files?.[0] ?? null);

  const addOperatingTime = () =>
    setField("operatingTimes", [
      ...form.operatingTimes,
      { from: "15:00", to: "16:00" },
    ]);

  const removeOperatingTime = (index: number) =>
    setField(
      "operatingTimes",
      form.operatingTimes.filter((_, i) => i !== index),
    );

  const updateOperatingTime = (
    index: number,
    field: "from" | "to",
    value: string,
  ) =>
    setField(
      "operatingTimes",
      form.operatingTimes.map((t, i) =>
        i === index ? { ...t, [field]: value } : t,
      ),
    );

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (form.country) formData.append("country", form.country);
      if (form.city) formData.append("city", form.city);
      if (form.sightseeingName)
        formData.append("sightseeingName", form.sightseeingName);
      if (form.latitude) formData.append("latitude", form.latitude);
      if (form.longitude) formData.append("longitude", form.longitude);
      if (form.address) formData.append("address", form.address);
      if (form.image) formData.append("image", form.image);
      if (form.details) formData.append("details", form.details);
      if (form.otherInclusions)
        formData.append("otherInclusions", form.otherInclusions);
      if (form.advisory) formData.append("advisory", form.advisory);
      if (form.cancellationPolicy)
        formData.append("cancellationPolicy", form.cancellationPolicy);
      if (form.refundPolicy) formData.append("refundPolicy", form.refundPolicy);
      if (form.confirmationPolicy)
        formData.append("confirmationPolicy", form.confirmationPolicy);
      if (form.termsAndConditions)
        formData.append("termsAndConditions", form.termsAndConditions);
      if (form.category) formData.append("category", form.category);
      if (form.difficultyLevel)
        formData.append("difficultyLevel", form.difficultyLevel);
      if (form.season) formData.append("season", form.season);
      if (form.popularity) formData.append("popularity", form.popularity);
      if (form.pickUpPoint) formData.append("pickUpPoint", form.pickUpPoint);
      if (form.pickUpTime) formData.append("pickUpTime", form.pickUpTime);
      if (form.paxMin) formData.append("paxMin", form.paxMin);
      if (form.paxMax) formData.append("paxMax", form.paxMax);
      if (form.durationHours)
        formData.append("durationHours", form.durationHours);
      if (form.durationMinutes)
        formData.append("durationMinutes", form.durationMinutes);
      if (form.allowedAgeFrom)
        formData.append("allowedAgeFrom", form.allowedAgeFrom);
      if (form.allowedAgeTo) formData.append("allowedAgeTo", form.allowedAgeTo);

      form.activities.forEach((a) => formData.append("activities[]", a));
      form.daysOfWeek.forEach((d) => formData.append("daysOfWeek[]", d));
      form.thingsToCarry.forEach((t) => formData.append("thingsToCarry[]", t));

      // updatedBy — replace with actual logged-in user id from your auth store
      const updatedBy = "REPLACE_WITH_AUTH_USER_ID";
      formData.append("updatedBy", updatedBy);

      await updateSightseeing({ id, body: formData }).unwrap();
      alert("Sightseeing updated successfully!");
      router.push("/my-inventory/sightseeing");
    } catch (err) {
      console.error("Failed to update sightseeing:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────

  if (isFetching) {
    return (
      <Card className="p-3">
        <div className="text-center py-4" style={{ fontSize: "12px" }}>
          Loading...
        </div>
      </Card>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <Card className="p-3">
        {/* Action buttons */}
        <div className="d-flex align-items-center border-bottom pb-2 mb-2 gap-2 justify-content-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/sightseeing")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Sightseeing
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
            onClick={() => router.push("/my-inventory/packages/add-package")}
          >
            <Icon icon="mdi:plus" /> Add Rates
          </Button>
        </div>

        <Row>
          {/* Country */}
          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-primary" style={{ fontSize: "10px" }}>
                Country *
              </Form.Label>
              <Form.Select
                name="country"
                size="sm"
                style={{ fontSize: "10px" }}
                value={form.country}
                onChange={handleTextInput}
              >
                <option value="">Country</option>
                <option value="India">India</option>
                <option value="UAE">UAE</option>
                <option value="Sri Lanka">Sri Lanka</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* City */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                City *
              </Form.Label>
              <Form.Select
                name="city"
                size="sm"
                style={{ fontSize: "10px" }}
                value={form.city}
                onChange={handleTextInput}
              >
                <option value="">City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Sightseeing Name */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Sightseeing Name *
              </Form.Label>
              <Form.Control
                name="sightseeingName"
                size="sm"
                style={{ fontSize: "10px" }}
                value={form.sightseeingName}
                onChange={handleTextInput}
              />
              <Form.Label
                className="text-primary"
                onClick={() => setShowAddDetail(true)}
                style={{ fontSize: "10px", cursor: "pointer" }}
              >
                Get Place Detail
              </Form.Label>
            </Form.Group>
          </Col>

          {/* Latitude */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Latitude
              </Form.Label>
              <Form.Control
                name="latitude"
                size="sm"
                style={{ fontSize: "10px" }}
                value={form.latitude}
                onChange={handleTextInput}
              />
            </Form.Group>
          </Col>

          {/* Longitude */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Longitude
              </Form.Label>
              <Form.Control
                name="longitude"
                size="sm"
                style={{ fontSize: "10px" }}
                value={form.longitude}
                onChange={handleTextInput}
              />
            </Form.Group>
          </Col>

          {showAddDetail && (
            <AddDetailModal
              onClose={() => setShowAddDetail(false)}
              onApply={(name, lat, lng) => {
                setField("sightseeingName", name);
                setField("latitude", lat);
                setField("longitude", lng);
                setShowAddDetail(false);
              }}
            />
          )}

          {/* Image */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Image (Recommend size W:800px &amp; H:600px)
              </Form.Label>
              <Form.Control
                type="file"
                size="sm"
                style={{ fontSize: "10px" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              {sightseeingData?.data?.image && (
                <small className="text-muted" style={{ fontSize: "9px" }}>
                  Current: {sightseeingData.data.image.split("/").pop()}
                </small>
              )}
            </Form.Group>
          </Col>

          {/* Address */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Address
              </Form.Label>
              <Form.Control
                name="address"
                type="text"
                size="sm"
                style={{ fontSize: "10px" }}
                value={form.address}
                onChange={handleTextInput}
              />
            </Form.Group>
          </Col>

          {/* Is Unique */}
          <Col md={4}>
            <Form.Label
              className="text-primary small"
              style={{ fontSize: "10px" }}
            >
              Unique Type
            </Form.Label>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Is Unique"
                style={{ fontSize: "10px" }}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* ── Details ───────────────────────────────────────────────────────── */}
        <strong className="mt-3">More Details</strong>
        <Card className="mt-2">
          <CardHeader
            className="bg-secondary d-flex align-items-center justify-content-between p-1 px-2 text-white fw-bold"
            onClick={() => setDetailOpen(!detailOpen)}
            style={{ cursor: "pointer" }}
          >
            Details
            <Icon
              icon={detailOpen ? "mdi:minus" : "mdi:plus"}
              className="text-white fw-bold"
            />
          </CardHeader>
          {detailOpen && (
            <CardBody>
              <Col md={12}>
                <ReactQuill
                  theme="snow"
                  value={form.details}
                  onChange={(val) => setField("details", val)}
                  style={{ fontSize: "12px" }}
                />
              </Col>
            </CardBody>
          )}
        </Card>

        {/* ── Other Details ─────────────────────────────────────────────────── */}
        <Card className="mt-2">
          <CardHeader
            className="bg-secondary d-flex align-items-center justify-content-between p-1 px-2 text-white fw-bold"
            onClick={() => setOtherDetailOpen(!otherDetailOpen)}
            style={{ cursor: "pointer" }}
          >
            Other Details
            <Icon
              icon={otherDetailOpen ? "mdi:minus" : "mdi:plus"}
              className="text-white fw-bold"
            />
          </CardHeader>
          {otherDetailOpen && (
            <CardBody>
              <Row className="g-3">
                {/* Category */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Category
                    </Form.Label>
                    <Form.Select
                      name="category"
                      size="sm"
                      style={{ fontSize: "10px" }}
                      value={form.category}
                      onChange={handleTextInput}
                    >
                      <option value="">Select</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Nature">Nature</option>
                      <option value="Historical">Historical</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Activities */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Activities
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "10px" }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && !form.activities.includes(val))
                          setField("activities", [...form.activities, val]);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Hiking">Hiking</option>
                      <option value="Snorkeling">Snorkeling</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Trekking">Trekking</option>
                    </Form.Select>
                    {form.activities.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {form.activities.map((a) => (
                          <span
                            key={a}
                            className="badge bg-secondary"
                            style={{ fontSize: "9px", cursor: "pointer" }}
                            onClick={() =>
                              setField(
                                "activities",
                                form.activities.filter((x) => x !== a),
                              )
                            }
                          >
                            {a} ✕
                          </span>
                        ))}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                {/* Difficulty Level */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Difficulty Level
                    </Form.Label>
                    <Form.Select
                      name="difficultyLevel"
                      size="sm"
                      style={{ fontSize: "10px" }}
                      value={form.difficultyLevel}
                      onChange={handleTextInput}
                    >
                      <option value="">Select</option>
                      {(
                        [
                          "Easy",
                          "Moderate",
                          "Hard",
                          "Extreme",
                        ] as DifficultyLevel[]
                      ).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Season */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Season
                    </Form.Label>
                    <Form.Select
                      name="season"
                      size="sm"
                      style={{ fontSize: "10px" }}
                      value={form.season}
                      onChange={handleTextInput}
                    >
                      <option value="">Select</option>
                      {(
                        [
                          "Summer",
                          "Winter",
                          "Monsoon",
                          "Spring",
                          "Autumn",
                          "All Season",
                        ] as Season[]
                      ).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Days of Week */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Days of week
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "10px" }}
                      onChange={(e) => {
                        const val = e.target.value as DayOfWeek;
                        if (val && !form.daysOfWeek.includes(val))
                          setField("daysOfWeek", [...form.daysOfWeek, val]);
                      }}
                    >
                      <option value="">Select</option>
                      {(
                        [
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday",
                        ] as DayOfWeek[]
                      ).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </Form.Select>
                    {form.daysOfWeek.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {form.daysOfWeek.map((d) => (
                          <span
                            key={d}
                            className="badge bg-secondary"
                            style={{ fontSize: "9px", cursor: "pointer" }}
                            onClick={() =>
                              setField(
                                "daysOfWeek",
                                form.daysOfWeek.filter((x) => x !== d),
                              )
                            }
                          >
                            {d} ✕
                          </span>
                        ))}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                {/* Popularity */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Popularity
                    </Form.Label>
                    <Form.Select
                      name="popularity"
                      size="sm"
                      style={{ fontSize: "10px" }}
                      value={form.popularity}
                      onChange={handleTextInput}
                    >
                      <option value="">Select</option>
                      {(
                        [
                          "Low",
                          "Medium",
                          "High",
                          "Very High",
                        ] as PopularityLevel[]
                      ).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                {/* Things to Carry */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Things to Carry
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "10px" }}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val && !form.thingsToCarry.includes(val))
                          setField("thingsToCarry", [
                            ...form.thingsToCarry,
                            val,
                          ]);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="Water Bottle">Water Bottle</option>
                      <option value="Sunscreen">Sunscreen</option>
                      <option value="Hat">Hat</option>
                      <option value="Camera">Camera</option>
                    </Form.Select>
                    {form.thingsToCarry.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mt-1">
                        {form.thingsToCarry.map((t) => (
                          <span
                            key={t}
                            className="badge bg-secondary"
                            style={{ fontSize: "9px", cursor: "pointer" }}
                            onClick={() =>
                              setField(
                                "thingsToCarry",
                                form.thingsToCarry.filter((x) => x !== t),
                              )
                            }
                          >
                            {t} ✕
                          </span>
                        ))}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                {/* Pick up Point */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Pick up Point
                    </Form.Label>
                    <Form.Control
                      name="pickUpPoint"
                      size="sm"
                      style={{ fontSize: "10px" }}
                      value={form.pickUpPoint}
                      onChange={handleTextInput}
                    />
                  </Form.Group>
                </Col>

                {/* Pick up Time */}
                <Col md={4}>
                  <Form.Group>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Pick up Time
                    </Form.Label>
                    <Form.Control
                      name="pickUpTime"
                      size="sm"
                      style={{ fontSize: "10px" }}
                      value={form.pickUpTime}
                      onChange={handleTextInput}
                    />
                  </Form.Group>
                </Col>

                {/* Pax */}
                <Col md={4}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Pax
                  </Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: "10px" }}>Min</span>
                    <Form.Control
                      name="paxMin"
                      size="sm"
                      style={{ fontSize: "10px", width: "60px" }}
                      value={form.paxMin}
                      onChange={handleTextInput}
                    />
                    <span style={{ fontSize: "10px" }}>Max</span>
                    <Form.Control
                      name="paxMax"
                      size="sm"
                      style={{ fontSize: "10px", width: "60px" }}
                      value={form.paxMax}
                      onChange={handleTextInput}
                    />
                  </div>
                </Col>

                {/* Duration */}
                <Col md={4}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Duration
                  </Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: "10px" }}>Hours</span>
                    <Form.Control
                      name="durationHours"
                      size="sm"
                      style={{ fontSize: "10px", width: "60px" }}
                      value={form.durationHours}
                      onChange={handleTextInput}
                    />
                    <span style={{ fontSize: "10px" }}>Min</span>
                    <Form.Control
                      name="durationMinutes"
                      size="sm"
                      style={{ fontSize: "10px", width: "60px" }}
                      value={form.durationMinutes}
                      onChange={handleTextInput}
                    />
                  </div>
                </Col>

                {/* Age Group */}
                <Col md={4}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Allowed Age Group (Yrs)
                  </Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: "10px" }}>From</span>
                    <Form.Control
                      name="allowedAgeFrom"
                      size="sm"
                      style={{ fontSize: "10px", width: "60px" }}
                      value={form.allowedAgeFrom}
                      onChange={handleTextInput}
                    />
                    <span style={{ fontSize: "10px" }}>To</span>
                    <Form.Control
                      name="allowedAgeTo"
                      size="sm"
                      style={{ fontSize: "10px", width: "60px" }}
                      value={form.allowedAgeTo}
                      onChange={handleTextInput}
                    />
                  </div>
                </Col>

                {/* Operating Time */}
                <Col md={6}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Operating Time
                  </Form.Label>
                  {form.operatingTimes.map((ot, index) => (
                    <div
                      className="d-flex align-items-center gap-2 mt-1"
                      key={index}
                    >
                      <span style={{ fontSize: "10px" }}>From</span>
                      <Form.Select
                        size="sm"
                        style={{ fontSize: "10px", width: "80px" }}
                        value={ot.from}
                        onChange={(e) =>
                          updateOperatingTime(index, "from", e.target.value)
                        }
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Form.Select>
                      <span style={{ fontSize: "10px" }}>To</span>
                      <Form.Select
                        size="sm"
                        style={{ fontSize: "10px", width: "80px" }}
                        value={ot.to}
                        onChange={(e) =>
                          updateOperatingTime(index, "to", e.target.value)
                        }
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Form.Select>
                      {index === 0 ? (
                        <Button
                          size="sm"
                          variant="danger"
                          style={{ fontSize: "10px" }}
                          onClick={addOperatingTime}
                        >
                          <Icon icon="mdi:plus" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline-info"
                          style={{ fontSize: "10px" }}
                          onClick={() => removeOperatingTime(index)}
                        >
                          <Icon icon="mdi:delete" />
                        </Button>
                      )}
                    </div>
                  ))}
                </Col>
              </Row>
            </CardBody>
          )}
        </Card>

        {/* ── Rich Text Sections ────────────────────────────────────────────── */}
        {RICH_TEXT_SECTIONS.map((section, index) => (
          <Card className="mt-2" key={index}>
            <CardHeader
              className="bg-secondary d-flex align-items-center justify-content-between p-1 px-2 text-white fw-bold"
              onClick={() =>
                setOpenSectionIndex(openSectionIndex === index ? null : index)
              }
              style={{ cursor: "pointer" }}
            >
              {section.title}
              <Icon
                icon={openSectionIndex === index ? "mdi:minus" : "mdi:plus"}
                className="text-white fw-bold"
              />
            </CardHeader>
            {openSectionIndex === index && (
              <CardBody>
                <Col md={12}>
                  <ReactQuill
                    theme="snow"
                    value={form[section.key] as string}
                    onChange={(val) => setField(section.key, val)}
                    style={{ fontSize: "12px" }}
                  />
                </Col>
              </CardBody>
            )}
          </Card>
        ))}

        {isError && (
          <div className="text-danger mt-2" style={{ fontSize: "11px" }}>
            Error updating sightseeing. Please check your inputs and try again.
          </div>
        )}

        <CardFooter className="text-end">
          <Button
            variant="danger"
            size="sm"
            style={{ fontSize: "12px" }}
            onClick={handleSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EditSightseeing;
