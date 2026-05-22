"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Spinner,
  Badge,
} from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "../hotels/components/Filter";
import { useRouter } from "next/navigation";
// adjust path as needed
import {
  useGetAllAreasQuery,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
  IArea,
  IAreaQuery, // ← must be here
} from "../../../../../Redux/areaApi";

import { toast } from "react-hot-toast";

const AreaMaster = () => {
  const router = useRouter();

  // ── Query params state ────────────────────────────────────────────────────
  const [queryParams, setQueryParams] = useState<IAreaQuery>({
    page: 1,
    limit: 20,
  });

  // ── Edit modal state ──────────────────────────────────────────────────────
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<IArea | null>(null);
  const [editCity, setEditCity] = useState("");
  const [editArea, setEditArea] = useState("");
  const [editIsActive, setEditIsActive] = useState(true);
  const [editErrors, setEditErrors] = useState<{
    city?: string;
    area?: string;
  }>({});

  // ── Delete confirm modal state ────────────────────────────────────────────
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<IArea | null>(null);

  // ── RTK hooks ─────────────────────────────────────────────────────────────
  const { data, isLoading, isFetching } = useGetAllAreasQuery(queryParams);
  const [updateArea, { isLoading: isUpdating }] = useUpdateAreaMutation();
  const [deleteArea, { isLoading: isDeleting }] = useDeleteAreaMutation();

  const areas = data?.data ?? [];
  const pagination = data?.pagination;

  // ── Edit handlers ─────────────────────────────────────────────────────────
  const openEdit = (area: IArea) => {
    setEditTarget(area);
    setEditCity(area.city);
    setEditArea(area.area);
    setEditIsActive(area.isActive);
    setEditErrors({});
    setShowEditModal(true);
  };

  const validateEdit = () => {
    const errs: { city?: string; area?: string } = {};
    if (!editCity.trim()) errs.city = "City is required";
    if (!editArea.trim()) errs.area = "Area is required";
    setEditErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEditSubmit = async () => {
    if (!validateEdit() || !editTarget) return;
    try {
      await updateArea({
        id: editTarget._id,
        body: {
          city: editCity.trim(),
          area: editArea.trim(),
          isActive: editIsActive,
        },
      }).unwrap();
      toast.success("Area updated successfully");
      setShowEditModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update area");
    }
  };

  // ── Delete handlers ───────────────────────────────────────────────────────
  const openDelete = (area: IArea) => {
    setDeleteTarget(area);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteArea(deleteTarget._id).unwrap();
      toast.success("Area deleted successfully");
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete area");
    }
  };

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  return (
    <>
      <div className="mb-2">
        <Filter />
      </div>

      <Card className="p-3">
        <div className="text-end mb-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push("/my-inventory/area-master/add-area")}
            style={{ fontSize: "10px" }}
          >
            <Icon icon="mdi:plus" className="me-1" />
            Add Area Master
          </Button>
        </div>

        <div className="table-responsive">
          <table
            className="table table-sm table-bordered mb-0 align-middle"
            style={{ tableLayout: "fixed", width: "100%" }}
          >
            <thead>
              <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                <th style={{ width: "50px" }}>S.No</th>
                <th style={{ width: "150px" }}>City</th>
                <th style={{ width: "150px" }}>Area</th>
                <th style={{ width: "100px" }}>Status</th>
                <th style={{ width: "100px" }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "10px" }}>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={5} className="text-center py-3">
                    <Spinner animation="border" size="sm" />
                  </td>
                </tr>
              ) : areas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-3 text-muted">
                    No areas found
                  </td>
                </tr>
              ) : (
                areas.map((area, index) => (
                  <tr key={area._id}>
                    <td>
                      {((queryParams.page ?? 1) - 1) *
                        (queryParams.limit ?? 20) +
                        index +
                        1}
                    </td>
                    <td>{area.city}</td>
                    <td>{area.area}</td>
                    <td>
                      <Badge
                        bg={area.isActive ? "success" : "secondary"}
                        style={{ fontSize: "9px" }}
                      >
                        {area.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          style={{ fontSize: "9px", padding: "1px 6px" }}
                          onClick={() => openEdit(area)}
                        >
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          style={{ fontSize: "9px", padding: "1px 6px" }}
                          onClick={() => openDelete(area)}
                        >
                          <Icon icon="mdi:delete" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.total > pagination.limit && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span style={{ fontSize: "10px" }} className="text-muted">
              Showing{" "}
              {((queryParams.page ?? 1) - 1) * (queryParams.limit ?? 20) + 1}–
              {Math.min(
                (queryParams.page ?? 1) * (queryParams.limit ?? 20),
                pagination.total,
              )}{" "}
              of {pagination.total}
            </span>
            <div className="d-flex gap-1">
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px" }}
                disabled={(queryParams.page ?? 1) <= 1}
                onClick={() => handlePageChange((queryParams.page ?? 1) - 1)}
              >
                Prev
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px" }}
                disabled={(queryParams.page ?? 1) >= totalPages}
                onClick={() => handlePageChange((queryParams.page ?? 1) + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* ── Edit Modal ──────────────────────────────────────────────────────── */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton style={{ fontSize: "11px" }}>
          <Modal.Title style={{ fontSize: "13px" }}>Edit Area</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-2">
              <Col xs={12}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  City
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editCity}
                  onChange={(e) => {
                    setEditCity(e.target.value);
                    if (editErrors.city)
                      setEditErrors((p) => ({ ...p, city: undefined }));
                  }}
                  isInvalid={!!editErrors.city}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {editErrors.city}
                </Form.Control.Feedback>
              </Col>
              <Col xs={12}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Area
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editArea}
                  onChange={(e) => {
                    setEditArea(e.target.value);
                    if (editErrors.area)
                      setEditErrors((p) => ({ ...p, area: undefined }));
                  }}
                  isInvalid={!!editErrors.area}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {editErrors.area}
                </Form.Control.Feedback>
              </Col>
              <Col xs={12}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Status
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editIsActive ? "true" : "false"}
                  onChange={(e) => setEditIsActive(e.target.value === "true")}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            size="sm"
            style={{ fontSize: "11px" }}
            onClick={() => setShowEditModal(false)}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            size="sm"
            style={{ fontSize: "11px" }}
            onClick={handleEditSubmit}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ── Delete Confirm Modal ────────────────────────────────────────────── */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        size="sm"
      >
        <Modal.Header closeButton style={{ fontSize: "11px" }}>
          <Modal.Title style={{ fontSize: "13px" }}>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "11px" }}>
          Are you sure you want to delete <strong>{deleteTarget?.area}</strong>{" "}
          ({deleteTarget?.city})?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            size="sm"
            style={{ fontSize: "11px" }}
            onClick={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            style={{ fontSize: "11px" }}
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AreaMaster;
