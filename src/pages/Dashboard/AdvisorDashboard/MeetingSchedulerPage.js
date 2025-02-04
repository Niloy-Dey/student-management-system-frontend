// src/pages/Dashboard/AdvisorDashboard/MeetingSchedulerPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';

const MeetingSchedulerPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleScheduleMeeting = () => {
    // Logic to schedule a meeting
    setShowModal(false);
  };

  return (
    <Container>
      <h2>Meeting Scheduler</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Upcoming Meetings</Card.Header>
            <Card.Body>
              <p>Team A - 5th December, 10:00 AM</p>
              <p>Team B - 6th December, 2:00 PM</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Schedule New Meeting</Card.Header>
            <Card.Body>
              <Button variant="primary" onClick={handleShowModal}>
                Schedule Meeting
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal to Schedule Meeting */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Meeting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Meeting Date</Form.Label>
              <Form.Control type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Meeting Time</Form.Label>
              <Form.Control type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleScheduleMeeting}>
              Schedule
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MeetingSchedulerPage;
