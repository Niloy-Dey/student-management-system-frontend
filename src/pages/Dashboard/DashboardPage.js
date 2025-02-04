// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ProgressBar } from 'react-bootstrap';
import DashboardSidebar from '../../components/DashboardSidebar';  // Import the Sidebar

const DashboardPage = () => {
  const [overview, setOverview] = useState({});

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchedOverview = {
      totalStudents: 120,
      totalTeams: 20,
      problemsSolved: 3500,
      meetingsHeld: 90,
    };
    setOverview(fetchedOverview);
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center">Dashboard</h1>
      <Row>
        {/* Sidebar on the left side */}
        <Col md={3}>
          <DashboardSidebar /> {/* Add Sidebar */}
        </Col>

        {/* Main content on the right side */}
        <Col md={9}>
          <Row>
            {/* Overview Card */}
            <Col md={6}>
              <Card>
                <Card.Header as="h5">Overview</Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Total Students: {overview.totalStudents}</ListGroup.Item>
                    <ListGroup.Item>Total Teams: {overview.totalTeams}</ListGroup.Item>
                    <ListGroup.Item>Problems Solved: {overview.problemsSolved}</ListGroup.Item>
                    <ListGroup.Item>Meetings Held: {overview.meetingsHeld}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            {/* Progress Overview Card */}
            <Col md={6}>
              <Card>
                <Card.Header as="h5">Progress Overview</Card.Header>
                <Card.Body>
                  <ProgressBar now={(overview.problemsSolved / 5000) * 100} label={`${overview.problemsSolved}/5000`} />
                  <ProgressBar now={(overview.meetingsHeld / 100) * 100} label={`${overview.meetingsHeld}/100`} className="mt-2" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
