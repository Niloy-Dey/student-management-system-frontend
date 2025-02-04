// src/pages/ProgressPage.js
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, ProgressBar } from 'react-bootstrap';

const ProgressPage = () => {
  const [progress, setProgress] = useState([]);

  // Simulating data fetching for student progress
  useEffect(() => {
    // Replace with an actual API call to fetch progress
    const fetchedProgress = [
      { student: 'John Doe', problemsSolved: 30, meetingsAttended: 4 },
      { student: 'Jane Smith', problemsSolved: 28, meetingsAttended: 3 },
    ];
    setProgress(fetchedProgress);
  }, []);

  return (
    <Container className="my-4">
      <h1 className="text-center">Student Progress</h1>
      <Card>
        <Card.Header as="h5">Progress Overview</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {progress.map((entry, index) => (
              <ListGroup.Item key={index}>
                <h5>{entry.student}</h5>
                <p>Problems Solved: {entry.problemsSolved}</p>
                <p>Meetings Attended: {entry.meetingsAttended}</p>
                <ProgressBar now={(entry.problemsSolved / 50) * 100} label={`${entry.problemsSolved}/50`} />
                <ProgressBar now={(entry.meetingsAttended / 5) * 100} label={`${entry.meetingsAttended}/5`} className="mt-2" />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProgressPage;
