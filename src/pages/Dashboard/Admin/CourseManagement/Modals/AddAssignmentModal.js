import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddAssignmentModal = ({ show, setShow, module, courseId }) => {
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentDueDate, setAssignmentDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newAssignment = {
      title: assignmentTitle,
      description: assignmentDescription,
      dueDate: assignmentDueDate,
      moduleId: module._id, // Use the selected module ID
      courseId: courseId, // Use the course ID
    };

    try {
      // Send POST request to backend to create the assignment
      await axios.post(`/api/admin/courses/${courseId}/modules/${module._id}/assignments`, newAssignment);
      setShow(false); // Close the modal on success
    } catch (error) {
      console.error('Error adding assignment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="assignmentTitle">
            <Form.Label>Assignment Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter assignment title"
              value={assignmentTitle}
              onChange={(e) => setAssignmentTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="assignmentDescription">
            <Form.Label>Assignment Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter assignment description"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="assignmentDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={assignmentDueDate}
              onChange={(e) => setAssignmentDueDate(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Add Assignment'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAssignmentModal;
