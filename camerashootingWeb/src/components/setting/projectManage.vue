<template>
  <div class="project-main commonScrollStyle">
    <div class="project-item project-add" @click="addPostDig">
      <i class="el-icon-plus icon-add"></i>
    </div>
    <div v-for="(project,index) in projectList" :key="index" class="project-item">
      <span class="project-name">{{project.ProjectName}}</span>
      <span class="project-price">¥ {{project.ProjectAmount}}</span>
      <div class="project-icon">
        <span @click="deletePostDig(project)">
          <i class="el-icon-delete icon-style"></i>
        </span>
        <span @click="editPostDig(project)">
          <i class="el-icon-edit icon-style"></i>
        </span>
      </div>
    </div>

    <!--删除弹窗-->
    <el-dialog
      title="删除提示"
      :modal="false"
      :visible.sync="showDeletwDig"
      width="500px"
      top="0"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="true"
      custom-class="delete-dialog"
    >
      <div class="delete-main">
        <div class="delete-tip">
          <span class="delete-tip1">是否确定删除该项目？</span>
          <span class="delete-tip2">•"{{curProject.ProjectName}}"项目删除后如遇到问题，请及时联系管理员</span>
        </div>
        <div class="delete-bottom">
          <el-button type="text" class="btn-cancel" @click="showDeletwDig=false">取消</el-button>
          <el-button class="btn-save" @click="addUpdateDeleteCameraProjectInfo(true)">确认删除</el-button>
        </div>
      </div>
    </el-dialog>

    <!--编辑弹窗-->
    <el-dialog
      :title="digTitle"
      :modal="false"
      top="0"
      :visible.sync="showEditlDig"
      width="500px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="true"
      custom-class="edit-dialog"
    >
      <div class="edit-main">
        <div class="edit-item">
          <span class="span-title">项目：</span>
          <el-input size="small" v-model="curProject.ProjectName" class="span-value"></el-input>
        </div>
        <div class="edit-item">
          <span class="span-title">价格：</span>
          <el-input size="small" v-model="curProject.ProjectAmount" class="span-value"></el-input>
        </div>
        <div class="edit-item">
          <span class="span-title edit-area">说明：</span>
          <el-input type="textarea" v-model="curProject.Remark" class="edit-value"></el-input>
        </div>
        <div class="edit-button">
          <el-button type="text" class="btn-cancel" @click="showEditlDig=false">取消</el-button>
          <el-button @click="addUpdateDeleteCameraProjectInfo(false)">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectList: [],
      showDeletwDig: false,
      showEditlDig: false,
      digTitle: "新增项目",
      curProject: {}
    };
  },
  mounted() {
    this.getOrderProjectInfo();
  },
  methods: {
    /**
     * 关闭弹窗
     */
    handleClose(done) {
      done();
    },
    /**
     * 显示删除提示弹窗
     */
    deletePostDig(projectInfo) {
      this.curProject = clone(projectInfo);
      this.showDeletwDig = true;
    },
    /**
     * 显示新增弹窗
     */
    addPostDig() {
      this.digTitle = "新增项目";
      this.curProject = {};
      this.showEditlDig = true;
    },
    /**
     * 显示编辑弹窗
     */
    editPostDig(projectInfo) {
      this.digTitle = "编辑项目";
      this.curProject = clone(projectInfo);
      this.showEditlDig = true;
    },
    /**
     * 获取项目列表
     */
    getOrderProjectInfo() {
      let that = this;
      this.$Axios({
        method: "POST",
        url: `${
          getkevalue().apiurl
        }/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderProjectInfo`,
        data: {},
        success(res) {
          if (res.data.status) {
            that.projectList = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        },
        error(err) {
          this.$message.error(err);
        }
      });
    },
    /**
     * 新增、编辑、删除项目
     */
    addUpdateDeleteCameraProjectInfo(isDelete) {
      let that = this;
      let type = "add";
      if (isDelete) {
        type = "delete";
      } else if (that.curProject.ProjectId && that.curProject.ProjectId != "") {
        type = "update";
      }
      if (!isDelete) {
        if (!that.curProject.ProjectName || that.curProject.ProjectName == "") {
          that.$message({
            message: "项目名称不能为空",
            type: "warning"
          });
          return;
        }
        if (
          !that.curProject.ProjectAmount ||
          that.curProject.ProjectAmount == ""
        ) {
          that.$message({
            message: "项目金额不能为空",
            type: "warning"
          });
          return;
        }
        if (
          !/^[0-9]+\.?[0-9]+?$/.test(that.curProject.ProjectAmount) &&
          !/^[0-9]+$/.test(that.curProject.ProjectAmount)
        ) {
          that.$message({
            message: "金额只能为数字",
            type: "warning"
          });
          return;
        }
      }
      this.$Axios({
        method: "POST",
        url: `${
          getkevalue().apiurl
        }/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddUpdateDeleteCameraProjectInfo`,
        data: {
          ProjectName: that.curProject.ProjectName,
          ProjectAmount: that.curProject.ProjectAmount,
          Remark: that.curProject.Remark,
          Type: type,
          ProjectId: that.curProject.ProjectId
        },
        success(res) {
          if (res.data.status) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            that.showDeletwDig = false;
            that.showEditlDig = false;
            that.getOrderProjectInfo();
          } else {
            this.$message.error(res.data.msg);
          }
        },
        error(err) {
          this.$message.error(err);
        }
      });
    }
  }
};
</script>

