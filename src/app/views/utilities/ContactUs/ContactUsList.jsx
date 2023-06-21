import React, { useEffect, useMemo, useState } from "react"
import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import ContactUsModal from "./ContactUsModal"
import {
  getContactUsList,
  removeContactUs,
  updateContactUs,
} from "../store/action"

const ContactUsList = () => {
  const dispatch = useDispatch()
  const [contactUsList, setContactUsList] = useState([])
  const [isShowLoader, setIsShowLoader] = useState(false)
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [isShowContactUsModal, setIsShowContactUsModal] = useState(false)

  const [statusLoading, setStatusLoading] = useState(false)

  const [contactUsInfo, setContactUsInfo] = useState({})
  const { contactUsListData, loading } = useSelector((state) => state.utilities)

  const [type, setType] = useState("Add")

  useEffect(() => {
    dispatch(getContactUsList())
  }, [dispatch])

  useEffect(() => {
    setContactUsList(contactUsListData)
  }, [contactUsListData])

  const onCloseConfirmModal = () => {
    setIsShowConfirmModal(false)
  }

  const changeStatus = (data) => {
    let payload = {
      isActive: !data.isActive,
    }
    dispatch(updateContactUs(data._id, payload))
  }

  const handleAdd = () => {
    setContactUsInfo({})
    setIsShowContactUsModal(true)
    setType("Add")
  }

  const handleEdit = (data) => {
    setContactUsInfo(data)
    setType("Update")
    setIsShowContactUsModal(true)
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

  const columns = useMemo(
    () => [
      {
        text: "No",
        dataField: "no",
        sort: false,
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">{rowIndex + 1}</div>
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
              ? moment(row?.created).format("DD/MM/YYYY hh:mm:ss")
              : "-"}
          </div>
        ),
      },
      {
        text: "Status",
        formatter: (cell, row) => (
          <div>
            <Button
              variant={row?.isActive ? "success" : "danger"}
              type="button"
              disabled={statusLoading}
              className="btn btn-sm ml-2 ts-buttom m-1"
              size="sm"
              onClick={
                !statusLoading
                  ? () => {
                      changeStatus(row)
                    }
                  : null
              }
            >
              {statusLoading
                ? "Loading"
                : row?.isActive
                ? "Active"
                : "Inactive"}
            </Button>
          </div>
        ),
        classes: "p-1",
      },
      {
        text: "Action",
        dataField: "edit",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEdit(row)}
            >
              <AiOutlineEdit />
            </button>
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

  return (
    <>
      <div className="container-fluid w-100 mt-3">
        {isShowLoader && <CustomLoader />}
        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h2 className="main-heading">Contact Us List</h2>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 d-flex">
                  <div className="col-md-6 d-flex "></div>
                  <div className="col-md-6 d-flex justify-content-end">
                    <div className="me-2"></div>

                    <button
                      className={`ms-2 btn btn-secondary`}
                      type="button"
                      onClick={handleAdd}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>

                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    keyField="_id"
                    data={contactUsList}
                    columns={columns}
                    showSearch={false}
                    withPagination={false}
                    loading={isShowLoader}
                    withCard={false}
                  ></CustomTable>
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