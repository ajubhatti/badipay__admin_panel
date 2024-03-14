import { BASE_URL } from "app/constants/urls"
import { fetchWrapper } from "app/helpers/fetch-wrapper"
const url = `${BASE_URL}/file`

const uploadFile = (data) => {
  return fetchWrapper.postImage(`${url}/upload`, data)
}

export const uploadService = {
  uploadFile,
}
