"use client";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useCreateAreaMutation } from "../../../../../../Redux/areaApi";
import { toast } from "react-hot-toast"; // or your preferred toast library

const AddArea = () => {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<{ city?: string; area?: string }>({});

  const [createArea, { isLoading }] = useCreateAreaMutation();

  const validate = () => {
    const newErrors: { city?: string; area?: string } = {};
    if (!city.trim()) newErrors.city = "City is required";
    if (!area.trim()) newErrors.area = "Area is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await createArea({
        city: city.trim(),
        area: area.trim(),
        isActive,
      }).unwrap();
      toast.success("Area created successfully");
      router.push("/my-inventory/area-master");
    } catch (error: any) {
      const message =
        error?.data?.message || "Failed to create area. Please try again.";
      toast.error(message);
    }
  };

  const handleCancel = () => {
    router.push("/my-inventory/area-master");
  };

  return (
    <>
      <Card className="p-3">
        <Form>
          <Row className="g-2 mb-3">
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
                  if (errors.city)
                    setErrors((prev) => ({ ...prev, city: undefined }));
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

            {/* Area */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Area
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  if (errors.area)
                    setErrors((prev) => ({ ...prev, area: undefined }));
                }}
                isInvalid={!!errors.area}
                placeholder="Enter area"
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.area}
              </Form.Control.Feedback>
            </Col>

            {/* Status */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Status
              </Form.Label>
              <Form.Select
                size="sm"
                style={{ fontSize: "10px" }}
                value={isActive ? "true" : "false"}
                onChange={(e) => setIsActive(e.target.value === "true")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleCancel}
            style={{ fontSize: "12px" }}
            disabled={isLoading}
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
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default AddArea;
