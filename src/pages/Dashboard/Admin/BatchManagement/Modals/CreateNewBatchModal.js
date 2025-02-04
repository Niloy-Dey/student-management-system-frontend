import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap components

const CreateNewBatchModal = ({ show, onClose, onBatchCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    semesterNames: [], // Multiple semester names to be selected
    startDate: '',
    endDate: ''
  });
  const [semesters, setSemesters] = useState([]); // To store the fetched semesters
  const [errorMessage, setErrorMessage] = useState(''); // For displaying error messages

  // Fetch the list of available semesters when the modal is shown
  useEffect(() => {
    if (show) {
      axios.get('http://localhost:5000/api/admin/semesters') // Assume an endpoint to get semesters
        .then(response => {
          if (response.data.success) {
            setSemesters(response.data.data); // Set semesters if response is successful
          } else {
            setErrorMessage('Failed to fetch semesters');
          }
        })
        .catch(error => {
          console.error('Error fetching semesters:', error);
          setErrorMessage('Error fetching semesters');
        });
    }
  }, [show]);

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If it's the semesterNames, update it as an array (multiple selections)
    if (name === 'semesterNames') {
      const selectedSemesters = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({
        ...formData,
        [name]: selectedSemesters
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate only the batch name before submitting
    if (!formData.name) {
      setErrorMessage('Please enter a batch name');
      return;
    }

    // Prepare the data to send to the server
    const batchData = {
      name: formData.name,
      startDate: formData.startDate || undefined, // If startDate is not provided, send undefined
      endDate: formData.endDate || undefined,     // If endDate is not provided, send undefined
      students: [],                               // Assuming no students in the batch initially
      advisors: [],                               // Assuming no advisors in the batch initially
      leader: undefined,                          // Assuming no leader by default
      semesterNames: formData.semesterNames       // Include the selected semesters
    };

    // Log the batchData to ensure it's correct
    console.log('Batch data being sent:', batchData);

    // Send a POST request to create the batch
    axios.post('http://localhost:5000/api/admin/batches/create', batchData)
      .then(response => {
        console.log('Response from backend:', response.data);  // Log the response to check its structure
        if (response.data && response.data.message === 'Batch created successfully') {
          onBatchCreated(response.data.batch); // Notify the parent component to update the batch list
          onClose(); // Close the modal
          setErrorMessage(''); // Clear error message on success
        } else {
          setErrorMessage('Failed to create batch: ' + (response.data.message || 'Unknown error'));
        }
      })
      .catch(error => {
        console.error('Error creating batch:', error.response || error);
        // Check if the error has a response and display it, else show a generic message
        setErrorMessage(error.response ? error.response.data.message : 'Error creating batch. Please try again.');
      });
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Batch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display error message if there is one */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="batchName">
            <Form.Label>Batch Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required // Batch name is required
            />
          </Form.Group>

          {/* Multi-select dropdown for Semester Names */}
          <Form.Group controlId="semesterNames">
            <Form.Label>Semester Names</Form.Label>
            <Form.Control
              as="select"
              name="semesterNames"
              multiple
              value={formData.semesterNames}
              onChange={handleInputChange}
            >
              {semesters.length > 0 ? (
                semesters.map((semester) => (
                  <option key={semester._id} value={semester.name}>
                    {semester.name}
                  </option>
                ))
              ) : (
                <option value="">No Semesters Available</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create Batch
          </Button>
          <Button variant="secondary" onClick={onClose} className="ml-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewBatchModal;
