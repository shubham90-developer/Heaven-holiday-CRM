import { HORIZONTAL_MENU_ITEM, MENU_ITEMS } from "../assets/data/menu-items";
import { MenuItemType } from "../types/menu";

// ── Filter menu items based on staff permissions ───────────────────────────
const filterMenuByPermissions = (
  menuItems: MenuItemType[],
  permissions: any[],
): MenuItemType[] => {
  return menuItems
    .map((item) => {
      // Always show title separators
      if (item.isTitle) return item;

      // Find matching permission for this item
      const permission = permissions.find((p: any) => p.key === item.key);

      // No permission entry = non-restricted page (show it)
      if (!permission) return item;

      // Parent not allowed = remove entire section
      if (!permission.isAllowed) return null;

      // Parent allowed = filter children too
      if (item.children) {
        const filteredChildren = item.children.filter((child) => {
          const childPermission = permission.children?.find(
            (c: any) => c.key === child.key,
          );
          if (!childPermission) return true; // no entry = show it
          return childPermission.isAllowed;
        });
        return { ...item, children: filteredChildren };
      }

      return item;
    })
    .filter(Boolean) as MenuItemType[];
};

export const getMenuItems = (): MenuItemType[] => {
  // Read role and permissions from cookies
  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null; // SSR safety
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)"),
    );
    return match ? decodeURIComponent(match[2]) : null;
  };

  const token = getCookie("token");
  const permissionsCookie = getCookie("permissions");

  if (!token || !permissionsCookie) return MENU_ITEMS;

  try {
    // Read role directly from JWT token
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload.role;

    if (role !== "staff") return MENU_ITEMS;

    const permissions = JSON.parse(permissionsCookie);
    return filterMenuByPermissions(MENU_ITEMS, permissions);
  } catch {
    return MENU_ITEMS;
  }
};

export const getHorizontalMenuItems = (): MenuItemType[] => {
  return HORIZONTAL_MENU_ITEM;
};

// ... rest of your existing functions unchanged
export const findAllParent = (
  menuItems: MenuItemType[],
  menuItem: MenuItemType,
): string[] => {
  let parents: string[] = [];
  const parent = findMenuItem(menuItems, menuItem.parentKey);
  if (parent) {
    parents.push(parent.key);
    if (parent.parentKey) {
      parents = [...parents, ...findAllParent(menuItems, parent)];
    }
  }
  return parents;
};

export const getMenuItemFromURL = (
  items: MenuItemType | MenuItemType[],
  url: string,
): MenuItemType | undefined => {
  if (items instanceof Array) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url);
      if (foundItem) {
        return foundItem;
      }
    }
  } else {
    if (items.url == url) return items;
    if (items.children != null) {
      for (const item of items.children) {
        if (item.url == url) return item;
      }
    }
  }
};

export const findMenuItem = (
  menuItems: MenuItemType[] | undefined,
  menuItemKey: MenuItemType["key"] | undefined,
): MenuItemType | null => {
  if (menuItems && menuItemKey) {
    for (const item of menuItems) {
      if (item.key === menuItemKey) {
        return item;
      }
      const found = findMenuItem(item.children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};
