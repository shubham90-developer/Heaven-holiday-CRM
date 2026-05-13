import React from "react";
import PageTitle from "@/components/PageTitle";
import MyWalletHistory from "./components/MyWalletHistory";

const MyWalletHistoryPage = () => {
  return (
    <>
      <PageTitle title="View Ledger" />
      <MyWalletHistory/>
    </>
  );
};

export default MyWalletHistoryPage;
