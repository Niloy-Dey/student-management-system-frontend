import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputGroup, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import axios from 'axios';

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '', // Password field is needed for createUser
    role: '',
    advisorDetails: { name: '', discordId: '', teams: [] }, // For Advisor details
    profilePicture: ''
  });
  const [alert, setAlert] = useState(null); // To show alerts for success/error

  useEffect(() => {
    // Fetch users from API
    axios.get('http://localhost:5000/api/admin/users')
      .then(response => {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users); // Initially, show all users
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterUsers(query, selectedRole);
  };

  const handleRoleFilterChange = (role) => {
    setSelectedRole(role);
    filterUsers(searchQuery, role);
  };

  const filterUsers = (query, role) => {
    let filtered = users;

    // Search filtering
    if (query) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Role filtering
    if (role && role !== 'All') {
      filtered = filtered.filter(user => user.role === role);
    }

    setFilteredUsers(filtered);
  };

  const handleCreateEditUser = (e) => {
    e.preventDefault();

    // Validate the required fields
    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      setAlert({ type: 'danger', message: 'Please fill in all required fields!' });
      return;
    }

    // Validate phone number
    const phoneRegex = /^\+?\d{10,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setAlert({ type: 'danger', message: 'Invalid phone number' });
      return;
    }

    // Advisor details (optional)
    if (formData.role === 'Advisor' && (!formData.advisorDetails.name || !formData.advisorDetails.discordId)) {
      setAlert({ type: 'danger', message: 'Please fill in advisor details' });
      return;
    }

    const url = isEditMode
      ? `http://localhost:5000/api/admin/edit-user/${selectedUser._id}`
      : 'http://localhost:5000/api/admin/create-user';

    axios[isEditMode ? 'put' : 'post'](url, formData)
      .then(response => {
        if (isEditMode) {
          setUsers(users.map(user => user._id === selectedUser._id ? response.data.user : user));
        } else {
          setUsers([...users, response.data.user]);
        }
        setAlert({ type: 'success', message: isEditMode ? 'User updated successfully!' : 'User created successfully!' });
        setShowModal(false);
      })
      .catch(error => {
        setAlert({ type: 'danger', message: error.response?.data?.message || 'Error creating/editing user' });
        console.error('Error creating/editing user:', error);
      });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: '', // Password should not be prefilled during edit
      role: user.role,
      advisorDetails: user.advisorDetails || { name: '', discordId: '', teams: [] },
      profilePicture: user.profilePicture || ''
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      axios.delete(`http://localhost:5000/api/admin/delete-user/${userId}`)
        .then(response => {
          setUsers(users.filter(user => user._id !== userId));
          setAlert({ type: 'success', message: 'User deactivated successfully!' });
        })
        .catch(error => {
          setAlert({ type: 'danger', message: 'Error deactivating user' });
          console.error('Error deleting user:', error);
        });
    }
  };

  const handleCreateNewUser = () => {
    setIsEditMode(false);
    setFormData({
      username: '',
      email: '',
      phone: '',
      password: '',
      role: '',
      advisorDetails: { name: '', discordId: '', teams: [] },
      profilePicture: ''
    });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>

      {/* Display alert messages */}
      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      {/* Search and Filter */}
      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="w-50">
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <DropdownButton
          variant="outline-secondary"
          title={`Role: ${selectedRole || 'All'}`}
          id="role-filter"
          onSelect={handleRoleFilterChange}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
          <Dropdown.Item eventKey="Advisor">Advisor</Dropdown.Item>
          <Dropdown.Item eventKey="Leader">Leader</Dropdown.Item>
          <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
        </DropdownButton>
        <Button variant="primary" onClick={handleCreateNewUser}>Create New User</Button>
      </div>

      {/* User Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.phone}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditUser(user)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Create/Edit User */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit User' : 'Create New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateEditUser}>
            {/* Form Fields */}
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!isEditMode} // Required only for new users
              />
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Advisor">Advisor</option>
                <option value="Leader">Leader</option>
                <option value="Student">Student</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>
            {formData.role === 'Advisor' && (
              <>
                <Form.Group controlId="advisorName">
                  <Form.Label>Advisor Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter advisor name"
                    value={formData.advisorDetails.name}
                    onChange={(e) => setFormData({ ...formData, advisorDetails: { ...formData.advisorDetails, name: e.target.value } })}
                  />
                </Form.Group>
                <Form.Group controlId="advisorDiscordId">
                  <Form.Label>Advisor Discord ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter advisor discord ID"
                    value={formData.advisorDetails.discordId}
                    onChange={(e) => setFormData({ ...formData, advisorDetails: { ...formData.advisorDetails, discordId: e.target.value } })}
                  />
                </Form.Group>
              </>
            )}
            <Form.Group controlId="profilePicture">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter profile picture URL"
                value={formData.profilePicture}
                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {isEditMode ? 'Save Changes' : 'Create User'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminUserManagementPage;
