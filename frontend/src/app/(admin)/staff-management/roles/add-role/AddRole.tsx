"use client";
import React from "react";
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
import { useForm } from "react-hook-form";
import { useCreateRoleMutation } from "../../../../../../Redux/rolesApi";

interface AddRoleForm {
  title: string;
  description: string;
  roleType: "superAdmin" | "reportManager" | "";
  status: "active" | "inactive";
}

const AddRole = () => {
  const router = useRouter();
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const { register, handleSubmit } = useForm<AddRoleForm>({
    defaultValues: {
      title: "",
      description: "",
      roleType: "",
      status: "active",
    },
  });

  const onSubmit = async (data: AddRoleForm) => {
    try {
      await createRole({
        title: data.title,
        description: data.description,
        roleType: data.roleType as "superAdmin" | "reportManager",
        status: data.status,
      }).unwrap();
      router.push("./");
    } catch (error) {
      console.error("Failed to create role:", error);
    }
  };

  return (
    <>
      <Card className="p-3">
        <CardHeader className="border-bottom ">
          <CardTitle style={{ fontSize: "12px" }}>Add Role</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3}>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Role Title
                </Form.Label>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  size="sm"
                  {...register("title")}
                />
              </Col>

              <Col md={3}>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Role Description
                </Form.Label>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  size="sm"
                  {...register("description")}
                />
              </Col>

              <Col md={3}>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Role Type
                </Form.Label>
                <Form.Select
                  style={{ fontSize: "12px" }}
                  size="sm"
                  {...register("roleType")}
                >
                  <option value="">None</option>
                  <option value="superAdmin">Is Superadmin</option>
                  <option value="reportManager">Is Reporting Manager</option>
                </Form.Select>
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
                  {...register("status")}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Deactive</option>
                </Form.Select>
              </Col>
            </Row>

            <CardFooter className="mt-3 px-0">
              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => router.push("./")}
                  style={{ fontSize: "12px" }}
                  type="button"
                >
                  Cancel
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  style={{ fontSize: "12px" }}
                  type="submit"
                  disabled={isLoading}
                >
                  <Icon icon="akar-icons:check" className="me-1" />
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </CardFooter>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default AddRole;
