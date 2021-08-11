import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { timeout } from '@/utils/time'

let loadingInstance

function openLoading() {
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function closeLoading() {
  loadingInstance && loadingInstance.close()
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: timeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const { isShowLoading, myTimeout } = config
    isShowLoading && openLoading()

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
      // config.headers['Authorization'] = 'Bearer ' + getToken()
    }

    if (myTimeout === 0 || myTimeout) {
      config.timeout = myTimeout
    }

    return config
  },
  error => {
    closeLoading()
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    closeLoading()
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Service Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    closeLoading()

    const errorResponse = error.response || {}
    const errorResponseData = errorResponse.data || {}
    Message({
      message: errorResponseData.message || 'Request Timeout',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
