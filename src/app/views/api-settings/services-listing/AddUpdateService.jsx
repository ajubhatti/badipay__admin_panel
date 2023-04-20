import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form } from "react-bootstrap"
import {
  createService,
  fetchServiceById,
  getServicesById,
  editService,
} from "../services-listing/store/action"

const AddUpdateService = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { singleService } = useSelector((state) => state.servicesList)
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    serviceDetail: "",
    title: "",
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      setServiceData({
        serviceName: singleService.serviceName,
        serviceDetail: singleService.serviceDetail,
        isActive: singleService.isActive,
        title: singleService.title,
      })
    }
  }, [id, singleService])

  useEffect(() => {
    if (id) {
      dispatch(getServicesById(id))
    }
    return () => {
      clearData()
      dispatch(fetchServiceById({}))
    }
  }, [dispatch, id])

  const handleClose = () => {
    navigate("/api-setting/service")
  }

  const clearData = () => {
    setServiceData({
      serviceName: "",
      serviceDetail: "",
      isActive: true,
    })
  }

  const handleSubmit = async () => {
    if (id) {
      dispatch(editService(id, serviceData))
      clearData()
      handleClose()
    } else {
      dispatch(createService(serviceData))
      clearData()
      handleClose()
    }
  }

  return (
    <div className="container">
      <div className="container-fluid w-100 mt-3">
        <div className="row mt-3">
          <div className="col-lg-12">
            <h2 className="main-heading">{id ? "Update" : "Add"} Service</h2>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <Form>
                  <Form.Group controlId="formGridServiceName" className="m-2">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      value={serviceData?.serviceName}
                      type="text"
                      placeholder="Enter Service Name"
                      onChange={(e) => {
                        setServiceData({
                          ...serviceData,
                          serviceName: e.target.value,
                        })
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridServiceDetail" className="m-2">
                    <Form.Label>Service Detail</Form.Label>
                    <Form.Control
                      value={serviceData?.serviceDetail}
                      as="textarea"
                      placeholder="Enter Service Detail"
                      onChange={(e) => {
                        setServiceData({
                          ...serviceData,
                          serviceDetail: e.target.value,
                        })
                      }}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridServiceDetail" className="m-2">
                    <Form.Label>Service Title</Form.Label>
                    <Form.Control
                      value={serviceData?.title}
                      type="text"
                      placeholder="Enter Service Title"
                      onChange={(e) => {
                        setServiceData({
                          ...serviceData,
                          title: e.target.value,
                        })
                      }}
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formGridServiceIsActive"
                    className="m-2"
                  >
                    <Form.Label>Is Active</Form.Label>

                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      checked={serviceData?.isActive}
                      onChange={(e) => {
                        setServiceData({
                          ...serviceData,
                          isActive: e.target.checked,
                        })
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button
                      onClick={() => handleClose()}
                      color="secondary"
                      className="m-2"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleSubmit()}
                      color="primary"
                      className="m-2"
                    >
                      Save
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUpdateService
