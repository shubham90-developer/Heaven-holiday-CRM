import React from "react";
import PageTitle from "@/components/PageTitle";
import ConfirmedQueries from "./components/ConfirmedQueries";
const ConfirmedQueriesPage = () => {
  return (
    <>
      <PageTitle title="ConfirmedQuery Listing" />
      <ConfirmedQueries />
    </>
  );
};

export default ConfirmedQueriesPage;
