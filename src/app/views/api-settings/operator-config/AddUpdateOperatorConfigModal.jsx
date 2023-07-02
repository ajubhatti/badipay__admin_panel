import React, { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { editOperatorConfig } from "./store/action"

const AddUpdateOperatorConfigModal = ({
  show,
  onHide,
  type,
  data,
  fetchRefreshData,
}) => {
  const dispatch = useDispatch()

  const [slabValue, setSlabValue] = useState({
    apiCode: "",
    isActive: true,
  })

  useEffect(() => {
    if (Object.keys(data).length)
      setSlabValue({
        apiCode: data?.apiCode || "",
        isActive: data?.isActive,
      })
  }, [data])

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setSlabValue({
      apiCode: "",
      isActive: true,
    })
  }

  const handleSaveOrUpdate = async () => {
    if (data?._id) {
      dispatch(
        editOperatorConfig(data?._id, slabValue, (cbData) => {
          fetchRefreshData()
          clearData()
          toast.success(cbData?.message)
        })
      )
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{data._id ? "Update" : "Add"} Operator </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formGridServic" className="mb-3">
            <Form.Label column sm="4">
              Api
            </Form.Label>
            <Col sm="8">
              <div className="ms-1">{data?.apiData?.apiName}</div>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formGridServic" className="mb-3">
            <Form.Label column sm="4">
              Services
            </Form.Label>
            <Col sm="8">
              <div className="ms-1">{data?.serviceData?.serviceName}</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGridServic" className="mb-3">
            <Form.Label column sm="4">
              Operator
            </Form.Label>
            <Col sm="8">
              <div className="ms-1">{data?.operatorData?.operatorName}</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formGridMobileCode" className="mb-3">
            <Form.Label column sm="4">
              Operator Code
            </Form.Label>
            <Col sm="8">
              <Form.Control
                size="sm"
                value={slabValue?.apiCode}
                type="text"
                placeholder="Enter Operator Code"
                onChange={(e) => {
                  setSlabValue({
                    ...slabValue,
                    apiCode: e.target.value,
                  })
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formGridOperatorIsActive"
          >
            <Form.Label column sm="4">
              Is Active
            </Form.Label>
            <Col sm="8">
              <Form.Check
                type="switch"
                checked={slabValue?.isActive}
                onChange={(e) => {
                  setSlabValue({
                    ...slabValue,
                    isActive: e.target.checked,
                  })
                }}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        {type !== "View" && (
          <Button type="button" variant="primary" onClick={handleSaveOrUpdate}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default AddUpdateOperatorConfigModal
