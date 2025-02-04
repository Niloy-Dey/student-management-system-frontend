import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const EditSemesterModal = ({ show, onClose, semesterId, onSemesterUpdated }) => {
  const [formData, setFormData] = useState({
    semesterName: '',
    startDate: '',
    endDate: '',
    description: '',
    courseIds: [], // Associated courses for editing
  });
  const [courses, setCourses] = useState([]); // State to hold available courses
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for fetching data

  // Fetch semester data and courses when the modal is opened
  useEffect(() => {
    if (semesterId && show) {
      setLoading(true);

      // Fetch the semester data
      axios.get(`http://localhost:5000/api/admin/semesters/${semesterId}`)
        .then(response => {
          const data = response.data.data;
          setFormData({
            semesterName: data.semesterName,
            // startDate: data.startDate,
            // endDate: data.endDate,
            description: data.description,
            courseIds: data.courses ? data.courses.map(course => course._id) : [], // Map courses if available
          });

          // Fetch available courses
          axios.get('http://localhost:5000/api/admin/courses')
            .then(response => {
              console.log('Fetched courses:', response.data); // Check the fetched courses
              setCourses(response.data); // Assuming the response returns an array
              setLoading(false);
            })
            .catch(error => {
              console.error("Error fetching courses:", error);
              setError('Failed to load courses.');
              setLoading(false);
            });
        })
        .catch(error => {
          console.error("Error fetching semester:", error);
          setError('Failed to load semester data.');
          setLoading(false);
        });
    }
  }, [semesterId, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    const { options } = e.target;
    const selectedCourses = Array.from(options).filter(option => option.selected).map(option => option.value);
    setFormData({
      ...formData,
      courseIds: selectedCourses, // Update selected courses as an array
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Send the updated semester data
    axios.put(`http://localhost:5000/api/admin/semesters/${semesterId}`, formData)
      .then(response => {
        if (response.data.success) {
          onSemesterUpdated(response.data.data);
          onClose(); // Close modal after successful update
        } else {
          alert('Failed to update semester');
        }
      })
      .catch(error => {
        console.error("Error updating semester:", error);
        alert('Error updating semester. Please try again.');
      });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Semester</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Show error if fetching data failed */}
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
          {/* <Form.Group controlId="startDate">
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
          </Form.Group> */}
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Course Selection */}
          <Form.Group controlId="courseIds">
            <Form.Label>Courses</Form.Label>
            <Form.Control
              as="select"
              name="courseIds"
              multiple
              value={formData.courseIds}
              onChange={handleCourseChange}
            >
              {courses.length > 0 ? (
                courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))
              ) : (
                <option>No courses available</option>
              )}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>Save Changes</Button>
          <Button variant="secondary" onClick={onClose} className="ml-2">Cancel</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSemesterModal;
