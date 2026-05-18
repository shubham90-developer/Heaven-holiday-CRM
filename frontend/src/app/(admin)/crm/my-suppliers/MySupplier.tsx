"use client";

import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import Filter from "./Filter";
import { useRouter } from "next/navigation";
import {
  useGetAllSuppliersQuery,
  useDeleteSupplierMutation,
  ISupplier,
} from "../../../../../Redux/supplierApi";

const MySupplier = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: suppliersData,
    isLoading,
    refetch,
  } = useGetAllSuppliersQuery({ page, limit: 20, search });

  const [deleteSupplier] = useDeleteSupplierMutation();

  const suppliers: ISupplier[] = suppliersData?.data ?? [];

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleSelectAll = () => {
    if (selectedIds.length === suppliers.length) setSelectedIds([]);
    else setSelectedIds(suppliers.map((s) => s._id));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return;
    await deleteSupplier(id);
    refetch();
  };

  return (
    <>
      {/* Filter */}
      <div className="mb-2">
        <Filter />
      </div>

      <Card className="p-3">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
            {/* Left */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() => router.push("/crm/my-suppliers/upload-supplier")}
              >
                <Icon icon="mdi:upload" className="me-1" /> Upload Suppliers
              </Button>
            </div>

            {/* Right */}
            <div className="d-flex align-items-center gap-2">
              <Button
                variant="outline-primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
                onClick={() => router.push("/crm/my-suppliers/add-supplier")}
              >
                <Icon icon="mdi:account-plus-outline" className="me-1" /> Add
                Suppliers
              </Button>

              <Button
                variant="outline-secondary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "bold" }}
              >
                <Icon icon="mdi:file-export" />
              </Button>
            </div>
          </div>

          <Row className="align-items-center">
            <Col lg={8}>
              <h6 className="fw-bold">
                Total Record Found :{" "}
                <span className="text-primary">
                  {suppliersData?.pagination?.total ?? 0}
                </span>
              </h6>
            </Col>
            <Col lg={4}>
              <input
                type="search"
                className="form-control"
                placeholder="Search name, phone, email..."
                style={{ fontSize: "10px" }}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </Col>
          </Row>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-4">
            <div className="spinner-border spinner-border-sm text-primary" />
            <p className="mt-2" style={{ fontSize: "12px" }}>
              Loading suppliers...
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table
              className="table table-sm table-bordered mb-0 align-middle"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr style={{ fontSize: "10px", whiteSpace: "nowrap" }}>
                  <th style={{ width: "40px" }}>
                    <Form.Check
                      type="checkbox"
                      checked={
                        selectedIds.length === suppliers.length &&
                        suppliers.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th style={{ width: "100px" }}>Supplier Id</th>
                  <th style={{ width: "260px" }}>Agency Details</th>
                  <th style={{ width: "120px" }}>Category</th>
                  <th style={{ width: "120px" }}>Services</th>
                  <th style={{ width: "110px" }}>RM</th>
                  <th style={{ width: "110px" }}>Last Updated</th>
                  <th style={{ width: "90px" }}>Status</th>
                  <th style={{ width: "70px" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody style={{ fontSize: "12px" }}>
                {suppliers.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-muted">
                      No suppliers found
                    </td>
                  </tr>
                ) : (
                  suppliers.map((supplier) => (
                    <tr
                      key={supplier._id}
                      className={
                        selectedIds.includes(supplier._id) ? "table-active" : ""
                      }
                    >
                      <td>
                        <Form.Check
                          checked={selectedIds.includes(supplier._id)}
                          onChange={() => toggleSelect(supplier._id)}
                        />
                      </td>

                      {/* Supplier ID (last 6 chars of _id) */}
                      <td style={{ fontFamily: "monospace", fontSize: "11px" }}>
                        {supplier._id.slice(-6).toUpperCase()}
                      </td>

                      {/* Agency Details */}
                      <td>
                        <div className="fw-semibold">
                          <Icon icon="mdi:building" className="me-1" />
                          {supplier.companyName}
                        </div>
                        <div className="fw-semibold">
                          <Icon icon="mdi:account" className="me-1" />
                          {supplier.salutation} {supplier.firstName}{" "}
                          {supplier.lastName}
                        </div>
                        <div>
                          <Icon icon="mdi:phone" className="me-1" />
                          {supplier.countryCode} {supplier.phone}
                        </div>
                        {supplier.email && (
                          <div>
                            <Icon icon="mdi:email-outline" className="me-1" />
                            {supplier.email}
                          </div>
                        )}
                      </td>

                      {/* Category */}
                      <td>{supplier.category}</td>

                      {/* Services */}
                      <td>{supplier.services}</td>

                      {/* RM */}
                      <td>
                        {supplier.rm
                          ? `${supplier.rm.firstName} ${supplier.rm.lastName}`
                          : "—"}
                      </td>

                      {/* Last Updated */}
                      <td>{formatDate(supplier.updatedAt)}</td>

                      {/* Status */}
                      <td>
                        <span
                          className={`badge ${
                            supplier.status === "active"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {supplier.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <Button
                            variant="info"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Edit"
                            onClick={() =>
                              router.push(
                                `/crm/my-suppliers/add-supplier?id=${supplier._id}`,
                              )
                            }
                          >
                            <Icon icon="mdi:pencil-outline" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ fontSize: "8px" }}
                            title="Delete"
                            onClick={() => handleDelete(supplier._id)}
                          >
                            <Icon icon="mdi:trash-can-outline" />
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

        {/* Load More */}
        {suppliersData?.pagination &&
          suppliers.length < suppliersData.pagination.total && (
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="primary"
                size="sm"
                style={{ fontSize: "10px", fontWeight: "600" }}
                onClick={() => setPage((p) => p + 1)}
              >
                Load More <Icon icon="mdi:reload" className="ms-1" />
              </Button>
            </div>
          )}
      </Card>
    </>
  );
};

export default MySupplier;
