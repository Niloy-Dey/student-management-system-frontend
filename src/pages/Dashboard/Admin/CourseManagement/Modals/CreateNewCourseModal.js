import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CreateNewCourseModal = ({ show, onClose, onCourseCreated }) => {
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/courses/create', courseData);
      onCourseCreated(response.data); // Notify parent of new course
      onClose(); // Close the modal after successful creation
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="courseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter course name"
              name="name"
              value={courseData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="courseDescription">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter course description"
              name="description"
              value={courseData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Course
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewCourseModal;
