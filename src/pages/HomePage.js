// src/pages/HomePage.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './css/homePage.css'
import logo from '../assets/logo.png'
const HomePage = () => {
  return (
    <>
      <header className="bg-dark text-white py-5">
        <Container style={{ maxWidth: "1400px" }}>
          <h1 className="text-center pt-5 fw-bold">Student Management System</h1>
          <p className="text-center lead">
            Empowering education with seamless management and tracking tools.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/profile">
              <Button variant="light" className="mx-2">View Profile</Button>
            </Link>
            <Link to="/allStudentLeader">
              <Button variant="outline-light" className="mx-2">Leaderboard</Button>
            </Link>
            <Link to="/meetings" className='pb-5'>
              <Button variant="light" className="mx-2">View Meetings</Button>
            </Link>
          </div>
        </Container>
      </header>







      <main className="py-5 my-5 bg-light">
        <Container style={{ maxWidth: "1400px" }} className="px-5"> {/* Increased width */}
          <h2 className="text-center mb-4">Key Features</h2>
          <Row>
            {/* Student Profiles */}
            <Col md={4}>
              <Card className="shadow-sm m-2 text-black position-relative border-0 overflow-hidden">
                <div className="card-bg" style={{ backgroundImage: `url('https://stradaeducation.org/wp-content/uploads/2018/01/crisis-scaled-1.jpeg')` }}></div>
                <Card.Body className="position-relative z-1 text-center">
                  <Card.Title className="fw-bold text-black fs-4">Student Profiles</Card.Title>
                  <Card.Text className="mb-3 fw-bold">
                    Manage and view detailed student profiles, progress, and more.
                  </Card.Text>
                  <Link to="/profile">
                    <Button variant="light" className="fw-bold">Go to Profiles</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Leaderboard */}
            <Col md={4}>
              <Card className="shadow-sm m-2 text-white position-relative border-0 overflow-hidden">
                <div className="card-bg" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYGw1wvwqWUqbcG3fcnzJdl5g9eHK6UP_1Pw&s')` }}></div>
                <Card.Body className="position-relative z-1 text-center">
                  <Card.Title className="fw-bold fs-4 text-black">Leaderboard</Card.Title>
                  <Card.Text className="mb-3 fw-bold">
                    Stay motivated by tracking top performers in real-time.
                  </Card.Text>
                  <Link to="/allStudentLeader">
                    <Button variant="light" className="fw-bold">View Leaderboard</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            {/* Meetings */}
            <Col md={4}>
              <Card className="shadow-sm m-2 text-white position-relative border-0 overflow-hidden">
                <div className="card-bg" style={{ backgroundImage: `url('https://talerang.com/wp-content/uploads/2018/06/Ace-your-meetings.jpg')` }}></div>
                <Card.Body className="position-relative z-1 text-center">
                  <Card.Title className="fw-bold fs-4 text-black">Meetings</Card.Title>
                  <Card.Text className="mb-3 fw-bold">
                    View and manage your upcoming meetings and schedules effortlessly.
                  </Card.Text>
                  <Link to="/meetings">
                    <Button variant="light" className="fw-bold">View Meetings</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>







      <footer className="bg-dark py-5  text-white text-center py-4 border-top border-light">
        <Container style={{ maxWidth: "1400px" }}>
          <Row className="align-items-center">
            {/* Branding and Copyright */}
            <Col md={4} className="mb-3 mb-md-0">
              <img src={logo} alt="Student Management System Logo" className="img-fluid" style={{ width: "150px", height: "100px" }} />
              {/* <h5 className="fw-bold fs-6 text-primary">Student Management System</h5> */}
            </Col>

            {/* Navigation Links */}
            <Col md={4} className="mb-3 mb-md-0 text-start">
              <ul className="list-unstyled">
                <li>
                  <Link to="/about" className="text-light fw-medium mx-2 text-decoration-none d-inline-block link-hover">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-light fw-medium mx-2 text-decoration-none d-inline-block link-hover">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-light fw-medium mx-2 text-decoration-none d-inline-block link-hover">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-light fw-medium mx-2 text-decoration-none d-inline-block link-hover">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </Col>


            {/* Social Media Links */}
            <Col md={4}>
              <div className="d-grid gap-3">
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4 bg-secondary d-flex align-items-center justify-content-center rounded p-3">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4 bg-secondary d-flex align-items-center justify-content-center rounded p-3">
                    <FaTwitter />
                  </a>
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4 bg-secondary d-flex align-items-center justify-content-center rounded p-3">
                    <FaLinkedin />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light fs-4 bg-secondary d-flex align-items-center justify-content-center rounded p-3">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </Col>

          </Row>

        </Container>
        <hr />
        <Container>
          <Row>
            <p className="small pt-3 mb-0">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default HomePage;
