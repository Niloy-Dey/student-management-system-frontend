import React from 'react';
import axios from 'axios';

const DeleteWeekModal = ({ show, setShow, weekId, courseId, onWeekDeleted }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/weeks/${weekId}`);
      onWeekDeleted(); // Trigger callback to refresh the weeks list
      setShow(false); // Close modal after deletion
    } catch (error) {
      console.error('Error deleting week:', error);
    }
  };

  return (
    show && (
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this week?</p>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    )
  );
};

export default DeleteWeekModal;
