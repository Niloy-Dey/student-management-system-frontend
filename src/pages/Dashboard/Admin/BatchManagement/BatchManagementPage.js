import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Container, Row, Col, Card } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrashAlt, FaUsers } from 'react-icons/fa'; // Importing icons
import CreateNewBatchModal from './Modals/CreateNewBatchModal';
import EditBatchModal from './Modals/EditBatchModal';
import DeleteBatchModal from './Modals/DeleteBatchModal';

const BatchManagementPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [batches, setBatches] = useState([]);

  // Fetch all batches from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/batches')
      .then(response => {
        const batches = response.data.data;
        if (Array.isArray(batches)) {
          setBatches(batches);
        } else {
          console.error('Expected an array of batches, but got:', batches);
          setBatches([]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching batches!", error);
      });
  }, []);

  // Callback to handle new batch creation
  const handleBatchCreated = (newBatch) => {
    setBatches(prevBatches => [...prevBatches, newBatch]);
  };

  const handleBatchUpdated = (updatedBatch) => {
    setBatches(batches.map(batch =>
      batch._id === updatedBatch._id ? updatedBatch : batch
    ));
  };

  const handleBatchDeleted = (batchId) => {
    setBatches(batches.filter(batch => batch._id !== batchId));
  };

  return (
    <Container fluid className="mt-5 pt-5">
      {/* Page Header */}
      <Row className="mb-4">
        <Col className="text-center">
          <h3 className="text-primary fw-bold">
            <FaUsers className="me-2" /> Batch Management
          </h3>
          <p className="text-muted">Manage batches efficiently with our modern dashboard</p>
        </Col>
      </Row>

      {/* Create Button */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowCreateModal(true)}
            className="d-flex align-items-center shadow-sm rounded-pill px-4"
          >
            <FaPlus className="me-2" /> Create New Batch
          </Button>
        </Col>
      </Row>

      {/* Batch Table (inside Card) */}
      <Row>
        <Col lg={10} className="mx-auto">
          <Card className="shadow border-0 rounded-4">
            <Card.Body>
              <Table responsive hover className="table-modern">
                <thead className="table-light">
                  <tr>
                    <th>Batch Name</th>
                    <th>Semester</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-4">No batches available.</td>
                    </tr>
                  ) : (
                    batches.map(batch => (
                      <tr key={batch._id} className="align-middle">
                        <td className="fw-bold">{batch.name}</td>
                        <td>{batch.semesterName}</td>
                        <td className="text-center">
                          <Button
                            variant="warning"
                            className="me-2 shadow-sm rounded-pill px-3"
                            onClick={() => {
                              setSelectedBatchId(batch._id);
                              setShowEditModal(true);
                            }}
                          >
                            <FaEdit className="me-1" /> Edit
                          </Button>
                          <Button
                            variant="danger"
                            className="shadow-sm rounded-pill px-3"
                            onClick={() => {
                              setSelectedBatchId(batch._id);
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

      {/* Modals */}
      <CreateNewBatchModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onBatchCreated={handleBatchCreated}
      />
      <EditBatchModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        batchId={selectedBatchId}
        onBatchUpdated={handleBatchUpdated}
      />
      <DeleteBatchModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        batchId={selectedBatchId}
        onBatchDeleted={handleBatchDeleted}
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
      `}</style>
    </Container>
  );
};

export default BatchManagementPage;
