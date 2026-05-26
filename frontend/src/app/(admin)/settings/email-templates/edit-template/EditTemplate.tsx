"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tabs,
  Tab,
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
  CardHeader,
  CardBody,
} from "react-bootstrap";

import {
  useGetEmailTemplateByIdQuery,
  useUpdateEmailTemplateMutation,
} from "../../../../../../Redux/email-templateApi";
import type {
  IUpdateEmailTemplate,
  EmailTemplateStatus,
} from "../../../../../../Redux/email-templateApi";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ─── Component ────────────────────────────────────────────────────────────────

const EditTemplate = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // ─── Form state ─────────────────────────────────────────────────────────────
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState<EmailTemplateStatus>("active");
  const [messageBody, setMessageBody] = useState("");

  // ─── RTK hooks ──────────────────────────────────────────────────────────────
  const { data, isLoading: isFetching } = useGetEmailTemplateByIdQuery(id, {
    skip: !id,
  });

  const [updateEmailTemplate, { isLoading: isSaving, isError, isSuccess }] =
    useUpdateEmailTemplateMutation();

  // ─── Seed form from fetched data ─────────────────────────────────────────────
  useEffect(() => {
    if (data?.data) {
      setTemplateName(data.data.templateName);
      setSubject(data.data.subject);
      setStatus(data.data.status);
      setMessageBody(data.data.messageBody);
    }
  }, [data]);

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    try {
      const payload: IUpdateEmailTemplate = {
        templateName,
        subject,
        status,
        messageBody,
      };
      await updateEmailTemplate({ id, body: payload }).unwrap();
      router.push("/settings/email-templates");
    } catch (err) {
      console.error("Failed to update email template:", err);
    }
  };

  // ─── Loading state ───────────────────────────────────────────────────────────
  if (isFetching)
    return (
      <div className="text-center py-4" style={{ fontSize: "12px" }}>
        Loading...
      </div>
    );

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <Card className="p-3">
        {/* Error / Success banners */}
        {isError && (
          <div
            className="alert alert-danger py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Failed to update template. Please try again.
          </div>
        )}
        {isSuccess && (
          <div
            className="alert alert-success py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Template updated successfully!
          </div>
        )}

        <Form>
          <Row className="g-2">
            {/* Template Name */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Template Name *
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </Col>

            {/* Subject */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Subject *
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Col>

            {/* Status */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Status
              </Form.Label>
              <Form.Select
                size="sm"
                style={{ fontSize: "10px" }}
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as EmailTemplateStatus)
                }
              >
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </Form.Select>
            </Col>

            {/* Message Body — ReactQuill rich text editor */}
            <Col md={12}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Message Body
              </Form.Label>
              <ReactQuill
                theme="snow"
                value={messageBody}
                onChange={(val) => setMessageBody(val)}
                style={{ fontSize: "10px" }}
              />
            </Col>
          </Row>

          <div className="d-flex gap-2 justify-content-end mt-3">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => router.push("/settings/email-templates")}
              style={{ fontSize: "10px" }}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              size="sm"
              style={{ fontSize: "10px" }}
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Submit"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default EditTemplate;
