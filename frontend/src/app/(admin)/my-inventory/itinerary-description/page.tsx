import React from "react";
import PageTitle from "@/components/PageTitle";
import Itinerary from "./components/Itinerary";

const ItineraryPage = () => {
  return (
    <>
      <PageTitle title="Itinerary List" />
      <Itinerary />
    </>
  );
};

export default ItineraryPage;
