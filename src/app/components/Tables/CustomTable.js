import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"

import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
// import CommonButton from "components/Common/Button/index";
import up from "../../assets/images/up.svg"
import down from "../../assets/images/down.svg"
import "../../assets/css/main.css"
import "./table.css"

const CardWrapper = ({ children }) => {
  return (
    <Row className="mb-5">
      <Col className="col-12">
        <Card>
          <CardBody>{children}</CardBody>
        </Card>
      </Col>
    </Row>
  )
}

const NoDataIndiCation = ({ loading }) => {
  return loading ? (
    <span>Please Wait While Data Is Loading...</span>
  ) : (
    <span>Data Not Available!</span>
  )
}

const CustomBootstrapTable = ({
  keyField,
  data,
  columns,
  onTableChange,
  selectRow,
  defaultSorted,
  children,
  bordered = false,
  light = true,
  remote = true,
  loading,
  ...rest
}) => {
  const columnsData = columns.map((col) => ({
    ...col,
    ...(col.hasOwnProperty("sort")
      ? {
          sortCaret: (order) => {
            return (
              <span className="sort-arrows cursor-pointer">
                {!!order ? (
                  order === "DESC" ? (
                    <>
                      {" "}
                      <img src={down} alt="down" className="custom-arrow" />
                    </>
                  ) : (
                    <>
                      {" "}
                      <img src={up} alt="up" className="custom-arrow" />
                    </>
                  )
                ) : (
                  <>
                    {" "}
                    <img src={up} alt="up" className="custom-arrow" />
                    <img src={down} alt="down" className="custom-arrow" />
                  </>
                )}
              </span>
            )
          },
        }
      : {}),
  }))

  return (
    <React.Fragment>
      <div className="mb-2 d-flex flex-column ">
        <div className="flex-grow-1">
          <div className="table-responsive main-table">
            <BootstrapTable
              {...rest}
              remote={remote}
              responsive
              bordered={false}
              striped={false}
              keyField={keyField}
              data={!loading ? data : []}
              columns={columnsData}
              onTableChange={onTableChange}
              selectRow={selectRow}
              hover
              defaultSorted={defaultSorted}
              classes={`table align-middle table-nowrap table-check ${
                bordered ? "table-bordered" : ""
              }`}
              headerWrapperClasses={`${light ? "table-light" : ""}`}
              noDataIndication={() => <NoDataIndiCation loading={loading} />}
              loading={loading}
              // headerStyle={headerStyle}
              // rowStyle={rowStyle}
              headerClasses={"custom-header-class"}
              rowClasses={"custom-row-class"}
            />
          </div>
        </div>
        {children}
      </div>
    </React.Fragment>
  )
}

const Table = ({
  search,
  handleSearch,
  showAddButton = true,
  onAddButtonClick,
  addButtonTitle = "Add",
  selectedRows,
  onMultiDeleteButtonClick,
  children,
  filters,
  withPagination = true,
  showSearch = true,
  colorCode,
  tableTitle,
  ...rest
}) => {
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 mb-3">
        <h4 className="m-0">{tableTitle}</h4>
        <div className="d-flex align-items-center justify-content-start justify-content-md-end flex-grow-1 gap-2 flex-wrap">
          {showSearch && (
            <div className="position-relative search-box m-0 min-w-150">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
              />
              <i className="bx bx-search-alt search-icon" />
            </div>
          )}
          {children}
          {filters}
          {/* {showAddButton && (
            <CommonButton
              btnText={addButtonTitle}
              btnStyle={{ backgroundColor: colorCode }}
              btnClass="px-3"
              btnClick={onAddButtonClick}
            ></CommonButton>
          )} */}
          {!!selectedRows?.length && (
            <button
              className="btn btn-danger circle-btn"
              onClick={onMultiDeleteButtonClick}
            >
              <i className="mdi mdi-trash-can"></i>
            </button>
          )}
        </div>
      </div>
      {withPagination ? (
        <PaginationTable {...rest} />
      ) : (
        <CustomBootstrapTable {...rest} />
      )}
    </>
  )
}

const pageListRenderer = ({ pages, onPageChange }) => {
  const pageWithoutIndication = pages.filter((p) => typeof p.page !== "string")
  return (
    <div>
      {pageWithoutIndication.map((p) => (
        <button
          className="btn btn-success"
          onClick={() => onPageChange(p.page)}
        >
          {p.page}
        </button>
      ))}
    </div>
  )
}

const options = (pageOptions) => {
  return {
    ...pageOptions,
    pageListRenderer,
  }
}

const withPagination =
  (Table) =>
  ({ pageOptions, ...rest }) => {
    const handleNextPage = ({ page, onPageChange }) => {
      onPageChange(page + 1)
    }

    const handlePrevPage = ({ page, onPageChange }) => {
      onPageChange(page - 1)
    }

    return (
      <PaginationProvider pagination={paginationFactory(options(pageOptions))}>
        {({ paginationProps, paginationTableProps }) => (
          <Table {...rest} {...paginationTableProps}>
            <div className="d-flex mt-2">
              <div className="d-flex align-items-center pagePerSize">
                <span className="me-2 d-none d-md-block ">
                  Records Per Page:{" "}
                </span>
                <SizePerPageDropdownStandalone {...paginationProps} />
              </div>
              <div className="ms-auto pagination d-flex align-items-center">
                <span className="me-2 d-flex align-items-center">
                  <span className="d-none d-md-block me-2">
                    Showing results{" "}
                  </span>
                  {(paginationProps.page - 1) * paginationProps.sizePerPage + 1}{" "}
                  -{" "}
                  {paginationProps.page * paginationProps.sizePerPage <=
                  paginationProps.totalSize
                    ? paginationProps.page * paginationProps.sizePerPage
                    : paginationProps.totalSize}
                </span>
                <button
                  className="btn btn-dark me-2 btn-sm"
                  disabled={paginationProps.page === 1}
                  onClick={() => handlePrevPage(paginationProps)}
                >
                  &lt;
                </button>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => handleNextPage(paginationProps)}
                  disabled={
                    paginationProps.page * paginationProps.sizePerPage >=
                    paginationProps.totalSize
                  }
                >
                  &gt;
                </button>
              </div>
            </div>
          </Table>
        )}
      </PaginationProvider>
    )
  }

const PaginationTable = withPagination(CustomBootstrapTable)

const CustomTable = ({ withCard = true, ...rest }) => {
  return withCard ? (
    <CardWrapper>
      <Table {...rest} />
    </CardWrapper>
  ) : (
    <Table {...rest} />
  )
}
export default CustomTable
