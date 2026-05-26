"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
import { useCreateEmailTemplateMutation } from "../../../../../../Redux/email-templateApi";

import {
  ICreateEmailTemplate,
  EmailTemplateStatus,
} from "../../../../../../Redux/email-templateApi";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ─── Component ────────────────────────────────────────────────────────────────

const AddTemplate = () => {
  const router = useRouter();

  // ─── Form state ─────────────────────────────────────────────────────────────
  const [templateName, setTemplateName] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState<EmailTemplateStatus>("active");
  const [messageBody, setMessageBody] = useState("");

  // ─── RTK mutation ────────────────────────────────────────────────────────────
  const [createEmailTemplate, { isLoading, isError, isSuccess }] =
    useCreateEmailTemplateMutation();

  // ─── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    try {
      const payload: ICreateEmailTemplate = {
        templateName,
        subject,
        status,
        messageBody,
      };
      await createEmailTemplate(payload).unwrap();
      router.push("/settings/email-templates");
    } catch (err) {
      console.error("Failed to create email template:", err);
    }
  };

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
            Failed to save template. Please try again.
          </div>
        )}
        {isSuccess && (
          <div
            className="alert alert-success py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Template saved successfully!
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
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Submit"}
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default AddTemplate;
