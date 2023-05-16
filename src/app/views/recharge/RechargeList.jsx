import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllRechargeList,
  getRechargeList,
  getRechargeListForPrint,
  setPageTransactions,
  setSizePerPageTransactions,
  setSortFieldOfTransactions,
  setSortOrderOfTransactions,
} from "./store/action"
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineSearch,
} from "react-icons/ai"
import { getStateList } from "../utilities/store/action"
import { getCompanies } from "../api-settings/company-listing/store/action"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import CustomDateRangePicker from "../reports/CustomDateRangePicker"
import { toast } from "react-toastify"
import { discountServices } from "app/services/discount.service"
import RechargeViewModal from "./RechargeViewModal"
import { ExportToCsv } from "export-to-csv"
import { CONSTANT_STATUS } from "app/constants/constant"
import { useParams } from "react-router-dom"

const statusList = [
  { value: "", name: "Select Status" },
  { value: "success", name: "success" },
  { value: "pending", name: "pending" },
  { value: "failed", name: "failed" },
]

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: true,
  title: "Activities",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename: "recharge",
}

const csvExporter = new ExportToCsv(options)

const RechargeList = () => {
  const { reportType } = useParams()
  const dispatch = useDispatch()
  const { loading, page, sizePerPage, totalSize, rechargeList } = useSelector(
    (state) => state.recharge
  )
  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState({})
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
  const [filter, setFilter] = useState({ api: "", services: "", status: "" })
  const [searchString, setSearchString] = useState("")
  const [dateRangeValue, setDateRangeValue] = useState({
    start: new Date(),
    end: new Date(),
  })
  const [exportLoading, setExportLoading] = useState(false)
  const [providers, setApis] = useState([])
  const [services, setServices] = useState([])
  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 25,
    sortBy: "created",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: moment(dateRangeValue?.start).format("MM-DD-yyyy"), //"10-15-2022",
    endDate: moment(dateRangeValue?.end).format("MM-DD-yyyy"),
    api: "",
    services: "",
    status: reportType ? "success" : "",
  })

  useEffect(() => {
    const getAllProviders = async () => {
      await discountServices.getAllApisAndServices().then((res) => {
        let apis = []
        apis = res?.apisResponse?.data?.data?.data
          .filter((apis) => {
            return apis.isActive
          })
          .map(function (apis) {
            return { value: apis._id, label: apis.apiName }
          })
        apis.unshift({ value: 0, label: "Select API" })
        setApis(apis)

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

  const handleDelete = (cell, row) => {}

  const handleView = (cell, row) => {}

  const handleDiscountClose = () => {
    setdDiscountInfo({})
    setIsDiscountEdit(false)
    setIsShowDiscountModal(false)
  }

  const handleEdit = (info) => {
    setdDiscountInfo(info)
    setIsDiscountEdit(true)
    setIsShowDiscountModal(true)
  }

  useEffect(() => {
    dispatch(getStateList())
    dispatch(getCompanies())
    dispatch(getAllRechargeList())
  }, [dispatch])

  const getTransactionList = useCallback(() => {
    console.log({ payloadData })
    dispatch(getRechargeList(payloadData))
  }, [dispatch, payloadData])

  useEffect(() => {
    getTransactionList()
  }, [getTransactionList])

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      page: page,
      limits: sizePerPage,
    }))
  }, [sizePerPage, page])

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

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
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

  const handleSearch = (e) => {
    setSearchString(e.target.value.trim())
  }

  const handleFilterData = () => {
    setPayloadData((prev) => ({
      ...prev,
      page: page,
      api: filter?.api || "",
      services: filter?.services || "",
      status: filter?.status || "",
      search: searchString,
      startDate: dateRangeValue?.start
        ? moment(dateRangeValue?.start).format("MM-DD-yyyy")
        : "", //"10-15-2022",
      endDate: dateRangeValue?.end
        ? moment(dateRangeValue?.end).format("MM-DD-yyyy")
        : "",
    }))
  }

  const handleCSV = () => {
    try {
      setExportLoading(true)
      const payload = {
        ...payloadData,
        limits: totalSize,
      }
      dispatch(
        getRechargeListForPrint(payload, (status) => {
          if (status) {
            const exportData = status?.data
              ?.filter((item) => item.status === CONSTANT_STATUS.SUCCESS)
              ?.map((item) => ({
                Date:
                  moment(item?.created).format("DD/MM/YYYY, h:mm:ss a") || "-",
                "User Name": item?.userDetail?.userName || "-",
                "Phone Number": item?.userDetail?.phoneNumber || "-",
                "Transaction No": item?.transactionData?.transactionId || "",
                // "service type": item?.transactionData?.serviceTypeName || "-",
                "Operator Id":
                  item?.transactionData?.rechargeData?.OPRID ||
                  item?.transactionData?.rechargeData?.opid ||
                  "-",
                "Operator Name": item?.transactionData?.rechargeData
                  ?.rechargeOperator?.companyName
                  ? item?.transactionData?.rechargeData?.rechargeOperator
                      ?.companyName
                  : "-",
                "Api Name": item?.transactionData?.rechargeData?.rechargeApi
                  ?.apiName
                  ? item?.transactionData?.rechargeData?.rechargeApi?.apiName
                  : "-",
                "Customer Number": item?.transactionData?.customerNo
                  ? item?.transactionData?.customerNo
                  : "-",
                "User Balance": item?.transactionData?.userBalance
                  ? item?.transactionData?.userBalance
                  : "-",
                "Request Amount": item?.transactionData?.requestAmount
                  ? item?.transactionData?.requestAmount
                  : "-",
                "User CashBack": item?.transactionData?.cashBackAmount || "-",
                "Net CashBack": item?.transactionData?.netCashBack || "-",
                "Recharge Amount": item?.transactionData?.rechargeAmount || "-",
                "Final Balance": item?.transactionData?.userFinalBalance || "-",
                Remark: item?.transactionData?.remark || "-",
                Status: item?.transactionData?.status,
              }))

            setExportLoading(false)
            csvExporter.generateCsv(exportData)
          }
        })
      )
    } catch (err) {
      setExportLoading(false)
      toast.err("something want's wrong!!")
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    if (name === "api") {
      setFilter((prev) => ({
        ...prev,
        api: value,
      }))
    } else if (name === "services") {
      setFilter((prev) => ({
        ...prev,
        services: value,
      }))
    } else {
      setFilter((prev) => ({
        ...prev,
        status: value,
      }))
    }
  }

  const resetValue = () => {
    setFilter({ api: "", services: "", status: "" })
    setDateRangeValue({
      start: new Date(),
      end: new Date(),
    })
  }

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
          <div>
            {row?.transactionData?.transactionId
              ? row?.transactionData?.transactionId
              : "-"}
          </div>
        ),
      },
      {
        text: "service type",
        dataField: "serviceTypeName",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>
            {row?.transactionData?.serviceTypeName
              ? row?.transactionData?.serviceTypeName
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
            {row?.transactionData?.rechargeData?.rechargeOperator?.companyName
              ? row?.transactionData?.rechargeData?.rechargeOperator
                  ?.companyName
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
            {row?.transactionData?.rechargeData?.rechargeApi?.apiName
              ? row?.transactionData?.rechargeData?.rechargeApi?.apiName
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
            {row?.transactionData?.userBalance
              ? row?.transactionData?.userBalance
              : "-"}
          </div>
        ),
      },

      {
        text: "Request Amount",
        dataField: "requestAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.requestAmount
              ? row?.transactionData?.requestAmount
              : "-"}
          </div>
        ),
      },
      {
        text: "CashBack Amount",
        dataField: "cashBackAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.cashBackAmount
              ? row?.transactionData?.cashBackAmount
              : "-"}
          </div>
        ),
      },

      {
        text: "Recharge Amount",
        dataField: "rechargeAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.rechargeAmount
              ? row?.transactionData?.rechargeAmount
              : "-"}
          </div>
        ),
      },

      {
        text: "FinalBalance",
        dataField: "userFinalBalance",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.userFinalBalance
              ? row?.transactionData?.userFinalBalance
              : "-"}
          </div>
        ),
      },

      {
        text: "remark",
        dataField: "remark",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            <span>
              {!!row?.transactionData?.remark
                ? row?.transactionData?.remark
                : "-"}
            </span>
          </div>
        ),
      },
      {
        text: "status",
        dataField: "status",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div
            className={`align-middle text-${
              row?.status === CONSTANT_STATUS.SUCCESS
                ? "success"
                : row?.status === CONSTANT_STATUS.PENDING
                ? "warning"
                : "danger"
            }`}
          >
            <span
              className={`text-capitalize text-white p-1 rounded bg-${
                row?.status === CONSTANT_STATUS.SUCCESS
                  ? "success"
                  : row?.status === CONSTANT_STATUS.PENDING
                  ? "warning"
                  : "danger"
              }`}
            >
              {row?.status}
            </span>
          </div>
        ),
      },
      !reportType && {
        text: "Action",
        dataField: "edit",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEdit(cell, row)}
            >
              <AiOutlineEdit />
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
            <button
              type="button"
              className="btn text-primary btn-sm"
              title="Preview"
              size="sm"
              onClick={() => handleView(cell, row)}
            >
              <AiFillEye />
            </button>
          </div>
        ),
      },
    ],
    [page, reportType, sizePerPage]
  )

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="main-heading">Recharge List</h2>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="col-md-6 d-flex ">
                  <div className="me-2">
                    <select
                      name="api"
                      onChange={handleChange}
                      className="form-control"
                      id="api"
                      value={filter.api || ""}
                    >
                      {providers.map((api) => {
                        return (
                          <option key={api.value} value={api.value}>
                            {api.label}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="me-2">
                    <select
                      name="services"
                      onChange={handleChange}
                      className="form-control"
                      id="services"
                      value={filter.services || ""}
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

                  {!reportType && (
                    <div className="me-2">
                      <select
                        name="status"
                        onChange={handleChange}
                        className="form-control"
                        id="status"
                        value={filter.status || ""}
                      >
                        {statusList.map((stts) => {
                          return (
                            <option key={stts.value} value={stts.value}>
                              {stts.name}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  )}
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <div className="me-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={handleSearch}
                    />
                  </div>
                  <CustomDateRangePicker
                    rangeDate={dateRangeValue}
                    setRangeDate={setDateRangeValue}
                  />
                  <button
                    className={`btn btn-primary`}
                    onClick={() => handleFilterData()}
                  >
                    <AiOutlineSearch />
                  </button>
                  {reportType && (
                    <button
                      className={`ms-2 btn btn-secondary ${
                        exportLoading ? "disabled" : ""
                      }`}
                      onClick={handleCSV}
                    >
                      {exportLoading ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        ></div>
                      ) : (
                        <AiOutlineDownload />
                      )}
                    </button>
                  )}

                  <button
                    className={`btn btn-primary ms-2`}
                    onClick={resetValue}
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="col-md-12">
                <CustomTable
                  showAddButton={false}
                  pageOptions={pageOptions}
                  keyField="_id"
                  data={rechargeList}
                  columns={columns}
                  showSearch={false}
                  onTableChange={onTableChange}
                  withPagination={true}
                  loading={loading}
                  withCard={false}
                ></CustomTable>

                {isShowDiscountModal && (
                  <RechargeViewModal
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

export default RechargeList
