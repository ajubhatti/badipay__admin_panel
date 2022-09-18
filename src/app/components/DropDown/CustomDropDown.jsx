import React from 'react'
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material'

const CustomDropDown = (props) => {
    const [age, setAge] = React.useState('')

    const handleChange = (event) => {
        props.handleChange(event.target.value)
        setAge(event.target.value)
    }

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">
                    {props.title}
                </InputLabel>
                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default CustomDropDown
