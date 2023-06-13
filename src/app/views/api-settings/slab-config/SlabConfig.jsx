import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import CustomTable from "app/components/Tables/CustomTable"
import React, { useEffect, useMemo, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { BsPlusLg } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { getCompanies } from "../company-listing/store/action"
import { getServices } from "../services-listing/store/action"
import {
  deleteSlabById,
  getSPSlabs,
  setPageSlab,
  setSizePerPageSlab,
  setSortFieldOfSlab,
  setSortOrderOfSlab,
} from "./store/action"
import { sizePerPageList } from "../../../constants/table"
import AddUpdateSlabModal from "./AddUpdateSlabModal"
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import { getApiList } from "../apis/store/action"
import { toast } from "react-toastify"

const SlabConfig = () => {
  const dispatch = useDispatch()

  const { apisList } = useSelector((state) => state.apis)
  const { serviceList } = useSelector((state) => state.servicesList)
  const { companyList } = useSelector((state) => state.company)
  const { slabLoading, page, sizePerPage, totalSize, slabsList } = useSelector(
    (state) => state.SPSlab
  )

  const [searchData, setSearchData] = useState({})
  const [apisDDData, setApisDDData] = useState([])
  const [serviceDDData, setServiceDDData] = useState([])
  const [operatorDDData, setOperatorDDData] = useState([])

  const [modalShow, setModalShow] = useState(false)
  const [companysData, setCompanysData] = useState([])
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [type, setType] = useState("Add")

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 20,
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
    dispatch(getCompanies())
    dispatch(getApiList())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSPSlabs(payloadData))
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
    console.log({ searchData })

    let filteredData = { ...payloadData, ...searchData }

    // setPayloadData((previousData) => ({
    //   ...previousData,
    //   page: page,
    //   limits: sizePerPage,
    // }))
    console.log("filteredData", filteredData)
    dispatch(getSPSlabs(filteredData))
    e.preventDefault()
  }

  const addSlab = () => {
    setModalShow(true)
    setCompanysData({})
    setType("Add")
  }

  const handleDelete = (cell, row) => {
    setIsShowConfirmModal(true)
    setCompanysData(row)
  }

  const handleEdit = (cell, row) => {
    setModalShow(true)
    setType("Update")
    setCompanysData(row)
  }

  const handleOk = async () => {
    dispatch(
      deleteSlabById(companysData?._id, (data) => {
        console.log({ data })
        setIsShowConfirmModal(false)
        if (data?.status === 200) {
          toast.success(data?.message)
          dispatch(getSPSlabs(payloadData))
        }
      })
    )
  }

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      page: page,
      limits: sizePerPage,
    }))
  }, [sizePerPage, page])

  const fetchRefreshData = () => {
    console.log({ payloadData })
    dispatch(getSPSlabs(payloadData))
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
            <button
              type="button"
              className="btn text-danger btn-sm"
              title="Delete"
              size="sm"
              onClick={() => handleDelete(cell, row)}
            >
              <AiFillDelete />
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
          <h6 className="main-heading">Operator setting</h6>
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
                          placeHolder={"select api"}
                          handleChange={(e) => {
                            setSearchData({
                              ...searchData,
                              apis: e,
                            })
                          }}
                          isClearable={true}
                          options={apisDDData}
                        />
                      </Form.Group>
                    </div>

                    <div className="list-of-operator m-2">
                      <Form.Group controlId="formGridServic">
                        <ReactSelect
                          placeHolder={"select services"}
                          title={"services"}
                          handleChange={(e) => {
                            setSearchData({
                              ...searchData,
                              providerType: e,
                            })
                          }}
                          isClearable={true}
                          options={serviceDDData}
                        />
                      </Form.Group>
                    </div>

                    <div className="list-of-operator m-2">
                      <Form.Group controlId="formGridOperator">
                        <ReactSelect
                          title={"Operator"}
                          placeHolder={"select operator"}
                          handleChange={(e) => {
                            setSearchData({
                              ...searchData,
                              operator: e,
                            })
                          }}
                          options={operatorDDData}
                          isClearable={true}
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
              <h6> Operator List</h6>
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
      {modalShow && (
        <AddUpdateSlabModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={companysData}
          type={type}
          fetchRefreshData={fetchRefreshData}
        />
      )}

      {isShowConfirmModal && (
        <ConfirmModal
          title="Are you sure ?"
          description="Are you sure you want to delete ?"
          handleDelete={handleOk}
          isShowConfirmModal={isShowConfirmModal}
          onCloseConfirmModal={() => setIsShowConfirmModal(false)}
        />
      )}
    </div>
  )
}

export default SlabConfig
