import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createApiConfig, deleteApis, getApiConfigList } from "./store/action"
import {
  AiOutlineEdit,
  AiFillDelete,
  AiFillEye,
  AiOutlinePlus,
} from "react-icons/ai"
import CustomTable from "app/components/Tables/CustomTable"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import moment from "moment"
import ApiConfigAddUpdateModal from "./ApiConfigAddUpdateModal"

const ApiConfigList = () => {
  const dispatch = useDispatch()
  const { apiConfigList, loading } = useSelector((state) => state.apis)
  const [apiListData, setApiListData] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [apiData, setApiData] = useState({})
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [type, setType] = useState("Add")

  const GetActionFormat = (cell, row) => (
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-sm"
        title="Edit"
        size="sm"
        onClick={() => handleEdit(row)}
      >
        <AiOutlineEdit style={{ color: "green" }} />
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
      <button
        type="button"
        className="btn text-primary btn-sm"
        title="Preview"
        size="sm"
        onClick={() => handleView(row)}
      >
        <AiFillEye />
      </button>
    </div>
  )

  const columns = [
    {
      text: "Api Name",
      dataField: "apiName",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.apiData?.apiName || "-"}</div>
      ),
    },
    {
      text: "Category Name",
      dataField: "categoryName",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.categoryData?.categoryName || "-"}</div>
      ),
    },
    {
      text: "Icon",
      dataField: "apiImage",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.Icon || "-"}</div>
      ),
    },
    {
      text: "Created At",
      dataField: "created",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{moment(row?.created).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      dataField: "",
      text: "Action",
      classes: "p-1",
      formatter: GetActionFormat,
    },
  ]

  const handleRemove = (row) => {
    setIsShowConfirmModal(true)
    setApiData(row)
  }

  const handleView = (row) => {
    setType("View")
    setApiData(row)
    setModalShow(true)
  }

  const handleEdit = (row) => {
    setType("Update")
    setApiData(row)
    setModalShow(true)
  }

  useEffect(() => {
    dispatch(getApiConfigList())
  }, [dispatch])

  useEffect(() => {
    setApiListData(apiConfigList)
  }, [apiConfigList])

  const addNewApi = () => {
    dispatch(createApiConfig({}))
  }

  const handleOk = async () => {
    dispatch(
      deleteApis(apiData._id, () => {
        setIsShowConfirmModal(false)
      })
    )
  }

  const onCloseDeleteBankConfirmModal = () => {
    setIsShowConfirmModal(false)
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">API Config List</h6>
          <button
            className={`ms-2 btn btn-secondary btn-sm`}
            type="button"
            onClick={addNewApi}
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
                    data={apiListData}
                    columns={columns}
                    showSearch={false}
                    withPagination={false}
                    loading={loading}
                    withCard={false}
                  ></CustomTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modalShow && (
        <ApiConfigAddUpdateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={apiData}
          type={type}
        />
      )}

      {isShowConfirmModal && (
        <ConfirmModal
          title="Are you sure ?"
          description="Are you sure you want to delete ?"
          handleDelete={handleOk}
          isShowConfirmModal={isShowConfirmModal}
          onCloseConfirmModal={onCloseDeleteBankConfirmModal}
        />
      )}
    </div>
  )
}

export default ApiConfigList
