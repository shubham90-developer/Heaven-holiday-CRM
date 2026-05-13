import React from "react";
import PageTitle from "@/components/PageTitle";
import CustomerDuePayment from "./components/CustomerDuePayment";
const CustomerDuePaymentPage = () => {
  return (
    <>
      <PageTitle title="Customer Due Payment" />
      <CustomerDuePayment/>
    </>
  );
};

export default CustomerDuePaymentPage;
