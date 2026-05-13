import React from "react";
import PageTitle from "@/components/PageTitle";
import WipPackages from "./components/WipPackages";

const WipPackagesPage = () => {
  return (
    <>
      <PageTitle title="Quick Package Listing" />
      <WipPackages />
    </>
  );
};

export default WipPackagesPage;
