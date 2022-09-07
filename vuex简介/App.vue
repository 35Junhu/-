<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <!-- $store.getters.bigNum -->
    <h1>count的10倍:{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点击count+1</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped lang="less">
.box {
  width: 2rem;
  height: 2rem;
  background-color: purple;
}
</style>
