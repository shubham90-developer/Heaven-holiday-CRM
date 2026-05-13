"use client";
import React, { useEffect } from "react";
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
import { useForm } from "react-hook-form";
import {
  useGetAllRolesQuery,
  useUpdateRoleMutation,
} from "../../../../../../Redux/rolesApi";

interface EditRoleForm {
  title: string;
  description: string;
  roleType: "superAdmin" | "reportManager" | "";
  status: "active" | "inactive";
}

const EditRole = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading: isFetching } = useGetAllRolesQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  // Filter the role by id from the list
  const role = data?.data?.find((r) => r._id === id);

  const { register, handleSubmit, reset } = useForm<EditRoleForm>({
    defaultValues: {
      title: "",
      description: "",
      roleType: "",
      status: "active",
    },
  });

  // Prefill form once role is found
  useEffect(() => {
    if (role) {
      reset({
        title: role.title,
        description: role.description ?? "",
        roleType: role.roleType,
        status: role.status,
      });
    }
  }, [role, reset]);

  const onSubmit = async (formData: EditRoleForm) => {
    try {
      await updateRole({
        id,
        body: {
          title: formData.title,
          description: formData.description,
          roleType: formData.roleType as "superAdmin" | "reportManager",
          status: formData.status,
        },
      }).unwrap();
      router.push("../");
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  return (
    <>
      <Card className="p-3">
        <CardHeader className="border-bottom ">
          <CardTitle style={{ fontSize: "12px" }}>Edit Role</CardTitle>
        </CardHeader>
        <CardBody>
          {isFetching ? (
            <p style={{ fontSize: "12px" }}>Loading...</p>
          ) : (
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
                    onClick={() => router.push("../")}
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
                    disabled={isUpdating}
                  >
                    <Icon icon="akar-icons:check" className="me-1" />
                    {isUpdating ? "Updating..." : "Submit"}
                  </Button>
                </div>
              </CardFooter>
            </Form>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default EditRole;
