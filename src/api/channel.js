import request from '@/utils/request'

/**
 * 获取用户频道，已通过请求拦截器添加token
 * @returns Promise实例对象
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
