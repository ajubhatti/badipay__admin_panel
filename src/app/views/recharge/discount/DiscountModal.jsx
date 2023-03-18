import { companyService } from "app/services/company.service"
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import CustomLoader from "app/components/CustomLoader/CustomLoader"

const defaultDiscountInfo = {
    operatorId: "",
    userDiscount: 0,
    userDiscountType: "number",
    userDiscountLimit: 0,
    referalDiscount: 0,
    referalDiscountType: "number",
    referalDiscountLimit: 0,
    adminDiscount: 0,
    adminDiscountType: "number",
}

const DiscountModal = (props) => {
    const [discountInfo, setDiscountInfo] = useState(defaultDiscountInfo)
    const [isShowLoader, setIsShowLoader] = useState(false)
    const [companies, setCompanies] = useState([])

    const getAllCompanies = async () => {
        setIsShowLoader(true)
        await companyService.getAllCompanies().then((res) => {
            const companies = res?.data?.data.filter((company) => {
                return company.providerType == props.selectedServiceIndex
            })

            companies.unshift({ _id: 0, companyName: "Select Operator" })

            setCompanies(companies)
            setIsShowLoader(false)
        })
    }

    useEffect(() => {
        getAllCompanies()
    }, [props.selectedServiceIndex])

    useEffect(() => {
        console.log(props.discountInfo)
        setDiscountInfo(props.discountInfo.discountData)
        if (props.discountInfo.discountData) {
        } else {
            setDiscountInfo((prev) => ({
                ...prev,
                operatorId: props?.discountInfo?._id,
            }))
        }
    }, [props.discountInfo])

    const handleClose = () => {
        props.onCloseDiscountModal()
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDiscountInfo((prev) => ({ ...prev, [name]: value }))
    }

    const handleSaveDiscountModal = () => {
        props.onSaveDiscountModal(discountInfo)
    }

    return (
        <>
            {isShowLoader && <CustomLoader />}
            <Modal
                show={props.isShowDiscountModal}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.isDiscountEdit ? "Edit" : "Add"} Discount
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="operatorId"
                        >
                            Operator
                        </label>
                        <div className="col-sm-10">
                            <select
                                name="operatorId"
                                value={
                                    discountInfo?.operatorId ||
                                    props?.discountInfo?._id
                                }
                                onChange={handleChange}
                                className="form-control"
                                id="operatorId"
                            >
                                {companies.map((company) => {
                                    return (
                                        <option
                                            key={company._id}
                                            value={company._id}
                                        >
                                            {company.companyName}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="adminDiscount"
                        >
                            Admin Discount
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                name="adminDiscount"
                                onChange={handleChange}
                                value={discountInfo?.adminDiscount}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="adminDiscountType"
                        >
                            Admin Discount Type
                        </label>
                        <div className="col-sm-10">
                            <select
                                name="adminDiscountType"
                                onChange={handleChange}
                                className="form-control"
                                id="adminDiscountType"
                            >
                                <option value="number">Number</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </div>
                    </div>

                    {/* ========= */}
                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="userDiscount"
                        >
                            User Discount
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                name="userDiscount"
                                onChange={handleChange}
                                value={discountInfo?.userDiscount}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="userDiscountType"
                        >
                            User Discount Type
                        </label>
                        <div className="col-sm-10">
                            <select
                                name="userDiscountType"
                                onChange={handleChange}
                                className="form-control"
                                id="userDiscountType"
                            >
                                <option value="number">Number</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="userDiscountLimit"
                        >
                            Limit
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                name="userDiscountLimit"
                                onChange={handleChange}
                                value={discountInfo?.userDiscountLimit}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="referalDiscount"
                        >
                            Referal Amount
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                name="referalDiscount"
                                onChange={handleChange}
                                value={discountInfo?.referalDiscount}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="referalDiscountType"
                        >
                            Referal Type
                        </label>
                        <div className="col-sm-10">
                            <select
                                name="referalDiscountType"
                                value={discountInfo?.referalDiscountType}
                                onChange={handleChange}
                                className="form-control"
                                id="referalDiscountType"
                            >
                                <option value="number">Number</option>
                                <option value="percentage">Percentage</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-3 form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="referalDiscountLimit"
                        >
                            Referal Limit
                        </label>
                        <div className="col-sm-10">
                            <input
                                type="number"
                                name="referalDiscountLimit"
                                onChange={handleChange}
                                value={discountInfo?.referalDiscountLimit}
                                className="form-control"
                            />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {console.log(
                        discountInfo,
                        discountInfo?.userDiscount,
                        discountInfo?.userDiscountLimit,
                        discountInfo?.userDiscountType,
                        discountInfo?.referalDiscount,
                        discountInfo?.referalDiscountLimit,
                        discountInfo?.referalDiscountType,
                        props.discountModalSave
                    )}
                    <Button
                        variant="primary"
                        disabled={
                            !discountInfo?.userDiscount ||
                            !discountInfo?.userDiscountLimit ||
                            !discountInfo?.userDiscountType ||
                            !discountInfo?.referalDiscount ||
                            !discountInfo?.referalDiscountLimit ||
                            !discountInfo?.referalDiscountType ||
                            !discountInfo?.adminDiscount
                            // props.discountModalSave
                        }
                        onClick={handleSaveDiscountModal}
                    >
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DiscountModal
