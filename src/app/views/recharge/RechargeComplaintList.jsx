import React, { useCallback, useEffect, useMemo, useState } from "react"
import { bankService } from "app/services/bank.service"
import moment from "moment"
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai"
import { Form } from "react-bootstrap"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import CustomTable from "app/components/Tables/CustomTable"
import { rechargeComplaintService } from "app/services/rechargeComplaint.service"
import ComplaintEditModal from "./ComplaintEditModal"

const RechargeComplaintList = () => {
  const [bankInfo, setBankInfo] = useState([])
  const [isShowLoader, setIsShowLoader] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  const [isShowDeleteBankConfirmModal, setIsShowDeleteBankConfirmModal] =
    useState(false)

  const [complaintListData, setComplaintListData] = useState([])

  const [isShowComplainModal, setIsShowComplaintModal] = useState(false)
  const [discountInfo, setdDiscountInfo] = useState({})

  useEffect(() => {
    getAllbanks()
  }, [])

  const getAllbanks = async () => {
    setIsShowLoader(true)
    await rechargeComplaintService.getAllRechargeComplaints().then((res) => {
      setComplaintListData(res?.data)
      setIsShowLoader(false)
    })
  }

  const getTransactionList = useCallback(() => {
    // if (payloadData?.page) {
    //   dispatch(getRechargeList(payloadData))
    // }
    getAllbanks()
  }, [])

  const handleChangeStatus = async (id, status) => {
    setStatusLoading(true)
    await bankService.updateBank(id, { isActive: status }).then((res) => {
      if (res.status === 200) {
        setStatusLoading(false)
        getAllbanks()
      }
    })
  }

  const onCloseDeleteBankConfirmModal = () => {
    setIsShowDeleteBankConfirmModal(false)
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
    await bankService
      .updateBank(data?._id, { isActive: isChecked })
      .then((res) => {
        if (res.status === 200) {
          setStatusLoading(false)
          getAllbanks()
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
        text: "Customer No",
        dataField: "customerNo",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.rechargeDetail?.customerNo || "-"}
          </div>
        ),
      },
      {
        text: "Amount",
        dataField: "amount",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionDetail?.amount || "-"}
          </div>
        ),
      },
      {
        text: "Api Name",
        dataField: "apiName",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionDetail?.rechargeData?.operatorConfig?.apiData
              ?.apiName || "-"}
          </div>
        ),
      },
      {
        text: "Transaction Id",
        dataField: "transactionId",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">
            {row?.transactionDetail?.transactionId || "-"}
          </div>
        ),
      },
      {
        text: "status",
        dataField: "status",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.status || "-"}</div>
        ),
      },
      {
        text: "Created At",
        dataField: "createdAt",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.createdAt
              ? moment(row?.createdAt).format("DD/MM/YYYY hh:mm:ss")
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
              onClick={() => handleEdit(row)}
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
    await bankService.deleteBank(bankInfo._id).then((res) => {
      if (res.status === 200) {
        setIsShowDeleteBankConfirmModal(false)
        getAllbanks()
      }
    })
  }

  const handleEdit = (info) => {
    setdDiscountInfo(info)
    setIsShowComplaintModal(true)
  }

  const handleDiscountClose = () => {
    setdDiscountInfo({})
    setIsShowComplaintModal(false)
  }

  return (
    <>
      {isShowLoader && <CustomLoader />}

      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h6 className="main-heading">Recharge Complaint List</h6>
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
                      data={complaintListData}
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

        {isShowComplainModal && (
          <ComplaintEditModal
            discountInfo={discountInfo}
            isShowComplainModal={isShowComplainModal}
            onCloseDiscountModal={handleDiscountClose}
            fetchTransactionList={getTransactionList}
          />
        )}

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

export default RechargeComplaintList
