import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Card,
    Fab,
    FormControlLabel,
    Switch,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/system'
import { companyService } from 'app/services/company.service'
import AddUpdateCompanyDialog from './AddUpdateCompanyDialog'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompanySuccess, getCompanies } from '../store/action'
import { getApiList } from '../apis/store/action'

const CardHeader = styled('div')(() => ({
    paddingLeft: '24px',
    paddingRight: '24px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}))

const Title = styled('span')(() => ({
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'capitalize',
}))

const UserTable = styled(Table)(() => ({
    minWidth: 400,
    whiteSpace: 'pre',
    '& small': {
        height: 15,
        width: 50,
        borderRadius: 500,
        boxShadow:
            '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
    },
    '& td': {
        borderBottom: 'none',
    },
    '& td:first-of-type': {
        paddingLeft: '16px !important',
    },
}))

const Small = styled('small')(({ bgcolor }) => ({
    height: 15,
    width: 50,
    color: '#fff',
    padding: '2px 8px',
    borderRadius: '4px',
    overflow: 'hidden',
    background: bgcolor,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}))

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
}))

const CompanyListing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { companyList } = useSelector((state) => state.company)
    console.log('companyList', companyList)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [companies, setCompanies] = useState([])
    const [modelOpen, setModelOpen] = useState(false)
    const [modelTitle, setmodelTitle] = useState('New Operator')

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => {
        dispatch(getCompanies())
        dispatch(getApiList())
    }, [dispatch])

    useEffect(() => {
        setCompanies(companyList)
    }, [companyList])

    const handleVisibleChange = (data, index, key) => (event) => {
        companies[index][key] = event.target.checked
        dispatch(fetchCompanySuccess(companies))
    }

    return (
        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
            <CardHeader>
                <Title>Operator List</Title>
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="Add"
                    className="button"
                    onClick={() => {
                        navigate('/api-setting/company/add')
                    }}
                >
                    <Icon>add</Icon>
                </Fab>
            </CardHeader>
            <Box width="100%" overflow="auto" sx={{ pt: '20px', mb: 3, ml: 3 }}>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Operator Name</TableCell>
                            <TableCell>Operator Detail</TableCell>
                            <TableCell>Is Active</TableCell>
                            <TableCell>Is Visible</TableCell>
                            <TableCell>Min Amount</TableCell>
                            <TableCell>Max Amount</TableCell>
                            <TableCell>created time</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {subscriber.companyName}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.companyDetail}
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={subscriber.isActive}
                                            onChange={handleVisibleChange(
                                                subscriber,
                                                index,
                                                'isActive'
                                            )}
                                            value={subscriber.isActive}
                                        />
                                    </TableCell>
                                    {console.log(
                                        'subscribe.isVisible',
                                        subscriber.isVisible
                                    )}
                                    <TableCell>
                                        <Switch
                                            checked={subscriber.isVisible}
                                            onChange={handleVisibleChange(
                                                subscriber,
                                                index,
                                                'isVisible'
                                            )}
                                            value={subscriber.isVisible}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.minAmount}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.maxAmount}
                                    </TableCell>
                                    <TableCell align="left">
                                        {subscriber.created}
                                    </TableCell>

                                    <TableCell>
                                        <IconButton>
                                            <Icon color="error">close</Icon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={companies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>

            {/* <AddUpdateCompanyDialog
                setOpen={setModelOpen}
                open={modelOpen}
                userData={companies}
                title={modelTitle}
                getAllCompany={() => {
                    getAllCompany()
                }}
            /> */}
        </Card>
    )
}

export default CompanyListing
