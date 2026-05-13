import React from "react";
import PageTitle from "@/components/PageTitle";
import Hotels from "./components/Hotels";

const HotelsPage = () => {
  return (
    <>
      <PageTitle title="My Hotel List" />
      <Hotels />
    </>
  );
};

export default HotelsPage;
