import { HORIZONTAL_MENU_ITEM, MENU_ITEMS } from "../assets/data/menu-items";
import { MenuItemType } from "../types/menu";

// ─── Helper: read a cookie by name (client-side safe) ─────────────────────────
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null; // SSR safety
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

// ─── Helper: flatten nested permissions into a flat array ─────────────────────
export const flattenPermissions = (permissions: any[]) => {
  const flat: { key: string; isAllowed: boolean }[] = [];
  permissions.forEach((p) => {
    flat.push({ key: p.key, isAllowed: p.isAllowed });
    if (p.children?.length) {
      p.children.forEach((child: any) => {
        flat.push({ key: child.key, isAllowed: child.isAllowed });
      });
    }
  });
  return flat;
};

// ─── Helper: find first allowed route for staff redirect ──────────────────────
const STAFF_PERMISSION_ROUTES: Record<string, string> = {
  dashboard: "/dashboard",
  crm: "/crm",
  marketing: "/marketing",
  operations: "/operations",
  todos: "/todos",
  "my-inventory": "/my-inventory",
  reports: "/reports",
  bookings: "/bookings",
  finance: "/finance",
  marketplace: "/marketplace",
  "staff-management": "/staff-management",
  settings: "/settings",
  "crm-leads": "/crm/leads",
  "crm-queries": "/crm/queries",
  "crm-confirmed-queries": "/crm/confirmed-queries",
  "crm-b2c-customers": "/crm/b2c-customers",
  "crm-b2b-customers": "/crm/b2b-customers",
  "crm-my-suppliers": "/crm/my-suppliers",
  "crm-archived-leads": "/crm/archived-leads",
};

export const getFirstAllowedRoute = (permissions: any[]): string | null => {
  const flat = flattenPermissions(permissions);
  const firstAllowed = flat.find((p) => p.isAllowed);
  if (firstAllowed && STAFF_PERMISSION_ROUTES[firstAllowed.key]) {
    return STAFF_PERMISSION_ROUTES[firstAllowed.key];
  }
  return null;
};

// ─── FIX 1 & 2: Filter menu items by permissions ──────────────────────────────
// BUG WAS: if (!permission) return item  ← showed items with no permission entry
// FIX IS:  if (!permission) return null  ← hide unknown items for staff by default
const filterMenuByPermissions = (
  menuItems: MenuItemType[],
  permissions: any[],
): MenuItemType[] => {
  return menuItems
    .map((item) => {
      // Always show title separators (e.g. "Navigation" heading)
      if (item.isTitle) return item;

      // Find matching permission for this menu item by key
      const permission = permissions.find((p: any) => p.key === item.key);

      // FIX 2: No permission entry = HIDE it for staff (was: show it)
      // This prevents unregistered menu items from leaking through
      if (!permission) return null;

      // Parent section not allowed → remove entire section
      if (!permission.isAllowed) return null;

      // Parent allowed → also filter children
      if (item.children) {
        const filteredChildren = item.children.filter((child) => {
          const childPermission = permission.children?.find(
            (c: any) => c.key === child.key,
          );
          // Child not in permission list → hide it
          if (!childPermission) return false;
          return childPermission.isAllowed;
        });

        // If no children remain after filtering, hide the parent too
        if (filteredChildren.length === 0) return null;

        return { ...item, children: filteredChildren };
      }

      return item;
    })
    .filter(Boolean) as MenuItemType[];
};

// ─── FIX 3 (part of): Shared logic to get filtered menu ──────────────────────
const getFilteredMenu = (baseItems: MenuItemType[]): MenuItemType[] => {
  const token = getCookie("token");
  const permissionsCookie = getCookie("permissions");

  // No token or permissions → return full menu (will be handled by middleware)
  if (!token || !permissionsCookie) return baseItems;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload.role;

    // Superadmin sees everything
    if (role !== "staff") return baseItems;

    const permissions = JSON.parse(permissionsCookie);
    return filterMenuByPermissions(baseItems, permissions);
  } catch {
    return baseItems;
  }
};

// ─── Vertical sidebar menu ────────────────────────────────────────────────────
export const getMenuItems = (): MenuItemType[] => {
  return getFilteredMenu(MENU_ITEMS);
};

// ─── FIX 3: Horizontal menu now also filters by permissions ───────────────────
// BUG WAS: always returned HORIZONTAL_MENU_ITEM with no role/permission check
export const getHorizontalMenuItems = (): MenuItemType[] => {
  return getFilteredMenu(HORIZONTAL_MENU_ITEM);
};

// ─── Unchanged utility functions below ────────────────────────────────────────

export const findAllParent = (
  menuItems: MenuItemType[],
  menuItem: MenuItemType,
  visited = new Set<string>(),
): string[] => {
  if (!menuItem?.parentKey) {
    return [];
  }

  // Prevent infinite recursion
  if (visited.has(menuItem.key)) {
    return [];
  }

  visited.add(menuItem.key);

  const parent = findMenuItem(menuItems, menuItem.parentKey);

  if (!parent) {
    return [];
  }

  return [parent.key, ...findAllParent(menuItems, parent, visited)];
};

export const getMenuItemFromURL = (
  items: MenuItemType | MenuItemType[],
  url: string,
): MenuItemType | undefined => {
  if (items instanceof Array) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url);
      if (foundItem) return foundItem;
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
      if (item.key === menuItemKey) return item;
      const found = findMenuItem(item.children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};
