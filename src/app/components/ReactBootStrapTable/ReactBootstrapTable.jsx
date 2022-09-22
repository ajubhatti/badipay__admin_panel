import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

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
            />
        </div>
    )
}

export default ReactBootstrapTable
