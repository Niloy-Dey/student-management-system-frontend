import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RoleAssignmentModal = ({ showModal, setShowModal, role, setRole, handleAssignRole }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="role">
            <Form.Label>Select Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Advisor">Advisor</option>
              <option value="Student">Student</option>
              <option value="Team Lead">Team Lead</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAssignRole}>
          Assign Role
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoleAssignmentModal;
