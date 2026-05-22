import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { ISightseeingRate } from "../../../../../../../Redux/ratesApi"; // adjust path

type ViewSightseeingModalProps = {
  onClose: () => void;
  rate: ISightseeingRate;
};

const ViewSightseeingModal = ({ onClose, rate }: ViewSightseeingModalProps) => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <>
      <Modal show={true} onHide={onClose} centered>
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title>
            View Sightseeing ({rate.sightseeingId?.sightseeingName ?? "Rate"})
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

        {/* Body */}
        <Modal.Body>
          <Row className="mb-3" style={{ fontSize: "10px" }}>
            <Col md={4} className="mb-2">
              <div>
                <strong>Country</strong>
              </div>
              <div>{rate.sightseeingId?.country || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>City</strong>
              </div>
              <div>{rate.city || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Sightseeing Name</strong>
              </div>
              <div>{rate.sightseeingId?.sightseeingName || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Rate ID</strong>
              </div>
              <div>{rate.rateId || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>From Date</strong>
              </div>
              <div>{formatDate(rate.from)}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>To Date</strong>
              </div>
              <div>{formatDate(rate.to)}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Supplier</strong>
              </div>
              <div>
                {typeof rate.supplier === "object"
                  ? rate.supplier.companyName
                  : "N/A"}
              </div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Currency</strong>
              </div>
              <div>{rate.currency || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Booking Type</strong>
              </div>
              <div>{rate.bookingType || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Entry Fee (Adult)</strong>
              </div>
              <div>{rate.entryFeeAdult ?? 0}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Entry Fee (Kids)</strong>
              </div>
              <div>{rate.entryFeeKids ?? 0}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Cost / Markup</strong>
              </div>
              <div>{rate.costMarkup ?? 0}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Status</strong>
              </div>
              <div>{rate.isActive ? "Active" : "Inactive"}</div>
            </Col>

            {rate.termsAndConditions && (
              <Col md={12} className="mb-2">
                <div>
                  <strong>Terms &amp; Conditions</strong>
                </div>
                <div>{rate.termsAndConditions}</div>
              </Col>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewSightseeingModal;
