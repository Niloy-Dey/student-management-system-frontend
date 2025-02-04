// File: components/AddWeekModal.js

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddWeekModal = ({ 
  showAddWeekModal, 
  setShowAddWeekModal, 
  newWeekData, 
  setNewWeekData, 
  handleAddWeek 
}) => {
  return (
    <Modal show={showAddWeekModal} onHide={() => setShowAddWeekModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Week</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="weekNumber">
            <Form.Label>Week Number</Form.Label>
            <Form.Control
              type="number"
              value={newWeekData?.weekNumber}
              onChange={(e) => setNewWeekData({ ...newWeekData, weekNumber: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={newWeekData?.startDate}
              onChange={(e) => setNewWeekData({ ...newWeekData, startDate: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={newWeekData?.endDate}
              onChange={(e) => setNewWeekData({ ...newWeekData, endDate: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddWeekModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddWeek}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWeekModal;
