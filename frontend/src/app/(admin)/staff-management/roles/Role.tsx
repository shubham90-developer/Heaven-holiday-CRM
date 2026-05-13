"use client";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useGetAllRolesQuery } from "../../../../../Redux/rolesApi";
const Role = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllRolesQuery();

  return (
    <>
      <Card className="p-3">
        <div className="text-end border-bottom mb-2">
          <div className="mb-2">
            <Button
              variant="outline-primary"
              onClick={() => {
                router.push("./roles/add-role");
              }}
              size="sm"
              style={{ fontSize: "12px", fontWeight: "bold" }}
            >
              <Icon icon="mdi:plus" className="me-1" /> Add Role
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
                <th>Role Name</th>
                <th>Role Type</th>
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
                    No roles found
                  </td>
                </tr>
              ) : (
                data?.data?.map((role) => (
                  <tr key={role._id}>
                    <td>{role.title}</td>
                    <td>{role.roleType}</td>
                    <td>{role.status}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          router.push(`./roles/edit-role/${role._id}`);
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

export default Role;
