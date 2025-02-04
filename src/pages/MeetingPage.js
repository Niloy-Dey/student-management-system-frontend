// src/pages/MeetingPage.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup } from 'react-bootstrap';

const MeetingPage = () => {
  const [meetings, setMeetings] = useState([]);

  // Simulating data fetching for meetings
  useEffect(() => {
    // Replace with an actual API call to fetch meetings
    const fetchedMeetings = [
      { id: 1, date: '2024-11-30', time: '10:00 AM', topic: 'Weekly Advisory' },
      { id: 2, date: '2024-12-02', time: '02:00 PM', topic: 'Team Sync' },
    ];
    setMeetings(fetchedMeetings);
  }, []);

  const handleScheduleMeeting = () => {
    // Function to handle meeting scheduling
    alert('Schedule a new meeting!');
  };

  return (
    <Container className="my-4">
      <h1 className="text-center">Meetings</h1>
      <Card>
        <Card.Header as="h5">Upcoming Meetings</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {meetings.map((meeting) => (
              <ListGroup.Item key={meeting.id}>
                <strong>{meeting.topic}</strong>
                <div>{meeting.date} at {meeting.time}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary" className="mt-3" onClick={handleScheduleMeeting}>
            Schedule New Meeting
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MeetingPage;
