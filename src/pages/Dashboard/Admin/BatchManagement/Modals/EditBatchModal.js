import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EditBatchModal = ({ show, onClose, batchId, onBatchUpdated, isEditable }) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    students: [],
    advisors: [],
    leader: '',
    semesters: []
  });
  const [semesters, setSemesters] = useState([]);
  const [students, setStudents] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Set loading state to false initially

  useEffect(() => {
    if (batchId && show) {
      setLoading(true); // Set loading to true when modal is opened
      axios.get(`http://localhost:5000/api/admin/batches/${batchId}`)
        .then(response => {
          setFormData({
            name: response.data.batch.name || '',
            startDate: response.data.batch.startDate || '',
            endDate: response.data.batch.endDate || '',
            students: response.data.batch.students || [],
            advisors: response.data.batch.advisors || [],
            leader: response.data.batch.leader || '',
            semesters: response.data.batch.semesters.map(semester => semester._id) || []
          });
          setLoading(false); // Set loading to false once the data is fetched
        })
        .catch(error => {
          console.error("Error fetching batch details", error);
          setLoading(false);
          setErrorMessage('Failed to fetch batch data');
        });
    } else {
      setLoading(false); // Reset loading state if no batchId or modal is not shown
    }

    // Fetch available semesters
    axios.get('http://localhost:5000/api/admin/semesters')
      .then(response => {
        if (response.data.success) {
          setSemesters(response.data.data);
        } else {
          setErrorMessage('Failed to fetch semesters');
        }
      })
      .catch(error => {
        console.error('Error fetching semesters:', error);
        setErrorMessage('Error fetching semesters');
      });

    // Fetch available students and advisors
    axios.get('http://localhost:5000/api/admin/students')
      .then(response => {
        if (response.data.success) {
          setStudents(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching students:', error));

    axios.get('http://localhost:5000/api/admin/advisors')
      .then(response => {
        if (response.data.success) {
          setAdvisors(response.data.data);
        }
      })
      .catch(error => console.error('Error fetching advisors:', error));

  }, [batchId, show]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while waiting for data
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'students' || name === 'advisors' || name === 'semesters') {
      const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: selectedValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.startDate || !formData.endDate) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    const batchUpdateData = {
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      students: formData.students,
      advisors: formData.advisors,
      leader: formData.leader,
      semesters: formData.semesters
    };

    axios.put(`http://localhost:5000/api/admin/batches/${batchId}`, batchUpdateData)
      .then(response => {
        if (response.data.success) {
          onBatchUpdated(response.data.batch);
          onClose();
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to update batch');
        }
      })
      .catch(error => {
        console.error('Error updating batch:', error);
        setErrorMessage('Error updating batch. Please try again.');
      });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Batch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="batchName">
            <Form.Label>Batch Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="semesterNames">
            <Form.Label>Semesters</Form.Label>
            <Form.Control
              as="select"
              name="semesters"
              value={formData.semesters}
              onChange={handleInputChange}
              multiple
            >
              {semesters.length > 0 ? (
                semesters.map((semester) => (
                  <option key={semester._id} value={semester._id}>
                    {semester.name}
                  </option>
                ))
              ) : (
                <option value="">No Semesters Available</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="students">
            <Form.Label>Students</Form.Label>
            <Form.Control
              as="select"
              name="students"
              value={formData.students}
              onChange={handleInputChange}
              multiple
            >
              {students.length > 0 ? (
                students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))
              ) : (
                <option value="">No Students Available</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="advisors">
            <Form.Label>Advisors</Form.Label>
            <Form.Control
              as="select"
              name="advisors"
              value={formData.advisors}
              onChange={handleInputChange}
              multiple
            >
              {advisors.length > 0 ? (
                advisors.map((advisor) => (
                  <option key={advisor._id} value={advisor._id}>
                    {advisor.name}
                  </option>
                ))
              ) : (
                <option value="">No Advisors Available</option>
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="leader">
            <Form.Label>Leader</Form.Label>
            <Form.Control
              type="text"
              name="leader"
              value={formData.leader}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Batch
          </Button>
          <Button variant="secondary" onClick={onClose} className="ml-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBatchModal;
