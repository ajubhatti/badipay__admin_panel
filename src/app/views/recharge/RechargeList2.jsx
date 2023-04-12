import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllRechargeList,
  getRechargeList,
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
  AiOutlineLoading,
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
}

const csvExporter = new ExportToCsv(options)

const RechargeList2 = () => {
  const { reportType } = useParams()
  console.log({ reportType })
  const dispatch = useDispatch()

  const { loading, page, sizePerPage, totalSize, rechargeList } = useSelector(
    (state) => state.recharge
  )

  const { stateList } = useSelector((state) => state.utilities)
  const { companyList } = useSelector((state) => state.company)

  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState({})
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
  const [filter, setFilter] = useState({ provider: "", services: "" })
  const [searchString, setSearchString] = useState("")

  const [dateRangeValue, setDateRangeValue] = useState({
    start: null,
    end: null,
  })

  const [exportLoading, setExportLoading] = useState(false)
  const [providers, setProviders] = useState([])
  const [services, setServices] = useState([])

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
              className="btn btn-outline-success p-1 m-1"
              // size="xs"
              onClick={() => handleEdit(row)}
            >
              <AiOutlineEdit />
            </button>
            <button
              type="button"
              className="btn btn-outline-danger p-1 m-1"
              // size="xs"
              onClick={() => handleDelete(cell, row)}
            >
              <AiFillDelete />
            </button>
            <button
              type="button"
              className="btn btn-outline-primary p-1 m-1"
              // size="xs"
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

  const handleDelete = (cell, row) => {
    console.log("object delete:>> ", { cell, row })
  }

  const handleView = (cell, row) => {
    console.log("object view:>> ", { cell, row })
  }

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

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 20,
    sortBy: "created",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
    provider: "",
    services: "",
  })

  const getTransactionList = useCallback(() => {
    dispatch(getRechargeList(payloadData))
  }, [dispatch, payloadData])

  useEffect(() => {
    getTransactionList()
  }, [getTransactionList])

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      startDate: "",
      endDate: "",
      page: page,
      limits: sizePerPage,
      sortBy: "created",
      orderBy: "DESC",
      skip: 0,
      search: "",
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
      page: 1,
      provider: filter?.provider || "",
      services: filter?.services || "",
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
        getRechargeList(payload, (status) => {
          if (status) {
            const exportData = status?.data
              ?.filter(
                (item) => item.statusOfWalletRequest === CONSTANT_STATUS.SUCCESS
              )
              ?.map((item) => ({
                Date:
                  moment(item?.created).format("DD/MM/YYYY, h:mm:ss a") || "-",
                "User Name": item?.userDetail?.userName || "-",
                "Phone Number": item?.userDetail?.phoneNumber || "-",
                "Transaction No": item?.transactionData?.transactionId || "",
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
                "User CashBack": item?.userCashBack ? item?.userCashBack : "-",
                "Referral CashBack": item?.referralCashBack,
                "Net CashBack": item?.netCashBack ? item?.netCashBack : "-",
                Remark: !!item?.transactionData?.remark
                  ? item?.transactionData?.remark
                  : "-",
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
                  <div className="me-2">
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
                    onClick={handleFilterData}
                  >
                    <AiOutlineSearch />
                  </button>

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

export default RechargeList2
