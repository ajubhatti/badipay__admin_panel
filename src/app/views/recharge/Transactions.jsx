import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getTransactionsList,
  setPageTransactions,
  setSizePerPageTransactions,
  setSortFieldOfTransactions,
  setSortOrderOfTransactions,
} from "./store/action"
import {
  AiOutlineEdit,
  AiFillDelete,
  AiFillEye,
  AiOutlinePlus,
} from "react-icons/ai"
import { getStateList } from "../utilities/store/action"
import { getCompanies } from "../api-settings/company-listing/store/action"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import TransactionViewModal from "./TransactionViewModal"
import { useCallback } from "react"
import CustomDateRangePicker from "../reports/CustomDateRangePicker"
import { discountServices } from "app/services/discount.service"
const Transactions = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    loading,
    page,
    sizePerPage,
    totalSize,
    transactionData,
    transactionList,
  } = useSelector((state) => state.recharge)

  const [dateRangeValue, setDateRangeValue] = useState({
    start: null,
    end: null,
  })

  const { stateList } = useSelector((state) => state.utilities)
  const { companyList } = useSelector((state) => state.company)
  const [transactionListData, setTransactionListData] = useState([])

  const [providers, setProviders] = useState([])
  const [services, setServices] = useState([])

  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState([])
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
  const [filter, setFilter] = useState({ provider: "", services: "" })

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 20,
    sortBy: "created",
    orderBy: "desc",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
    provider: "",
    services: "",
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
    const getAllProviders = async () => {
      await discountServices.getAllApisAndServices().then((res) => {
        let provider = []
        provider = res?.apisResponse?.data?.data?.data
          .filter((provider) => {
            return provider.isActive
          })
          .map(function (provider) {
            return { value: provider._id, label: provider.apiName }
          })
        provider.unshift({ value: 0, label: "Select Provider" })
        setProviders(provider)

        let service = []
        service = res?.serviceResponse?.data?.data
          .filter((service) => {
            return service.isActive
          })
          .map(function (service) {
            return { value: service._id, label: service.serviceName }
          })
        service.unshift({ value: 0, label: "Select Service" })
        setServices(service)
      })
    }
    getAllProviders()
  }, [])

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      startDate: "",
      endDate: "",
      page: page,
      limits: sizePerPage,
      sortBy: "created",
      orderBy: "desc",
      skip: 0,
      search: "",
    }))
  }, [sizePerPage, page])

  const columns = useMemo(
    () => [
      {
        text: "No",
        dataField: "no",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {sizePerPage * (page - 1) + rowIndex + 1}
          </div>
        ),
      },
      {
        text: "Date",
        dataField: "created",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.created
              ? moment(row?.created).format("DD/MM/YYYY hh:mm:ss")
              : "-"}
          </div>
        ),
      },
      {
        text: "User Name",
        dataField: "userDetail.userName",
        sort: true,

        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.userDetail?.userName ? row?.userDetail?.userName : "-"}
          </div>
        ),
      },
      {
        text: "Phone Number",
        dataField: "phoneNumber",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.userDetail?.phoneNumber ? row?.userDetail?.phoneNumber : "-"}
          </div>
        ),
      },

      {
        text: "Transaction Id",
        dataField: "transactionId",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.transactionId ? row?.transactionId : "-"}</div>
        ),
      },
      {
        text: "service type",
        dataField: "serviceTypeName",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.serviceTypeName ? row?.serviceTypeName : "-"}</div>
        ),
      },
      {
        text: "Operator Id",
        dataField: "operatorId",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.rechargeData?.OPRID
              ? row?.rechargeData?.OPRID
              : row?.rechargeData?.opid
              ? row?.rechargeData?.opid
              : "-"}
          </div>
        ),
      },
      {
        text: "Operator Name",
        dataField: "operatorName",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.rechargeData?.rechargeOperator?.companyName
              ? row?.rechargeData?.rechargeOperator?.companyName
              : "-"}
          </div>
        ),
      },
      {
        text: "Api Name",
        dataField: "apiName",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.rechargeData?.rechargeApi?.apiName
              ? row?.rechargeData?.rechargeApi?.apiName
              : "-"}
          </div>
        ),
      },

      {
        text: "Customer No",
        dataField: "customerNo",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.customerNo ? row?.customerNo : "-"}
          </div>
        ),
      },

      {
        text: "Balance",
        dataField: "userBalance",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.userBalance ? row?.userBalance : "-"}
          </div>
        ),
      },
      {
        text: "Request Amount",
        dataField: "requestAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.requestAmount ? row?.requestAmount : "-"}
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
        text: "Recharge Amount",
        dataField: "rechargeAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.rechargeAmount ? row?.rechargeAmount : "-"}
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
        text: "remark",
        dataField: "remark",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            <span>{!!row?.remark ? row?.remark : "-"}</span>
          </div>
        ),
      },
      {
        text: "status",
        dataField: "status",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div
            className={`align-middle text-${
              row?.status === "success"
                ? "success"
                : row?.status === "pending"
                ? "warning"
                : "danger"
            }`}
          >
            <span
              className={`text-capitalize text-white p-1 rounded bg-${
                row?.status === "success"
                  ? "success"
                  : row?.status === "pending"
                  ? "warning"
                  : "danger"
              }`}
            >
              {row?.status}
            </span>
          </div>
        ),
      },
      {
        text: "Action",
        dataField: "edit",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm ts-buttom m-1"
              size="sm"
              onClick={() => handleEdit(row)}
            >
              <AiOutlineEdit style={{ color: "green" }} />
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm ml-2 ts-buttom m-1"
              size="sm"
              onClick={() => handleDelete(cell, row)}
            >
              <AiFillDelete />
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
              size="sm"
              onClick={() => handleView(cell, row)}
            >
              <AiFillEye />
            </button>
          </div>
        ),
      },
    ],
    [page, sizePerPage]
  )

  const handleDelete = (cell, row) => {}

  const handleView = (cell, row) => {}

  const handleDiscountClose = () => {
    setdDiscountInfo([])
    setIsDiscountEdit(false)
    setIsShowDiscountModal(false)
  }

  const handleEdit = (info) => {
    let tmpInfo = []
    tmpInfo._id = info?._id
    tmpInfo.discountData = info?.discountData
    setdDiscountInfo(info)
    setIsDiscountEdit(true)
    setIsShowDiscountModal(true)
  }

  useEffect(() => {
    dispatch(getStateList())
    dispatch(getCompanies())
  }, [dispatch])

  const getTransactionList = useCallback(() => {
    console.log({ payloadData })
    dispatch(getTransactionsList(payloadData))
  }, [dispatch, payloadData])

  useEffect(() => {
    getTransactionList()
  }, [getTransactionList])

  useEffect(() => {
    if (transactionData) {
      setTransactionListData(transactionData?.transactions)
    }
  }, [transactionData, stateList, companyList])

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    console.log(type, { page, sizePerPage, sortField, sortOrder })
    switch (type) {
      case "sort":
        dispatch(setSortFieldOfTransactions(sortField))
        dispatch(setSortOrderOfTransactions(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageTransactions(page))
        dispatch(setSizePerPageTransactions(sizePerPage))
        break
      default:
        break
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    if (name === "provider") {
      setFilter((prev) => ({
        ...prev,
        provider: value,
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        services: value,
      }))
    }
  }

  const handleFilterData = () => {
    console.log(
      dateRangeValue,
      moment(dateRangeValue?.start).format("MM-DD-yyyy")
    )
    setPayloadData((prev) => ({
      ...prev,
      page: 1,
      startDate: dateRangeValue?.start
        ? moment(dateRangeValue?.start).format("MM-DD-yyyy")
        : "", //"10-15-2022",
      endDate: dateRangeValue?.end
        ? moment(dateRangeValue?.end).format("MM-DD-yyyy")
        : "",
      provider: filter?.provider || "",
      services: filter?.services || "",
    }))
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="main-heading">Transactions List</h2>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="col-md-6 d-flex ">
                  <div className="d-flex align-items-end me-2">
                    <select
                      name="provider"
                      onChange={handleChange}
                      className="form-control"
                      id="provider"
                    >
                      {providers.map((provider) => {
                        return (
                          <option key={provider.value} value={provider.value}>
                            {provider.label}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="d-flex align-items-end me-2">
                    <select
                      name="services"
                      onChange={handleChange}
                      className="form-control"
                      id="services"
                    >
                      {services.map((service) => {
                        return (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <CustomDateRangePicker
                    rangeDate={dateRangeValue}
                    setRangeDate={setDateRangeValue}
                  />
                  <div className="d-flex align-items-end">
                    <button
                      className={`btn btn-secondary }`}
                      onClick={handleFilterData}
                    >
                      Find
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <CustomTable
                  showAddButton={false}
                  pageOptions={pageOptions}
                  keyField="transaction_id"
                  data={transactionList}
                  columns={columns}
                  showSearch={false}
                  onTableChange={onTableChange}
                  withPagination={true}
                  loading={loading}
                  withCard={false}
                ></CustomTable>

                {isShowDiscountModal && (
                  <TransactionViewModal
                    discountInfo={discountInfo}
                    isDiscountEdit={isDiscountEdit}
                    isShowDiscountModal={isShowDiscountModal}
                    onCloseDiscountModal={handleDiscountClose}
                    fetchTransactionList={getTransactionList}
                    // onSaveDiscountModal={handleSaveDiscountModal}
                    // selectedServiceIndex={selectedServiceIndex}
                    // discountModalSave={discountModalSave}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions
