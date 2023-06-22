import CustomTable from "app/components/Tables/CustomTable"
import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import {
  AiOutlineEdit,
  AiFillDelete,
  AiFillEye,
  AiOutlinePlus,
} from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import AddUpdateOperatorModal from "./AddUpdateOperatorModal"
import { deleteOperator, getAllOperators } from "./store/action"
import moment from "moment"
import { getServices } from "../services-listing/store/action"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"

const OperatorList = () => {
  const dispatch = useDispatch()
  const { serviceList } = useSelector((state) => state.servicesList)
  const { operatorList, loading } = useSelector((state) => state.operators)

  const [modalShow, setModalShow] = useState(false)
  const [operatorsData, setoperatorsData] = useState([])
  const [type, setType] = useState("Add")
  const [operatorListData, setOperatorListData] = useState([])
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)

  useEffect(() => {
    dispatch(getAllOperators({}))
    dispatch(getServices())
  }, [dispatch])

  useEffect(() => {
    for (let i = 0; i < operatorList.length; i++) {
      for (let j = 0; j < serviceList.length; j++) {
        if (operatorList[i]?.providerType === serviceList[j]?._id) {
          operatorList[i].providerData = serviceList[j]
        }
      }
    }

    setOperatorListData(operatorList || [])
  }, [operatorList, serviceList])

  const GetActionFormat = (cell, row) => (
    <div>
      <button
        type="button"
        className="btn btn-sm"
        title="Edit"
        size="sm"
        onClick={() => handleEdit(cell, row)}
      >
        <AiOutlineEdit style={{ color: "green" }} />
      </button>
      <button
        type="button"
        className="btn text-danger btn-sm"
        title="Delete"
        size="sm"
        onClick={() => handleDelete(cell, row)}
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
    </div>
  )

  const handleDelete = (cell, row) => {
    setIsShowConfirmModal(true)
    setoperatorsData(row)
  }

  const handleView = (cell, row) => {
    setType("View")
    setoperatorsData(row)
    setModalShow(true)
  }

  const handleEdit = (cell, row) => {
    setType("Update")
    setoperatorsData(row)
    setModalShow(true)
  }

  const GetIsActiveSwitch = (cell, row) => (
    <div>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={row?.isActive}
        onChange={(e) => {
          // setServiceData({
          //     ...serviceData,
          //     isActive: e.target.checked,
          // })
        }}
      />
    </div>
  )

  const GetIsVisibleSwitch = (cell, row) => (
    <div>
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={row?.isVisible}
        onChange={(e) => {
          // setServiceData({
          //     ...serviceData,
          //     isActive: e.target.checked,
          // })
        }}
      />
    </div>
  )

  const GetTime = (cell, row) => moment(row.created).format("DD-MM-YYYY")

  const columns = [
    {
      text: "operator Name",
      dataField: "operatorName",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.operatorName || "-"}</div>
      ),
    },
    {
      text: "operator Detail",
      dataField: "operatorDetail",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.operatorDetail || "-"}</div>
      ),
    },
    {
      text: "Provider Type",
      dataField: "providerData",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.providerData?.serviceName || "-"}</div>
      ),
    },
    {
      text: "Is Active",
      dataField: "isActive",
      formatter: GetIsActiveSwitch,
    },
    {
      text: "Is Visible",
      dataField: "isVisible",
      formatter: GetIsVisibleSwitch,
    },
    {
      text: "Min Amount",
      dataField: "minAmount",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.minAmount || "-"}</div>
      ),
    },
    {
      text: "Max Amount",
      dataField: "maxAmount",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.maxAmount || "-"}</div>
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

  const addNewOperator = () => {
    setoperatorsData({})
    setModalShow(true)
    setType("Add")
  }

  const handleOk = async () => {
    dispatch(
      deleteOperator(operatorsData._id, () => {
        setIsShowConfirmModal(false)
      })
    )
  }

  const getUpdatedData = () => {
    dispatch(getAllOperators({}))
  }

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h2 className="main-heading">Operator List</h2>
          <button
            className={`ms-2 btn btn-secondary`}
            type="button"
            onClick={addNewOperator}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <CustomTable
                  showAddButton={false}
                  keyField="_id"
                  data={operatorListData}
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
      {modalShow && (
        <AddUpdateOperatorModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={operatorsData}
          type={type}
          getUpdatedData={() => getUpdatedData()}
        />
      )}

      {isShowConfirmModal && (
        <ConfirmModal
          title="Are you sure ?"
          description="Are you sure you want to delete?"
          handleDelete={handleOk}
          isShowConfirmModal={isShowConfirmModal}
          onCloseConfirmModal={() => setIsShowConfirmModal(false)}
        />
      )}
    </div>
  )
}
export default OperatorList
