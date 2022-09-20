import React, { useEffect } from 'react'
import { Snackbar } from '@mui/material'

const CustomSnackBar = (props) => {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    })

    useEffect(() => {
        setState({ ...state, open: props.isOpen })
    }, [props, state])

    const { vertical, horizontal, open } = state

    const handleClose = () => {
        setState({ ...state, open: false })
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                key={`${vertical},${horizontal}`}
                open={open}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{props.message}</span>}
            />
        </div>
    )
}

export default CustomSnackBar
