import { Modal, Button } from 'react-bootstrap';

const DeleteConfirmationModal = ({ showModal, setShowModal, onConfirm }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this user? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => {
          onConfirm();  // Call the function passed as prop to handle deletion
          setShowModal(false);
        }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteConfirmationModal;
