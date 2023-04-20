import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateApis, createApi } from "./store/action"

const AddUpdateApiModal = ({ show, onHide, type, data }) => {
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({
    apiName: "",
    apiDetail: "",
    isActive: false,
  })

  const [error, setError] = useState({})

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) setModalData(data)
  }, [data])

  const handleSubmit = (event) => {
    if (!modalData.apiName) {
      setError({ type: "error", message: "Please enter api name" })
    } else {
      handleSaveOrUpdate()
    }
  }

  const handleSaveOrUpdate = async () => {
    if (modalData?._id) {
      dispatch(updateApis(modalData?._id, modalData))
      clearData()
    } else {
      dispatch(createApi(modalData))
      clearData()
    }
  }

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setModalData({
      apiName: "",
      apiDetail: "",
      apiImage: "",
      isActive: false,
    })
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{data._id ? "Update" : "Add"} API </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formGridApiName">
              <Form.Label>Api Name</Form.Label>
              <Form.Control
                name="apiName"
                required
                type="text"
                placeholder="Enter api name"
                defaultValue={modalData?.apiName}
                autoFocus
                disabled={type === "View"}
                onChange={(e) => {
                  setError({})
                  setModalData({
                    ...modalData,
                    apiName: e.target.value,
                  })
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a api name.
              </Form.Control.Feedback>
              <span className="danger">{error.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridApiDetail">
              <Form.Label>Service Detail</Form.Label>
              <Form.Control
                defaultValue={modalData?.apiDetail}
                as="textarea"
                rows={3}
                placeholder="Enter Api Detail"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    apiDetail: e.target.value,
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
                defaultChecked={modalData?.isActive}
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

export default AddUpdateApiModal
