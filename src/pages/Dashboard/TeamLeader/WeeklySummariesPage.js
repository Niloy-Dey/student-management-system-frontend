// src/pages/Dashboard/TeamLeader/WeeklySummariesPage.js
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const WeeklySummariesPage = () => {
  const [summary, setSummary] = useState('');

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleSubmit = () => {
    // Logic to submit the summary (e.g., API call)
    console.log('Weekly summary submitted:', summary);
    setSummary('');
  };

  return (
    <Card>
      <Card.Header as="h5">Submit Weekly Summary</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group controlId="weeklySummary">
            <Form.Label>Enter Weekly Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={summary}
              onChange={handleChange}
              placeholder="Write your weekly summary here..."
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit} className="mt-3">
            Submit Summary
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default WeeklySummariesPage;
