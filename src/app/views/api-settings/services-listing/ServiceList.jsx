import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteService, editService, getServices } from "./store/action"
import {
  AiOutlineEdit,
  AiFillDelete,
  AiOutlinePlus,
  AiFillEye,
} from "react-icons/ai"
import { Form } from "react-bootstrap"
import moment from "moment"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import CustomTable from "app/components/Tables/CustomTable"
import AddUpdateServiceModal from "./AddUpdateServiceModal"

const ServiceList = () => {
  const dispatch = useDispatch()
  const { serviceList, loading } = useSelector((state) => state.servicesList)
  const [servicesData, setServicesData] = useState([])
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [type, setType] = useState("Add")
  const [modalShow, setModalShow] = useState(false)
  const [serviceListData, setServiceListData] = useState([])

  const GetActionFormat = (cell, row) => (
    <>
      <button
        type="button"
        className="btn btn-sm"
        title="Edit"
        size="sm"
        onClick={() => handleModelEdit(cell, row)}
      >
        <AiOutlineEdit style={{ color: "green" }} />
      </button>
      <button
        type="button"
        className="btn text-danger btn-sm"
        title="Delete"
        size="sm"
        onClick={() => handleModelDelete(cell, row)}
      >
        <AiFillDelete />
      </button>
      <button
        type="button"
        className="btn text-primary btn-sm"
        title="Preview"
        size="sm"
        onClick={() => handleView(cell, row)}
      >
        <AiFillEye />
      </button>
    </>
  )

  const GetIsActiveSwitch = (cell, row) => (
    <Form.Check
      type="switch"
      id="isServiceActive"
      checked={row?.isActive}
      onChange={(e) => {
        handleUpdate(row, e.target.checked)
      }}
    />
  )

  const GetTime = (cell, row) => moment(row.created).format("DD-MM-YYYY")

  const columns = [
    {
      text: "service Name",
      dataField: "serviceName",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.serviceName || "-"}</div>
      ),
    },
    {
      text: "service Detail",
      dataField: "serviceDetail",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.serviceDetail || "-"}</div>
      ),
    },
    {
      text: "Title",
      dataField: "title",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.title || "-"}</div>
      ),
    },
    {
      text: "Icon",
      dataField: "icon",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.icon || "-"}</div>
      ),
    },
    {
      text: "Is Active",
      dataField: "isActive",
      // formatter: (cell, row, rowIndex, formatExtraData) => (
      //   <div>{row?.isActive ? "Active" : "false"}</div>
      // ),
      formatter: GetIsActiveSwitch,
    },
    {
      text: "Icon",
      dataField: "image",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.Icon || "-"}</div>
      ),
    },
    {
      text: "Created At",
      dataField: "created",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{GetTime(cell, row) || "-"}</div>
      ),
    },
    {
      dataField: "",
      text: "Action",
      classes: "p-1",
      formatter: GetActionFormat,
    },
  ]

  const handleUpdate = (data, isChecked) => {
    let payload = {
      isActive: isChecked,
      serviceDetail: data.serviceDetail,
      serviceName: data.serviceName,
      title: data.title,
    }

    dispatch(editService(data._id, payload))
    dispatch(getServices())
  }

  const handleModelDelete = (cell, row) => {
    setIsShowConfirmModal(true)
    setServicesData(row)
  }

  const handleModelEdit = (cell, row) => {
    setType("Update")
    setServicesData(row)
    setModalShow(true)
  }

  const handleView = (cell, row) => {
    setType("View")
    setServicesData(row)
    setModalShow(true)
  }

  useEffect(() => {
    setServiceListData(serviceList)
  }, [serviceList])

  useEffect(() => {
    dispatch(getServices())
  }, [dispatch])

  const addNewService = () => {
    setServicesData({})
    setModalShow(true)
    setType("Add")
  }

  const handleOk = async () => {
    dispatch(
      deleteService(servicesData._id, () => {
        setIsShowConfirmModal(false)
      })
    )
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">Service List</h6>
          <button
            className={`ms-2 btn btn-secondary btn-sm`}
            type="button"
            onClick={addNewService}
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
                    data={serviceListData}
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
        <AddUpdateServiceModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={servicesData}
          type={type}
        />
      )}

      {isShowConfirmModal && (
        <ConfirmModal
          title="Are you sure?"
          description="Are you sure you want to delete?"
          handleDelete={handleOk}
          isShowConfirmModal={isShowConfirmModal}
          onCloseConfirmModal={() => setIsShowConfirmModal(false)}
        />
      )}
    </div>
  )
}

export default ServiceList
