import React, { useEffect, useMemo, useState } from "react"
import { styled, useTheme } from "@mui/system"
import { Card, Icon, Table, MenuItem, Select, Fab } from "@mui/material"
import { accountService } from "../../services/account.service"
import AddUpdateUserDialog from "../user/AddUpdateUserDialog"
import { CSVLink } from "react-csv"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import DateRangePick from "../material-kit/dates/DateRangePick"
import moment from "moment"
import TextField from "@mui/material/TextField"
import { walletServices } from "../../services/wallet.service"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchWalletListing,
  setPageWallet,
  setSizePerPageWallet,
  setSortFieldOfWallet,
  setSortOrderOfWallet,
} from "./store/action"
import { toast } from "react-toastify"
import ReactBootstrapTable from "app/components/ReactBootStrapTable/ReactBootstrapTable"
import ApproveRejectDialog from "./ApproveRejectDialog"
import { Button } from "react-bootstrap"
import ApprovalDialog from "./ApprovalDialog"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import { AiFillDelete, AiFillEye, AiOutlineEdit } from "react-icons/ai"

const CardHeader = styled("div")(() => ({
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}))

const WalletRequestListingTable3 = () => {
  const { palette } = useTheme()
  const dispatch = useDispatch()

  const {
    walletList,
    loading,
    page,
    sizePerPage,
    totalSize,
    search,
    sortField,
    sortOrder,
    walletData,
    walletLists,
  } = useSelector((state) => state.wallet)

  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  // const [page, setPage] = React.useState(0)
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [downloadType, setDownloadType] = useState("csv")
  const [userType, setUserType] = useState("user")
  const [selectedDates, setSelectedDates] = useState([])
  const [searchText, setSearchText] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState({})
  const [type, setType] = useState("reject")
  const [load, setLoad] = useState(false)

  const [show, setShow] = useState(false)
  const [idForChange, setIdForChange] = useState("")

  console.log({ walletList })

  useEffect(() => {
    getAllWalletRequest()
  }, [userType, selectedDates, searchText])

  const handleChangePage = (event, newPage) => {
    // setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    // setPage(0)
  }

  const getAllWalletRequest = async () => {
    let startDate = moment(selectedDates[0]).format("YYYY-MM-DD")
    let endDate = moment(selectedDates[1]).format("YYYY-MM-DD")

    let payload = {
      // role: userType,
    }
    if (searchText !== "") {
      payload.searchText = searchText
    }
    if (selectedDates.length > 0) {
      payload.startDate = startDate
      payload.endDate = endDate
    }

    dispatch(fetchWalletListing(payload))
  }

  const editWallet = (data) => {
    setUserData(data)
    setOpen(true)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const changeStatus = (data) => {
    data.isActive = !data.isActive
    delete data.email
    delete data.role
    handleUpdate(data.id, data)
  }

  const handleUpdate = (id, data) => {
    accountService.update(id, data).then((res) => {
      getAllWalletRequest()
    })
  }

  const exportPDF = () => {
    const unit = "pt"
    const size = "A4" // Use A1, A2, A3 or A4
    const orientation = "portrait" // portrait or landscape

    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)

    doc.setFontSize(15)

    const title = "User Report"
    const headers = [
      [
        "user Name",
        "phone",
        "email",
        "location",
        "balance",
        "status",
        "created at",
      ],
    ]

    const data = walletList.map((elt) => [
      elt.userName,
      elt.phoneNumber,
      elt.email,
      elt.location,
      elt.balance,
      elt.isActive,
      elt.createdAt,
    ])

    let content = {
      startY: 50,
      head: headers,
      body: data,
      theme: "grid",
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save("report.pdf")
  }

  const handleChange = (event) => {
    event.persist()
    setSearchText(event.target.value)
  }

  const handleUpdateStatus = async (id, data) => {
    setShow(true)
    console.log("data :>> ", data)
    // setModalShow(true)
    setType(data)
    setModalData({ id, data })
  }

  const handleChangeStatus = (id) => {
    setShow(true)
    setIdForChange(id)
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
      getAllWalletRequest()
    })
  }

  const handleSaveUpdate2 = async (data) => {
    setLoad(true)
    console.log("data", data)
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
    console.log({ payload })

    await walletServices.updateWalletStatus(payload).then((res) => {
      if (res.status === 200) {
        toast.success("Status updated successfully")
        setModalShow(false)
        setShow(false)
      }
      setLoad(false)
      getAllWalletRequest()
    })
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // console.log(e, row, rowIndex)
    },
  }

  const getWalletData = (data) => {
    return data?.filter((item) => item?.statusOfWalletRequest === "approve")
  }

  // ==========================================

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
          <div>{row?.transactionId ? row?.transactionId : "-"}</div>
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

  const handleEdit = (info) => {
    let tmpInfo = []
    tmpInfo._id = info?._id
    tmpInfo.discountData = info?.discountData
    // setdDiscountInfo(info)
    // setIsDiscountEdit(true)
    // setIsShowDiscountModal(true)
  }

  const handleDelete = (cell, row) => {}

  const handleView = (cell, row) => {
    console.log("object view:>> ", { cell, row })
  }

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

  return (
    <div className="container-fluid w-100 mt-3">
      <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
        <CardHeader>
          <Title>Wallet List</Title>
          <Select
            size="small"
            defaultValue={downloadType}
            onChange={(e) => setDownloadType(e.target.value)}
          >
            <MenuItem value="csv">csv</MenuItem>
            <MenuItem value="pdf">pdf</MenuItem>
          </Select>

          {downloadType == "csv" ? (
            <CSVLink
              filename={"user data.csv"}
              data={getWalletData(walletList)}
            >
              <Fab
                size="small"
                color="secondary"
                aria-label="Add"
                className="button"
              >
                <Icon>get_app</Icon>
              </Fab>
            </CSVLink>
          ) : (
            <Fab
              size="small"
              color="primary"
              aria-label="Add"
              className="button"
              onClick={() => {
                exportPDF()
              }}
            >
              <Icon>get_app</Icon>
            </Fab>
          )}

          <TextField
            type="text"
            name="serchtext"
            id="standard-basic"
            onChange={handleChange}
            value={searchText || ""}
            label="search text"
          />

          <DateRangePick setDateValue={(data) => setSelectedDates(data)} />
          <Select
            size="small"
            defaultValue={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <MenuItem value="user">user</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
          </Select>

          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            className="button"
            onClick={() => {
              setOpen(true)
              setUserData({})
            }}
          >
            <Icon>add</Icon>
          </Fab>
        </CardHeader>

        <ReactBootstrapTable
          tableData={walletList}
          columns={columns}
          rowEvents={rowEvents}
        />

        <AddUpdateUserDialog
          setOpen={setOpen}
          open={open}
          userData={userData}
        />

        <ApproveRejectDialog
          show={modalShow}
          onHide={() => setModalShow(false)}
          message={type}
          handleSave={(data) => {
            console.log(data)
            handleSaveUpdate(data)
          }}
        />

        <ApprovalDialog
          show={show}
          onHide={() => setShow(false)}
          message={type}
          handleSave={(data) => {
            console.log(data)
            handleSaveUpdate2(data)
          }}
          isLoading={load}
        />
      </Card>

      <div className="col-md-12">
        <CustomTable
          showAddButton={false}
          pageOptions={pageOptions}
          keyField="transaction_id"
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
  )
}

export default WalletRequestListingTable3
