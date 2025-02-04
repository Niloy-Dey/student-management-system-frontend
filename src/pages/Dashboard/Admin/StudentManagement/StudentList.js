import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddStudentModal from '../../../../components/modals/Students/AddStudentModal';
import { Button, Table, InputGroup, FormControl, Spinner, Card } from 'react-bootstrap';
import { BsEye, BsPencil, BsTrash, BsPlus, BsSearch } from 'react-icons/bs';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/students/all', { params: { search } });
      setStudents(response.data);
    } catch (error) {
      setError('Failed to load students. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (studentId) => {
    setSelectedStudent(studentId);
    setIsDeleteOpen(true);
  };

  return (
    <div style={{ maxWidth: "1000px" }}  className="container mt-4 pt-5">
      <Card className="shadow-sm p-4">
        <h2 className="mb-4 text-center">Student List</h2>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Search Bar & Add Button */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <InputGroup className="w-100 w-md-50 mb-3 mb-md-0">
            <InputGroup.Text><BsSearch /></InputGroup.Text>
            <FormControl
              type="text"
              placeholder="Search Students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>

          <Button className='btn-sm w-100 rounded ms-2 py-2' variant="primary" onClick={() => setIsAddOpen(true)}>
            <BsPlus size={20} className="me-2" /> Add Student
          </Button>
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table bordered hover responsive className="table-striped shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Batch</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.studentId}</td>
                    <td>{student?.user?.firstName}</td>
                    <td>{student.email}</td>
                    <td>{student.batch || 'N/A'}</td>
                    <td>{student.team || 'N/A'}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-1"
                        onClick={() => { setSelectedStudent(student); setIsViewOpen(true); }}
                      >
                        <BsEye /> View
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-1"
                        onClick={() => { setSelectedStudent(student); setIsEditOpen(true); }}
                      >
                        <BsPencil /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(student._id)}
                      >
                        <BsTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No students found</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Modals */}
      <AddStudentModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} fetchStudents={fetchStudents} />
    </div>
  );
};

export default StudentList;
