import React, { useEffect, useMemo, useState } from "react"
import { Icon, IconButton } from "@mui/material"
import { accountService } from "../../services/account.service"
import AddUpdateUserDialog from "./AddUpdateUserDialog"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import DateRangePick from "../material-kit/dates/DateRangePick"
import moment from "moment"
import AddRemoveBalance from "./AddRemoveBalance"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import { toast } from "react-toastify"
import { useCallback } from "react"
import {
  AiOutlineDownload,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai"
import { Button } from "react-bootstrap"

const UserListings = () => {
  const [page, setPage] = React.useState(1)
  const [usersList, setUsersList] = useState([])
  const [userModelOpen, setUserModelOpen] = useState(false)
  const [userData, setUserData] = useState({})
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
  const [viewType, setViewType] = useState("")

  const [exportLoading, setExportLoading] = useState(false)

  const [statusLoading, setStatusLoading] = useState(false)

  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 20,
    sortBy: "created",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
    api: "",
    services: "",
  })

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
      toast.error(err?.response?.data?.message || "Something want's wrong")
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

  const editUser = (data) => {
    // setUserData(data)
    setUserModelOpen({
      is_open: true,
      is_form_view_profile: false,
      data: data,
    })
    setViewType("edit")
    setUserModelTitle("Update user")
  }

  const viewUser = (data) => {
    // setUserData(data)
    setUserModelOpen({
      is_open: true,
      is_form_view_profile: true,
      data: data,
    })
    setViewType("view")
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
          <div>{moment(row.createdAt).format("DD-MM-YYYY,HH:mm")}</div>
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
          <div className="align-middle">{row.stateDetail.stateName}</div>
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
          <div style={{ cursor: "pointer" }} title="Click to change a status">
            <Button
              variant={row.isActive ? "success" : "danger"}
              type="button"
              disabled={statusLoading}
              className="btn btn-sm ml-2 ts-buttom m-1"
              size="sm"
              onClick={!statusLoading ? () => changeStatus(row) : null}
            >
              {statusLoading ? "Loading" : row.isActive ? "Active" : "Inactive"}
            </Button>
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
    [changeStatus, statusLoading]
  )

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
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

  const handleFilterData = () => {
    // setPayloadData((prev) => ({
    //   ...prev,
    //   page: 1,
    //   api: filter?.api || "",
    //   services: filter?.services || "",
    //   search: searchString,
    //   startDate: dateRangeValue?.start
    //     ? moment(dateRangeValue?.start).format("MM-DD-yyyy")
    //     : "", //"10-15-2022",
    //   endDate: dateRangeValue?.end
    //     ? moment(dateRangeValue?.end).format("MM-DD-yyyy")
    //     : "",
    // }))
  }

  const resetValue = () => {
    // setFilter({ api: "", services: "" })
    // setDateRangeValue({
    //   start: null,
    //   end: null,
    // })
  }

  const handleCSV = () => {}

  return (
    <>
      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="main-heading">User List</h2>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 d-flex">
                  <div className="col-md-6 d-flex"></div>
                  <div className="col-md-6 d-flex justify-content-end">
                    <div className="me-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={handleChange}
                      />
                    </div>
                    {/* <CustomDateRangePicker
                      rangeDate={dateRangeValue}
                      setRangeDate={setDateRangeValue}
                    /> */}
                    <DateRangePick
                      setDateValue={(data) => setSelectedDates(data)}
                    />
                    <button
                      className={`btn btn-primary ms-2`}
                      onClick={handleFilterData}
                    >
                      <AiOutlineSearch />
                    </button>

                    <button
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
                    </button>

                    <button
                      className={`btn btn-primary ms-2`}
                      onClick={resetValue}
                    >
                      Reset
                    </button>

                    <button
                      className={`btn btn-primary ms-2`}
                      onClick={() => {
                        setUserModelOpen({
                          is_open: true,
                          is_form_view_profile: false,
                        })
                        setUserData({})
                      }}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>

                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    pageOptions={pageOptions}
                    keyField="_id"
                    data={usersList?.data || []}
                    columns={columns}
                    showSearch={false}
                    onTableChange={onTableChange}
                    withPagination={true}
                    loading={loading}
                    withCard={false}
                  />

                  <AddUpdateUserDialog
                    setOpen={setUserModelOpen}
                    open={userModelOpen}
                    userData={userData}
                    title={userModelTitle}
                    setUserData={setUserData}
                    getAllusers={() => {
                      getAllUsers()
                    }}
                    type={viewType}
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

                  {/* {isShowDiscountModal && (
                    <RechargeViewModal
                      discountInfo={discountInfo}
                      isDiscountEdit={isDiscountEdit}
                      isShowDiscountModal={isShowDiscountModal}
                      onCloseDiscountModal={handleDiscountClose}
                      fetchTransactionList={getTransactionList}
                      // onSaveDiscountModal={handleSaveDiscountModal}
                      // selectedServiceIndex={selectedServiceIndex}
                      // discountModalSave={discountModalSave}
                    />
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserListings
