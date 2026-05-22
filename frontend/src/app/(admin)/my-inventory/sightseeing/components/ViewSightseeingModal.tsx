import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { ISightseeing } from "../../../../../../Redux/sightSeeingApi"; // adjust path as needed

type ViewSightseeingModalProps = {
  onClose: () => void;
  sightseeing: ISightseeing;
};

const ViewSightseeingModal = ({
  onClose,
  sightseeing,
}: ViewSightseeingModalProps) => {
  return (
    <>
      <Modal show={true} onHide={onClose} centered>
        {/* Header */}
        <Modal.Header
          style={{ background: "#274c6b", color: "#fff" }}
          className="d-flex justify-content-between"
        >
          <Modal.Title style={{ fontSize: "14px" }}>
            View Sightseeing ({sightseeing.sightseeingName})
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
              <div>{sightseeing.country || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>City</strong>
              </div>
              <div>{sightseeing.city || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Sightseeing Name</strong>
              </div>
              <div>{sightseeing.sightseeingName || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Category</strong>
              </div>
              <div>{sightseeing.category || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Difficulty Level</strong>
              </div>
              <div>{sightseeing.difficultyLevel || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Season</strong>
              </div>
              <div>{sightseeing.season || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Popularity</strong>
              </div>
              <div>{sightseeing.popularity || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Duration</strong>
              </div>
              <div>
                {sightseeing.durationHours > 0 ||
                sightseeing.durationMinutes > 0
                  ? `${sightseeing.durationHours}h ${sightseeing.durationMinutes}m`
                  : "N/A"}
              </div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Pax</strong>
              </div>
              <div>
                {sightseeing.paxMin !== undefined &&
                sightseeing.paxMax !== undefined
                  ? `Min: ${sightseeing.paxMin} / Max: ${sightseeing.paxMax}`
                  : "N/A"}
              </div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Allowed Age Group</strong>
              </div>
              <div>
                {sightseeing.allowedAgeFrom !== undefined &&
                sightseeing.allowedAgeTo !== undefined
                  ? `${sightseeing.allowedAgeFrom} - ${sightseeing.allowedAgeTo} Yrs`
                  : "N/A"}
              </div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Pick Up Point</strong>
              </div>
              <div>{sightseeing.pickUpPoint || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Pick Up Time</strong>
              </div>
              <div>{sightseeing.pickUpTime || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Address</strong>
              </div>
              <div>{sightseeing.address || "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Latitude</strong>
              </div>
              <div>{sightseeing.latitude ?? "N/A"}</div>
            </Col>

            <Col md={4} className="mb-2">
              <div>
                <strong>Longitude</strong>
              </div>
              <div>{sightseeing.longitude ?? "N/A"}</div>
            </Col>

            <Col md={6} className="mb-2">
              <div>
                <strong>Activities</strong>
              </div>
              <div>
                {sightseeing.activities?.length > 0
                  ? sightseeing.activities.join(", ")
                  : "N/A"}
              </div>
            </Col>

            <Col md={6} className="mb-2">
              <div>
                <strong>Days of Week</strong>
              </div>
              <div>
                {sightseeing.daysOfWeek?.length > 0
                  ? sightseeing.daysOfWeek.join(", ")
                  : "N/A"}
              </div>
            </Col>

            <Col md={6} className="mb-2">
              <div>
                <strong>Things to Carry</strong>
              </div>
              <div>
                {sightseeing.thingsToCarry?.length > 0
                  ? sightseeing.thingsToCarry.join(", ")
                  : "N/A"}
              </div>
            </Col>

            <Col md={6} className="mb-2">
              <div>
                <strong>Status</strong>
              </div>
              <div>{sightseeing.isActive ? "Active" : "Inactive"}</div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewSightseeingModal;
