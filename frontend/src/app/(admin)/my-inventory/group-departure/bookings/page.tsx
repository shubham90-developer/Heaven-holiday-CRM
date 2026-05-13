import React from "react";
import PageTitle from "@/components/PageTitle";
import Bookings from "./Bookings";

const BookingsPage = () => {
  return (
    <>
      <PageTitle title="Masters - Onhold Inventory Detail" />
      <Bookings />
    </>
  );
};

export default BookingsPage;
