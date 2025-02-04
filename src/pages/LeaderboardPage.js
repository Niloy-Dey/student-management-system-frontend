// src/pages/LeaderboardPage.js
import React from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';

const LeaderboardPage = () => {
  // Sample leaderboard data (replace this with actual data from your backend)
  const teamRankings = [
    { rank: 1, team: 'Team Alpha', score: 98 },
    { rank: 2, team: 'Team Beta', score: 92 },
    { rank: 3, team: 'Team Gamma', score: 89 },
  ];

  const individualRankings = [
    { rank: 1, name: 'John Doe', score: 95 },
    { rank: 2, name: 'Jane Smith', score: 90 },
    { rank: 3, name: 'Bob Johnson', score: 88 },
  ];

  return (
    <Container className="my-4">
      <h1 className="text-center">Leaderboard</h1>
      <p className="text-center">This page displays the leaderboard of teams and individual performance.</p>

      <Row>
        {/* Team Rankings */}
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Team Rankings</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {teamRankings.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.rank}</td>
                      <td>{entry.team}</td>
                      <td>{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Individual Rankings */}
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Individual Rankings</Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {individualRankings.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.rank}</td>
                      <td>{entry.name}</td>
                      <td>{entry.score}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LeaderboardPage;
