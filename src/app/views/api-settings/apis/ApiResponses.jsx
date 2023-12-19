import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getApiResponseList } from "./store/action"
import { AiOutlineEdit, AiFillEye } from "react-icons/ai"
import CustomTable from "app/components/Tables/CustomTable"
import moment from "moment"

const ApiResponses = () => {
  const dispatch = useDispatch()
  const { apiResponseList, loading } = useSelector((state) => state.apis)
  const [apiListData, setApiListData] = useState([])

  const [modalShow, setModalShow] = useState(false)
  const [apiData, setApiData] = useState({})

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
      text: "Mobile No",
      dataField: "mobileNo",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.response?.mobileNo || "-"}</div>
      ),
    },
    {
      text: "Api Name",
      dataField: "operatorConfig",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.response?.operatorConfig?.apiData?.apiName || "-"}</div>
      ),
    },
    {
      text: "TransactionId",
      dataField: "transactionId",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.response?.transactionId || "-"}</div>
      ),
    },
    {
      text: "status",
      dataField: "responseStatus",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          {console.log(
            "row?.response?.apiData?.operatorConfig?.responseStatus",
            row?.response?.operatorConfig?.apiData?.responseStatus
          )}
          {row?.response?.[
            row?.response?.operatorConfig?.apiData?.responseStatus
          ] || "-"}
        </div>
      ),
    },
    {
      text: "Message",
      dataField: "responseMessage",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>
          {console.log(
            "row?.response?.apiData?.operatorConfig?.responseMessage",
            row?.response?.operatorConfig?.apiData?.responseMessage
          )}
          {row?.response?.[
            row?.response?.operatorConfig?.apiData?.responseMessage
          ] || "-"}
        </div>
      ),
    },
    {
      text: "Is Active",
      dataField: "isActive",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{row?.isActive ? "Active" : "false"}</div>
      ),
    },
    {
      text: "Created At",
      dataField: "created",
      formatter: (cell, row, rowIndex, formatExtraData) => (
        <div>{moment(row?.createdAt).format("DD/MM/YYYY, HH:mm:ss")}</div>
      ),
    },
    {
      dataField: "",
      text: "Action",
      classes: "p-1",
      formatter: GetActionFormat,
    },
  ]

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
    dispatch(getApiResponseList())
  }, [dispatch])

  useEffect(() => {
    setApiListData(apiResponseList)
  }, [apiResponseList])

  return (
    <div className="container-fluid w-100 mt-3">
      <div className="row">
        <div className="col-lg-12 justify-content-between d-flex">
          <h6 className="main-heading">API Response</h6>
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
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiResponses
