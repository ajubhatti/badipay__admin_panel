import React, { useEffect, useState } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import "./table.css"

const ReactBootstrapTable = (props) => {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    setTableData(props.tableData)
  }, [props])

  return (
    <div className="table-main">
      <BootstrapTable
        keyField="_id"
        className="table-responsive"
        data={tableData}
        columns={props.columns}
        rowEvents={props.rowEvents}
        striped
        hover
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
