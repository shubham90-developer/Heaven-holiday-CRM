"use client";
import React, { useState } from "react";
import { Button, Row, Col, Card, CardHeader, CardBody } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import AddBankDetail from "./components/AddBankDetails";
import EditInfoModal from "./components/edit-info";
import {
  useGetCompanyProfileQuery,
  useDeleteBankDetailMutation,
  IBankDetail,
} from "../../../../../Redux/company-profileApi";
const CompanyProfile = () => {
  // null = closed | "add" = add mode | IBankDetail = edit mode
  const [bankModal, setBankModal] = useState<null | "add" | IBankDetail>(null);
  const [editInfoModal, setEditInfoModal] = useState(false);

  // ── RTK ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useGetCompanyProfileQuery();
  const [deleteBankDetail] = useDeleteBankDetailMutation();

  const profile = data?.data;
  const gi = profile?.generalInformation;
  const od = profile?.ownerDetail;
  const mi = profile?.moreInformation;

  const handleDeleteBank = async (bankId: string) => {
    if (!confirm("Are you sure you want to delete this bank detail?")) return;
    try {
      await deleteBankDetail(bankId).unwrap();
    } catch {
      alert("Failed to delete. Please try again.");
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-4" style={{ fontSize: "12px" }}>
        Loading...
      </div>
    );

  return (
    <>
      <Card className="p-3">
        {/* General Information */}
        <Card className="shadow-sm">
          <CardHeader className="px-3 py-2 bg-light d-flex justify-content-between align-items-center">
            <h6 style={{ fontSize: "12px" }}>General Information</h6>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setEditInfoModal(true)}
              style={{ fontSize: "12px" }}
            >
              <Icon icon="mdi:edit" className="me-1" />
              Edit Info
            </Button>
          </CardHeader>
          <CardBody className="">
            <Row className="g-2">
              <Col md={6}>
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <tbody style={{ fontSize: "10px" }}>
                      <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                        <td>
                          <b>Company Name :</b>
                        </td>
                        <td>{gi?.companyName ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Company Display Name</b>
                        </td>
                        <td>{gi?.companyDisplayName ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Contact Person</b>
                        </td>
                        <td>{gi?.contactPerson ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Mobile Number</b>
                        </td>
                        <td>{gi?.mobileNumber ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Landline Number</b>
                        </td>
                        <td>{gi?.landlineNumber ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>

              <Col md={6}>
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <tbody style={{ fontSize: "10px" }}>
                      <tr style={{ whiteSpace: "nowrap" }}>
                        <td>
                          <b>Email</b>
                        </td>
                        <td>{gi?.email ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Website</b>
                        </td>
                        <td>
                          {gi?.website ? (
                            <a
                              href={gi.website}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {gi.website}
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Registered Address</b>
                        </td>
                        <td>{gi?.registeredAddress ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>About Company</b>
                        </td>
                        <td>{gi?.aboutCompany ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Company Logo</b>
                        </td>
                        <td>
                          {gi?.companyLogo ? (
                            <Image
                              src={gi.companyLogo}
                              width={50}
                              height={50}
                              alt="company logo"
                            />
                          ) : (
                            <Image
                              src={logo}
                              width={50}
                              height={50}
                              alt="company logo"
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* Owner's Detail */}
        <Card className="shadow-sm">
          <CardHeader className="px-3 py-2 bg-light d-flex justify-content-between align-items-center">
            <h6 style={{ fontSize: "12px" }}>Owner's Detail</h6>
          </CardHeader>
          <CardBody className="">
            <Row className="g-2">
              <Col md={6}>
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <tbody style={{ fontSize: "10px" }}>
                      <tr>
                        <td>
                          <b>Full Name</b>
                        </td>
                        <td>{od?.fullName ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Contact No</b>
                        </td>
                        <td>{od?.contactNo ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Mobile Number</b>
                        </td>
                        <td>{od?.mobileNumber ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Email Id</b>
                        </td>
                        <td>{od?.emailId ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>

              <Col md={6}>
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <tbody style={{ fontSize: "10px" }}>
                      <tr>
                        <td>
                          <b>Designation</b>
                        </td>
                        <td>{od?.designation ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Role</b>
                        </td>
                        <td>{od?.role ?? "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>GSTIN Number</b>
                        </td>
                        <td>{od?.gstinNumber ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* Bank's Detail */}
        <Card className="shadow-sm">
          <CardHeader className="px-3 py-2 bg-light d-flex justify-content-between align-items-center">
            <h6 style={{ fontSize: "12px" }}>Bank's Detail</h6>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setBankModal("add")}
              style={{ fontSize: "12px" }}
            >
              Add
            </Button>
          </CardHeader>
          <CardBody className="">
            <Row className="g-2">
              <Col md={12}>
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <thead style={{ fontSize: "10px" }}>
                      <tr>
                        <th>Account Name</th>
                        <th>Account No</th>
                        <th>IFSC / Sort Code</th>
                        <th>Account Type</th>
                        <th>Bank Name</th>
                        <th>Branch</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "10px" }}>
                      {!profile?.bankDetails?.length ? (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center"
                            style={{ fontSize: "11px" }}
                          >
                            No bank details found.
                          </td>
                        </tr>
                      ) : (
                        profile.bankDetails.map((bank) => (
                          <tr
                            key={bank._id}
                            style={{ fontSize: "10px", whiteSpace: "nowrap" }}
                          >
                            <td>{bank.accountName}</td>
                            <td>{bank.accountNo}</td>
                            <td>{bank.ifscSortCode}</td>
                            <td>{bank.accountType}</td>
                            <td>{bank.bankName}</td>
                            <td>{bank.branch}</td>
                            <td>
                              <div className="d-flex gap-1">
                                <span className="action-button delete">
                                  <Button
                                    size="sm"
                                    variant="primary"
                                    title="edit"
                                    onClick={() => setBankModal(bank)}
                                    style={{ fontSize: "12px" }}
                                  >
                                    <Icon icon="mdi:edit" />
                                  </Button>
                                </span>
                                <span className="action-button delete">
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    title="delete"
                                    style={{ fontSize: "12px" }}
                                    onClick={() => handleDeleteBank(bank._id)}
                                  >
                                    <Icon icon="mdi:delete" />
                                  </Button>
                                </span>
                                <span className="action-button delete">
                                  <Button
                                    size="sm"
                                    variant="success"
                                    title="active"
                                    style={{ fontSize: "12px" }}
                                  >
                                    <Icon icon="mdi:check" />
                                  </Button>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* More Information */}
        <Card className="shadow-sm">
          <CardHeader className="px-3 py-2 bg-light d-flex justify-content-between align-items-center">
            <h6 style={{ fontSize: "12px" }}>More Information</h6>
          </CardHeader>
          <CardBody className="">
            <Row className="g-2">
              <Col md={6}>
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <tbody style={{ fontSize: "10px" }}>
                      <tr>
                        <td>
                          <b>Sender Email ID</b>
                        </td>
                        <td>{mi?.senderEmailId ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>

              <Col md={6}>
                <div className="table-responsive">
                  <table
                    className="table table-sm table-bordered mb-0 align-middle"
                    style={{ tableLayout: "fixed", width: "100%" }}
                  >
                    <tbody style={{ fontSize: "10px" }}>
                      <tr>
                        <td>
                          <b>Nature Of Business</b>
                        </td>
                        <td>{mi?.natureOfBusiness ?? "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Card>

      {/* Edit Info Modal */}
      {editInfoModal && profile && (
        <EditInfoModal
          onClose={() => setEditInfoModal(false)}
          profile={profile}
        />
      )}

      {/* Bank Modal — Add or Edit */}
      {bankModal !== null && (
        <AddBankDetail
          onClose={() => setBankModal(null)}
          editData={bankModal === "add" ? null : bankModal}
        />
      )}
    </>
  );
};

export default CompanyProfile;
