var axios = require("axios")
const api_url = `${process.env.REACT_APP_BASE_URL}`

const getAllApisAndServices = () => {
  return axios
    .all([axios.get(`${api_url}/apis`), axios.get(`${api_url}/service`)])
    .then(
      axios.spread(function (apisResponse, serviceResponse) {
        return {
          apisResponse: apisResponse,
          serviceResponse: serviceResponse,
        }
      })
    )
}

const getAllDiscount = (params) => {
  return axios
    .post(`${api_url}/discount/getDiscountList`, params)
    .then(function (response) {
      return response
    })
}

const addDiscount = (params) => {
  return axios.post(`${api_url}/discount`, params).then(function (response) {
    return response
  })
}

const updateDiscount = (id, params) => {
  return axios
    .put(`${api_url}/discount/${id}`, params)
    .then(function (response) {
      return response
    })
}

const deleteDiscount = (id) => {
  return axios.delete(`${api_url}/discount/${id}`).then(function (response) {
    return response
  })
}

export const discountServices = {
  getAllApisAndServices,
  getAllDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
}
