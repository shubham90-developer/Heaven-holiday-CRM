import React from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useGetItineraryByIdQuery } from "../../../../../../Redux/itenaryApi";
type ViewItineraryModalProps = {
  id: string;
  onClose: () => void;
};

const ViewItineraryModal = ({ id, onClose }: ViewItineraryModalProps) => {
  const { data, isLoading, isError } = useGetItineraryByIdQuery(id);
  const itinerary = data?.data;

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      {/* Header */}
      <Modal.Header
        style={{ background: "#274c6b", color: "#fff" }}
        className="d-flex justify-content-between"
      >
        <Modal.Title>View Itinerary</Modal.Title>
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

      {/* Body */}
      <Modal.Body>
        {/* Loading */}
        {isLoading && (
          <div className="text-center py-3" style={{ fontSize: "12px" }}>
            Loading...
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="alert alert-danger py-1" style={{ fontSize: "12px" }}>
            Failed to load itinerary details.
          </div>
        )}

        {/* Data */}
        {itinerary && (
          <Form>
            <Row className="g-2" style={{ fontSize: "12px" }}>
              <Col md={6}>
                <div>
                  <strong>Start City: </strong>
                  <span>{itinerary.startCity}</span>
                </div>
              </Col>

              <Col md={6}>
                <div>
                  <strong>Destination City: </strong>
                  <span>{itinerary.destinationCity}</span>
                </div>
              </Col>

              <Col md={12}>
                <div>
                  <strong>Title: </strong>
                  <span>{itinerary.title}</span>
                </div>
              </Col>

              <Col md={12}>
                {/* description may contain rich-text HTML from the editor */}
                <div
                  dangerouslySetInnerHTML={{ __html: itinerary.description }}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewItineraryModal;
