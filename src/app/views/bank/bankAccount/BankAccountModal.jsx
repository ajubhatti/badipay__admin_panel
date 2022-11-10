import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as bankServices from 'app/services/bank.service'

const defaultBankAccountInfo = {
    "accountName" : "",
    "accountNo": "",
    "accountDetail": "",
    "bankId": "",
    "ifscCode": "",
}

const BankAccountModal = (props) => {
    const [bankAccountInfo, setBankAccountInfo] = useState(defaultBankAccountInfo);
    const [saveLoading, setSaveLoading] = useState(false);
    const [banks, setBanks] = useState([]);

    const getAllBanks = async () => {
        await bankServices.bankService.getAllBank().then((res) => {
            let bank = [];
            bank = res?.data.filter((bank) => {
                return bank.isActive;
            }).map(function (bank) {
                return {"_id" : bank._id, "bankName" : bank.bankName};
            });
            bank.unshift({"_id" : 0, "bankName" : "Select Bank"});
            setBanks(bank);
        });
    }

    useEffect(() => {
        getAllBanks();
    }, []);

    useEffect(() => {
        setBankAccountInfo(props.bankAccountInfo);
    }, [props.bankAccountInfo])

    const handleClose = () => {
        props.onCloseBankAccountModal();
    };

    const handleSaveAndClose = () => {
        setSaveLoading(true);
        if (props.isBankAccountEdit) {
            bankServices.bankAccountService.updateBankAccount(props.bankAccountInfo._id, bankAccountInfo).then((res) => {
                if (res.status == "200") {
                    props.onCloseBankAccountModal(true);
                }
            });
        } else {
            bankServices.bankAccountService.addBankAccount(bankAccountInfo).then((res) => {
                if (res.status == "200") {
                    props.onCloseBankAccountModal(true);
                }
            });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBankAccountInfo(prev => ({...prev, [name]: value}));
    }

    return (
        <Modal
            show={props.isShowBankAccountModal}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.isBankAccountEdit ? 'Edit' : 'Add'} Bank Account</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="accountName">Account Holder Name</label>
                    <div className="col-sm-10">
                        <input type="text" name="accountName" onChange={handleChange} value={bankAccountInfo?.accountName} className="form-control" />
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="accountNo">Account Number</label>
                    <div className="col-sm-10">
                        <input type="text" name="accountNo" onChange={handleChange} value={bankAccountInfo?.accountNo} className="form-control" />
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="accountDetail">Account Detail</label>
                    <div className="col-sm-10">
                        <input type="text" name="accountDetail" onChange={handleChange} value={bankAccountInfo?.accountDetail} className="form-control" />
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="bankId">Bank</label>
                    <div className="col-sm-10">
                        <select
                            className="form-control"
                            name="bankId"
                            onChange={handleChange}
                            id="bankId"
                            required={true}
                            value={bankAccountInfo?.bankId}
                        >
                            {banks.map((bank) => {
                                return <option key={bank._id} value={bank._id}>{bank.bankName}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="ifscCode">IFSC Code</label>
                    <div className="col-sm-10">
                        <input type="text" name="ifscCode" onChange={handleChange} value={bankAccountInfo?.ifscCode} className="form-control" />
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" disabled={saveLoading || !bankAccountInfo?.ifscCode || !bankAccountInfo?.bankId || !bankAccountInfo?.accountName || !bankAccountInfo?.accountNo }  onClick={handleSaveAndClose}>{saveLoading ? 'Loading…' : 'Save changes'}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BankAccountModal;