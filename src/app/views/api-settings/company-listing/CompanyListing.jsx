// import {
//     IconButton,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Icon,
//     TablePagination,
//     Card,
//     Fab,
//     Switch,
// } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { Box, styled } from '@mui/system'

// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchCompanySuccess, getCompanies } from '../store/action'
// import { getApiList } from '../apis/store/action'

// const CardHeader = styled('div')(() => ({
//     paddingLeft: '24px',
//     paddingRight: '24px',
//     marginBottom: '12px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
// }))

// const Title = styled('span')(() => ({
//     fontSize: '1rem',
//     fontWeight: '500',
//     textTransform: 'capitalize',
// }))

// const UserTable = styled(Table)(() => ({
//     minWidth: 400,
//     whiteSpace: 'pre',
//     '& small': {
//         height: 15,
//         width: 50,
//         borderRadius: 500,
//         boxShadow:
//             '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
//     },
//     '& td': {
//         borderBottom: 'none',
//     },
//     '& td:first-of-type': {
//         paddingLeft: '16px !important',
//     },
// }))

// const Small = styled('small')(({ bgcolor }) => ({
//     height: 15,
//     width: 50,
//     color: '#fff',
//     padding: '2px 8px',
//     borderRadius: '4px',
//     overflow: 'hidden',
//     background: bgcolor,
//     boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
// }))

// const StyledTable = styled(Table)(({ theme }) => ({
//     whiteSpace: 'pre',
//     '& thead': {
//         '& tr': {
//             '& th': {
//                 paddingLeft: 0,
//                 paddingRight: 0,
//             },
//         },
//     },
//     '& tbody': {
//         '& tr': {
//             '& td': {
//                 paddingLeft: 0,
//                 textTransform: 'capitalize',
//             },
//         },
//     },
// }))

// const CompanyListing = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const { companyList } = useSelector((state) => state.company)
//     const [rowsPerPage, setRowsPerPage] = useState(5)
//     const [page, setPage] = useState(0)
//     const [companies, setCompanies] = useState([])
//     const [modelOpen, setModelOpen] = useState(false)
//     const [modelTitle, setmodelTitle] = useState('New Operator')

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage)
//     }

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(+event.target.value)
//         setPage(0)
//     }

//     useEffect(() => {
//         dispatch(getCompanies())
//         dispatch(getApiList())
//     }, [dispatch])

//     useEffect(() => {
//         setCompanies(companyList)
//     }, [companyList])

//     const handleVisibleChange = (data, index, key) => (event) => {
//         companies[index][key] = event.target.checked
//         dispatch(fetchCompanySuccess(companies))
//     }

//     const changeStatus = (data) => {
//         data.isActive = !data.isActive
//         delete data.email
//         delete data.role
//     }

//     const editUser = (data) => {
//         navigate('/api-setting/company/add/' + data._id)
//     }

//     return (
//         <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
//             <CardHeader>
//                 <Title>Operator List</Title>
//                 <Fab
//                     size="small"
//                     color="secondary"
//                     aria-label="Add"
//                     className="button"
//                     onClick={() => {
//                         navigate('/api-setting/company/add')
//                     }}
//                 >
//                     <Icon>add</Icon>
//                 </Fab>
//             </CardHeader>
//             <Box width="100%" overflow="auto" sx={{ pt: '20px', mb: 3, ml: 3 }}>
//                 <StyledTable>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Operator Name</TableCell>
//                             <TableCell>Operator Detail</TableCell>
//                             <TableCell>Is Active</TableCell>
//                             <TableCell>Is Visible</TableCell>
//                             <TableCell>Min Amount</TableCell>
//                             <TableCell>Max Amount</TableCell>
//                             <TableCell>created time</TableCell>
//                             <TableCell>Action</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {companies
//                             .slice(
//                                 page * rowsPerPage,
//                                 page * rowsPerPage + rowsPerPage
//                             )
//                             .map((subscriber, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell align="left">
//                                         {subscriber.companyName}
//                                     </TableCell>
//                                     <TableCell align="left">
//                                         {subscriber.companyDetail}
//                                     </TableCell>
//                                     <TableCell>
//                                         <Switch
//                                             checked={subscriber.isActive}
//                                             onChange={handleVisibleChange(
//                                                 subscriber,
//                                                 index,
//                                                 'isActive'
//                                             )}
//                                             value={subscriber.isActive}
//                                         />
//                                     </TableCell>
//                                     
//                                     <TableCell>
//                                         <Switch
//                                             checked={subscriber.isVisible}
//                                             onChange={handleVisibleChange(
//                                                 subscriber,
//                                                 index,
//                                                 'isVisible'
//                                             )}
//                                             value={subscriber.isVisible}
//                                         />
//                                     </TableCell>
//                                     <TableCell align="left">
//                                         {subscriber.minAmount}
//                                     </TableCell>
//                                     <TableCell align="left">
//                                         {subscriber.maxAmount}
//                                     </TableCell>
//                                     <TableCell align="left">
//                                         {subscriber.created}
//                                     </TableCell>

