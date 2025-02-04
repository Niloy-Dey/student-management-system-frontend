import React, { useState } from 'react';
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// Initialize dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const AdvisorManagement = () => {
  const [advisors, setAdvisors] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      batches: ['Batch 1', 'Batch 2'],
      tracks: ['DSA', 'Machine Learning'],
      updatedAt: dayjs().tz('Asia/Dhaka').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      batches: ['Batch 3'],
      tracks: ['Python'],
      updatedAt: dayjs().tz('Asia/Dhaka').format('YYYY-MM-DD HH:mm:ss'),
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batches: [],
    tracks: [],
  });

  const [viewDetails, setViewDetails] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAdvisor(null);
    setFormData({ name: '', email: '', batches: [], tracks: [] });
  };

  const handleOpenModal = (advisor = null) => {
    if (advisor) {
      setEditingAdvisor(advisor);
      setFormData({
        name: advisor.name,
        email: advisor.email,
        batches: advisor.batches,
        tracks: advisor.tracks,
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e, key) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [key]: values });
  };

  const handleSaveAdvisor = () => {
    const timestamp = dayjs().tz('Asia/Dhaka').format('YYYY-MM-DD HH:mm:ss');

    if (editingAdvisor) {
      setAdvisors((prev) =>
        prev.map((advisor) =>
          advisor.id === editingAdvisor.id
            ? { ...advisor, ...formData, updatedAt: timestamp }
            : advisor
        )
      );
    } else {
      setAdvisors((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...formData,
          updatedAt: timestamp,
        },
      ]);
    }

    handleCloseModal();
  };

  const handleRemoveAdvisor = (id) => {
    setAdvisors((prev) => prev.filter((advisor) => advisor.id !== id));
  };

  return (
    <div>
      <h2>Advisor Management</h2>
      <Button className="float-end mb-3 " onClick={() => handleOpenModal()}>
        Add New Advisor
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Batches</th>
            <th>Tracks</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {advisors.map((advisor) => (
            <tr key={advisor.id}>
              <td>{advisor.name}</td>
              <td>{advisor.email}</td>
              <td>{advisor.batches.map((batch, idx) => (
                <Badge bg="info" key={idx} className="me-1">{batch}</Badge>
              ))}</td>
              <td>{advisor.tracks.map((track, idx) => (
                <Badge bg="success" key={idx} className="me-1">{track}</Badge>
              ))}</td>
              <td>{advisor.updatedAt}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleOpenModal(advisor)}
                >
                  Update
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => setViewDetails(advisor)}
                >
                  View
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveAdvisor(advisor.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Update Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingAdvisor ? 'Update Advisor' : 'Add New Advisor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batches</Form.Label>
              <Form.Select
                multiple
                value={formData.batches}
                onChange={(e) => handleMultiSelectChange(e, 'batches')}
              >
                <option>Batch 1</option>
                <option>Batch 2</option>
                <option>Batch 3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tracks</Form.Label>
              <Form.Select
                multiple
                value={formData.tracks}
                onChange={(e) => handleMultiSelectChange(e, 'tracks')}
              >
                <option>DSA</option>
                <option>Python</option>
                <option>Machine Learning</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveAdvisor}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Details Modal */}
      <Modal show={!!viewDetails} onHide={() => setViewDetails(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Advisor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewDetails && (
            <div>
              <p><strong>Name:</strong> {viewDetails.name}</p>
              <p><strong>Email:</strong> {viewDetails.email}</p>
              <p><strong>Batches:</strong> {viewDetails.batches.join(', ')}</p>
              <p><strong>Tracks:</strong> {viewDetails.tracks.join(', ')}</p>
              <p><strong>Last Updated:</strong> {viewDetails.updatedAt}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewDetails(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdvisorManagement;
