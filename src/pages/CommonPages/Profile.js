import React, { useContext } from "react";
import { Container, Card, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <h3 className="text-center">No user data found. Please login.</h3>
      </Container>
    );
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Row>
              {/* Profile Avatar Section */}
              <Col md={4} className="text-center">
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    margin: "0 auto",
                  }}
                >
                  {getInitials(user.username)}
                </div>
                <h5 className="mt-3">{user.name}</h5>
                <p className="text-muted">{user.role}</p>
              </Col>

              {/* User Details Section */}
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Email:</strong> {user.email}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Phone:</strong> {user.phone || "N/A"}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Batch:</strong> {user.batchNo}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Discord ID:</strong> {user.discordId}
                  </ListGroup.Item>
                </ListGroup>

                {/* Action Buttons */}
                <div className="mt-4 d-flex justify-content-between">
                  <Button variant="primary">Edit Profile</Button>
                  <Button variant="danger">Change Password</Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
