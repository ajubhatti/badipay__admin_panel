import { useEffect } from "react"
import { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { serviceCategoryService } from "app/services/serviceCategory.service"

const defaultBankInfo = {
  categoryName: "",
  categoryType: "",
  isActive: true,
}

const ServiceCategoryModal = (props) => {
  const [info, setInfo] = useState(defaultBankInfo)
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    setInfo(props.categoryInfo)
  }, [props.categoryInfo])

  const handleClose = () => {
    props.onCloseModal()
  }

  const handleSaveAndClose = () => {
    setSaveLoading(true)
    if (props.isEdit) {
      serviceCategoryService
        .updateServiceCategory(props.categoryInfo._id, {
          categoryName: info.categoryName,
          isActive: info.isActive,
          categoryType: info.categoryType,
        })
        .then((res) => {
          if (res.status === 200) {
            props.onCloseModal(true)
          }
        })
    } else {
      serviceCategoryService.addServiceCategory(info).then((res) => {
        if (res.status === 200) {
          props.onCloseModal(true)
        }
      })
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInfo((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal
      show={props.isShowModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.isEdit ? "Edit" : "Add"} Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate>
          <Form.Group controlId="formGridServiceName" className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              value={info?.categoryName}
              type="text"
              placeholder="Enter Category Name"
              // disabled={type === "View"}
              autoFocus
              onChange={(e) => {
                setInfo({
                  ...info,
                  categoryName: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridApiIsActive" className="d-flex">
            <Form.Label className="me-2">Is Active</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={info?.isActive}
              // disabled={type === "View"}
              onChange={(e) => {
                setInfo({
                  ...info,
                  isActive: e.target.checked,
                })
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={saveLoading ? true : false}
          onClick={handleSaveAndClose}
        >
          {saveLoading ? "Loading…" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ServiceCategoryModal
