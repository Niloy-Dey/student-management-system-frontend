import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const EditCourseModal = ({ show, onClose, courseId, onCourseUpdated }) => {
  const [course, setCourse] = useState({
    name: '',
    description: '',
    semester: '',  // This will store the semester ID
    courseCode: '',
    instructor: '',  // This will store the instructor ID
    weeks: [],  // Changed to an array as weeks can have multiple entries
  });
  const [semesterOptions, setSemesterOptions] = useState([]); // For available semesters
  const [instructorOptions, setInstructorOptions] = useState([]); // For available instructors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch available semesters (only once, not on every courseId change)
    axios.get('http://localhost:5000/api/admin/semesters')
      .then(response => {
        setSemesterOptions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching semesters:', error);
        setError('Error fetching semesters');
      });

    // Fetch available instructors (if required)
    // axios.get('http://localhost:5000/api/admin/instructors')
    //   .then(response => {
    //     setInstructorOptions(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching instructors:', error);
    //     setError('Error fetching instructors');
    //   });

    // Fetch course data by ID
    if (courseId) {
      axios.get(`http://localhost:5000/api/admin/courses/${courseId}`)
        .then(response => {
          const courseData = response.data.course;
          setCourse({
            name: courseData.name || '',
            description: courseData.description || '',
            semester: courseData.semester ? courseData.semester._id : '', // Ensure semester is set correctly
            courseCode: courseData.courseCode || '',
            instructor: courseData.instructor ? courseData.instructor : '', // Ensure instructor is set correctly
            weeks: courseData.weeks || [], // Ensure weeks is always an array
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching course data:', error);
          setLoading(false);
          setError('Error fetching course data');
        });
    }
  }, [courseId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCourse = {
      name: course.name,
      description: course.description,
      semester: course.semester, // Send semester ObjectId
      courseCode: course.courseCode,
      instructor: course.instructor || null, // Send instructor as null if not selected
      weeks: course.weeks,
    };

    // Send the updated course data to the backend
    axios.put(`http://localhost:5000/api/admin/courses/${courseId}`, updatedCourse)
      .then(response => {
        onCourseUpdated(response.data);
        onClose();
      })
      .catch(error => {
        console.error('Error updating course:', error);
        setError('There was an error updating the course. Please try again later.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <Form onSubmit={handleSubmit}>
            {/* Course Name */}
            <Form.Group controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={course.name}
                onChange={handleChange}
                placeholder="Enter course name"
              />
            </Form.Group>

            {/* Course Description */}
            <Form.Group controlId="formCourseDescription">
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={course.description}
                onChange={handleChange}
                placeholder="Enter course description"
              />
            </Form.Group>

            {/* Semester Selection */}
            <Form.Group controlId="formSemester">
              <Form.Label>Semester</Form.Label>
              <Form.Control
                as="select"
                name="semester"
                value={course.semester}
                onChange={handleChange}
              >
                <option value="">Select a semester</option>
                {semesterOptions?.map(semester => (
                  <option key={semester._id} value={semester._id}>
                    {semester.semesterName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Instructor Selection */}
            <Form.Group controlId="formInstructor">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                name="courseCode"
                value={course.instructor}
                onChange={handleChange}
                placeholder="Enter instructor"
              />
            </Form.Group>

            {/* Course Code */}
            <Form.Group controlId="formCourseCode">
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                type="text"
                name="courseCode"
                value={course.courseCode}
                onChange={handleChange}
                placeholder="Enter course code"
              />
            </Form.Group>

            {/* Weeks */}
            <Form.Group controlId="formWeeks">
              <Form.Label>Weeks</Form.Label>
              <Form.Control
                type="text"
                name="weeks"
                value={course.weeks.join(', ')} // Join the weeks into a string
                onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.value.split(', ') } })}
                placeholder="Enter number of weeks (comma-separated)"
              />
            </Form.Group>

            {/* Save Changes Button */}
            <Button variant="primary" type="submit" disabled={loading}>
              Save Changes
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditCourseModal;
