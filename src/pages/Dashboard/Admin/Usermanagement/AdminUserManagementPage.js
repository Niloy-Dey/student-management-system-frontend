import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Form,
  InputGroup,
  Spinner,
  Card,
} from "react-bootstrap";
import axios from "axios";
import EditUserModal from "./Modals/EditUserModal";
import CreateUserModal from "./Modals/CreateUserModal";
import DeleteConfirmationModal from "./Modals/DeleteConfirmationModal";
import { PencilSquare, Trash, Plus, Search } from "react-bootstrap-icons";

const AdminUserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/delete-user/${deleteUserId}`);
      setUsers(users.filter((user) => user._id !== deleteUserId));
      setShowDeleteModal(false);
    } catch (error) {
      setError("Error deleting user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container  style={{ maxWidth: "1000px" }}  className="mt-4 pt-4">
      <h2 className="mb-4 text-center">User Management</h2>
      <Card className="shadow-lg p-4">
        {/* Search & Create User Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
          <InputGroup className="mb-2 rounded-pill w-100 mb-md-0 w-100 w-md-50">
            {/* <InputGroup.Text>
              <Search />
            </InputGroup.Text> */}
            <Form.Control
              type="text"
              className="rounded-pill w-100 ps-5 m-2"
              placeholder="Search by Username or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Button className="m-2 rounded-pill w-100 py-2" variant="primary" onClick={() => setShowCreateModal(true)}>
            <Plus className="me-2" /> Create New User
          </Button>
        </div>

        {/* Error Message */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="align-middle">
            <thead className="bg-primary text-white">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge bg-${user.role === "admin" ? "danger" : "success"}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                      >
                        <PencilSquare /> Edit
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(user._id)}>
                        <Trash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Modals */}
      <EditUserModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setUsers={setUsers}
      />
      <CreateUserModal showModal={showCreateModal} setShowModal={setShowCreateModal} setUsers={setUsers} />
      <DeleteConfirmationModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default AdminUserManagementPage;
