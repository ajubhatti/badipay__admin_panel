import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const ApprovalDialog = ({ show, onHide, message, id, handleSave }) => {
    const [modalData, setModalData] = useState({
        password: '',
        reason: '',
        amount: 0,
    })

    const [error, setError] = useState({})
    const [validated, setValidated] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)
    }
    const submitSave = (type, data) => {
        if (!modalData.password) {
            setError({ type: 'error', message: 'Please enter your password' })
        } else {
            handleSave({ type, data })
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure? </Modal.Title>
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
                        <div className="d-flex">
                            <div className="mr-3">
                                <Form.Check
                                    type="checkbox"
                                    id={`reverse-checkbox`}
                                    className="mr-6"
                                    onChange={(e) =>
                                        setIsChecked(e.target.checked)
                                    }
                                />
                            </div>

                            <Form.Label className="ml-3">
                                Are you want to deduct amount?
                            </Form.Label>
                        </div>

                        {isChecked && (
                            <Form.Control
                                type="text"
                                placeholder="Enter amount"
                                onChange={(e) => {
                                    setError({})
                                    setModalData({
                                        ...modalData,
                                        amount: e.target.value,
                                    })
                                }}
                            />
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description </Form.Label>
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
                <Button
                    variant="primary"
                    onClick={() => submitSave('approve', modalData)}
                >
                    Approve
                </Button>
                <Button
                    variant="primary"
                    onClick={() => submitSave('reject', modalData)}
                >
                    Reject
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApprovalDialog
