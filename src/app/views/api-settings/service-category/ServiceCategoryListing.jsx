import React, { useEffect, useMemo, useState } from "react"
import { serviceCategoryService } from "app/services/serviceCategory.service"
import moment from "moment"
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import { Form } from "react-bootstrap"
import ServiceCategoryModal from "./ServiceCategoryModal"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import CustomTable from "app/components/Tables/CustomTable"

const ServiceCategoryListing = () => {
  const [categoryInfo, setCategoryInfo] = useState({})
  const [isShowModal, setIsShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isShowLoader, setIsShowLoader] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  const [isShowDeleteConfirmModal, setIsShowDeleteConfirmModal] =
    useState(false)

  const [listData, setListData] = useState([])

  const getAllCategoty = async () => {
    setIsShowLoader(true)
    await serviceCategoryService.getAllServiceCategory().then((res) => {
      setListData(res?.data)
      setIsShowLoader(false)
    })
  }

  useEffect(() => {
    getAllCategoty()
  }, [])

  const handleChangeStatus = async (id, status) => {
    setStatusLoading(true)
    await serviceCategoryService
      .updateServiceCategory(id, { isActive: status })
      .then((res) => {
        if (res.status === 200) {
          setStatusLoading(false)
          getAllCategoty()
        }
      })
  }

  const onCloseDeleteConfirmModal = () => {
    setIsShowDeleteConfirmModal(false)
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
    setStatusLoading(true)
    await serviceCategoryService
      .updateServiceCategory(data?._id, { isActive: isChecked })
      .then((res) => {
        if (res.status === 200) {
          setStatusLoading(false)
          getAllCategoty()
        }
      })
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
        text: "category Name",
        dataField: "categoryName",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.categoryName || "-"}</div>
        ),
      },
      {
        dataField: "createdAt",
        text: "Created At",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.createdAt
              ? moment(row?.createdAt).format("DD/MM/YYYY, HH:mm:ss")
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
              onClick={() => handleCategoryDelete(row)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [statusLoading]
  )

  const handleEdit = (categoryInfo) => {
    setCategoryInfo(categoryInfo)
    setIsShowModal(true)
    setIsEdit(true)
  }

  const handleAddCategory = () => {
    setIsShowModal(true)
  }

  const handleCategoryDelete = (categoryInfo) => {
    setIsShowDeleteConfirmModal(true)
    setCategoryInfo(categoryInfo)
  }

  const handleDelete = async () => {
    await serviceCategoryService
      .deleteServiceCategory(categoryInfo._id)
      .then((res) => {
        if (res.status === 200) {
          setIsShowDeleteConfirmModal(false)
          getAllCategoty()
        }
      })
  }

  const handleClose = (isLoadData = false) => {
    if (isLoadData) {
      getAllCategoty()
    }
    setIsShowModal(false)
    setCategoryInfo({})
    setIsEdit(false)
  }

  return (
    <>
      {isShowLoader && <CustomLoader />}

      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h6 className="main-heading">Service Category List</h6>
            <button
              className={`ms-2 btn btn-secondary btn-sm`}
              type="button"
              onClick={handleAddCategory}
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
                      keyField="_id"
                      data={listData}
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
        </div>

        {isShowModal && (
          <ServiceCategoryModal
            categoryInfo={categoryInfo}
            isEdit={isEdit}
            isShowModal={isShowModal}
            onCloseModal={handleClose}
          />
        )}

        {isShowDeleteConfirmModal && (
          <ConfirmModal
            title="Are you sure ?"
            description="Are you sure you want to delete ?"
            handleDelete={handleDelete}
            isShowConfirmModal={isShowDeleteConfirmModal}
            onCloseConfirmModal={onCloseDeleteConfirmModal}
          />
        )}
      </div>
    </>
  )
}

export default ServiceCategoryListing
