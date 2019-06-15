<template>
  <div class="device-main">
    <el-menu
      default-active="device"
      class="el-menu-demo noSelect noBorder"
      mode="horizontal"
      :router="true"
      text-color="#1D213E"
      active-text-color="#5996F8"
    >
      <el-menu-item index="device">设备</el-menu-item>
      <el-menu-item index="outgoing">出库列表</el-menu-item>
      <el-menu-item index="maintain">报损维护</el-menu-item>
      <el-menu-item index="statistical">统计分析</el-menu-item>
    </el-menu>
    <router-view class="device-router"></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuList: [
        { name: "设备", path: "device" },
        { name: "出库列表", path: "outgoing" },
        { name: "报损维护", path: "maintain" },
        { name: "统计分析", path: "statistical" }
      ]
    };
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
.device-main {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
}
.noBorder {
  border: none !important;
}
.device-main .el-menu-demo {
  padding: 1% 0 2.3% 0;
}
.device-main .el-menu-item {
  padding: 0px;
  margin: 0 3%;
}
.device-router {
  width: 100%;
  height: 84%;
}
</style>
