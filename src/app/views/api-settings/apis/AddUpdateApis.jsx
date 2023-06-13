import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form } from "react-bootstrap"
import { createApi, fetchApiById, getApiById, updateApis } from "./store/action"

const AddUpdateApis = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { singleApi } = useSelector((state) => state.apis)
  const [apiData, setApiData] = useState({
    apiName: "",
    apiDetail: "",
    apiImage: "",
    isActive: true,
  })

  useEffect(() => {
    if (id) {
      setApiData({
        apiName: singleApi?.apiName,
        apiDetail: singleApi?.apiDetail,
        isActive: singleApi?.isActive,
        apiImage: singleApi?.apiImage,
      })
    }

    return () => {
      clearData()
      fetchApiById({})
    }
  }, [id, singleApi])

  useEffect(() => {
    if (id) {
      dispatch(getApiById(id))
    }
  }, [dispatch, id])

  const handleClose = () => {
    navigate("/api-setting/api")
  }

  const clearData = () => {
    setApiData({
      apiName: "",
      apiDetail: "",
      apiImage: "",
      isActive: true,
    })
  }

  const handleSubmit = async () => {
    if (id) {
      dispatch(updateApis(id, apiData))
      clearData()
      handleClose()
    } else {
      dispatch(createApi(apiData))
      clearData()
      handleClose()
    }
  }

  return (
    <div className="container">
      <div className="">
        <Form>
          <Form.Group controlId="formGridApiName">
            <Form.Label>Api Name</Form.Label>
            <Form.Control
              value={apiData?.apiName}
              type="text"
              placeholder="Enter Service Name"
              onChange={(e) => {
                setApiData({
                  ...apiData,
                  apiName: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridApiDetail">
            <Form.Label>api Detail</Form.Label>
            <Form.Control
              value={apiData?.apiDetail}
              as="textarea"
              placeholder="Enter Api Detail"
              onChange={(e) => {
                setApiData({
                  ...apiData,
                  apiDetail: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridApiIsActive">
            <Form.Label>Is Active</Form.Label>

            <Form.Check
              type="switch"
              id="custom-switch"
              checked={apiData?.isActive}
              onChange={(e) => {
                setApiData({
                  ...apiData,
                  isActive: e.target.checked,
                })
              }}
            />
          </Form.Group>

          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Save
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default AddUpdateApis
