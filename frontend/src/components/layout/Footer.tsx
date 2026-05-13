import { currentYear } from "@/context/constants";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="page-container">
        <Row>
          <Col md={6} className="text-center text-md-start">
            {currentYear} © Design & Development by &nbsp;
            <Link href="https://www.atisuae.com/" target="_blank">
              <span className="fw-bold text-decoration-underline text-uppercase text-reset fs-12">
                ALTHARWANEYA INTEGRATED SOLUTIONS
              </span>
            </Link>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
