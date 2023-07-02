import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { accountService } from "../../services/account.service"
import AddUpdateUserDialog from "./AddUpdateUserDialog"
import "jspdf-autotable"
import moment from "moment"
import AddRemoveBalance from "./AddRemoveBalance"
import CustomTable from "app/components/Tables/CustomTable"
import { sizePerPageList } from "../../constants/table"
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai"
import { FaRupeeSign } from "react-icons/fa"
import { Form } from "react-bootstrap"
import CustomDateRangePicker from "../reports/CustomDateRangePicker"
import {
  getUserList,
  setPageUsers,
  setSizePerPageUsers,
  setSortFieldOfUsers,
  setSortOrderOfUsers,
} from "./store/action"

const UserListings = () => {
  const dispatch = useDispatch()
  const { loading, page, sizePerPage, totalSize, userList, totalBalance } =
    useSelector((state) => state.account)
  const [usersList, setUsersList] = useState([])
  const [userModelOpen, setUserModelOpen] = useState(false)
  const [userData, setUserData] = useState({})
  const [addRemoveModelOpen, setAddRemoveModelOpen] = useState(false)
  const [modelTitle, setModelTitle] = useState("Add balance")
  const [userModelTitle, setUserModelTitle] = useState("New User")
  const [addRemoveModelType, setAddRemoveModelType] = useState("add")
  const [viewType, setViewType] = useState("")
  const [searchString, setSearchString] = useState("")
  const [exportLoading, setExportLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)
  const [dateRangeValue, setDateRangeValue] = useState({
    start: null,
    end: null,
  })
  const [payloadData, setPayloadData] = useState({
    page: 1,
    limits: 25,
    sortBy: "createdAt",
    orderBy: "DESC",
    skip: 0,
    search: "",
    startDate: "", //"10-15-2022",
    endDate: "",
  })

  const [selectedRow, setSelectedRow] = useState("")

  useEffect(() => {
    setUsersList(userList)
  }, [userList])

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

  const changeActiveStatus = async (data, isChecked) => {
    setStatusLoading(true)
    setSelectedRow(data?._id)

    await accountService
      .changeStatusOfUser(data?._id, { isActive: isChecked })
      .then((res) => {
        setStatusLoading(false)
        dispatch(getUserList(payloadData))
      })
  }

  const changeVerifiactionStatus = async (data, isChecked) => {
    setStatusLoading(true)
    setSelectedRow(data?._id)

    await accountService
      .updateUserById(data?._id, { isVerified: isChecked })
      .then((res) => {
        setStatusLoading(false)
        dispatch(getUserList(payloadData))
      })
  }

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(setSortFieldOfUsers(sortField))
        dispatch(setSortOrderOfUsers(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageUsers(page))
        dispatch(setSizePerPageUsers(sizePerPage))
        break
      default:
        break
    }
  }

  // const handleDiscountClose = () => {
  //   setdDiscountInfo({})
  //   setIsDiscountEdit(false)
  //   setIsShowDiscountModal(false)
  // }

  // const handleEdit = (info) => {
  //   setdDiscountInfo(info)
  //   setIsDiscountEdit(true)
  //   setIsShowDiscountModal(true)
  // }

  const handleSearch = (e) => {
    setSearchString(e.target.value.trim())
  }

  // const getUsersList = useCallback(() => {
  //   dispatch(getUserList(payloadData))
  // }, [dispatch, payloadData])

  useEffect(() => {
    dispatch(getUserList(payloadData))
  }, [payloadData, dispatch])

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

  const handleFilterData = () => {
    setPayloadData((prev) => ({
      ...prev,
      page: page,
      search: searchString,
      startDate: dateRangeValue?.start
        ? moment(dateRangeValue?.start).format("MM-DD-yyyy")
        : "", //"10-15-2022",
      endDate: dateRangeValue?.end
        ? moment(dateRangeValue?.end).format("MM-DD-yyyy")
        : "",
    }))
  }

  const resetValue = () => {
    setDateRangeValue({
      start: null,
      end: null,
    })
  }

  const handleCSV = () => {}

  const handleDelete = (cell, row) => {}

  const GetIsActiveSwitch = (cell, row) => (
    <Form.Check
      type="switch"
      id="isActiveSwitch"
      className="cursor-pointer"
      checked={row?.isActive}
      onChange={(e) => {
        changeActiveStatus(row, e.target.checked)
      }}
    />
  )

  const GetIsVerifySwitch = (cell, row) => (
    <Form.Check
      type="switch"
      id="isVerifiedSwitch"
      className="cursor-pointer"
      checked={row?.isVerified}
      onChange={(e) => {
        changeVerifiactionStatus(row, e.target.checked)
      }}
    />
  )

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
          <div>{moment(row?.createdAt).format("DD-MM-YYYY,HH:mm")}</div>
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
          <div className="align-middle">{row?.stateDetail?.stateName}</div>
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
        text: "OTP",
        dataField: "otp",
      },
      {
        text: "refer code",
        dataField: "referralDetails",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <span className="d-flex align-items-center">
            {row?.referralDetails?.referralCode}
          </span>
        ),
      },
      {
        text: "Balance",
        dataField: "walletBalance",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <span className="d-flex align-items-center">
            {parseFloat(row?.walletBalance).toFixed(2)}
          </span>
        ),
      },
      // {
      //   text: "Status",
      //   dataField: "status",
      //   formatter: (cell, row, rowIndex, formatExtraData) => (
      //     <div style={{ cursor: "pointer" }} title="Click to change a status">
      //       <Button
      //         type="button"
      //         disabled={statusLoading}
      //         className={row?.isActive ? "active-btn" : "danger-btn"}
      //         size="sm"
      //         onClick={() => (!statusLoading ? changeStatus(row) : null)}
      //       >
      //         {statusLoading && selectedRow === row?._id
      //           ? "Loading"
      //           : row?.isActive
      //           ? "Active"
      //           : "Inactive"}
      //       </Button>
      //     </div>
      //   ),
      // },
      {
        text: "Is Active",
        dataField: "isActive",
        formatter: GetIsActiveSwitch,
      },
      {
        text: "Is verify",
        dataField: "isVerified",
        formatter: GetIsVerifySwitch,
      },
      {
        text: "Action",
        dataField: "action",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn text-primary btn-sm"
              title="Preview"
              size="sm"
              onClick={() => viewUser(row)}
            >
              <AiFillEye />
            </button>
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => editUser(row)}
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
              onClick={() => addBalance(row)}
            >
              <FaRupeeSign />
            </button>
          </div>
        ),
      },
    ],
    [statusLoading]
  )

  return (
    <>
      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="col-md-6 d-flex">
                      {" "}
                      <h4>Total Balance : {totalBalance}</h4>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                      <div className="me-2">
                        <input
                          type="text"
                          className="form-control search-box"
                          placeholder="Search"
                          onChange={handleSearch}
                        />
                      </div>
                      <CustomDateRangePicker
                        rangeDate={dateRangeValue}
                        setRangeDate={setDateRangeValue}
                      />
                      {/* <DateRangePick
                      setDateValue={(data) => setSelectedDates(data)}
                    /> */}
                      <button
                        className={`btn btn-primary ms-2`}
                        onClick={() => handleFilterData()}
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
                      data={usersList || []}
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
                        // getAllUsers()
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
                        // getAllUsers()
                      }}
                    />

                    {/* {isShowDiscountModal && (
                    <RechargeViewModal
                      discountInfo={discountInfo}
                      isDiscountEdit={isDiscountEdit}
                      isShowDiscountModal={isShowDiscountModal}
                      onCloseDiscountModal={handleDiscountClose}
                      fetchTransactionList={getUsersList}
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
      </div>
    </>
  )
}

export default UserListings
