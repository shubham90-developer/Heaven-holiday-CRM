import React from "react";
import PageTitle from "@/components/PageTitle";
import Invoice from "./components/Invoice";
const InvoicePage = () => {
  return (
    <>
      <PageTitle title="Invoice List" />
      <Invoice/>
    </>
  );
};

export default InvoicePage;
