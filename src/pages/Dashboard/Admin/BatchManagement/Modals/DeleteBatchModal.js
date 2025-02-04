// src/pages/Dashboard/Admin/BatchManagement/DeleteBatchModal.js
import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

const DeleteBatchModal = ({ show, onClose, batchId, onBatchDeleted }) => {
  const handleDelete = () => {
    // API request to delete the batch
    axios.delete(`http://localhost:5000/api/admin/batches/${batchId}`)
      .then(() => {
        onBatchDeleted(batchId); // Notify parent to remove the batch
        onClose(); // Close the modal
      })
      .catch(error => {
        console.error("Error deleting batch", error);
      });
  };

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      centered // Bootstrap class to center the modal vertically
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Batch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this batch?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBatchModal;
