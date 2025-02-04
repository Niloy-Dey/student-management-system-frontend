import React, { useState } from 'react';
import { Form, Button, Container, Card, ListGroup, Row, Col } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaUpload } from 'react-icons/fa';

const MeetingAttendancePage = () => {
  const [meetings, setMeetings] = useState([
    { title: 'Team Meeting', date: '2024-11-22', attended: true },
    { title: 'Advisor Meeting', date: '2024-11-23', attended: false },
  ]);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    alert('File uploaded successfully!');
  };

  return (
    <Container className="py-5 mt-5 d-flex flex-column align-items-center">
      <h1 className="text-center mb-4 fw-bold text-primary">📅 Meeting Attendance</h1>
      <Row className="g-4 w-100 " style={{ maxWidth: '900px' }}>
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Header className="bg-gradient bg-primary text-white text-center fw-bold fs-5">
              📝 Meeting Schedule & Attendance
            </Card.Header>
            <Card.Body className="p-4">
              <ListGroup variant="flush">
                {meetings.map((meeting, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center p-3 border-0 bg-light rounded-3 my-2">
                    <div>
                      <strong className="text-dark">{meeting.title}</strong>
                      <br />
                      <small className="text-muted">{meeting.date}</small>
                    </div>
                    {meeting.attended ? (
                      <FaCheckCircle className="text-success" size={24} />
                    ) : (
                      <FaTimesCircle className="text-danger" size={24} />
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
            <Card.Header className="bg-gradient bg-success text-white text-center fw-bold fs-5">
              📤 Upload Meeting Notes/Recordings
            </Card.Header>
            <Card.Body className="p-4 text-center">
              <Form onSubmit={handleFileUpload}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-dark">Choose File</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} required className="text-center border-0 shadow-sm rounded-3" />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm fw-bold fs-5 py-2">
                  <FaUpload size={20} /> Upload File
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MeetingAttendancePage;
