// src/pages/Dashboard/AdvisorDashboard/StudentProgressPage.js
import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const StudentProgressPage = () => {
  return (
    <Container>
      <h2>Student Progress</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Student Progress Overview</Card.Header>
            <Card.Body>
              <p>Name: Student 1</p>
              <p>Problems Solved: 35</p>
              <p>Attendance: 90%</p>
              <p>Rank: 5th</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Performance Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Problem Submission: Completed 5 tasks last week</ListGroup.Item>
              <ListGroup.Item>Attendance: Missed 1 meeting</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentProgressPage;
