import React, { useState, useEffect } from 'react';
import { Button, InputGroup, Form, Alert, Table } from 'react-bootstrap';
import axios from 'axios';

const DeleteUserPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Fetch users from the server
    axios.get('http://localhost:5000/api/admin/users')
      .then(response => {
        setUsers(response.data.users);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:5000/api/admin/delete-user/${userId}`)
      .then(response => {
        setAlert({ type: 'success', message: 'User deleted successfully' });
        setUsers(users.filter(user => user._id !== userId)); // Remove deleted user from list
      })
      .catch(error => {
        setAlert({ type: 'danger', message: 'Error deleting user' });
        console.error(error);
      });
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>Delete User</h1>

      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      {/* Search bar */}
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
                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DeleteUserPage;
