import React from 'react'
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material'

const ReactDropDown = (props) => {
    const handleChange = (event) => {
        props.handleChange(event.target.value)
    }

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                    {props.title}
                </InputLabel>
                <Select
                    value={props.selectedValue}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {props?.options.map((x) => (
                        <MenuItem value={x.value}>{x.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default ReactDropDown
