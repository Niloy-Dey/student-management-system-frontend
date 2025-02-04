import React, { useState, useContext } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RegisterPage = () => {
  const auth = useContext(AuthContext); // ✅ Safe access to AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "Student",
    batchNo: "Batch 1", // Default batch
    discordId: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const batches = [
    "Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5",
    "Batch 6", "Batch 7", "Batch 8", "Batch 9", "Batch 10"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");

      // ✅ Safely update user context
      const user = { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, batchNo: formData.batchNo };

      if (auth && auth.setUser) {
        auth.setUser(user); // ✅ Ensure `setUser` exists
        localStorage.setItem("user", JSON.stringify(user));
      }

      setSuccess(true);
      setTimeout(() => navigate("/student-dashboard"), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="d-flex my-5 py-5 justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "600px" }} className=" shadow-lg"> {/* Increased width for better spacing */}
        <Card.Body>
          <h3 className="text-center text-black">Register</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Registration successful! Redirecting...</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              {/* First Name & Last Name Side by Side */}
              <Col md={6}>
                <Form.Group className="mb-3  text-black">
                  <Form.Label >First Name</Form.Label>
                  <Form.Control placeholder="First Name" type="text" name="firstName" required value={formData.firstName} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3  text-black">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder="Last Name" type="text" name="lastName" required value={formData.lastName} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Username & Email Side by Side */}
              <Col md={6}>
                <Form.Group className="mb-3  text-black">
                  <Form.Label>Username</Form.Label>
                  <Form.Control placeholder="Username" type="text" name="username" required value={formData.username} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3  text-black">
                  <Form.Label>Email</Form.Label>
                  <Form.Control placeholder="Email" type="email" name="email" required value={formData.email} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Phone & Discord ID Side by Side */}
              <Col md={6}>
                <Form.Group className="mb-3  text-black">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control placeholder="Phone" type="text" name="phone" required value={formData.phone} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3  text-black">
                  <Form.Label>Discord ID</Form.Label>
                  <Form.Control placeholder="Discord ID" type="text" name="discordId" required value={formData.discordId} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            {/* Batch Selection */}
            <Form.Group className="mb-3  text-black">
              <Form.Label>Select Batch</Form.Label>
              <Form.Select name="batchNo" value={formData.batchNo} onChange={handleChange} required>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row>
              {/* Password & Confirm Password Side by Side */}
              <Col md={6}>
                <Form.Group className="mb-3  text-black" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control placeholder="Password" type="password" name="password" required value={formData.password} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3  text-black">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control placeholder="Confirm Password" type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="w-100">Register</Button>
          </Form>
          <p className="text-center text-black  text-decoration-none">Have an account? <a href="/login">Login here</a></p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;
