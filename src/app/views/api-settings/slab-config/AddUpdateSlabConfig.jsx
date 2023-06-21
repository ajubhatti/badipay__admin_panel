import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import { companyService } from "app/services/company.service"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getApiList } from "../apis/store/action"
import { Form } from "react-bootstrap"
import { getServices } from "../services-listing/store/action"
import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import {
  fetchCompanyById,
  getCompanies,
  getCompaniesById,
} from "../company-listing/store/action"
import { createSlab, getSPSlabs } from "./store/action"

const AddUpdateSlabConfig = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { companyList } = useSelector((state) => state.company)
  const { slabDetail } = useSelector((state) => state.SPSlab)

  const [slabValue, setSlabValue] = useState({
    serviceApiId: "",
    serviceId: "",
    operatorId: "",
    SPKey: "",
    serviceProviderName: "",
    serviceProviderDetail: "",
    serviceProviderType: "",
    discountLimit: "",
    isBilling: true,
    businessModel: "",
    providedBy: "",
    isActive: true,
  })

  const [servicesData, setServicesData] = useState([])
  const [selectedValue, setSelectedValue] = useState("")

  // ============================================
  const [apisDDData, setApisDDData] = useState([])
  const [serviceMenuData, setServiceMenuData] = useState([])
  const [operatorMenuData, setOperatorMenuData] = useState([])

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
  // ============================================

  useEffect(() => {
    if (id) {
      setSlabValue({
        serviceApiId: slabDetail?.serviceApiId,
        serviceId: slabDetail?.serviceId,
        operatorId: slabDetail?.operatorId,
        SPKey: slabDetail?.SPKey,
        serviceProviderName: slabDetail?.serviceProviderName,
        serviceProviderDetail: slabDetail?.serviceProviderDetail,
        serviceProviderType: slabDetail?.serviceProviderType,
        discountLimit: slabDetail?.discountLimit,
        isBilling: slabDetail?.isBilling,
        businessModel: slabDetail?.referenceApis,
        providedBy: slabDetail?.providedBy,
        isActive: slabDetail?.isActive,
      })
      setSelectedValue(slabDetail?.serviceId)
    }
  }, [id, slabDetail])

  useEffect(() => {
    dispatch(getApiList())
    dispatch(getServices())
    dispatch(getCompanies())
  }, [dispatch])

  useEffect(() => {
    if (serviceList && serviceList.length > 0) {
      let newService = serviceList.map((service) => ({
        value: service._id,
        label: service.serviceName,
      }))
      setSelectedValue(newService[0].id)
      setServicesData(newService)
    }
  }, [serviceList])

  const handleClose = () => {
    navigate("/api-setting/operator-slab-setting")
  }

  const clearData = () => {
    setSlabValue({
      companyName: "",
      mobileAppCode: "",
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

  useEffect(() => {
    if (id) {
      dispatch(getCompaniesById(id))
    }
    return () => {
      clearData()
      dispatch(fetchCompanyById({}))
    }
  }, [dispatch, id])

  const handleSubmit = async () => {
    // if (id) {
    //     await companyService.updateCompany(id, slabValue).then((res) => {
    //         handleClose()
    //     })
    // } else {
    //     await companyService.addCompany(slabValue).then((res) => {
    //         handleClose()
    //     })
    // }
    dispatch(
      createSlab(slabValue, (cb) => {
        dispatch(getSPSlabs())
        handleClose()
      })
    )
  }

  return (
    <div className="container">
      <div className="">
        <Form>
          <Form.Group controlId="formGridServic" className="m-2">
            <Form.Label>Api</Form.Label>
            <ReactSelect
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

          <Form.Group controlId="formGridOperatorName" className="m-2">
            <Form.Label>Operator name provide by api</Form.Label>
            <Form.Control
              defaultValue={slabValue.companyName}
              type="text"
              placeholder="Enter Operator Name"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  serviceProviderName: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridMobileCode" className="m-2">
            <Form.Label>Operator Api Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Operator Api Code"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  SPKey: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorDetail" className="m-2">
            <Form.Label>Operator Detail</Form.Label>
            <Form.Control
              defaultValue={slabValue?.companyDetail}
              type="textarea"
              placeholder="Enter Company Detail"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  serviceProviderDetail: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorDetail" className="m-2">
            <Form.Label>Operator Type</Form.Label>
            <Form.Control
              defaultValue={slabValue?.companyDetail}
              type="textarea"
              placeholder="Enter Company Detail"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  serviceProviderType: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorDetail" className="m-2">
            <Form.Label>Discount Limit</Form.Label>
            <Form.Control
              defaultValue={slabValue?.companyDetail}
              type="textarea"
              placeholder="Enter Company Detail"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  discountLimit: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorIsActive" className="m-2">
            <Form.Label>Is Billing</Form.Label>
            <Form.Check
              type="switch"
              checked={slabValue?.isActive || false}
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  isBilling: e.target.checked,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorDetail" className="m-2">
            <Form.Label>Business Model</Form.Label>
            <Form.Control
              defaultValue={slabValue?.companyDetail}
              type="textarea"
              placeholder="Enter Company Detail"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  businessModel: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorDetail" className="m-2">
            <Form.Label>Provided By</Form.Label>
            <Form.Control
              defaultValue={slabValue?.companyDetail}
              type="textarea"
              placeholder="Enter Company Detail"
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  providedBy: e.target.value,
                })
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridOperatorIsActive" className="m-2">
            <Form.Label>Is Active</Form.Label>

            <Form.Check
              type="switch"
              checked={slabValue?.isActive || false}
              onChange={(e) => {
                setSlabValue({
                  ...slabValue,
                  isActive: e.target.checked,
                })
              }}
            />
          </Form.Group>

          <div className="m-2">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              variant="outlined"
              color="primary"
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default AddUpdateSlabConfig
