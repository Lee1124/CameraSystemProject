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
      <el-menu-item index="hotel">酒店管理</el-menu-item>
      <el-menu-item index="wedding">婚庆管理</el-menu-item>
      <el-menu-item index="project">项目管理</el-menu-item>
      <el-menu-item index="depart">部门设置</el-menu-item>
      <el-menu-item index="post">岗位设置</el-menu-item>
      <el-menu-item index="check">考核设置</el-menu-item>
      <el-menu-item index="other">其他参数</el-menu-item>
    </el-menu>
    <Personal v-if="activeItem=='personal'"></Personal>
    <UserManage v-if="activeItem=='user'"></UserManage>
    <DepartManage v-if="activeItem=='depart'"></DepartManage>
    <PostManage v-if="activeItem=='post'"></PostManage>
    <HotelManage v-if="activeItem=='hotel'"></HotelManage>
    <WeddingManage v-if="activeItem=='wedding'"></WeddingManage>
    <ProjectManage v-if="activeItem=='project'"></ProjectManage>
    <CheckSetting v-if="activeItem=='check'"></CheckSetting>
  </div>
</template>
<script>
import Personal from "@/components/setting/personal";
import UserManage from "@/components/setting/userManage";
import DepartManage from "@/components/setting/departManage";
import PostManage from "@/components/setting/postManage";
import HotelManage from "@/components/setting/hotelManage";
import WeddingManage from "@/components/setting/weddingManage";
import ProjectManage from "@/components/setting/projectManage";
import CheckSetting from "@/components/setting/checkSetting";
export default {
  components: {
    Personal,
    UserManage,
    DepartManage,
    PostManage,
    HotelManage,
    WeddingManage,
    ProjectManage,
    CheckSetting
  },
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
  margin: 0 3%;
}

/*设置页面弹窗居中*/
.setting-content .el-dialog__wrapper {
  position: absolute !important;
  // display: flex;
  // align-items: center;
}
</style>