<template>
  <div class="personal-content">
    <div class="personal-icon">
      <img src="static\img\setting\user.png">
      <el-button>更换头像</el-button>
      <el-button class="change-psd">修改密码</el-button>
    </div>
    <div class="personal-info">
      <span class="user-name">周杰伦</span>
      <span class="user-info">部门：销售部</span>
      <span class="user-info">职位：助理</span>
      <div class="info-phone">
        <span class="user-info phone-text">电话：13682459814</span>
        <span class="user-info phone-change">更换</span>
      </div>
      <span class="user-info">入职：2018.05.17</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.personal-content {
  width: 380px;
  margin: 6.8% 0 0 7.2%;
  display: flex;
  justify-content: space-between;
}
.personal-icon {
  width: 120px;
  height: 232px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.personal-icon img {
  width: 120px;
  height: 120px;
  max-width: 120px;
  max-height: 120px;
  border-radius: 50%;
}
.el-button {
  width: 96px;
  height: 34px;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  background: #5996f8;
  padding: 0;
  margin: auto;
}

.change-psd {
  background: transparent;
  color: #5996f8;
  border: 1px solid rgba(89, 150, 248, 1);
}
.personal-info {
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.user-name {
  width: 100%;
  display: inline-block;
  font-size: 34px;
  margin: 22px 0;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}
.user-info {
  width: 100%;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  text-align: left;
  color: rgba(51, 51, 51, 1);
}
.info-phone {
  width: 100%;
  display: flex;
  align-items: center;
}
.phone-change {
  width: 40px;
  color: #5996f8 !important;
  text-align: right;
  border-left: 1px solid #333333;
  cursor: pointer;
}
.phone-text {
  flex: 1;
}
</style>