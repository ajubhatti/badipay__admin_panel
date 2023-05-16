import React, { useEffect, useState } from "react"
import { Button, Form, Image, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createBanner, updateBanner, uploadImage } from "../store/action"

const BannerModal = ({ show, onHide, type, data }) => {
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({
    path: "",
    description: "",
    isActive: true,
  })

  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState({})
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) setModalData(data)
  }, [data])

  const handleSaveOrUpdate = async () => {
    console.log({ modalData })
    if (modalData?._id) {
      dispatch(updateBanner(modalData?._id, modalData))
      clearData()
    } else {
      dispatch(createBanner(modalData))
      clearData()
    }
  }

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setModalData({
      path: "",
      description: "",
      isActive: false,
    })
  }

  const onImageChange = async (event) => {
    setImageLoading(true)
    if (event.target.files && event.target.files[0]) {
      var formData = new FormData()
      formData.append("file", event.target.files[0])
      dispatch(
        uploadImage(formData, (data) => {
          if (data.status === 200) {
            setImageUrl(data.data)
            setModalData({ ...modalData, path: data.data })
            setImageLoading(false)
          } else {
            setImageLoading(false)
          }
          console.log(data)
        })
      )
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{data._id ? "Update" : "Add"} Banner </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formGridBannerName">
              <Form.Label>Banner Name</Form.Label>
              {/* <Form.Control
                name="bannerName"
                required
                type="text"
                placeholder="Enter banner name"
                defaultValue={modalData?.bannerName}
                autoFocus
                disabled={type === "View"}
                onChange={(e) => {
                  setError({})
                  setModalData({
                    ...modalData,
                    bannerName: e.target.value,
                  })
                }}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a banner name.
              </Form.Control.Feedback>
              <span className="danger">{error.message}</span> */}

              <Form.Control
                type="file"
                onChange={(e) => onImageChange(e)}
                className="mb-3"
              />

              {imageUrl && <Image src={imageUrl} fluid />}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridBannerDetail">
              <Form.Label>Banner Description</Form.Label>
              <Form.Control
                name="description"
                defaultValue={modalData?.description}
                as="textarea"
                rows={3}
                placeholder="Enter banner Description"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    description: e.target.value,
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
            <Button
              type="button"
              variant="primary"
              onClick={handleSaveOrUpdate}
            >
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BannerModal
