import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
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
import AddUpdateCompanyModal from "./AddUpdateCompanyModal"
import { getCompanies } from "./store/action"
import moment from "moment"
import { getApiList } from "../apis/store/action"
import { getServices } from "../services-listing/store/action"

const OperatorList = () => {
  const dispatch = useDispatch()

  const { companyList, loading } = useSelector((state) => state.company)

  const [modalShow, setModalShow] = useState(false)
  const [companysData, setCompanysData] = useState([])
  const [type, setType] = useState("Add")
  const [companyListData, setCompanyListData] = useState([])
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)

  useEffect(() => {
    setCompanyListData(companyList)
  }, [companyList])

  useEffect(() => {
    dispatch(getCompanies())
    dispatch(getApiList())
    dispatch(getServices())
  }, [dispatch])

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
    setCompanysData(row)
  }

  const handleView = (cell, row) => {
    setType("View")
    setCompanysData(row)
    setModalShow(true)
  }

  const handleEdit = (cell, row) => {
    // navigate("/api-setting/operator/add/" + row._id)
    setType("Update")
    setCompanysData(row)
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
      text: "Company Name",
      dataField: "companyName",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.companyName || "-"}</div>
      ),
    },
    {
      text: "Company Detail",
      dataField: "companyDetail",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.companyDetail || "-"}</div>
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
    setCompanysData({})
    setModalShow(true)
    setType("Add")
  }

  const handleOk = async () => {
    // dispatch(
    //   deleteApis(servicesData._id, () => {
    //     setIsShowConfirmModal(false)
    //   })
    // )
  }

  return (
    <div className="container w-100">
      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h2 className="main-heading">Company List</h2>
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
                      onClick={addNewOperator}
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>

                <div className="col-md-12">
                  <CustomTable
                    showAddButton={false}
                    keyField="_id"
                    data={companyListData}
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
          <AddUpdateCompanyModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={companysData}
            type={type}
          />
        )}

        {isShowConfirmModal && (
          <ConfirmModal
            title="Are you sure ?"
            description="Are you sure you want to delete ?"
            handleDelete={handleOk}
            isShowConfirmModal={isShowConfirmModal}
            onCloseConfirmModal={setIsShowConfirmModal(false)}
          />
        )}
      </div>
    </div>
  )
}
export default OperatorList
