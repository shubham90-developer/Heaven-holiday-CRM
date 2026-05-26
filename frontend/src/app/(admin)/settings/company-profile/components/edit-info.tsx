import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Nav, Tab } from "react-bootstrap";
import {
  useUpdateCompanyProfileMutation,
  IGeneralInformation,
  IOwnerDetail,
  IMoreInformation,
  ICompanyProfile,
} from "../../../../../../Redux/company-profileApi";

type EditInfoModalProps = {
  onClose: () => void;
  profile: ICompanyProfile;
};

// ─── Component ────────────────────────────────────────────────────────────────

const EditInfoModal = ({ onClose, profile }: EditInfoModalProps) => {
  const [updateCompanyProfile, { isLoading }] =
    useUpdateCompanyProfileMutation();

  // ── General Information state ─────────────────────────────────────────────
  const [gi, setGi] = useState<IGeneralInformation>({
    companyName: "",
    email: "",
    companyDisplayName: "",
    website: "",
    contactPerson: "",
    registeredAddress: "",
    mobileNumber: "",
    aboutCompany: "",
    landlineNumber: "",
    companyLogo: "",
  });

  // ── Owner Detail state ────────────────────────────────────────────────────
  const [od, setOd] = useState<IOwnerDetail>({
    fullName: "",
    designation: "",
    contactNo: "",
    role: "",
    mobileNumber: "",
    gstinNumber: "",
    emailId: "",
  });

  // ── More Information state ────────────────────────────────────────────────
  const [mi, setMi] = useState<IMoreInformation>({
    senderEmailId: "",
    natureOfBusiness: "",
  });

  // ── Pre-fill from existing profile ────────────────────────────────────────
  useEffect(() => {
    if (profile?.generalInformation) {
      setGi({ ...profile.generalInformation });
    }
    if (profile?.ownerDetail) {
      setOd({ ...profile.ownerDetail });
    }
    if (profile?.moreInformation) {
      setMi({
        senderEmailId: profile.moreInformation.senderEmailId ?? "",
        natureOfBusiness: profile.moreInformation.natureOfBusiness ?? "",
      });
    }
  }, [profile]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const updateGi = (field: keyof IGeneralInformation, value: string) =>
    setGi((prev) => ({ ...prev, [field]: value }));

  const updateOd = (field: keyof IOwnerDetail, value: string) =>
    setOd((prev) => ({ ...prev, [field]: value }));

  const updateMi = (field: keyof IMoreInformation, value: string) =>
    setMi((prev) => ({ ...prev, [field]: value }));

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (
      !gi.companyName ||
      !gi.email ||
      !gi.companyDisplayName ||
      !gi.contactPerson ||
      !gi.registeredAddress ||
      !gi.mobileNumber
    ) {
      alert("Please fill in all required General Information fields.");
      return;
    }

    if (
      !od.fullName ||
      !od.designation ||
      !od.contactNo ||
      !od.role ||
      !od.mobileNumber ||
      !od.gstinNumber ||
      !od.emailId
    ) {
      alert("Please fill in all required Owner Detail fields.");
      return;
    }

    try {
      await updateCompanyProfile({
        generalInformation: gi,
        ownerDetail: od,
        moreInformation: mi,
      }).unwrap();
      alert("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      {/* Header */}
      <Modal.Header
        style={{ background: "#274c6b", color: "#fff" }}
        className="d-flex justify-content-between"
      >
        <Modal.Title style={{ fontSize: "14px" }}>Edit Info</Modal.Title>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </Modal.Header>

      <Modal.Body>
        <Tab.Container defaultActiveKey="general">
          {/* Tabs */}
          <Nav variant="tabs" className="mb-3" style={{ fontSize: "11px" }}>
            <Nav.Item>
              <Nav.Link eventKey="general">General Information</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="owner">Owner's Detail</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="more">More Information</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* ── General Information Tab ─────────────────────────────────── */}
            <Tab.Pane eventKey="general">
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Company Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.companyName}
                      onChange={(e) => updateGi("companyName", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Email *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      style={{ fontSize: "10px" }}
                      value={gi.email}
                      onChange={(e) => updateGi("email", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Company Display Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.companyDisplayName}
                      onChange={(e) =>
                        updateGi("companyDisplayName", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Website
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.website ?? ""}
                      onChange={(e) => updateGi("website", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Contact Person *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.contactPerson}
                      onChange={(e) =>
                        updateGi("contactPerson", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Mobile Number *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.mobileNumber}
                      onChange={(e) => updateGi("mobileNumber", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Landline Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.landlineNumber ?? ""}
                      onChange={(e) =>
                        updateGi("landlineNumber", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      About Company
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.aboutCompany ?? ""}
                      onChange={(e) => updateGi("aboutCompany", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Registered Address *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      style={{ fontSize: "10px" }}
                      value={gi.registeredAddress}
                      onChange={(e) =>
                        updateGi("registeredAddress", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Company Logo URL
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={gi.companyLogo ?? ""}
                      onChange={(e) => updateGi("companyLogo", e.target.value)}
                      placeholder="https://..."
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab.Pane>

            {/* ── Owner's Detail Tab ──────────────────────────────────────── */}
            <Tab.Pane eventKey="owner">
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Full Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={od.fullName}
                      onChange={(e) => updateOd("fullName", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Designation *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={od.designation}
                      onChange={(e) => updateOd("designation", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Contact No *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={od.contactNo}
                      onChange={(e) => updateOd("contactNo", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Role *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={od.role}
                      onChange={(e) => updateOd("role", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Mobile Number *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={od.mobileNumber}
                      onChange={(e) => updateOd("mobileNumber", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      GSTIN Number *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={od.gstinNumber}
                      onChange={(e) => updateOd("gstinNumber", e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Email Id *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      style={{ fontSize: "10px" }}
                      value={od.emailId}
                      onChange={(e) => updateOd("emailId", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab.Pane>

            {/* ── More Information Tab ────────────────────────────────────── */}
            <Tab.Pane eventKey="more">
              <Row className="g-2">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Sender Email ID
                    </Form.Label>
                    <Form.Control
                      type="email"
                      style={{ fontSize: "10px" }}
                      value={mi.senderEmailId ?? ""}
                      onChange={(e) =>
                        updateMi("senderEmailId", e.target.value)
                      }
                      placeholder="sender@example.com"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label
                      style={{ fontSize: "10px" }}
                      className="text-primary"
                    >
                      Nature Of Business
                    </Form.Label>
                    <Form.Control
                      type="text"
                      style={{ fontSize: "10px" }}
                      value={mi.natureOfBusiness ?? ""}
                      onChange={(e) =>
                        updateMi("natureOfBusiness", e.target.value)
                      }
                      placeholder="e.g. B2C B2B"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-end gap-2">
          <Button
            size="sm"
            onClick={onClose}
            variant="outline-danger"
            style={{ fontSize: "12px" }}
          >
            Close
          </Button>
          <Button
            size="sm"
            variant="success"
            style={{ fontSize: "12px" }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditInfoModal;
