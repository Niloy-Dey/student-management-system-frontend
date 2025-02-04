// src/pages/TeamLeaderPages/TeamLeaderDashboardPage.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const TeamLeaderDashboardPage = () => {
  const [teamPerformance, setTeamPerformance] = useState({
    overallProgress: 85,
    completedTasks: 15,
    pendingTasks: 5,
  });

  const [deadlines, setDeadlines] = useState([
    { id: 1, task: 'Weekly Summary Submission', dueDate: '2024-12-01' },
    { id: 2, task: 'Team Meeting Preparation', dueDate: '2024-12-05' },
  ]);

  useEffect(() => {
    // Simulate fetching team performance and deadlines
    setTeamPerformance({
      overallProgress: 85,
      completedTasks: 15,
      pendingTasks: 5,
    });

    setDeadlines([
      { id: 1, task: 'Weekly Summary Submission', dueDate: '2024-12-01' },
      { id: 2, task: 'Team Meeting Preparation', dueDate: '2024-12-05' },
    ]);
  }, []);

  return (
    <Container>
      <h1>Team Leader Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Team Performance Overview</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>Overall Progress: {teamPerformance.overallProgress}%</ListGroup.Item>
                <ListGroup.Item>Completed Tasks: {teamPerformance.completedTasks}</ListGroup.Item>
                <ListGroup.Item>Pending Tasks: {teamPerformance.pendingTasks}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Upcoming Deadlines</Card.Header>
            <Card.Body>
              <ul>
                {deadlines.map((deadline) => (
                  <li key={deadline.id}>
                    {deadline.task} - Due: {deadline.dueDate}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TeamLeaderDashboardPage;