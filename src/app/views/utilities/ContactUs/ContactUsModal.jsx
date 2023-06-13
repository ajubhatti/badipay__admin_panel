import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createContatUs, updateContactUs } from "../store/action"

const ContactUsModal = ({ show, onHide, type, data }) => {
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({
    description: "",
    isActive: false,
  })

  const [error, setError] = useState({})

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) setModalData(data)
  }, [data])

  const handleSubmit = (event) => {
    if (!modalData.description) {
      setError({ type: "error", message: "Please enter service name" })
    } else {
      handleSaveOrUpdate()
    }
  }

  const handleSaveOrUpdate = async () => {
    if (modalData?._id) {
      dispatch(updateContactUs(modalData?._id, modalData))
      clearData()
    } else {
      dispatch(createContatUs(modalData))
      clearData()
    }
  }

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setModalData({
      description: "",
      isActive: false,
    })
  }

  // const handleSubmit = async () => {
  //   let payload = {
  //     description: bannerDesc,
  //   }
  //   //  let obj = props.userData
  //   //  obj.userName = userName
  //   //  obj.phoneNumber = phone
  //   //  obj.email = email
  //   //  let id = props.userData.id
  //   if (bannerData && bannerData?._id) {
  //     await tickerService.updateContactUs(bannerData?._id, payload).then((res) => {
  //       handleClose()
  //       getAllTicker()
  //     })
  //   } else {
  //     await tickerService.addTicker(payload).then((res) => {
  //       handleClose()
  //       getAllTicker()
  //     })
  //   }
  // }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{data._id ? "Update" : "Add"} API </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group controlId="formGridServiceName" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={modalData?.description}
                type="textarea"
                placeholder="Enter description"
                disabled={type === "View"}
                autoFocus
                onChange={(e) => {
                  setModalData({
                    ...modalData,
                    description: e.target.value,
                  })
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
              <span className="danger">{error.message}</span>
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

export default ContactUsModal
