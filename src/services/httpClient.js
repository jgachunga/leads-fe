import axios from 'axios'
import { toast } from 'react-toastify'
import { authHeader } from '../helpers/authHelper'

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {},
})

axiosApi.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    const { data = null } = error.response

    data?.message && toast.error(data?.message)
    data?.detail?.map(({ loc, msg }) => {
      toast.error(`${loc?.[2]} ${msg}`)
    })

    return Promise.reject(error)
  }
)

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { params: config, headers: await authHeader() })
    .then((response) => response)
}

export async function patch(url, data, config = {}) {
  return await axiosApi
    .patch(url, { ...data }, { ...config, headers: await authHeader() })
    .then((response) => response)
    .catch((error) => error.response)
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config, headers: await authHeader() })
    .then((response) => response)
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config, headers: await authHeader() })
    .then((response) => response)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config, headers: await authHeader() })
    .then((response) => response)
}
