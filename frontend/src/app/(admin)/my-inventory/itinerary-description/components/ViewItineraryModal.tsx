import React from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Modal,
  Tabs,
  Tab,
} from "react-bootstrap";

type ViewItineraryModalProps = {
    onClose: () =>void;
}
const ViewItineraryModal = ({onClose}:ViewItineraryModalProps) => {
  return (
    <>
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
      
              {/* BODY */}
      
              <Modal.Body>
               <Form>
                  <Row className='g-2' style={{fontSize:"12px"}}>
                <Col md={6}>
                <div>
                    <strong>Start City:</strong><span>Almaty</span>
                </div>
                </Col>
                  <Col md={6}>
                <div>
                    <strong>Destination City:</strong><span>Almaty</span>
                </div>
                </Col>
                <Col md={12}>
                <strong>Title:</strong><span> Almaty-Visit to Gorky Park (Entry Only) Followed by Kok Tobe Tour</span>
                </Col>

                <Col md={12}>
                <span>After Breakfast we Proceed to Gorky Park (Gorky Central Park is a public park located in the heart of Almaty, Kazakhstani, was founded in 1856 and has since become one of the most popular recreational areas in the city The park covers an area of over 100 hectares and is named after the famous Russian witer Maxim Gorky Gorky Park features a vanety of attractions and amenities including walking paths, playgrounds, sports tiekis, cales, restaurants, and a small lake. Visitors can tent bicycles or rollerblades to explore the park or simply relax on the grassy lawns in the winter months, the park transforms into a winter wonderland with ice skating rinks and other seasonal activities. Throughout the year, the park hosts vanous cultural and entertainment events including music concerts, art exhibitions, and outdoor movie screenings. Gorky Park is a great place for families, frends, and couples to spend a lesurely day in a beautiful and peaceful setting). Proceed for Lunch at Indian Restaurant. Proceed towards the tour of Kok-Tobe it is a mountain which is the highest point of Amiaty, Kazakhstarts largest city There is a popular recreation area on top of the mountain. The mountan's height is 1100 meters above sea level. Kok-lobe is one of the main landmarks in the city, and it is popular among visitors and tourists to Almaty. The Kok-Tobe recreational area has a variety of amusement park type altsactions and restaurants. The City Terminal is located near Hotel Kazakhstan. Also, there is a 372 meters tall TV Tower at the foot of the mountain. The tower can be seen from most parts of the city. Proceed for Dinner at Indian Restaurant. Free time-can explore night Life activities at you own. Overnight at Hotel</span>
                </Col>
                  </Row>
               </Form>
              </Modal.Body>
      
            </Modal>
    </>
  )
}

export default ViewItineraryModal
