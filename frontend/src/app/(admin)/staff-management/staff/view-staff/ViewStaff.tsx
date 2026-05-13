"use client";
import React from "react";
import { Card, CardHeader, CardBody, Table, Button } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetStaffByIdQuery } from "../../../../../../Redux/staffApi";

const ViewStaff = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  const { data, isLoading, error } = useGetStaffByIdQuery(id, { skip: !id });

  if (!id) return <p>No staff ID provided</p>;
  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  const staff = data?.data;
  if (!staff) return <p>Staff not found</p>;

  return (
    <>
      <div style={{ padding: "15px", background: "#f5f6f8", fontSize: "12px" }}>
        {/* User Login & Role */}
        <Card className="mb-3">
          <CardHeader className="d-flex justify-content-between border-bottom p-2">
            <b>User Login & Role</b>
            <Button
              size="sm"
              variant="danger"
              onClick={() => router.push(`../staff/edit-staff?id=${id}`)}
            >
              <Icon icon="mdi:edit" className="me-1" /> Edit Info
            </Button>
          </CardHeader>

          <CardBody>
            <Table bordered size="sm" className="mb-0">
              <tbody>
                <tr>
                  <td style={{ width: "200px", fontWeight: "600" }}>Name</td>
                  <td>
                    {staff.firstName} {staff.lastName}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Email Id</td>
                  <td>{staff.email}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Role</td>
                  <td>
                    {typeof staff.roleId === "object"
                      ? staff.roleId?.title
                      : (staff.roleId ?? "—")}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Department</td>
                  <td>
                    {typeof staff.departmentId === "object"
                      ? staff.departmentId?.name
                      : (staff.departmentId ?? "—")}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>

        {/* More Information */}
        <Card className="mb-3">
          <CardHeader className="p-2 border-bottom">
            <b>More Information</b>
          </CardHeader>

          <CardBody>
            <Table bordered size="sm" className="mb-0">
              <tbody>
                <tr>
                  <td style={{ width: "200px", fontWeight: "600" }}>
                    Office Phone
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Mobile Phone</td>
                  <td>
                    {staff.countryCode} {staff.mobile}
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Home Phone</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Fax</td>
                  <td>NA</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Staff Address */}
        <Card className="mb-3">
          <CardHeader className="p-2 border-bottom">
            <b>Staff Address</b>
          </CardHeader>

          <CardBody>
            <Table bordered size="sm" className="mb-0">
              <tbody>
                <tr>
                  <td style={{ width: "200px", fontWeight: "600" }}>Country</td>
                  <td>{staff.country || "-"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>City</td>
                  <td>{staff.city || "-"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Postal Code</td>
                  <td>{staff.postalCode || "-"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Address</td>
                  <td>{staff.address || "-"}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "600" }}>Photograph</td>
                  <td>{staff.photograph || "NA"}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>

        {/* Staff Signature */}
        <Card>
          <CardHeader className="p-2 border-bottom">
            <b>Staff Signature</b>
          </CardHeader>

          <CardBody>
            <Table bordered size="sm" className="mb-0">
              <tbody>
                <tr>
                  <td className="p-3">
                    {staff.signature
                      ? staff.signature
                          .split("\n")
                          .map((line, i) => <div key={i}>{line}</div>)
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ViewStaff;
