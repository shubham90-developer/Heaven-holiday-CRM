"use client";

import IconifyIcon from "@/components/wrappers/IconifyIcon";
import { useLayoutContext } from "@/context/useLayoutContext";
import {
  findAllParent,
  findMenuItem,
  getMenuItemFromURL,
} from "@/helpers/Manu";
import { MenuItemType, SubMenus } from "@/types/menu";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";

/* =========================
   Menu Item With Children
========================= */
const MenuItemWithChildren = ({
  item,
  className,
  activeMenuItems,
  level,
}: SubMenus) => {
  const [open, setOpen] = useState(false);

  const isActive = activeMenuItems?.includes(item.key);

  return (
    <li
      className={clsx(className, "dropdown", isActive && "active")}
      style={{ fontSize: "10px", borderRight: "1px solid #ccc" }}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="nav-link d-flex align-items-center justify-content-between w-100 border-0 bg-transparent px-1 py-2"
      >
        <div className="d-flex align-items-center">
          <div>
            {item.icon && <IconifyIcon icon={item.icon} className="mx-1" />}
          </div>
          <div className="menu-text" style={{ fontSize: "10px" }}>
            {item.label}
          </div>
          <IconifyIcon
            icon={
              level === 1 ? "ri:arrow-down-s-line" : "ri:arrow-right-s-line"
            }
            className={clsx("mx-1", open && "rotate")}
            style={{ fontSize: "10px" }}
          />
        </div>
      </button>

      {/* Children */}
      <ul className={clsx("dropdown-menu py-1", open && "show")}>
        {(item.children || []).map((child) =>
          child.children ? (
            <MenuItemWithChildren
              key={child.key}
              item={child}
              className="dropdown-submenu"
              level={level + 1}
              activeMenuItems={activeMenuItems}
            />
          ) : (
            <MenuItem
              key={child.key}
              item={child}
              level={level + 1}
              linkClassName="dropdown-item"
              className=""
            />
          ),
        )}
      </ul>
    </li>
  );
};

/* =========================
   Single Menu Item
========================= */
const MenuItem = ({ item, linkClassName, className, level }: SubMenus) => {
  return (
    <li className={className}>
      <MenuItemLink level={level + 1} item={item} className={linkClassName} />
    </li>
  );
};

/* =========================
   Menu Link
========================= */
const MenuItemLink = ({ item, className }: SubMenus) => {
  return (
    <Link
      href={item.url || "#"}
      target={item.target}
      className={clsx(className, "", {
        disabled: item.isDisabled,
      })}
      style={{ fontSize: "10px", borderRight: "1px solid #ccc" }}
    >
      <div className="menu-text text-nowrap">
        {item.icon && <IconifyIcon icon={item.icon} className="menu-icon" />}{" "}
        {item.label}
      </div>
    </Link>
  );
};

/* =========================
   Main Navbar
========================= */
type AppMenuProps = {
  menuItems: Array<MenuItemType>;
};

const HorizontalNavBar = ({ menuItems }: AppMenuProps) => {
  const pathname = usePathname();
  const [activeMenuItems, setActiveMenuItems] = useState<string[]>([]);

  const activeMenu = useCallback(() => {
    const matchingMenuItem = getMenuItemFromURL(menuItems, pathname);

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
      if (activeMt) {
        setActiveMenuItems([
          activeMt.key,
          ...findAllParent(menuItems, activeMt),
        ]);
      }
    }
  }, [pathname, menuItems]);

  useEffect(() => {
    if (menuItems?.length) activeMenu();
  }, [activeMenu, menuItems]);

  const { horizontalMenu } = useLayoutContext();

  return (
    <header className="topnav">
      <nav className="navbar navbar-expand-lg active">
        <div className="page-container">
          <Collapse in={horizontalMenu.open} className="navbar-collapse">
            <div>
              <div className="nav-scroll">
                <ul className="navbar-nav dropdown-hover flex-nowrap">
                  {menuItems?.map((item) => {
                    const isActive = activeMenuItems?.includes(item.key)
                      ? "active"
                      : "";

                    if (item.children) {
                      return (
                        <MenuItemWithChildren
                          key={item.key}
                          item={item}
                          className={clsx("nav-item", isActive)}
                          level={1}
                          activeMenuItems={activeMenuItems}
                        />
                      );
                    }

                    return (
                      <MenuItem
                        key={item.key}
                        item={item}
                        level={1}
                        linkClassName={clsx("nav-link", isActive)}
                        className="nav-item"
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          </Collapse>
        </div>
      </nav>
    </header>
  );
};

export default HorizontalNavBar;
