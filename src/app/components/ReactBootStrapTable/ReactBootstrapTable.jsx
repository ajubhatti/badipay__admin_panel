import React, { useEffect, useState } from "react"
import BootstrapTable from "react-bootstrap-table-next"

const ReactBootstrapTable = (props) => {
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        setTableData(props.tableData)
    }, [props])

    return (
        <div>
            <BootstrapTable
                keyField="_id"
                data={tableData}
                columns={props.columns}
                rowEvents={props.rowEvents}
                noDataIndication={
                    <NoDataIndication loading={props?.loading || false} />
                }
            />
        </div>
    )
}

export default ReactBootstrapTable

export const NoDataIndication = ({ loading }) => (
    <div className="d-flex justify-content-start">
        {loading ? (
            <span>Please wait while data is fetching...</span>
        ) : (
            <span>No data found!</span>
        )}
    </div>
)
