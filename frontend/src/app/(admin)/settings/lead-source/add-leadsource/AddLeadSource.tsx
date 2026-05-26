"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useCreateLeadSourceMutation } from "../../../../../../Redux/leadSourcesApi";
const AddLeadSource = () => {
  const router = useRouter();
  const [createLeadSource, { isLoading }] = useCreateLeadSourceMutation();

  const [leadSourceName, setLeadSourceName] = useState("");
  const [status, setStatus] = useState(true);

  const handleSubmit = async () => {
    try {
      await createLeadSource({ leadSourceName, status }).unwrap();
      router.push("/settings/lead-source/");
    } catch (error) {
      console.error("Failed to create lead source:", error);
    }
  };

  return (
    <div>
      <Card className="p-3">
        <Form>
          <Row>
            {/* Lead Source Name */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Lead Source Name *
              </Form.Label>
              <Form.Control
                size="sm"
                placeholder="Enter lead source name"
                style={{ fontSize: "10px" }}
                value={leadSourceName}
                onChange={(e) => setLeadSourceName(e.target.value)}
              />
            </Col>

            {/* Status */}
            <Col md={4}>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Status *
              </Form.Label>
              <Form.Select
                size="sm"
                style={{ fontSize: "10px" }}
                value={status ? "true" : "false"}
                onChange={(e) => setStatus(e.target.value === "true")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="d-flex gap-2 justify-content-end mt-3">
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => router.push("/settings/lead-source/")}
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
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddLeadSource;
