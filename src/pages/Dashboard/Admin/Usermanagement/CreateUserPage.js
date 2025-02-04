import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './css/CreateUser.css';

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    discordId: '',
    advisorDetails: { name: '', discordId: '', teams: [] },
    profilePicture: ''
  });

  const [alert, setAlert] = useState(null);

  const handleCreateUser = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.username || !formData.email || !formData.password || !formData.role || !formData.discordId) {
      setAlert({ type: 'danger', message: 'Please fill in all required fields!' });
      return;
    }

    // // Validate phone number if provided
    // const phoneRegex = /^\+?\d{10,15}$/;
    // if (formData.phone && !phoneRegex.test(formData.phone)) {
    //   setAlert({ type: 'danger', message: 'Invalid phone number' });
    //   return;
    // }

    // Send request to create user
    axios.post('http://localhost:5000/api/admin/create-user', formData)
      .then(response => {
        setAlert({ type: 'success', message: 'User created successfully!' });
        setFormData({
          username: '',
          email: '',
          phone: '',
          password: '',
          role: '',
          discordId: '',
          advisorDetails: { name: '', discordId: '', teams: [] },
          profilePicture: ''
        });
      })
      .catch(error => {
        setAlert({ type: 'danger', message: 'Error creating user' });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Create New User</h1>

      {alert && <Alert variant={alert.type}>{alert.message}</Alert>}

      <Form onSubmit={handleCreateUser} className="shadow-lg p-4 rounded bg-light">
        <Row>
          {/* Username */}
          <Col md={6}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          {/* Email */}
          <Col md={6}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Password */}
          <Col md={6}>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </Form.Group>
          </Col>

          {/* Phone */}
          <Col md={6}>
            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Role */}
          <Col md={6}>
            <Form.Group controlId="role" className="mb-3">
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
          </Col>
        </Row>

        {/* Discord ID */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="discordId" className="mb-3">
              <Form.Label>Discord ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Discord ID"
                value={formData.discordId}
                onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Advisor Name & Discord ID - Visible for Student & Leader roles */}
        {(formData.role === 'Leader' || formData.role === 'Student') && (
          <>
            <Row>
              <Col md={6}>
                <Form.Group controlId="advisorName" className="mb-3">
                  <Form.Label>Advisor Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter advisor name"
                    value={formData.advisorDetails.name}
                    onChange={(e) => setFormData({ ...formData, advisorDetails: { ...formData.advisorDetails, name: e.target.value } })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="advisorDiscordId" className="mb-3">
                  <Form.Label>Advisor Discord ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter advisor discord ID"
                    value={formData.advisorDetails.discordId}
                    onChange={(e) => setFormData({ ...formData, advisorDetails: { ...formData.advisorDetails, discordId: e.target.value } })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        )}

        {/* Profile Picture URL */}
        <Row>
          <Col md={6}>
            <Form.Group controlId="profilePicture" className="mb-3">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter profile picture URL"
                value={formData.profilePicture}
                onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit" className="w-50">Create User</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateUserPage;
