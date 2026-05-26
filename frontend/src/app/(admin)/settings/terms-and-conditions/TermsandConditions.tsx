"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  Col,
  Row,
  CardHeader,
  CardBody,
  CardFooter,
} from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
} from "../../../../../Redux/terms-conditionsApi";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ─── Section config — same pattern as AddSightseeing ─────────────────────────

interface SectionState {
  tcDomesticHolidays: string;
  tcInternationalHolidays: string;
  cancellationPolicyDomesticHolidays: string;
}

const INITIAL_STATE: SectionState = {
  tcDomesticHolidays: "",
  tcInternationalHolidays: "",
  cancellationPolicyDomesticHolidays: "",
};

const SECTIONS: { title: string; key: keyof SectionState }[] = [
  {
    title: "Terms & Conditions (Domestic Holidays)",
    key: "tcDomesticHolidays",
  },
  {
    title: "Terms & Conditions (International Holidays)",
    key: "tcInternationalHolidays",
  },
  {
    title: "Cancellation Policy (Domestic Holidays)",
    key: "cancellationPolicyDomesticHolidays",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const TermsAndConditions = () => {
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(0);
  const [form, setForm] = useState<SectionState>(INITIAL_STATE);

  // ── RTK ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useGetTermsConditionsQuery();
  const [updateTermsConditions, { isLoading: isSaving }] =
    useUpdateTermsConditionsMutation();

  // ── Pre-fill from fetched data ────────────────────────────────────────────
  useEffect(() => {
    if (data?.data) {
      setForm({
        tcDomesticHolidays: data.data.tcDomesticHolidays ?? "",
        tcInternationalHolidays: data.data.tcInternationalHolidays ?? "",
        cancellationPolicyDomesticHolidays:
          data.data.cancellationPolicyDomesticHolidays ?? "",
      });
    }
  }, [data]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    try {
      await updateTermsConditions(form).unwrap();
      alert("Terms and conditions saved successfully!");
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Something went wrong. Please try again.");
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
        {/* ── Rich Text Sections — same pattern as AddSightseeing ─────────── */}
        {SECTIONS.map((section, index) => (
          <Card className="mt-2" key={index}>
            <CardHeader
              className="bg-secondary d-flex align-items-center justify-content-between p-1 px-2 text-white fw-bold"
              onClick={() =>
                setOpenSectionIndex(openSectionIndex === index ? null : index)
              }
              style={{ cursor: "pointer" }}
            >
              <span
                style={{ fontSize: "12px" }}
                className="text-primary small text-white"
              >
                {section.title}
              </span>
              <Icon
                icon={openSectionIndex === index ? "mdi:minus" : "mdi:plus"}
                className="text-white fw-bold"
              />
            </CardHeader>

            {openSectionIndex === index && (
              <CardBody>
                <Col md={12}>
                  <ReactQuill
                    theme="snow"
                    value={form[section.key]}
                    onChange={(val) =>
                      setForm((prev) => ({ ...prev, [section.key]: val }))
                    }
                    style={{ fontSize: "12px" }}
                  />
                </Col>
              </CardBody>
            )}
          </Card>
        ))}

        {/* ── Save Button ───────────────────────────────────────────────────── */}
        <CardFooter className="text-end mt-2">
          <Button
            variant="danger"
            size="sm"
            style={{ fontSize: "12px" }}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TermsAndConditions;
