"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Row,
  Col,
  CardHeader,
  CardBody,
} from "react-bootstrap";
import TravelersField from "./TravelersField";
import Sightseeing from "./Sightseeing";
import Miscellaneous from "./Miscellaneous";
import Hotel from "./Hotel";
import {
  useCreateQueryMutation,
  RequirementType,
} from "../../../../../../Redux/queryApi";
import { useGetAllStaffQuery } from "../../../../../../Redux/staffApi";

// ─── PROPS ────────────────────────────────────────────────────────────────────

interface NewQueryProps {
  leadId: string;
  onSuccess?: () => void;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const NewQuery = ({ leadId, onSuccess }: NewQueryProps) => {
  const [requirementType, setRequirementType] =
    useState<RequirementType>("Package");
  const [transferType, setTransferType] = useState<"Cab" | "Train">("Cab");
  const [showSelect, setShowSelect] = useState(false);

  const [createQuery, { isLoading }] = useCreateQueryMutation();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  const staffList = staffData?.data ?? [];

  // ── common header fields ─────────────────────────────────────────────────
  const [goingFrom, setGoingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [travelDate, setTravelDate] = useState("");

  // ── Package ──────────────────────────────────────────────────────────────
  const [pkgQueryType, setPkgQueryType] = useState<"FIT" | "GIT">("FIT");
  const [pkgGoingTo, setPkgGoingTo] = useState("");
  const [pkgGoingFrom, setPkgGoingFrom] = useState("");
  const [pkgSpecificDate, setPkgSpecificDate] = useState("");
  const [pkgNoOfDays, setPkgNoOfDays] = useState("");
  const [pkgTravelers, setPkgTravelers] = useState("");
  const [pkgPriceRange, setPkgPriceRange] = useState("");
  const [pkgInclusions, setPkgInclusions] = useState("");
  const [pkgTheme, setPkgTheme] = useState("");
  const [pkgHotelPref, setPkgHotelPref] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [pkgAssignToOps, setPkgAssignToOps] = useState(false);

  // ── Flight ───────────────────────────────────────────────────────────────
  const [fltTripType, setFltTripType] = useState<
    "OneWay" | "RoundTrip" | "MultiCity"
  >("OneWay");
  const [fltIsGroup, setFltIsGroup] = useState(false);
  const [fltSource, setFltSource] = useState("");
  const [fltDest, setFltDest] = useState("");
  const [fltDepDate, setFltDepDate] = useState("");
  const [fltAdults, setFltAdults] = useState(1);
  const [fltChildren, setFltChildren] = useState(0);
  const [fltInfants, setFltInfants] = useState(0);
  const [fltClass, setFltClass] = useState<
    "Economy" | "Business" | "First" | "PremiumEconomy"
  >("Economy");
  const [fltFareType, setFltFareType] = useState<
    "Regular" | "Student" | "SeniorCitizen" | "Direct"
  >("Regular");
  const [fltAirline, setFltAirline] = useState("");
  const [fltLeadSource, setFltLeadSource] = useState("");
  const [fltAssignToSales, setFltAssignToSales] = useState("");
  const [fltAssignToOps, setFltAssignToOps] = useState(false);
  const [fltRemark, setFltRemark] = useState("");

  // ── Transfer ─────────────────────────────────────────────────────────────
  const [tfrTripType, setTfrTripType] = useState<"OneWay" | "RoundTrip">(
    "OneWay",
  );
  const [tfrGoingTo, setTfrGoingTo] = useState("");
  const [tfrGoingFrom, setTfrGoingFrom] = useState("");
  const [tfrPickupDT, setTfrPickupDT] = useState("");
  const [tfrNoOfDays, setTfrNoOfDays] = useState("");
  const [tfrTravelers, setTfrTravelers] = useState("");
  const [tfrPickupLoc, setTfrPickupLoc] = useState("");
  const [tfrPreference, setTfrPreference] = useState("");
  const [tfrLeadSource, setTfrLeadSource] = useState("");
  const [tfrAssignToSales, setTfrAssignToSales] = useState("");
  const [tfrAssignToOps, setTfrAssignToOps] = useState(false);
  const [tfrRemark, setTfrRemark] = useState("");

  // ── Visa ─────────────────────────────────────────────────────────────────
  const [vsCountry, setVsCountry] = useState("");
  const [vsCategory, setVsCategory] = useState("");
  const [vsEntryType, setVsEntryType] = useState("");
  const [vsDateOfTravel, setVsDateOfTravel] = useState("");
  const [vsAdults, setVsAdults] = useState("");
  const [vsChild, setVsChild] = useState("");
  const [vsChildFamily, setVsChildFamily] = useState("");
  const [vsInfant, setVsInfant] = useState("");
  const [vsDuration, setVsDuration] = useState("");
  const [vsNationality, setVsNationality] = useState("India");
  const [vsLeadSource, setVsLeadSource] = useState("");
  const [vsAssignToSales, setVsAssignToSales] = useState("");
  const [vsAssignToOps, setVsAssignToOps] = useState(false);
  const [vsRemark, setVsRemark] = useState("");

  // ── SAVE HANDLERS (one per requirementType) ──────────────────────────────

  const handleSavePackage = async () => {
    const result = await createQuery({
      lead: leadId,
      requirementType: "Package",
      goingFrom,
      goingTo,
      travelDate: travelDate || undefined,
      packageInfo: {
        queryType: pkgQueryType,
        goingTo: pkgGoingTo || null,
        goingFrom: pkgGoingFrom || null,
        specificDate: pkgSpecificDate || null,
        noOfDays: pkgNoOfDays ? Number(pkgNoOfDays) : null,
        travelers: pkgTravelers ? Number(pkgTravelers) : null,
        priceRange: pkgPriceRange || null,
        inclusions: pkgInclusions || null,
        theme: pkgTheme || null,
        hotelPreference: pkgHotelPref,
        assignToOps: pkgAssignToOps,
      },
    });
    if ("data" in result) onSuccess?.();
  };

  const handleSaveFlight = async () => {
    const result = await createQuery({
      lead: leadId,
      requirementType: "Flight",
      goingFrom,
      goingTo,
      travelDate: travelDate || undefined,
      flightInfo: {
        tripType: fltTripType,
        isGroup: fltIsGroup,
        sourceCity: fltSource || null,
        destinationCity: fltDest || null,
        departureDate: fltDepDate || null,
        adults: fltAdults,
        children: fltChildren,
        infants: fltInfants,
        class: fltClass,
        fareType: fltFareType,
        preferredAirline: fltAirline || null,
        leadSource: fltLeadSource || null,
        assignToSales: fltAssignToSales || null,
        assignToOps: fltAssignToOps,
        addRemark: fltRemark || null,
      },
    });
    if ("data" in result) onSuccess?.();
  };

  const handleSaveTransfer = async () => {
    const result = await createQuery({
      lead: leadId,
      requirementType: "Transfer",
      goingFrom,
      goingTo,
      travelDate: travelDate || undefined,
      transferInfo: {
        mode: transferType,
        tripType: tfrTripType,
        goingTo: tfrGoingTo || null,
        goingFrom: tfrGoingFrom || null,
        pickupDateTime: tfrPickupDT || null,
        noOfDays: tfrNoOfDays ? Number(tfrNoOfDays) : null,
        travelers: tfrTravelers ? Number(tfrTravelers) : null,
        pickupLocation: tfrPickupLoc || null,
        preference: tfrPreference || null,
        leadSource: tfrLeadSource || null,
        assignToSales: tfrAssignToSales || null,
        assignToOps: tfrAssignToOps,
        addRemark: tfrRemark || null,
      },
    });
    if ("data" in result) onSuccess?.();
  };

  const handleSaveVisa = async () => {
    const result = await createQuery({
      lead: leadId,
      requirementType: "Visa",
      goingFrom,
      goingTo,
      travelDate: travelDate || undefined,
      visaInfo: {
        country: vsCountry || null,
        visaCategory: vsCategory || null,
        entryType: vsEntryType || null,
        dateOfTravel: vsDateOfTravel || null,
        adults: vsAdults ? Number(vsAdults) : null,
        child: vsChild ? Number(vsChild) : null,
        childWithFamily: vsChildFamily ? Number(vsChildFamily) : null,
        infant: vsInfant ? Number(vsInfant) : null,
        duration: vsDuration || null,
        nationality: vsNationality,
        leadSource: vsLeadSource || null,
        assignToSales: vsAssignToSales || null,
        assignToOps: vsAssignToOps,
        addRemark: vsRemark || null,
      },
    });
    if ("data" in result) onSuccess?.();
  };

  // Hotel / Sightseeing / Miscellaneous handle their own save internally
  // (they receive leadId + onSuccess as props)

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Card>
        <CardHeader>
          <div className="bg-dark p-2 mb-2">
            <h6 className="text-white mb-0">New Query</h6>
          </div>
          <Form.Group className="mb-2">
            <Form.Label style={{ fontSize: "12px" }}>
              Requirement Type
            </Form.Label>
            <div className="d-flex gap-2 mb-0" style={{ fontSize: "12px" }}>
              {(
                [
                  "Package",
                  "Flight",
                  "Transfer",
                  "Visa",
                  "Hotel",
                  "Sightseeing",
                  "Miscellaneous",
                ] as RequirementType[]
              ).map((item) => (
                <Form.Check
                  key={item}
                  type="radio"
                  label={item}
                  value={item}
                  checked={requirementType === item}
                  onChange={(e) =>
                    setRequirementType(e.target.value as RequirementType)
                  }
                />
              ))}
            </div>
          </Form.Group>
        </CardHeader>

        <CardBody className="border">
          <h6 style={{ fontSize: "12px" }}>Lead Info:</h6>

          {/* ── Common header bar ── */}
          <div
            className="d-flex justify-content-between border p-1 mb-2"
            style={{ fontSize: "12px" }}
          >
            <div>
              <strong>Going From : </strong>
              <input
                className="border-0 border-bottom"
                style={{ fontSize: "12px", width: "100px", outline: "none" }}
                value={goingFrom}
                onChange={(e) => setGoingFrom(e.target.value)}
              />
            </div>
            <div>
              <strong>Going To : </strong>
              <input
                className="border-0 border-bottom"
                style={{ fontSize: "12px", width: "100px", outline: "none" }}
                value={goingTo}
                onChange={(e) => setGoingTo(e.target.value)}
              />
            </div>
            <div />
            <div>
              <strong>Travel Date: </strong>
              <input
                type="date"
                className="border-0 border-bottom"
                style={{ fontSize: "12px", outline: "none" }}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </div>
          </div>

          {/* ── PACKAGE ── */}
          {requirementType === "Package" && (
            <Form>
              <Row className="mb-2">
                <Col md={12}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Query Type
                  </Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="radio"
                      label="FIT (Normal)"
                      name="pkgType"
                      className="me-2"
                      style={{ fontSize: "12px" }}
                      checked={pkgQueryType === "FIT"}
                      onChange={() => setPkgQueryType("FIT")}
                    />
                    <Form.Check
                      type="radio"
                      label="GIT Group"
                      name="pkgType"
                      style={{ fontSize: "12px" }}
                      checked={pkgQueryType === "GIT"}
                      onChange={() => setPkgQueryType("GIT")}
                    />
                  </div>
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Going To
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pkgGoingTo}
                    onChange={(e) => setPkgGoingTo(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Going From
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pkgGoingFrom}
                    onChange={(e) => setPkgGoingFrom(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Specific Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pkgSpecificDate}
                    onChange={(e) => setPkgSpecificDate(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    No of Days
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pkgNoOfDays}
                    onChange={(e) => setPkgNoOfDays(e.target.value)}
                  />
                </Col>

                <TravelersField
                  value={pkgTravelers}
                  onChange={setPkgTravelers}
                />

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Price Range
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pkgPriceRange}
                    onChange={(e) => setPkgPriceRange(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Inclusions
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pkgInclusions}
                    onChange={(e) => setPkgInclusions(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Hotel</option>
                    <option>Flight</option>
                    <option>Transfer</option>
                    <option>Sightseeing</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Theme
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pkgTheme}
                    onChange={(e) => setPkgTheme(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Adventure</option>
                    <option>Honeymoon</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Hotel Preference
                  </Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    {([1, 2, 3, 4, 5] as const).map((n) => (
                      <Form.Check
                        key={n}
                        type="radio"
                        label={String(n)}
                        name="hotelPref"
                        style={{ fontSize: "12px" }}
                        checked={pkgHotelPref === n}
                        onChange={() => setPkgHotelPref(n)}
                      />
                    ))}
                  </div>
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Assign To Ops
                  </Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Check
                      type="checkbox"
                      style={{ fontSize: "12px" }}
                      checked={pkgAssignToOps}
                      onChange={(e) => {
                        setShowSelect(e.target.checked);
                        setPkgAssignToOps(e.target.checked);
                      }}
                    />
                    {showSelect && (
                      <Form.Select size="sm" style={{ fontSize: "12px" }}>
                        <option value="">Select</option>
                        {staffList.map((s: any) => (
                          <option key={s._id} value={s._id}>
                            {s.firstName} {s.lastName}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="text-end mt-3">
                <Button
                  variant="danger"
                  size="sm"
                  style={{ fontSize: "12px" }}
                  disabled={isLoading}
                  onClick={handleSavePackage}
                >
                  {isLoading ? "Saving..." : "Save & Continue"}
                </Button>
              </div>
            </Form>
          )}

          {/* ── FLIGHT ── */}
          {requirementType === "Flight" && (
            <Form>
              <Row className="mb-2 mt-2">
                <Col md={6}>
                  <div className="d-flex gap-3 mb-3">
                    {(["OneWay", "RoundTrip", "MultiCity"] as const).map(
                      (t) => (
                        <Form.Check
                          key={t}
                          type="radio"
                          label={
                            t === "OneWay"
                              ? "One Way"
                              : t === "RoundTrip"
                                ? "Round Trip"
                                : "Multi City"
                          }
                          name="flightType"
                          style={{ fontSize: "12px" }}
                          checked={fltTripType === t}
                          onChange={() => setFltTripType(t)}
                        />
                      ),
                    )}
                  </div>
                </Col>
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    style={{ fontSize: "12px" }}
                    label="Group"
                    className="ms-auto"
                    checked={fltIsGroup}
                    onChange={(e) => setFltIsGroup(e.target.checked)}
                  />
                </Col>

                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Select Source City
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={fltSource}
                      onChange={(e) => setFltSource(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Select Destination City
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={fltDest}
                      onChange={(e) => setFltDest(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md={6}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Departure Date *
                    </Form.Label>
                    <Form.Control
                      type="date"
                      size="sm"
                      value={fltDepDate}
                      onChange={(e) => setFltDepDate(e.target.value)}
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      ADULTS (+12 YRS)
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      value={fltAdults}
                      onChange={(e) => setFltAdults(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      CHILD (2-11 YRS)
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      value={fltChildren}
                      onChange={(e) => setFltChildren(Number(e.target.value))}
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      INFANT (0-2 YRS)
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      value={fltInfants}
                      onChange={(e) => setFltInfants(Number(e.target.value))}
                    >
                      {[0, 1, 2].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md={6}>
                    <div className="d-flex gap-3 mb-2">
                      {(["Regular", "Student", "SeniorCitizen"] as const).map(
                        (t) => (
                          <Form.Check
                            key={t}
                            type="radio"
                            label={
                              t === "SeniorCitizen"
                                ? "Senior Citizen Fares"
                                : `${t} Fares`
                            }
                            name="fareType"
                            style={{ fontSize: "12px" }}
                            checked={fltFareType === t}
                            onChange={() => setFltFareType(t)}
                          />
                        ),
                      )}
                      <Form.Check
                        type="checkbox"
                        style={{ fontSize: "12px" }}
                        label="Direct Flight"
                        checked={fltFareType === "Direct"}
                        onChange={(e) =>
                          setFltFareType(
                            e.target.checked ? "Direct" : "Regular",
                          )
                        }
                      />
                    </div>
                  </Col>
                  <Col md={2}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Class
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={fltClass}
                      onChange={(e) => setFltClass(e.target.value as any)}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First</option>
                      <option value="PremiumEconomy">Premium Economy</option>
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Preferred Airline
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={fltAirline}
                      onChange={(e) => setFltAirline(e.target.value)}
                    >
                      <option value="">None selected</option>
                      <option>Indigo</option>
                      <option>Air India</option>
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Lead Source
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={fltLeadSource}
                      onChange={(e) => setFltLeadSource(e.target.value)}
                    >
                      <option value="">Select</option>
                      {staffList.map((s: any) => (
                        <option key={s._id} value={s._id}>
                          {s.firstName} {s.lastName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md={3}>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Assign To Sales
                    </Form.Label>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={fltAssignToSales}
                      onChange={(e) => setFltAssignToSales(e.target.value)}
                    >
                      <option value="">Self</option>
                      {staffList.map((s: any) => (
                        <option key={s._id} value={s._id}>
                          {s.firstName} {s.lastName}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={3}>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Assign To Ops
                    </Form.Label>
                    <div className="d-flex gap-2">
                      <Form.Check
                        type="checkbox"
                        style={{ fontSize: "12px" }}
                        checked={fltAssignToOps}
                        onChange={(e) => {
                          setShowSelect(e.target.checked);
                          setFltAssignToOps(e.target.checked);
                        }}
                      />
                      {showSelect && (
                        <Form.Select size="sm">
                          <option value="">Select</option>
                          {staffList.map((s: any) => (
                            <option key={s._id} value={s._id}>
                              {s.firstName} {s.lastName}
                            </option>
                          ))}
                        </Form.Select>
                      )}
                    </div>
                  </Col>
                  <Col md={4}>
                    <Form.Label
                      className="text-primary"
                      style={{ fontSize: "10px" }}
                    >
                      Add Remark
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      size="sm"
                      value={fltRemark}
                      onChange={(e) => setFltRemark(e.target.value)}
                    />
                  </Col>
                </Row>

                <div className="text-end">
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={isLoading}
                    onClick={handleSaveFlight}
                  >
                    {isLoading ? "Saving..." : "Save & Continue"}
                  </Button>
                </div>
              </Row>
            </Form>
          )}

          {/* ── TRANSFER ── */}
          {requirementType === "Transfer" && (
            <Form>
              <Row className="mb-2 mt-2">
                <Col md={6}>
                  <div className="d-flex gap-3 mb-3">
                    {(["Cab", "Train"] as const).map((item) => (
                      <Form.Check
                        key={item}
                        type="radio"
                        label={item}
                        value={item}
                        checked={transferType === item}
                        onChange={(e) =>
                          setTransferType(e.target.value as "Cab" | "Train")
                        }
                      />
                    ))}
                  </div>
                </Col>

                {/* ── CAB ── */}
                {transferType === "Cab" && (
                  <div>
                    <Row>
                      <Col md={12}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Query Type
                        </Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="radio"
                            label="One Way"
                            name="tfrType"
                            className="me-2"
                            style={{ fontSize: "12px" }}
                            checked={tfrTripType === "OneWay"}
                            onChange={() => setTfrTripType("OneWay")}
                          />
                          <Form.Check
                            type="radio"
                            label="Round Trip"
                            name="tfrType"
                            style={{ fontSize: "12px" }}
                            checked={tfrTripType === "RoundTrip"}
                            onChange={() => setTfrTripType("RoundTrip")}
                          />
                        </div>
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Going To
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrGoingTo}
                          onChange={(e) => setTfrGoingTo(e.target.value)}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Going From
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrGoingFrom}
                          onChange={(e) => setTfrGoingFrom(e.target.value)}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Pickup & Date Time
                        </Form.Label>
                        <Form.Control
                          type="date"
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrPickupDT}
                          onChange={(e) => setTfrPickupDT(e.target.value)}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          No of Days
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrNoOfDays}
                          onChange={(e) => setTfrNoOfDays(e.target.value)}
                        />
                      </Col>
                      <TravelersField
                        value={tfrTravelers}
                        onChange={setTfrTravelers}
                      />
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Travelers
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrTravelers}
                          onChange={(e) => setTfrTravelers(e.target.value)}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Pickup Location
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrPickupLoc}
                          onChange={(e) => setTfrPickupLoc(e.target.value)}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Preference
                        </Form.Label>
                        <Form.Select
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrPreference}
                          onChange={(e) => setTfrPreference(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option>Luxury</option>
                          <option>Standard</option>
                          <option>SUV</option>
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Lead Source
                        </Form.Label>
                        <Form.Select
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrLeadSource}
                          onChange={(e) => setTfrLeadSource(e.target.value)}
                        >
                          <option value="">Select</option>
                          <option>Agency</option>
                          <option>Website</option>
                          <option>Facebook</option>
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Add Remark
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrRemark}
                          onChange={(e) => setTfrRemark(e.target.value)}
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Assign to Sales
                        </Form.Label>
                        <Form.Select
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrAssignToSales}
                          onChange={(e) => setTfrAssignToSales(e.target.value)}
                        >
                          <option value="">Self</option>
                          {staffList.map((s: any) => (
                            <option key={s._id} value={s._id}>
                              {s.firstName} {s.lastName}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Assign To Ops
                        </Form.Label>
                        <div className="d-flex gap-2">
                          <Form.Check
                            type="checkbox"
                            style={{ fontSize: "12px" }}
                            checked={tfrAssignToOps}
                            onChange={(e) => {
                              setShowSelect(e.target.checked);
                              setTfrAssignToOps(e.target.checked);
                            }}
                          />
                          {showSelect && (
                            <Form.Select size="sm" style={{ fontSize: "12px" }}>
                              <option value="">Select</option>
                              {staffList.map((s: any) => (
                                <option key={s._id} value={s._id}>
                                  {s.firstName} {s.lastName}
                                </option>
                              ))}
                            </Form.Select>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="text-end mt-2">
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={isLoading}
                        onClick={handleSaveTransfer}
                      >
                        {isLoading ? "Saving..." : "Save & Continue"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* ── TRAIN (uses same transferInfo, mode=Train) ── */}
                {transferType === "Train" && (
                  <div>
                    <Row>
                      <Col md={12}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Query Type
                        </Form.Label>
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="radio"
                            label="One Way"
                            name="tfrTrainType"
                            className="me-2"
                            style={{ fontSize: "12px" }}
                            checked={tfrTripType === "OneWay"}
                            onChange={() => setTfrTripType("OneWay")}
                          />
                          <Form.Check
                            type="radio"
                            label="Round Trip"
                            name="tfrTrainType"
                            style={{ fontSize: "12px" }}
                            checked={tfrTripType === "RoundTrip"}
                            onChange={() => setTfrTripType("RoundTrip")}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          From
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrGoingFrom}
                          onChange={(e) => setTfrGoingFrom(e.target.value)}
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          To
                        </Form.Label>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrGoingTo}
                          onChange={(e) => setTfrGoingTo(e.target.value)}
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Departure Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrPickupDT}
                          onChange={(e) => setTfrPickupDT(e.target.value)}
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          ADULTS (+12 YEARS)
                        </Form.Label>
                        <Form.Select size="sm" style={{ fontSize: "12px" }}>
                          <option>1</option>
                          <option>2</option>
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          CHILD (2-11 YEARS)
                        </Form.Label>
                        <Form.Select size="sm" style={{ fontSize: "12px" }}>
                          <option>0</option>
                          <option>1</option>
                          <option>3</option>
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          INFANT (0-2 YEARS)
                        </Form.Label>
                        <Form.Select size="sm" style={{ fontSize: "12px" }}>
                          <option>0</option>
                          <option>1</option>
                          <option>3</option>
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          CLASSES
                        </Form.Label>
                        <Form.Select size="sm" style={{ fontSize: "12px" }}>
                          <option>AC First Class (1A)</option>
                          <option>ALL CLASSES</option>
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Category
                        </Form.Label>
                        <Form.Select size="sm" style={{ fontSize: "12px" }}>
                          <option>General</option>
                          <option>Tatkal</option>
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Assign to Sales
                        </Form.Label>
                        <Form.Select
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={tfrAssignToSales}
                          onChange={(e) => setTfrAssignToSales(e.target.value)}
                        >
                          <option value="">Self</option>
                          {staffList.map((s: any) => (
                            <option key={s._id} value={s._id}>
                              {s.firstName} {s.lastName}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                      <Col md={4}>
                        <Form.Label
                          style={{ fontSize: "10px" }}
                          className="text-primary"
                        >
                          Assign To Ops
                        </Form.Label>
                        <div className="d-flex gap-2">
                          <Form.Check
                            type="checkbox"
                            style={{ fontSize: "12px" }}
                            checked={tfrAssignToOps}
                            onChange={(e) => {
                              setShowSelect(e.target.checked);
                              setTfrAssignToOps(e.target.checked);
                            }}
                          />
                          {showSelect && (
                            <Form.Select size="sm" style={{ fontSize: "12px" }}>
                              <option value="">Select</option>
                              {staffList.map((s: any) => (
                                <option key={s._id} value={s._id}>
                                  {s.firstName} {s.lastName}
                                </option>
                              ))}
                            </Form.Select>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="text-end">
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={isLoading}
                        onClick={handleSaveTransfer}
                      >
                        {isLoading ? "Saving..." : "Save & Continue"}
                      </Button>
                    </div>
                  </div>
                )}
              </Row>
            </Form>
          )}

          {/* ── VISA ── */}
          {requirementType === "Visa" && (
            <Form>
              <Row className="mt-2">
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Country *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={vsCountry}
                    onChange={(e) => setVsCountry(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Visa Category *
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={vsCategory}
                    onChange={(e) => setVsCategory(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Tourism</option>
                    <option>Business</option>
                    <option>Student</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Entry Type
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={vsEntryType}
                    onChange={(e) => setVsEntryType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Single Entry</option>
                    <option>Multi Entry</option>
                    <option>Double Entry</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Date of Travel *
                  </Form.Label>
                  <Form.Control
                    type="date"
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={vsDateOfTravel}
                    onChange={(e) => setVsDateOfTravel(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Adult
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    value={vsAdults}
                    onChange={(e) => setVsAdults(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Child
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    value={vsChild}
                    onChange={(e) => setVsChild(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Child With Family
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    value={vsChildFamily}
                    onChange={(e) => setVsChildFamily(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Infant
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    value={vsInfant}
                    onChange={(e) => setVsInfant(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Duration
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    value={vsDuration}
                    onChange={(e) => setVsDuration(e.target.value)}
                  />
                </Col>
                <Col md={2}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Nationality *
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={vsNationality}
                    onChange={(e) => setVsNationality(e.target.value)}
                  >
                    <option>India</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Lead Source *
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={vsLeadSource}
                    onChange={(e) => setVsLeadSource(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Website</option>
                    <option>Agency</option>
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Add Remark
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    size="sm"
                    value={vsRemark}
                    onChange={(e) => setVsRemark(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Assign To Sales
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    value={vsAssignToSales}
                    onChange={(e) => setVsAssignToSales(e.target.value)}
                  >
                    <option value="">Self</option>
                    {staffList.map((s: any) => (
                      <option key={s._id} value={s._id}>
                        {s.firstName} {s.lastName}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "10px" }}
                  >
                    Assign To Ops
                  </Form.Label>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Check
                      type="checkbox"
                      checked={vsAssignToOps}
                      onChange={(e) => {
                        setShowSelect(e.target.checked);
                        setVsAssignToOps(e.target.checked);
                      }}
                    />
                    {showSelect && (
                      <Form.Select size="sm">
                        <option value="">Select</option>
                        {staffList.map((s: any) => (
                          <option key={s._id} value={s._id}>
                            {s.firstName} {s.lastName}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  </div>
                </Col>
                <div className="text-end mt-2">
                  <Button
                    variant="danger"
                    size="sm"
                    disabled={isLoading}
                    onClick={handleSaveVisa}
                  >
                    {isLoading ? "Saving..." : "Save Query"}
                  </Button>
                </div>
              </Row>
            </Form>
          )}

          {/* Hotel / Sightseeing / Miscellaneous — pass leadId + onSuccess down */}
          {requirementType === "Hotel" && (
            <Hotel leadId={leadId} onSuccess={onSuccess} />
          )}
          {requirementType === "Sightseeing" && (
            <Sightseeing leadId={leadId} onSuccess={onSuccess} />
          )}
          {requirementType === "Miscellaneous" && (
            <Miscellaneous leadId={leadId} onSuccess={onSuccess} />
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default NewQuery;