<style scoped>
.project-main {  
  margin-top: 6.6%;
  margin-left: 48px;
  width: 87.5%;
  max-height: 88.6%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: left;
}
.project-item {
  width: 133px;
  height: 133px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(205, 224, 255, 1);
  border-radius: 5px;
  margin-left: 44px;
  background: #fff;  
  margin-bottom: 110px;
  cursor: pointer;
  color: #5996f8;
}
.project-item:hover {
  background: #77abff;
  color: #fff;
}
.project-add {
  background: #fff !important;
}
.project-item:hover .project-icon {
  display: flex;
}

.project-name {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  line-height: 35px;
}

.project-price {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  line-height: 30px;
}
.project-icon {
  width: 96px;
  height: 50px;
  display: none;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
}

.icon-style {
  width: 35px;
  height: 35px;
  color: #fff;
  line-height: 35px;
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.icon-add {
  color: #cde0ff;
  font-size: 70px;
}

/*删除弹窗*/
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
.btn-cancel {
  background: transparent;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999;
}
.delete-tip {
  margin-left: 88px;
  margin-top: 35px;
}

.delete-tip1 {
  width: 100%;
  display: inline-block;
  font-size: 22px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(76, 76, 76, 1);
}
.delete-tip2 {
  width: 100%;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  margin-top: 28px;
}

.delete-bottom {
  margin-top: 49px;
  margin-right: 62px;
  float: right;
}

/*编辑弹窗*/
.edit-main {
  width: 350px;
  height: 345px;
  padding-top: 20px;
  margin: auto;
}
.edit-item {
  text-align: left;
}

.span-title {
  width: 60px;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #b2b2b2;
  line-height: 47px;
}

.span-value {
  width: 180px;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #4c4c4c;
  line-height: 47px;
}

.edit-area {
  line-height: 30px;
  height: 100px;
}
.edit-value {
  width: 285px;
  height: 102px;
  margin-top: 8px;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #4c4c4c;
}
.edit-button {
  margin-top: 35px;
  float: right;
}
</style>

<!--无scoped 覆盖框架默认样式-->
<style>
/*删除提示弹窗*/
.delete-dialog {
  width: 500px;
  height: 299px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

.edit-dialog .el-dialog__header,
.delete-dialog .el-dialog__header {
  padding-top: 35px;
}

.edit-dialog .el-dialog__title,
.delete-dialog .el-dialog__title {
  width: 101px;
  height: 18px;
  font-size: 17px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(157, 179, 215, 1);
  line-height: 26px;
}
.edit-dialog .el-dialog__body,
.delete-dialog .el-dialog__body {
  padding: 0px !important;
}

.edit-dialog .el-dialog__headerbtn,
.delete-dialog .el-dialog__headerbtn {
  top: 29px;
  font-size: 25px;
}

/*编辑弹窗*/
.edit-dialog {
  width: 500px;
  height: 409px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}
.edit-value .el-textarea__inner {
  height: 100px;
}

/*设置页面弹窗居中*/
.project-main > .el-dialog__wrapper {
  position: absolute !important;
  display: flex;
  align-items: center;
}
</style>





