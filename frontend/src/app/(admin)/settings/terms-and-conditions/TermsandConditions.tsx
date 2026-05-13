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
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
  CardHeader,
  CardBody
} from "react-bootstrap";
const TermsandConditions = () => {
  return (
    <>
      <Card className="p-3">
      <Form>
        <Row className='g-2'>
            <Col md={12}>
             <Form.Label className="text-primary small" style={{ fontSize: "12px" }}>
               Terms & Conditions  (Domestic Holidays)
              </Form.Label>
              <Form.Control
              as="textarea" rows={3}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>
             <Col md={12}>
             <Form.Label className="text-primary small" style={{ fontSize: "12px" }}>
               Terms & Conditions  (International Holidays)
              </Form.Label>
              <Form.Control
              as="textarea" rows={3}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>
              <Col md={12}>
             <Form.Label className="text-primary small" style={{ fontSize: "12px" }}>
             Cancellation Policy  (Domestic Holidays)
              </Form.Label>
              <Form.Control
              as="textarea" rows={3}
                size="sm"
                style={{ fontSize: "10px" }}
              />
            </Col>
        </Row>
      </Form>
      </Card>
    </>
  )
}

export default TermsandConditions
