import { MenuItemType } from "@/types/menu";

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: "navigation",
    label: "Navigation",
    isTitle: true,
  },
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "tabler:dashboard",
    url: "/dashboard",
  },

  {
    key: "crm",
    label: "CRM/Sales",
    icon: "tabler:file-invoice",
    children: [
      {
        key: "crm-leads",
        label: "Leads",
        url: "/crm/leads",
        parentKey: "crm",
      },
      {
        key: "crm-queries",
        label: "Queries",
        url: "/crm/queries",
        parentKey: "crm",
      },
      {
        key: "crm-confirmed-queries",
        label: "Confirmed Queries",
        url: "/crm/confirmed-queries",
        parentKey: "crm",
      },
      {
        key: "crm-b2c-customers",
        label: "B2C Customers",
        url: "/crm/b2c-customers",
        parentKey: "crm",
      },
      {
        key: "crm-b2b-customers",
        label: "B2B Customers",
        url: "/crm/b2b-customers",
        parentKey: "crm",
      },
      {
        key: "crm-my-suppliers",
        label: "My Suppliers",
        url: "/crm/my-suppliers",
        parentKey: "crm",
      },
      {
        key: "crm-archived-leads",
        label: "Archived Leads",
        url: "/crm/archived-leads",
        parentKey: "crm",
      },
    ],
  },

  {
    key: "marketing",
    label: "Marketing",
    icon: "tabler:speakerphone",
    children: [
      {
        key: "marketing-dashboard",
        label: "Dashboard",
        url: "/marketing/dashboard",
        parentKey: "marketing",
      },
      {
        key: "lists",
        label: "Lists",
        url: "/marketing/lists",
        parentKey: "lists",
      },
      {
        key: "email-marketing",
        label: "Email Marketing",
        url: "/marketing/email-marketing",
        parentKey: "email-marketing",
      },
      {
        key: "campaigns",
        label: "Campaigns",
        url: "/marketing/campaigns",
        parentKey: "campaigns",
      },
      {
        key: "default-campaigns",
        label: "Default Campaigns",
        url: "/marketing/default-campaigns",
        parentKey: "default-campaigns",
      },
      {
        key: "manage-landing-page",
        label: "Manage Landing Page",
        url: "/marketing/manage-landing-page",
        parentKey: "manage-landing-page",
      },
      {
        key: "campaigns-Url-builder",
        label: "Campaigns URL Builder",
        url: "/marketing/campaigns-Url-builder",
        parentKey: "campaigns-Url-builder",
      },
      {
        key: "view-feedback",
        label: "View Feedback",
        url: "/marketing/view-feedback",
        parentKey: "view-feedback",
      },
      {
        key: "coupon-code",
        label: "Coupon Code",
        url: "/marketing/coupon-code",
        parentKey: "coupon-code",
      },
      {
        key: "meta-integration",
        label: "Meta Integration",
        url: "/marketing/meta-integration",
        parentKey: "meta-integration",
      },
    ],
  },

  {
    key: "operations",
    label: "Operations",
    icon: "tabler:layout-grid",
    children: [
      {
        key: "operations-wip-packages",
        label: "WIP Packages",
        url: "/operations/wip-packages",
        parentKey: "operations",
      },
      {
        key: "operations-flights-modifications",
        label: "Flights Modifications",
        url: "/operations/flights-modifications",
        parentKey: "operations",
      },
      {
        key: "operations-refund-upgrade",
        label: "Refund Upgrade",
        url: "/operations/refund-upgrade",
        parentKey: "operations",
      },
      {
        key: "operations-flight-bookings-queue",
        label: "Flight Bookings Queue",
        url: "/operations/flight-bookings-queue",
        parentKey: "operations",
      },
      {
        key: "operations-proposal-requested",
        label: "Proposal Requested",
        url: "/operations/proposal-requested",
        parentKey: "operations",
      },
      {
        key: "operations-supplier-packages-enquiry",
        label: "Supplier Packages Enquiry",
        url: "/operations/supplier-packages-enquiry",
        parentKey: "operations",
      },
    ],
  },

  {
    key: "todos",
    label: "To Do's",
    icon: "tabler:file-invoice",
    url: "/todos",
  },

  {
    key: "my-inventory",
    label: "My Inventory",
    icon: "tabler:brand-asana",
    children: [
      {
        key: "packages",
        label: "Packages",
        url: "/my-inventory/packages",
        parentKey: "my-inventory",
      },
      {
        key: "hotels",
        label: "Hotels",
        url: "/my-inventory/hotels",
        parentKey: "my-inventory",
      },
      {
        key: "sightseeing",
        label: "Sightseeing",
        url: "/my-inventory/sightseeing",
        parentKey: "my-inventory",
      },
      {
        key: "vehicles",
        label: "Vehicles",
        url: "/my-inventory/vehicles",
        parentKey: "my-inventory",
      },
      {
        key: "transport-rates",
        label: "Transport Rates",
        url: "/my-inventory/transport-rates",
        parentKey: "my-inventory",
      },
      {
        key: "visa",
        label: "Visa",
        url: "/my-inventory/visa",
        parentKey: "my-inventory",
      },
      {
        key: "itinerary-description",
        label: "Itinerary Description",
        url: "/my-inventory/itinerary-description",
        parentKey: "my-inventory",
      },
      {
        key: "group-departure",
        label: "Group Departure",
        url: "/my-inventory/group-departure",
        parentKey: "my-inventory",
      },
      {
        key: "area-master",
        label: "Area Master",
        url: "/my-inventory/area-master",
        parentKey: "my-inventory",
      },
      {
        key: "restaurants",
        label: "Restaurants",
        url: "/my-inventory/restaturants",
        parentKey: "my-inventory",
      },
    ],
  },

  {
    key: "reports",
    label: "Reports",
    icon: "tabler:file-invoice",
    children: [
      {
        key: "query-status-report-count",
        label: "Query Status Report (count)",
        url: "/reports/query-status-report-count",
        parentKey: "reports",
      },
      {
        key: "query-status-reportvalue",
        label: "Query Status Report (value)",
        url: "/reports/query-status-reportvalue",
        parentKey: "reports",
      },
      {
        key: "sourcewisereport",
        label: "Sourcewise Lead Report",
        url: "/reports/sourcewisereport",
        parentKey: "reports",
      },
      {
        key: "staffwisereport",
        label: "Staff Wise  Report",
        url: "/reports/staffwisereport",
        parentKey: "reports",
      },
      {
        key: "destinationwisereport",
        label: "Destinationwise Report",
        url: "/reports/destinationwisereport",
        parentKey: "reports",
      },
      {
        key: "campaignwise-successreport",
        label: "Campaignw Success Report",
        url: "/reports/campaignwise-successreport",
        parentKey: "reports",
      },
      {
        key: "b2b-report",
        label: "B2B Report",
        url: "/reports/b2breport",
        parentKey: "reports",
      },
      {
        key: "checkinreport",
        label: "Checkin Report",
        url: "/reports/checkinreport",
        parentKey: "reports",
      },
      {
        key: "checkout-report",
        label: "Checkout Report",
        url: "/reports/checkout-report",
        parentKey: "reports",
      },
      {
        key: "debtors-report",
        label: "Debtors Report",
        url: "/reports/debtors-report",
        parentKey: "reports",
      },
      {
        key: "dcr-report",
        label: "DCR Report",
        url: "/reports/dcr-report",
        parentKey: "reports",
      },
    ],
  },

  {
    key: "bookings",
    label: "Bookings",
    icon: "tabler:calendar",
    children: [
      {
        key: "Packages",
        label: "Packages",
        url: "/bookings/Packages",
        parentKey: "bookings",
      },
      {
        key: "flighttickets",
        label: "Flight Tickets",
        url: "/bookings/flighttickets",
        parentKey: "bookings",
      },
      {
        key: "hotels",
        label: "Hotels",
        url: "/bookings/hotels",
        parentKey: "hotels",
      },
      {
        key: "activities",
        label: "Activities",
        url: "/bookings/activities",
        parentKey: "bookings",
      },
      {
        key: "visa",
        label: "Visa",
        url: "/bookings/visa",
        parentKey: "visa",
      },
      {
        key: "transfer",
        label: "Transfer",
        url: "/bookings/transfer",
        parentKey: "bookings",
      },
    ],
  },

  {
    key: "finance",
    label: "Finance",
    icon: "tabler:premium-rights",
    children: [
      {
        key: "peroforma-invoice",
        label: "Peroforma Invoice",
        url: "/finance/peroforma-invoice",
        parentKey: "finance",
      },
      {
        key: "daily-collection",
        label: "Daily Collection",
        url: "/finance/daily-collection",
        parentKey: "finance",
      },
      {
        key: "my-wallet-history",
        label: "My Wallet History",
        url: "/finance/my-wallet-history",
        parentKey: "finance",
      },
      {
        key: "sales-report",
        label: "Sales Report",
        url: "/finance/sales-report",
        parentKey: "finance",
      },
      {
        key: "booking-report",
        label: "Booking Reports",
        url: "/finance/booking-report",
        parentKey: "finance",
      },
      {
        key: "lead-query-followup-report",
        label: "Lead Query Followup Report",
        url: "/finance/lead-query-followup-report",
        parentKey: "finance",
      },
      {
        key: "invoice",
        label: "Invoice",
        url: "/finance/invoice",
        parentKey: "finance",
      },
      {
        key: "credet-note",
        label: "Credit Note",
        url: "/finance/credet-note",
        parentKey: "finance",
      },
      {
        key: "b2c-customer",
        label: "B2C Customer",
        url: "/finance/b2c-customer",
        parentKey: "finance",
      },
      {
        key: "tcs-collection-report",
        label: "TCS Collection Report",
        url: "/finance/tcs-collection-report",
        parentKey: "finance",
      },
      {
        key: "tax-collection-report",
        label: "Tax Collection Report",
        url: "/finance/tax-collection-report",
        parentKey: "finance",
      },
      {
        key: "reward-points",
        label: "Reward Points",
        url: "/finance/reward-points",
        parentKey: "finance",
      },
    ],
  },

  {
    key: "marketplace",
    label: "Marketplace",
    icon: "tabler:share",
    children: [
      {
        key: "my-offers",
        label: "My Offers",
        url: "/marketplace/my-offers",
        parentKey: "my-offers",
      },
      {
        key: "deals-hub",
        label: "Deals Hub",
        url: "/marketplace/deals-hub",
        parentKey: "deals-hub",
      },
      {
        key: "my-published-packages",
        label: "My Published Packages",
        url: "/marketplace/my-published-packages",
        parentKey: "my-published-packages",
      },
    ],
  },

  {
    key: "staff-management",
    label: "Staff Management",
    icon: "tabler:users",
    children: [
      {
        key: "roles",
        label: "Roles",
        url: "/staff-management/roles",
        parentKey: "staff-management",
      },
      {
        key: "departments",
        label: "Departments",
        url: "/staff-management/departments",
        parentKey: "staff-management",
      },
      {
        key: "staff",
        label: "Staff",
        url: "/staff-management/staff",
        parentKey: "staff-management",
      },
    ],
  },

  {
    key: "settings",
    label: "Settings",
    icon: "tabler:settings-cog",
    children: [
      {
        key: "company-profile",
        label: "Company Profile",
        url: "/settings/company-profile",
        parentKey: "company-profile",
      },
      {
        key: "terms-and-conditions",
        label: "Terms and Conditions",
        url: "/settings/terms-and-conditions",
        parentKey: "settings",
      },
      {
        key: "email-templates",
        label: "Email Templates",
        url: "/settings/email-templates",
        parentKey: "settings",
      },
      {
        key: "mark-ups",
        label: "Mark Ups",
        url: "/settings/mark-ups",
        parentKey: "mark-ups",
      },
      {
        key: "lead-source",
        label: "Lead Source",
        url: "/settings/lead-source",
        parentKey: "lead-source",
      },
      {
        key: "manage-notifications",
        label: "Manage Notifications",
        url: "/settings/manage-notifications",
        parentKey: "manage-notifications",
      },
      {
        key: "communications",
        label: "Communications",
        url: "/settings/communications",
        parentKey: "settings",
      },
      {
        key: "subscriptions-plan",
        label: "Subscriptions Plan",
        url: "/settings/subscriptions-plan",
        parentKey: "subscriptions-plan",
      },
      {
        key: "global-settings",
        label: "Global Settings",
        url: "/settings/global-settings",
        parentKey: "global-settings",
      },
    ],
  },

  {
    key: "forms",
    label: "Forms",
    icon: "tabler:forms",
    children: [
      {
        key: "basic",
        label: "Basic Elements",
        url: "/forms/basic",
        parentKey: "forms",
      },
      {
        key: "inputmask",
        label: "Inputmask",
        url: "/forms/inputmask",
        parentKey: "forms",
      },
      {
        key: "picker",
        label: "Picker",
        url: "/forms/picker",
        parentKey: "forms",
      },
      {
        key: "select",
        label: "Select",
        url: "/forms/select",
        parentKey: "forms",
      },
      {
        key: "slider",
        label: "Range Slider",
        url: "/forms/slider",
        parentKey: "forms",
      },
      {
        key: "validation",
        label: "Validation",
        url: "/forms/validation",
        parentKey: "forms",
      },
      {
        key: "wizard",
        label: "Wizard",
        url: "/forms/wizard",
        parentKey: "forms",
      },
      {
        key: "file-uploads",
        label: "File Uploads",
        url: "/forms/file-uploads",
        parentKey: "forms",
      },
      {
        key: "editors",
        label: "Editors",
        url: "/forms/editors",
        parentKey: "forms",
      },
      {
        key: "layout",
        label: "Layouts",
        url: "/forms/layout",
        parentKey: "forms",
      },
    ],
  },
  {
    key: "tables",
    label: "Tables",
    icon: "tabler:table",
    children: [
      {
        key: "basic-table",
        label: "Basic Tables",
        url: "/tables/basic-table",
        parentKey: "tables",
      },
      {
        key: "gridJs",
        label: "GridJs Tables",
        url: "/tables/gridJs",
        parentKey: "tables",
      },
    ],
  },
];

