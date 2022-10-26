import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
// import './style.css'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'

const { SearchBar } = Search
const BasicTable = ({ columns, data }) => {
    const options = {
        custom: true,
        paginationSize: 4,
        pageStartIndex: 1,
        firstPageText: 'First',
        prePageText: 'Back',
        nextPageText: 'Next',
        lastPageText: 'Last',
        nextPageTitle: 'First page',
        prePageTitle: 'Pre page',
        firstPageTitle: 'Next page',
        lastPageTitle: 'Last page',
        showTotal: true,
        totalSize: data?.length,
    }

    const contentTable = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id"
                columns={columns}
                data={data || []}
                search
            >
                {(toolkitprops) => (
                    <div>
                        <SearchBar {...toolkitprops.searchProps} />
                        <BootstrapTable
                            striped
                            hover
                            {...toolkitprops.baseProps}
                            {...paginationTableProps}
                        />
                    </div>
                )}
            </ToolkitProvider>
            <PaginationListStandalone {...paginationProps} />
        </div>
    )
    return (
        <div>
            <PaginationProvider pagination={paginationFactory(options)}>
                {contentTable}
            </PaginationProvider>
        </div>
    )
}

export default BasicTable
