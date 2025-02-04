import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Container, Card, Spinner, InputGroup, Form } from "react-bootstrap";
import { PencilSquare, Trash, Plus, Eye, Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import CreateNewCourseModal from "./Modals/CreateNewCourseModal";
import EditCourseModal from "./Modals/EditCourseModal";
import DeleteCourseModal from "./Modals/DeleteCourseModal";

const CourseManagementPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/courses")
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses!", error);
        setLoading(false);
      });
  }, []);

  const handleCourseCreated = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleCourseUpdated = (updatedCourse) => {
    setCourses(courses.map((course) => (course._id === updatedCourse._id ? updatedCourse : course)));
  };

  const handleCourseDeleted = (courseId) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container style={{ maxWidth: "1000px" }}  className="pt-5 mt-4">
      <h2 className="mb-4 text-center text-primary fw-bold">Course Management</h2>
      <Card className="shadow-lg p-4 rounded-4">
        {/* Search & Create Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
          <InputGroup className="mb-2 mb-md-0 w-100 m-2  rounded-pill w-md-50">
            {/* <InputGroup.Text className="bg-light">
              <Search className="text-secondary" />
            </InputGroup.Text> */}
            <Form.Control
              type="text"
              className="m-2 ps-5 w-100 py-3 rounded-pill"
              placeholder="Search Courses"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary" className="m-2 w-100 rounded-pill" onClick={() => setShowCreateModal(true)}>
            <Plus className="me-2" /> Create Course
          </Button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" className="text-primary" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="rounded shadow">
            <thead className="bg-primary text-white">
              <tr>
                <th>Course Name</th>
                <th>Course Code</th>
                <th>Instructor</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.name}</td>
                    <td>{course.courseCode || "N/A"}</td>
                    <td>{course.instructor ? course.instructor.firstName : "N/A"}</td>
                    <td className="text-center">
                      <Link to={`/admin/course-details/${course._id}`} className="btn btn-info btn-sm mx-1">
                        <Eye /> View
                      </Link>
                      <Button
                        variant="warning"
                        size="sm"
                        className="mx-1"
                        onClick={() => {
                          setSelectedCourseId(course._id);
                          setShowEditModal(true);
                        }}
                      >
                        <PencilSquare /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setSelectedCourseId(course._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Modals */}
      <CreateNewCourseModal show={showCreateModal} onClose={() => setShowCreateModal(false)} onCourseCreated={handleCourseCreated} />
      <EditCourseModal show={showEditModal} onClose={() => setShowEditModal(false)} courseId={selectedCourseId} onCourseUpdated={handleCourseUpdated} />
      <DeleteCourseModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} courseId={selectedCourseId} onCourseDeleted={handleCourseDeleted} />
    </Container>
  );
};

export default CourseManagementPage;