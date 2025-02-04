import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Using React-Bootstrap Modal

const AddStudentModal = ({ isOpen, onClose, fetchStudents }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        batchId: "",
        advisorId: "",
    });

    const [batches, setBatches] = useState([]);
    const [advisors, setAdvisors] = useState([]);

    // ✅ Fetch batches and advisors on modal open
    useEffect(() => {
        if (isOpen) {
            fetchBatches();
            fetchAdvisors();
        }
    }, [isOpen]);

    // ✅ Fetch batch list
    const fetchBatches = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/batches");
            setBatches(response.data.data);
        } catch (error) {
            console.error("Failed to fetch batches", error);
        }
    };

    // ✅ Fetch advisors (only users who are NOT students)
    const fetchAdvisors = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/advisors");
            setAdvisors(response.data.data);
        } catch (error) {
            console.error("Failed to fetch advisors", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/students/add", formData);
            fetchStudents();
            onClose();
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter first name"
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter last name"
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Enter phone number"
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    {/* Batch Dropdown */}
                    <div className="mb-3">
                        <label htmlFor="batchId" className="form-label">Select Batch</label>
                        <select
                            name="batchId"
                            id="batchId"
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="">Select Batch</option>
                            {batches.map((batch) => (
                                <option key={batch._id} value={batch._id}>
                                    {batch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Advisor Dropdown */}
                    <div className="mb-3">
                        <label htmlFor="advisorId" className="form-label">Select Advisor</label>
                        <select
                            name="advisorId"
                            id="advisorId"
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Select Advisor</option>
                            {advisors.map((advisor) => (
                                <option key={advisor._id} value={advisor._id}>
                                    {advisor.firstName} {advisor.lastName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" variant="primary" className="w-100">
                        Add Student
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddStudentModal;
