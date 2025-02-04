import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Spinner, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrashAlt, FaBookOpen } from 'react-icons/fa';
import CreateSemesterModal from './Modals/CreateSemesterModal';
import EditSemesterModal from './Modals/EditSemesterModal';
import DeleteSemesterModal from './Modals/DeleteSemesterModal';

const SemesterManagementPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all semesters from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/semesters')
      .then(response => {
        setSemesters(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching semesters:", error);
        setLoading(false);
        setError("Failed to load semesters.");
      });
  }, []);

  // Callback functions
  const handleSemesterCreated = (newSemester) => {
    setSemesters(prevSemesters => [...prevSemesters, newSemester]);
  };

  const handleSemesterUpdated = (updatedSemester) => {
    setSemesters(semesters.map(semester =>
      semester._id === updatedSemester._id ? updatedSemester : semester
    ));
  };

  const handleSemesterDeleted = (semesterId) => {
    setSemesters(semesters.filter(semester => semester._id !== semesterId));
  };

  return (
    <Container fluid className="mt-5 pt-5">
      {/* Page Header */}
      <Row className="mb-4 text-center">
        <Col>
          <h2 className="text-primary fw-bold">
            <FaBookOpen className="me-2" /> Semester Management
          </h2>
          <p className="text-muted">Manage semesters with ease using this dashboard.</p>
        </Col>
      </Row>

      {/* Create Button */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary"
            size="lg"
            className="d-flex align-items-center shadow-sm rounded-pill px-4"
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus className="me-2" /> Create New Semester
          </Button>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          <Col lg={10} className="mx-auto">
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body>
                <Table responsive hover className="table-modern">
                  <thead className="table-light">
                    <tr>
                      <th>Semester Name</th>
                      <th>Batch</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {semesters.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center text-muted py-4">No semesters available.</td>
                      </tr>
                    ) : (
                      semesters.map(semester => (
                        <tr key={semester._id} className="align-middle">
                          <td className="fw-bold">{semester.semesterName}</td>
                          <td>{semester.batch?.batchName || 'N/A'}</td>
                          <td>{new Date(semester.startDate).toLocaleDateString()}</td>
                          <td>{new Date(semester.endDate).toLocaleDateString()}</td>
                          <td className="text-center">
                            <Button
                              variant="warning"
                              className="me-2 shadow-sm rounded-pill px-3"
                              onClick={() => {
                                setSelectedSemesterId(semester._id);
                                setShowEditModal(true);
                              }}
                            >
                              <FaEdit className="me-1" /> Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="shadow-sm rounded-pill px-3"
                              onClick={() => {
                                setSelectedSemesterId(semester._id);
                                setShowDeleteModal(true);
                              }}
                            >
                              <FaTrashAlt className="me-1" /> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Modals */}
      <CreateSemesterModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSemesterCreated={handleSemesterCreated}
      />
      <EditSemesterModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        semesterId={selectedSemesterId}
        onSemesterUpdated={handleSemesterUpdated}
      />
      <DeleteSemesterModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        semesterId={selectedSemesterId}
        onSemesterDeleted={handleSemesterDeleted}
      />

      {/* Custom Styles */}
      <style>{`
        .table-modern th {
          background: #f8f9fa;
          font-weight: 600;
          text-align: center;
        }
        .table-modern tbody tr {
          transition: all 0.3s ease-in-out;
        }
        .table-modern tbody tr:hover {
          background: #f1f3f5;
        }
        .shadow-lg {
          border-radius: 10px;
        }
        .rounded-pill {
          border-radius: 50px;
        }
      `}</style>
    </Container>
  );
};

export default SemesterManagementPage;
