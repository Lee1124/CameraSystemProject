<template>
  <div class="user-content">
    <div class="div-search">
      <el-input placeholder="搜索部门" v-model="searchStr"></el-input>
      <div>
        <el-button @click="getMyBranchDepartmentList">查询</el-button>
        <el-button class="button-add" @click="showAddDig">新增</el-button>
      </div>
    </div>
    <div ref="tableBox" class="div-table" style="height:79.5%">
      <el-table
        :data="departList"
        stripe
        border
        :max-height="tableHeight"
        style="width: 871px"
        header-row-class-name="depart-header"
        row-class-name="depart-row"
        highlight-current-row
      >
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column prop="DepartmentName" label="部门" width="255"></el-table-column>
        <el-table-column prop="DefaultPostName" label="默认岗位" width="265"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span class="table-edit" @click="editDepartDig(scope.row)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="digTitle"
      :modal="false"
      top="0"
      :visible.sync="showDepartDig"
      width="520px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="true"
      custom-class="change-dialog"
    >
      <div class="changePsw-main">
        <div>
          <span class="from-title">部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门：</span>
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-input class="new-phone" v-model="curDepart.DepartmentName" placeholder="部门名称"></el-input>
        </div>
        <div>
          <span class="from-title">默认岗位：</span>
          <el-select v-model="curDepart.DefaultPostId" placeholder="请选择">
            <el-option
              v-for="post in postList"
              :key="post.PostId"
              :label="post.PostName"
              :value="post.PostId"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span class="from-title">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序：</span>
          <el-input
            class="new-phone"
            v-model="curDepart.Sequence"
            placeholder="请输入序号"
            type="number"
          ></el-input>
        </div>
        <div class="changePsw-bottom">
          <el-button type="text" class="btn-cancel" @click="showDepartDig=false">取消</el-button>
          <el-button class="btn-save" @click="addOrUpdateMyBranchDepartment">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000;
export default {
  data() {
    return {
      searchStr: "",
      departList: [],
      postList: [],
      curDepart: {},
      tableHeight: "635",
      tableBoxHeight: "",
      showDepartDig: false,
      digTitle: ""
    };
  },
  props: {
    inputSearchPlaceholder: ""
  },
  computed: {},
  created() {
    this.loadResize();
    this.$nextTick(() => {
      setTimeout(() => {
        this.getDomHeight();
      }, 1);
    });
  },
  mounted() {
    this.getMyBranchDepartmentList();
  },
  methods: {
    handleClose(done) {
      done();
    },
    editDepartDig(rowData) {
      this.curDepart = clone(rowData);
      this.digTitle = "编辑";
      this.getMyBranchPostList();
      this.showDepartDig = true;
    },
    showAddDig() {
      this.digTitle = "新增";
      this.getMyBranchPostList();
      this.curDepart = {};
      this.showDepartDig = true;
    },
    loadResize() {
      let that = this;
      $(window).resize(() => {
        that.getDomHeight();
      });
    },
    //获取元素高度
    getDomHeight() {
      this.tableBoxHeight = $(this.$refs.tableBox).height();
      console.log("tableBoxHeight", this.tableBoxHeight);
      this.tableHeight = this.tableBoxHeight;
    },

    /**
     * 查询部门信息列表
     */
    getMyBranchDepartmentList() {
      let that = this;
      this.$Axios({
        method: "POST",
        url: `${
          getkevalue().apiurl
        }/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/GetMyBranchDepartmentList`,
        data: { BranchId: getkevalue().branchid, SearchName: this.searchStr },
        success(res) {
          if (res.data.status) {
            that.departList = res.data.data;
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
            that.postList = res.data.data;
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
     * 修改(新增)部门
     */
    addOrUpdateMyBranchDepartment() {
      let that = this;
      let type = "add";
      if (
        !this.curDepart.DepartmentName ||
        this.curDepart.DepartmentName == ""
      ) {
        that.$message({
          message: "部门名称不能为空",
          type: "warning"
        });
        return;
      }
      if (this.curDepart.DepartmentId && this.curDepart.DepartmentId != "") {
        type = "update";
      }
      this.$Axios({
        method: "POST",
        url: `${
          getkevalue().apiurl
        }/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/AddOrUpdateMyBranchDepartment`,
        data: {
          BranchId: getkevalue().branchid,
          DepartmentId: this.curDepart.DepartmentId,
          DepartmentName: this.curDepart.DepartmentName,
          Sequence: this.curDepart.Sequence,
          DefaultPostId: this.curDepart.DefaultPostId,
          Type: type
        },
        success(res) {
          if (res.data.status) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            this.showDepartDig = false;
            that.getMyBranchDepartmentList();
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
@import "../../../static/css/orderTableStyle.css";
.user-content {
  height: 93%;
  margin: 0px 48px 20px 48px;
}
.div-search {
  width: 415px;
  height: 12.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

>>> .div-search .el-input__inner {
  width: 200px;
  height: 32px;
  line-height: 32px;
  padding-left: 11px;
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 15px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  border-radius: 4px;
}

.div-search .el-input {
  width: 200px;
}

>>> .div-search .el-button {
  width: 64px;
  height: 32px;
  padding: 0;
  margin: auto;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(89, 150, 248, 1);
  border-radius: 5px;
}

.button-add {
  background: transparent !important;
  color: #5996f8 !important;
  margin-left: 66px !important;
  border: 1px solid rgba(89, 150, 248, 1);
}

.table-edit {
  cursor: pointer;
  color: #5996f8;
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

.change-psd {
  background: transparent;
  color: #5996f8;
  border: 1px solid rgba(89, 150, 248, 1);
}

.btn-cancel {
  background: transparent;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999;
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

.change-dialog {
  width: 520px;
  height: 396px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

/*编辑信息弹窗*/
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

/*设置页面弹窗居中*/
.user-content > .el-dialog__wrapper {
  position: absolute !important;
  display: flex;
  align-items: center;
}
</style>

