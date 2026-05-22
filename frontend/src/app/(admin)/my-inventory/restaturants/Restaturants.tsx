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
import { useRouter } from "next/navigation";
import {
  useGetAllRestaurantsQuery,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
  IRestaurant,
  IRestaurantQuery,
} from "../../../../../Redux/restoApi";
import { toast } from "react-hot-toast";

const Restaurants = () => {
  const router = useRouter();

  // ── Query params ──────────────────────────────────────────────────────────
  const [queryParams, setQueryParams] = useState<IRestaurantQuery>({
    page: 1,
    limit: 20,
  });

  // ── Edit modal state ──────────────────────────────────────────────────────
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<IRestaurant | null>(null);
  const [editCity, setEditCity] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editRestaurantArea, setEditRestaurantArea] = useState("");
  const [editSupplierName, setEditSupplierName] = useState("");
  const [editCurrency, setEditCurrency] = useState("INR");
  const [editMealName, setEditMealName] = useState("");
  const [editIsPreferred, setEditIsPreferred] = useState(false);
  const [editIsVeg, setEditIsVeg] = useState(false);
  const [editIsNonVeg, setEditIsNonVeg] = useState(false);
  const [editIsAI, setEditIsAI] = useState(false);
  const [editErrors, setEditErrors] = useState<{
    city?: string;
    address?: string;
    restaurantArea?: string;
    supplierName?: string;
    mealName?: string;
  }>({});

  // ── Delete modal state ────────────────────────────────────────────────────
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<IRestaurant | null>(null);

  // ── RTK hooks ─────────────────────────────────────────────────────────────
  const { data, isLoading, isFetching } =
    useGetAllRestaurantsQuery(queryParams);
  const [updateRestaurant, { isLoading: isUpdating }] =
    useUpdateRestaurantMutation();
  const [deleteRestaurant, { isLoading: isDeleting }] =
    useDeleteRestaurantMutation();

  const restaurants = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  // ── Edit handlers ─────────────────────────────────────────────────────────
  const openEdit = (r: IRestaurant) => {
    setEditTarget(r);
    setEditCity(r.city);
    setEditAddress(r.address);
    setEditRestaurantArea(r.restaurantArea);
    setEditSupplierName(r.supplierName);
    setEditCurrency(r.currency);
    setEditMealName(r.mealName);
    setEditIsPreferred(r.isPreferred);
    setEditIsVeg(r.isVeg);
    setEditIsNonVeg(r.isNonVeg);
    setEditIsAI(r.isAI);
    setEditErrors({});
    setShowEditModal(true);
  };

  const clearEditError = (field: keyof typeof editErrors) =>
    setEditErrors((prev: typeof editErrors) => ({
      ...prev,
      [field]: undefined,
    }));

  const validateEdit = () => {
    const errs: typeof editErrors = {};
    if (!editCity.trim()) errs.city = "City is required";
    if (!editAddress.trim()) errs.address = "Address is required";
    if (!editRestaurantArea.trim())
      errs.restaurantArea = "Restaurant area is required";
    if (!editSupplierName.trim())
      errs.supplierName = "Supplier name is required";
    if (!editMealName.trim()) errs.mealName = "Meal name is required";
    setEditErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEditSubmit = async () => {
    if (!validateEdit() || !editTarget) return;
    try {
      await updateRestaurant({
        id: editTarget._id,
        body: {
          city: editCity.trim(),
          address: editAddress.trim(),
          restaurantArea: editRestaurantArea.trim(),
          supplierName: editSupplierName.trim(),
          currency: editCurrency,
          mealName: editMealName.trim(),
          isPreferred: editIsPreferred,
          isVeg: editIsVeg,
          isNonVeg: editIsNonVeg,
          isAI: editIsAI,
        },
      }).unwrap();
      toast.success("Restaurant updated successfully");
      setShowEditModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update restaurant");
    }
  };

  // ── Delete handlers ───────────────────────────────────────────────────────
  const openDelete = (r: IRestaurant) => {
    setDeleteTarget(r);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteRestaurant(deleteTarget._id).unwrap();
      toast.success("Restaurant deleted successfully");
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete restaurant");
    }
  };

  // ── Pagination ────────────────────────────────────────────────────────────
  const handlePageChange = (page: number) =>
    setQueryParams((prev: IRestaurantQuery) => ({ ...prev, page }));

  return (
    <>
      <Card className="p-3">
        <div className="text-end mb-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              router.push("/my-inventory/restaturants/add-restaturants")
            }
            style={{ fontSize: "10px" }}
          >
            <Icon icon="mdi:plus" className="me-1" />
            Add Restaturants
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
                <th style={{ width: "150px" }}>Restaurant Area</th>
                <th style={{ width: "250px" }}>Address</th>
                <th style={{ width: "180px" }}>Supplier Name</th>
                <th style={{ width: "120px" }}>Country</th>
                <th style={{ width: "120px" }}>City</th>
                <th style={{ width: "120px" }}>Is Preferred</th>
                <th style={{ width: "100px" }}>Rates</th>
                <th style={{ width: "100px" }}>Update</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "10px" }}>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={9} className="text-center py-3">
                    <Spinner animation="border" size="sm" />
                  </td>
                </tr>
              ) : restaurants.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-3 text-muted">
                    No restaurants found
                  </td>
                </tr>
              ) : (
                restaurants.map((r, index) => (
                  <tr key={r._id}>
                    <td>
                      {((queryParams.page ?? 1) - 1) *
                        (queryParams.limit ?? 20) +
                        index +
                        1}
                    </td>
                    <td>{r.restaurantArea}</td>
                    <td>{r.address}</td>
                    <td>{r.supplierName}</td>
                    <td>—</td>
                    <td>{r.city}</td>
                    <td>
                      <Badge
                        bg={r.isPreferred ? "success" : "secondary"}
                        style={{ fontSize: "9px" }}
                      >
                        {r.isPreferred ? "Yes" : "No"}
                      </Badge>
                    </td>
                    <td>
                      {r.rates.length > 0 ? (
                        <Badge bg="info" style={{ fontSize: "9px" }}>
                          {r.rates.length} rate{r.rates.length > 1 ? "s" : ""}
                        </Badge>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          style={{ fontSize: "9px", padding: "1px 6px" }}
                          onClick={() => openEdit(r)}
                        >
                          <Icon icon="mdi:pencil" />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          style={{ fontSize: "9px", padding: "1px 6px" }}
                          onClick={() => openDelete(r)}
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
        size="lg"
      >
        <Modal.Header closeButton style={{ fontSize: "11px" }}>
          <Modal.Title style={{ fontSize: "13px" }}>
            Edit Restaurant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="g-2">
              <Col md={4}>
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
                    clearEditError("city");
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

              <Col md={4}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Address
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editAddress}
                  onChange={(e) => {
                    setEditAddress(e.target.value);
                    clearEditError("address");
                  }}
                  isInvalid={!!editErrors.address}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {editErrors.address}
                </Form.Control.Feedback>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Restaurant Area
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editRestaurantArea}
                  onChange={(e) => {
                    setEditRestaurantArea(e.target.value);
                    clearEditError("restaurantArea");
                  }}
                  isInvalid={!!editErrors.restaurantArea}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {editErrors.restaurantArea}
                </Form.Control.Feedback>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Supplier Name
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editSupplierName}
                  onChange={(e) => {
                    setEditSupplierName(e.target.value);
                    clearEditError("supplierName");
                  }}
                  isInvalid={!!editErrors.supplierName}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {editErrors.supplierName}
                </Form.Control.Feedback>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Currency
                </Form.Label>
                <Form.Select
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editCurrency}
                  onChange={(e) => setEditCurrency(e.target.value)}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                >
                  Meal Name
                </Form.Label>
                <Form.Control
                  size="sm"
                  style={{ fontSize: "10px" }}
                  value={editMealName}
                  onChange={(e) => {
                    setEditMealName(e.target.value);
                    clearEditError("mealName");
                  }}
                  isInvalid={!!editErrors.mealName}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {editErrors.mealName}
                </Form.Control.Feedback>
              </Col>

              <Col md={3}>
                <Form.Check
                  label="Preferred"
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                  checked={editIsPreferred}
                  onChange={(e) => setEditIsPreferred(e.target.checked)}
                />
              </Col>
              <Col md={3}>
                <Form.Check
                  label="Veg"
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                  checked={editIsVeg}
                  onChange={(e) => setEditIsVeg(e.target.checked)}
                />
              </Col>
              <Col md={3}>
                <Form.Check
                  label="NonVeg"
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                  checked={editIsNonVeg}
                  onChange={(e) => setEditIsNonVeg(e.target.checked)}
                />
              </Col>
              <Col md={3}>
                <Form.Check
                  label="AI"
                  className="text-primary"
                  style={{ fontSize: "10px" }}
                  checked={editIsAI}
                  onChange={(e) => setEditIsAI(e.target.checked)}
                />
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
            variant="danger"
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
          Are you sure you want to delete restaurant at{" "}
          <strong>{deleteTarget?.restaurantArea}</strong> ({deleteTarget?.city}
          )?
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

export default Restaurants;
