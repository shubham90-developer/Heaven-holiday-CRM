import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: "superadmin" | "staff";
  exp: number;
}

interface IPermissionSection {
  key: string;
  isAllowed: boolean;
}

const STAFF_PERMISSION_ROUTES: Record<string, string> = {
  // Parents
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

  // CRM Children
  "crm-leads": "/crm/leads",
  "crm-queries": "/crm/queries",
  "crm-confirmed-queries": "/crm/confirmed-queries",
  "crm-b2c-customers": "/crm/b2c-customers",
  "crm-b2b-customers": "/crm/b2b-customers",
  "crm-my-suppliers": "/crm/my-suppliers",
  "crm-archived-leads": "/crm/archived-leads",

  // Marketing Children
  "marketing-dashboard": "/marketing/dashboard",
  lists: "/marketing/lists",
  "email-marketing": "/marketing/email-marketing",
  campaigns: "/marketing/campaigns",
  "default-campaigns": "/marketing/default-campaigns",
  "manage-landing-page": "/marketing/manage-landing-page",
  "campaigns-Url-builder": "/marketing/campaigns-url-builder",
  "view-feedback": "/marketing/view-feedback",
  "coupon-code": "/marketing/coupon-code",
  "meta-integration": "/marketing/meta-integration",

  // Operations Children
  "operations-wip-packages": "/operations/wip-packages",
  "operations-flights-modifications": "/operations/flights-modifications",
  "operations-refund-upgrade": "/operations/refund-upgrade",
  "operations-flight-bookings-queue": "/operations/flight-bookings-queue",
  "operations-proposal-requested": "/operations/proposal-requested",
  "operations-supplier-packages-enquiry":
    "/operations/supplier-packages-enquiry",

  // Inventory Children
  packages: "/my-inventory/packages",
  hotels: "/my-inventory/hotels",
  sightseeing: "/my-inventory/sightseeing",
  vehicles: "/my-inventory/vehicles",
  "transport-rates": "/my-inventory/transport-rates",
  visa: "/my-inventory/visa",
  "itinerary-description": "/my-inventory/itinerary-description",
  "group-departure": "/my-inventory/group-departure",
  "area-master": "/my-inventory/area-master",
  restaurants: "/my-inventory/restaurants",

  // Staff Management Children
  roles: "/staff-management/roles",
  departments: "/staff-management/departments",
  staff: "/staff-management/staff",

  // Settings Children
  "company-profile": "/settings/company-profile",
  "terms-and-conditions": "/settings/terms-and-conditions",
  "email-templates": "/settings/email-templates",
  "mark-ups": "/settings/mark-ups",
  "lead-source": "/settings/lead-source",
  "manage-notifications": "/settings/manage-notifications",
  communications: "/settings/communications",
  "subscriptions-plan": "/settings/subscriptions-plan",
  "global-settings": "/settings/global-settings",
};

const getFirstAllowedRoute = (
  permissions: IPermissionSection[],
): string | null => {
  const firstAllowed = permissions.find((p) => p.isAllowed);
  if (firstAllowed && STAFF_PERMISSION_ROUTES[firstAllowed.key]) {
    return STAFF_PERMISSION_ROUTES[firstAllowed.key];
  }
  return null;
};

const flattenPermissions = (permissions: any[]): IPermissionSection[] => {
  const flat: IPermissionSection[] = [];
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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // ── 1. allow all auth pages before anything else ───────────────────────────
  if (pathname.startsWith("/auth")) {
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.exp * 1000 > Date.now()) {
          if (decoded.role === "superadmin") {
            return NextResponse.redirect(new URL("/dashboard", req.url));
          }
          if (decoded.role === "staff") {
            const permissionsCookie = req.cookies.get("permissions")?.value;
            if (permissionsCookie) {
              const permissions = JSON.parse(permissionsCookie);
              const flatPermissions = flattenPermissions(permissions);
              const firstRoute = getFirstAllowedRoute(flatPermissions);
              if (firstRoute) {
                return NextResponse.redirect(new URL(firstRoute, req.url));
              }
            }
          }
        }
      } catch {
        // invalid token → stay on auth page
      }
    }
    return NextResponse.next();
  }

  // ── 2. no token → redirect to login ───────────────────────────────────────
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ── 3. token expired → clear cookies → redirect to login ──────────────────
  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      const response = NextResponse.redirect(new URL("/auth/login", req.url));
      response.cookies.delete("token");
      response.cookies.delete("permissions");
      return response;
    }

    // ── 4. Staff permission check ──────────────────────────────────────────
    if (decoded.role === "staff") {
      const permissionsCookie = req.cookies.get("permissions")?.value;

      if (permissionsCookie) {
        const permissions = JSON.parse(permissionsCookie);
        const flatPermissions = flattenPermissions(permissions);

        // Sort longest path first → child routes checked before parent routes
        // e.g. /crm/confirmed-queries matched before /crm
        const matchedKey = Object.entries(STAFF_PERMISSION_ROUTES)
          .sort((a, b) => b[1].length - a[1].length)
          .find(([, route]) => pathname.startsWith(route))?.[0];

        if (matchedKey) {
          const permission = flatPermissions.find((p) => p.key === matchedKey);
          if (!permission?.isAllowed) {
            const firstRoute = getFirstAllowedRoute(flatPermissions);
            return NextResponse.redirect(
              new URL(firstRoute ?? "/auth/login", req.url),
            );
          }
        }
      }
    }

    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    response.cookies.delete("token");
    response.cookies.delete("permissions");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
