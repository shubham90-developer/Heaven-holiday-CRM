import React from "react";
import Leads from "./components/Leads";
import PageTitle from "@/components/PageTitle";

const LeadsPage = () => {
  return (
    <>
      <PageTitle title=" CRM  - Lead Listing" />
      <Leads />
    </>
  );
};

export default LeadsPage;
