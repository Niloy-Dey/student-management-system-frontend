import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import AuthContext from "../context/AuthContext"; // Import Auth Context
import logo from '../assets/logo.png'
const NavigationBar = () => {
    const { user, logout } = useContext(AuthContext); // Get user data & logout function

    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Container style={{ maxWidth: "1400px" }} className="px-5" fluid>
                {/* ✅ Brand Name */}
                <Navbar.Brand as={Link} to="/" className="text-white fw-bold fs-4">
                    <img src={logo} alt="Student Management System Logo" className="img-fluid" style={{ width: "150px", height: "100px" }} />
                </Navbar.Brand>


                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="text-white fw-semibold">
                            Home
                        </Nav.Link>

                        {!user ? (
                            <>
                                {/* <Nav.Link as={Link} to="/login" className="text-white fw-semibold">
                                    Login
                                </Nav.Link> */}
                                <Nav.Link as={Link} to="/register" className="text-white fw-semibold">
                                    Register
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                               

                                {/* ✅ Role-based Dashboard Buttons */}
                                {user.role === "Student" && (
                                    <Button
                                        as={Link}
                                        to="/student-dashboard"
                                        variant="outline-light"
                                        className="ms-2"
                                    >
                                        Student Dashboard
                                    </Button>
                                )}

                                {user.role === "TeamLeader" && (
                                    <Button
                                        as={Link}
                                        to="/team-leader/dashboard"
                                        variant="outline-light"
                                        className="ms-2"
                                    >
                                        Leader Dashboard
                                    </Button>
                                )}

                                {user.role === "Advisor" && (
                                    <Button
                                        as={Link}
                                        to="/advisor-dashboard"
                                        variant="outline-light"
                                        className="ms-2"
                                    >
                                        Advisor Dashboard
                                    </Button>
                                )}

                                {user.role === "Admin" && (
                                    <Button
                                        as={Link}
                                        to="/admin/dashboard"
                                        variant="outline-light"
                                        className="ms-2"
                                    >
                                        Admin Dashboard
                                    </Button>
                                )}



                                 {/* ✅ Profile Dropdown */}
                                 <NavDropdown
                                    title={<span className="text-white">{`${user.firstName} (${user.batchNo})`}</span>}
                                    id="profile-dropdown"
                                    align="end"
                                    className="fw-semibold bg-dark "
                                >

                                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/notifications">Notifications</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout} className="text-danger">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
