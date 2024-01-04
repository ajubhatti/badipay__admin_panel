import React, { useEffect, useMemo, useState } from "react"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import ContactUsModal from "./ContactUsModal"
import { sizePerPageList } from "../../../constants/table"
import {
  getContactUsList,
  removeContactUs,
  setPageContactUs,
  setSizePerPageContactUs,
  setSortFieldOfContactUs,
  setSortOrderOfContactUs,
  updateContactUs,
} from "./store/action"

const ContactUsList = () => {
  const dispatch = useDispatch()
  const [contactUsList, setContactUsList] = useState([])
  const { contactUsListData, loading, page, sizePerPage, totalSize } =
    useSelector((state) => state.contactUs)

  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [isShowContactUsModal, setIsShowContactUsModal] = useState(false)
  const [contactUsInfo, setContactUsInfo] = useState({})
  const [type, setType] = useState("Add")
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

  useEffect(() => {
    dispatch(getContactUsList(payloadData))
  }, [dispatch, payloadData])

  useEffect(() => {
    setPayloadData((prev) => ({
      ...prev,
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

  useEffect(() => {
    setContactUsList(contactUsListData)
  }, [contactUsListData])

  const onCloseConfirmModal = () => {
    setIsShowConfirmModal(false)
  }

  const handleAdd = () => {
    setContactUsInfo({})
    setIsShowContactUsModal(true)
    setType("Add")
  }

  const handleRemove = (row) => {
    setIsShowConfirmModal(true)
    setContactUsInfo(row)
  }

  const handleDelete = async () => {
    dispatch(
      removeContactUs(contactUsInfo._id, () => {
        setIsShowConfirmModal(false)
      })
    )
  }

  const GetIsActiveSwitch = (cell, row) => (
    <Form.Check
      type="switch"
      id="isVerifiedSwitch"
      className="cursor-pointer"
      checked={row?.isActive}
      onChange={(e) => {
        changeVerifiactionStatus(row, e.target.checked)
      }}
    />
  )

  const changeVerifiactionStatus = async (data, isChecked) => {
    dispatch(updateContactUs(data?._id, { isActive: isChecked }))
  }

  const columns = useMemo(
    () => [
      {
        text: "No",
        dataField: "no",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {sizePerPage && page
              ? sizePerPage * (page - 1) + rowIndex + 1
              : rowIndex + 1}
          </div>
        ),
      },
      {
        text: "Description",
        dataField: "description",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.description || "-"}</div>
        ),
      },
      {
        text: "Email",
        dataField: "email",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.email || "-"}</div>
        ),
      },
      {
        text: "Name",
        dataField: "fullName",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.fullName || "-"}</div>
        ),
      },
      {
        text: "Mobile No",
        dataField: "mobileNo",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.mobileNo || "-"}</div>
        ),
      },
      {
        text: "Subject",
        dataField: "subject",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.subject || "-"}</div>
        ),
      },
      {
        text: "Created At",
        dataField: "created",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.created
              ? moment(row?.created).format("DD/MM/YYYY, HH:mm:ss")
              : "-"}
          </div>
        ),
      },
      {
        text: "Is Active",
        dataField: "isActive",
        formatter: GetIsActiveSwitch,
      },
      {
        text: "Action",
        dataField: "edit",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn text-danger btn-sm"
              title="Delete"
              size="sm"
              onClick={() => handleRemove(row)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    switch (type) {
      case "sort":
        dispatch(setSortFieldOfContactUs(sortField))
        dispatch(setSortOrderOfContactUs(sortOrder.toUpperCase()))
        break
      case "pagination":
        dispatch(setPageContactUs(page))
        dispatch(setSizePerPageContactUs(sizePerPage))
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="container-fluid w-100 mt-3">
        {loading && <CustomLoader />}

        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h6 className="main-heading">Contact Us List</h6>
            <button
              className={`ms-2 btn btn-secondary btn-sm`}
              type="button"
              onClick={handleAdd}
            >
              <AiOutlinePlus />
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <CustomTable
                      showAddButton={false}
                      pageOptions={pageOptions}
                      keyField="_id"
                      data={contactUsList}
                      columns={columns}
                      showSearch={false}
                      withPagination={true}
                      loading={loading}
                      withCard={false}
                      onTableChange={onTableChange}
                    ></CustomTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isShowContactUsModal && (
          <ContactUsModal
            show={isShowContactUsModal}
            onHide={() => setIsShowContactUsModal(false)}
            data={contactUsInfo}
            type={type}
          />
        )}

        {isShowConfirmModal && (
          <ConfirmModal
            title="Are you sure ?"
            description="Are you sure you want to delete ?"
            handleDelete={handleDelete}
            isShowConfirmModal={isShowConfirmModal}
            onCloseConfirmModal={onCloseConfirmModal}
          />
        )}
      </div>
    </>
  )
}

export default ContactUsList
