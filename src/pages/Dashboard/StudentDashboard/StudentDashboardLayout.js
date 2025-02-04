// src/pages/Dashboard/StudentDashboard/StudentDashboardLayout.js
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './css/StudentDashboardLayout.css'; // Shared styles for student dashboard

const StudentDashboardLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <div className="dashboard-sidebar pt-5">
        <ul className="dashboard-sidebar-nav ">
          <li ><Link to="/student-dashboard">Dashboard</Link></li>
          <li ><Link to="/student-dashboard/problem-submission">Problem Submission</Link></li>
          <li ><Link to="/student-dashboard/meeting-attendance">Meeting Attendance</Link></li>
          <li ><Link to="/student-dashboard/leaderboard">Leaderboard</Link></li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="dashboard-main-content">
        <Container className="mt-4 ">
          <Outlet /> {/* Placeholder for nested routes */}
        </Container>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
