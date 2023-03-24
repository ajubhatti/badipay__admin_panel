import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import CustomTable from "app/components/Tables/CustomTable"
import React, { useEffect, useMemo, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { BsPlusLg } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getCompanies } from "../company-listing/store/action"
import { getServices } from "../services-listing/store/action"
import {
  getSPSlabs,
  setPageSlab,
  setSizePerPageSlab,
  setSortFieldOfSlab,
  setSortOrderOfSlab,
} from "./store/action"
import { sizePerPageList } from "../../../constants/table"
import moment from "moment"

const SlabConfig = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { companyList } = useSelector((state) => state.company)
  const {
    slabLoading,
    slabDetail,
    page,
    sizePerPage,
    totalSize,
    search,
    sortField,
    sortOrder,
    slabsList,
  } = useSelector((state) => state.SPSlab)

  const [searchData, setSearchData] = useState({})
  const [apisDDData, setApisDDData] = useState([])
  const [serviceDDData, setServiceDDData] = useState([])
  const [operatorDDData, setOperatorDDData] = useState([])

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 20,
    sortBy: "created",
    orderBy: "desc",
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
    dispatch(getCompanies())
    dispatch(getSPSlabs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSPSlabs(payloadData))
  }, [payloadData, dispatch])

  useEffect(() => {
    console.log({ apisList })
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
    let filteredData = companyList.filter(
      (x) => x.providerType === searchData.providerType
    )
    filteredData = filteredData.map((x) => ({
      value: x._id,
      label: x.companyName,
    }))

    setOperatorDDData(filteredData)
  }, [companyList, searchData])

  const submitHandler = (e) => {
    let filteredData = companyList.find((x) => x._id === searchData.operator)

    console.log("filteredData", filteredData)
    e.preventDefault()
  }

  const addSlab = () => {
    navigate("/api-setting/slab-config/add")
  }

  const columns = useMemo(
    () => [
      {
        dataField: "no",
        text: "No.",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {sizePerPage * (page - 1) + rowIndex + 1}
          </div>
        ),
        sort: true,
      },
      {
        text: "Date",
        dataField: "created",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.created ? moment(row?.created).format("DD/MM/YYYY") : "-"}
          </div>
        ),
      },
      {
        text: "Company Data",
        dataField: "companyData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.companyData?.companyName
              ? row?.companyData?.companyName
              : "-"}
          </div>
        ),
      },
      {
        text: "Service Provider Name",
        dataField: "serviceProviderName",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.serviceProviderName ? row?.serviceProviderName : "-"}</div>
        ),
      },
      {
        text: "Service Provider Type",
        dataField: "serviceProviderType",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.serviceProviderType ? row?.serviceProviderType : "-"}
          </div>
        ),
      },
      {
        text: "Service Type",
        dataField: "serviceData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.serviceData.serviceName ? row?.serviceData.serviceName : "-"}
          </div>
        ),
      },
      {
        text: "SPKey",
        dataField: "SPKey",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.SPKey ? row?.SPKey : "-"}</div>
        ),
      },
      {
        text: "Api ",
        dataField: "apiData",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.apiData.apiName ? row?.apiData.apiName : "-"}
          </div>
        ),
      },
      {
        text: "CashBack Amount",
        dataField: "cashBackAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.cashBackAmount ? row?.cashBackAmount : "-"}
          </div>
        ),
      },
      {
        text: "FinalBalance",
        dataField: "userFinalBalance",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.userFinalBalance ? row?.userFinalBalance : "-"}
          </div>
        ),
      },
      {
        text: "providedBy",
        dataField: "providedBy",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.providedBy ? row?.providedBy : "-"}
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
        text: "Is Active",
        dataField: "isBilling",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div
            className={`align-middle text-${
              row?.isBilling ? "success" : "danger"
            }`}
          >
            {row?.isBilling ? "true" : "false"}
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
          <h6 className="main-heading">Slab setting</h6>
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
                          title={"Apis"}
                          handleChange={(e) => {
                            // setSelectedValue(e)
                            setSearchData({
                              ...searchData,
                              apis: e,
                            })
                          }}
                          options={apisDDData}
                        />
                      </Form.Group>
                    </div>

                    <div className="list-of-operator m-2">
                      <Form.Group controlId="formGridServic">
                        <ReactSelect
                          title={"services"}
                          handleChange={(e) => {
                            // setSelectedValue(e)
                            setSearchData({
                              ...searchData,
                              providerType: e,
                            })
                          }}
                          options={serviceDDData}
                        />
                      </Form.Group>
                    </div>

                    <div className="list-of-operator m-2">
                      <Form.Group controlId="formGridOperator">
                        <ReactSelect
                          title={"Operator"}
                          handleChange={(e) => {
                            // setSelectedValue(e)
                            setSearchData({
                              ...searchData,
                              operator: e,
                            })
                          }}
                          options={operatorDDData}
                        />
                      </Form.Group>
                    </div>
                    <Button className="btn btn-md btn-primary" type="submit">
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
              <h6> Slab List</h6>
              <Button variant="secondary">
                <BsPlusLg onClick={() => addSlab()} />
              </Button>
            </div>

            {console.log({ slabsList })}
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {/* table */}
                  <CustomTable
                    showAddButton={false}
                    pageOptions={pageOptions}
                    keyField="transaction_id"
                    data={slabsList}
                    columns={columns}
                    showSearch={false}
                    onTableChange={onTableChange}
                    withPagination={true}
                    loading={slabLoading}
                    withCard={false}
                  ></CustomTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlabConfig
