import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getTransactionsList,
  setPageTransactions,
  setResetData,
  setSizePerPageTransactions,
  setSortFieldOfTransactions,
  setSortOrderOfTransactions,
} from "./store/action"
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai"
import { getStateList } from "../utilities/store/action"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import TransactionViewModal from "./TransactionViewModal"
import { useCallback } from "react"
import CustomDateRangePicker from "../reports/CustomDateRangePicker"
import { discountServices } from "app/services/discount.service"
import { toast } from "react-toastify"
import { ExportToCsv } from "export-to-csv"
import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import { statusList } from "app/constants/constant"
import { getServiceCategories } from "../api-settings/services-listing/store/action"

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

const Transactions = () => {
  const dispatch = useDispatch()

  const { loading, page, sizePerPage, totalSize, transactionList } =
    useSelector((state) => state.recharge)
  const { serviceCategoryList } = useSelector((state) => state.servicesList)

  const [dateRangeValue, setDateRangeValue] = useState({
    start: new Date(),
    end: new Date(),
  })
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [services, setServices] = useState([])
  const [isShowDiscountModal, setIsShowDiscountModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState([])
  const [isDiscountEdit, setIsDiscountEdit] = useState(false)
  const [filter, setFilter] = useState({
    api: "",
    services: "",
    category: "",
    status: "",
  })
  const [exportLoading, setExportLoading] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 25,
    sortBy: "updatedAt",
    orderBy: "DESC",
    skip: 0,
    search: "",
    category: "",
    startDate: moment(dateRangeValue?.start).format("MM-DD-yyyy"), //"10-15-2022",
    endDate: moment(dateRangeValue?.end).format("MM-DD-yyyy"),
    api: "",
    services: "",
    status: "",
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
    let categoty = serviceCategoryList
      .filter((ctgry) => {
        return ctgry.isActive
      })
      .map(function (ctgry) {
        return { value: ctgry._id, label: ctgry.categoryName }
      })
    setCategories(categoty)
  }, [serviceCategoryList])

  useEffect(() => {
    dispatch(getServiceCategories())
  }, [dispatch])

  useEffect(() => {
    const getAllProviders = async () => {
      await discountServices.getAllApisAndServices().then((res) => {
        let api = []
        api = res?.apisResponse?.data?.data
          .filter((api) => {
            return api.isActive
          })
          .map(function (api) {
            return { value: api._id, label: api.apiName }
          })

        setProviders(api)

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

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      page: page,
      limits: sizePerPage,
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
              ? moment(row?.created).format("DD/MM/YYYY, HH:mm:ss")
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
            {console.log(
              "responseOperatorId",
              row?.apiData?.responseOperatorId,
              "----",
              row?.rechargeData?.OPRID,
              row?.rechargeData?.opid,
              row?.rechargeData[row?.apiData?.responseOperatorId]
            )}
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
            {row?.operatorData?.operatorName
              ? row?.operatorData?.operatorName
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
            {row?.apiData?.apiName ? row?.apiData?.apiName : "-"}
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
            {row?.userBalance ? row?.userBalance : 0}
          </div>
        ),
      },
      {
        text: "Request Amount",
        dataField: "requestAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.requestAmount ? row?.requestAmount : 0}
          </div>
        ),
      },
      {
        text: "CashBack Amount",
        dataField: "cashBackAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.cashBackAmount ? row?.cashBackAmount : 0}
          </div>
        ),
      },
      {
        text: "Recharge Amount",
        dataField: "rechargeAmount",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.rechargeAmount ? row?.rechargeAmount : 0}
          </div>
        ),
      },
      {
        text: "FinalBalance",
        dataField: "userFinalBalance",
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.userFinalBalance ? row?.userFinalBalance : 0}
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
            {/* <button
              type="button"
              className="btn btn-outline-primary btn-sm ts-buttom m-1"
              size="sm"
              onClick={() => handleEdit(row)}
            >
              <AiOutlineEdit style={{ color: "green" }} />
            </button> */}
            <button
              type="button"
              className="btn text-danger btn-sm p-1"
              size="sm"
              onClick={() => handleDelete(row)}
            >
              <AiFillDelete />
            </button>
            <button
              type="button"
              className="btn text-primary btn-sm p-1"
              size="sm"
              onClick={() => handleView(row)}
            >
              <AiFillEye />
            </button>
          </div>
        ),
      },
    ],
    [page, sizePerPage]
  )

  const handleDelete = (row) => {}

  const handleView = (row) => {}

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
    return () => {
      dispatch(setResetData())
    }
  }, [dispatch])

  const getTransactionList = useCallback(() => {
    dispatch(getTransactionsList(payloadData))
  }, [dispatch, payloadData])

  useEffect(() => {
    getTransactionList()
  }, [getTransactionList])

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
      }
      // dispatch(
      //   getCashBackList(payload, (status) => {
      //     if (status) {
      //       const exportData = status?.data?.map((item) => {
      //         return {
      //           date:
      //             moment(item?.created).format("DD/MM/YYYY, h:mm:ss a") || "-",
      //           name: item?.userDetail?.userName || "-",
      //           phoneNumber: item?.userDetail?.phoneNumber || "-",
      //           transactionNumber: item?.transactionData?.transactionId || "",
      //           operatorId:
      //             item?.transactionData?.rechargeData?.OPRID ||
      //             item?.transactionData?.rechargeData?.opid ||
      //             "-",
      //           operatorName: item?.transactionData?.rechargeData
      //             ?.rechargeOperator?.companyName
      //             ? item?.transactionData?.rechargeData?.rechargeOperator
      //                 ?.companyName
      //             : "-",
      //           apiName: item?.transactionData?.rechargeData?.rechargeApi
      //             ?.apiName
      //             ? item?.transactionData?.rechargeData?.rechargeApi?.apiName
      //             : "-",
      //           customerNumber: item?.transactionData?.customerNo
      //             ? item?.transactionData?.customerNo
      //             : "-",
      //           userBalance: item?.transactionData?.userBalance
      //             ? item?.transactionData?.userBalance
      //             : "-",
      //           requestAmount: item?.transactionData?.requestAmount
      //             ? item?.transactionData?.requestAmount
      //             : "-",
      //           cashBackAmount: item?.transactionData?.cashBackAmount
      //             ? item?.transactionData?.cashBackAmount
      //             : "-",
      //           rechargeAmount: item?.transactionData?.rechargeAmount
      //             ? item?.transactionData?.rechargeAmount
      //             : "-",
      //           userFinalBalance: item?.transactionData?.userFinalBalance
      //             ? item?.transactionData?.userFinalBalance
      //             : "-",
      //           cashBackReceive: item?.cashBackReceive
      //             ? item?.cashBackReceive
      //             : "-",
      //           userCashBack: item?.userCashBack ? item?.userCashBack : "-",
      //           referralCashBack: item?.referralCashBack,
      //           netCashBack: item?.netCashBack ? item?.netCashBack : "-",
      //           remark: !!item?.transactionData?.remark
      //             ? item?.transactionData?.remark
      //             : "-",
      //           status: item?.transactionData?.status,
      //         }
      //       })
      //       setExportLoading(false)
      //       csvExporter.generateCsv(exportData)
      //     }
      //   })
      // )
    } catch (err) {
      setExportLoading(false)
      toast.err("something want's wrong!!")
    }
  }

  const resetValue = () => {
    setFilter({ api: "", services: "" })
    setDateRangeValue({
      start: null,
      end: null,
    })
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">Transaction List</h6>
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
                      placeHolder={"Select Api"}
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
                      placeHolder={"Select Service"}
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

                    <ReactSelect
                      isClearable={true}
                      title={"Status"}
                      name="status"
                      placeHolder={"Select Status"}
                      handleChange={(e) => {
                        setFilter((prev) => ({
                          ...prev,
                          status: e,
                        }))
                      }}
                      options={statusList}
                      selectedValue={filter.status || ""}
                      className="filter-select"
                    />
                  </div>
                  <div className="d-flex filter-flex-wrap">
                    <div className="me-2 mt-2">
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
                    <div className="d-flex mt-2">
                      <button
                        className={`btn btn-primary`}
                        onClick={() => handleFilterData()}
                      >
                        <AiOutlineSearch />
                      </button>

                      {/* <button
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
                  </button> */}
                      <button
                        className={`btn btn-primary ms-2`}
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
                    data={transactionList || []}
                    columns={columns}
                    showSearch={false}
                    onTableChange={onTableChange}
                    withPagination={true}
                    loading={loading}
                    withCard={false}
                  />

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
    </div>
  )
}

export default Transactions
