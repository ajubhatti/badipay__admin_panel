import React, { useEffect, useMemo, useState } from "react"
import { bankAccountService } from "app/services/bank.service"
import CustomLoader from "app/components/CustomLoader/CustomLoader"
import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai"
import BankAccountModal from "./BankAccountModal"
import ConfirmModal from "app/components/ConfirmModal/ConfirmModal"
import CustomTable from "app/components/Tables/CustomTable"
import { Form } from "react-bootstrap"

const BankAccountTable = () => {
  const [bankAccountListData, setBankAccountListData] = useState([])
  const [isShowLoader, setIsShowLoader] = useState(false)
  const [isShowBankAccountModal, setIsShowBankAccountModal] = useState(false)
  const [bankAccountInfo, setBankAccountInfo] = useState([])
  const [isBankAccountEdit, setIsBankAccountEdit] = useState(false)
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)

  const getAllbankAccounts = async () => {
    setIsShowLoader(true)
    await bankAccountService.getAllBankAccount().then((res) => {
      setBankAccountListData(res?.data)
      setIsShowLoader(false)
    })
  }

  const handleAddBankAccount = () => {
    setIsShowBankAccountModal(true)
  }

  const handleEditBankAccount = (bankAccountInfo) => {
    setBankAccountInfo(bankAccountInfo)
    setIsShowBankAccountModal(true)
    setIsBankAccountEdit(true)
  }

  const handleBankAccountDelete = (bankAccountInfo) => {
    setIsShowConfirmModal(true)
    setBankAccountInfo(bankAccountInfo)
  }

  const handleDelete = async () => {
    await bankAccountService
      .deleteBankAccount(bankAccountInfo._id)
      .then((res) => {
        if (res.status === 200) {
          setIsShowConfirmModal(false)
          getAllbankAccounts()
        }
      })
  }

  const onCloseDeleteBankAccountConfirmModal = () => {
    setIsShowConfirmModal(false)
  }

  const handleBankAccountClose = (isLoadData = false) => {
    if (isLoadData) {
      getAllbankAccounts()
    }
    setIsShowBankAccountModal(false)
    setBankAccountInfo([])
    setIsBankAccountEdit(false)
  }

  useEffect(() => {
    getAllbankAccounts()
  }, [])

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
    await bankAccountService
      .updateBankAccount(data?._id, { isActive: isChecked })
      .then((res) => {
        if (res.status === 200) {
          getAllbankAccounts()
        }
      })
  }

  const columns = useMemo(
    () => [
      {
        dataField: "_id",
        text: "Sr No.",
        headerStyle: () => {
          return { width: "5%" }
        },
        formatter: (cell, row, index) => {
          return <span>{index + 1}</span>
        },
      },
      {
        text: "Name",
        dataField: "accountName",
      },
      {
        text: "Acc No.",
        dataField: "accountNo",
      },
      {
        text: "Bank Name",
        dataField: "bankName",
      },
      {
        text: "Bank Branch",
        dataField: "bankName",
      },
      {
        text: "IFSC Code",
        dataField: "ifscCode",
      },
      {
        text: "Account Detail",
        dataField: "accountDetail",
      },
      {
        text: "Is Active",
        dataField: "isActive",
        formatter: GetIsActiveSwitch,
      },
      {
        text: "Action",
        formatter: (cell, row) => (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-sm"
              title="Edit"
              size="sm"
              onClick={() => handleEditBankAccount(row)}
            >
              <AiFillEdit />
            </button>
            <button
              type="button"
              className="btn text-danger btn-sm"
              title="Delete"
              size="sm"
              onClick={() => handleBankAccountDelete(row)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
        classes: "p-1",
      },
    ],
    []
  )

  return (
    <div>
      <div className="container-fluid w-100 mt-3">
        {isShowLoader && <CustomLoader />}

        <div className="row">
          <div className="col-lg-12 justify-content-between d-flex">
            <h6 className="main-heading">Bank Account List</h6>
            <button
              className={`ms-2 btn btn-secondary btn-sm`}
              type="button"
              onClick={handleAddBankAccount}
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
                      data={bankAccountListData}
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

        {isShowBankAccountModal && (
          <BankAccountModal
            bankAccountInfo={bankAccountInfo}
            isBankAccountEdit={isBankAccountEdit}
            isShowBankAccountModal={isShowBankAccountModal}
            onCloseBankAccountModal={handleBankAccountClose}
          />
        )}

        {isShowConfirmModal && (
          <ConfirmModal
            title="Are you sure ?"
            description="Are you sure you want to delete ?"
            handleDelete={handleDelete}
            isShowConfirmModal={isShowConfirmModal}
            onCloseConfirmModal={onCloseDeleteBankAccountConfirmModal}
          />
        )}
      </div>
    </div>
  )
}

export default BankAccountTable
