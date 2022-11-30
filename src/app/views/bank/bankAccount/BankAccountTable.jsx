import React, { useEffect, useState } from 'react'
import { bankAccountService } from 'app/services/bank.service'
import CustomLoader from 'app/components/CustomLoader/CustomLoader'
import { Button } from 'react-bootstrap'
import { BsPlus } from 'react-icons/bs'
import ReactBootstrapTable from 'app/components/ReactBootStrapTable/ReactBootstrapTable'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useTheme } from '@mui/system'
import BankAccountModal from './BankAccountModal'
import ConfirmModal from 'app/components/ConfirmModal/ConfirmModal'

const BankAccountTable = () => {
    const [banksAccounts, setBanksAccounts] = useState([])
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [isShowBankAccountModal, setIsShowBankAccountModal] = useState(false)
    const [bankAccountInfo, setBankAccountInfo] = useState([])
    const [isBankAccountEdit, setIsBankAccountEdit] = useState(false);

    const [isShowDeleteBankAccountConfirmModal, setIsShowDeleteBankAccountConfirmModal] = useState(false);

    const { palette } = useTheme()
    const bgPrimary = palette.primary.main
    const bgError = palette.error.main

    const getAllbankAccounts = async () => {
        setIsShowLoader(true);
        await bankAccountService.getAllBankAccount().then((res) => {
            setBanksAccounts(res?.data)
            setIsShowLoader(false);
        })
    }

    const handleAddBankAccount = () => {
        setIsShowBankAccountModal(true);
    }

    const handleEditBankAccount = (bankAccountInfo) => {
        setBankAccountInfo(bankAccountInfo);
        setIsShowBankAccountModal(true);
        setIsBankAccountEdit(true);
    }

    const handleBankAccountDelete = (bankAccountInfo) => {
        setIsShowDeleteBankAccountConfirmModal(true);
        setBankAccountInfo(bankAccountInfo);
    }

    const handleDelete = async() => {
        await bankAccountService.deleteBankAccount(bankAccountInfo._id).then((res) => {
            if (res.status == "200") {
                setIsShowDeleteBankAccountConfirmModal(false);
                getAllbankAccounts();
            }
        })
    }

    const onCloseDeleteBankAccountConfirmModal = () => {
        setIsShowDeleteBankAccountConfirmModal(false);
    }

    const handleBankAccountClose = (isLoadData = false) => {
        if (isLoadData) {
            getAllbankAccounts();
        }
        setIsShowBankAccountModal(false);
        setBankAccountInfo([]);
        setIsBankAccountEdit(false);
    }

    useEffect(() => {
        getAllbankAccounts();
    }, [])

    const columns = [
        {
            dataField: '_id',
            text: 'Sr No.',
            headerStyle: () => {
                return { width: '5%' }
            },
            formatter: (cellContent, row, index) => {
                return <span>{index + 1}</span>
            },
        },
        {
            dataField: 'accountName',
            text: 'Name',
        },
        {
            dataField: 'accountNo',
            text: 'Acc No.',
        },
        {
            dataField: '',
            text: 'Bank Name',
        },
        {
            dataField: 'bankName',
            text: 'Bank Branch',
        },
        {
            dataField: 'ifscCode',
            text: 'IFSC Code',
        },
        {
            text: 'Action',
            headerStyle: () => {
                return { width: '10%' }
            },
            formatter: (cell, row) => (
                <div>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
                        size="sm"
                        onClick={() => handleEditBankAccount(row)}
                    >
                        <AiFillEdit />
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
                        size="sm"
                        onClick={() => handleBankAccountDelete(row)}
                    >
                        <AiFillDelete />
                    </button>
                </div>
            ),
            classes: 'p-1',
        },
    ]

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(e, row, rowIndex)
        },
    }

    return (
        <div>
            { isShowLoader && (
                <CustomLoader />
            )}
            <div className='d-flex justify-content-end m-3'>
                <Button
                    variant="info"
                    type="button"
                    className="btn btn-sm ml-2 ts-buttom m-1"
                    size="sm"
                    bgcolor={bgPrimary}
                    onClick={handleAddBankAccount}
                >
                    <BsPlus />
                    Add New
                </Button>
            </div>
            <ReactBootstrapTable
                tableData={banksAccounts}
                columns={columns}
                rowEvents={rowEvents}
            />

            {isShowBankAccountModal && (
                <BankAccountModal
                    bankAccountInfo={bankAccountInfo}
                    isBankAccountEdit={isBankAccountEdit}
                    isShowBankAccountModal={isShowBankAccountModal}
                    onCloseBankAccountModal={handleBankAccountClose}
                >
                </BankAccountModal>
            )}

            { isShowDeleteBankAccountConfirmModal && (
                <ConfirmModal
                    title="Are you sure ?"
                    description="Are you sure you want to delete ?"
                    handleDelete={handleDelete}
                    isShowConfirmModal={isShowDeleteBankAccountConfirmModal}
                    onCloseConfirmModal={onCloseDeleteBankAccountConfirmModal}
                />
            )}
        </div>
    )
}

export default BankAccountTable
