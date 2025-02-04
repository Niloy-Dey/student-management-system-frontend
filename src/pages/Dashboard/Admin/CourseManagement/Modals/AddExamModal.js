import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddExamModal = ({ show, setShow, weekId, moduleId }) => {
  const [examTitle, setExamTitle] = useState('');
  const [examType, setExamType] = useState('');
  const [examDate, setExamDate] = useState('');
  const [duration, setDuration] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newExam = {
      examTitle,
      examType,
      examDate,
      duration,
      weight,
    };

    try {
      // Send POST request to backend to add the exam to the module
      const response = await axios.post(`/api/admin/weeks/${weekId}/modules/${moduleId}/exams`, newExam);
      console.log('Exam added:', response.data);
      setShow(false); // Close the modal on success
    } catch (error) {
      console.error('Error adding exam:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Exam</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="examTitle">
            <Form.Label>Exam Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exam title"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="examType">
            <Form.Label>Exam Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exam type (e.g., Midterm, Final)"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="examDate">
            <Form.Label>Exam Date</Form.Label>
            <Form.Control
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="duration">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="weight">
            <Form.Label>Weight (in percentage)</Form.Label>
            <Form.Control
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Exam'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExamModal;
