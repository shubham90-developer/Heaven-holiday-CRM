import React, { useState, useEffect } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { IPermissionSection } from "../../../../../../../Redux/staffApi";
type PermissionControlProps = {
  onNext: (permissions: IPermissionSection[]) => void;
  initialPermissions?: IPermissionSection[];
};

const permissionData = [
  { key: "dashboard", title: "Dashboard", children: [] },
  {
    key: "crm",
    title: "CRM / Sales",
    children: [
      "Leads",
      "Queries",
      "Confirmed Queries",
      "B2C Customer(s)",
      "B2B Customer(s)",
      "My Suppliers",
      "Archived Leads",
    ],
  },
  {
    key: "marketing",
    title: "Marketing",
    children: [
      "Dashboard",
      "Lists",
      "Email Marketing",
      "Campaigns",
      "Default Campaigns",
      "Manage Landing Page",
      "Campaign URL Builder",
      "View Feedback",
      "Coupon Code",
      "Meta Integration",
    ],
  },
  {
    key: "operations",
    title: "Operations",
    children: [
      "WIP Packages",
      "Flight Modifications",
      "Refund Upgrade",
      "Flights Booking Queue",
      "Proposal Requested",
      "Supplier Package Enquiry",
    ],
  },
  { key: "todos", title: "To Do's", children: [] },
  {
    key: "inventory",
    title: "My Inventory",
    children: [
      "Packages",
      "Hotels",
      "Sightseeing",
      "Vehicles",
      "Transport Rates",
      "Visa",
      "Itinerary Description",
      "Group Departure",
      "Area Master",
      "Restaurants",
    ],
  },
  {
    key: "reports",
    title: "Reports",
    children: [
      "Query Status Report (Count)",
      "Query Status Report (Value)",
      "Sourcewise Lead Report",
      "Staff Wise Report",
      "Destination Wise Report",
      "Campaign Success Report",
      "B2B Report",
      "CheckIn Report",
      "Checkout Report",
      "Debtors Report",
      "DCR Report",
    ],
  },
  {
    key: "bookings",
    title: "Bookings",
    children: [
      "Packages",
      "Flights Ticket",
      "Hotels",
      "Activities",
      "Visa",
      "Transfer",
    ],
  },
  {
    key: "finance",
    title: "Finance",
    children: [
      "Proforma Invoice",
      "Daily Collection",
      "My Wallet History",
      "Sales Report",
      "Booking Reports",
      "Lead/Query Follow Up Report",
      "Invoice",
      "Credit Note",
      "B2C Customer",
      "TCS Collection Report",
      "Tax Collection Report",
      "Reward Points",
    ],
  },
  {
    key: "marketplace",
    title: "Marketplace",
    children: ["My Offers", "Deals Hub", "My Published Package"],
  },
  {
    key: "staff_management",
    title: "Staff Management",
    children: ["Roles", "Department", "Staff"],
  },
  {
    key: "settings",
    title: "Settings",
    children: [
      "Company Profile",
      "Term & Conditions",
      "Email Templates",
      "Mark Ups",
      "Lead Source",
      "Manage Notifications",
      "Communications",
      "Subscription Plan",
      "Global Settings",
    ],
  },
  { key: "refer_earn", title: "Refer & Earn", children: [] },
  {
    key: "other_settings",
    title: "Other Settings",
    children: [
      "Full Masking",
      "Show Supplier",
      "Modify Proposals Post Sales",
      "Hide Sales & Profit In Fulfillment",
      "Lock/Unlock Full File In Fulfillment",
      "File Lock/Unlock (Ex-Voucher)",
      "Hide Inventory Package Edit / Delete",
      "Auto-approve Payment",
    ],
  },
];

const PermissionControl = ({
  onNext,
  initialPermissions = [],
}: PermissionControlProps) => {
  const router = useRouter();

  // parentState: { [key]: boolean }
  const [parentState, setParentState] = useState<Record<string, boolean>>({});
  // childState: { [parentKey]: { [childLabel]: boolean } }
  const [childState, setChildState] = useState<
    Record<string, Record<string, boolean>>
  >({});

  // Convert API permissions array → local state on mount/update
  useEffect(() => {
    if (!initialPermissions || initialPermissions.length === 0) return;

    const newParent: Record<string, boolean> = {};
    const newChild: Record<string, Record<string, boolean>> = {};

    initialPermissions.forEach((section) => {
      newParent[section.key] = section.isAllowed;
      if (section.children && section.children.length > 0) {
        newChild[section.key] = {};
        section.children.forEach((child: any) => {
          newChild[section.key][child.label] = child.isAllowed;
        });
      }
    });

    setParentState(newParent);
    setChildState(newChild);
  }, [initialPermissions]);

  const handleParentChange = (key: string, checked: boolean) => {
    setParentState((prev) => ({ ...prev, [key]: checked }));

    // If unchecking parent, uncheck all children
    if (!checked) {
      setChildState((prev) => ({ ...prev, [key]: {} }));
    }
  };

  const handleChildChange = (
    parentKey: string,
    childLabel: string,
    checked: boolean,
  ) => {
    setChildState((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childLabel]: checked,
      },
    }));
  };

  // Convert local state back to API format before passing to parent
  const handleNext = () => {
    const updatedPermissions: IPermissionSection[] = permissionData.map(
      (section) => ({
        key: section.key,
        title: section.title,
        isAllowed: parentState[section.key] || false,
        children: section.children.map((childLabel) => ({
          key: childLabel.toLowerCase().replace(/\s+/g, "-"),
          label: childLabel,
          isAllowed: childState[section.key]?.[childLabel] || false,
        })),
      }),
    );

    onNext(updatedPermissions);
  };

  return (
    <>
      <Form>
        <b>Permission Control</b>
        <Row className="mb-2 mt-2">
          <div>
            {permissionData.map((section) => (
              <div key={section.key} className="mb-3">
                {/* Parent Checkbox */}
                <Form.Check
                  type="checkbox"
                  label={section.title}
                  checked={parentState[section.key] || false}
                  onChange={(e) =>
                    handleParentChange(section.key, e.target.checked)
                  }
                  style={{ fontWeight: "bold", fontSize: "13px" }}
                />

                {/* Children — only show if parent checked and has children */}
                {parentState[section.key] && section.children.length > 0 && (
                  <div className="mt-2 ms-3 d-flex flex-wrap gap-3">
                    {section.children.map((childLabel, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={childLabel}
                        checked={childState[section.key]?.[childLabel] || false}
                        onChange={(e) =>
                          handleChildChange(
                            section.key,
                            childLabel,
                            e.target.checked,
                          )
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
