import React, { useEffect, useMemo, useState } from "react"
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
import AddUpdateUserDialog from "./AddUpdateUserDialog"
import { CSVLink, CSVDownload } from "react-csv"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import DateRangePick from "../material-kit/dates/DateRangePick"
import moment from "moment"
import TextField from "@mui/material/TextField"
import AddRemoveBalance from "./AddRemoveBalance"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import { toast } from "react-toastify"
import { useCallback } from "react"

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
        boxShadow:
            "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
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

const UserListingTable = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgPrimary = palette.primary.main
    const bgSecondary = palette.secondary.main

    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(1)
    const [usersList, setUsersList] = useState([])
    const [userModelOpen, setUserModelOpen] = useState(false)
    const [userData, setUserData] = useState({})
    const [downloadType, setDownloadType] = useState("csv")
    const [userType, setUserType] = useState("user")
    const [selectedDates, setSelectedDates] = useState([])
    const [searchText, setSearchText] = useState("")
    const [addRemoveModelOpen, setAddRemoveModelOpen] = useState(false)
    const [modelTitle, setModelTitle] = useState("Add balance")
    const [userModelTitle, setUserModelTitle] = useState("New User")
    const [addRemoveModelType, setAddRemoveModelType] = useState("add")
    const [loading, setLoading] = useState(false)
    const [sizePerPage, setSizePerPage] = useState(10)
    const [sort, setSort] = useState({ field: "", order: "" })

    useEffect(() => {
        getAllUsers()
    }, [userType, selectedDates, searchText, page, sizePerPage, sort])

    const getAllUsers = useCallback(async () => {
        let startDate = moment(selectedDates[0]).format("YYYY-MM-DD")
        let endDate = moment(selectedDates[1]).format("YYYY-MM-DD")

        let payload = {
            role: userType,
            page: page,
            limits: sizePerPage,
            sortBy: sort?.field,
            orderBy: sort?.order,
        }
        if (searchText !== "") {
            payload.searchParams = searchText
        }
        if (selectedDates.length > 0) {
            payload.startDate = startDate
            payload.endDate = endDate
        }

        try {
            setLoading(true)
            const res = await accountService.getAll(payload)
            if (!!res && res?.data) {
                setUsersList(res?.data)
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast.error(
                err?.response?.data?.message || "Something want's wrong"
            )
        }
    }, [
        page,
        searchText,
        selectedDates,
        sizePerPage,
        sort?.field,
        sort?.order,
        userType,
    ])

    const editUser = (data) => {
        // setUserData(data)
        setUserModelOpen({
            is_open: true,
            is_form_view_profile: false,
            data: data,
        })
        setUserModelTitle("Update user")
    }

    const viewUser = (data) => {
        // setUserData(data)
        setUserModelOpen({
            is_open: true,
            is_form_view_profile: true,
            data: data,
        })
        setUserModelTitle("User Profile")
    }

    const addBalance = (data) => {
        setUserData(data)
        setModelTitle("Add balance")
        setAddRemoveModelOpen(true)
        setAddRemoveModelType("add")
    }
    const handleUpdate = useCallback(
        async (id, data) => {
            await accountService.update(id, data).then((res) => {
                getAllUsers()
            })
        },
        [getAllUsers]
    )

    const changeStatus = useCallback(
        (data) => {
            data.isActive = !data.isActive
            delete data.email
            delete data.role
            handleUpdate(data?._id, data)
        },
        [handleUpdate]
    )

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

        const data = usersList?.data?.map((elt) => [
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
        setSearchText(event.target.value)
    }

    const columns = useMemo(
        () => [
            {
                text: "No",
                dataField: "no",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle">{rowIndex + 1}</div>
                ),
            },
            {
                text: "Register Date",
                dataField: "createdAt",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div>
                        {moment(row.createdAt).format("DD-MM-YYYY,HH:mm")}
                    </div>
                ),
            },
            {
                text: "User Name",
                dataField: "userName",
            },
            {
                text: "Phone Number",
                dataField: "phoneNumber",
            },
            {
                text: "State",
                dataField: "state",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="align-middle">
                        {row.stateDetail.stateName}
                    </div>
                ),
            },
            {
                text: "City",
                dataField: "city",
            },
            {
                text: "Pin code",
                dataField: "pincode",
            },
            {
                text: "Balance",
                dataField: "walletBalance",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <span className="d-flex align-items-center">
                        <Icon style={{ fontSize: "16px" }}>currency_rupee</Icon>
                        {parseFloat(row?.walletBalance).toFixed(2)}/-
                    </span>
                ),
            },
            {
                text: "Status",
                dataField: "status",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => changeStatus(row)}
                        title="Click to change a status"
                    >
                        {row.isActive ? (
                            <Small bgcolor={bgPrimary}>Active</Small>
                        ) : (
                            <Small bgcolor={bgError}>Inactive</Small>
                        )}
                    </div>
                ),
            },
            {
                text: "Action",
                dataField: "action",
                formatter: (cell, row, rowIndex, formatExtraData) => (
                    <div className="d-flex">
                        <div title="View Profile">
                            <IconButton onClick={() => viewUser(row)}>
                                <Icon>person</Icon>
                            </IconButton>
                        </div>
                        <div title="Edit Profile">
                            <IconButton onClick={() => editUser(row)}>
                                <Icon>edit_icon</Icon>
                            </IconButton>
                        </div>
                        <div title="Credit/Debit Amount">
                            <IconButton onClick={() => addBalance(row)}>
                                <Icon>currency_rupee</Icon>
                            </IconButton>
                        </div>
                    </div>
                ),
            },
        ],
        [bgError, bgPrimary, changeStatus]
    )

    const onTableChange = (
        type,
        { page, sizePerPage, sortField, sortOrder }
    ) => {
        switch (type) {
            case "sort":
                setSort({ field: sortField, order: sortOrder.toUpperCase() })
                break
            case "pagination":
                setPage(page)
                setSizePerPage(sizePerPage)
                break
            default:
                break
        }
    }

    const pageOptions = useMemo(
        () => ({
            page,
            sizePerPage,
            totalSize: usersList?.total || 0,
            custom: true,
            sizePerPageList,
        }),
        [page, sizePerPage, usersList?.total]
    )

    return (
        <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
            <CardHeader className="mb-0">
                <Title>Users List</Title>
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
                        data={usersList?.data || []}
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
                    onChange={(e) => handleChange(e)}
                    value={searchText || ""}
                    label="search text"
                />

                <DateRangePick
                    setDateValue={(data) => setSelectedDates(data)}
                />
                <Select
                    size="small"
                    defaultValue={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <MenuItem value="user">user</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                </Select>

                <Select size="small" defaultValue="all">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Last Month</MenuItem>
                </Select>

                <Fab
                    size="small"
                    color="secondary"
                    aria-label="Add"
                    className="button"
                    onClick={() => {
                        setUserModelOpen({
                            is_open: true,
                            is_form_view_profile: false,
                        })
                        setUserData({})
                    }}
                >
                    <Icon>add</Icon>
                </Fab>
            </CardHeader>
            <div></div>
            <Box overflow="auto" sx={{ p: "20px" }}>
                <CustomTable
                    showAddButton={false}
                    pageOptions={pageOptions}
                    keyField="transaction_id"
                    data={usersList?.data || []}
                    columns={columns}
                    showSearch={false}
                    onTableChange={onTableChange}
                    withPagination={true}
                    loading={loading}
                    withCard={false}
                />
            </Box>
            <AddUpdateUserDialog
                setOpen={setUserModelOpen}
                open={userModelOpen}
                userData={userData}
                title={userModelTitle}
                setUserData={setUserData}
                getAllusers={() => {
                    getAllUsers()
                }}
            />

            <AddRemoveBalance
                setOpen={setAddRemoveModelOpen}
                open={addRemoveModelOpen}
                userData={userData}
                title={modelTitle}
                type={addRemoveModelType}
                getAllusers={() => {
                    getAllUsers()
                }}
            />
        </Card>
    )
}

export default UserListingTable
