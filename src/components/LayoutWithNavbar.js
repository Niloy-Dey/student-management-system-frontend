import React from "react";
import NavigationBar from "./NavigationBar"; // ✅ Navbar Component
import { Outlet } from "react-router-dom";

const LayoutWithNavbar = () => {
  return (
    <div style={{ paddingTop: "60px" }}> {/* ✅ Push content down below navbar */}
      <NavigationBar /> {/* ✅ Always show Navbar */}
      <Outlet /> {/* Renders child pages (Login, Register, Home, etc.) */}
    </div>
  );
};

export default LayoutWithNavbar;
