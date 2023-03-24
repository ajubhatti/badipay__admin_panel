import React, { useEffect, useState } from "react"
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
import { fetchWalletList } from "./store/action"
import { toast } from "react-toastify"
import ReactBootstrapTable from "app/components/ReactBootStrapTable/ReactBootstrapTable"
import {
  AiFillEdit,
  AiFillEye,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai"
import ApproveRejectDialog from "./ApproveRejectDialog"
import { Button } from "react-bootstrap"
import ApprovalDialog from "./ApprovalDialog"

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

const WalletRequestListingTable2 = () => {
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const bgError = palette.error.main
  const bgPrimary = palette.primary.main
  const bgSecondary = palette.secondary.main

  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [downloadType, setDownloadType] = useState("csv")
  const [userType, setUserType] = useState("user")
  const [selectedDates, setSelectedDates] = useState([])
  const [searchText, setSearchText] = useState("")
  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState({})
  const [type, setType] = useState("reject")
  const { walletList } = useSelector((state) => state.wallet)
  const [loading, setLoading] = useState(false)

  const [show, setShow] = useState(false)
  const [idForChange, setIdForChange] = useState("")

  console.log({ walletList })

  useEffect(() => {
    getAllWalletRequest()
  }, [userType, selectedDates, searchText])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
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

    dispatch(fetchWalletList(payload))
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
    setLoading(true)
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
      setLoading(false)
      getAllWalletRequest()
    })
  }

  const columns = [
    {
      dataField: "_id",
      text: "Sr No.",
      headerStyle: () => {
        return { width: "5%" }
      },
      formatter: (cellContent, row, index) => {
        return <span>{index + 1}</span>
      },
    },
    {
      dataField: "created",
      text: "Created At",
      formatter: (cell, row) =>
        moment(row?.created).format("DD-MM-YYYY HH:mm:ss"),
    },
    {
      dataField: "userdetail.userName",
      text: "Name",
    },
    {
      dataField: "userdetail.phoneNumber",
      text: "Mobile No",
    },
    {
      dataField: "slipNo",
      text: "Slip No",
    },
    {
      dataField: "statusChangeDate",
      text: "Approve Date",
      formatter: (cell, row) => {
        if (row?.statusChangeDate) {
          return moment(row?.statusChangeDate).format("DD-MM-YYYY HH:mm:ss")
        } else {
          return <span>-</span>
        }
      },
    },
    {
      dataField: "bankData.bankdetails.bankName",
      text: "Deposit Bank",
    },
    {
      dataField: "requestAmount",
      text: "Requested Amount",
    },
    {
      dataField: "approveAmount",
      text: "Approve Amount",
    },
    {
      dataField: "debitAmount",
      text: "Debit Amount",
    },
    {
      dataField: "remark",
      text: "Remarks",
      formatters: (cell, row) => {
        if (row?.remark) {
          return <span>{row?.remark}</span>
        } else {
          return <span>-</span>
        }
      },
    },
    {
      dataField: "paymnetModeData.modeName",
      text: "Mode",
    },
    {
      dataField: "approveBy",
      text: "Approve By",
    },
    // {
    //     dataField: 'statusOfWalletRequest',
    //     text: 'status',
    //     formatters: (cell, row) => (
    //         <span>
    //             {row?.statusOfWalletRequest
    //                 ? row?.statusOfWalletRequest
    //                 : 'pending'}
    //         </span>
    //     ),
    // },
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
                row.statusOfWalletRequest === "pending"
                  ? "warning"
                  : row.statusOfWalletRequest === "reject"
                  ? "danger"
                  : "success"
              }`}
              onClick={() => {
                if (row?.statusOfWalletRequest === "pending") {
                  handleChangeStatus(row?._id)
                }
              }}
            >
              {row?.statusOfWalletRequest}
            </Button>
          </div>
        </div>
      ),
    },

    // {
    //     text: 'Action',
    //     headerStyle: () => {
    //         return { width: '10%' }
    //     },
    //     formatter: (cell, row) => (
    //         <div>
    //             <button
    //                 type="button"
    //                 className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
    //                 size="sm"
    //                 onClick={() => handleView(cell, row)}
    //             >
    //                 <AiFillEye />
    //             </button>
    //             <button
    //                 type="button"
    //                 className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
    //                 size="sm"
    //                 onClick={() => changeStatus(cell, row)}
    //             >
    //                 {row.isActive ? <AiOutlineClose /> : <AiOutlineCheck />}
    //             </button>
    //             <button
    //                 type="button"
    //                 className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
    //                 size="sm"
    //                 onClick={() => editWallet(row)}
    //             >
    //                 <AiFillEdit />
    //             </button>
    //         </div>
    //     ),
    //     classes: 'p-1',
    // },
  ]

  const handleView = (cell, row) => {
    console.log("object view:>> ", { cell, row })
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // console.log(e, row, rowIndex)
    },
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
            <CSVLink filename={"user data.csv"} data={walletList}>
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
          isLoading={loading}
        />
      </Card>
    </div>
  )
}

export default WalletRequestListingTable2
