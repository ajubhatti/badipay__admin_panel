import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const defaultBankInfo = {
    "bankName" : "",
    "bankDetail": ""
}

const BankAccountModal = (props) => {
    const [bankAccountInfo, setBankAccountInfo] = useState(defaultBankInfo);

    useEffect(() => {
        setBankAccountInfo(props.bankInfo);
    }, [props.bankInfo])

    const handleClose = () => {
        props.onCloseBankAccountModal();
    };

    const handleSaveAndClose = () => {
        props.onCloseBankAccountModal(true);
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBankAccountInfo(prev => ({...prev, [name]: value}));
    }

    return (
        <>
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
                    <label className="col-sm-2 col-form-label" htmlFor="bankName">Bank Name</label>
                    <div className="col-sm-10">
                        <input type="text" name="bankName" onChange={handleChange} value={bankAccountInfo?.bankName} className="form-control" />
                    </div>
                </div>
                <div className="mt-3 form-group row">
                    <label className="col-sm-2 col-form-label" htmlFor="bankDetail">Bank Detail</label>
                    <div className="col-sm-10">
                        <input type="text" name="bankDetail" onChange={handleChange} value={bankAccountInfo?.bankDetail} className="form-control" />
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveAndClose}>Save changes</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default BankAccountModal;