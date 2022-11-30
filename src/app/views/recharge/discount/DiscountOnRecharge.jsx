import CustomLoader from 'app/components/CustomLoader/CustomLoader'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

import { useTheme } from '@mui/system'
import ReactBootstrapTable from 'app/components/ReactBootStrapTable/ReactBootstrapTable';
// import DiscountModal from './DiscountModal';
import ConfirmModal from 'app/components/ConfirmModal/ConfirmModal';

import {discountServices} from 'app/services/discount.service'
import ReactSelect from 'react-select';

const DiscountOnRecharge = () => {
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [isShowDiscountModal, setIsShowDiscountModal] = useState(false);
    const [isShowDeleteDiscountConfirmModal, setIsShowDeleteDiscountConfirmModal] = useState(false);
    const [isDiscountEdit, setIsDiscountEdit] = useState(false);
    const [discountInfo, setdDiscountInfo] = useState([]);
    const [providers, setProviders] = useState([]);
    const [services, setServices] = useState([]);
    const [isShowDiscountData, setIsShowDiscountData] = useState(false);

    const { palette } = useTheme()
    const bgPrimary = palette.primary.main
    const bgError = palette.error.main

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
            dataField: '',
            text: 'Service Name',
        },
        {
            dataField: '',
            text: 'Service Provider',
        },
        {
            dataField: 'type',
            text: 'Discount Type',
        },
        {
            dataField: 'amount',
            text: 'Discount Amount',
        },
        {
            text: "Status",
            dataField: 'status',
            formatter: (cell, row) => row?.isActive ? "Active" : "Inactive"
        },
    ]

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            // console.log(e, row, rowIndex)
        },
    }

    const getAllProviders = async() => {
        setIsShowLoader(true);
        await discountServices.getAllApisAndServices().then((res) => {
            let provider = [];
            provider = res?.apisResponse?.data?.data?.data.filter((provider) => {
                return provider.isActive;
            }).map(function (provider) {
                return {"value" : provider._id, "label" : provider.apiName};
            });
            provider.unshift({"value" : 0, "label" : "Select Provider"});
            setProviders(provider);

            let service = [];
            service = res?.serviceResponse?.data?.data.filter((service) => {
                return service.isActive;
            }).map(function (service) {
                return {"value" : service._id, "label" : service.serviceName};
            });
            service.unshift({"value" : 0, "label" : "Select Service"});
            setServices(service);
            
            setIsShowLoader(false);
        });
    }

    useEffect(() => {
        getAllProviders();
    }, []);

    const getAllDiscounts = async() => {
        setIsShowLoader(true);
        await discountServices.getAllDiscount().then((res) => {
            console.log(res);
            setIsShowLoader(false);
        });
    }

    useEffect(() => {
        getAllDiscounts();
    }, []);

    const handleAddDiscount = () => {
        setIsShowDiscountModal(true);
    }

    const handleDiscountClose = () => {

    }

    const handleDelete = async() => {
        /* await bankService.deleteBank(bankInfo._id).then((res) => {
            if (res.status == "200") {
                setIsShowDeleteBankConfirmModal(false);
                getAllbanks();
            }
        }) */
    }

    const onCloseDeleteDiscountConfirmModal = () => {
        setIsShowDeleteDiscountConfirmModal(false);
    }

    const handleChange = () => {

    }

    const submitHandler = () => {

    }

    return (
        <div>
            { isShowLoader && (
                <CustomLoader />
            )}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card rounded-0 mb-4">
                            <div className="card-header">
                                <h6> SEARCH FILTERS</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="select-operator">
                                            <div className="col-md-4 m-2">
                                                <ReactSelect
                                                    title={'Providers'}
                                                    handleChange={handleChange}
                                                    options={providers}
                                                />
                                            </div>
                                            <div className="col-md-4 m-2">
                                                <ReactSelect
                                                    title={'services'}
                                                    handleChange={handleChange}
                                                    options={services}
                                                />
                                            </div>
                                            <Button
                                                className="btn btn-md btn-primary col-md-2"
                                                type="submit"
                                            >
                                                Search
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        { isShowDiscountData && (
                            <>
                                <div className='d-flex justify-content-end m-3'>
                                    <Button
                                        variant="info"
                                        type="button"
                                        className="btn btn-sm ml-2 ts-buttom m-1"
                                        size="sm"
                                        bgcolor={bgPrimary}
                                        onClick={handleAddDiscount}
                                    >
                                        <BsPlus />
                                        Add New
                                    </Button>
                                </div>
                    
                                <ReactBootstrapTable
                                    tableData={[]}
                                    columns={columns}
                                    rowEvents={rowEvents}
                                />
                    
                                { isShowDiscountModal && (
                                    {/* <DiscountModal
                                        discountInfo={discountInfo}
                                        isDiscountEdit={isDiscountEdit}
                                        isShowDiscountModal={isShowDiscountModal}
                                        onCloseDiscountModal={handleDiscountClose}
                                    /> */}
                                )}
                    
                                { isShowDeleteDiscountConfirmModal && (
                                    <ConfirmModal
                                        title="Are you sure ?"
                                        description="Are you sure you want to delete ?"
                                        handleDelete={handleDelete}
                                        isShowConfirmModal={isShowDeleteDiscountConfirmModal}
                                        onCloseConfirmModal={onCloseDeleteDiscountConfirmModal}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscountOnRecharge
