// src/pages/Dashboard/AdvisorDashboard/AdvisorDashboardPage.js
import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const AdvisorDashboardPage = () => {
  return (
    <Container>
      <h2>Advisor Dashboard</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Assigned Teams</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Team 1</ListGroup.Item>
              <ListGroup.Item>Team 2</ListGroup.Item>
              <ListGroup.Item>Team 3</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Performance Stats</Card.Header>
            <Card.Body>
              <p>Overall Team Progress: 85%</p>
              <p>Upcoming Meetings: 3</p>
              <p>Pending Notifications: 1</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Notifications</Card.Header>
            <Card.Body>
              <p>Reminder: Upcoming team meeting tomorrow at 10 AM</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvisorDashboardPage;
