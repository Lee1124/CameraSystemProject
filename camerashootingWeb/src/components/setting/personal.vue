<template>
  <div class="personal-content">
    <div class="personal-icon">
      <img src="static\img\setting\user.png">
      <el-button>更换头像</el-button>
      <el-button class="change-psd" @click="showPsdModal">修改密码</el-button>
    </div>
    <div class="personal-info">
      <span class="user-name">周杰伦</span>
      <span class="user-info">部门：销售部</span>
      <span class="user-info">职位：助理</span>
      <div class="info-phone">
        <span class="user-info phone-text">电话：13682459814</span>
        <span class="user-info phone-change" @click="changePhone">更换</span>
      </div>
      <span class="user-info">入职：2018.05.17</span>
    </div>

    <!--修改电话弹窗-->
    <el-dialog
      title="更换电话号码"
      :modal="false"
      :visible.sync="dialogVisible"
      width="520px"
      :top="0"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="dialogVisible"
      custom-class="change-dialog"
    >
      <div class="dialog-main">
        <div class="input-phone">
          <div>
            <span class="span-new">原号码：</span>
            <span class="old-phone">13682459814</span>
          </div>
          <div>
            <span class="span-new">新号码：</span>
            <el-input class="new-phone" v-model="input1" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="dialog-bottom">
          <el-button type="text" class="btn-cancel" @click="dialogVisible=false">取消</el-button>
          <el-button class="btn-save">保存</el-button>
        </div>
      </div>
    </el-dialog>

    <!--修改密码弹窗-->
    <el-dialog
      title="修改登录密码"
      :modal="false"
      :visible.sync="changePsw"
      width="520px"
      :top="0"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="changePsw"
      custom-class="change-dialog"
    >
      <div class="changePsw-main">
        <div>
          <span class="from-title">原密码：</span>
          <el-input class="new-phone" v-model="input1" placeholder="输入原密码" show-password></el-input>
        </div>
        <div>
          <span class="from-title">新密码：</span>
          <el-input class="new-phone" v-model="input2" placeholder="输入新密码" show-password></el-input>
        </div>
        <div>
          <span class="from-title">确认新密码：</span>
          <el-input class="new-phone" v-model="input3" placeholder="再次输入新密码" show-password></el-input>
        </div>
        <div class="changePsw-bottom">
          <el-button type="text" class="btn-cancel" @click="dialogVisible=false">取消</el-button>
          <el-button class="btn-save">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      changePsw: false,
      input1: "",
      input2: "",
      input3: ""
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    changePhone() {
      this.dialogVisible = true;
    },
    showPsdModal() {
      this.changePsw = true;
    }
  }
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
/*弹窗样式 (修改电话)*/
.change-dialog {
  width: 520px;
  height: 400px;
}

.new-phone {
  width: 184px;
  height: 32px;
  border-radius: 5px;
}

.old-phone {
  font-size: 14px;
  color: #4c4c4c;
  width: 184px;
  display: inline-block;
}

.span-new {
  width: auto;
  font-size: 14px;
  color: #808080;
}

.dialog-bottom {
  float: right;
}

.btn-cancel {
  background: transparent;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999;
}

.dialog-main {
  width: 315px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  height: 313px;
  margin: auto;
}

.input-phone {
  width: 100%;
  height: 90px;
  display: flex;
  margin-top: 25px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

/*弹窗样式 (修改密码)*/
.changePsw-main {
  width: 345px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin: 50px auto 0;
}

.changePsw-main .from-title {
  width: 90px;
  display: inline-block;
  text-align: right;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  line-height: 32px;
}

.changePsw-main .changePsw-bottom {
  width: 100%;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.changePsw-main .changePsw-bottom .el-button{
  margin:0 0 0 30px ;
}
</style>
<style lang="scss">
.change-dialog {
  width: 520px;
  height: 396px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

.change-dialog .el-dialog__header {
  padding-top: 35px;
}
.change-dialog .el-dialog__title {
  width: 101px;
  height: 18px;
  font-size: 17px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(157, 179, 215, 1);
  line-height: 26px;
}

.change-dialog .el-dialog__body {
  padding: 0px !important;
}

.change-dialog .el-dialog__headerbtn {
  top: 29px;
  font-size: 25px;
}

.change-dialog .el-input__inner {
  width: 184px;
  height: 32px;
  padding-left: 12px;
}
</style>

