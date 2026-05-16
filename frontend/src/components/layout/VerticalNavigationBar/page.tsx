"use client";

import LogoBox from "@/components/LogoBox";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import SimplebarReactClient from "@/components/wrappers/SimplebarReactClient";
import { useLayoutContext } from "@/context/useLayoutContext";
import { getMenuItems } from "@/helpers/Manu";
import { MenuItemType } from "@/types/menu";
import { useEffect, useState } from "react";
import AppMenu from "./components/AppMenu";
import HoverMenuToggle from "./components/HoverMenuToggle";

const VerticalNavigationBar = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    setMenuItems(getMenuItems());
  }, []);

  const { toggleBackdrop } = useLayoutContext();

  return (
    <div className="sidenav-menu">
      <LogoBox />
      <HoverMenuToggle />
      <button onClick={toggleBackdrop} className="button-close-fullsidebar">
        <IconifyIcon icon="tabler:x" className="align-middle" />
      </button>
      <SimplebarReactClient data-simplebar>
        <AppMenu menuItems={menuItems} />
        <div className="clearfix" />
      </SimplebarReactClient>
    </div>
  );
};

export default VerticalNavigationBar;
