import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCashBackList,
  getCashBackReport,
  setPageCashBack,
  setSizePerPageCashBack,
  setSortFieldOfCashBack,
  setSortOrderOfCashBack,
} from "./store/action"
import { getStateList } from "../utilities/store/action"
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
import ReactSelect from "app/components/ReactDropDown/ReactSelect"

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: true,
  title: "Cashback Report",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename: "cashback",
}

const csvExporter = new ExportToCsv(options)

const CashBackList = () => {
  const dispatch = useDispatch()

  const {
    loading,
    page,
    sizePerPage,
    totalSize,
    search,
    sortField,
    sortOrder,
    cashBackList,
  } = useSelector((state) => state.reports)

  const [exportLoading, setExportLoading] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [dateRangeValue, setDateRangeValue] = useState({
    start: new Date(),
    end: new Date(),
  })
  const [filter, setFilter] = useState({ provider: "", services: "" })
  const [providers, setProviders] = useState([])
  const [services, setServices] = useState([])
  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState([])
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
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

  const [cashBackListData, setCashBackList] = useState([])

  useEffect(() => {
    setCashBackList(cashBackList)
  }, [cashBackList])

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
    const cashBackReports = async () => {
      try {
        await cashBackService.getCashBackReports(payloadData).then((res) => {
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
  }, [sizePerPage, page, sortOrder, sortField, search, dateRangeValue, filter])

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
        getCashBackReport(payload, (status) => {
          if (status) {
            const exportData = status?.data
              ?.filter(
                (item) =>
                  item?.transactionData?.status === CONSTANT_STATUS.SUCCESS
              )
              ?.map((item) => ({
                Date:
                  moment(item?.created).format("DD/MM/YYYY, HH:mm:ss") || "-",
                "User Name": item?.userDetail?.userName || "-",
                "Phone Number": item?.userDetail?.phoneNumber || "-",
                "Transaction No": item?.transactionData?.transactionId || "-",
                "Operator Id":
                  item?.transactionData?.rechargeData?.OPRID ||
                  item?.transactionData?.rechargeData?.opid ||
                  "-",
                "Operator Name": item?.transactionData?.rechargeData
                  ?.operatorConfig?.operatorData?.operatorName
                  ? item?.transactionData?.rechargeData?.operatorConfig
                      ?.operatorData?.operatorName
                  : "-",

                "Api Name": item?.transactionData?.rechargeData?.operatorConfig
                  ?.apiData?.apiName
                  ? item?.transactionData?.rechargeData?.operatorConfig?.apiData
                      ?.apiName
                  : "-",
                "Customer Number": item?.transactionData?.customerNo
                  ? item?.transactionData?.customerNo
                  : "-",
                "User Balance": item?.transactionData?.userBalance
                  ? item?.transactionData?.userBalance
                  : 0,
                "Request Amount": item?.transactionData?.requestAmount
                  ? item?.transactionData?.requestAmount
                  : 0,
                "CashBack Amount": item?.transactionData?.cashBackAmount
                  ? item?.transactionData?.cashBackAmount
                  : 0,
                "Recharge Amount": item?.transactionData?.rechargeAmount
                  ? item?.transactionData?.rechargeAmount
                  : 0,
                "User FinalBalance": item?.transactionData?.userFinalBalance
                  ? item?.transactionData?.userFinalBalance
                  : 0,
                "CashBack Receive": item?.cashBackReceive
                  ? item?.cashBackReceive
                  : 0,
                "User CashBack": item?.userCashBack ? item?.userCashBack : 0,
                "Referral CashBack": item?.referralCashBack || 0,
                "Net CashBack": item?.netCashBack ? item?.netCashBack : 0,
                "Final Recharge Amount": item?.finalAmount,
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
              ? moment(row?.created).format("DD/MM/YYYY, HH:mm:ss")
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
            {row?.transactionData?.rechargeData?.operatorConfig?.operatorData
              ?.operatorName
              ? row?.transactionData?.rechargeData?.operatorConfig?.operatorData
                  ?.operatorName
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
            {row?.transactionData?.rechargeData?.operatorConfig?.apiData
              ?.apiName
              ? row?.transactionData?.rechargeData?.operatorConfig?.apiData
                  ?.apiName
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
              : 0}
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
              : 0}
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
              : 0}
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
              : 0}
          </div>
        ),
      },
      {
        text: "Final Balance",
        dataField: "userFinalBalance",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.userFinalBalance
              ? row?.transactionData?.userFinalBalance
              : 0}
          </div>
        ),
      },
      {
        text: "CashBack Receive",
        dataField: "cashBackReceive",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.cashBackReceive ? row?.cashBackReceive : 0}
          </div>
        ),
      },
      {
        text: "User CashBack",
        dataField: "userCashBack",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.userCashBack ? row?.userCashBack : 0}
          </div>
        ),
      },
      {
        text: "Referral CashBack",
        dataField: "referralCashBack",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.referralCashBack || 0}</div>
        ),
      },
      {
        text: "Net CashBack",
        dataField: "netCashBack",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.netCashBack ? row?.netCashBack : 0}
          </div>
        ),
      },
      {
        text: "Final Amount",
        dataField: "finalAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.finalAmount ? row?.finalAmount : 0}
          </div>
        ),
      },

      {
        text: "Remark",
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
        text: "Status",
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
  }, [dispatch])

  useEffect(() => {
    dispatch(getCashBackList(payloadData))
  }, [payloadData, dispatch])

  const getCashBackListData = () => {
    dispatch(getCashBackList(payloadData))
  }

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
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
        provider = res?.apisResponse?.data?.data
          .filter((provider) => {
            return provider.isActive
          })
          .map(function (provider) {
            return { value: provider._id, label: provider.apiName }
          })

        setProviders(provider)

        let service = []
        service = res?.serviceResponse?.data?.data
          .filter((service) => {
            return service.isActive
          })
          .map(function (service) {
            return { value: service._id, label: service.serviceName }
          })

        setServices(service)
      })
    }
    getAllProviders()
  }, [])

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12">
          <ReportsCard cardData={reportData} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">Cashback List</h6>
        </div>
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 d-flex">
                  <div className="col-md-6 d-flex ">
                    <div className="me-2">
                      <ReactSelect
                        isClearable={true}
                        title={"Provider"}
                        name="provider"
                        placeHolder={"select provider"}
                        handleChange={(e) => {
                          setFilter((prev) => ({
                            ...prev,
                            provider: e,
                          }))
                        }}
                        options={providers}
                        selectedValue={filter.provider || ""}
                        width={165}
                      />
                    </div>
                    <div className="me-2">
                      <ReactSelect
                        isClearable={true}
                        title={"Services"}
                        name="services"
                        placeHolder={"select services"}
                        handleChange={(e) => {
                          setFilter((prev) => ({
                            ...prev,
                            services: e,
                          }))
                        }}
                        options={services}
                        selectedValue={filter.services || ""}
                        width={165}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="me-2">
                      <input
                        type="text"
                        className="form-control search-text-box"
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
                <hr className="m-0" />
                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    pageOptions={pageOptions}
                    keyField="_id"
                    data={cashBackListData}
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
    </div>
  )
}

export default CashBackList
