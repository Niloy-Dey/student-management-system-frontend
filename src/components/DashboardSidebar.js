import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faClipboardList,
    faCalendarCheck,
    faUsers,
    faCogs,
    faSignOutAlt,
    faChartLine,
    faChalkboardTeacher,
    faUserGraduate,
    faTasks,
    faBell,
    faUserCog,
    faBook,
    faLayerGroup,
    faUniversity,
    faUserPlus,
    faTrash,
    faUserEdit,
    faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import dashboardConfig from "../config/dashboardConfig.json";

const DashboardSidebar = ({ userRole, isSidebarOpen }) => {
    const location = useLocation();
    const menuItems = dashboardConfig[userRole]?.menuItems || [];

    // Mapping icons to menu items
    const iconMap = {
        "Dashboard": faTachometerAlt,
        "Problem Submission": faClipboardList,
        "Meeting Attendance": faCalendarCheck,
        "Leaderboard": faChartLine,
        "Team Progress": faTasks,
        "Upcoming Deadlines": faClipboardList,
        "Weekly Summaries": faClipboardList,
        "Team Management": faUsers,
        "Student Progress": faUserGraduate,
        "Meeting Scheduler": faChalkboardTeacher,
        "Notifications": faBell,
        "User Management": faUserCog,
        "User List": faUsers,
        "Edit User": faUserEdit,
        "Assign Role": faUserShield,
        "Delete User": faTrash,
        "Batch Management": faLayerGroup,
        "Semester Management": faUniversity,
        "Course Management": faBook,
        "Course Details": faBook,
        "Student Management": faUsers,
        "Student List": faUserGraduate,
        "Add Student": faUserPlus,
        "Student Profile": faUserGraduate,
        "System Settings": faCogs,
        "Logout": faSignOutAlt,
    };

    return (
        <div
            className={`d-flex  flex-column mt-4 pt-4 p-3 bg-dark text-white sidebar ${isSidebarOpen ? "expanded" : "collapsed"} overflow-auto`}
            style={{
                height: "100vh",
                width: isSidebarOpen ? "260px" : "80px",
                transition: "width 0.3s ease-in-out",
                borderRight: "2px solid #444",
                boxShadow: "2px 0px 10px rgba(0,0,0,0.6)",
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: "1000",
            }}
        >
            {/* Sidebar Menu */}
            <ListGroup className="mt-5 pt-5" variant="flush">
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <ListGroup.Item
                            key={item.path}
                            active={location.pathname === item.path}
                            className="border-0 d-flex align-items-center"
                            style={{
                                backgroundColor: location.pathname === item.path ? "#0d6efd" : "transparent",
                                color: location.pathname === item.path ? "white" : "#bbb",
                                fontSize: "16px",
                                fontWeight: "500",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                transition: "background 0.3s ease, transform 0.2s",
                                padding: "12px",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <Link
                                to={item.path}
                                className="d-flex align-items-center text-decoration-none w-100"
                                style={{
                                    color: location.pathname === item.path ? "white" : "#ccc",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={iconMap[item.label] || faCogs}
                                    className="me-3"
                                    style={{ fontSize: "20px" }}
                                />
                                {isSidebarOpen && item.label}
                            </Link>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="text-center bg-dark text-white border-0">
                        No items available
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
};

export default DashboardSidebar;
