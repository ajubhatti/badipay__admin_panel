import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCashBackList,
  setPageCashBack,
  setSizePerPageCashBack,
  setSortFieldOfCashBack,
  setSortOrderOfCashBack,
} from "./store/action"
import { AiOutlineEdit, AiFillDelete, AiFillEye } from "react-icons/ai"
import { getStateList } from "../utilities/store/action"
import { getCompanies } from "../api-settings/company-listing/store/action"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import CashBackViewModal from "./CashBackViewModal"
import CustomDateRangePicker from "./CustomDateRangePicker"

import { ExportToCsv } from "export-to-csv"
import { toast } from "react-toastify"
import ReportsCard from "./ReportsCard"
import ReportStatCards from "./ReportStatCards"

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

  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState([])
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)

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
    setPayloadData((previousData) => ({
      ...previousData,
      page: page,
      limits: sizePerPage,
      sortBy: "created",
      orderBy: "desc",
      skip: 0,
      search: "",
    }))
  }, [sizePerPage, page])

  const handleFilterData = () => {
    setPayloadData((prev) => ({
      ...prev,
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
            const exportData = status?.data?.map((item) => {
              return {
                date:
                  moment(item?.created).format("DD/MM/YYYY, h:mm:ss a") || "-",
                Payment_type: item?.type || "-",
                Transaction_Id: item?.transactionId || "-",
                Slip_No: !!item?.slipNo ? item?.slipNo : "-",
                Remark: item?.remark || "-",
                Customer_No: !!item?.customerNo ? item?.customerNo : "-",
                Balance: item?.userBalance || "-",
                Request_Amount: item?.requestAmount || "-",
                Recharge_Amount: item?.rechargeAmount || "-",
                Cashback_Amount: !!item.cashBackAmount
                  ? item?.cashBackAmount
                  : "-",
                Final_Balance: item?.userFinalBalance || "-",
                Amount: item?.amount || "-",
                status: item?.status || "-",
              }
            })
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

  const GetActionFormat = (cell, row) => (
    <div>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
        size="sm"
        onClick={() => handleView(cell, row)}
      >
        <AiFillEye />
      </button>
    </div>
  )

  const GetTime = (cell, row) =>
    moment(row?.created).format("DD-MM-YYYY HH:mm:ss")

  const columns = useMemo(
    () => [
      {
        text: "No.",
        dataField: "no",
        headerStyle: (colum, colIndex) => ({
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
              ? moment(row?.created).format("DD/MM/YYYY hh:mm:ss")
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
              row?.transactionData?.status === "success"
                ? "success"
                : row?.transactionData?.status === "pending"
                ? "warning"
                : "danger"
            }`}
          >
            <span
              className={`text-capitalize text-white p-1 rounded bg-${
                row?.transactionData?.status === "success"
                  ? "success"
                  : row?.transactionData?.status === "pending"
                  ? "warning"
                  : "danger"
              }`}
            >
              {row?.transactionData?.status}
            </span>
          </div>
        ),
      },
    ],
    [page, sizePerPage]
  )

  const handleDelete = (cell, row) => {
    console.log("object delete:>> ", { cell, row })
  }

  const handleView = (cell, row) => {
    console.log("object view:>> ", { cell, row })
  }

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

  // const handleEdit = (cell, row) => {
  //     console.log("edit ---", row)
  //     handleDiscountClose(true)
  //     setModalData(row)
  //     // navigate("/api-setting/api/add/" + row._id)
  // }

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

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12">
          <ReportStatCards />
          <ReportsCard />
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
                >
                  <div className="position-relative">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="me-2">
                          <label>Search</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="search"
                            onChange={handleSearch}
                          />
                        </div>

                        <CustomDateRangePicker
                          rangeDate={dateRangeValue}
                          setRangeDate={setDateRangeValue}
                        />

                        <div className="me-2 d-flex align-items-end">
                          <button
                            className={`btn btn-secondary ${
                              exportLoading ? "disabled" : ""
                            }`}
                            onClick={handleFilterData}
                          >
                            Find
                          </button>
                        </div>
                      </div>
                      <div className="me-2 d-flex align-items-end">
                        <button
                          className={`btn btn-secondary ${
                            exportLoading ? "disabled" : ""
                          }`}
                          onClick={handleCSV}
                        >
                          {exportLoading ? "Exporting.." : "Export CSV"}
                        </button>
                      </div>
                    </div>
                  </div>
                </CustomTable>

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
