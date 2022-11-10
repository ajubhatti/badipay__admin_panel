import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmModal = (props) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = () => {
        setIsDeleting(true);
        props.handleDelete();
    }

    const handleClose = () => {
        props.onCloseConfirmModal();
    };

    return (
        <Modal
            show={props.isShowConfirmModal}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    {props.description}
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>No</Button>
                <Button variant="primary" disabled={isDeleting ? true : false} onClick={handleDelete}>{isDeleting ? "Deleting..." : "Yes"}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal;