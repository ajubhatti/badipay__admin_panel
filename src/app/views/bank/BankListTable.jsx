import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/system'
import { bankService } from 'app/services/bank.service'
import ReactBootstrapTable from 'app/components/ReactBootStrapTable/ReactBootstrapTable'
import moment from 'moment'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { Button } from 'react-bootstrap'
import BankModal from './BankModal'
import { BsPlus } from 'react-icons/bs'
import style from './bankListStyle.css';
import CustomLoader from 'app/components/CustomLoader/CustomLoader'
import ConfirmModal from 'app/components/ConfirmModal/ConfirmModal'

const BankListTable = () => {
    const [banks, setBanks] = useState([])
    const [bankInfo, setBankInfo] = useState([])
    const [isShowBankModal, setIsShowBankModal] = useState(false)
    const [isBankEdit, setIsBankEdit] = useState(false);
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);

    const [isShowDeleteBankConfirmModal, setIsShowDeleteBankConfirmModal] = useState(false);

    const { palette } = useTheme()
    const bgPrimary = palette.primary.main
    const bgError = palette.error.main

    const getAllbanks = async() => {
        setIsShowLoader(true);
        await bankService.getAllBank().then((res) => {
            setBanks(res?.data);
            setIsShowLoader(false);
        });
    }

    useEffect(() => {
        getAllbanks();
    }, []);

    const handleChangeStatus = async(id, status) => {
        setStatusLoading(true);
        await bankService.updateBank(id, {isActive: status}).then((res) => {
            if (res.status == "200") {
                setStatusLoading(false);
                getAllbanks();
            }
        })
    }

    const handleEditBank = (bankInfo) => {
        setBankInfo(bankInfo);
        setIsShowBankModal(true);
        setIsBankEdit(true);
    }

    const handleAddBank = () => {
        setIsShowBankModal(true);
    }

    const handleBankDelete = (bankInfo) => {
        setIsShowDeleteBankConfirmModal(true);
        setBankInfo(bankInfo);
    }

    const handleDelete = async() => {
        await bankService.deleteBank(bankInfo._id).then((res) => {
            if (res.status == "200") {
                setIsShowDeleteBankConfirmModal(false);
                getAllbanks();
            }
        })
    }

    const onCloseDeleteBankConfirmModal = () => {
        setIsShowDeleteBankConfirmModal(false);
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
                            disabled={statusLoading}
                            className="btn btn-sm ml-2 ts-buttom m-1"
                            size="sm"
                            bgcolor={bgError}
                            onClick={!statusLoading ? () => handleChangeStatus(row._id, false) : null}
                        >
                            {statusLoading ? 'Loading' : 'InActive' }
                        </Button>
                    :
                        <Button
                            variant="success"
                            type="button"
                            className="btn btn-sm ml-2 ts-buttom m-1"
                            size="sm"
                            bgcolor={bgPrimary}
                            disabled={statusLoading}
                            onClick={!statusLoading ? () => handleChangeStatus(row._id, true) : null}
                        >
                            {statusLoading ? 'Loading' : 'Active' }
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
                        onClick={() => handleBankDelete(row)}
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

    const handleBankClose = (isLoadData = false) => {
        if (isLoadData) {
            getAllbanks();
        }
        setIsShowBankModal(false);
        setBankInfo([]);
        setIsBankEdit(false);
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
                    onClick={handleAddBank}
                >
                    <BsPlus />
                    Add New
                </Button>
            </div>

            <ReactBootstrapTable
                tableData={banks}
                columns={columns}
                rowEvents={rowEvents}
            />

            { isShowBankModal && (
                <BankModal
                    bankInfo={bankInfo}
                    isBankEdit={isBankEdit}
                    isShowBankModal={isShowBankModal}
                    onCloseBankModal={handleBankClose}
                />
            )}

            { isShowDeleteBankConfirmModal && (
                <ConfirmModal
                    title="Are you sure ?"
                    description="Are you sure you want to delete ?"
                    handleDelete={handleDelete}
                    isShowConfirmModal={isShowDeleteBankConfirmModal}
                    onCloseConfirmModal={onCloseDeleteBankConfirmModal}
                />
            )}
        </div>
    )
}

export default BankListTable
