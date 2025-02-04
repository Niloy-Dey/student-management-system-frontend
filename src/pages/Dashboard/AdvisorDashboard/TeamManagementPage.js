// src/pages/Dashboard/AdvisorDashboard/TeamManagementPage.js
import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

const TeamManagementPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleTransferStudent = () => {
    // Logic to transfer student to a new team
    setShowModal(false);
  };

  return (
    <Container>
      <h2>Team Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Current Team</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Student 1</td>
            <td>Team A</td>
            <td>
              <Button variant="primary" onClick={() => handleShowModal('Student 1')}>
                Transfer
              </Button>
            </td>
          </tr>
          <tr>
            <td>Student 2</td>
            <td>Team B</td>
            <td>
              <Button variant="primary" onClick={() => handleShowModal('Student 2')}>
                Transfer
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select New Team</Form.Label>
              <Form.Control as="select">
                <option>Team A</option>
                <option>Team B</option>
                <option>Team C</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleTransferStudent}>
              Transfer
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TeamManagementPage;
