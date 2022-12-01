import { companyService } from "app/services/company.service";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const defaultDiscountInfo = {
    "amount" : "",
    "discountLimit": "",
    "type": "",
    "referalAmount": "",
    "referalDiscountLimit": "",
    "referalType": "",
}

const DiscountModal = (props) => {
    const [discountInfo, setDiscountInfo] = useState(defaultDiscountInfo);
    const [companies, setCompanies] = useState([]);
    const [saveLoading, setSaveLoading] = useState(false);

    const getAllCompanies = async() => {
        await companyService.getAllCompanies().then((res) => {
            const companies = res?.data?.data.filter((company) => {
                return company.providerType == props.selectedServiceIndex;
            });

            setCompanies(companies);
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
        props.handleSaveDiscountModal(discountInfo);
    }

    return (
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
                    <label className="col-sm-2 col-form-label" htmlFor="operator">Operator</label>
                    <div className="col-sm-10">
                        <select name="operator" onChange={handleChange} className="form-control" id="operator">
                            {companies.map((company) => {
                                return <option key={company._id} value={company._id}>{company.companyName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="amount">Amount</label>
                    <div className="col-sm-10">
                        <input type="text" name="amount" onChange={handleChange} value={discountInfo?.amount} className="form-control" />
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="discountLimit">Limit</label>
                    <div className="col-sm-10">
                        <input type="text" name="discountLimit" onChange={handleChange} value={discountInfo?.discountLimit} className="form-control" />
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
                        <input type="text" name="referalAmount" onChange={handleChange} value={discountInfo?.referalAmount} className="form-control" />
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="referalDiscountLimit">Referal Limit</label>
                    <div className="col-sm-10">
                        <input type="text" name="referalDiscountLimit" onChange={handleChange} value={discountInfo?.referalDiscountLimit} className="form-control" />
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="referalType">Referal Type</label>
                    <div className="col-sm-10">
                        <select name="referalType" onChange={handleChange} className="form-control" id="referalType">
                            <option value="number">Number</option>
                            <option value="percentage">Percentage</option>
                        </select>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" disabled={saveLoading ? true : false }  onClick={() => handleSaveDiscountModal}>{saveLoading ? 'Loading…' : 'Save changes'}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DiscountModal;