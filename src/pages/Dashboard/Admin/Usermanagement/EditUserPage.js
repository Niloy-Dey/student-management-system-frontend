import React, { useState, useEffect } from 'react';
import { Table, Button, InputGroup, Form, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';

const EditUserPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    discordId: '',
    advisorDetails: { name: '', discordId: '', teams: [] },
    profilePicture: ''
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Fetch users from API
    axios.get('http://localhost:5000/api/admin/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      discordId: user.discordId || '',
      advisorDetails: user.advisorDetails || { name: '', discordId: '', teams: [] },
      profilePicture: user.profilePicture || ''
    });
  };

  const handleEditUser = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.username || !formData.email || !formData.role || !formData.discordId) {
      setAlert({ type: 'danger', message: 'Please fill in all required fields!' });
      return;
    }

    // Prepare update data based on the role
    const updateData = { ...formData };
    if (formData.role !== 'Advisor') {
      // Remove advisorDetails if not role 'Advisor'
      updateData.advisorDetails = undefined;
    }

    const url = `http://localhost:5000/api/admin/edit-user/${selectedUser._id}`;
    axios.put(url, updateData)
      .then(response => {
        setAlert({ type: 'success', message: 'User updated successfully!' });
        setSelectedUser(null);
        setFormData({
          username: '',
          email: '',
          phone: '',
          role: '',
          discordId: '',
          advisorDetails: { name: '', discordId: '', teams: [] },
          profilePicture: ''
        });
      })
      .catch(error => {
        setAlert({ type: 'danger', message: 'Error updating user' });
        console.error(error);
      });
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className='text-center'>Edit User</h1>

      {/* Alert popup */}
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </InputGroup>

      {/* User Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button onClick={() => handleSelectUser(user)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Editing User */}
      {selectedUser && (
        <Modal show={true} onHide={() => setSelectedUser(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User: {selectedUser.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditUser}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Advisor">Advisor</option>
                  <option value="Leader">Leader</option>
                  <option value="Student">Student</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="discordId">
                <Form.Label>Discord ID</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.discordId}
                  onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                />
              </Form.Group>

              {formData.role === 'Advisor' && (
                <>
                  <Form.Group controlId="advisorName">
                    <Form.Label>Advisor Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.advisorDetails.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        advisorDetails: { ...formData.advisorDetails, name: e.target.value }
                      })}
                    />
                  </Form.Group>

                  <Form.Group controlId="advisorDiscordId">
                    <Form.Label>Advisor Discord ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.advisorDetails.discordId}
                      onChange={(e) => setFormData({
                        ...formData,
                        advisorDetails: { ...formData.advisorDetails, discordId: e.target.value }
                      })}
                    />
                  </Form.Group>
                </>
              )}

              <Form.Group controlId="profilePicture">
                <Form.Label>Profile Picture URL</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.profilePicture}
                  onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default EditUserPage;
