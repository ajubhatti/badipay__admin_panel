import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { createOperator, editOperator } from "./store/action"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const AddUpdateOperatorModal = ({
  show,
  onHide,
  type,
  data,
  getUpdatedData,
}) => {
  const dispatch = useDispatch()

  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const [apiArray, setApiArray] = useState([])
  const [servicesData, setServicesData] = useState([])
  const [companyData, setCompanyData] = useState({
    operatorName: "",
    operatorDetail: "",
    image: "",
    isActive: true,
    isVisible: true,
    providerType: "",
    minAmount: "",
    maxAmount: "",
    referenceApis: [],
    requiredFields: [{ fieldName: "customer no", fieldValue: "customerNo" }],
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
  }, [apisList])

  const handleSaveOrUpdate = async () => {
    companyData.referenceApis = apiArray
    // companyData.requiredFields = inputFields
    console.log({ companyData })
    if (companyData?._id) {
      dispatch(
        editOperator(companyData?._id, companyData, () => {
          getUpdatedData()
        })
      )
      clearData()
    } else {
      dispatch(
        createOperator(companyData, (data) => {
          getUpdatedData()
        })
      )
      clearData()
    }
  }

  const closeModal = () => {
    clearData()
  }

  const clearData = () => {
    onHide()
    setCompanyData({
      operatorName: "",
      operatorDetail: "",
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
      // setSelectedValue(newService[0].value)
      if (!data._id) {
        setCompanyData({
          ...companyData,
          providerType: newService[0].value,
        })
      }
      setServicesData(newService)
    }
  }, [serviceList, data])

  const handleClose = () => {
    clearData()
  }

  const addFields = () => {
    let newfield = { fieldName: "", fieldValue: "" }

    // setInputFields([...inputFields, newfield])
    setCompanyData({
      ...companyData,
      requiredFields: [...companyData.requiredFields, newfield],
    })
  }

  const handleFormChange = (index, event) => {
    let data = [...companyData.requiredFields]
    data[index][event.target.name] = event.target.value
    // setInputFields(data)
    setCompanyData({
      ...companyData,
      requiredFields: data,
    })
  }

  const removeFields = (index) => {
    let data = [...companyData.requiredFields]
    data.splice(index, 1)
    // setInputFields(data)
    setCompanyData({
      ...companyData,
      requiredFields: data,
    })
  }

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
              // value={companyData?.operatorName}
              defaultValue={companyData.operatorName}
              type="text"
              placeholder="Enter Operator Name"
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  operatorName: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorDetail" className="m-2">
            <Form.Label>Operator Detail</Form.Label>
            <Form.Control
              // value={companyData?.operatorDetail}
              defaultValue={companyData?.operatorDetail}
              type="textarea"
              placeholder="Enter Company Detail"
              onChange={(e) => {
                setCompanyData({
                  ...companyData,
                  operatorDetail: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group
            controlId="formGridOperatorIsActive"
            className="m-2 d-flex"
          >
            <Form.Label className="m-2">Is Active</Form.Label>
            <Form.Check
              className="m-2"
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

          <Form.Group
            controlId="formGridOperatorIsVisible"
            className="m-2 d-flex"
          >
            <Form.Label className="m-2">Is Visible</Form.Label>
            <Form.Check
              className="m-2"
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
          <Form.Group controlId="formGridMaxAmount" className="m-2">
            <Form.Label>Required Field</Form.Label>
            {/* <div className="d-flex"> */}
            {companyData.requiredFields.map((input, index) => {
              return (
                <div key={index} className="d-flex">
                  <Form.Control
                    className="m-1"
                    value={input.fieldName}
                    defaultValue={input.fieldName}
                    type="text"
                    name="fieldName"
                    placeholder="Enter field name"
                    onChange={(e) => {
                      handleFormChange(index, e)
                    }}
                  />
                  <Form.Control
                    className="m-1"
                    name="fieldValue"
                    value={input.fieldValue}
                    defaultValue={input.fieldValue}
                    type="text"
                    placeholder="Enter field title"
                    onChange={(e) => {
                      handleFormChange(index, e)
                    }}
                  />
                  <Button
                    size="sm"
                    className="m-1"
                    type="button"
                    variant="secondary"
                    onClick={() => removeFields(index)}
                  >
                    <AiOutlineMinus />
                  </Button>
                </div>
              )
            })}
            {/* </div> */}
            <Button
              size="sm"
              className="m-1"
              type="button"
              variant="primary"
              onClick={addFields}
            >
              <AiOutlinePlus />
            </Button>
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

export default AddUpdateOperatorModal
