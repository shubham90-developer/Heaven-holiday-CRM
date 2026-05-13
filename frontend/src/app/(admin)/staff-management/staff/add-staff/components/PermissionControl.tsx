import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { IPermissionSection } from "../../../../../../../Redux/staffApi";
type PermissionControlProps = {
  onNext: (data: IPermissionSection[]) => void;
};

const PermissionControl = ({ onNext }: PermissionControlProps) => {
  const [permissions, setPermissions] = useState<
    Record<string, Record<string, boolean>>
  >({});
  const router = useRouter();

  const permissionData = [
    {
      key: "dashboard",
      title: "Dashboard",
    },
    {
      key: "crm",
      title: "CRM/Sales",
      children: [
        { key: "crm-leads", label: "Leads" },
        { key: "crm-queries", label: "Queries" },
        { key: "crm-confirmed-queries", label: "Confirmed Queries" },
        { key: "crm-b2c-customers", label: "B2C Customers" },
        { key: "crm-b2b-customers", label: "B2B Customers" },
        { key: "crm-my-suppliers", label: "My Suppliers" },
        { key: "crm-archived-leads", label: "Archived Leads" },
      ],
    },
    {
      key: "marketing",
      title: "Marketing",
      children: [
        { key: "marketing-dashboard", label: "Dashboard" },
        { key: "lists", label: "Lists" },
        { key: "email-marketing", label: "Email Marketing" },
        { key: "campaigns", label: "Campaigns" },
        { key: "default-campaigns", label: "Default Campaigns" },
        { key: "manage-landing-page", label: "Manage Landing Page" },
        { key: "campaigns-Url-builder", label: "Campaigns URL Builder" },
        { key: "view-feedback", label: "View Feedback" },
        { key: "coupon-code", label: "Coupon Code" },
        { key: "meta-integration", label: "Meta Integration" },
      ],
    },
    {
      key: "operations",
      title: "Operations",
      children: [
        { key: "operations-wip-packages", label: "WIP Packages" },
        {
          key: "operations-flights-modifications",
          label: "Flights Modifications",
        },
        { key: "operations-refund-upgrade", label: "Refund Upgrade" },
        {
          key: "operations-flight-bookings-queue",
          label: "Flight Bookings Queue",
        },
        { key: "operations-proposal-requested", label: "Proposal Requested" },
        {
          key: "operations-supplier-packages-enquiry",
          label: "Supplier Packages Enquiry",
        },
      ],
    },
    {
      key: "todos",
      title: "To Do's",
    },
    {
      key: "my-inventory",
      title: "My Inventory",
      children: [
        { key: "packages", label: "Packages" },
        { key: "hotels", label: "Hotels" },
        { key: "sightseeing", label: "Sightseeing" },
        { key: "vehicles", label: "Vehicles" },
        { key: "transport-rates", label: "Transport Rates" },
        { key: "visa", label: "Visa" },
        { key: "itinerary-description", label: "Itinerary Description" },
        { key: "group-departure", label: "Group Departure" },
        { key: "area-master", label: "Area Master" },
        { key: "restaurants", label: "Restaurants" },
      ],
    },
    {
      key: "reports",
      title: "Reports",
      children: [
        {
          key: "query-status-report-count",
          label: "Query Status Report (Count)",
        },
        {
          key: "query-status-reportvalue",
          label: "Query Status Report (Value)",
        },
        { key: "sourcewisereport", label: "Sourcewise Lead Report" },
        { key: "staffwisereport", label: "Staff Wise Report" },
        { key: "destinationwisereport", label: "Destination Wise Report" },
        { key: "campaignwise-successreport", label: "Campaign Success Report" },
        { key: "b2b-report", label: "B2B Report" },
        { key: "checkinreport", label: "CheckIn Report" },
        { key: "checkout-report", label: "Checkout Report" },
        { key: "debtors-report", label: "Debtors Report" },
        { key: "dcr-report", label: "DCR Report" },
      ],
    },
    {
      key: "bookings",
      title: "Bookings",
      children: [
        { key: "Packages", label: "Packages" },
        { key: "flighttickets", label: "Flight Tickets" },
        { key: "hotels", label: "Hotels" },
        { key: "activities", label: "Activities" },
        { key: "visa", label: "Visa" },
        { key: "transfer", label: "Transfer" },
      ],
    },
    {
      key: "finance",
      title: "Finance",
      children: [
        { key: "peroforma-invoice", label: "Proforma Invoice" },
        { key: "daily-collection", label: "Daily Collection" },
        { key: "my-wallet-history", label: "My Wallet History" },
        { key: "sales-report", label: "Sales Report" },
        { key: "booking-report", label: "Booking Reports" },
        {
          key: "lead-query-followup-report",
          label: "Lead/Query Follow Up Report",
        },
        { key: "invoice", label: "Invoice" },
        { key: "credet-note", label: "Credit Note" },
        { key: "b2c-customer", label: "B2C Customer" },
        { key: "tcs-collection-report", label: "TCS Collection Report" },
        { key: "tax-collection-report", label: "Tax Collection Report" },
        { key: "reward-points", label: "Reward Points" },
      ],
    },
    {
      key: "marketplace",
      title: "Marketplace",
      children: [
        { key: "my-offers", label: "My Offers" },
        { key: "deals-hub", label: "Deals Hub" },
        { key: "my-published-packages", label: "My Published Packages" },
      ],
    },
    {
      key: "staff-management",
      title: "Staff Management",
      children: [
        { key: "roles", label: "Roles" },
        { key: "departments", label: "Department" },
        { key: "staff", label: "Staff" },
      ],
    },
    {
      key: "settings",
      title: "Settings",
      children: [
        { key: "company-profile", label: "Company Profile" },
        { key: "terms-and-conditions", label: "Term & Conditions" },
        { key: "email-templates", label: "Email Templates" },
        { key: "mark-ups", label: "Mark Ups" },
        { key: "lead-source", label: "Lead Source" },
        { key: "manage-notifications", label: "Manage Notifications" },
        { key: "communications", label: "Communications" },
        { key: "subscriptions-plan", label: "Subscription Plan" },
        { key: "global-settings", label: "Global Settings" },
      ],
    },
  ];

  const handleNext = () => {
    const result: IPermissionSection[] = permissionData.map((section) => ({
      key: section.key,
      title: section.title,
      isAllowed: permissions[section.key]?.parent || false,
      children: (section.children || []).map((child) => ({
        key: child.key,
        label: child.label,
        isAllowed: permissions[section.key]?.[child.key] || false,
      })),
    }));

    onNext(result);
  };

  return (
    <>
      <Form>
        <b>Permission Control</b>
        <Row className="mb-2 mt-2">
          <div>
            {permissionData.map((section) => (
              <div key={section.key} className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={section.title}
                  checked={permissions[section.key]?.parent || false}
                  onChange={(e) =>
                    setPermissions({
                      ...permissions,
                      [section.key]: {
                        ...permissions[section.key],
                        parent: e.target.checked,
                      },
                    })
                  }
                  style={{ fontWeight: "bold", fontSize: "13px" }}
                />

                {permissions[section.key]?.parent && section.children && (
                  <div className="mt-2 ms-3 d-flex flex-wrap gap-3">
                    {section.children.map((child) => (
                      <Form.Check
                        key={child.key}
                        type="checkbox"
                        label={child.label}
                        checked={permissions[section.key]?.[child.key] || false}
                        onChange={(e) =>
                          setPermissions({
                            ...permissions,
                            [section.key]: {
                              ...permissions[section.key],
                              [child.key]: e.target.checked,
                            },
                          })
                        }
                        style={{ fontSize: "12px" }}
                      />
                    ))}
                  </div>
                )}
                <hr />
              </div>
            ))}
          </div>
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-2">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => router.push("./")}
            style={{ fontSize: "10px" }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            style={{ fontSize: "10px" }}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PermissionControl;
