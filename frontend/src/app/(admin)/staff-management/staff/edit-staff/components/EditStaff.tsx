"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import PermissionControl from "./PermissionControl";
import {
  useGetStaffByIdQuery,
  useUpdateStaffMutation,
  useGetAllStaffQuery,
  IPermissionSection,
} from "../../../../../../../Redux/staffApi";
import { useGetAllRolesQuery } from "../../../../../../../Redux/rolesApi";
import { useGetAllDepartmentsQuery } from "../../../../../../../Redux/deptApi";
const EditStaff = () => {
  const [step, setStep] = useState(1);
  const [selfsender, setSelfSender] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";

  // API calls
  const { data, isLoading, error } = useGetStaffByIdQuery(id, { skip: !id });
  const [updateStaff] = useUpdateStaffMutation();
  const { data: rolesData } = useGetAllRolesQuery();
  const { data: departmentsData } = useGetAllDepartmentsQuery();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });

  const roles = rolesData?.data || [];
  const departments = departmentsData?.data || [];
  const staffList = staffData?.data || [];

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [roleId, setRoleId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [reportTo, setReportTo] = useState("");

  // Step 2 — permissions
  const [permissions, setPermissions] = useState<IPermissionSection[]>([]);

  // Step 3 fields
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [signatureType, setSignatureType] = useState("default");
  const [signature, setSignature] = useState("");

  // Prefill form when data loads
  useEffect(() => {
    if (!data?.data) return;
    const s = data.data;

    setFirstName(s.firstName);
    setLastName(s.lastName);
    setEmail(s.email);
    setCountryCode(s.countryCode);
    setMobile(s.mobile);
    setSelfSender(s.senderIdSelf);
    setRoleId(typeof s.roleId === "object" ? s.roleId._id : s.roleId);
    setDepartmentId(
      typeof s.departmentId === "object" ? s.departmentId._id : s.departmentId,
    );
    setReportTo(
      s.reportTo
        ? typeof s.reportTo === "object"
          ? s.reportTo._id
          : s.reportTo
        : "",
    );
    setCountry(s.country ?? "");
    setCity(s.city ?? "");
    setPostalCode(s.postalCode ?? "");
    setAddress(s.address ?? "");
    setSignatureType(s.signatureType ?? "default");
    setSignature(s.signature ?? "");
    setPermissions(s.permissions ?? []);
  }, [data]);

  const handleSignatureTypeChange = (type: string) => {
    setSignatureType(type);
    if (type === "default") {
      setSignature(data?.data?.signature ?? "");
    } else {
      setSignature("");
    }
  };

  // Called by PermissionControl with updated permissions
  const handlePermissionsNext = (updatedPermissions: IPermissionSection[]) => {
    setPermissions(updatedPermissions);
    setStep(3);
  };

  const handleFinish = async () => {
    try {
      await updateStaff({
        id,
        body: {
          firstName,
          lastName,
          email,
          countryCode,
          mobile,
          roleId,
          departmentId,
          reportTo: reportTo || undefined,
          senderIdSelf: selfsender,
          country,
          city,
          postalCode,
          address,
          signatureType: signatureType as "default" | "custom",
          signature,
          permissions,
          ...(password && { password }),
        },
      }).unwrap();
      router.push("./");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (!id) return <p>No staff ID provided</p>;
  if (isLoading) return <p>loading</p>;
  if (error) return <p>error</p>;

  return (
    <>
      <Card className="p-3">
        <CardHeader className="border-bottom">
          <div className="d-flex gap-2 mb-0">
            {[1, 2, 3].map((item) => (
              <Button
                key={item}
                size="sm"
                style={{ fontSize: "10px" }}
                variant={step === item ? "primary" : "outline-primary"}
                onClick={() => setStep(item)}
              >
                {item === 1 && "1 User Login"}
                {item === 2 && "2 Permission Control"}
                {item === 3 && "3 Address & Signature"}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardBody>
          {/* Step 1 */}
          {step === 1 && (
            <Form>
              <b>User Login & Role</b>
              <Row className="mb-2 mt-2">
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    First Name *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Last Name *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Email Id *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    New Password (leave blank to keep same)
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    style={{ fontSize: "12px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Mobile Number *
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px", maxWidth: "80px" }}
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </Form.Select>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Select Role *
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roles.map((role: any) => (
                      <option key={role._id} value={role._id}>
                        {role.title}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Select Department *
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept: any) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={3} className="d-flex align-items-end">
                  <Form.Check
                    type="checkbox"
                    checked={selfsender}
                    label="Sender Id Self"
                    style={{ fontSize: "12px" }}
                    onChange={(e) => setSelfSender(e.target.checked)}
                  />
                </Col>

                {!selfsender && (
                  <Col md={3}>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Sender Email ID
                    </Form.Label>
                    <Form.Select size="sm" style={{ fontSize: "12px" }}>
                      <option value="">Select</option>
                    </Form.Select>
                  </Col>
                )}

                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    RM
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    style={{ fontSize: "12px" }}
                    value={reportTo}
                    onChange={(e) => setReportTo(e.target.value)}
                  >
                    <option value="">Select RM</option>
                    {staffList
                      .filter((s: any) => s._id !== id)
                      .map((s: any) => (
                        <option key={s._id} value={s._id}>
                          {s.firstName} {s.lastName}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 mt-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  style={{ fontSize: "10px" }}
                  onClick={() => router.push("./")}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ fontSize: "10px" }}
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </div>
            </Form>
          )}

          {/* Step 2 — pass initialPermissions & receive updated ones */}
          {step === 2 && (
            <PermissionControl
              initialPermissions={permissions}
              onNext={handlePermissionsNext}
            />
          )}

          {/* Step 3 */}
          {step === 3 && (
            <Form>
              <b>Staff Address</b>
              <Row className="mb-2 mt-2">
                <Col md={4}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Country *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    placeholder="Enter Country"
                    style={{ fontSize: "12px" }}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>

                <Col md={4}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    City *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    placeholder="Enter City"
                    style={{ fontSize: "12px" }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>

                <Col md={4}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Postal Code *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    placeholder="Enter Postal Code"
                    style={{ fontSize: "12px" }}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Address *
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter Full Address"
                    style={{ fontSize: "12px", resize: "none" }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col>

                <Col md={6}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Upload Photograph (100px × 100px)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    style={{ fontSize: "12px" }}
                  />
                </Col>
              </Row>

              <b className="mt-3">Staff Signature</b>
              <div className="d-flex gap-3 mb-2">
                <Form.Check
                  type="radio"
                  label="Custom"
                  checked={signatureType === "custom"}
                  onChange={() => handleSignatureTypeChange("custom")}
                  style={{ fontSize: "12px" }}
                />
                <Form.Check
                  type="radio"
                  label="Default"
                  checked={signatureType === "default"}
                  onChange={() => handleSignatureTypeChange("default")}
                  style={{ fontSize: "12px" }}
                />
              </div>

              <Form.Control
                as="textarea"
                rows={8}
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                style={{ fontSize: "12px" }}
              />

              <div className="d-flex justify-content-end gap-2 mt-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => router.push("./")}
                  style={{ fontSize: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  style={{ fontSize: "10px" }}
                  onClick={handleFinish}
                >
                  Finish
                </Button>
              </div>
            </Form>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default EditStaff;
