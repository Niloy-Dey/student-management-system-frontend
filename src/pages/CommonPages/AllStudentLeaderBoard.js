import React from 'react';
import { Table, Container, Row, Col, Badge } from 'react-bootstrap';

const AllStudentLeaderBoard = () => {
    const students = [
        { id: 1, name: 'John Doe', score: 95 },
        { id: 2, name: 'Jane Smith', score: 90 },
        { id: 3, name: 'Alice Johnson', score: 85 },
        { id: 4, name: 'Bob Brown', score: 80 },
        { id: 5, name: 'Charlie Davis', score: 75 },
    ];

    return (
        <Container style={{ maxWidth: "1400px" }} className="mt-5 pt-5">
            <Row>
                <Col>
                    <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
                        Student Leaderboard
                    </h1>
                    <Table striped bordered hover responsive className="shadow-lg">
                        <thead>
                            <tr style={{ backgroundColor: '#3498db', color: '#fff' }}>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={student.id} style={{ transition: 'background-color 0.3s' }}>
                                    <td style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        {index + 1}
                                        {index === 0 && <Badge bg="warning" className="ms-2" style={{ backgroundColor: '#ffd700', color: '#000' }}>Gold</Badge>}
                                        {index === 1 && <Badge bg="secondary" className="ms-2" style={{ backgroundColor: '#c0c0c0', color: '#000' }}>Silver</Badge>}
                                        {index === 2 && <Badge bg="bronze" className="ms-2" style={{ backgroundColor: '#cd7f32', color: '#000' }}>Bronze</Badge>}
                                    </td>
                                    <td style={{ fontSize: '1.1rem' }}>{student.name}</td>
                                    <td style={{ fontSize: '1.1rem' }}>{student.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default AllStudentLeaderBoard;