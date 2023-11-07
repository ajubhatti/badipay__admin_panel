import React, { useEffect, useMemo, useState } from "react"
import { bankService } from "app/services/bank.service"
import moment from "moment"
import { AiFillDelete, AiOutlineEdit, AiOutlinePlus } from "react-icons/ai"
import { Button, Form } from "react-bootstrap"
import BankModal from "./BankModal"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import CustomTable from "app/components/Tables/CustomTable"

const BankListing = () => {
  const [bankInfo, setBankInfo] = useState([])
  const [isShowBankModal, setIsShowBankModal] = useState(false)
  const [isBankEdit, setIsBankEdit] = useState(false)
  const [isShowLoader, setIsShowLoader] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  const [isShowDeleteBankConfirmModal, setIsShowDeleteBankConfirmModal] =
    useState(false)

  const [bankListData, setBankListData] = useState([])

  const getAllbanks = async () => {
    setIsShowLoader(true)
    await bankService.getAllBank().then((res) => {
      setBankListData(res?.data)
      setIsShowLoader(false)
    })
  }

  useEffect(() => {
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
        text: "Bank Name",
        dataField: "bankName",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.bankName || "-"}</div>
        ),
      },
      {
        text: "Bank Detail",
        dataField: "bankDetail",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle ">{row?.bankDetail || "-"}</div>
        ),
      },
      {
        dataField: "created",
        text: "Created At",
        formatter: (cell, row, rowIndex, formatExtraData) => (
          <div className="align-middle">
            {row?.created
              ? moment(row?.created).format("DD/MM/YYYY, HH:mm:ss")
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
    setIsShowBankModal(true)
    setIsBankEdit(true)
  }

  const handleAddBank = () => {
    setIsShowBankModal(true)
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

  const handleBankClose = (isLoadData = false) => {
    if (isLoadData) {
      getAllbanks()
    }
    setIsShowBankModal(false)
    setBankInfo([])
    setIsBankEdit(false)
  }

  return (
    <>
      {isShowLoader && <CustomLoader />}

      <div className="container-fluid w-100 mt-3">
        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h6 className="main-heading">Bank List</h6>
            <button
              className={`ms-2 btn btn-secondary btn-sm`}
              type="button"
              onClick={handleAddBank}
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
                      data={bankListData}
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

        {isShowBankModal && (
          <BankModal
            bankInfo={bankInfo}
            isBankEdit={isBankEdit}
            isShowBankModal={isShowBankModal}
            onCloseBankModal={handleBankClose}
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

export default BankListing
