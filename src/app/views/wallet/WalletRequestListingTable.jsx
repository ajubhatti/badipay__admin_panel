import React, { useEffect, useMemo, useState } from "react"
import AddUpdateUserDialog from "../user/AddUpdateUserDialog"
import "jspdf-autotable"
import moment from "moment"
import { walletServices } from "../../services/wallet.service"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllWalletList,
  getWalletList,
  setPageWallet,
  setSizePerPageWallet,
  setSortFieldOfWallet,
  setSortOrderOfWallet,
} from "./store/action"
import { toast } from "react-toastify"
import ApproveRejectDialog from "./ApproveRejectDialog"
import { Button } from "react-bootstrap"
import ApprovalDialog from "./ApprovalDialog"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import { AiOutlineDownload, AiOutlineSearch } from "react-icons/ai"
import CustomDateRangePicker from "../reports/CustomDateRangePicker"
import { ExportToCsv } from "export-to-csv"
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

const WalletRequestListingTable = () => {
  const dispatch = useDispatch()
  const { reportType } = useParams()

  const { loading, page, sizePerPage, totalSize, walletLists } = useSelector(
    (state) => state.wallet
  )

  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState({})
  const [type, setType] = useState("reject")
  const [load, setLoad] = useState(false)

  const [show, setShow] = useState(false)
  const [idForChange, setIdForChange] = useState("")

  const [searchString, setSearchString] = useState("")
  const [dateRangeValue, setDateRangeValue] = useState({
    start: null,
    end: null,
  })

  const [filter, setFilter] = useState({ provider: "", services: "" })

  const [exportLoading, setExportLoading] = useState(false)

  const handleChangeStatus = (data) => {
    if (data?.statusOfWalletRequest === "pending") {
      setShow(true)
      setIdForChange(data._id)
    } else {
      toast.warning("Already request approved!")
    }
  }

  const handleSaveUpdate = async (data) => {
    let payload = {
      id: modalData.id,
      statusOfWalletRequest: modalData.data,
      userId: "",
    }
    if (data.reason) {
      payload.reason = data.reason
    }

    await walletServices.updateWalletStatus(payload).then((res) => {
      if (res.status === 200) {
        toast.success("Status updated successfully")
        setModalShow(false)
      }
      getWalletListData()
    })
  }

  const handleSaveUpdate2 = async (data) => {
    setLoad(true)
    let payload = {
      id: idForChange,
      statusOfWalletRequest: data.type,
      userId: "",
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
        setModalShow(false)
        setShow(false)
      }
      setLoad(false)
      getWalletListData()
    })
  }

  // ==========================================

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 25,
    sortBy: "created",
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

  useEffect(() => {
    getWalletListData()
  }, [payloadData])

  const getWalletListData = () => {
    dispatch(getWalletList(payloadData))
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
        formatters: (cell, row) => <div>{row?.remark ? row?.remark : "-"}</div>,
      },
      {
        text: "Mode",
        dataField: "paymnetModeData.modeName",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div>
            {row?.paymnetModeData?.modeName
              ? row?.paymnetModeData?.modeName
              : "-"}
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
              ? moment(row?.statusChangeDate).format("DD-MM-YYYY HH:mm:ss")
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
                // variant="primary"
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
                  // if (row?.statusOfWalletRequest === "pending") {
                  handleChangeStatus(row)
                  // }
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
      //         onClick={() => handleDelete(cell, row)}
      //       >
      //         <AiFillDelete />
      //       </button>
      //       <button
      //         type="button"
      //         className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
      //         size="sm"
      //         onClick={() => handleView(cell, row)}
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
        getAllWalletList(payload, (status) => {
          if (status) {
            const exportData = status?.data
              ?.filter((item) => item.statusOfWalletRequest === "approve")
              ?.map((item, index) => ({
                No: index + 1,
                Date:
                  moment(item?.created).format("DD/MM/YYYY, hh:mm:ss") || "-",
                "User Name": item?.userDetail?.userName || "-",
                "Phone Number": item?.userDetail?.phoneNumber || "-",
                "Slip No": item?.slipNo || "",
                "Deposit Bank": item?.bankData?.bankdetails?.bankName || "-",
                "Request Amount": item?.requestAmount || "-",
                "Approve Amount": item?.approveAmount || "-",
                "Debit Amount": item?.debitAmount || "-",
                Remarks: item?.remark || "-",
                "Paymnet Mode": item?.paymnetModeData?.modeName || "-",
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

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="main-heading">Wallet List</h2>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 d-flex">
                <div className="col-md-6 d-flex ">
                  {/* <div className="me-2">
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
                  </div> */}
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

      <AddUpdateUserDialog setOpen={setOpen} open={open} userData={userData} />

      <ApproveRejectDialog
        show={modalShow}
        onHide={() => setModalShow(false)}
        message={type}
        handleSave={(data) => {
          handleSaveUpdate(data)
        }}
      />

      <ApprovalDialog
        show={show}
        onHide={() => setShow(false)}
        message={type}
        handleSave={(data) => {
          handleSaveUpdate2(data)
        }}
        isLoading={load}
      />
    </div>
  )
}

export default WalletRequestListingTable
