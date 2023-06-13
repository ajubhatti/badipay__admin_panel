import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { createSlab, editSPSlab } from "./store/action"

const AddUpdateSlabModal = ({ show, onHide, type, data, fetchRefreshData }) => {
  const dispatch = useDispatch()
  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { companyList } = useSelector((state) => state.company)

  const [slabValue, setSlabValue] = useState({
    serviceApiId: "",
    serviceId: "",
    operatorId: "",
    SPKey: "",
    isBilling: true,
    isActive: true,
  })

  const [apisDDData, setApisDDData] = useState([])
  const [serviceMenuData, setServiceMenuData] = useState([])
  const [operatorMenuData, setOperatorMenuData] = useState([])

  useEffect(() => {
    if (Object.keys(data).length)
      setSlabValue({
        serviceApiId: data?.serviceApiId,
        serviceId: data?.serviceId,
        operatorId: data?.operatorId,
        SPKey: data?.SPKey,
        isBilling: data?.isBilling,
        isActive: data?.isActive,
      })
  }, [data])

  useEffect(() => {
    if (apisList && apisList.length > 0) {
      let newApi = apisList.map((api) => ({
        value: api._id,
        label: api.apiName,
      }))
      setApisDDData(newApi)
    }
  }, [apisList])

  useEffect(() => {
    if (serviceList && serviceList.length > 0) {
      let newService = serviceList.map((service) => ({
        value: service._id,
        label: service.serviceName,
      }))
      setServiceMenuData(newService)
    }
  }, [serviceList])

  useEffect(() => {
    let filteredData = companyList.filter(
      (x) => x.providerType === slabValue.serviceId
    )
    filteredData = filteredData.map((x) => ({
      value: x._id,
      label: x.companyName,
    }))

    setOperatorMenuData(filteredData)
  }, [companyList, slabValue])

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setSlabValue({
      serviceApiId: "",
      serviceId: "",
      operatorId: "",
      SPKey: "",
      isBilling: true,
      isActive: true,
    })
  }

  const handleSaveOrUpdate = async () => {
    console.log({ data, slabValue })
    if (data?._id) {
      dispatch(
        editSPSlab(data?._id, slabValue, (cbData) => {
          console.log({ cbData })
          fetchRefreshData()
          clearData()
          toast.success(cbData?.message)
        })
      )
    } else {
      dispatch(
        createSlab(slabValue, (cbData) => {
          fetchRefreshData()
          clearData()
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
          <Form.Group controlId="formGridServic" className="m-2">
            <Form.Label>Api</Form.Label>
            <ReactSelect
              selectedValue={slabValue?.serviceApiId}
              title={"Apis"}
              handleChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  serviceApiId: e,
                })
              }}
              options={apisDDData}
            />
          </Form.Group>
          <Form.Group controlId="formGridServic" className="m-2">
            <Form.Label>Services</Form.Label>
            <ReactSelect
              selectedValue={slabValue?.serviceId}
              title={"Services"}
              handleChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  serviceId: e,
                })
              }}
              options={serviceMenuData}
            />
          </Form.Group>

          <Form.Group controlId="formGridServic" className="m-2">
            <Form.Label>Operator</Form.Label>
            <ReactSelect
              selectedValue={slabValue?.operatorId}
              title={"Operator"}
              handleChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  operatorId: e,
                })
              }}
              options={operatorMenuData}
            />
          </Form.Group>

          <Form.Group controlId="formGridMobileCode" className="m-2">
            <Form.Label>Operator Code</Form.Label>
            <Form.Control
              value={slabValue?.SPKey}
              type="text"
              placeholder="Enter Operator Code"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  SPKey: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorIsActive" className="m-2">
            <Form.Label>Is Active</Form.Label>
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

export default AddUpdateSlabModal
