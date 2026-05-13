"use client";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import FormatStaff from "./FormatStaff";
import {
  useGetAllStaffQuery,
  useUpdateStaffFlagsMutation,
} from "../../../../../../Redux/staffApi";

const Staff = () => {
  const { data, isLoading, error } = useGetAllStaffQuery({ archived: false });
  const [updateStaffFlags] = useUpdateStaffFlagsMutation();
  const router = useRouter();
  const [stafftype, setStaffType] = useState("Current Staff");

  const handleFlagToggle = async (
    id: string,
    field: string,
    value: boolean,
  ) => {
    try {
      await updateStaffFlags({ id, body: { [field]: value } }).unwrap();
    } catch (err) {
      console.error("Flag update failed:", err);
    }
  };

  const handleArchive = async (id: string) => {
    if (confirm("Archive this staff member?")) {
      try {
        await updateStaffFlags({ id, body: { archived: true } }).unwrap();
      } catch (err) {
        console.error("Archive failed:", err);
      }
    }
  };

  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const staffList = data?.data || [];

  return (
    <>
      <Card className="p-3">
        <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
          <div className="d-flex gap-1">
            <Button
              variant={
                stafftype === "Current Staff" ? "primary" : "outline-primary"
              }
              onClick={() => setStaffType("Current Staff")}
              size="sm"
              style={{ fontSize: "12px", fontWeight: "600" }}
            >
              Current Staff
            </Button>
            <Button
              variant={
                stafftype === "Format Staff" ? "primary" : "outline-primary"
              }
              onClick={() => setStaffType("Format Staff")}
              size="sm"
              style={{ fontSize: "12px", fontWeight: "600" }}
            >
              Format Staff
            </Button>
          </div>
          <Button
            variant="outline-primary"
            onClick={() => router.push("./staff/add-staff")}
            size="sm"
            style={{ fontSize: "12px", fontWeight: "600" }}
          >
            <Icon icon="mdi:plus" className="me-1" /> Add Staff
          </Button>
        </div>

        {stafftype === "Current Staff" && (
          <div className="table-responsive mt-2">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th style={{ width: "200px" }}>Staff Details</th>
                  <th>Role</th>
                  <th>Report To</th>
                  <th>Department</th>
                  <th>WA / WA Admin</th>
                  <th>Secure Login</th>
                  <th>API Booking</th>
                  <th>Masking</th>
                  <th>Finance</th>
                  <th>Archived</th>
                  <th style={{ width: "150px" }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "12px" }}>
                {staffList.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-3">
                      No staff found
                    </td>
                  </tr>
                ) : (
                  staffList.map((staff) => (
                    <tr key={staff._id}>
                      {/* Staff Details */}
                      <td>
                        <div>
                          <Icon icon="mdi:account" className="me-1" />
                          {staff.firstName} {staff.lastName}
                        </div>
                        <div>
                          <Icon icon="mdi:email" className="me-1" />
                          {staff.email}
                        </div>
                        <div>
                          <Icon icon="mdi:phone" className="me-1" />
                          {staff.countryCode} {staff.mobile}
                        </div>
                      </td>

                      {/* Role */}
                      <td>
                        {typeof staff.roleId === "object"
                          ? staff.roleId?.title
                          : (staff.roleId ?? "—")}
                      </td>

                      {/* Report To */}
                      <td>
                        {staff.reportTo && typeof staff.reportTo === "object"
                          ? `${staff.reportTo.firstName} ${staff.reportTo.lastName}`
                          : "—"}
                      </td>

                      {/* Department */}
                      <td>
                        {typeof staff.departmentId === "object"
                          ? staff.departmentId?.name
                          : (staff.departmentId ?? "—")}
                      </td>

                      {/* WA / WA Admin */}
                      <td>{staff.senderIdSelf ? "Yes" : "No"}</td>

                      {/* Secure Login */}
                      <td>
                        <Form.Check
                          checked={staff.secureLogin}
                          onChange={(e) =>
                            handleFlagToggle(
                              staff._id,
                              "secureLogin",
                              e.target.checked,
                            )
                          }
                          style={{ fontSize: "10px" }}
                        />
                      </td>

                      {/* API Booking */}
                      <td>
                        <Form.Check
                          checked={staff.apiBooking}
                          onChange={(e) =>
                            handleFlagToggle(
                              staff._id,
                              "apiBooking",
                              e.target.checked,
                            )
                          }
                          style={{ fontSize: "10px" }}
                        />
                      </td>

                      {/* Masking */}
                      <td>
                        <Form.Check
                          checked={staff.masking}
                          onChange={(e) =>
                            handleFlagToggle(
                              staff._id,
                              "masking",
                              e.target.checked,
                            )
                          }
                          style={{ fontSize: "10px" }}
                        />
                      </td>

                      {/* Finance */}
                      <td>
                        <Form.Check
                          checked={staff.finance}
                          onChange={(e) =>
                            handleFlagToggle(
                              staff._id,
                              "finance",
                              e.target.checked,
                            )
                          }
                          style={{ fontSize: "10px" }}
                        />
                      </td>

                      {/* Archived */}
                      <td>
                        <Form.Check
                          checked={staff.archived}
                          onChange={(e) =>
                            handleFlagToggle(
                              staff._id,
                              "archived",
                              e.target.checked,
                            )
                          }
                          style={{ fontSize: "10px" }}
                        />
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex gap-1">
                          {/* View */}
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              router.push(`./staff/view-staff?id=${staff._id}`)
                            }
                          >
                            <Icon icon="mdi:eye" />
                          </Button>

                          {/* Edit */}
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() =>
                              router.push(`./staff/edit-staff?id=${staff._id}`)
                            }
                          >
                            <Icon icon="mdi:edit" />
                          </Button>

                          {/* Archive */}
                          <Button
                            variant="secondary"
                            size="sm"
                            title="Archive Staff"
                            onClick={() => handleArchive(staff._id)}
                          >
                            <Icon icon="mdi:account-off-outline" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {stafftype === "Format Staff" && <FormatStaff />}
      </Card>
    </>
  );
};

export default Staff;
