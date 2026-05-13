import React from "react";
import PageTitle from "@/components/PageTitle";
import B2BCustomers from "./B2BCustomers";

const B2BCustomersPage = () => {
  return (
    <>
      <PageTitle title="My B2B Customer (s) Listing" />
      <B2BCustomers />
    </>
  );
};

export default B2BCustomersPage;
