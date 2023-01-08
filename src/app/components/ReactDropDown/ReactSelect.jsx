import React, { useEffect, useState } from "react"
import Select from "react-select"

const ReactSelect = ({ options, selectedValue, handleChange }) => {
    const [defaultValue, setDefaultValue] = useState("")

    useEffect(() => {
        setDefaultValue(
            options.find((option) => option.value === selectedValue)
        )
    }, [selectedValue, options])

    const handleOnChange = (event) => {
        handleChange(event?.value)
    }

    return (
        <Select
            value={defaultValue}
            defaultValue={defaultValue}
            onChange={handleOnChange}
            options={options}
        />
    )
}

export default ReactSelect
