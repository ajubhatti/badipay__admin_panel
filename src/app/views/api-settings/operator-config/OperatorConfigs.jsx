import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import CustomTable from "app/components/Tables/CustomTable"
import React, { useEffect, useMemo, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { BsPlusLg } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { getServices } from "../services-listing/store/action"
import {
  addByScan,
  fetchAllSPSlabs,
  getOperatorConfigList,
  setPageSlab,
  setSizePerPageSlab,
  setSortFieldOfSlab,
  setSortOrderOfSlab,
} from "./store/action"
import { sizePerPageList } from "../../../constants/table"
import { AiOutlineEdit } from "react-icons/ai"
import { getApiList } from "../apis/store/action"
import AddUpdateOperatorConfigModal from "./AddUpdateOperatorConfigModal"
import { getAllOperators } from "../operator-list/store/action"

const OperatorConfigs = () => {
  const dispatch = useDispatch()

  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { operatorList } = useSelector((state) => state.operators)
  const { loading, page, sizePerPage, totalSize, operatorConfigList } =
    useSelector((state) => state.operatorConfig)

  const [payload, setPayload] = useState({
    serviceId: "",
  })

  const [searchData, setSearchData] = useState({})
  const [apisDDData, setApisDDData] = useState([])
  const [serviceDDData, setServiceDDData] = useState([])
  const [operatorDDData, setOperatorDDData] = useState([])

  const [modalShow, setModalShow] = useState(false)
  const [companysData, setCompanysData] = useState([])
  const [type, setType] = useState("Add")

  const [payloadData, setPayloadData] = useState({
    page: 1,
    // limits: 25,
    sortBy: "created",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
  })

  const pageOptions = useMemo(
    () => ({
      page,
      sizePerPage,
      totalSize,
      custom: true,
      sizePerPageList,
    }),
    [sizePerPage, totalSize, page]
  )

  useEffect(() => {
    dispatch(getServices())
    dispatch(getApiList())
    return () => {
      dispatch(fetchAllSPSlabs([]))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getOperatorConfigList(payloadData))
  }, [payloadData, dispatch])

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
      setServiceDDData(newService)
    }
  }, [serviceList])

  useEffect(() => {
    const fetchOperator = () => {
      dispatch(getAllOperators(payload))
    }
    fetchOperator()
  }, [dispatch])

  useEffect(() => {
    console.log(payloadData.service, { operatorList })
    if (payloadData?.service && operatorList && operatorList.length) {
      let filterOperator = operatorList.map((x) => ({
        value: x._id,
        label: x.operatorName,
      }))
      setOperatorDDData(filterOperator)
    }
  }, [operatorList, payloadData.service])

  const submitHandler = (e) => {
    setPayloadData(payloadData)
    e.preventDefault()
  }

  const addSlab = () => {
    dispatch(
      addByScan(() => {
        fetchRefreshData()
      })
    )
  }

  const handleEdit = (cell, row) => {
    setModalShow(true)
    setType("Update")
    setCompanysData(row)
  }

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      page: page,
      limits: sizePerPage,
    }))
  }, [sizePerPage, page])

  const fetchRefreshData = () => {
    dispatch(getOperatorConfigList(payloadData))
  }

  const columns = useMemo(
    () => [
      {
        dataField: "no",
        text: "No.",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {sizePerPage && page
              ? sizePerPage * (page - 1) + rowIndex + 1
              : rowIndex + 1}
          </div>
        ),
        sort: true,
      },
      {
        text: "Company Data",
        dataField: "operatorData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.operatorData?.operatorName
              ? row?.operatorData?.operatorName
              : "-"}
          </div>
        ),
      },
      {
        text: "Service Type",
        dataField: "serviceData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.serviceData?.serviceName
              ? row?.serviceData?.serviceName
              : "-"}
          </div>
        ),
      },
      {
        text: "Api ",
        dataField: "apiData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.apiData?.apiName ? row?.apiData?.apiName : "-"}
          </div>
        ),
      },
      {
        text: "apiCode",
        dataField: "apiCode",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.apiCode ? row?.apiCode : "-"}
          </div>
        ),
      },
      {
        text: "priority",
        dataField: "priority",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.priority ? row?.priority : "-"}
          </div>
        ),
      },
      {
        text: "Is Active",
        dataField: "isActive",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div
            className={`align-middle text-${
              row?.isActive ? "success" : "danger"
            }`}
          >
            <span
              className={`text-capitalize text-white p-1 rounded bg-${
                row?.isActive ? "success" : "danger"
              }`}
            >
              {row?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        ),
      },
      {
        dataField: "",
        text: "Action",
        classes: "p-1",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEdit(cell, row)}
            >
              <AiOutlineEdit style={{ color: "green" }} />
            </button>
          </div>
        ),
      },
    ],
    [page, sizePerPage]
  )

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(setSortFieldOfSlab(sortField))
        dispatch(setSortOrderOfSlab(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageSlab(page))
        dispatch(setSizePerPageSlab(sizePerPage))
        break
      default:
        break
    }
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12">
          <h6 className="main-heading">Operator configuration</h6>
        </div>
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header">
              <h6>Search Filters</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <Form onSubmit={submitHandler} className="select-operator">
                    <div className="list-of-operator m-2">
                      <Form.Group controlId="formGridServic">
                        <ReactSelect
                          isClearable={true}
                          title={"Apis"}
                          placeHolder={"select api"}
                          handleChange={(e) => {
                            setPayloadData({
                              ...payloadData,
                              apis: e,
                            })
                            setSearchData({
                              ...searchData,
                              apis: e,
                            })
                          }}
                          options={apisDDData}
                          value={searchData?.apis}
                        />
                      </Form.Group>
                    </div>

                    <div className="list-of-operator m-2">
                      <Form.Group controlId="formGridServic">
                        <ReactSelect
                          isClearable={true}
                          placeHolder={"select services"}
                          title={"services"}
                          handleChange={(e) => {
                            setPayloadData({
                              ...payloadData,
                              service: e,
                            })
                            setSearchData({
                              ...searchData,
                              service: e,
                            })
                          }}
                          options={serviceDDData}
                          value={searchData?.provider}
                        />
                      </Form.Group>
                    </div>

                    <div className="list-of-operator m-2">
                      <Form.Group controlId="formGridOperator">
                        <ReactSelect
                          isClearable={true}
                          title={"Operator"}
                          placeHolder={"select operator"}
                          handleChange={(e) => {
                            setPayloadData({
                              ...payloadData,
                              operator: e,
                            })
                            setSearchData({
                              ...searchData,
                              operator: e,
                            })
                          }}
                          options={operatorDDData}
                          value={searchData?.operator}
                        />
                      </Form.Group>
                    </div>
                    <Button
                      className="btn btn-md btn-primary m-2"
                      type="submit"
                    >
                      Search
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
              <Button variant="secondary" onClick={() => addSlab()}>
                <BsPlusLg />
              </Button>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {/* table */}
                  <CustomTable
                    showAddButton={false}
                    pageOptions={pageOptions}
                    keyField="_id"
                    data={operatorConfigList}
                    columns={columns}
                    showSearch={false}
                    onTableChange={onTableChange}
                    withPagination={false}
                    loading={loading}
                    withCard={false}
                  ></CustomTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalShow && (
        <AddUpdateOperatorConfigModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={companysData}
          type={type}
          fetchRefreshData={fetchRefreshData}
        />
      )}
    </div>
  )
}

export default OperatorConfigs
