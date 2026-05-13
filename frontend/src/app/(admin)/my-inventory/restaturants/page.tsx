import React from "react";
import PageTitle from "@/components/PageTitle";
import Restaturants from "./Restaturants";

const RestaturantsPage = () => {
  return (
    <>
      <PageTitle title="Restaturants Listing" />
      <Restaturants />
    </>
  );
};

export default RestaturantsPage;
