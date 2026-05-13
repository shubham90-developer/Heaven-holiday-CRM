import { currency } from "@/context/constants";
import { StaticImageData } from "next/image";
import usFlag from "@/assets/images/flags/us.svg";
import inFlag from "@/assets/images/flags/in.svg";
import brFlag from "@/assets/images/flags/br.svg";
import caFlag from "@/assets/images/flags/ca.svg";

export type StatType = {
  title: string;
  icon: string;
  otherIcon: string;
  count: string;
  change: number;
  variant: string;
  href: string;
  btnTitle: string;
  onClick?: () => void;
};
export type VisitorTrafficsType = {
  country: string;
  flag: StaticImageData;
  count: number;
  progress: number;
  variant: string;
};

export const statData: StatType[] = [
  {
    title: "B2C Lead",
    icon: "solar:case-round-minimalistic-bold-duotone",
    otherIcon: "solar:cart-2-line-duotone",
    count: "687.3k",
    change: 9.19,
    variant: "primary",
    href: "#",
    btnTitle: "Add New",
  },
  {
    title: "B2B Lead",
    icon: "solar:buildings-2-bold-duotone",
    otherIcon: "solar:cart-2-line-duotone",
    count: "421.5k",
    change: 7.12,
    variant: "info",
    href: "#",
    btnTitle: "Add New",
  },
  {
    title: "Retail Lead",
    icon: "solar:shop-bold-duotone",
    otherIcon: "solar:cart-2-line-duotone",
    count: "212.9k",
    change: 5.4,
    variant: "success",
    href: "#",
    btnTitle: "Add New",
  },
  {
    title: "Corporate Lead",
    icon: "solar:buildings-2-bold-duotone",
    otherIcon: "solar:cart-line-duotone",
    count: "158.3k",
    change: 3.8,
    variant: "warning",
    href: "#",
    btnTitle: "Add New",
  },
  {
    title: "New Leads",
    icon: "solar:user-plus-bold-duotone",
    otherIcon: "solar:cart-2-line-duotone",
    count: "96.4k",
    change: 4.6,
    variant: "danger",
    href: "#",
    btnTitle: "Add New",
  },
  {
    title: "Queries",
    icon: "solar:chat-round-dots-bold-duotone",
    otherIcon: "solar:cart-2-line-duotone",
    count: "54.7k",
    change: 2.3,
    variant: "secondary",
    href: "#",
    btnTitle: "Add New",
  },
  {
    title: "To Do's",
    icon: "solar:chat-round-dots-bold-duotone",
    otherIcon: "solar:cart-2-line-duotone",
    count: "54.7k",
    change: 2.3,
    variant: "primary",
    href: "#",
    btnTitle: "View All",
  },
  {
    title: "My Suppliers",
    icon: "solar:user-bold-duotone",
    otherIcon: "solar:cart-2-line-duotone",
    count: "54.7k",
    change: 2.3,
    variant: "secondary",
    href: "#",
    btnTitle: "View All",
  },
];
export const visitorTrafficsData: VisitorTrafficsType[] = [
  {
    flag: usFlag,
    count: 67.5,
    country: "United States",
    progress: 72.15,
    variant: "secondary",
  },
  {
    flag: inFlag,
    count: 7.92,
    country: "India",
    progress: 28.65,
    variant: "info",
  },
  {
    flag: brFlag,
    count: 80.05,
    country: "Brazil",
    progress: 62.5,
    variant: "warning",
  },
  {
    flag: caFlag,
    count: 5.3,
    country: "Canada",
    progress: 42.2,
    variant: "success",
  },
];
