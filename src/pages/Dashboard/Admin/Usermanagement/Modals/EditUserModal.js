import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditUserModal = ({ showModal, setShowModal, selectedUser, setSelectedUser, setUsers }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');  // Assuming password can be updated
  const [role, setRole] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  // Set initial values when modal is shown
  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setUsername(selectedUser.username);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setPassword('');  // Reset password to avoid unwanted change
      setRole(selectedUser.role);
      setDiscordId(selectedUser.discordId);
      setProfilePicture(selectedUser.profilePicture);
      setIsActive(selectedUser.isActive);
    }
  }, [selectedUser]);

  // Handle user update
  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        firstName,
        lastName,
        username,
        email,
        phone,
        password,  // Optionally include password if needed for updates
        role,
        discordId,
        profilePicture,
        isActive,
      };

      const response = await axios.put(
        `http://localhost:5000/api/admin/edit-user/${selectedUser._id}`,
        updatedUser
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedUser } : user
        )
      );
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      setError('Error updating user');
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password (leave blank to keep the same)</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Advisor">Advisor</option>
              <option value="Student">Student</option>
              <option value="Team Lead">Team Lead</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="discordId">
            <Form.Label>Discord ID</Form.Label>
            <Form.Control
              type="text"
              value={discordId}
              onChange={(e) => setDiscordId(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="profilePicture">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control
              type="text"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="isActive">
            <Form.Check
              type="checkbox"
              label="Is Active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateUser}>
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
