import React from "react";
import PageTitle from "@/components/PageTitle";
import FlightModifications from "./components/FlightModifications";

const FlightModificationsPage = () => {
  return (
    <>
      <PageTitle title="Flight Modification List" />
      <FlightModifications />
    </>
  );
};

export default FlightModificationsPage;
