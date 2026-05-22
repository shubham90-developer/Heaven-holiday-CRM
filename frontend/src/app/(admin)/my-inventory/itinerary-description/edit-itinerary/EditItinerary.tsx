"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useParams } from "next/navigation";
import {
  useGetItineraryByIdQuery,
  useUpdateItineraryMutation,
} from "../../../../../../Redux/itenaryApi";

const EditItinerary = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const {
    data: itineraryResponse,
    isLoading,
    isError,
  } = useGetItineraryByIdQuery(id, { skip: !id });
  const [updateItinerary, { isLoading: isUpdating }] =
    useUpdateItineraryMutation();

  const itinerary = itineraryResponse?.data;

  const [startCity, setStartCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ── Populate form when data loads ──
  useEffect(() => {
    if (!itinerary) return;
    setStartCity(itinerary.startCity ?? "");
    setDestinationCity(itinerary.destinationCity ?? "");
    setTitle(itinerary.title ?? "");
    setDescription(itinerary.description ?? "");
  }, [itinerary]);

  // ── Word count helper ──
  const wordCount = (text: string) =>
    text
      .replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!startCity.trim()) newErrors.startCity = "Start city is required.";
    if (!destinationCity.trim())
      newErrors.destinationCity = "Destination city is required.";
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    } else if (wordCount(title) > 100) {
      newErrors.title = "Title must not exceed 100 words.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    } else if (wordCount(description) > 750) {
      newErrors.description = "Description must not exceed 750 words.";
    }
    return newErrors;
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaveSuccess(false);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      await updateItinerary({
        id,
        body: { startCity, destinationCity, title, description },
      }).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(
        err?.data?.message ?? "Failed to update itinerary. Please try again.",
      );
    }
  };

  // ── Loading / Error states ──
  if (isLoading) {
    return (
      <Card className="p-3">
        <div className="text-center py-4" style={{ fontSize: "10px" }}>
          Loading itinerary details...
        </div>
      </Card>
    );
  }

  if (isError || (!isLoading && !itinerary)) {
    return (
      <Card className="p-3">
        <div
          className="alert alert-danger py-1 mb-2"
          style={{ fontSize: "10px" }}
        >
          Failed to load itinerary details. Please go back and try again.
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push("/my-inventory/itinerary-description")}
          style={{ fontSize: "10px", fontWeight: "bold" }}
        >
          <Icon icon="mdi:arrow-left" className="me-1" /> Back to List
        </Button>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-3">
        <div className="text-end">
          <Button
            variant="secondary"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/itinerary-description")}
          >
            <Icon icon="mdi:eye" className="me-1" /> My Itinerary List
          </Button>
        </div>
        <hr />

        {saveError && (
          <div
            className="alert alert-danger py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            {saveError}
          </div>
        )}
        {saveSuccess && (
          <div
            className="alert alert-success py-1 mb-2"
            style={{ fontSize: "10px" }}
          >
            Itinerary updated successfully!
          </div>
        )}

        <Row className="g-3">
          {/* Start City */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Start City
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={startCity}
                onChange={(e) => setStartCity(e.target.value)}
                isInvalid={!!errors.startCity}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.startCity}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Destination City */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Destination City
              </Form.Label>
              <Form.Control
                size="sm"
                style={{ fontSize: "10px" }}
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                isInvalid={!!errors.destinationCity}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "10px" }}
              >
                {errors.destinationCity}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          {/* Title */}
          <Col md={4}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Title (100 words maximum)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                style={{ fontSize: "10px" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!errors.title}
              />
              <div className="d-flex justify-content-between">
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.title}
                </Form.Control.Feedback>
                <small
                  className="text-muted ms-auto"
                  style={{ fontSize: "10px" }}
                >
                  {wordCount(title)}/100 words
                </small>
              </div>
            </Form.Group>
          </Col>

          {/* Description */}
          <Col md={12}>
            <Form.Group>
              <Form.Label
                className="text-primary small"
                style={{ fontSize: "10px" }}
              >
                Description (750 words maximum)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                style={{ fontSize: "10px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!errors.description}
              />
              <div className="d-flex justify-content-between">
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "10px" }}
                >
                  {errors.description}
                </Form.Control.Feedback>
                <small
                  className="text-muted ms-auto"
                  style={{ fontSize: "10px" }}
                >
                  {wordCount(description)}/750 words
                </small>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button
            variant="outline-danger"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={() => router.push("/my-inventory/itinerary-description")}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            style={{ fontSize: "10px", fontWeight: "bold" }}
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default EditItinerary;
