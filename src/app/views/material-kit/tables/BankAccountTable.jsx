import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material';
import React,{useEffect,useState} from 'react';
import { Box, styled } from '@mui/system';
import { bankAccountService } from '../../../services/bank.service';


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


const BankAccountTable = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [banksAccounts,setBanksAccounts] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    useEffect(() => { 
         getAllbankAccounts([]);
    },[])

    const getAllbankAccounts = async () => {
        await bankAccountService.getAllBankAccount().then(res => { 
            console.log("res ---", res)
             setBanksAccounts(res);
        })
       
    }

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Acc No.</TableCell>
                        <TableCell>Bank Name</TableCell>
                        <TableCell>Bank Branch</TableCell>
                        <TableCell>ifscCode</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {banksAccounts
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">
                                    {subscriber.accountName}
                                </TableCell>
                                <TableCell align="left">
                                    {subscriber.accountNo}
                                </TableCell>
                                <TableCell align="left">
                                    {subscriber.bankdetail[0].bankName}
                                </TableCell>
                                <TableCell align="left">
                                    {subscriber.bankBranch}
                                </TableCell>
                                <TableCell>{subscriber.ifscCode}</TableCell>
                                <TableCell>{subscriber.isActive ? 'open' : 'close'}</TableCell>
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
                count={banksAccounts.length}
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
    )
}

export default BankAccountTable
