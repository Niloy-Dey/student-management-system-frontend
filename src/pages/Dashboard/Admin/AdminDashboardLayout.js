import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './css/AdminDashboardLayout.css'; // Custom styles for the admin layout
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaUserEdit,
  FaListAlt,
  FaBriefcase,
  FaBook,
  FaBell,
  FaChartLine,
  FaTrashAlt,
  FaUserCircle,
  FaPlusCircle
} from 'react-icons/fa';

const AdminDashboardLayout = () => {
  const location = useLocation();
  const [isStudentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isBatchDropdownOpen, setBatchDropdownOpen] = useState(false);

  const toggleBatchDropdown = () => {
    setBatchDropdownOpen(!isBatchDropdownOpen);
  };
  
  const toggleStudentDropdown = () => {
    setStudentDropdownOpen(!isStudentDropdownOpen);
  };

  const toggleUserDropdownOpen = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-dashboard-container d-flex">
      {/* Sidebar Section */}
      <div className="admin-dashboard-sidebar flex-column p-3">
        <h5 className="mt-4 text-white">Admin Dashboard</h5>
        <ul className="dashboard-sidebar-nav">
          <li>
            <Link
              to="/admin/dashboard"
              className={`mb-2 ${isActive('/admin/dashboard') ? 'active-link' : ''}`}
            >
              <FaTachometerAlt /> Dashboard Overview
            </Link>
          </li>
          {/* <li>
            <Link
              to="/admin/user-management/assign-role"
              className={`mb-2 ${isActive('/admin/user-management/assign-role') ? 'active-link' : ''}`}
            >
              <FaUserEdit /> Role Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/user-management/"
              className={`mb-2 ${isActive('/admin/user-management/edit-user/:userId') ? 'active-link' : ''}`}
            >
              <FaUserEdit /> Admin User Management
            </Link>
          </li> */}
          {/* <li>
            <Link
              to="/admin/batch-management"
              className={`mb-2 ${isActive('/admin/batch-management') ? 'active-link' : ''}`}
            >
              <FaClipboardList /> Batch Management
            </Link>
          </li> */}
          <li>
            <Link
              to="/admin/mission-management"
              className={`mb-2 ${isActive('/admin/mission-management') ? 'active-link' : ''}`}
            >
              <FaListAlt /> Mission Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/batch-management"
              className={`mb-2 ${isActive('/admin/batch-management') ? 'active-link' : ''}`}
            >
              <FaListAlt /> Batch Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/semester-management"
              className={`mb-2 ${isActive('/admin/semester-management') ? 'active-link' : ''}`}
            >
              <FaListAlt /> Semester Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/course-management"
              className={`mb-2 ${isActive('/admin/course-management') ? 'active-link' : ''}`}
            >
              <FaListAlt /> Course Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/assignment-management"
              className={`mb-2 ${isActive('/admin/assignment-management') ? 'active-link' : ''}`}
            >
              <FaBriefcase /> Assignment Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/notification-management"
              className={`mb-2 ${isActive('/admin/notification-management') ? 'active-link' : ''}`}
            >
              <FaBell /> Notification Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin/reporting"
              className={`mb-2 ${isActive('/admin/reporting') ? 'active-link' : ''}`}
            >
              <FaChartLine /> Reporting
            </Link>
          </li>
        </ul>

        {/* User Management Dropdown */}
        <ul className="dashboard-sidebar-nav">
          <li className={`dropdown ${isUserDropdownOpen ? 'open' : ''}`}>
            <Link
              to="#"
              className={`dropdown-toggle mb-2 ${isUserDropdownOpen ? 'active-link' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                toggleUserDropdownOpen();
              }}
            >
              <FaUsers /> User Management
            </Link>
            {isUserDropdownOpen && (
              <ul className="dropdown-list">
                <li>
                  <Link
                    to="/admin/user-management/"
                    className={`mb-2 ${isActive('/admin/user-management/') ? 'active-link' : ''}`}
                  >
                    <FaPlusCircle /> User Dashboard
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/admin/user-management/create-user"
                    className={`mb-2 ${isActive('/admin/user-management/create-user') ? 'active-link' : ''}`}
                  >
                    <FaPlusCircle /> Create User
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/user-management/edit-user"
                    className={`mb-2 ${isActive('/admin/user-management/edit-user') ? 'active-link' : ''}`}
                  >
                    <FaUserEdit /> Edit User
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/user-management/assign-role"
                    className={`mb-2 ${isActive('/admin/user-management/assign-role') ? 'active-link' : ''}`}
                  >
                    <FaUserEdit /> Assign Role
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/admin/user-management/user-list"
                    className={`mb-2 ${isActive('/admin/user-management/user-list') ? 'active-link' : ''}`}
                  >
                    <FaUserEdit /> User List
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/admin/user-management/delete-user"
                    className={`mb-2 ${isActive('/admin/user-management/delete-user') ? 'active-link' : ''}`}
                  >
                    <FaTrashAlt /> Delete User
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    to="/admin/user-management/user-profile"
                    className={`mb-2 ${isActive('/admin/user-management/user-profile') ? 'active-link' : ''}`}
                  >
                    <FaUserCircle /> User Profile
                  </Link>
                </li> */}
              </ul>
            )}
          </li>
        </ul>
        <ul className="dashboard-sidebar-nav">
          <li className={`dropdown ${isBatchDropdownOpen ? 'open' : ''}`}>
            <Link
              to="#"
              className={`dropdown-toggle mb-2 ${isBatchDropdownOpen ? 'active-link' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                toggleBatchDropdown(); // Define this function for toggling the dropdown
              }}
            >
              <FaClipboardList /> Batch Management
            </Link>
            {isBatchDropdownOpen && (
              <ul className="dropdown-list">
                <li>
                  <Link
                    to="/admin/batch-management"
                    className={`mb-2 ${isActive('/admin/batch-management') ? 'active-link' : ''}`}
                  >
                    <FaListAlt /> Batch Overview
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/admin/batch-management/create"
                    className={`mb-2 ${isActive('/admin/batch-management/create') ? 'active-link' : ''}`}
                  >
                    <FaPlusCircle /> Create Batch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/batch-management/edit/:batchId"
                    className={`mb-2 ${isActive('/admin/batch-management/edit/:batchId') ? 'active-link' : ''}`}
                  >
                    <FaUserEdit /> Edit Batch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/batch-management/view/:batchId"
                    className={`mb-2 ${isActive('/admin/batch-management/view/:batchId') ? 'active-link' : ''}`}
                  >
                    <FaBook /> View Batch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/batch-management/delete/:batchId"
                    className={`mb-2 ${isActive('/admin/batch-management/delete/:batchId') ? 'active-link' : ''}`}
                  >
                    <FaTrashAlt /> Delete Batch
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/batch-management/assign-teams"
                    className={`mb-2 ${isActive('/admin/batch-management/assign-teams') ? 'active-link' : ''}`}
                  >
                    <FaBriefcase /> Assign Teams
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/batch-management/students/:batchId"
                    className={`mb-2 ${isActive('/admin/batch-management/students/:batchId') ? 'active-link' : ''}`}
                  >
                    <FaUsers /> Batch Students
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/batch-management/team-assignments/:batchId"
                    className={`mb-2 ${isActive('/admin/batch-management/team-assignments/:batchId') ? 'active-link' : ''}`}
                  >
                    <FaClipboardList /> Team Assignments
                  </Link>
                </li> */}
              </ul>
            )}
          </li>
        </ul>

        {/* Student Management Dropdown */}
        <ul className="dashboard-sidebar-nav">
          <li className={`dropdown ${isStudentDropdownOpen ? 'open' : ''}`}>
            <Link
              to="#"
              className={`dropdown-toggle mb-2 ${isStudentDropdownOpen ? 'active-link' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                toggleStudentDropdown();
              }}
            >
              <FaUsers /> Student Management
            </Link>
            {isStudentDropdownOpen && (
              <ul className="dropdown-list">
                <li>
                  <Link
                    to="/admin/student-management/student-list"
                    className={`mb-2 ${isActive('/admin/student-management/student-list') ? 'active-link' : ''}`}
                  >
                    <FaUsers /> Student List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/student-management/add-edit-student"
                    className={`mb-2 ${isActive('/admin/student-management/add-edit-student') ? 'active-link' : ''}`}
                  >
                    <FaUserEdit /> Add/Edit Student
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/student-management/add-student"
                    className={`mb-2 ${isActive('/admin/student-management/add-student') ? 'active-link' : ''}`}
                  >
                    <FaUserEdit /> Add Student
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/student-management/student-profile"
                    className={`mb-2 ${isActive('/admin/student-management/student-profile') ? 'active-link' : ''}`}
                  >
                    <FaUsers /> Student Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/student-management/batch-team-assignment"
                    className={`mb-2 ${isActive('/admin/student-management/batch-team-assignment') ? 'active-link' : ''}`}
                  >
                    <FaBriefcase /> Batch & Team Assignment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/student-management/student-progress"
                    className={`mb-2 ${isActive('/admin/student-management/student-progress') ? 'active-link' : ''}`}
                  >
                    <FaChartLine /> Student Progress
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/student-management/leaderboard"
                    className={`mb-2 ${isActive('/admin/student-management/leaderboard') ? 'active-link' : ''}`}
                  >
                    <FaChartLine /> Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/student-management/notifications"
                    className={`mb-2 ${isActive('/admin/student-management/notifications') ? 'active-link' : ''}`}
                  >
                    <FaBell /> Notifications
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="dashboard-main-content">
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
