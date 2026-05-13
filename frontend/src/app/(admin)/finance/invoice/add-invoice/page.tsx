import React from "react";
import PageTitle from "@/components/PageTitle";
import AddInvoice from "./components/AddInvoice";
const AddInvoicePage = () => {
  return (
    <>
      <PageTitle title="New Invoice" />
      <AddInvoice/>
    </>
  );
};

export default AddInvoicePage;
