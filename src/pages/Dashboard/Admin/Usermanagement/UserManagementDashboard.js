import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaUserShield, FaUserGraduate, FaChalkboardTeacher, FaUserCheck } from 'react-icons/fa';

const UserManagementDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalStudents: 0,
    totalInstructors: 0,
    totalActiveUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/user-stats');
        setStats(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user statistics.');
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'primary' },
    { title: 'Total Admins', value: stats.totalAdmins, icon: <FaUserShield />, color: 'danger' },
    { title: 'Total Students', value: stats.totalStudents, icon: <FaUserGraduate />, color: 'success' },
    { title: 'Total Instructors', value: stats.totalInstructors, icon: <FaChalkboardTeacher />, color: 'warning' },
    { title: 'Active Users', value: stats.totalActiveUsers, icon: <FaUserCheck />, color: 'info' },
  ];

  return (
    <Container style={{ maxWidth: "1400px" }} className="mt-5 py-5">
      <h1 className="text-center mb-4">User Management Dashboard</h1>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">{error}</Alert>
      ) : (
        <>
          <Row>
            {statCards.map((stat, index) => (
              <Col md={4} sm={6} xs={12} key={index} className="mb-4">
                <Card className={`shadow-sm border-${stat.color} text-center`}>
                  <Card.Body>
                    <div className={`text-${stat.color} display-4 mb-2`}>{stat.icon}</div>
                    <Card.Title className="fw-bold text-black">{stat.title}</Card.Title>
                    <Card.Text className="fs-4 fw-semibold text-black">{stat.value}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col md={6} className="mb-3">
              <Link to="/admin/user-management/create-user">
                <Button variant="primary" className="w-100 py-2 fw-bold shadow">
                  + Create New User
                </Button>
              </Link>
            </Col>
            <Col md={6} className="mb-3">
              <Link to="/admin/user-management/user-list">
                <Button variant="secondary" className="w-100 py-2 fw-bold shadow">
                  🔍 View All Users
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default UserManagementDashboard;
