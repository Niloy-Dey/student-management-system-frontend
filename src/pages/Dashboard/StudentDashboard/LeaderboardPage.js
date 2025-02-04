import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { FaTrophy, FaMedal } from 'react-icons/fa';

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [personalRank, setPersonalRank] = useState({
    name: 'John Doe',
    rank: 10,
    points: 2500,
  });

  useEffect(() => {
    setLeaderboardData([
      { rank: 1, name: 'Alice', points: 5000 },
      { rank: 2, name: 'Bob', points: 4500 },
      { rank: 3, name: 'Charlie', points: 4200 },
    ]);
  }, []);

  return (
    <Container className="py-5 mt-5 ">
      <h1 className="text-center mb-4 fw-bold text-primary">🏆 Leaderboard</h1>
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden text-center">
            <Card.Header className="bg-gradient bg-warning text-dark fw-bold fs-5">
              <FaMedal size={24} className="me-2" /> Personal Rank
            </Card.Header>
            <Card.Body className="p-4">
              <h4 className="fw-bold text-dark">{personalRank.name}</h4>
              <p className="fs-5 text-black">Rank: <span className="fw-bold text-primary">{personalRank.rank}</span></p>
              <p className="fs-5 text-black">Points: <span className="fw-bold text-success">{personalRank.points}</span></p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Header className="bg-gradient bg-success text-white text-center fw-bold fs-5">
              <FaTrophy size={24} className="me-2" /> Overall Leaderboard
            </Card.Header>
            <Card.Body className="p-4">
              <Table responsive striped bordered hover className="text-center shadow-sm rounded-3 overflow-hidden">
                <thead className="bg-dark text-white">
                  <tr>
                    <th>🏅 Rank</th>
                    <th>👤 Name</th>
                    <th>⭐ Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((student, index) => (
                    <tr key={index} className="fw-bold">
                      <td className="text-primary">{student.rank}</td>
                      <td className="text-dark">{student.name}</td>
                      <td className="text-success">{student.points}</td>
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
};

export default LeaderboardPage;
