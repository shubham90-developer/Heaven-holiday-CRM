"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import PermissionControl from "./PermissionControl";
import {
  useCreateStaffMutation,
  IPermissionSection,
} from "../../../../../../../Redux/staffApi";
import { useGetAllDepartmentsQuery } from "../../../../../../../Redux/deptApi";
import { useGetAllRolesQuery } from "../../../../../../../Redux/rolesApi";
import { useGetAllStaffQuery } from "../../../../../../../Redux/staffApi";
import { toast } from "react-hot-toast";

const AddStaff = () => {
  const [step, setStep] = useState(1);
  const [selfsender, setSelfSender] = useState(false);
  const router = useRouter();
  const [createStaff, { isLoading }] = useCreateStaffMutation();
  const { data: rolesData } = useGetAllRolesQuery();
  const { data: departmentsData } = useGetAllDepartmentsQuery();
  const { data: staffData } = useGetAllStaffQuery({ archived: false });
  // Step 1 state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "+91",
    mobile: "",
    roleId: "",
    departmentId: "",
    reportTo: "",
    senderIdSelf: false,
    senderEmail: "",
  });

  // Step 2 state
  const [permissions, setPermissions] = useState<IPermissionSection[]>([]);

  // Step 3 state
  const [signatureType, setSignatureType] = useState("default");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [photograph, setPhotograph] = useState<File | null>(null);

  const defaultSignature = `Kind Regards,

${formData.firstName} ${formData.lastName}
${formData.departmentId}
m: ${formData.countryCode} ${formData.mobile}
${formData.email}
Rate our Services`;

  const [signature, setSignature] = useState(defaultSignature);

  useEffect(() => {
    if (signatureType === "default") {
      setSignature(defaultSignature);
    }
  }, [
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.mobile,
    formData.countryCode,
    formData.departmentId,
  ]);

  const handleChange = (type: string) => {
    setSignatureType(type);
    if (type === "default") {
      setSignature(defaultSignature);
    } else {
      setSignature("");
    }
  };

  const handleFinish = async () => {
    try {
      await createStaff({
        ...formData,
        reportTo: formData.reportTo || undefined,
        senderIdSelf: selfsender,
        senderEmail: selfsender ? undefined : formData.senderEmail,
        permissions,
        country,
        city,
        postalCode,
        address,
        signatureType: signatureType as "default" | "custom",
        signature,
      }).unwrap();

      toast.success("Staff created successfully");
      router.push("./");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create staff");
    }
  };

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
                onClick={() => {
                  if (item <= step) setStep(item);
                }}
              >
                {item === 1 && "1 User Login"}
                {item === 2 && "2 Permission Control"}
                {item === 3 && "3 Address & Signature"}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardBody>
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
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
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
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Label
                    style={{ fontSize: "10px" }}
                    className="text-primary"
                  >
                    Password *
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    type="password"
                    style={{ fontSize: "12px" }}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                    >
                      <option>+91</option>
                    </Form.Select>
                    <Form.Control
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
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
                    value={formData.roleId}
                    onChange={(e) =>
                      setFormData({ ...formData, roleId: e.target.value })
                    }
                  >
                    <option value="">Select Role</option>
                    {rolesData?.data?.map((role) => (
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
                    value={formData.departmentId}
                    onChange={(e) =>
                      setFormData({ ...formData, departmentId: e.target.value })
                    }
                  >
                    <option value="">Select Department</option>
                    {departmentsData?.data?.map((dept) => (
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
                    <Form.Select
                      size="sm"
                      style={{ fontSize: "12px" }}
                      value={formData.senderEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          senderEmail: e.target.value,
                        })
                      }
                    >
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
                    value={formData.reportTo}
                    onChange={(e) =>
                      setFormData({ ...formData, reportTo: e.target.value })
                    }
                  >
                    <option value="">Select RM</option>
                    {staffData?.data?.map((s) => (
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

          {step === 2 && (
            <PermissionControl
              onNext={(data: IPermissionSection[]) => {
                setPermissions(data);
                setStep((prev) => prev + 1);
              }}
            />
          )}

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
                  <div className="d-flex">
                    <Form.Control
                      type="file"
                      size="sm"
                      style={{ fontSize: "12px" }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhotograph(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                </Col>
              </Row>

              <b className="mt-3">Staff Signature</b>
              <div className="d-flex gap-3 mb-2">
                <Form.Check
                  type="radio"
                  label="Custom"
                  checked={signatureType === "custom"}
                  onChange={() => handleChange("custom")}
                  style={{ fontSize: "12px" }}
                />
                <Form.Check
                  type="radio"
                  label="Default"
                  checked={signatureType === "default"}
                  onChange={() => handleChange("default")}
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
                  disabled={isLoading}
                  onClick={handleFinish}
                >
                  {isLoading ? "Saving..." : "Finish"}
                </Button>
              </div>
            </Form>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default AddStaff;
