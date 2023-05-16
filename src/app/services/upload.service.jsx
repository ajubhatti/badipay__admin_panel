import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${process.env.REACT_APP_BASE_URL}/file`

const uploadFile = (data) => {
  return fetchWrapper.postImage(`${url}/upload`, data)
}

export const uploadService = {
  uploadFile,
}
