// src/pages/Dashboard/TeamLeader/UpcomingDeadlinesPage.js
import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const UpcomingDeadlinesPage = () => {
  const upcomingDeadlines = [
    { title: 'Weekly Report Submission', date: '2024-11-30' },
    { title: 'Team Meeting with Advisor', date: '2024-12-05' },
    { title: 'Project Deadline', date: '2024-12-10' },
  ];

  return (
    <Card>
      <Card.Header as="h5">Upcoming Deadlines</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {upcomingDeadlines.map((deadline, index) => (
            <ListGroup.Item key={index}>
              <strong>{deadline.title}</strong> - {deadline.date}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default UpcomingDeadlinesPage;
