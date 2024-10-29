import { ReactElement } from "react";
// Make sure to import React for JSX
import React from "react";
import {
  FaHome,
  FaEnvelope,
  FaCog,
  FaBell,
  FaBookmark,
  FaUser,
} from "react-icons/fa";

interface SidebarOption {
  name: string;
  icon: ReactElement;
  path: string;
}

export const sidebarOptions: SidebarOption[] = [
  // Using type assertion to help TypeScript understand these are valid ReactElements
  { name: "New Feed", icon: React.createElement(FaHome), path: "/feed" },
  {
    name: "Messages",
    icon: React.createElement(FaEnvelope),
    path: "/messages",
  },
  { name: "Settings", icon: React.createElement(FaCog), path: "/settings" },
  {
    name: "Notifications",
    icon: React.createElement(FaBell),
    path: "/notifications",
  },
  {
    name: "Saved Posts",
    icon: React.createElement(FaBookmark),
    path: "/saved-posts",
  },
  { name: "Profile", icon: React.createElement(FaUser), path: "/profile" },
];