//                                     <TableCell sx={{ px: 0 }}>
//                                         <IconButton
//                                             onClick={() =>
//                                                 changeStatus(subscriber)
//                                             }
//                                         >
//                                             <Icon
//                                                 color={`${
//                                                     subscriber.isActive
//                                                         ? 'error'
//                                                         : 'primary'
//                                                 }`}
//                                             >
//                                                 {subscriber.isActive
//                                                     ? 'close'
//                                                     : 'check'}
//                                             </Icon>
//                                         </IconButton>
//                                         <IconButton
//                                             onClick={() => editUser(subscriber)}
//                                         >
//                                             <Icon>edit_icon</Icon>
//                                         </IconButton>
//                                     </TableCell>

//                                     {/* <TableCell>
//                                         <IconButton>
//                                             <Icon color="error">close</Icon>
//                                         </IconButton>
//                                     </TableCell> */}
//                                 </TableRow>
//                             ))}
//                     </TableBody>
//                 </StyledTable>

//                 <TablePagination
//                     sx={{ px: 2 }}
//                     rowsPerPageOptions={[5, 10, 25]}
//                     component="div"
//                     count={companies.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     backIconButtonProps={{
//                         'aria-label': 'Previous Page',
//                     }}
//                     nextIconButtonProps={{
//                         'aria-label': 'Next Page',
//                     }}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </Box>

//             {/* <AddUpdateCompanyDialog
//                 setOpen={setModelOpen}
//                 open={modelOpen}
//                 subscriber={companies}
//                 title={modelTitle}
//                 getAllCompany={() => {
//                     getAllCompany()
//                 }}
//             /> */}
//         </Card>
//     )
// }

// export default CompanyListing

import React from 'react'
// import editIcon from 'public/assets/images/pencil.png'
// import closeIcon from 'public/assets/images/close.png'

const CompanyListing = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mx-3">
                            <h2 className="mb-0">Operator List</h2>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h6 className="px-3">Operator List</h6>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Operator Name</th>
                                                <th>Operator Details</th>
                                                <th>Is Active</th>
                                                <th>Is Visible</th>
                                                <th>Min Amount</th>
                                                <th>Max Amount</th>
                                                <th>Created Time</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Hello</th>
                                                <td>Admin</td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="flexSwitchCheckDefault"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            role="switch"
                                                            id="flexSwitchCheckDefault"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">10</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">500</p>
                                                </td>
                                                <td>
                                                    <p className="mb-0">
                                                        2022-09-01
                                                    </p>
                                                </td>
                                                <td>
                                                    <div className="custom-e">
                                                        {/* <button className="btn btn-sm ">
                                                            <img
                                                                src={editIcon}
                                                                alt="edit"
                                                            />
                                                        </button>
                                                        <button className="btn btn-sm ">
                                                            <img
                                                                src={closeIcon}
                                                                alt="delete"
                                                            />{' '}
                                                        </button> */}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan="8">
                                                    <div className="custom-pagination">
                                                        <nav aria-label="Page navigation example">
                                                            <ul className="pagination mb-0">
                                                                <li className="page-item">
                                                                    <a
                                                                        className="page-link"
                                                                        href="#"
                                                                        aria-label="Previous"
                                                                    >
                                                                        <span aria-hidden="true">
                                                                            &laquo;
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                                <li className="page-item">
                                                                    <a
                                                                        className="page-link"
                                                                        href="#"
                                                                    >
                                                                        1
                                                                    </a>
                                                                </li>
                                                                <li className="page-item">
                                                                    <a
                                                                        className="page-link"
                                                                        href="#"
                                                                    >
                                                                        2
                                                                    </a>
                                                                </li>
                                                                <li className="page-item">
                                                                    <a
                                                                        className="page-link"
                                                                        href="#"
                                                                    >
                                                                        3
                                                                    </a>
                                                                </li>
                                                                <li className="page-item">
                                                                    <a
                                                                        className="page-link"
                                                                        href="#"
                                                                        aria-label="Next"
                                                                    >
                                                                        <span aria-hidden="true">
                                                                            &raquo;
                                                                        </span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CompanyListing
