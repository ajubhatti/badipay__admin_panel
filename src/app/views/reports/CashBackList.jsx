import React, { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getCashBackList,
  setPageCashBack,
  setSizePerPageCashBack,
  setSortFieldOfCashBack,
  setSortOrderOfCashBack,
} from "./store/action"
import { getStateList } from "../utilities/store/action"
import { getCompanies } from "../api-settings/company-listing/store/action"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import CashBackViewModal from "./CashBackViewModal"
import CustomDateRangePicker from "./CustomDateRangePicker"
import { ExportToCsv } from "export-to-csv"
import { toast } from "react-toastify"
import { discountServices } from "app/services/discount.service"
import { cashBackService } from "app/services/cashback.service"
import ReportsCard from "./ReportsCard"
import { AiOutlineSearch, AiOutlineDownload } from "react-icons/ai"
import { CONSTANT_STATUS } from "app/constants/constant"

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

const CashBackList = () => {
  const { reportType } = useParams()
  console.log({ reportType })
  const dispatch = useDispatch()

  const {
    loading,
    page,
    sizePerPage,
    totalSize,
    search,
    sortField,
    sortOrder,
    cashBackData,
    cashBackList,
  } = useSelector((state) => state.reports)

  const [exportLoading, setExportLoading] = useState(false)

  const { stateList } = useSelector((state) => state.utilities)
  const { companyList } = useSelector((state) => state.company)
  const [transactionListData, setCashBackListData] = useState([])

  const [searchString, setSearchString] = useState("")
  const [dateRangeValue, setDateRangeValue] = useState({
    start: null,
    end: null,
  })

  const [filter, setFilter] = useState({ provider: "", services: "" })

  const [providers, setProviders] = useState([])
  const [services, setServices] = useState([])

  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState([])
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
  const [cardData, setCardData] = useState(null)
  const [reportData, setReportData] = useState(null)

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 20,
    sortBy: "created",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
    provider: filter?.provider || "",
    services: filter?.services || "",
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
    const getTotal = async () => {
      try {
        await cashBackService.adminloyalty().then((res) => {
          if (!!res) {
            setCardData(res?.data[0])
          }
        })
      } catch (err) {
        toast.error("something want's wrong")
      }
    }
    getTotal()
  }, [])

  useEffect(() => {
    const cashBackReports = async () => {
      try {
        await cashBackService.getCashBackReports(payloadData).then((res) => {
          console.log({ res })
          if (!!res) {
            setReportData(res?.data)
          }
        })
      } catch (err) {
        console.error({ err })
      }
    }
    cashBackReports()
  }, [payloadData])

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      page: page,
      limits: sizePerPage,
      sortBy: sortField,
      orderBy: sortOrder,
      skip: 0,
      search: search,
      startDate: dateRangeValue.start
        ? moment(dateRangeValue.start).format("MM-DD-YYYY")
        : "",
      endDate: dateRangeValue.end
        ? moment(dateRangeValue.end).format("MM-DD-YYYY")
        : "",
      provider: filter?.provider || "",
      services: filter?.services || "",
    }))
  }, [sizePerPage, page, sortOrder, sortField, search])

  const handleFilterData = () => {
    setPayloadData((prev) => ({
      ...prev,
      page: 1,
      provider: filter?.provider || "",
      services: filter?.services || "",
      search: searchString,
      startDate: dateRangeValue.start
        ? moment(dateRangeValue.start).format("MM-DD-YYYY")
        : "",
      endDate: dateRangeValue.end
        ? moment(dateRangeValue.end).format("MM-DD-YYYY")
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
        getCashBackList(payload, (status) => {
          if (status) {
            const exportData = status?.data
              ?.filter(
                (item) =>
                  item?.transactionData?.status === CONSTANT_STATUS.SUCCESS
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
                "CashBack Amount": item?.transactionData?.cashBackAmount
                  ? item?.transactionData?.cashBackAmount
                  : "-",
                "Recharge Amount": item?.transactionData?.rechargeAmount
                  ? item?.transactionData?.rechargeAmount
                  : "-",
                "User FinalBalance": item?.transactionData?.userFinalBalance
                  ? item?.transactionData?.userFinalBalance
                  : "-",
                "CashBack Receive": item?.cashBackReceive
                  ? item?.cashBackReceive
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

  const columns = useMemo(
    () => [
      {
        text: "No.",
        dataField: "no",
        headerStyle: (column, colIndex) => ({
          width: "10%",
          textAlign: "center",
        }),

        // headerStyle: { width: "50px" },
        style: { height: "30px" },
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
        headerStyle: { width: "50px" },
        style: { height: "30px" },
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.created
              ? moment(row?.created).format("DD/MM/YYYY HH:mm:ss")
              : "-"}
          </div>
        ),
      },
      {
        text: "User Name",
        dataField: "userDetail.userName",
        sort: true,
        headerStyle: { width: "50px" },
        style: { height: "30px" },
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
        headerStyle: { width: "50px" },
        style: { height: "30px" },
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
        text: "Operator Id",
        dataField: "operatorId",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.rechargeData?.OPRID
              ? row?.transactionData?.rechargeData?.OPRID
              : row?.transactionData?.rechargeData?.opid
              ? row?.transactionData?.rechargeData?.opid
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
            {row?.transactionData?.customerNo
              ? row?.transactionData?.customerNo
              : "-"}
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
        text: "cashBack Receive",
        dataField: "cashBackReceive",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.cashBackReceive ? row?.cashBackReceive : "-"}
          </div>
        ),
      },
      {
        text: "user CashBack",
        dataField: "userCashBack",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.userCashBack ? row?.userCashBack : "-"}
          </div>
        ),
      },
      {
        text: "referral CashBack",
        dataField: "referralCashBack",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.referralCashBack}</div>
        ),
      },
      {
        text: "net CashBack",
        dataField: "netCashBack",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.netCashBack ? row?.netCashBack : "-"}
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
                : row?.status === "pending"
                ? "warning"
                : "danger"
            }`}
          >
            <span
              className={`text-capitalize text-white p-1 rounded bg-${
                row?.status === CONSTANT_STATUS.SUCCESS
                  ? "success"
                  : row?.status === "pending"
                  ? "warning"
                  : "danger"
              }`}
            >
              {row?.status ? row?.status : row?.transactionData?.status}
            </span>
          </div>
        ),
      },
    ],
    [page, sizePerPage]
  )

  const handleDiscountClose = () => {
    setdDiscountInfo([])
    setIsDiscountEdit(false)
    setIsShowDiscountModal(false)
  }

  useEffect(() => {
    dispatch(getStateList())
    dispatch(getCompanies())
  }, [dispatch])

  useEffect(() => {
    getCashBackListData()
  }, [payloadData])

  const getCashBackListData = () => {
    dispatch(getCashBackList(payloadData))
  }

  useEffect(() => {
    if (cashBackData) {
      setCashBackListData(cashBackData?.transactions)
    }
  }, [cashBackData, stateList, companyList])

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    console.log({ type, page, sizePerPage, sortField, sortOrder })
    switch (type) {
      case "sort":
        dispatch(setSortFieldOfCashBack(sortField))
        dispatch(setSortOrderOfCashBack(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageCashBack(page))
        dispatch(setSizePerPageCashBack(sizePerPage))
        break
      default:
        break
    }
  }

  const handleSearch = (e) => {
    setSearchString(e.target.value.trim())
  }

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
          {/* <ReportStatCards cardData={cardData} /> */}
          <ReportsCard cardData={reportData} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h2 className="main-heading">Cashback List</h2>
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
                    className={`btn btn-primary ${
                      exportLoading ? "disabled" : ""
                    }`}
                    type="button"
                    onClick={handleFilterData}
                  >
                    <AiOutlineSearch />
                  </button>

                  <button
                    className={`ms-2 btn btn-secondary ${
                      exportLoading ? "disabled" : ""
                    }`}
                    type="button"
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
                  data={cashBackList}
                  columns={columns}
                  showSearch={false}
                  onTableChange={onTableChange}
                  withPagination={true}
                  loading={loading}
                  withCard={false}
                ></CustomTable>

                {isShowDiscountModal && (
                  <CashBackViewModal
                    discountInfo={discountInfo}
                    isDiscountEdit={isDiscountEdit}
                    isShowDiscountModal={isShowDiscountModal}
                    onCloseDiscountModal={handleDiscountClose}
                    fetchCashBackList={getCashBackListData}
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

export default CashBackList
