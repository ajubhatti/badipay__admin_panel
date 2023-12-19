import React, { useEffect, useMemo, useState } from "react"
import { callBackService } from "app/services/callBack.service"
import moment from "moment"
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import CustomTable from "app/components/Tables/CustomTable"

const CallBackList = () => {
  const [bankInfo, setBankInfo] = useState([])
  const [isShowLoader, setIsShowLoader] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)
  const [isShowDeleteBankConfirmModal, setIsShowDeleteBankConfirmModal] =
    useState(false)
  const [bankListData, setBankListData] = useState([])

  const getAllCallBacks = async () => {
    setIsShowLoader(true)
    await callBackService.getAllcallBack().then((res) => {
      setBankListData(res?.data)
      setIsShowLoader(false)
    })
  }

  useEffect(() => {
    getAllCallBacks()
  }, [])

  const onCloseDeleteBankConfirmModal = () => {
    setIsShowDeleteBankConfirmModal(false)
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
        text: "Mobile No",
        dataField: "mobile",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.resource?.mobile || row?.resource?.ClientRefNo || "-"}
          </div>
        ),
      },
      {
        text: "TrnID",
        dataField: "TrnID",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.resource?.TrnID || "-"}</div>
        ),
      },
      {
        text: "OprID",
        dataField: "OprID",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.resource?.OprID || "-"}</div>
        ),
      },
      {
        text: "Status Msg",
        dataField: "StatusMsg",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.resource?.StatusMsg || row?.resource?.statusMsg || "-"}
          </div>
        ),
      },
      {
        text: "Status",
        dataField: "status",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.resource?.status || row?.resource?.Status || "-"}
          </div>
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
        text: "Action",
        dataField: "edit",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEditBank(row)}
            >
              <AiOutlineEdit />
            </button>
            <button
              type="button"
              className="btn text-danger btn-sm"
              title="Delete"
              size="sm"
              onClick={() => handleBankDelete(row)}
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

  const handleEditBank = (bankInfo) => {
    setBankInfo(bankInfo)
  }

  const handleBankDelete = (bankInfo) => {
    setIsShowDeleteBankConfirmModal(true)
    setBankInfo(bankInfo)
  }

  const handleDelete = async () => {
    await callBackService.deletecallBack(bankInfo._id).then((res) => {
      if (res.status === 200) {
        setIsShowDeleteBankConfirmModal(false)
        getAllCallBacks()
      }
    })
  }

  return (
    <>
      {isShowLoader && <CustomLoader />}

      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h6 className="main-heading">Call Back List</h6>
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
                      data={bankListData}
                      columns={columns}
                      showSearch={false}
                      withPagination={false}
                      loading={isShowLoader}
                      withCard={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isShowDeleteBankConfirmModal && (
          <ConfirmModal
            title="Are you sure ?"
            description="Are you sure you want to delete ?"
            handleDelete={handleDelete}
            isShowConfirmModal={isShowDeleteBankConfirmModal}
            onCloseConfirmModal={onCloseDeleteBankConfirmModal}
          />
        )}
      </div>
    </>
  )
}

export default CallBackList
