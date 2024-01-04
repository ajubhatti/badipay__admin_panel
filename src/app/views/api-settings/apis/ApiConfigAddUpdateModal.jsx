import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import { methodType, rechargResponseType } from "app/constants/constant"
import React, { useState } from "react"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { updateApiConfig } from "./store/action"

const ApiConfigAddUpdateModal = ({ show, onHide, type, data }) => {
  console.log({ data })
  const dispatch = useDispatch()

  const [modalData, setModalData] = useState({
    _id: data?._id,
    apiName: data?.apiData?.apiName,
    categoryName: data?.categoryData?.categoryName,
    responseType: data?.responseType,
    method: data?.method,
    requestURL: data?.requestURL,
    requestId: data?.requestId,
    responseStatus: data?.responseStatus,
    responseTransactionId: data?.responseTransactionId,
    responseOperatorId: data?.responseOperatorId,
    responseMessage: data?.responseMessage,
    successValue: data?.successValue,
    failureValue: data?.failureValue,
    pendingValue: data?.pendingValue,
    refundedValue: data?.refundedValue,
    balanceApiURL: data?.balanceApiURL,
    balanceResponseValue: data?.balanceResponseValue,
    checkStatusURL: data?.checkStatusURL,
    checkStatusResponseValue: data?.checkStatusResponseValue,
    isActive: false,
  })

  const handleSaveOrUpdate = async () => {
    if (modalData?._id) {
      dispatch(updateApiConfig(modalData?._id, modalData))
      clearData()
    }
  }

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setModalData({
      _id: "",
      apiName: "",
      apiImage: "",
      responseType: "",
      method: "",
      requestURL: "",
      requestId: "",
      responseStatus: "",
      responseTransactionId: "",
      responseOperatorId: "",
      responseMessage: "",
      successValue: "",
      failureValue: "",
      pendingValue: "",
      refundedValue: "",
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
        <Modal.Title>{data?._id ? "Update" : "Add"} API </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Container>
            <Row className="m-3">
              <Col xs={3} md={3}>
                <Form.Group controlId="formGridApiName">
                  <Form.Label>Api Name</Form.Label>
                  <Form.Control
                    name="apiName"
                    required
                    type="text"
                    placeholder="Enter Api Name"
                    defaultValue={modalData?.apiName}
                    autoFocus
                    disabled
                    onChange={(e) => {
                      setModalData({
                        ...modalData,
                        apiName: e.target.value,
                      })
                    }}
                  />
                </Form.Group>
              </Col>

              <Col xs={3} md={3}>
                <Form.Group controlId="formGridApiName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    name="categoryName"
                    required
                    type="text"
                    placeholder="Enter category Name"
                    defaultValue={modalData?.categoryName}
                    autoFocus
                    disabled
                    onChange={(e) => {
                      setModalData({
                        ...modalData,
                        categoryName: e.target.value,
                      })
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={3} md={3}>
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
                    width={"100%"}
                  />
                </Form.Group>
              </Col>
              <Col xs={3} md={3}>
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
                    width={"100%"}
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
                  <Form.Label>Request ID</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.requestId}
                    type="text"
                    placeholder="Enter Request ID"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        requestId: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
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
              <Col>
                <Form.Group>
                  <Form.Label>Refund Value</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.refundedValue}
                    type="text"
                    placeholder="Enter Pending Value"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        refundedValue: e.target.value,
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
                <Form.Group>
                  <Form.Label>Dispute Request URL</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.disputeRequestURL}
                    type="text"
                    placeholder="Enter Dispute Request URL"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        disputeRequestURL: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Dispute Request Response Value</Form.Label>
                  <Form.Control
                    defaultValue={modalData?.disputeRequestResponseValue}
                    type="text"
                    placeholder="Enter Dispute Request Response Value"
                    disabled={type === "View"}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        disputeRequestResponseValue: e.target.value,
                      })
                    }
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
          <Button type="button" variant="primary" onClick={handleSaveOrUpdate}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default ApiConfigAddUpdateModal
