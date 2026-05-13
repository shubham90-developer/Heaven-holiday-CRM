"use client";
import React from "react";

import { Button, Card, Form } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import {
  useGetAllDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "../../../../../Redux/deptApi";

const Department = () => {
  const router = useRouter();

  const { data, isLoading } = useGetAllDepartmentsQuery();
  const [updateDepartment] = useUpdateDepartmentMutation();

  const handleOperationsToggle = async (id: string, currentValue: boolean) => {
    try {
      await updateDepartment({
        id,
        body: { is_operations: !currentValue },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  return (
    <>
      <Card className="p-3">
        <div className="text-end border-bottom mb-2">
          <div className="mb-2">
            <Button
              variant="outline-primary"
              onClick={() => {
                router.push("./departments/add-department");
              }}
              size="sm"
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
              <Icon icon="mdi:plus" className="me-1" /> Add Department
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th>Department Name</th>
                <th>Is Operations</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "12px" }}>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : data?.data?.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center">
                    No departments found
                  </td>
                </tr>
              ) : (
                data?.data?.map((dept: any) => (
                  <tr key={dept._id}>
                    <td>{dept.name}</td>
                    <td>
                      <Form.Check
                        style={{ fontSize: "12px" }}
                        checked={dept.is_operations}
                        onChange={() =>
                          handleOperationsToggle(dept._id, dept.is_operations)
                        }
                      />
                    </td>
                    <td>{dept.status}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          router.push(
                            `./departments/edit-department/${dept._id}`,
                          );
                        }}
                        size="sm"
                      >
                        <Icon icon="mdi:edit" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default Department;
