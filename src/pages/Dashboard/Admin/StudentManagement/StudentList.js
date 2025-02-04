import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddStudentModal from '../../../../components/modals/Students/AddStudentModal';


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
      console.log(response.data);
      
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
    <div className="container mt-4">
      <h1 className="mb-4">Student List</h1>
      
      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Search input and add student button */}
      <div className="d-flex justify-content-between mb-4">
        <input
          type="text"
          placeholder="Search Students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control w-50"
        />
        <button onClick={() => setIsAddOpen(true)} className="btn btn-primary">
          + Add Student
        </button>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Id</th>
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
                    <button
                      onClick={() => { setSelectedStudent(student); setIsViewOpen(true); }}
                      className="btn btn-info btn-sm mx-1"
                    >
                      View
                    </button>
                    <button
                      onClick={() => { setSelectedStudent(student); setIsEditOpen(true); }}
                      className="btn btn-warning btn-sm mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="btn btn-danger btn-sm mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}


      {/* Modals */}
      <AddStudentModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} fetchStudents={fetchStudents} />
      {/* <EditStudentModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} student={selectedStudent} fetchStudents={fetchStudents} />
      <ViewStudentModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} student={selectedStudent} />
      <DeleteStudentModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} studentId={selectedStudent} fetchStudents={fetchStudents} /> */}
    </div>
  );
};

export default StudentList;
