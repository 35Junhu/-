<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机格式错误'
          }
        ]"
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
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '手机验证码错误' }
        ]"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
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
</style>
