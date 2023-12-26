<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view />
    </transition>
    <van-dialog
      v-model="cLoadingDialog.visible"
      :show-confirm-button="false"
      :className="'loading'"
      width="50%"
    >
      <van-loading size="36px" class="my-3" vertical type="spinner" color="#fff" text-color="#fff">
        <div v-html="cLoadingDialog.content"></div>
      </van-loading>
    </van-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {}
  },
  created() {},
  computed: {
    ...mapState({
      cLoadingDialog: function () {
        return this.$store.getters.getLoadingModel
      },
    }),
  },
}
</script>

<style lang="less">
.loading {
  background-color: transparent !important;
}
.my-3 {
  margin-top: 16px !important;
  margin-bottom: 16px !important;
}
</style>

