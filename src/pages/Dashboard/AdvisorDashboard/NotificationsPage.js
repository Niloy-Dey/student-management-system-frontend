// src/pages/Dashboard/AdvisorDashboard/NotificationsPage.js
import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';

const NotificationsPage = () => {
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleSendNotification = () => {
    // Logic to send notification
    console.log('Notification Sent:', notificationMessage);
    setNotificationMessage('');
  };

  return (
    <Container>
      <h2>Send Notifications</h2>
      <Card>
        <Card.Header>Send Team-wide Notification</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>Notification Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSendNotification}>
              Send Notification
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NotificationsPage;
