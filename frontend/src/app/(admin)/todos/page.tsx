import PageTitle from "@/components/PageTitle";
import React from "react";
import Todo from "./components/Todo";

const Todopage = () => {
  return (
    <>
      <PageTitle title="To Do Listing" />
      <Todo />
    </>
  );
};

export default Todopage;
