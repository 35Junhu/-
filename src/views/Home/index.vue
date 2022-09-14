<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon="search" size="small" round block>搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 导航滑动 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="iconfont icon-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        v-if="isShow"
        :myChannels="channels"
        @del-channel="delChannel"
        @add-channel="addChannel"
        @change-active=";[(isShow = false), (active = $event)]"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.initChannels()
  },
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    // 初始化的方法，判断一下是否登录，再以何种方式获取数据
    initChannels() {
      // 如果登陆了，直接发请求获取初始数据
      if (this.isLogin) {
        this.getChannel()
      } else {
        // 未登录分2种情况
        // 1.本地存储没有数据，调用发送请求的方法
        // 2.本地存储有数据，把vuex里存的拿过来赋值
        // 这里先把vuex里存的拿过来，方便后续判断
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('刷新重试')
        }
      }
    },
    async delChannel(id) {
      try {
        this.channels = this.channels.filter((item) => item.id !== id)
        // const newChannels = this.channels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 存储在本地
          // this.SET_MY_CHANNELS(newChannels)
          this.SET_MY_CHANNELS(this.channels)
        }
        // 删除视图层
        // this.channels = newChannels
        this.$toast.success('删除成功')
      } catch (error) {
        const status = error.response?.status
        if (status === 401) {
          this.$toast.fail('请先登录')
        } else {
          throw Error
        }
      }
    },
    async addChannel(channel) {
      try {
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 存储在本地的操作
          this.SET_MY_CHANNELS([...this.channels, channel])
        }
        this.channels.push(channel)
        this.$toast.success('添加成功')
      } catch (error) {
        const status = error.response?.status
        if (status === 401) {
          this.$toast.fail('请先登录')
        } else {
          throw Error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
