import React, { useEffect, useState } from "react"
import { Paragraph } from "app/components/Typography"
import { Box, styled, useTheme } from "@mui/system"
import {
  Card,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  MenuItem,
  Select,
  Button,
  Fab,
  TablePagination,
} from "@mui/material"
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
import { fetchWalletListing } from "./store/action"
import { toast } from "react-toastify"
import ApproveRejectDialog from "./ApproveRejectDialog"

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

const UserTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    height: 15,
    width: 50,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": {
    borderBottom: "none",
  },
  "& td:first-of-type": {
    paddingLeft: "16px !important",
  },
}))

const Small = styled("small")(({ bgcolor }) => ({
  height: 15,
  width: 50,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}))

const WalletRequestListingTable = () => {
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const bgError = palette.error.main
  const bgPrimary = palette.primary.main
  const bgSecondary = palette.secondary.main

  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)
  const [walletRequestList, setWalletRequestList] = useState([])
  const [open, setOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [downloadType, setDownloadType] = useState("csv")
  const [userType, setUserType] = useState("user")
  const [selectedDates, setSelectedDates] = useState([])
  const [searchText, setSearchText] = useState("")
  const [toastMessage, setToastMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState("reject")

  const [modalShow, setModalShow] = useState(false)
  const [modalData, setModalData] = useState({})

  const { walletList } = useSelector((state) => state.wallet)
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

    dispatch(fetchWalletListing(payload))
  }

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
  }))

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

  const handleChangeStatus = async (data) => {
    console.log("data :>> ", data)
    let payload = {}

    await walletServices.getAll(payload).then((res) => {
      if (res.data) {
        setWalletRequestList(res.data.wallets)
      }
    })
  }

  const handleUpdateStatus = async (id, data) => {
    console.log("data :>> ", data)
    setModalShow(true)
    setType(data)
    setModalData({ id, data })
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

  return (
    <div className="container">
      <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
        <CardHeader>
          <Title>Wallet List1</Title>
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
        <Box overflow="auto" sx={{ pt: "20px", mb: 3, ml: 3 }}>
          <UserTable id="my-table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 0 }}>SrNo</TableCell>
                <TableCell sx={{ px: 3 }} colSpan={4}>
                  user Name
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={2}>
                  reference no
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  deposit bank
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  branch
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  request amount
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={2}>
                  wallet amount
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  remarks
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  approve by
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={2}>
                  approve date
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={2}>
                  status
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={4}>
                  actions
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={2}>
                  actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {walletList.length > 0
                ? walletList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((walletData, index) => (
                      <TableRow key={index} hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                          colSpan={4}
                          align="left"
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          <Box display="flex" alignItems="center">
                            <Avatar src={walletData?.imgUrl} />
                            <Paragraph sx={{ m: 0, ml: 4 }}>
                              {walletData?.userName}
                            </Paragraph>
                          </Box>
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.referenceNo}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.depositBank}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.depositBranch}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.requestAmount}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.finalWalletAmount}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.remark}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.approveBy}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={2}
                          sx={{
                            px: 0,
                            textTransform: "capitalize",
                          }}
                        >
                          {walletData?.approveDate}
                        </TableCell>

                        <TableCell
                          sx={{ px: 0 }}
                          align="left"
                          colSpan={2}
                          onClick={() => handleChangeStatus(walletData)}
                        >
                          {/* <Small bgcolor={bgPrimary}> */}
                          {walletData?.statusOfWalletRequest
                            ? walletData?.statusOfWalletRequest
                            : "pending"}
                          {/* </Small> */}

                          {/* {walletData?.statusOfWalletRequest ==
                                              'pending' ? (
                                                  <Small bgcolor={bgPrimary}>
                                                      Active
                                                  </Small>
                                              ) : (
                                                  <Small bgcolor={bgError}>
                                                      Inactive
                                                  </Small>
                                              )} */}
                        </TableCell>

                        {/* <TableCell sx={{ px: 0 }} colSpan={2}>
                                            <IconButton
                                                onClick={() =>
                                                    editWallet(walletData)
                                                }
                                            >
                                                <Icon>edit_icon</Icon>
                                            </IconButton>
                                        </TableCell> */}

                        <TableCell sx={{ px: 0 }} colSpan={4}>
                          {/* {walletData?.statusOfWalletRequest ==
                                              'pending' ? ( */}
                          {/* <StyledButton
                                                  variant="contained"
                                                  color="inherit"
                                              >
                                                  {walletData?.statusOfWalletRequest
                                                      ? walletData?.statusOfWalletRequest
                                                      : 'pending'}
                                              </StyledButton> */}

                          <StyledButton
                            color="primary"
                            variant="contained"
                            //   disabled={
                            //       walletData?.statusOfWalletRequest !==
                            //       'pending'
                            //   }
                            bgcolor={bgPrimary}
                            onClick={() => {
                              //   if (
                              //       walletData?.statusOfWalletRequest ==
                              //       'pending'
                              //   ) {
                              handleUpdateStatus(walletData?._id, "approve")
                              //   }
                            }}
                          >
                            approve
                          </StyledButton>
                          {/* ) : ( */}
                          <StyledButton
                            color="secondary"
                            variant="contained"
                            //   disabled={
                            //       walletData?.statusOfWalletRequest !==
                            //       'pending'
                            //   }
                            bgcolor={bgError}
                            onClick={() => {
                              //   if (
                              //       walletData?.statusOfWalletRequest ==
                              //       'pending'
                              //   ) {
                              handleUpdateStatus(walletData?._id, "cancel")
                              //   }
                            }}
                          >
                            reject
                          </StyledButton>
                          {/* )} */}
                        </TableCell>

                        <TableCell sx={{ px: 0 }} colSpan={2}>
                          <IconButton onClick={() => changeStatus(walletData)}>
                            <Icon color="error">
                              {walletData.isActive ? "close" : "check"}
                            </Icon>
                          </IconButton>
                          <IconButton onClick={() => editWallet(walletData)}>
                            <Icon>edit_icon</Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                : null}
            </TableBody>
          </UserTable>

          <TablePagination
            sx={{ px: 2 }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={walletList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
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
      </Card>
    </div>
  )
}

export default WalletRequestListingTable
