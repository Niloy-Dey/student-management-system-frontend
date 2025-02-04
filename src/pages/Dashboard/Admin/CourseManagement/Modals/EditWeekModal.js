import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditWeekModal = ({ show, setShow, weekId }) => {
  const [weekNumber, setWeekNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch week details when modal is shown
  useEffect(() => {
    const fetchWeekDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/admin/weeks/${weekId}`);
        setWeekNumber(data.weekNumber);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
      } catch (error) {
        console.error('Error fetching week details:', error);
      }
    };

    if (weekId) {
      fetchWeekDetails();
    }
  }, [weekId]);

  const handleSubmit = async () => {
    try {
      const updatedWeek = {
        weekNumber,
        startDate,
        endDate,
      };

      await axios.put(`http://localhost:5000/api/admin/weeks/${weekId}`, updatedWeek);
      setShow(false); // Close modal after updating
    } catch (error) {
      console.error('Error updating week:', error);
    }
  };

  return (
    show && (
      <div className="modal">
        <h2>Edit Week</h2>
        <label>Week Number</label>
        <input type="number" value={weekNumber} onChange={(e) => setWeekNumber(e.target.value)} />
        <label>Start Date</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label>End Date</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={handleSubmit}>Save Changes</button>
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    )
  );
};

export default EditWeekModal;
