var axios = require('axios');
const api_url = `${process.env.REACT_APP_BASE_URL}`

const getAllApisAndServices = () => {
    return axios.all([axios.get(`${api_url}/apis`), (axios.get(`${api_url}/service`))]).then(axios.spread(function(apisResponse, serviceResponse) {
        return {
            'apisResponse': apisResponse,
            'serviceResponse': serviceResponse
        }
    }));
}

const getAllDiscount = (params) => {
    return axios.post(`${api_url}/discount/getDiscountList`, params).then(function(response) {
        return response;
    });
}

export const discountServices = {
    getAllApisAndServices,
    getAllDiscount
}
