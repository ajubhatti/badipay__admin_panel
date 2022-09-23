import React, { useEffect, useState } from 'react'
import Select from 'react-select'

const ReactSelect = (props) => {
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        setSelectedValue(
            props?.options.find(
                (option) => option.value === props?.selectedValue
            )
        )
    }, [props?.selectedValue, props?.options])

    const handleChange = (event) => {
        props.handleChange(event?.value)
    }

    return (
        <Select
            value={selectedValue}
            defaultValue={selectedValue}
            onChange={handleChange}
            options={props?.options}
        />
    )
}

export default ReactSelect
