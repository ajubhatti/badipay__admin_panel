import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createService, editService } from "./store/action"
// import { updateApis, createApi } from "./store/action"

const AddUpdateServiceModal = ({ show, onHide, type, data }) => {
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({
    serviceName: "",
    serviceDetail: "",
    title: "",
    image: "",
    isActive: false,
    icon: "",
  })

  const [error, setError] = useState({})

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) setModalData(data)
  }, [data])

  const handleSubmit = (event) => {
    if (!modalData.serviceName) {
      setError({ type: "error", message: "Please enter service name" })
    } else {
      handleSaveOrUpdate()
    }
  }

  const handleSaveOrUpdate = async () => {
    if (modalData?._id) {
      dispatch(editService(modalData?._id, modalData))
      clearData()
    } else {
      dispatch(createService(modalData))
      clearData()
    }
  }

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setModalData({
      serviceName: "",
      serviceDetail: "",
      title: "",
      image: "",
      isActive: false,
    })
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{data._id ? "Update" : "Add"} Service </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group controlId="formGridServiceName" className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                value={modalData?.serviceName}
                type="text"
                placeholder="Enter Service Name"
                disabled={type === "View"}
                autoFocus
                onChange={(e) => {
                  setModalData({
                    ...modalData,
                    serviceName: e.target.value,
                  })
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a service name.
              </Form.Control.Feedback>
              <span className="danger">{error.message}</span>
            </Form.Group>

            <Form.Group controlId="formGridServiceDetail" className="mb-3">
              <Form.Label>Service Detail</Form.Label>
              <Form.Control
                value={modalData?.serviceDetail}
                as="textarea"
                placeholder="Enter Service Detail"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    serviceDetail: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formGridServiceDetail" className="mb-3">
              <Form.Label>Service Title</Form.Label>
              <Form.Control
                value={modalData?.title}
                type="text"
                placeholder="Enter Service Title"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formGridServiceDetail" className="mb-3">
              <Form.Label>Service Icon</Form.Label>
              <Form.Control
                value={modalData?.icon}
                type="text"
                placeholder="Enter Service Icon"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    icon: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formGridApiIsActive" className="d-flex">
              <Form.Label className="me-2">Is Active</Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={modalData?.isActive}
                disabled={type === "View"}
                onChange={(e) => {
                  setModalData({
                    ...modalData,
                    isActive: e.target.checked,
                  })
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          {type !== "View" && (
            <Button type="button" variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddUpdateServiceModal
