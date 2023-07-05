import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import React, { useEffect, useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import {
  editOperatorConfig,
  getOperatorConfigList,
} from "../operator-config/store/action"
import { getAllOperators } from "../operator-list/store/action"
import { getServices } from "../services-listing/store/action"

const OperatorSwitchingNew = () => {
  const dispatch = useDispatch()
  const { serviceList } = useSelector((state) => state.servicesList)
  const { operatorList } = useSelector((state) => state.operators)
  const { operatorConfigList } = useSelector((state) => state.operatorConfig)

  const [searchData, setSearchData] = useState({})
  const [serviceMenuData, setServiceMenuData] = useState([])
  const [operatorMenuData, setOperatorMenuData] = useState([])
  const [operatorConfigData, setOperatorConfigData] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  const [payload, setPayload] = useState({
    serviceId: "",
  })

  useEffect(() => {
    if (searchData?.providerType && searchData?.operator && isSubmit) {
      let configList = operatorConfigList.map((x) => ({
        _id: x._id,
        failureLimit: x.failureLimit,
        pendingLimit: x.pendingLimit,
        totalPending: x.totalPending,
        priority: x.priority,
        isActive: x.isActive,
        apiName: x?.apiData?.apiName,
      }))
      setOperatorConfigData(configList)
    }
  }, [searchData, operatorConfigList, isSubmit])

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
    if (searchData?.providerType && operatorList && operatorList.length) {
      let filterOperator = operatorList.map((x) => ({
        value: x._id,
        label: x.operatorName,
      }))
      setOperatorMenuData(filterOperator)
    }
  }, [operatorList, searchData.providerType])

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  useEffect(() => {
    const fetchOperator = () => {
      dispatch(getAllOperators(payload))
    }
    fetchOperator()
  }, [payload, dispatch])

  const handleSearch = () => {
    setIsSubmit(true)
    if (searchData?.providerType && searchData?.operator) {
      let pyld = {
        providerType: searchData.providerType,
        operator: searchData.operator,
      }
      dispatch(getOperatorConfigList(pyld))
    }
  }

  const handleOnChange = async (index, data, e) => {
    const { name, value, checked } = e.target

    let datas = [...operatorConfigData]
    datas[index][name] = name === "isActive" ? checked : value
    setOperatorConfigData(datas)

    let payload = {
      [name]: name === "isActive" ? checked : value,
    }

    if (data?._id) {
      dispatch(
        editOperatorConfig(data?._id, payload, (cbData) => {
          console.log({ cbData })
        })
      )
    }
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">API priority</h6>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header">
              <h6> Search Filters</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <Form className="select-operator">
                    <div className="me-2">
                      <Form.Group controlId="formGridServic">
                        <ReactSelect
                          placeHolder={"Select Services"}
                          title={"Services"}
                          handleChange={(e) => {
                            setSearchData({
                              ...searchData,
                              providerType: e,
                            })
                            setPayload({
                              ...payload,
                              serviceId: e,
                            })
                            setIsSubmit(false)
                          }}
                          options={serviceMenuData}
                        />
                      </Form.Group>
                    </div>

                    <div className="me-2">
                      <Form.Group controlId="formGridOperator">
                        <ReactSelect
                          placeHolder={"Select Operator"}
                          title={"Operator"}
                          handleChange={(e) => {
                            setSearchData({
                              ...searchData,
                              operator: e,
                            })
                          }}
                          value={searchData.operator}
                          options={operatorMenuData}
                        />
                      </Form.Group>
                    </div>

                    <Button
                      type="button"
                      className={`btn btn-primary`}
                      onClick={handleSearch}
                    >
                      <AiOutlineSearch />
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header">
              <h6>Set Operator Config</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <Table className="table mb-4">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Pending Limit</th>
                        <th>Total Pending</th>
                        <th>Priority</th>
                        <th>IsActive</th>
                        <th>Failure Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {operatorConfigData?.map((x, index) => (
                        <tr key={x._id}>
                          <th scope="row">{index + 1}</th>
                          <td>{x?.apiName}</td>
                          <td>
                            <input
                              defaultValue={x.pendingLimit}
                              type="number"
                              className="form-input"
                              id="exampleCheck1"
                              name="pendingLimit"
                              onChange={(e) => {
                                handleOnChange(index, x, e)
                              }}
                            />
                          </td>
                          <td>
                            <span>{x.totalPending}</span>
                          </td>
                          <td>
                            <input
                              defaultValue={x.priority}
                              type="number"
                              className="form-input"
                              id="exampleCheck1"
                              name="priority"
                              onChange={(e) => {
                                handleOnChange(index, x, e)
                              }}
                            />
                          </td>
                          <td>
                            <Form.Check
                              type="switch"
                              name="isActive"
                              checked={x.isActive || false}
                              onChange={(e) => {
                                handleOnChange(index, x, e)
                              }}
                            />
                          </td>
                          <td>
                            <input
                              defaultValue={x.failureLimit}
                              type="number"
                              className="form-input"
                              id="exampleCheck1"
                              name="failureLimit"
                              onChange={(e) => {
                                handleOnChange(index, x, e)
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperatorSwitchingNew
