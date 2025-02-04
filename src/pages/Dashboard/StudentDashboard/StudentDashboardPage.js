// src/pages/Dashboard/StudentDashboard/StudentDashboardPage.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaTasks, FaCalendarAlt } from 'react-icons/fa';

const StudentDashboardPage = () => {
  return (
    <Container  className="py-5 mt-5">
      <h2 className="text-center mb-4 fw-bold">📚 Student Dashboard</h2>
      
      <Row className="g-4">
        {/* Recent Progress */}
        <Col md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded-4 bg-primary text-white">
            <Card.Body className="text-center">
              <FaTasks size={50} className="mb-3" />
              <Card.Title className="fw-bold">Recent Progress</Card.Title>
              <p className="mb-2">✅ Last task solved: <strong>Problem #23</strong></p>
              <p>📊 Progress: <strong>75%</strong></p>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Meetings */}
        <Col md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded-4 bg-danger text-white">
            <Card.Body className="text-center">
              <FaCalendarAlt size={50} className="mb-3" />
              <Card.Title className="fw-bold">Upcoming Meetings</Card.Title>
              <p>📅 Team Meeting: <strong>Tomorrow at 10 AM</strong></p>
              <p>📝 Advisor Meeting: <strong>Next Monday at 3 PM</strong></p>
            </Card.Body>
          </Card>
        </Col>

        {/* Additional Section (For Future Features) */}
        <Col md={6} lg={4}>
          <Card className="shadow-lg border-0 rounded-4 bg-success text-white">
            <Card.Body className="text-center">
              <FaTasks size={50} className="mb-3" />
              <Card.Title className="fw-bold">Achievements</Card.Title>
              <p>🏆 5 Tasks Completed This Week!</p>
              <p>🔥 Streak: 3 Days</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboardPage;
