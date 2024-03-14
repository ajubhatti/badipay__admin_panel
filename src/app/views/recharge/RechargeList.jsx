import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getRechargeList,
  getRechargeListForPrint,
  rechargeComplaints,
  setPageTransactions,
  setResetData,
  setSizePerPageTransactions,
  setSortFieldOfTransactions,
  setSortOrderOfTransactions,
} from "./store/action"
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai"
import { BsChatSquareQuote } from "react-icons/bs"
import { getStateList } from "../utilities/store/action"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import CustomDateRangePicker from "../reports/CustomDateRangePicker"
import { toast } from "react-toastify"
import { discountServices } from "app/services/discount.service"
import RechargeViewModal from "./RechargeViewModal"
import { ExportToCsv } from "export-to-csv"
import {
  CONSTANT_STATUS,
  statusList,
  statusListOfAPI,
} from "app/constants/constant"
import { useParams } from "react-router-dom"
import ComplaintEditModal from "./ComplaintEditModal"
import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import { getServiceCategories } from "../api-settings/services-listing/store/action"

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: true,
  title: "Recharge Report",
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
  const { serviceCategoryList } = useSelector((state) => state.servicesList)

  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)

  const [isShowComplainModal, setIsShowComplainModal] = useState(false)
  const [discountInfo, setDiscountInfo] = useState({})
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
  const [filter, setFilter] = useState({
    api: "",
    services: "",
    status: "",
    category: "",
  })
  const [searchString, setSearchString] = useState("")
  const [dateRangeValue, setDateRangeValue] = useState({
    // start: new Date("07-08-2023"),
    // end: new Date("07-08-2023"),
    start: new Date(),
    end: new Date(),
  })
  const [exportLoading, setExportLoading] = useState(false)
  const [providers, setApis] = useState([])
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [payloadData, setPayloadData] = useState({
    startDate: moment(dateRangeValue?.start).format("MM-DD-yyyy"), //"10-15-2022",
    endDate: moment(dateRangeValue?.end).format("MM-DD-yyyy"),
    api: "",
    services: "",
    category: "",
    status: reportType ? "success" : "",
  })

  useEffect(() => {
    const getAllProviders = async () => {
      await discountServices.getAllApisAndServices().then((res) => {
        let apis = []
        apis = res?.apisResponse?.data?.data.map(function (apis) {
          return { value: apis._id, label: apis.apiName }
        })
        setApis(apis)

        let service = []
        service = res?.serviceResponse?.data?.data.map(function (service) {
          return { value: service._id, label: service.serviceName }
        })
        setServices(service)
      })
    }
    getAllProviders()
  }, [])

  useEffect(() => {
    let categoty = serviceCategoryList.map(function (ctgry) {
      return { value: ctgry._id, label: ctgry.categoryName }
    })
    setCategories(categoty)
  }, [serviceCategoryList])

  useEffect(() => {
    dispatch(getServiceCategories())
  }, [dispatch])

  const handleDelete = (row) => {}

  const handleView = (row) => {}

  const handleComplaints = (row) => {
    if (!row.complaintStatus) {
      dispatch(
        rechargeComplaints(row, (cb) => {
          if (cb?.status === 200) {
            if (cb?.data?.STATUSCODE !== "0" || cb?.data?.status !== "2")
              toast.error(cb.data.STATUSMSG || cb.data.msg)
            else toast.success(cb.data.STATUSMSG || cb.data.msg)
          }
        })
      )
      getTransactionList()
    } else {
      toast.error("Already complained!")
    }
  }

  const handleDiscountClose = () => {
    setDiscountInfo({})
    setIsDiscountEdit(false)
    setIsShowDiscountModal(false)
  }

  const handleEdit = (info) => {
    setDiscountInfo(info)
    setIsDiscountEdit(true)
    setIsShowDiscountModal(true)
  }

  const handleComplaintEdit = (info) => {
    setDiscountInfo(info)
    setIsShowComplainModal(true)
  }

  const handleComplainModalClose = () => {
    setDiscountInfo({})
    setIsShowComplainModal(false)
  }

  useEffect(() => {
    dispatch(getStateList())
    return () => {
      dispatch(setResetData())
    }
  }, [dispatch])

  const getTransactionList = useCallback(() => {
    if (payloadData?.page) {
      dispatch(getRechargeList(payloadData))
    }
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
    setExportLoading(false)
    setPayloadData((prev) => ({
      ...prev,
      page: page,
      api: filter?.api || "",
      services: filter?.services || "",
      status: filter?.status || "",
      category: filter?.category || "",
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
        page: 1,
      }
      dispatch(
        getRechargeListForPrint(payload, (listData) => {
          if (listData) {
            const exportData = listData?.data?.map((item) => {
              return {
                Date:
                  moment(item?.createdAt).format("DD/MM/YYYY, HH:mm:ss") || "-",
                "User Name": item?.userDetail?.userName || "-",
                "Phone Number": item?.userDetail?.phoneNumber || "-",
                "Transaction No": item?.transactionData?.transactionId || "",
                // "service type": item?.transactionData?.serviceTypeName || "-",
                "Operator Id":
                  item?.transactionData?.rechargeData?.OPRID ||
                  item?.transactionData?.rechargeData?.opid ||
                  "-",
                "Operator Name": item?.operatorData?.operatorName || "-",
                "Api Name": item?.apiData?.apiName || "-",
                "Customer Number": item?.transactionData?.customerNo || "-",
                "User Balance": item?.transactionData?.userBalance || 0,
                "Request Amount": item?.transactionData?.requestAmount || 0,
                "User CashBack": item?.transactionData?.cashBackAmount || 0,
                "Net CashBack": item?.transactionData?.netCashBack || 0,
                "Recharge Amount": item?.transactionData?.rechargeAmount || 0,
                "Final Balance": item?.transactionData?.userFinalBalance || 0,
                Remark: item?.transactionData?.remark || "-",
                Status: item?.transactionData?.status || item?.status,
              }
            })

            setExportLoading(false)
            csvExporter.generateCsv(exportData)
          }
        })
      )
      setExportLoading(false)
    } catch (err) {
      setExportLoading(false)
      toast.err("something want's wrong!!")
    }
  }

  const resetValue = () => {
    setFilter({ api: "", services: "", status: "", category: "" })
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
              ? moment(row?.created).format("DD/MM/YYYY, HH:mm:ss")
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
            {row?.userDetail?.phoneNumber || "-"}
          </div>
        ),
      },

      {
        text: "Transaction Id",
        dataField: "transactionId",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.transactionData?.transactionId || "-"}</div>
        ),
      },
      {
        text: "service type",
        dataField: "serviceName",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.serviceData?.serviceName || "-"}</div>
        ),
      },
      {
        text: "Operator Name",
        dataField: "operatorName",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.operatorData?.operatorName || "-"}
          </div>
        ),
      },
      {
        text: "Api Name",
        dataField: "apiName",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.apiData?.apiName || "-"}</div>
        ),
      },

      {
        text: "Customer No",
        dataField: "customerNo",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.customerNo || "-"}</div>
        ),
      },
      {
        text: "Balance",
        dataField: "userBalance",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.userBalance || 0}
          </div>
        ),
      },
      {
        text: "Request Amount",
        dataField: "requestAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.requestAmount || 0}
          </div>
        ),
      },
      {
        text: "CashBack Amount",
        dataField: "cashBackAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.cashBackAmount || 0}
          </div>
        ),
      },

      {
        text: "Recharge Amount",
        dataField: "rechargeAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.rechargeAmount || 0}
          </div>
        ),
      },

      {
        text: "FinalBalance",
        dataField: "userFinalBalance",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionData?.userFinalBalance || 0}
          </div>
        ),
      },
      {
        text: "remark",
        dataField: "remark",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            <span>{row?.transactionData?.remark || "-"}</span>
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
      {
        text: "Complain Status",
        dataField: "complaintStatus",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div
            className={`align-middle text-warning`}
            onClick={() => handleComplaintEdit(row)}
          >
            <span
              className={`text-capitalize text-white p-1 rounded bg-warning`}
            >
              {row?.complaintStatus ? row?.complaintStatus : "Complaint"}
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
              title="Complaint"
              size="sm"
              onClick={() => handleComplaints(row)}
            >
              <BsChatSquareQuote />
            </button>
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEdit(row)}
            >
              <AiOutlineEdit />
            </button>
            <button
              type="button"
              className="btn text-danger btn-sm"
              title="Delete"
              size="sm"
              onClick={() => handleDelete(row)}
            >
              <AiFillDelete />
            </button>
            <button
              type="button"
              className="btn text-primary btn-sm"
              title="Preview"
              size="sm"
              onClick={() => handleView(row)}
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
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">Recharge List</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="filter-flex-wrap justify-content-between mb-2">
                  <div className="filter-flex filter-flex-wrap">
                    <ReactSelect
                      isClearable={true}
                      title={"Apis"}
                      name="api"
                      placeHolder={"Api"}
                      handleChange={(e) => {
                        setFilter((prev) => ({
                          ...prev,
                          api: e,
                        }))
                      }}
                      options={providers}
                      selectedValue={filter.api || ""}
                      className="filter-select"
                    />
                    <ReactSelect
                      isClearable={true}
                      title={"Services"}
                      name="services"
                      placeHolder={"Service"}
                      handleChange={(e) => {
                        setFilter((prev) => ({
                          ...prev,
                          services: e,
                        }))
                      }}
                      options={services}
                      selectedValue={filter.services || ""}
                      className="filter-select"
                    />
                    <ReactSelect
                      isClearable={true}
                      title={"category"}
                      name="category"
                      placeHolder={"Category"}
                      handleChange={(e) => {
                        setFilter((prev) => ({
                          ...prev,
                          category: e,
                        }))
                      }}
                      options={categories}
                      selectedValue={filter.category || ""}
                      className="filter-select"
                    />
                    {/* {!reportType && ( */}
                    <ReactSelect
                      isClearable={true}
                      title={"Status"}
                      name="status"
                      placeHolder={"Status"}
                      handleChange={(e) => {
                        setFilter((prev) => ({
                          ...prev,
                          status: e,
                        }))
                      }}
                      options={statusListOfAPI}
                      selectedValue={filter.status || ""}
                      className="filter-select"
                    />
                    {/* )} */}
                    <div className="me-2">
                      <input
                        type="text"
                        className="form-control search-text-box"
                        placeholder="Search"
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="d-flex filter-flex-wrap">
                    <CustomDateRangePicker
                      rangeDate={dateRangeValue}
                      setRangeDate={setDateRangeValue}
                    />
                    <div className="d-flex mt-2">
                      <button
                        className={`btn btn-primary`}
                        type="button"
                        onClick={() => handleFilterData()}
                      >
                        <AiOutlineSearch />
                      </button>
                      {/* {reportType && ( */}
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
                      {/* )} */}

                      <button
                        className={`btn btn-primary ms-2`}
                        type="button"
                        onClick={resetValue}
                      >
                        <AiOutlineReload />
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="m-0" />

                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    pageOptions={pageOptions}
                    keyField="_id"
                    data={rechargeList || []}
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
                    />
                  )}

                  {isShowComplainModal && (
                    <ComplaintEditModal
                      discountInfo={discountInfo}
                      isShowComplainModal={isShowComplainModal}
                      onCloseDiscountModal={handleComplainModalClose}
                      fetchTransactionList={getTransactionList}
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

export default RechargeList
