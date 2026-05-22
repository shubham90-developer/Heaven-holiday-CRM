"use client";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useCreateRestaurantMutation } from "../../../../../../Redux/restoApi";
import { toast } from "react-hot-toast";

const AddRestaurants = () => {
  const router = useRouter();

  // ── Form state ────────────────────────────────────────────────────────────
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [restaurantArea, setRestaurantArea] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [mealName, setMealName] = useState("");
  const [isPreferred, setIsPreferred] = useState(false);
  const [isVeg, setIsVeg] = useState(false);
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [isAI, setIsAI] = useState(false);

  // ── Validation errors ─────────────────────────────────────────────────────
  const [errors, setErrors] = useState<{
    city?: string;
    address?: string;
    restaurantArea?: string;
    supplierName?: string;
    mealName?: string;
  }>({});

  // ── RTK mutation ──────────────────────────────────────────────────────────
  const [createRestaurant, { isLoading }] = useCreateRestaurantMutation();

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!city.trim()) newErrors.city = "City is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!restaurantArea.trim())
      newErrors.restaurantArea = "Restaurant area is required";
    if (!supplierName.trim())
      newErrors.supplierName = "Supplier name is required";
    if (!mealName.trim()) newErrors.mealName = "Meal name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;

    try {
      await createRestaurant({
        city: city.trim(),
        address: address.trim(),
        restaurantArea: restaurantArea.trim(),
        supplierName: supplierName.trim(),
        currency,
        mealName: mealName.trim(),
        isPreferred,
        isVeg,
        isNonVeg,
        isAI,
      }).unwrap();

      toast.success("Restaurant created successfully");
      router.push("/my-inventory/restaturants");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create restaurant");
    }
  };

  // ── Clear error on change helper ──────────────────────────────────────────
  const clearError = (field: keyof typeof errors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  return (
    <>
      <Card className="p-3">
        <Form>
          <Row className="g-2">
            {/* City */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                City
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  clearError("city");
                }}
                isInvalid={!!errors.city}
                placeholder="Enter city"
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.city}
              </Form.Control.Feedback>
            </Col>

            {/* Address */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Address
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  clearError("address");
                }}
                isInvalid={!!errors.address}
                placeholder="Enter address"
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.address}
              </Form.Control.Feedback>
            </Col>

            {/* Restaurant Area */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Restaurant Area
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={restaurantArea}
                onChange={(e) => {
                  setRestaurantArea(e.target.value);
                  clearError("restaurantArea");
                }}
                isInvalid={!!errors.restaurantArea}
                placeholder="Enter restaurant area"
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.restaurantArea}
              </Form.Control.Feedback>
            </Col>

            {/* Supplier Name */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Supplier Name
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={supplierName}
                onChange={(e) => {
                  setSupplierName(e.target.value);
                  clearError("supplierName");
                }}
                isInvalid={!!errors.supplierName}
                placeholder="Enter supplier name"
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.supplierName}
              </Form.Control.Feedback>
            </Col>

            {/* Currency */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Currency
              </Form.Label>
              <Form.Select
                size="sm"
                style={{ fontSize: "10px" }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </Form.Select>
            </Col>

            {/* Meal Name */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Meal Name
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={mealName}
                onChange={(e) => {
                  setMealName(e.target.value);
                  clearError("mealName");
                }}
                isInvalid={!!errors.mealName}
                placeholder="Enter meal name"
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.mealName}
              </Form.Control.Feedback>
            </Col>

            {/* Checkboxes */}
            <Col md={2}>
              <Form.Check
                label="Preferred"
                className="text-primary"
                style={{ fontSize: "10px" }}
                checked={isPreferred}
                onChange={(e) => setIsPreferred(e.target.checked)}
              />
            </Col>

            <Col md={2}>
              <Form.Check
                label="Veg"
                className="text-primary"
                style={{ fontSize: "10px" }}
                checked={isVeg}
                onChange={(e) => setIsVeg(e.target.checked)}
              />
            </Col>

            <Col md={2}>
              <Form.Check
                label="NonVeg"
                className="text-primary"
                style={{ fontSize: "10px" }}
                checked={isNonVeg}
                onChange={(e) => setIsNonVeg(e.target.checked)}
              />
            </Col>

            <Col md={2}>
              <Form.Check
                label="AI"
                className="text-primary"
                style={{ fontSize: "10px" }}
                checked={isAI}
                onChange={(e) => setIsAI(e.target.checked)}
              />
            </Col>
          </Row>
        </Form>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => router.push("/my-inventory/restaturants")}
            style={{ fontSize: "12px" }}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            size="sm"
            style={{ fontSize: "12px" }}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddRestaurants;
