import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/system'
import { bankAccountService } from 'app/services/bank.service'
import ReactBootstrapTable from 'app/components/ReactBootStrapTable/ReactBootstrapTable'
import moment from 'moment'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import BankAccountModal from './BankAccountModal'

const BankListTable = () => {
    const [banksAccounts, setBanksAccounts] = useState([])
    const [bankEditInfo, setBankEditInfo] = useState([])
    const [isShowBankAccountModal, setIsShowBankAccountModal] = useState(false)
    const [isBankAccountEdit, setIsBankAccountEdit] = useState(false);
    const { palette } = useTheme()
    const bgPrimary = palette.primary.main
    const bgError = palette.error.main

    useEffect(() => {
        async function getAllbanks() {
            await bankAccountService.getAllBank().then((res) => {
                setBanksAccounts(res?.data)
            })
        }
        getAllbanks();
    }, []);

    const handleChangeStatus = async(id, status) => {
        await bankAccountService.updateBankAccount(id).then((res) => {
            console.log("response is " , res);
        })
    }

    const handleEditBank = (bankInfo) => {
        setBankEditInfo(bankInfo);
        setIsShowBankAccountModal(true);
        setIsBankAccountEdit(true);
    }

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
            dataField: 'bankName',
            text: 'Bank Name',
        },
        {
            dataField: 'bankDetail',
            text: 'Bank Detail',
        },
        {
            dataField: 'created',
            text: 'Created At',
            formatter: (cell, row) => moment(row?.created).format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            text: "Status",
            dataField: 'status',
            formatter: (cell, row) => row?.isActive ? "Active" : "Inactive"
        },
        {
            text: "Active/Inactive",
            formatter: (cell, row) => (
                <div>
                    {row?.isActive ? 
                        <Button
                            variant="danger"
                            type="button"
                            className="btn btn-sm ml-2 ts-buttom m-1"
                            size="sm"
                            bgcolor={bgError}
                            onClick={() => handleChangeStatus(row._id, 'inactive')}
                        >
                            InActive
                        </Button>
                    :
                        <Button
                            variant="success"
                            type="button"
                            className="btn btn-sm ml-2 ts-buttom m-1"
                            size="sm"
                            bgcolor={bgPrimary}
                            onClick={() => handleChangeStatus(row._id, 'active')}
                        >
                            Active
                        </Button>
                    }
                </div>
            ),
            classes: 'p-1',
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
                        onClick={() => handleEditBank(row)}
                    >
                        <AiFillEdit />
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-sm ml-2 ts-buttom m-1"
                        size="sm"
                        onClick={() => {}}
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

    const handleBankAccountClose = (isLoadData = false) => {
        setIsShowBankAccountModal(false);
    }

    return (
        <div>
            <ReactBootstrapTable
                tableData={banksAccounts}
                columns={columns}
                rowEvents={rowEvents}
            />
            { isShowBankAccountModal && (
                <BankAccountModal
                    bankInfo={bankEditInfo}
                    isBankAccountEdit={isBankAccountEdit}
                    isShowBankAccountModal={isShowBankAccountModal}
                    onCloseBankAccountModal={handleBankAccountClose}
                />
            )}
        </div>
    )
}

export default BankListTable
