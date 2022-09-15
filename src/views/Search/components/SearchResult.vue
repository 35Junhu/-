<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        :title="item.title"
        v-for="item in results"
        :key="item.art_id"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      per_page: 10,
      results: []
    }
  },
  methods: {
    async getResults() {
      try {
        if (Math.random() < 0.5) {
          throw new Error()
        }
        const { data } = await getSearchResultAPI(
          this.page++,
          this.per_page,
          this.keywords
        )
        const results = data.data.results
        // 进行返回数据长度的判断，如果为0，则把finished改为false
        if (results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
