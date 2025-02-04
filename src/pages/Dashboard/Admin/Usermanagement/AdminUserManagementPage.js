import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditUserModal from './Modals/EditUserModal';  // Import the modal component
import CreateUserModal from './Modals/CreateUserModal';
import DeleteConfirmationModal from './Modals/DeleteConfirmationModal';

const AdminUserManagementPage = () => {
    const [users, setUsers] = useState([]);  // Default as empty array
    const [showCreateModal, setShowCreateModal] = useState(false);  // State for Create Modal
    const [showEditModal, setShowEditModal] = useState(false);  // State for Edit Modal
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch the list of users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users');
                setUsers(response.data);  // Directly use response.data if it's an array
                setLoading(false);
            } catch (error) {
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const handleDeleteClick = (userId) => {
        setDeleteUserId(userId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/delete-user/${deleteUserId}`);
            setUsers(users.filter(user => user._id !== deleteUserId));
        } catch (error) {
            setError('Error deleting user');
        }
    };

    // Filter users based on search term
    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="mt-4">
            <h1 className="mb-4">User Management</h1>

            {/* Search Bar */}
            <Form.Control
                type="text"
                placeholder="Search by Username or Email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
            />

            {/* Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Loading Spinner */}
            {loading ? (
                <div className="d-flex justify-content-center">
                    <span className="spinner-border spinner-border-lg" />
                </div>
            ) : (
                <>
                    {/* Users Table */}
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowEditModal(true);  // Show Edit Modal
                                                }}
                                            >
                                                Edit
                                            </Button>{' '}
                                            <Button variant="danger" onClick={() => handleDeleteClick(user._id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* Action Buttons */}
                    <Button
                        variant="primary"
                        className="mb-3"
                        onClick={() => setShowCreateModal(true)}  // Show Create Modal
                    >
                        Create New User
                    </Button>
                </>
            )}

            {/* Modal for Editing User */}
            <EditUserModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                setUsers={setUsers}
            />
            {/* Modal for Create User */}
            <CreateUserModal
                showModal={showCreateModal}  // Use the Create Modal state
                setShowModal={setShowCreateModal}  // Handle Create Modal close
                setUsers={setUsers}
            />
            <DeleteConfirmationModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    );
};

export default AdminUserManagementPage;
