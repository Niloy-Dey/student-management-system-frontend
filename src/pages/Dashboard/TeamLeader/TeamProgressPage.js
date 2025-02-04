
// src/pages/TeamLeaderPages/TeamProgressPage.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const TeamProgressPage = () => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', progress: 80, rank: 2 },
    { id: 2, name: 'Jane Smith', progress: 75, rank: 3 },
    { id: 3, name: 'Alice Johnson', progress: 90, rank: 1 },
  ]);

  const handleSubmitSummary = () => {
    alert('Weekly summary submitted to the advisor.');
  };

  useEffect(() => {
    // Simulate fetching team member progress
    setTeamMembers([
      { id: 1, name: 'John Doe', progress: 80, rank: 2 },
      { id: 2, name: 'Jane Smith', progress: 75, rank: 3 },
      { id: 3, name: 'Alice Johnson', progress: 90, rank: 1 },
    ]);
  }, []);

  return (
    <Container>
      <h1>Team Progress</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Progress (%)</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.progress}%</td>
              <td>{member.rank}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSubmitSummary}>
        Submit Weekly Summary
      </Button>
    </Container>
  );
};

export default TeamProgressPage;
