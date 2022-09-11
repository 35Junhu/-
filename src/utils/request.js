import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

request.interceptors.request.use(
  function (config) {
    // 解构一下数据
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store

    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export default request
