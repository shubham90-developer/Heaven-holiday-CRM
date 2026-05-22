"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useCreateDriverMutation } from "../../../../../../../Redux/driverApi";
import { useGetAllTransportsQuery } from "../../../../../../../Redux/transportApi";
const AddDriver = () => {
  const router = useRouter();

  const [createDriver, { isLoading }] = useCreateDriverMutation();

  // Fetch transports for Primary Vehicle dropdown
  const { data: transportData } = useGetAllTransportsQuery({ isActive: true });
  const transports = transportData?.data ?? [];

  const [formData, setFormData] = React.useState({
    driverName: "",
    mobileCountryCode: "+91",
    mobileNumber: "",
    email: "",
    languages: "",
    address: "",
    country: "",
    city: "",
    drivingLicense: "",
    primaryVehicle: "",
    image: "",
    remark: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData((prev) => ({ ...prev, image: file.name }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDriver({
        driverName: formData.driverName,
        mobileCountryCode: formData.mobileCountryCode,
        mobileNumber: formData.mobileNumber,
        email: formData.email || undefined,
        languages: formData.languages,
        address: formData.address || undefined,
        country: formData.country,
        city: formData.city,
        drivingLicense: formData.drivingLicense,
        primaryVehicle: formData.primaryVehicle,
        image: formData.image || undefined,
        remark: formData.remark || undefined,
      }).unwrap();

      router.push("/my-inventory/vehicles/manage-driver");
    } catch (error) {
      console.error("Failed to create driver:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Card className="p-3">
        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Driver Name */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Driver Name*
              </Form.Label>
              <Form.Control
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>

            {/* Mobile Number */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Mobile Number *
              </Form.Label>
              <div className="d-flex">
                <span className="input-group-text" style={{ fontSize: "10px" }}>
                  +91
                </span>
                <Form.Control
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  size="sm"
                  style={{ fontSize: "10px" }}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>

            {/* Languages */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Languages*
              </Form.Label>
              <Form.Control
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              />
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
                name="address"
                value={formData.address}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>

            {/* Country */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Country*
              </Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </Form.Select>
            </Col>

            {/* City */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                City*
              </Form.Label>
              <Form.Select
                name="city"
                value={formData.city}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
              </Form.Select>
            </Col>

            {/* Driving License */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Driving License
              </Form.Label>
              <Form.Control
                name="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>

            {/* Primary Vehicle */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Primary Vehicle
              </Form.Label>
              <Form.Select
                name="primaryVehicle"
                value={formData.primaryVehicle}
                onChange={handleChange}
                size="sm"
                style={{ fontSize: "10px" }}
              >
                <option value="">Select</option>
                {transports.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.carName} ({t.vehicleNumber})
                  </option>
                ))}
              </Form.Select>
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
                onChange={handleImageChange}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>

            {/* Remark */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Remark
              </Form.Label>
              <Form.Control
                as="textarea"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
                rows={2}
                style={{ fontSize: "10px" }}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() =>
                router.push("/my-inventory/vehicles/manage-driver")
              }
              style={{ fontSize: "12px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="success"
              size="sm"
              disabled={isLoading}
              style={{ fontSize: "12px" }}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default AddDriver;
