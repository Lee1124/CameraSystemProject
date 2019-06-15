<template>
  <div class="post-content">
    <div class="depart-item" v-for="group in postList">
      <div class="item-top">
        <span>{{group.groupName}}</span>
        <img src="/static/img/setting/add.png" @click="addPostDig(group.groupName)">
      </div>
      <div class="table-div">
        <el-table
          :data="group.postInfo"
          stripe
          border
          max-height="245"
          style="width: 606px"
          header-row-class-name="depart-header"
          row-class-name="depart-row"
          highlight-current-row
          class="commonScrollStyle"
        >
          <el-table-column type="index" label="序号" width="100"></el-table-column>
          <el-table-column prop="PostName" label="岗位" width="130"></el-table-column>
          <el-table-column prop="LeaderUserName" label="负责人" width="200"></el-table-column>
          <el-table-column label="操作" width="175">
            <template slot-scope="scope">
              <span class="table-delete noSelect" @click="deletePostDig(scope.row)">删除</span>
              <span class="table-edit noSelect" @click="editPostDig(scope.row)">编辑</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--编辑新增弹窗-->
    <el-dialog
      :title="digTitle"
      :modal="false"
      :visible.sync="showPostDig"
      width="520px"
      top="0"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="true"
      custom-class="change-dialog"
    >
      <div class="changePsw-main">
        <div>
          <span class="from-title">类&nbsp;&nbsp;&nbsp;型：</span>
          <el-select v-model="curPost.GroupName" placeholder="请选择">
            <el-option v-for="group in groupList" :key="group" :label="group" :value="group"></el-option>
          </el-select>
        </div>
        <div>
          <span class="from-title">岗&nbsp;&nbsp;&nbsp;位：</span>
          <el-input class="new-phone" v-model="curPost.PostName" placeholder="输入岗位名称"></el-input>
        </div>
        <div>
          <span class="from-title">负责人：</span>
          <div style="display: inline-block;">
            <div class="leader-div" v-for="leader in leaderList">
              <span class="leader-span">{{leader.leaderName}}</span>
              <img
                class="leader-delete"
                @click="removelLeader(leader)"
                src="/static/img/order/smallClose.png"
              >
            </div>
            <img
              class="add-img"
              src="/static/img/order/add0.png"
              @click="showPersonSelectDiaLog=true"
            >
          </div>
        </div>
        <div class="changePsw-bottom">
          <el-button type="text" class="btn-cancel" @click="showPostDig=false">取消</el-button>
          <el-button class="btn-save" @click="editOrAddPost">保存</el-button>
        </div>
      </div>
    </el-dialog>
    <personSelectDiaLog :showPersonSelectDiaLog="showPersonSelectDiaLog"></personSelectDiaLog>
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
          <span class="delete-tip1">是否确定删除该岗位？</span>
          <span class="delete-tip2">•"{{curPost.PostName}}"岗位删除后如遇到问题，请及时联系管理员</span>
        </div>
        <div class="delete-bottom">
          <el-button type="text" class="btn-cancel" @click="showDeletwDig=false">取消</el-button>
          <el-button class="btn-save" @click="deletePost">确认删除</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import personSelectDiaLog from "../orderManage/diaLog/personSelectDiaLog"; //人员选择

