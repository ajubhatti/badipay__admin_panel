import React from 'react'

const OperatorSwitching = () => {
    const submitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className='main-heading'>API PRIORITY</h2>
                    </div>
                    <div className="col-lg-12">
                        <div className="card rounded-0 mb-4">
                            <div className="card-header">
                                <h6> SEARCH FILTERS</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-8">
                                        <form
                                            onSubmit={submitHandler}
                                            className="select-operator "
                                        >
                                            <h5>Select Operator</h5>
                                            <div className="list-of-operator">
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                >
                                                    <option selected></option>
                                                    <option value="1">
                                                        Mobile
                                                    </option>
                                                    <option value="2">
                                                        Dth
                                                    </option>
                                                    <option value="3">
                                                        Post paid
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="list-of-operator">
                                                <select
                                                    className="form-select"
                                                    aria-label="Default select example"
                                                >
                                                    <option selected></option>
                                                    <option value="1">
                                                        One
                                                    </option>
                                                    <option value="2">
                                                        Two
                                                    </option>
                                                    <option value="3">
                                                        Three
                                                    </option>
                                                </select>
                                            </div>
                                            <button className="btn btn-md btn-primary">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="card rounded-0">
                            <div className="card-header">
                                <h6> OPERATOR LIST</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <form onSubmit={submitHandler}>
                                            <div>
                                                <table className="table mb-4" >
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>NAME</th>
                                                            <th>
                                                                PENDING LIMIT
                                                            </th>
                                                            <th>
                                                                TOTAL PENDING
                                                            </th>
                                                            <th>PRIORITY</th>
                                                            <th>
                                                                ENABLE/DISABLE
                                                            </th>
                                                            <th>
                                                                FAILURE LIMIT
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">
                                                                1
                                                            </th>
                                                            <td>
                                                               MROBO
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    <div>
                                                                        {' '}
                                                                        <input
                                                                            type="number"
                                                                            class="form-input"
                                                                            id="exampleCheck1"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span>0</span>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {' '}
                                                                    <input
                                                                        type="number"
                                                                        class="form-input"
                                                                        id="exampleCheck1"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {' '}
                                                                    <input
                                                                        type="checkbox"
                                                                        class="form-check-input"
                                                                        id="exampleCheck1"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div>
                                                                    {' '}
                                                                    <input
                                                                        type="number"
                                                                        class="form-input"
                                                                        id="exampleCheck1"
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OperatorSwitching
