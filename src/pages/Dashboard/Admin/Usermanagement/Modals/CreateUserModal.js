import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

const CreateUserModal = ({ showModal, setShowModal, setUsers }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    discordId: "",
    profilePicture: "",
    isActive: true,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Handle form input changes dynamically
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle user creation
  const handleCreateUser = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/admin/create-user", formData);

      // ✅ Update UI with the new user
      setUsers((prevUsers) => [...prevUsers, response.data.user]);

      // ✅ Reset form fields
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        discordId: "",
        profilePicture: "",
        isActive: true,
      });

      setSuccess("User created successfully!");
      setTimeout(() => setShowModal(false), 2000); // Close modal after success
    } catch (error) {
      setError(error.response?.data?.message || "Error creating user");
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Advisor">Advisor</option>
              <option value="Student">Student</option>
              <option value="Team Lead">Team Lead</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discord ID</Form.Label>
            <Form.Control type="text" name="discordId" value={formData.discordId} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Picture URL</Form.Label>
            <Form.Control type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Is Active" name="isActive" checked={formData.isActive} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateUser}>
          Create User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
