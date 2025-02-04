import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar"; // ✅ Navbar
import DashboardSidebar from "./DashboardSidebar"; // ✅ Sidebar

const Layout = ({ userRole }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* ✅ Navbar (Always at the Top) */}
            <NavigationBar onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />

            <div style={{ display: "flex", height: "calc(100vh - 56px)", marginTop: "56px" }}>
                {/* ✅ Sidebar (Controlled by isSidebarOpen) */}
                <div
                    style={{
                        width: isSidebarOpen ? "250px" : "70px", // ✅ Adjust width when collapsed
                        transition: "width 0.3s ease-in-out",
                        backgroundColor: "#1c1c1c", // Match sidebar background
                        // color: "white",
                        // padding: "10px",
                        overflowX: "hidden",
                        height: "100%",
                        position: "fixed",
                        left: 0,
                        top: "56px", // Push below navbar
                        zIndex: 1000, // Ensure sidebar is above other content
                        borderRight: "1px solid #34495e", // Subtle border
                    }}
                >
                    <DashboardSidebar
                        userRole={userRole}
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    />
                </div>

                {/* ✅ Main Content Area (Push right when sidebar expands) */}
                <div
                    style={{
                        flexGrow: 1,
                        marginLeft: isSidebarOpen ? "250px" : "70px", // ✅ Adjust content area based on sidebar
                        padding: "20px",
                        overflowY: "auto",
                        transition: "margin-left 0.3s ease-in-out",
                        width: "100%",
                        backgroundColor: "#f8f9fa", // Light background for main content
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;