export const HORIZONTAL_MENU_ITEM: MenuItemType[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "tabler:dashboard",
    url: "/dashboard",
  },

  {
    key: "crm",
    label: "CRM/Sales",
    icon: "tabler:file-invoice",
    children: [
      {
        key: "crm-leads",
        label: "Leads",
        url: "/crm/leads",
        parentKey: "crm",
      },
      {
        key: "crm-queries",
        label: "Queries",
        url: "/crm/queries",
        parentKey: "crm",
      },
      {
        key: "crm-confirmed-queries",
        label: "Confirmed Queries",
        url: "/crm/confirmed-queries",
        parentKey: "crm",
      },
      {
        key: "crm-b2c-customers",
        label: "B2C Customer(s)",
        url: "/crm/b2c-customers",
        parentKey: "crm",
      },
      {
        key: "crm-b2b-customers",
        label: "B2B Customer(s)",
        url: "/crm/b2b-customers",
        parentKey: "crm",
      },
      {
        key: "crm-my-suppliers",
        label: "My Suppliers",
        url: "/crm/my-suppliers",
        parentKey: "crm",
      },
      {
        key: "crm-archived-leads",
        label: "Archived Leads",
        url: "/crm/archived-leads",
        parentKey: "crm",
      },
    ],
  },

  {
    key: "marketing",
    label: "Marketing",
    icon: "tabler:speakerphone",
    children: [
      {
        key: "marketing-dashboard",
        label: "Dashboard",
        url: "/marketing/dashboard",
        parentKey: "marketing",
      },
      {
        key: "lists",
        label: "Lists",
        url: "/marketing/lists",
        parentKey: "lists",
      },
      {
        key: "email-marketing",
        label: "Email Marketing",
        url: "/marketing/email-marketing",
        parentKey: "email-marketing",
      },
      {
        key: "campaigns",
        label: "Campaigns",
        url: "/marketing/campaigns",
        parentKey: "campaigns",
      },
      {
        key: "default-campaigns",
        label: "Default Campaigns",
        url: "/marketing/default-campaigns",
        parentKey: "default-campaigns",
      },
      {
        key: "manage-landing-page",
        label: "Manage Landing Page",
        url: "/marketing/manage-landing-page",
        parentKey: "manage-landing-page",
      },
      {
        key: "campaigns-Url-builder",
        label: "Campaigns URL Builder",
        url: "/marketing/campaigns-Url-builder",
        parentKey: "campaigns-Url-builder",
      },
      {
        key: "view-feedback",
        label: "View Feedback",
        url: "/marketing/view-feedback",
        parentKey: "view-feedback",
      },
      {
        key: "coupon-code",
        label: "Coupon Code",
        url: "/marketing/coupon-code",
        parentKey: "coupon-code",
      },
      {
        key: "meta-integration",
        label: "Meta Integration",
        url: "/marketing/meta-integration",
        parentKey: "meta-integration",
      },
    ],
  },

  {
    key: "operations",
    label: "Operations",
    icon: "tabler:layout-grid",
    children: [
      {
        key: "operations-wip-packages",
        label: "WIP Packages",
        url: "/operations/wip-packages",
        parentKey: "operations",
      },
      {
        key: "operations-flights-modifications",
        label: "Flights Modifications",
        url: "/operations/flights-modifications",
        parentKey: "operations",
      },
      {
        key: "operations-refund-upgrade",
        label: "Refund Upgrade",
        url: "/operations/refund-upgrade",
        parentKey: "operations",
      },
      {
        key: "operations-flight-bookings-queue",
        label: "Flight Bookings Queue",
        url: "/operations/flight-bookings-queue",
        parentKey: "operations",
      },
      {
        key: "operations-proposal-requested",
        label: "Proposal Requested",
        url: "/operations/proposal-requested",
        parentKey: "operations",
      },
      {
        key: "operations-supplier-packages-enquiry",
        label: "Supplier Packages Enquiry",
        url: "/operations/supplier-packages-enquiry",
        parentKey: "operations",
      },
    ],
  },

  {
    key: "todos",
    label: "To Do's",
    icon: "tabler:file-invoice",
    url: "/todos",
  },

  {
    key: "my-inventory",
    label: "My Inventory",
    icon: "tabler:brand-asana",
    children: [
      {
        key: "inventory-packages",
        label: "Packages",
        url: "/my-inventory/packages",
        parentKey: "my-inventory"
      },
      {
        key: "inventory-hotels",
        label: "Hotels",
        url: "/my-inventory/hotels",
        parentKey: "my-inventory"
      },
      {
        key: "inventory-sightseeing",
        label: "Sightseeing",
        url: "/my-inventory/sightseeing",
        parentKey: "my-inventory"
      },
      {
        key: "inventory-vehicles",
        label: "Vehicles",
        url: "/my-inventory/vehicles",
        parentKey: "my-inventory"
      },
      {
        key: "inventory-transport-rates",
        label: "Transport Rates",
        url: "/my-inventory/transport-rates",
        parentKey: "my-inventory"
      },
      {
        key: "inventory-visa",
        label: "Visa",
        url: "/my-inventory/visa",
        parentKey: "my-inventory"
      },
      {
        key: "inventory-itinerary",
        label: "Itinerary Description",
        url: "/my-inventory/itinerary-description",
        parentKey: "my-inventory"
      },
      {
        key: "inventory-group-departure",
        label: "Group Departure",
        url: "/my-inventory/group-departure",
      },
      {
        key: "inventory-area-master",
        label: "Area Master",
        url: "/my-inventory/area-master",
      },
      {
        key: "inventory-restaurants",
        label: "Restaurants",
        url: "/my-inventory/restaturants",
      },
    ],
  },

  {
    key: "reports",
    label: "Reports",
    icon: "tabler:file-invoice",
    children: [
      {
        key: "query-status-report-count",
        label: "Query Status Report (count)",
        url: "/reports/query-status-report-count",
        parentKey: "reports",
      },
      {
        key: "query-status-reportvalue",
        label: "Query Status Report (value)",
        url: "/reports/query-status-reportvalue",
        parentKey: "reports",
      },
      {
        key: "sourcewisereport",
        label: "Sourcewise Lead Report",
        url: "/reports/sourcewisereport",
        parentKey: "reports",
      },
      {
        key: "staffwisereport",
        label: "Staff Wise  Report",
        url: "/reports/staffwisereport",
        parentKey: "reports",
      },
      {
        key: "destinationwisereport",
        label: "Destinationwise Report",
        url: "/reports/destinationwisereport",
        parentKey: "reports",
      },
      {
        key: "campaignwise-successreport",
        label: "Campaignw Success Report",
        url: "/reports/campaignwise-successreport",
        parentKey: "reports",
      },
      {
        key: "b2breport",
        label: "B2B Report",
        url: "/reports/b2breport",
        parentKey: "reports",
      },
      {
        key: "checkinreport",
        label: "Checkin Report",
        url: "/reports/checkinreport",
        parentKey: "reports",
      },
      {
        key: "checkout-report",
        label: "Checkout Report",
        url: "/reports/checkout-report",
        parentKey: "reports",
      },
      {
        key: "debtors-report",
        label: "Debtors Report",
        url: "/reports/debtors-report",
        parentKey: "reports",
      },
      {
        key: "dcr-report",
        label: "DCR Report",
        url: "/reports/dcr-report",
        parentKey: "reports",
      },
    ],
  },

  {
    key: "bookings",
    label: "Bookings",
    icon: "tabler:calendar",
    children: [
      {
        key: "Packages",
        label: "Packages",
        url: "/bookings/Packages",
        parentKey: "bookings",
      },
      {
        key: "flighttickets",
        label: "Flight Tickets",
        url: "/bookings/flighttickets",
        parentKey: "bookings",
      },
      {
        key: "hotels",
        label: "Hotels",
        url: "/bookings/hotels",
        parentKey: "bookings",
      },
      {
        key: "activities",
        label: "Activities",
        url: "/bookings/activities",
        parentKey: "bookings",
      },
      {
        key: "visa",
        label: "Visa",
        url: "/bookings/visa",
        parentKey: "bookings",
      },
      {
        key: "transfer",
        label: "Transfer",
        url: "/bookings/transfer",
        parentKey: "bookings",
      },
    ],
  },

  {
    key: "finance",
    label: "Finance",
    icon: "tabler:premium-rights",
    children: [
      {
        key: "peroforma-invoice",
        label: "Peroforma Invoice",
        url: "/finance/peroforma-invoice",
        parentKey: "finance",
      },
      {
        key: "daily-collection",
        label: "Daily Collection",
        url: "/finance/daily-collection",
        parentKey: "finance",
      },
      {
        key: "my-wallet-history",
        label: "My Wallet History",
        url: "/finance/my-wallet-history",
        parentKey: "finance",
      },
      {
        key: "sales-report",
        label: "Sales Report",
        url: "/finance/sales-report",
        parentKey: "finance",
      },
      {
        key: "booking-report",
        label: "Booking Reports",
        url: "/finance/booking-report",
        parentKey: "finance",
      },
      {
        key: "lead-query-followup-report",
        label: "Lead Query Followup Report",
        url: "/finance/lead-query-followup-report",
        parentKey: "finance",
      },
      {
        key: "invoice",
        label: "Invoice",
        url: "/finance/invoice",
        parentKey: "finance",
      },
      {
        key: "credet-note",
        label: "Credit Note",
        url: "/finance/credet-note",
        parentKey: "finance",
      },
      {
        key: "b2c-customer",
        label: "B2C Customer",
        url: "/finance/b2c-customer",
        parentKey: "finance",
      },
      {
        key: "tcs-collection-report",
        label: "TCS Collection Report",
        url: "/finance/tcs-collection-report",
        parentKey: "finance",
      },
      {
        key: "tax-collection-report",
        label: "Tax Collection Report",
        url: "/finance/tax-collection-report",
        parentKey: "finance",
      },
      {
        key: "reward-points",
        label: "Reward Points",
        url: "/finance/reward-points",
        parentKey: "finance",
      },
    ],
  },

  {
    key: "marketplace",
    label: "Marketplace",
    icon: "tabler:share",
    children: [
      {
        key: "my-offers",
        label: "My Offers",
        url: "/marketplace/my-offers",
        parentKey: "marketplace",
      },
      {
        key: "deals-hub",
        label: "Deals Hub",
        url: "/marketplace/deals-hub",
        parentKey: "marketplace",
      },
      {
        key: "my-published-packages",
        label: "My Published Packages",
        url: "/marketplace/my-published-packages",
        parentKey: "marketplace",
      },
    ],
  },

  {
    key: "staff-management",
    label: "Staff Management",
    icon: "tabler:users",
    children: [
      {
        key: "roles",
        label: "Roles",
        url: "/staff-management/roles",
        parentKey: "staff-management",
      },
      {
        key: "departments",
        label: "Departments",
        url: "/staff-management/departments",
        parentKey: "staff-management",
      },
      {
        key: "staff",
        label: "Staff",
        url: "/staff-management/staff",
        parentKey: "staff-management",
      },
    ],
  },

  {
    key: "settings",
    label: "Settings",
    icon: "tabler:settings-cog",
    children: [
      {
        key: "company-profile",
        label: "Company Profile",
        url: "/settings/company-profile",
        parentKey: "company-profile",
      },
      {
        key: "terms-and-conditions",
        label: "Terms and Conditions",
        url: "/settings/terms-and-conditions",
        parentKey: "settings",
      },
      {
        key: "email-templates",
        label: "Email Templates",
        url: "/settings/email-templates",
        parentKey: "settings",
      },
      {
        key: "mark-ups",
        label: "Mark Ups",
        url: "/settings/mark-ups",
        parentKey: "mark-ups",
      },
      {
        key: "lead-source",
        label: "Lead Source",
        url: "/settings/lead-source",
        parentKey: "lead-source",
      },
      {
        key: "manage-notifications",
        label: "Manage Notifications",
        url: "/settings/manage-notifications",
        parentKey: "manage-notifications",
      },
      {
        key: "communications",
        label: "Communications",
        url: "/settings/communications",
        parentKey: "settings",
      },
      {
        key: "subscriptions-plan",
        label: "Subscriptions Plan",
        url: "/settings/subscriptions-plan",
        parentKey: "subscriptions-plan",
      },
      {
        key: "global-settings",
        label: "Global Settings",
        url: "/settings/global-settings",
        parentKey: "settings",
      },
    ],
  },
];
