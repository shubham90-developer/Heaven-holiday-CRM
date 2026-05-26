import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import {
  useAddBankDetailMutation,
  useUpdateBankDetailMutation,
  IBankDetail,
} from "../../../../../../Redux/company-profileApi";

type AddBankDetailProps = {
  onClose: () => void;
  editData: IBankDetail | null; // null = add mode, IBankDetail = edit mode
};

const EMPTY_FORM = {
  accountName: "",
  accountNo: "",
  ifscSortCode: "",
  accountType: "Saving",
  bankName: "",
  branch: "",
  country: "",
  city: "",
};

const AddBankDetail = ({ onClose, editData }: AddBankDetailProps) => {
  const [form, setForm] = useState(EMPTY_FORM);

  const [addBankDetail, { isLoading: isAdding }] = useAddBankDetailMutation();
  const [updateBankDetail, { isLoading: isUpdating }] =
    useUpdateBankDetailMutation();

  const isLoading = isAdding || isUpdating;
  const isEditMode = editData !== null;

  // Pre-fill form when editing
  useEffect(() => {
    if (editData) {
      setForm({
        accountName: editData.accountName,
        accountNo: editData.accountNo,
        ifscSortCode: editData.ifscSortCode,
        accountType: editData.accountType,
        bankName: editData.bankName,
        branch: editData.branch,
        country: editData.country ?? "",
        city: editData.city ?? "",
      });
    }
  }, [editData]);

  const update = (field: keyof typeof EMPTY_FORM, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    const {
      accountName,
      accountNo,
      ifscSortCode,
      accountType,
      bankName,
      branch,
      country,
      city,
    } = form;

    if (
      !accountName ||
      !accountNo ||
      !ifscSortCode ||
      !accountType ||
      !bankName ||
      !branch ||
      !country ||
      !city
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (isEditMode && editData) {
        await updateBankDetail({ bankId: editData._id, body: form }).unwrap();
        alert("Bank detail updated successfully!");
      } else {
        await addBankDetail(form).unwrap();
        alert("Bank detail added successfully!");
      }
      onClose();
    } catch (err) {
      console.error("Failed to save bank detail:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Modal show={true} onHide={onClose} centered>
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>
            {isEditMode ? "Edit Bank Detail" : "Add Bank Detail"}
          </Modal.Title>
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
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Account Holder Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ fontSize: "10px" }}
                  value={form.accountName}
                  onChange={(e) => update("accountName", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Account Number *
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ fontSize: "10px" }}
                  value={form.accountNo}
                  onChange={(e) => update("accountNo", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  IFSC / Sort Code *
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ fontSize: "10px" }}
                  value={form.ifscSortCode}
                  onChange={(e) => update("ifscSortCode", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Account Type *
                </Form.Label>
                <Form.Select
                  style={{ fontSize: "10px" }}
                  value={form.accountType}
                  onChange={(e) => update("accountType", e.target.value)}
                >
                  <option value="Saving">Saving</option>
                  <option value="Current">Current</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Bank *
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ fontSize: "10px" }}
                  value={form.bankName}
                  onChange={(e) => update("bankName", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Branch *
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ fontSize: "10px" }}
                  value={form.branch}
                  onChange={(e) => update("branch", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  Country *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Country"
                  style={{ fontSize: "10px" }}
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{ fontSize: "10px" }}
                  className="text-primary"
                >
                  City *
                </Form.Label>
                <Form.Control
                  type="text"
                  style={{ fontSize: "10px" }}
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
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
              {isLoading ? "Saving..." : "Submit"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddBankDetail;
