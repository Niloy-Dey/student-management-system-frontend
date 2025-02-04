// src/pages/Dashboard/Admin/CourseManagement/Modals/DeleteCourseModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteCourseModal = ({ show, onClose, courseId, onCourseDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/courses/${courseId}`);
      onCourseDeleted(courseId);
      onClose();
    } catch (error) {
      console.error("Error deleting course", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this course?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCourseModal;
