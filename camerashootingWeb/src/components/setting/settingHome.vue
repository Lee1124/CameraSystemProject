<template>
  <div class="setting-content">
    <el-menu
      default-active="personal"
      class="el-menu-demo noSelect noBorder"
      mode="horizontal"
      text-color="#1D213E"
      active-text-color="#5996F8"
      @select="handleSelect"
    >
      <el-menu-item index="personal">个人中心</el-menu-item>
      <el-menu-item index="user">用户管理</el-menu-item>
      <el-menu-item index="depart">部门设置</el-menu-item>
      <el-menu-item index="post">岗位设置</el-menu-item>
      <el-menu-item index="other">其他参数</el-menu-item>
    </el-menu>
    <Personal v-if="activeItem=='personal'"></Personal>
    <UserManage v-if="activeItem=='user'"></UserManage>
    <DepartManage v-if="activeItem=='depart'"></DepartManage>
    <PostManage v-if="activeItem=='post'"></PostManage>
  </div>
</template>
<script>
import Personal from "@/components/setting/personal";
import UserManage from "@/components/setting/userManage";
import DepartManage from "@/components/setting/departManage";
import PostManage from "@/components/setting/postManage";
export default {
  components: { Personal, UserManage, DepartManage,PostManage },
  data() {
    return {
      activeItem: "personal"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeItem = keyPath;
    }
  }
};
</script>

<style scoped lang="scss">
.setting-content {
  width: 100%;
  height: 100%;
  background: #fff;
}
.noBorder {
  border: none !important;
}
.el-menu-item {
  padding: 0px;
  margin: 0 48px;
}
</style>