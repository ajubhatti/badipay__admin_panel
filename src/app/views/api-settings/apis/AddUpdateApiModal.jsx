import React, { useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
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
      <Modal
        show={show}
        onHide={onHide}
        // fullscreen={"xl-down"}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{data._id ? "Update" : "Add"} API </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate>
            <Container>
              <Row>
                <Col xs={12} md={8}>
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
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group className="mb-3" controlId="formGridApiDetail">
                    <Form.Label>Api Detail</Form.Label>
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
                </Col>
              </Row>
            </Container>

            <Form.Group>
              <Form.Label>Token</Form.Label>

              <Form.Control
                name="token"
                defaultValue={modalData?.token}
                type="text"
                placeholder="Enter token"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    token: e.target.value,
                  })
                }
              />

              <Form.Label>Response Type</Form.Label>
              <Form.Control
                defaultValue={modalData?.responseType}
                type="text"
                placeholder="Enter Response Type"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    responseType: e.target.value,
                  })
                }
              />
              <Form.Label>method</Form.Label>
              <Form.Control
                defaultValue={modalData?.method}
                type="text"
                placeholder="Enter method"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    method: e.target.value,
                  })
                }
              />

              <Form.Label>Request URL</Form.Label>
              <Form.Control
                defaultValue={modalData?.requestURL}
                type="text"
                placeholder="Enter requestURL"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    requestURL: e.target.value,
                  })
                }
              />

              <Form.Label>responseStatus</Form.Label>
              <Form.Control
                defaultValue={modalData?.responseStatus}
                type="text"
                placeholder="Enter responseStatus"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    responseStatus: e.target.value,
                  })
                }
              />

              <Form.Label>responseTransactionId</Form.Label>
              <Form.Control
                defaultValue={modalData?.responseTransactionId}
                type="text"
                placeholder="Enter responseTransactionId"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    responseTransactionId: e.target.value,
                  })
                }
              />

              <Form.Label>responseOperatorId</Form.Label>
              <Form.Control
                defaultValue={modalData?.responseOperatorId}
                type="text"
                placeholder="Enter responseOperatorId"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    responseOperatorId: e.target.value,
                  })
                }
              />

              <Form.Label>responseMessage</Form.Label>
              <Form.Control
                defaultValue={modalData?.responseMessage}
                type="text"
                placeholder="Enter responseMessage"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    responseMessage: e.target.value,
                  })
                }
              />

              <Form.Label>successValue</Form.Label>
              <Form.Control
                defaultValue={modalData?.successValue}
                type="text"
                placeholder="Enter successValue"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    successValue: e.target.value,
                  })
                }
              />

              <Form.Label>failureValue</Form.Label>
              <Form.Control
                defaultValue={modalData?.failureValue}
                type="text"
                placeholder="Enter failureValue"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    failureValue: e.target.value,
                  })
                }
              />

              <Form.Label>balanceApiURL</Form.Label>
              <Form.Control
                defaultValue={modalData?.balanceApiURL}
                type="text"
                placeholder="Enter balanceApiURL"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    balanceApiURL: e.target.value,
                  })
                }
              />

              <Form.Label>balanceResponseValue</Form.Label>
              <Form.Control
                defaultValue={modalData?.balanceResponseValue}
                type="text"
                placeholder="Enter balanceResponseValue"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    balanceResponseValue: e.target.value,
                  })
                }
              />

              <Form.Label>checkStatusURL</Form.Label>
              <Form.Control
                defaultValue={modalData?.checkStatusURL}
                type="text"
                placeholder="Enter checkStatusURL"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    checkStatusURL: e.target.value,
                  })
                }
              />

              <Form.Label>checkStatusResponseValue</Form.Label>
              <Form.Control
                defaultValue={modalData?.checkStatusResponseValue}
                type="text"
                placeholder="Enter checkStatusResponseValue"
                disabled={type === "View"}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    checkStatusResponseValue: e.target.value,
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
