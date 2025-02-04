import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './css/AdvisorDashboardLayout.css'; // Shared styles for all dashboards

const AdvisorDashboardLayout = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <div className="dashboard-sidebar">
        <ul className="dashboard-sidebar-nav">
          <li><Link to="/advisor-dashboard">Overview</Link></li>
          <li><Link to="/advisor-dashboard/team-management">Team Management</Link></li>
          <li><Link to="/advisor-dashboard/student-progress">Student Progress</Link></li>
          <li><Link to="/advisor-dashboard/meeting-scheduler">Meeting Scheduler</Link></li>
          <li><Link to="/advisor-dashboard/notifications">Notifications</Link></li>
        </ul>
      </div>

      {/* Main Content Section */}
      <div className="dashboard-main-content">
        <Container className="mt-4">
          <Outlet /> {/* Placeholder for nested routes */}
        </Container>
      </div>
    </div>
  );
};

export default AdvisorDashboardLayout;
