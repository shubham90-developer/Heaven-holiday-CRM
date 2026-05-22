"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useCreateTransportMutation } from "../../../../../../Redux/transportApi";
const AddTransport = () => {
  const router = useRouter();
  const [createTransport, { isLoading }] = useCreateTransportMutation();

  const [formData, setFormData] = React.useState({
    carType: "",
    carName: "",
    seatingCapacity: "",
    ac: "Yes" as "Yes" | "No",
    vehicleNumber: "",
    noOfVehicle: "",
    image: "",
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
      await createTransport({
        carType: formData.carType,
        carName: formData.carName,
        seatingCapacity: Number(formData.seatingCapacity),
        ac: formData.ac,
        vehicleNumber: formData.vehicleNumber,
        noOfVehicle: Number(formData.noOfVehicle),
        image: formData.image || undefined,
      }).unwrap();

      router.push("/my-inventory/vehicles");
    } catch (error) {
      console.error("Failed to create transport:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="p-3">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Label
              className="text-primary small"
              style={{ fontSize: "10px" }}
            >
              Car Type
            </Form.Label>
            <Form.Select
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              size="sm"
              style={{ fontSize: "10px" }}
            >
              <option value="">Select</option>
              <option value="Luxury">Luxury</option>
              <option value="Standard">Standard</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label
              className="text-primary small"
              style={{ fontSize: "10px" }}
            >
              Car Name
            </Form.Label>
            <Form.Control
              name="carName"
              value={formData.carName}
              onChange={handleChange}
              size="sm"
              style={{ fontSize: "10px" }}
            />
          </Col>

          <Col md={4}>
            <Form.Label
              className="text-primary small"
              style={{ fontSize: "10px" }}
            >
              Seating Capacity
            </Form.Label>
            <Form.Control
              name="seatingCapacity"
              type="number"
              value={formData.seatingCapacity}
              onChange={handleChange}
              size="sm"
              style={{ fontSize: "10px" }}
            />
          </Col>

          <Col md={4}>
            <Form.Label
              className="text-primary small"
              style={{ fontSize: "10px" }}
            >
              AC
            </Form.Label>
            <Form.Select
              name="ac"
              value={formData.ac}
              onChange={handleChange}
              size="sm"
              style={{ fontSize: "10px" }}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label
              className="text-primary small"
              style={{ fontSize: "10px" }}
            >
              Vehicle No
            </Form.Label>
            <Form.Control
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              size="sm"
              style={{ fontSize: "10px" }}
            />
          </Col>

          <Col md={4}>
            <Form.Label
              className="text-primary small"
              style={{ fontSize: "10px" }}
            >
              No of Vehicle
            </Form.Label>
            <Form.Control
              name="noOfVehicle"
              type="number"
              value={formData.noOfVehicle}
              onChange={handleChange}
              size="sm"
              style={{ fontSize: "10px" }}
            />
          </Col>

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
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => router.push("/my-inventory/vehicles")}
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
  );
};

export default AddTransport;
