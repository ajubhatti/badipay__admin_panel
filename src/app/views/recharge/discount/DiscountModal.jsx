import { companyService } from "app/services/company.service";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CustomLoader from 'app/components/CustomLoader/CustomLoader'

const defaultDiscountInfo = {
    "operatorId": "",
    "amount" : "",
    "discountLimit": "",
    "type": "",
    "referalAmount": "",
    "referalDiscountLimit": "",
    "referalType": ""
}

const DiscountModal = (props) => {
    const [discountInfo, setDiscountInfo] = useState(defaultDiscountInfo);
    const [isShowLoader, setIsShowLoader] = useState(false);
    const [companies, setCompanies] = useState([]);

    const getAllCompanies = async() => {
        setIsShowLoader(true);
        await companyService.getAllCompanies().then((res) => {
            const companies = res?.data?.data.filter((company) => {
                return company.providerType == props.selectedServiceIndex;
            });

            companies.unshift({"_id" : 0, "companyName" : "Select Operator"});

            setCompanies(companies);
            setIsShowLoader(false);
        });
    }

    useEffect(() => {
        getAllCompanies();
    }, [props.selectedServiceIndex])

    useEffect(() => {
        setDiscountInfo(props.discountInfo);
    }, [props.discountInfo])

    const handleClose = () => {
        props.onCloseDiscountModal();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDiscountInfo(prev => ({...prev, [name]: value}));
    }

    const handleSaveDiscountModal = () => {
        props.onSaveDiscountModal(discountInfo);
    }

    return (
        <>
            { isShowLoader && (
                <CustomLoader />
            )} 
            <Modal
                show={props.isShowDiscountModal}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.isDiscountEdit ? 'Edit' : 'Add'} Discount</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="opearatorId">Operator</label>
                        <div className="col-sm-10">
                            <select name="opearatorId" value={discountInfo?.opearatorId} onChange={handleChange} className="form-control" id="opearatorId">
                                {companies.map((company) => {
                                    return <option key={company._id}  value={company._id}>{company.companyName}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="amount">Amount</label>
                        <div className="col-sm-10">
                            <input type="number" name="amount" onChange={handleChange} value={discountInfo?.amount} className="form-control" />
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="discountLimit">Limit</label>
                        <div className="col-sm-10">
                            <input type="number" name="discountLimit" onChange={handleChange} value={discountInfo?.discountLimit} className="form-control" />
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="type">Type</label>
                        <div className="col-sm-10">
                            <select name="type" onChange={handleChange} className="form-control" id="type">
                                <option value="number">Number</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="referalAmount">Referal Amount</label>
                        <div className="col-sm-10">
                            <input type="number" name="referalAmount" onChange={handleChange} value={discountInfo?.referalAmount} className="form-control" />
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="referalDiscountLimit">Referal Limit</label>
                        <div className="col-sm-10">
                            <input type="number" name="referalDiscountLimit" onChange={handleChange} value={discountInfo?.referalDiscountLimit} className="form-control" />
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label className="col-sm-2 col-form-label" htmlFor="referalType">Referal Type</label>
                        <div className="col-sm-10">
                            <select name="referalType" value={discountInfo?.referalType}  onChange={handleChange} className="form-control" id="referalType">
                                <option value="number">Number</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button
                        variant="primary"
                        disabled={!discountInfo?.amount || !discountInfo?.discountLimit || !discountInfo?.type || !discountInfo?.referalAmount || !discountInfo?.referalDiscountLimit || !discountInfo?.referalType || props.discountModalSave}
                        onClick={handleSaveDiscountModal}
                    >Save changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DiscountModal;