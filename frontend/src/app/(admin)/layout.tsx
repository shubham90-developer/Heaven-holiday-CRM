"use client";

import { useLayoutContext } from "@/context/useLayoutContext";

import { ChildrenType } from "../../types/component-props";

import VerticalLayout from "@/components/layout/VerticalLayout";
import HorizontalLayout from "@/components/layout/HorizontalLayout";

const AdminLayout = ({ children }: ChildrenType) => {
  const { layoutOrientation } = useLayoutContext();

  return (
    <>
      {layoutOrientation === "vertical" ? (
        <VerticalLayout>{children}</VerticalLayout>
      ) : (
        <>
          <HorizontalLayout>{children}</HorizontalLayout>
        </>
      )}
    </>
  );
};

export default AdminLayout;
