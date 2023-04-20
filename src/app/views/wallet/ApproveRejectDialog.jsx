import { walletServices } from "app/services/wallet.service"
import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import { async } from "rxjs"

const ApproveRejectDialog = ({ show, onHide, message, id, handleSave }) => {
  const [modalData, setModalData] = useState({
    password: "",
    reason: "",
  })

  const [error, setError] = useState({})
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  const submitSave = (data) => {
    if (!modalData.password) {
      setError({ type: "error", message: "Please enter your password" })
    } else {
      handleSave(data)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Are you want to {message}? </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Please Enter Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Password"
              autoFocus
              onChange={(e) => {
                setError({})
                setModalData({
                  ...modalData,
                  password: e.target.value,
                })
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
            <span className="danger">{error.message}</span>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reason for {message}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) =>
                setModalData({
                  ...modalData,
                  reason: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => submitSave(modalData)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ApproveRejectDialog
