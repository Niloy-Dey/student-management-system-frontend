import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/UserProfile.css';

const UserProfilePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfiles, setUserProfiles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Handle search query change
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/search-users?query=${query}`);
        setUserProfiles(response.data.users);
      } catch (err) {
        console.error('Error searching users:', err);
      }
    } else {
      setUserProfiles([]);
    }
  };

  // Handle user selection from search results
  const handleUserSelect = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/user-profile/${userId}`);
      setSelectedUser(response.data.user);
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setUserProfiles([]);
    }
  }, [searchQuery]);

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by username, email, phone, or Discord ID..."
        />
        {userProfiles.length > 0 && (
          <ul className="search-suggestions">
            {userProfiles.map((user) => (
              <li key={user._id} onClick={() => handleUserSelect(user._id)}>
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedUser && (
        <div className="profile-details">
          <h3>Profile Details</h3>
          <div className="profile-info">
            <div>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Discord ID:</strong> {selectedUser.discordId}</p>
            </div>
            <div>
              <div className="profile-picture-container">
                {selectedUser.profilePicture ? (
                  <img src={selectedUser.profilePicture} alt="Profile" className="profile-picture" />
                ) : (
                  <div className="profile-picture">
                    <span>{selectedUser.username[0]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Advisor Section */}
          {selectedUser.advisorDetails && (
            <div className="advisor-section">
              <h4>Advisor Details</h4>
              <div className="advisor-info">
                <p><strong>Name:</strong> {selectedUser.advisorDetails.name || 'Not Available'}</p>
                <p><strong>Discord ID:</strong> {selectedUser.advisorDetails.discordId || 'Not Available'}</p>
                <h5>Teams:</h5>
                {selectedUser.advisorDetails.teams.length > 0 ? (
                  <ul className="advisor-teams">
                    {selectedUser.advisorDetails.teams.map((team, index) => (
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

export default UserProfilePage;
