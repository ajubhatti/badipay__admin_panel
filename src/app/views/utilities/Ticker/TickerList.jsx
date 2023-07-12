import React, { useEffect, useMemo, useState } from "react"

import moment from "moment"
import CustomTable from "app/components/Tables/CustomTable"
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import TickerModal from "./TickerModal"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import { Form } from "react-bootstrap"
import { getTickerList, removeTicker, updateTicker } from "../store/action"
import { useDispatch, useSelector } from "react-redux"

const TickerList = () => {
  const dispatch = useDispatch()
  const [tickerList, setTickerList] = useState([])
  const [isShowLoader, setIsShowLoader] = useState(false)
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [isShowTickerModal, setIsShowTickerModal] = useState(false)

  const [tickerInfo, setTickerInfo] = useState({})
  const { tickerListData } = useSelector((state) => state.utilities)

  const [type, setType] = useState("Add")

  useEffect(() => {
    dispatch(getTickerList())
  }, [dispatch])

  useEffect(() => {
    setTickerList(tickerListData)
  }, [tickerListData])

  const onCloseConfirmModal = () => {
    setIsShowConfirmModal(false)
  }

  const handleAddTicker = () => {
    setTickerInfo({})
    setIsShowTickerModal(true)
    setType("Add")
  }

  const handleEdit = (data) => {
    setTickerInfo(data)
    setType("Update")
    setIsShowTickerModal(true)
  }

  const handleRemove = (row) => {
    setIsShowConfirmModal(true)
    setTickerInfo(row)
  }

  const handleDelete = async () => {
    dispatch(
      removeTicker(tickerInfo._id, () => {
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
    dispatch(updateTicker(data?._id, { isActive: isChecked }))
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
        text: "text",
        dataField: "description",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.description || "-"}</div>
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
            <h6 className="main-heading">Ticker List</h6>
            <button
              className={`ms-2 btn btn-secondary btn-sm`}
              type="button"
              onClick={handleAddTicker}
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
                      data={tickerList}
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

        {isShowTickerModal && (
          <TickerModal
            show={isShowTickerModal}
            onHide={() => setIsShowTickerModal(false)}
            data={tickerInfo}
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

export default TickerList
