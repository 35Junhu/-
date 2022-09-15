<template>
  <div class="article">
    <van-pull-refresh v-model="refreshing" @refresh="onLoad">
      <van-list
        v-model="loading"
        @load="onLoad"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getNewsAPI } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      preTimestamp: '',
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getNews()
  },
  methods: {
    async getNews() {
      try {
        const { data } = await getNewsAPI(this.id, +new Date())
        // console.log(data)
        // 把当前时间戳存在全局变量，当做数据请求下一次
        this.preTimestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async onLoad() {
      try {
        // if (Math.random() < 0.5) {
        //   throw Error
        // }
        // 发送请求
        const { data } = await getNewsAPI(this.id, this.preTimestamp)
        // 判断是否还有数据
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 添加到全部数组中,判断一下加在前面或是后面
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 更新时间戳
        this.preTimestamp = data.data.pre_timestamp
        // 更改loading
        // this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        // 更改loading
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
