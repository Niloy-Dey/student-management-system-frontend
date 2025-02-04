import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, DropdownButton, Dropdown, Alert, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';

const RoleManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ role: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users')
      .then(response => {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setAlert({ type: 'danger', message: 'Error fetching users. Please try again later.' });
      });
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

    if (query) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (role && role !== 'All') {
      filtered = filtered.filter(user => user.role === role);
    }

    setFilteredUsers(filtered);
  };

  const handleAssignRole = (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    if (!selectedUser || !selectedUser._id) {
      setAlert({ type: 'danger', message: 'User ID is missing.' });
      return;
    }

    axios.post(`http://localhost:5000/api/admin/assign-role/${selectedUser._id}`, formData)
      .then(response => {
        setUsers(users.map(user => user._id === selectedUser._id ? response.data.user : user));
        setFilteredUsers(filteredUsers.map(user => user._id === selectedUser._id ? response.data.user : user));
        setAlert({ type: 'success', message: 'Role assigned successfully!' });
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error assigning role:', error);
        setAlert({ type: 'danger', message: 'Error assigning role. Please try again.' });
      })
      .finally(() => setLoading(false));
  };

  const handleEditRole = (user) => {
    setSelectedUser(user);
    setFormData({ role: user.role });
    setShowModal(true);
  };

  const handleCreateRole = () => {
    setSelectedUser(null);
    setFormData({ role: '' });
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Role Management</h1>

      {/* Alert */}
      {alert && (
        <Alert variant={alert.type} className="mb-4">
          {alert.message}
        </Alert>
      )}

      {/* Search and Filter */}
      <div className="d-flex justify-content-between mb-4">
        <InputGroup className="w-50">
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="rounded-pill shadow-sm"
          />
        </InputGroup>

        <DropdownButton
          variant="outline-secondary"
          title={`Role: ${selectedRole || 'All'}`}
          id="role-filter"
          onSelect={handleRoleFilterChange}
          className="rounded-pill shadow-sm"
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Admin">Admin</Dropdown.Item>
          <Dropdown.Item eventKey="Advisor">Advisor</Dropdown.Item>
          <Dropdown.Item eventKey="Leader">Leader</Dropdown.Item>
          <Dropdown.Item eventKey="Student">Student</Dropdown.Item>
        </DropdownButton>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <Table striped bordered hover variant="light" className="rounded shadow-sm">
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
                  <Button
                    variant="warning"
                    onClick={() => handleEditRole(user)}
                    className="rounded-pill"
                  >
                    Assign Role
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Role Assignment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Edit User Role' : 'Assign Role'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAssignRole}>
            <Form.Group controlId="formRole">
              <Form.Label>Select Role</Form.Label>
              <Form.Control
                as="select"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="rounded-pill"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Advisor">Advisor</option>
                <option value="Leader">Leader</option>
                <option value="Student">Student</option>
              </Form.Control>
            </Form.Group>
            <div className="text-center mt-3">
              <Button
                type="submit"
                variant="primary"
                className="rounded-pill"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Assign Role'
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RoleManagementPage;
