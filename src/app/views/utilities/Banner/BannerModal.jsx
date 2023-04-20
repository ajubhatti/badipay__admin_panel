import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
// import { updateApis, createApi } from "./store/action"

const BannerModal = ({ show, onHide, type, data }) => {
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
    // if (modalData?._id) {
    //   dispatch(updateApis(modalData?._id, modalData))
    //   clearData()
    // } else {
    //   dispatch(createApi(modalData))
    //   clearData()
    // }
  }

  //   const handleSubmitBanner = async (e) => {
  //     e.preventDefault()
  //     // Update the formData object

  //     var formData = new FormData()
  //     if (bannerImage) {
  //       formData.append("images", bannerImage)
  //     }
  //     formData.append("description", bannerDesc)
  //     formData.append("fileName", bannerName)

  //     if (bannerData && bannerData?._id) {
  //       if (bannerImage) {
  //         await bannerService
  //           .updateBannerWithImage(bannerData?._id, formData)
  //           .then((res) => {
  //             getAllbanners()
  //             handleClose()
  //           })
  //       } else {
  //         let payload = {}
  //         if (bannerName) {
  //           payload.fileName = bannerName
  //         }
  //         if (bannerDesc) {
  //           payload.description = bannerDesc
  //         }
  //         await bannerService
  //           .updateBanner(bannerData?._id, payload)
  //           .then((res) => {
  //             getAllbanners()
  //             handleClose()
  //           })
  //       }
  //     } else {
  //       await bannerService.uploadBanner(formData).then((res) => {
  //         getAllbanners()
  //         handleClose()
  //       })
  //     }
  //   }

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
          <Modal.Title>{data._id ? "Update" : "Add"} Banner </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Form.Group className="mb-3" controlId="formGridBannerName">
              <Form.Label>Banner Name</Form.Label>
              <Form.Control
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
              <span className="danger">{error.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridBannerDetail">
              <Form.Label>Banner Description</Form.Label>
              <Form.Control
                name="bannerDescription"
                defaultValue={modalData?.bannerDescription}
                as="textarea"
                rows={3}
                placeholder="Enter banner Description"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    bannerDescription: e.target.value,
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

          {/* <div className="register_profile_image">
            <input type="file" onChange={onChangePicture} />
          </div>
          <div className="previewProfilePic align-center">
            {bannerData && bannerData?.img ? (
              <img
                src={`data:image/*;base64,${new Buffer.from(
                  bannerData?.img?.data
                ).toString("base64")}`}
                height={"50%"}
                width={"100%"}
                alt=""
              />
            ) : (
              <img
                height={"50%"}
                width={"100%"}
                className="playerProfilePic_home_tile"
                src={bannerImageUrl && bannerImageUrl}
                alt=""
              ></img>
            )}
          </div> */}
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

export default BannerModal
