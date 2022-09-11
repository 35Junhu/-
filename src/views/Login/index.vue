<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            type="default"
            round
            size="small"
            block
            native-type="button"
            class="btn"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <!-- 倒计时 -->
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { Login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const { data } = await Login(this.mobile, this.code)
        console.log(data)
        // 将token存进vuex
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail(err.response.data.message)
        } else {
          // js导致的错误，抛出错误
          this.$toast.clear()
          throw err
        }
      }
    },
    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      // console.log('发送请求')
      try {
        await sendCodeAPI(this.mobile)
        this.isShowCodeBtn = false
        this.$toast.success('发送验证码成功')
      } catch (err) {
        if (
          err.response &&
          (err.response.status === 429 || err.response.status === 404)
        ) {
          // axios错误
          this.$toast.fail(err.response.data.message)
        } else {
          this.$toast.clear()
          throw err
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.form) {
  .van-cell__title {
    flex: 1;
  }

  .van-cell__value {
    flex: 20;
  }

  .iconfont {
    font-size: 40px;
  }
}

.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
