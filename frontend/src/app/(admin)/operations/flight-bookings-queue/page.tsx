import React from "react";
import PageTitle from "@/components/PageTitle";
import FlightBookingQueue from "./components/FlightBookingQueue";

const FlightBookingQueuePage = () => {
  return (
    <>
      <PageTitle title="Flight  List" />
      <FlightBookingQueue />
    </>
  );
};

export default FlightBookingQueuePage;
