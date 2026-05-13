import React from "react";
import LeadBulkUpload from "./components/LeadBulkUpload";
import PageTitle from "@/components/PageTitle";

const LeadBulkUploadPage = () => {
  return (
    <>
      <PageTitle title=" CRM Customers Bulk Upload(Lead)" />
      <LeadBulkUpload />
    </>
  );
};

export default LeadBulkUploadPage;
