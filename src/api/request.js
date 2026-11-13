import axios from 'axios'
import { showLoading, hideLoading } from 'vant'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

service.interceptors.request.use(config => {
  showLoading()
  return config
})

service.interceptors.response.use(
  res => {
    hideLoading()
    return res.data
  },
  err => {
    hideLoading()
    alert('请求失败：' + err.message)
    return Promise.reject(err)
  }
)

export default service
