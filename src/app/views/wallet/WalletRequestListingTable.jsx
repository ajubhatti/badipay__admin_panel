import React, { useEffect, useMemo, useState } from "react"
import "jspdf-autotable"
import moment from "moment"
import { walletServices } from "../../services/wallet.service"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllWalletList,
  getWalletList,
  getWalletReport,
  setPageWallet,
  setSizePerPageWallet,
  setSortFieldOfWallet,
  setSortOrderOfWallet,
} from "./store/action"
import { toast } from "react-toastify"
import { Button } from "react-bootstrap"
import ApprovalDialog from "./ApprovalDialog"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import {
  AiOutlineDownload,
  AiOutlineReload,
  AiOutlineSearch,
} from "react-icons/ai"
import CustomDateRangePicker from "../reports/CustomDateRangePicker"
import { ExportToCsv } from "export-to-csv"
import { useParams } from "react-router-dom"
import ReactSelect from "app/components/ReactDropDown/ReactSelect"
import { statusList } from "app/constants/constant"

const options = {
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  showTitle: true,
  title: "Wallet Report",
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
  filename: "wallet",
}

const csvExporter = new ExportToCsv(options)

const WalletRequestListingTable = () => {
  const dispatch = useDispatch()
  const { reportType } = useParams()

  const { loading, page, sizePerPage, totalSize, walletLists } = useSelector(
    (state) => state.wallet
  )

  const [load, setLoad] = useState(false)
  const [show, setShow] = useState(false)
  const [idForChange, setIdForChange] = useState("")
  const [searchString, setSearchString] = useState("")
  const [filter, setFilter] = useState({ status: "" })
  const [exportLoading, setExportLoading] = useState(false)
  const [dateRangeValue, setDateRangeValue] = useState({
    start: null,
    end: null,
  })

  const handleChangeStatus = (data) => {
    if (data?.statusOfWalletRequest === "pending") {
      setShow(true)
      setIdForChange(data._id)
    } else {
      toast.warning("Already request approved!")
    }
  }

  const handleSaveUpdate = async (data) => {
    setLoad(true)
    let payload = {
      id: idForChange,
      statusOfWalletRequest: data.type,
      userId: "",
      password: data.password,
    }
    if (data.reason) {
      payload.reason = data.reason
    }
    if (data.data.amount && data.type === "approve") {
      payload.amount = data.data.amount
    }

    await walletServices.updateWalletStatus(payload).then((res) => {
      if (res.status === 200) {
        toast.success("Status updated successfully")
        setShow(false)
      }
      setLoad(false)
      getWalletListData()
    })
  }

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 25,
    sortBy: "createdAt",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
    provider: "",
    services: "",
    status: reportType ? "approve" : "",
  })

  useEffect(() => {
    setPayloadData((previousData) => ({
      ...previousData,
      page: page,
      limits: sizePerPage,
    }))
  }, [sizePerPage, page])

  useEffect(() => {
    dispatch(getWalletList(payloadData))
  }, [dispatch, payloadData])

  const getWalletListData = () => {
    dispatch(getWalletList(payloadData))
  }

  const resetValue = () => {
    setSearchString("")
    setDateRangeValue({
      start: new Date(),
      end: new Date(),
    })
  }

  const columns = useMemo(
    () => [
      {
        text: "No.",
        dataField: "no",
        headerStyle: (colum, colIndex) => ({
          width: "10%",
          textAlign: "center",
        }),
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
        dataField: "createdAt",
        sort: true,
        headerStyle: { width: "50px" },
        style: { height: "30px" },
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.createdAt
              ? moment(row?.createdAt).format("DD/MM/YYYY, HH:mm:ss")
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
        text: "Slip No",
        dataField: "slipNo",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.slipNo ? row?.slipNo : "-"}</div>
        ),
      },

      {
        text: "Deposit Bank",
        dataField: "bankData.bankdetails.bankName",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>
            {row?.bankData?.bankdetails?.bankName
              ? row?.bankData?.bankdetails?.bankName
              : "-"}
          </div>
        ),
      },
      {
        text: "Requested Amount",
        dataField: "requestAmount",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.requestAmount ? row?.requestAmount : "-"}</div>
        ),
      },
      {
        text: "Approve Amount",
        dataField: "approveAmount",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.approveAmount ? row?.approveAmount : "-"}</div>
        ),
      },
      {
        text: "Debit Amount",
        dataField: "debitAmount",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.debitAmount ? row?.debitAmount : "-"}</div>
        ),
      },

      {
        text: "Remarks",
        dataField: "remark",
        formatters: (row) => <div>{row?.remark ? row?.remark : "-"}</div>,
      },
      {
        text: "Mode",
        dataField: "paymentMode.modeName",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>
            {row?.paymentMode?.modeName ? row?.paymentMode?.modeName : "-"}
          </div>
        ),
      },
      {
        text: "Approve Date",
        dataField: "statusChangeDate",
        headerStyle: { width: "10%" },
        formatter: (cell, row) => (
          <div>
            {row?.statusChangeDate
              ? moment(row?.statusChangeDate).format("DD/MM/YYYY, HH:mm:ss")
              : "-"}
          </div>
        ),
      },
      {
        text: "Approve By",
        dataField: "approveBy",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>{row?.approveBy ? row?.approveBy : "-"}</div>
        ),
      },

      {
        text: "Change Status",
        classes: "p-1",
        headerStyle: () => {
          return { width: "10%" }
        },
        formatter: (cell, row) => (
          <div className="d-flex">
            <div>
              <Button
                id="approve"
                type="button"
                size="sm"
                className={`btn btn-sm ml-2 ts-buttom m-1 btn-${
                  row?.statusOfWalletRequest === "pending"
                    ? "warning"
                    : row?.statusOfWalletRequest === "reject"
                    ? "danger"
                    : "success"
                }`}
                onClick={() => {
                  handleChangeStatus(row)
                }}
              >
                {row?.statusOfWalletRequest}
              </Button>
            </div>
          </div>
        ),
      },

      // {
      //   text: "Action",
      //   dataField: "edit",
      //   sort: false,
      //   formatter: (cell, row, rowIndex, formatExtraData) => (
      //     <div className="d-flex">
      //       <button
      //         type="button"
      //         className="btn btn-outline-primary btn-sm ts-buttom m-1"
      //         size="sm"
      //         onClick={() => handleEdit(row)}
      //       >
      //         <AiOutlineEdit style={{ color: "green" }} />
      //       </button>
      //       <button
      //         type="button"
      //         className="btn btn-outline-danger btn-sm ml-2 ts-buttom m-1"
      //         size="sm"
      //         onClick={() => handleDelete( row)}
      //       >
      //         <AiFillDelete />
      //       </button>
      //       <button
      //         type="button"
      //         className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
      //         size="sm"
      //         onClick={() => handleView( row)}
      //       >
      //         <AiFillEye />
      //       </button>
      //     </div>
      //   ),
      // },
    ],
    [page, sizePerPage]
  )

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
        dispatch(setSortFieldOfWallet(sortField))
        dispatch(setSortOrderOfWallet(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageWallet(page))
        dispatch(setSizePerPageWallet(sizePerPage))
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
      status: filter?.status || "",
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
        getWalletReport(payload, (status) => {
          if (status) {
            const exportData = status?.data
              ?.filter((item) => item.statusOfWalletRequest === "approve")
              ?.map((item, index) => ({
                No: index + 1,
                Date:
                  moment(item?.createdAt).format("DD/MM/YYYY, HH:mm:ss") || "-",
                "User Name": item?.userDetail?.userName || "-",
                "Phone Number": item?.userDetail?.phoneNumber || "-",
                "Slip No": item?.slipNo || "-",
                "Deposit Bank": item?.bankData?.bankdetails?.bankName || "-",
                "Request Amount": item?.requestAmount || 0,
                "Approve Amount": item?.approveAmount || 0,
                "Debit Amount": item?.debitAmount || 0,
                Remarks: item?.remark || "-",
                "Payment Mode": item?.paymentMode?.modeName || "-",
                "Approve Date": item?.statusChangeDate || "-",
                "Approve By": item?.approveBy || "-",
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
    const { value } = e.target
    setFilter((prev) => ({
      ...prev,
      status: value,
    }))
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">Wallet Request List</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="filter-flex-wrap justify-content-between mb-2">
                  <div className="filter-flex filter-flex-wrap">
                    {!reportType && (
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
                    )}
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
                        className={`btn btn-primary ${
                          exportLoading ? "disabled" : ""
                        }`}
                        type="button"
                        onClick={() => handleFilterData()}
                      >
                        <AiOutlineSearch />
                      </button>
                      {reportType && (
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
                      )}

                      <button
                        className={`btn btn-primary ms-2`}
                        type="button"
                        // onClick={resetValue}
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
                    data={walletLists}
                    columns={columns}
                    showSearch={false}
                    onTableChange={onTableChange}
                    withPagination={true}
                    loading={loading}
                    withCard={false}
                  ></CustomTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ApprovalDialog
        show={show}
        onHide={() => setShow(false)}
        handleSave={(data) => {
          handleSaveUpdate(data)
        }}
        isLoading={load}
      />
    </div>
  )
}

export default WalletRequestListingTable
