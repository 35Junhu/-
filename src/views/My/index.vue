<template>
  <div class="profile">
    <!-- 头部 S-->
    <header>
      <!-- 登录结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <!-- 样式在van-row上，所以进行嵌套一个 -->
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">18856221786</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button size="mini" round class="edit-btn"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="iconfont icon-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="iconfont icon-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 身体 E -->
    <!-- 底部 S -->
    <footer>
      <van-button block v-if="isLogin" @click="logout">退出</van-button>
    </footer>
    <!-- 底部 E -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        // console.log(data)
        this.userInfo = data.data
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败,刷新重试')
        } else {
          // 抛出错误
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;

  .link {
    margin: 10px 0;
  }

  .iconfont {
    font-size: 40px;
  }

  .icon-shoucang {
    color: red;
  }
  .icon-lishi {
    color: orange;
  }
}

.banner {
  width: 100%;
  height: 5.3rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}

.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
    font-weight: 400;
  }
}

.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }

  .mobile {
    font-size: 30px;
    color: #fff;
  }

  .van-col {
    height: 100%;
  }

  .edit-btn {
    width: 1.6rem;
    height: 0.42rem;
    color: #666;
  }

  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
