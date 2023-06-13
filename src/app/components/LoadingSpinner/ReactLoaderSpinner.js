import React from "react"
import { Grid } from "react-loader-spinner"

const ReactLoaderSpinner = () => {
  return (
    <Grid
      height="50"
      width="50"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12"
      wrapperStyle={{}}
      wrapperClass="justify-content-center"
      visible={true}
    />
  )
}

export default ReactLoaderSpinner
