import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/StudentProfile.css';  // Update styles as needed

const StudentProfile = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/search-students?query=${query}`);
        setStudentsList(response.data.students);
      } catch (err) {
        console.error('Error searching students:', err);
      }
    } else {
      setStudentsList([]);
    }
  };

  const handleStudentSelect = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/student-profile/${studentId}`);
      setSelectedStudent(response.data.student);
    } catch (err) {
      console.error('Error fetching student profile:', err);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setStudentsList([]);
    }
  }, [searchQuery]);

  return (
    <div className="student-profile-container">
      <h2>Student Profile</h2>

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name, email, phone, or Discord ID..."
          className="search-input"
        />
        {studentsList.length > 0 && (
          <ul className="search-suggestions">
            {studentsList.map((student) => (
              <li key={student._id} onClick={() => handleStudentSelect(student._id)}>
                <span>{student.name} ({student.email})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedStudent && (
        <div className="profile-details">
          {/* Profile Picture at the Top */}
          <div className="profile-picture-container">
            {selectedStudent.profilePicture ? (
              <img src={selectedStudent.profilePicture} alt="Profile" className="profile-picture" />
            ) : (
              <div className="profile-picture">
                <span>{selectedStudent.name[0]}</span>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="profile-info">
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Phone:</strong> {selectedStudent.phone}</p>
            <p><strong>Discord ID:</strong> {selectedStudent.discordId}</p>
          </div>

          {/* Advisor Section */}
          {selectedStudent.advisorDetails && (
            <div className="advisor-section">
              <h4>Advisor Details</h4>
              <div className="advisor-info">
                <p><strong>Name:</strong> {selectedStudent.advisorDetails.name || 'Not Available'}</p>
                <p><strong>Discord ID:</strong> {selectedStudent.advisorDetails.discordId || 'Not Available'}</p>
                <h5>Teams:</h5>
                {selectedStudent.advisorDetails.teams.length > 0 ? (
                  <ul className="advisor-teams">
                    {selectedStudent.advisorDetails.teams.map((team, index) => (
                      <li key={index}>{team}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No teams assigned</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
