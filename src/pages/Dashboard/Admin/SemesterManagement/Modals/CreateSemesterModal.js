import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap'; // Import Bootstrap components

const CreateSemesterModal = ({ show, onClose, onSemesterCreated }) => {
  const [formData, setFormData] = useState({
    semesterName: '',
    description: '',
    startDate: '', // Optional field
    endDate: '',   // Optional field
    batchId: '',   // Optional field
  });
  const [batches, setBatches] = useState([]); // State to hold batches
  const [loading, setLoading] = useState(true); // Loading state for fetching batches
  const [error, setError] = useState(null); // Error state for batch fetching

  // Fetch available batches when the modal is opened
  useEffect(() => {
    if (show) {
      setLoading(true);
      axios.get('http://localhost:5000/api/admin/batches') // API to fetch batches
        .then(response => {
          setBatches(response.data.data); // Assuming the response has a "data" property
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching batches:", error);
          setError("Failed to load batches.");
          setLoading(false);
        });
    }
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Only semesterName and description are required for creation
    const { semesterName, description, startDate, endDate, batchId } = formData;

    axios.post('http://localhost:5000/api/admin/semesters/create', {
      semesterName,
      description,
      startDate: startDate || null, // Optional
      endDate: endDate || null,     // Optional
      batchId: batchId || null,     // Optional
    })
      .then(response => {
        if (response.data.success) {
          onSemesterCreated(response.data.data); // Callback to parent on success
          onClose(); // Close modal after successful creation
        } else {
          alert('Failed to create semester');
        }
      })
      .catch(error => {
        console.error("Error creating semester:", error);
        alert('Error creating semester. Please try again.');
      });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Semester</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Show error if fetching batches failed */}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="semesterName">
            <Form.Label>Semester Name</Form.Label>
            <Form.Control
              type="text"
              name="semesterName"
              value={formData.semesterName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date (Optional)</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date (Optional)</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="batchId">
            <Form.Label>Batch (Optional)</Form.Label>
            <Form.Control
              as="select"
              name="batchId"
              value={formData.batchId}
              onChange={handleInputChange}
            >
              {/* Show loading message until batches are fetched */}
              {loading ? (
                <option>Loading batches...</option>
              ) : (
                <>
                  <option value="">Select a Batch</option>
                  {batches.length > 0 ? (
                    batches.map(batch => (
                      <option key={batch._id} value={batch._id}>
                        {batch.name}
                      </option>
                    ))
                  ) : (
                    <option>No batches available</option>
                  )}
                </>
              )}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">Create Semester</Button>
          <Button variant="secondary" onClick={onClose} className="ml-2">Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSemesterModal;
