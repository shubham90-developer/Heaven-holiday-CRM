"use client";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useCreateTransportRouteMutation } from "../../../../../../Redux/transportRateApi";
import type {
  TransportCategory,
  TransportType,
  VehicleCostType,
  PointToPointSubType,
  PerDayScopeType,
  ISeason,
} from "../../../../../../Redux/transportRateApi";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ICityRow {
  citiesIncluded: string;
  noOfDays: string;
  destinationsCovered: string;
  sightseeingCovered: string;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const defaultCity: ICityRow = {
  citiesIncluded: "",
  noOfDays: "",
  destinationsCovered: "",
  sightseeingCovered: "",
};

const defaultSeason: ISeason = {
  from: "",
  to: "",
  markUpType: "Fixed %",
  b2c: 0,
  b2b: 0,
};

// ── Maps ──────────────────────────────────────────────────────────────────────

const subTypeMap: Record<string, PointToPointSubType> = {
  "Local/City / Tour Transfer": "local_city_tour",
  "Airport Transfer": "airport_transfer",
  "Railway Station Transfer": "railway_station_transfer",
  "Bus Stand Transfer": "bus_stand_transfer",
  "Port Transfer": "port_transfer",
  "Meal Transfer": "meal_transfer",
};

const categoryMap: Record<string, TransportCategory> = {
  "Itinerary Transport": "itinerary",
  "Point to Point Transfers": "point_to_point",
  "SIC (Ferry Transfer)": "sic",
  "Per Day Cost": "per_day",
};

// ── Component ─────────────────────────────────────────────────────────────────

const AddRoute = () => {
  const router = useRouter();
  const [createTransportRoute, { isLoading }] =
    useCreateTransportRouteMutation();

  // UI state
  const [transportcategory, setTransportCategory] = useState(
    "Itinerary Transport",
  );
  const [region, setRegion] = useState("State");

  // Form fields
  const [subTypes, setSubTypes] = useState<PointToPointSubType[]>([]);
  const [transportType, setTransportType] = useState<TransportType>("one_way");
  const [startCity, setStartCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [routeName, setRouteName] = useState("");
  const [description, setDescription] = useState("");
  const [pickupPointArea, setPickupPointArea] = useState("");
  const [dropPointArea, setDropPointArea] = useState("");
  const [forWithHotelBYO, setForWithHotelBYO] = useState(""); // FIX 4
  const [forLandOnlyBYO, setForLandOnlyBYO] = useState(""); // FIX 4
  const [perDayScopeValue, setPerDayScopeValue] = useState("");
  const [vehicleCostType, setVehicleCostType] =
    useState<VehicleCostType>("normal");
  const [currency, setCurrency] = useState("INR");
  const [isWebsite, setIsWebsite] = useState(false);

  // Dynamic rows
  const [cityRows, setCityRows] = useState<ICityRow[]>([{ ...defaultCity }]);
  const [firstSeason, setFirstSeason] = useState<ISeason>({ ...defaultSeason });
  const [extraSeasons, setExtraSeasons] = useState<ISeason[]>([]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSubTypeChange = (label: string, checked: boolean) => {
    const value = subTypeMap[label];
    setSubTypes((prev) =>
      checked ? [...prev, value] : prev.filter((s) => s !== value),
    );
  };

  const handleCityChange = (
    index: number,
    field: keyof ICityRow,
    value: string,
  ) => {
    setCityRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const addCityRow = () => setCityRows((prev) => [...prev, { ...defaultCity }]);

  // FIX 2: guard — can't remove last row
  const removeCityRow = (index: number) => {
    if (cityRows.length === 1) return;
    setCityRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFirstSeasonChange = (
    field: keyof ISeason,
    value: string | number,
  ) => setFirstSeason((prev) => ({ ...prev, [field]: value }));

  const handleExtraSeasonChange = (
    index: number,
    field: keyof ISeason,
    value: string | number,
  ) =>
    setExtraSeasons((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );

  const addExtraSeason = () =>
    setExtraSeasons((prev) => [...prev, { ...defaultSeason }]);

  const removeExtraSeason = (index: number) =>
    setExtraSeasons((prev) => prev.filter((_, i) => i !== index));

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSave = async () => {
    try {
      const category = categoryMap[transportcategory];
      const allSeasons = [firstSeason, ...extraSeasons];

      const payload: any = {
        category,
        vehicleCostType,
        currency,
        seasons: allSeasons,
        isWebsite,
        description,
        subTypes,
      };

      if (category !== "per_day") {
        payload.transportType = transportType;
        payload.startCity = startCity;
        payload.destinationCity = destinationCity;
        payload.routeName = routeName;
        payload.pickupPointArea = pickupPointArea;
        payload.dropPointArea = dropPointArea;
        payload.forWithHotelBYO = forWithHotelBYO; // FIX 4
        payload.forLandOnlyBYO = forLandOnlyBYO; // FIX 4
      }

      if (category === "itinerary" || category === "point_to_point") {
        payload.citiesIncluded = cityRows
          .map((r) => r.citiesIncluded)
          .join(", ");
        payload.noOfDays = cityRows.map((r) => r.noOfDays).join(", ");
        payload.destinationsCovered = cityRows
          .map((r) => r.destinationsCovered)
          .join(", ");
        payload.sightseeingCovered = cityRows
          .map((r) => r.sightseeingCovered)
          .join(", ");
      }

      if (category === "per_day") {
        payload.perDayScopeType = region.toLowerCase() as PerDayScopeType;
        payload.perDayScopeValue = perDayScopeValue;
      }

      await createTransportRoute(payload).unwrap();
      router.push("/my-inventory/transport-rates");
    } catch (error) {
      console.error("Failed to save route:", error);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Card className="p-3">
        <div className="text-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/my-inventory/transport-rates")}
            style={{ fontSize: "10px" }}
          >
            <Icon icon="mdi:eye" className="me-1" />
            Transport Routes Listing
          </Button>
        </div>

        <hr />
        <Form>
          <Row className="g-2">
            {/* Category — FIX 1: all radios have explicit value */}
            <Col md={12}>
              <div className="d-flex gap-2 align-items-center">
                <Form.Label
                  style={{ fontSize: "12px" }}
                  className="text-primary"
                >
                  Category
                </Form.Label>
                <Form.Check
                  type="radio"
                  name="type"
                  id="Itinerary Transport"
                  value="Itinerary Transport"
                  defaultChecked
                  onChange={(e) => setTransportCategory(e.target.value)}
                  label="Itinerary Transport"
                  style={{ fontSize: "12px" }}
                />
                <Form.Check
                  type="radio"
                  name="type"
                  id="Point to Point Transfers"
                  value="Point to Point Transfers"
                  onChange={(e) => setTransportCategory(e.target.value)}
                  label="Point to Point Transfers"
                  style={{ fontSize: "12px" }}
                />
                <Form.Check
                  type="radio"
                  name="type"
                  id="SIC (Ferry Transfer)"
                  value="SIC (Ferry Transfer)"
                  onChange={(e) => setTransportCategory(e.target.value)}
                  label="SIC (Ferry Transfer)"
                  style={{ fontSize: "12px" }}
                />
                <Form.Check
                  type="radio"
                  name="type"
                  id="Per Day Cost"
                  value="Per Day Cost"
                  onChange={(e) => setTransportCategory(e.target.value)}
                  label="Per Day Cost"
                  style={{ fontSize: "12px" }}
                />
              </div>
            </Col>

            {/* Point to Point sub-types */}
            {transportcategory === "Point to Point Transfers" && (
              <Col md={12}>
                <div className="d-flex gap-2 mb-1">
                  {Object.keys(subTypeMap).map((label) => (
                    <Form.Check
                      key={label}
                      type="checkbox"
                      id={label}
                      label={label}
                      style={{ fontSize: "12px" }}
                      onChange={(e) =>
                        handleSubTypeChange(label, e.target.checked)
                      }
                    />
                  ))}
                </div>
              </Col>
            )}

            {/* Transport Type / Start City / Destination City / Route Name */}
            {transportcategory !== "Per Day Cost" && (
              <>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "12px" }}
                    className="text-primary"
                  >
                    Transport Type
                  </Form.Label>
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Check
                      type="radio"
                      name="waytype"
                      id="One Way"
                      label="One Way"
                      value="one_way"
                      defaultChecked
                      onChange={(e) =>
                        setTransportType(e.target.value as TransportType)
                      }
                      style={{ fontSize: "12px" }}
                    />
                    <Form.Check
                      type="radio"
                      name="waytype"
                      id="Round Trip"
                      label="Round Trip"
                      value="round_trip"
                      onChange={(e) =>
                        setTransportType(e.target.value as TransportType)
                      }
                      style={{ fontSize: "12px" }}
                    />
                  </div>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "12px" }}
                      className="text-primary"
                    >
                      Start City
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={startCity}
                      onChange={(e) => setStartCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "12px" }}
                      className="text-primary"
                    >
                      Destination City
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "12px" }}
                      className="text-primary"
                    >
                      Route Name
                    </Form.Label>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={routeName}
                      onChange={(e) => setRouteName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            {/* Cities & Sightseeing rows */}
            {transportcategory !== "SIC (Ferry Transfer)" &&
              transportcategory !== "Per Day Cost" && (
                <>
                  <Row className="mt-2">
                    <Col md={2}>
                      <Form.Label
                        style={{ fontSize: "12px" }}
                        className="text-primary"
                      >
                        Cities Included
                      </Form.Label>
                    </Col>
                    <Col md={2}>
                      <Form.Label
                        style={{ fontSize: "12px" }}
                        className="text-primary"
                      >
                        No of Days
                      </Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "12px" }}
                        className="text-primary"
                      >
                        Destinations Covered
                      </Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Label
                        style={{ fontSize: "12px" }}
                        className="text-primary"
                      >
                        Sightseeing Covered
                      </Form.Label>
                    </Col>
                  </Row>

                  {cityRows.map((row, index) => (
                    <Row key={index} className="g-1">
                      <Col md={2}>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={row.citiesIncluded}
                          onChange={(e) =>
                            handleCityChange(
                              index,
                              "citiesIncluded",
                              e.target.value,
                            )
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Form.Select
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={row.noOfDays}
                          onChange={(e) =>
                            handleCityChange(index, "noOfDays", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={row.destinationsCovered}
                          onChange={(e) =>
                            handleCityChange(
                              index,
                              "destinationsCovered",
                              e.target.value,
                            )
                          }
                        />
                      </Col>
                      <Col md={3}>
                        <Form.Control
                          size="sm"
                          style={{ fontSize: "12px" }}
                          value={row.sightseeingCovered}
                          onChange={(e) =>
                            handleCityChange(
                              index,
                              "sightseeingCovered",
                              e.target.value,
                            )
                          }
                        />
                      </Col>
                      <Col md={2}>
                        {/* FIX 2: disabled when only one row remains */}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeCityRow(index)}
                          disabled={cityRows.length === 1}
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          <Icon icon="mdi:minus" />
                        </Button>
                      </Col>
                    </Row>
                  ))}

                  <div className="text-end">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={addCityRow}
                      style={{ fontSize: "10px" }}
                    >
                      Add City & Sightseeing
                    </Button>
                  </div>
                </>
              )}

            {/* Description */}
            <Col md={6}>
              <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
                Description
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "12px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>

            {/* Pickup / Drop / BYO */}
            {transportcategory !== "Per Day Cost" && (
              <>
                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "12px" }}
                  >
                    Pick up Point Area
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={pickupPointArea}
                    onChange={(e) => setPickupPointArea(e.target.value)}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    className="text-primary"
                    style={{ fontSize: "12px" }}
                  >
                    Drop Point Area
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={dropPointArea}
                    onChange={(e) => setDropPointArea(e.target.value)}
                  />
                </Col>

                {/* FIX 4: BYO fields now collect data */}
                <Col md={12}>
                  <div
                    className="d-flex flex-column gap-1"
                    style={{ fontSize: "10px" }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <strong style={{ whiteSpace: "nowrap" }}>
                        For With Hotel BYO :
                      </strong>
                      <Form.Control
                        size="sm"
                        style={{ fontSize: "10px", maxWidth: "200px" }}
                        value={forWithHotelBYO}
                        onChange={(e) => setForWithHotelBYO(e.target.value)}
                      />
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <strong style={{ whiteSpace: "nowrap" }}>
                        For Land Only BYO :
                      </strong>
                      <Form.Control
                        size="sm"
                        style={{ fontSize: "10px", maxWidth: "200px" }}
                        value={forLandOnlyBYO}
                        onChange={(e) => setForLandOnlyBYO(e.target.value)}
                      />
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>

          {/* Per Day Cost region */}
          {transportcategory === "Per Day Cost" && (
            <Row className="mt-2 align-items-center">
              <Col md={3}>
                <div className="d-flex gap-2 align-items-center">
                  <Form.Check
                    type="radio"
                    name="region"
                    value="State"
                    onChange={(e) => setRegion(e.target.value)}
                    id="State"
                    label="State"
                    defaultChecked
                    style={{ fontSize: "12px" }}
                  />
                  <Form.Check
                    type="radio"
                    name="region"
                    value="Country"
                    onChange={(e) => setRegion(e.target.value)}
                    id="Country"
                    label="Country"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </Col>
              <Col md={3}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "12px" }}
                >
                  {region === "State" ? "State" : "Country"}
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "12px" }}
                  value={perDayScopeValue}
                  onChange={(e) => setPerDayScopeValue(e.target.value)}
                />
              </Col>
            </Row>
          )}
        </Form>

        {/* Pricing section */}
        <div className="p-3 border mt-4">
          <div className="mb-3 d-flex gap-2">
            <Form.Label className="text-primary" style={{ fontSize: "12px" }}>
              Vehicle Cost Type
            </Form.Label>
            <Form.Check
              inline
              type="radio"
              label="Normal"
              id="Normal"
              style={{ fontSize: "12px" }}
              name="vehicle"
              value="normal"
              defaultChecked
              onChange={(e) =>
                setVehicleCostType(e.target.value as VehicleCostType)
              }
            />
            <Form.Check
              inline
              type="radio"
              label="KM Based"
              id="KM Based"
              style={{ fontSize: "12px" }}
              name="vehicle"
              value="km_based"
              onChange={(e) =>
                setVehicleCostType(e.target.value as VehicleCostType)
              }
            />
          </div>

          <div className="table-responsive">
            <table className="table table-sm table-bordered">
              <tbody>
                <tr style={{ fontSize: "12px" }}>
                  <td>
                    <strong>Add Season</strong>
                  </td>
                  <td>Currency</td>
                  <td colSpan={4}>
                    <Col md={3}>
                      <Form.Select
                        size="sm"
                        style={{ width: "150px", fontSize: "12px" }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                      </Form.Select>
                    </Col>
                  </td>
                </tr>

                <tr className="bg-light" style={{ fontSize: "12px" }}>
                  <th>From</th>
                  <th>To</th>
                  <th>Mark Up</th>
                  <th>B2C</th>
                  <th>B2B</th>
                  <th></th>
                </tr>

                {/* First season row — always visible, no delete button */}
                <tr style={{ fontSize: "12px" }}>
                  <td>
                    <Form.Control
                      type="date"
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={firstSeason.from}
                      onChange={(e) =>
                        handleFirstSeasonChange("from", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={firstSeason.to}
                      onChange={(e) =>
                        handleFirstSeasonChange("to", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={firstSeason.markUpType}
                      onChange={(e) =>
                        handleFirstSeasonChange("markUpType", e.target.value)
                      }
                    >
                      <option value="Fixed %">Fixed %</option>
                      <option value="Percentage">Percentage</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      type="number"
                      min={0}
                      value={firstSeason.b2c}
                      onChange={(e) =>
                        handleFirstSeasonChange("b2c", Number(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      type="number"
                      min={0}
                      value={firstSeason.b2b}
                      onChange={(e) =>
                        handleFirstSeasonChange("b2b", Number(e.target.value))
                      }
                    />
                  </td>
                </tr>

                {/* Extra season rows */}
                {extraSeasons.map((season, index) => (
                  <tr key={index} style={{ fontSize: "12px" }}>
                    <td>
                      <Form.Control
                        type="date"
                        size="sm"
                        style={{ fontSize: "12px" }}
                        value={season.from}
                        onChange={(e) =>
                          handleExtraSeasonChange(index, "from", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="date"
                        size="sm"
                        style={{ fontSize: "12px" }}
                        value={season.to}
                        onChange={(e) =>
                          handleExtraSeasonChange(index, "to", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Select
                        size="sm"
                        style={{ fontSize: "12px" }}
                        value={season.markUpType}
                        onChange={(e) =>
                          handleExtraSeasonChange(
                            index,
                            "markUpType",
                            e.target.value,
                          )
                        }
                      >
                        <option value="Fixed %">Fixed %</option>
                        <option value="Percentage">Percentage</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        style={{ fontSize: "12px" }}
                        type="number"
                        min={0}
                        value={season.b2c}
                        onChange={(e) =>
                          handleExtraSeasonChange(
                            index,
                            "b2c",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        style={{ fontSize: "12px" }}
                        type="number"
                        min={0}
                        value={season.b2b}
                        onChange={(e) =>
                          handleExtraSeasonChange(
                            index,
                            "b2b",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="danger"
                        style={{ fontSize: "12px" }}
                        onClick={() => removeExtraSeason(index)}
                      >
                        -
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button
              size="sm"
              variant="outline-primary"
              onClick={addExtraSeason}
              style={{ fontSize: "12px" }}
            >
              Add More Season
            </Button>
            <Button size="sm" variant="success" style={{ fontSize: "12px" }}>
              Add Cost
            </Button>
          </div>

          <hr />

          <div className="d-flex align-items-center justify-content-end gap-3 py-2">
            <Form.Check
              label="Website"
              id="Website"
              style={{ fontSize: "12px" }}
              checked={isWebsite}
              onChange={(e) => setIsWebsite(e.target.checked)}
            />
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => router.push("/my-inventory/transport-rates")}
              style={{ fontSize: "12px" }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="danger"
              style={{ fontSize: "12px" }}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Route"}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default AddRoute;
