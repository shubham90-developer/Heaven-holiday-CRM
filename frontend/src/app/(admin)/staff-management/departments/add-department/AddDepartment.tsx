"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Row,
  Col,
  CardFooter,
  Button,
  CardTitle,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useCreateDepartmentMutation,
  ICreateDepartment,
  DepartmentStatus,
} from "../../../../../../Redux/deptApi";

const AddDepartment = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ICreateDepartment>({
    name: "",
    status: "active",
  });

  const [createDepartment, { isLoading }] = useCreateDepartmentMutation();

  const handleSubmit = async () => {
    try {
      await createDepartment(formData).unwrap();
      router.push("./");
    } catch (error) {
      console.error("Failed to create department:", error);
    }
  };

  return (
    <>
      <Card className="p-3">
        <CardHeader className="border-bottom ">
          <CardTitle style={{ fontSize: "12px" }}>Add Department</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Departname Name
                </Form.Label>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  size="sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Col>

              <Col md={3}>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Status
                </Form.Label>
                <Form.Select
                  style={{ fontSize: "12px" }}
                  size="sm"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as DepartmentStatus,
                    })
                  }
                >
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </CardBody>
        <CardFooter>
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                router.push("./");
              }}
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
              <Icon icon="akar-icons:check" className="me-1" />
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default AddDepartment;
