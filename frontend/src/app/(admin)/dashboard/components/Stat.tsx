"use client";

import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import B2BLeadModal from "./B2BLeadModal";
import B2CLeadModal from "./B2CLeadModal";
import CorporateLeadModal from "./CorporateLeadModal";
import { useRouter } from "next/navigation";

type StatType = {
  title: string;
  btnTitle?: string;
  icon: string;
  variant: string;
  onClick: () => void;
};

const StatCard = ({ title, btnTitle, icon, variant, onClick }: StatType) => {
  return (
    <Card className="shadow-sm border-0 mb-1">
      <CardBody className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle bg-${variant}-subtle`}
            style={{ width: "40px", height: "40px" }}
          >
            <IconifyIcon icon={icon} className={`fs-20 text-${variant}`} />
          </div>

          <div>
            <h6 className="text-dark mb-1 text-uppercase fs-12">{title}</h6>

            <button
              onClick={onClick}
              className={`btn btn-soft-${variant}`}
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                fontWeight: "600",
              }}
            >
              {btnTitle}
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const Stat = () => {
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpen = (type: string) => {
    setActiveModal(type);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const statData: StatType[] = [
    {
      title: "B2C Lead",
      btnTitle: "Add New",
      icon: "mdi:account-plus-outline",
      variant: "danger",
      onClick: () => handleOpen("b2c"),
    },
    {
      title: "B2B Lead",
      btnTitle: "Add New",
      icon: "mdi:account-plus-outline",
      variant: "info",
      onClick: () => handleOpen("b2b"),
    },
    {
      title: "Corporate Lead",
      btnTitle: "Add New",
      icon: "mdi:business-outline",
      variant: "success",
      onClick: () => handleOpen("corporate"),
    },
    {
      title: "New Lead",
      btnTitle: "View All",
      icon: "mdi:business-outline",
      variant: "dark",
      onClick: () => router.push("/crm/leads"),
    },
    {
      title: "Queries",
      btnTitle: "View All",
      icon: "mdi:information-outline",
      variant: "danger",
      onClick: () => router.push("/crm/queries"),
    },
    {
      title: "B2C Customers",
      btnTitle: "View All",
      icon: "mdi:account-plus-outline",
      variant: "success",
      onClick: () => router.push("/crm/b2c-customers"),
    },
    {
      title: "B2B Customers",
      btnTitle: "View All",
      icon: "mdi:account-plus-outline",
      variant: "info",
      onClick: () => router.push("/crm/b2b-customers"),
    },
    {
      title: "Suppliers List",
      btnTitle: "View All",
      icon: "mdi:list-box-outline",
      variant: "info",
      onClick: () => router.push("/crm/my-suppliers"),
    },
  ];

  return (
    <>
      <Row className="row-cols-2 g-1">
        {statData.map((item, idx) => (
          <Col key={idx}>
            <StatCard {...item} />
          </Col>
        ))}
      </Row>

      {/* ✅ Controlled Modals */}
      <B2BLeadModal show={activeModal === "b2b"} onHide={handleClose} />
      <B2CLeadModal show={activeModal === "b2c"} onHide={handleClose} />
      <CorporateLeadModal
        show={activeModal === "corporate"}
        onHide={handleClose}
      />
    </>
  );
};

export default Stat;
