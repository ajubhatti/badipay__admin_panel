import React from 'react'
import Select from 'react-select'

const ReactSelect = (props) => {
    const handleChange = (event) => {
        props.handleChange(event?.value)
    }

    return (
        <Select
            defaultValue={props.selectedValue}
            onChange={handleChange}
            options={props?.options}
        />
    )
}

export default ReactSelect
