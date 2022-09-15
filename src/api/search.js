import request from '@/utils/request'

/**
 * 获取搜索建议
 * @param {*} q 搜索的关键词
 * @returns Promise实例对象
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {Number} page 页数
 * @param {Number} per_page 每页页数
 * @param {String} q 搜索关键词
 * @returns
 */
export const getSearchResultAPI = (
  page,
  /* eslint-disable-line */ per_page,
  q
) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
