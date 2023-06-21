import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { createCompany, editCompany } from "./store/action"

const AddUpdateCompanyModal = ({ show, onHide, type, data }) => {
  const dispatch = useDispatch()

  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const [apiArray, setApiArray] = useState([])
  const [servicesData, setServicesData] = useState([])
  const [companyData, setCompanyData] = useState({
    companyName: "",
    companyDetail: "",
    image: "",
    isActive: true,
    isVisible: true,
    providerType: "",
    minAmount: "",
    maxAmount: "",
    referenceApis: [],
  })

  useEffect(() => {
    if (data._id) {
      if (data && Object.keys(data).length !== 0) setCompanyData(data)

      const arrWithColor = data?.referenceApis?.map((object) => {
        return {
          ...object,
          failureLimit: object.failureLimit || 1,
          isActive: object.isActive || false,
          pendingLimit: object.pendingLimit || 0,
          priority: object.priority || 0,
          totalPending: object.totalPending || 0,
        }
      })

      setApiArray(arrWithColor)
    }
  }, [data])

  useEffect(() => {
    if (!data?.referenceApis) {
      const arrWithColor = apisList.map((object) => {
        return {
          ...object,
          failureLimit: 1,
          isActive: false,
          pendingLimit: 0,
          priority: 0,
          totalPending: 0,
        }
      })

      setApiArray(arrWithColor)
    }
  }, [apisList, data?.referenceApis])

  const handleSaveOrUpdate = async () => {
    companyData.referenceApis = apiArray
    if (companyData?._id) {
      dispatch(editCompany(companyData?._id, companyData))
      clearData()
    } else {
      dispatch(createCompany(companyData))
      clearData()
    }
  }

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setCompanyData({
      companyName: "",

      companyDetail: "",
      image: "",
      isActive: true,
      isVisible: true,
      providerType: "",
      minAmount: "",
      maxAmount: "",
      referenceApis: [],
    })
  }

  // =================================================================

  useEffect(() => {
    if (serviceList && serviceList.length > 0) {
      let newService = serviceList.map((service) => ({
        value: service._id,
        label: service.serviceName,
      }))
      if (!data._id) {
        setCompanyData({
          ...companyData,
          providerType: newService[0].value,
        })
      }
      setServicesData(newService)
    }
  }, [serviceList, data, companyData])

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{data._id ? "Update" : "Add"} Company </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formGridOperatorName" className="m-2">
            <Form.Label>Operator Name</Form.Label>
            <Form.Control
              // value={companyData?.companyName}
              defaultValue={companyData.companyName}
              type="text"
              placeholder="Enter Operator Name"
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  companyName: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorDetail" className="m-2">
            <Form.Label>Operator Detail</Form.Label>
            <Form.Control
              // value={companyData?.companyDetail}
              defaultValue={companyData?.companyDetail}
              type="textarea"
              placeholder="Enter Company Detail"
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  companyDetail: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorIsActive" className="m-2">
            <Form.Label>Is Active</Form.Label>

            <Form.Check
              type="switch"
              checked={companyData?.isActive || false}
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  isActive: e.target.checked,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorIsVisible" className="m-2">
            <Form.Label>Is Visible</Form.Label>
            <Form.Check
              type="switch"
              checked={companyData?.isVisible || false}
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  isVisible: e.target.checked,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridProviderType" className="m-2">
            <Form.Label>Provider Type</Form.Label>
            <ReactSelect
              title={"Provider Type"}
              handleChange={(e) => {
                // setSelectedValue(e)
                setCompanyData({
                  ...companyData,
                  providerType: e,
                })
              }}
              selectedValue={companyData?.providerType}
              options={servicesData}
            />
          </Form.Group>

          <Form.Group controlId="formGridMinAmount" className="m-2">
            <Form.Label>Min Amount</Form.Label>
            <Form.Control
              // value={companyData?.minAmount}
              defaultValue={companyData?.minAmount}
              type="text"
              placeholder="Enter min amount"
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  minAmount: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridMaxAmount" className="m-2">
            <Form.Label>Max Amount</Form.Label>
            <Form.Control
              // value={companyData?.maxAmount}
              defaultValue={companyData?.maxAmount}
              type="text"
              placeholder="Enter max amount"
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  maxAmount: e.target.value,
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

export default AddUpdateCompanyModal
