import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import { methodType, rechargResponseType } from "app/constants/constant"
import React, { useEffect, useState } from "react"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateApis, createApi } from "./store/action"

const AddUpdateApiModal = ({ show, onHide, type, data }) => {
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({
    apiName: "",
    apiDetail: "",
    token: "",
    responseType: "",
    method: "",
    requestURL: "",
    responseStatus: "",
    responseTransactionId: "",
    responseOperatorId: "",
    responseMessage: "",
    successValue: "",
    failureValue: "",
    pendingValue: "",
    balanceApiURL: "",
    balanceResponseValue: "",
    checkStatusURL: "",
    checkStatusResponseValue: "",
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
      token: "",
      responseType: "",
      method: "",
      requestURL: "",
      responseStatus: "",
      responseTransactionId: "",
      responseOperatorId: "",
      responseMessage: "",
      successValue: "",
      failureValue: "",
      pendingValue: "",
      balanceApiURL: "",
      balanceResponseValue: "",
      checkStatusURL: "",
      checkStatusResponseValue: "",
      isActive: false,
    })
  }

  return (
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
            <Row className="m-3">
              <Col xs={6} md={4}>
                <Form.Group controlId="formGridApiName">
                  <Form.Label>Api Name</Form.Label>
                  <Form.Control
                    name="apiName"
                    required
                    type="text"
                    placeholder="Enter Api Name"
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
              <Col xs={12} md={8}>
                <Form.Group controlId="formGridApiDetail">
                  <Form.Label>Api Detail</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.apiDetail}
                    as="textarea"
                    rows={1}
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
            <Row className="m-3">
              <Col>
                <Form.Group>
                  <Form.Label>Token</Form.Label>
                  <Form.Control
                    name="token"
                    defaultValue={modalData?.token}
                    type="text"
                    placeholder="Enter Token"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        token: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Response Type</Form.Label>
                  <ReactSelect
                    isClearable={true}
                    title={"responseType"}
                    placeHolder={"Select Response Type"}
                    handleChange={(e) => {
                      setModalData({
                        ...modalData,
                        responseType: e,
                      })
                    }}
                    options={rechargResponseType}
                    selectedValue={modalData?.responseType}
                    width={300}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Method</Form.Label>
                  <ReactSelect
                    isClearable={true}
                    title={"method"}
                    placeHolder={"Method"}
                    handleChange={(e) => {
                      setModalData({
                        ...modalData,
                        method: e,
                      })
                    }}
                    options={methodType}
                    selectedValue={modalData?.method}
                    width={300}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
                <Form.Group>
                  <Form.Label>Request URL</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.requestURL}
                    type="text"
                    placeholder="Enter Request URL"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        requestURL: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
                <Form.Group>
                  <Form.Label>Response Status</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.responseStatus}
                    type="text"
                    placeholder="Enter Response Status"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        responseStatus: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Response Transaction Id</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.responseTransactionId}
                    type="text"
                    placeholder="Enter Response Transaction Id"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        responseTransactionId: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Response Operator Id</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.responseOperatorId}
                    type="text"
                    placeholder="Enter Response Operator Id"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        responseOperatorId: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Response Message</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.responseMessage}
                    type="text"
                    placeholder="Enter Response Message"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        responseMessage: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
                <Form.Group>
                  <Form.Label>Success Value</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.successValue}
                    type="text"
                    placeholder="Enter Success Value"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        successValue: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Failure Value</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.failureValue}
                    type="text"
                    placeholder="Enter Failure Value"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        failureValue: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Pending Value</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.pendingValue}
                    type="text"
                    placeholder="Enter Pending Value"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        pendingValue: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
                <Form.Group>
                  <Form.Label>Balance Api URL</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.balanceApiURL}
                    type="text"
                    placeholder="Enter Balance Api URL"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        balanceApiURL: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Balance Response Value</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.balanceResponseValue}
                    type="text"
                    placeholder="Enter Balance Response Value"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        balanceResponseValue: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
                <Form.Group>
                  <Form.Label>Check Status URL</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.checkStatusURL}
                    type="text"
                    placeholder="Enter Check Status URL"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        checkStatusURL: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Check Status Response Value</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.checkStatusResponseValue}
                    type="text"
                    placeholder="Enter Check Status Response Value"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        checkStatusResponseValue: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="m-3">
              <Col>
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
              </Col>
            </Row>
          </Container>
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
  )
}

export default AddUpdateApiModal
