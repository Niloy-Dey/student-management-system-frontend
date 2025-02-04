// src/pages/StudentPages/ProblemSubmissionPage.js
import React, { useState } from "react";
import { Form, Button, Container, Card, ListGroup, Row, Col, Badge } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaPaperPlane } from "react-icons/fa";

const ProblemSubmissionPage = () => {
  const [formData, setFormData] = useState({
    problemTitle: "",
    problemSolution: "",
  });

  const [submissionHistory, setSubmissionHistory] = useState([
    { title: "Problem 1", date: "2024-11-20", status: "Submitted" },
    { title: "Problem 2", date: "2024-11-21", status: "Reviewed" },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Problem submitted successfully!");
  };

  return (
    <Container className="py-5 mt-5">
      <h2 className="text-center mb-4 fw-bold">🚀 Problem Submission</h2>
      <Row className="g-4">
        {/* Submission Form */}
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Header className="bg-primary text-white fw-bold text-center">
              Submit Problem Solution
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-black">Problem Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="problemTitle"
                    value={formData.problemTitle}
                    onChange={handleChange}
                    required
                    placeholder="Enter problem title"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-black">Solution</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="problemSolution"
                    value={formData.problemSolution}
                    onChange={handleChange}
                    required
                    placeholder="Describe your solution..."
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2">
                  <FaPaperPlane /> Submit Solution
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Submission History */}
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded-4 ">
            <Card.Header className="bg-dark text-white fw-bold text-center">
              Submission History
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {submissionHistory.map((submission, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{submission.title}</strong> <br />
                      <small className="text-muted">{submission.date}</small>
                    </div>
                    <Badge bg={submission.status === "Reviewed" ? "success" : "danger"} className="p-2">
                      {submission.status} {submission.status === "Reviewed" ? <FaCheckCircle /> : <FaTimesCircle />}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProblemSubmissionPage;