let id = "root"; //默认根节点id
export default {
  data() {
    return {
      searchStr: "",
      postList: [],
      groupList: ["销售", "拍摄", "后期", "客服"],
      curPost: {
        PostId: "",
        PostName: "",
        LeaderId: 1,
        LeaderName: "巫鉴达",
        GroupName: ""
      },
      digTitle: "",
      showPostDig: false,
      showDeletwDig: false,
      showPersonSelectDiaLog: false,
      leaderList: []
    };
  },
  mounted() {
    this.getMyBranchPostList();
  },
  components: {
    personSelectDiaLog: personSelectDiaLog
  },
  methods: {
    /**
     * 关闭弹窗
     */
    handleClose(done) {
      done();
    },
    //关闭弹框
    closeDialog() {
      this.showPersonSelectDiaLog = false;
      this.showPostDig = true;
    },
    //人员选择回传的信息
    getSelectedNews(itemObj) {
      let leader = {
        leaderName: itemObj.UserName,
        leaderId: itemObj.UserId
      };

      if (!this.leaderList.find(l => l.leaderId == leader.LeaderId)) {
        this.leaderList.push(leader);
      } else {
        that.$message({
          message: "当前人员已存在",
          type: "warning"
        });
      }
    },
    //关闭选择弹窗
    closeDialog() {
      this.showPersonSelectDiaLog = false;
    },
    /**
     * 移除负责人
     */
    removelLeader(leader) {
      let index = this.leaderList.findIndex(l => l.leaderId == leader.leaderId);
      if (index > -1) {
        this.leaderList.splice(index, 1);
      } else {
        this.$message({
          message: "当前人员不存在",
          type: "warning"
        });
      }
    },
    /**
     * 选择(编辑)岗位
     */
    // selectPost(currentRow, oldCurrentRow) {
    //   let group = this.postList.find(p => p.groupName == currentRow.GroupName);
    //   this.curPost = group.postInfo.find(p => p.PostId == currentRow.PostId);
    //   console.log(this.curPost);
    // },

    /**
     * 显示编辑弹窗
     */
    editPostDig(row) {
      this.leaderList = [];
      this.curPost = clone(row);
      // console.log("人员",row);
      if (this.curPost.LeaderUserName && this.curPost.LeaderId) {
        let leaderNameList = this.curPost.LeaderUserName.split(",");
        let leaderIdList = this.curPost.LeaderId.split(",");
        // console.log("人员name",leaderNameList);
        // console.log("人员id",leaderIdList);
        if (leaderNameList.length == leaderIdList.length) {
          for (let i = 0; i < leaderNameList.length; i++) {
            let leader = {
              leaderName: leaderNameList[i],
              leaderId: leaderIdList[i]
            };
            this.leaderList.push(leader);
          }
        }
      }
      this.digTitle = "编辑";
      this.showPostDig = true;
    },
    /**
     * 显示新增弹窗
     */
    addPostDig(groupName) {
      this.leaderList = [];
      this.curPost = {
        PostId: "",
        PostName: "",
        LeaderId: "",
        LeaderName: "",
        GroupName: groupName
      };
      this.digTitle = "新增";
      this.showPostDig = true;
    },
    /**
     * 确认新增、编辑岗位
     */
    editOrAddPost() {
      this.operatePost(false);
    },
    /**
     * 显示删除提示弹窗
     */
    deletePostDig(row) {
      this.curPost = clone(row);
      this.showDeletwDig = true;
    },
    /**
     * 确认删除岗位
     */
    deletePost() {
      this.operatePost(true);
    },
    /**
     * 获取岗位列表
     */
    getMyBranchPostList() {
      let that = this;
      this.$Axios({
        method: "POST",
        url: `${
          getkevalue().apiurl
        }/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/GetMyBranchPostList`,
        data: { BranchId: getkevalue().branchid },
        success(res) {
          if (res.data.status) {
            that.postList = [];
            that.groupList.forEach(group => {
              let info = {
                groupName: group,
                postInfo: res.data.data.filter(p => p.GroupName == group)
              };
              that.postList.push(info);
            });
          }
        },
        error(err) {
          console.log(err);
        }
      });
    },

    /**
     * 新增、修改、删除岗位  (是否为删除)
     */
    operatePost(isDelete) {
      let that = this;
      let type = "";
      let leaderListStr = "";
      if (isDelete) {
        type = "Delete";
      } else if (this.curPost.PostId && this.curPost.PostId != "") {
        type = "Update";
      } else {
        type = "Add";
      }
      if (type == "Add" || type == "Update") {
        if (!that.curPost.PostName || that.curPost.PostName == "") {
          that.$message({
            message: "岗位名称不能为空",
            type: "warning"
          });
          return;
        }
        if (that.leaderList.length <= 0) {
          that.$message({
            message: "负责人不能为空",
            type: "warning"
          });
          return;
        }
      }
      this.leaderList.forEach(leader => {
        leaderListStr += leader.leaderId + ",";
      });
      leaderListStr = leaderListStr.substring(0, leaderListStr.length - 1);
      this.$Axios({
        method: "POST",
        url: `${
          getkevalue().apiurl
        }/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/AddOrUpdateOrDeleteMyBranchPost`,
        data: {
          BranchId: getkevalue().branchid,
          PostId: that.curPost.PostId,
          PostName: that.curPost.PostName,
          LeaderId: leaderListStr,
          Type: type,
          GroupName: that.curPost.GroupName
        },
        success(res) {
          if (res.data.status) {
            if (type == "Delete") {
              that.showDeletwDig = false;
            } else {
              that.showPostDig = false;
            }
            that.$message({
              message: "操作成功",
              type: "success"
            });
            that.getMyBranchPostList();
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
@import "../../../static/css/orderTableStyle.css";
.post-content {
  margin: 0px 48px 20px 48px;
  display: flex;
  flex-wrap: wrap;
}

.table-edit {
  cursor: pointer;
  color: #5996f8;
}

.table-delete {
  cursor: pointer;
  color: #ff8a00;
  margin-right: 40px;
}

/*弹窗样式 (编辑信息)*/
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

.changePsw-main .changePsw-bottom .el-button {
  margin: 0 0 0 30px;
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

.new-phone {
  width: 184px;
  height: 32px;
  border-radius: 5px;
}
.add-img {
  max-width: 17px;
  max-height: 17px;
  cursor: pointer;
}

.leader-span {
  display: inline-block;
  padding: 0 5px;
  min-width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: #5996f8 1px solid;
  border-radius: 4px;
}
.btn-cancel {
  background: transparent;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999;
}

.depart-item {
  width: 610px;
  height: 340px;
  padding: 5px 40px;
  margin: 36px 36px 0px 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

.item-top {
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-top span {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: #4c4c4c;
}
.item-top img {
  max-width: 18px;
  max-height: 17px;
  cursor: pointer;
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
.leader-div {
  display: inline-block;
}
.leader-div:hover img {
  visibility: visible;
}
.leader-delete {
  position: relative;
  top: -13px;
  right: 13px;
  visibility: hidden;
}
</style>

<!--无scoped 覆盖框架默认样式-->
<style lang="scss">
.change-dialog .el-input__inner {
  width: 184px;
  height: 32px;
  padding-left: 12px;
}
.depart-header {
  height: 34px;
  background: #bbbbbb !important;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: #fff;
  text-align: center;
}

.depart-header {
  height: 34px;
}
.depart-header th {
  background: #bbbbbb !important;
  text-align: center;
  padding: 0px;
}

.depart-row td {
  text-align: center;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #4c4c4c;
  padding: 0px;
}
.depart-row .cell {
  line-height: 34px;
}

/*编辑信息弹窗*/
.change-dialog {
  width: 520px;
  height: 396px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

/*删除提示弹窗*/
.delete-dialog {
  width: 500px;
  height: 299px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

.change-dialog .el-dialog__header,
.delete-dialog .el-dialog__header {
  padding-top: 35px;
}
.change-dialog .el-dialog__title,
.delete-dialog .el-dialog__title {
  width: 101px;
  height: 18px;
  font-size: 17px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(157, 179, 215, 1);
  line-height: 26px;
}

.change-dialog .el-dialog__body,
.delete-dialog .el-dialog__body {
  padding: 0px !important;
}

.change-dialog .el-dialog__headerbtn,
.delete-dialog .el-dialog__headerbtn {
  top: 29px;
  font-size: 25px;
}

/*设置页面弹窗居中*/
.post-content > .el-dialog__wrapper {
  position: absolute !important;
  display: flex;
  align-items: center;
}
</style>

