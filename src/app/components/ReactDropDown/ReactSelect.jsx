import React, { useEffect, useState } from "react"
import Select from "react-select"

const ReactSelect = ({
  options,
  selectedValue,
  handleChange,
  placeHolder,
  isClearable,
  className,
  width,
}) => {
  const [defaultValue, setDefaultValue] = useState("")

  useEffect(() => {
    setDefaultValue(options.find((option) => option.value === selectedValue))
  }, [selectedValue, options])

  const handleOnChange = (event) => {
    handleChange(event?.value)
  }

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: width || 200,
    }),
  }

  return (
    <Select
      styles={customStyles}
      isClearable={isClearable}
      placeholder={placeHolder || "select"}
      value={defaultValue}
      defaultValue={defaultValue}
      onChange={handleOnChange}
      options={options}
      className={className}
    />
  )
}

export default ReactSelect
