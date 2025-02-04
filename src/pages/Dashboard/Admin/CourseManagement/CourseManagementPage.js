import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import CreateNewCourseModal from './Modals/CreateNewCourseModal';
import EditCourseModal from './Modals/EditCourseModal';
import DeleteCourseModal from './Modals/DeleteCourseModal';
import { Link } from 'react-router-dom';

const CourseManagementPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch all courses from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/courses')
      .then(response => {
        const courses = response.data;
        console.log('Fetched Courses:', response.data); // Log the courses to see the structure
        if (Array.isArray(courses)) {
          setCourses(courses);
        } else {
          console.error('Expected an array of courses, but got:', courses);
          setCourses([]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching courses!", error);
      });
  }, []);

  // Callback to handle new course creation
  const handleCourseCreated = (newCourse) => {
    setCourses(prevCourses => [...prevCourses, newCourse]);
  };

  const handleCourseUpdated = (updatedCourse) => {
    setCourses(courses.map(course =>
      course._id === updatedCourse._id ? updatedCourse : course
    ));
  };

  const handleCourseDeleted = (courseId) => {
    setCourses(courses.filter(course => course._id !== courseId));
  };

  return (
    <div className="container mt-4">
      <h1>Course Management</h1>

      {/* Button to trigger Create Modal */}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowCreateModal(true)}
      >
        Create New Course
      </Button>

      {/* Display courses in a table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Semester</th>
            {/* <th>Batch</th> */}
            {/* <th>Instructor</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="6">No courses available.</td>
            </tr>
          ) : (
            courses.map(course => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.courseCode || 'N/A'}</td>
                {/* <td>{course.semester ? course.semester.name : 'N/A'}</td> */}
                {/* <td>{course.batch ? course.batch.name : 'N/A'}</td> */}
                <td>{course.instructor ? course.instructor.firstName : 'N/A'}</td>
                <td>
                  <Button
                    variant="warning"
                    className="mr-2"
                    onClick={() => {
                      setSelectedCourseId(course._id);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Link to={`/admin/course-details/${course._id}`} className="mx-1 btn btn-info">
                    {/* <Button
                      variant="warning"
                      className="mr-2"
                      onClick={() => {
                        setSelectedCourseId(course._id);
                        setShowEditModal(true);
                      }}
                    >
                      View Details
                    </Button> */}
                    View Details
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => {
                      setSelectedCourseId(course._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modals */}
      <CreateNewCourseModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCourseCreated={handleCourseCreated}
      />
      <EditCourseModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        courseId={selectedCourseId}
        onCourseUpdated={handleCourseUpdated}
      />
      <DeleteCourseModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        courseId={selectedCourseId}
        onCourseDeleted={handleCourseDeleted}
      />
    </div>
  );
};

export default CourseManagementPage;
