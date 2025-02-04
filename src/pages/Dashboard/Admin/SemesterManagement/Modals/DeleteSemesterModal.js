import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const DeleteSemesterModal = ({ show, onClose, semesterId, onSemesterDeleted }) => {
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/admin/semesters/${semesterId}`)
      .then(response => {
        if (response.data.success) {
          onSemesterDeleted(semesterId);
          onClose(); // Close modal after successful delete
        } else {
          alert('Failed to delete semester');
        }
      })
      .catch(error => {
        console.error("Error deleting semester:", error);
        alert('Error deleting semester. Please try again.');
      });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Semester</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this semester? This action cannot be undone.</p>
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

export default DeleteSemesterModal;
