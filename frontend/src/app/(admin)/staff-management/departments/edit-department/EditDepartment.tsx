"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter, useParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useGetAllDepartmentsQuery,
  useUpdateDepartmentMutation,
  IUpdateDepartment,
  DepartmentStatus,
} from "../../../../../../Redux/deptApi";

const EditDepartment = () => {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState<IUpdateDepartment>({
    name: "",
    status: "active",
  });

  const { data } = useGetAllDepartmentsQuery();
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();

  useEffect(() => {
    if (data?.data && id) {
      const department = data.data.find((dept: any) => dept._id === id);
      if (department) {
        setFormData({
          name: department.name,
          status: department.status,
        });
      }
    }
  }, [data, id]);

  const handleSubmit = async () => {
    try {
      await updateDepartment({ id: id as string, body: formData }).unwrap();
      router.push("../");
    } catch (error) {
      console.error("Failed to update department:", error);
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
                  value={formData.name ?? ""}
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
                router.push("../");
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
              {isLoading ? "Updating..." : "Submit"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default EditDepartment;
