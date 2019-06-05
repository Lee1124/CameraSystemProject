<template>
  <div class="post-content">
    <div class="depart-item" v-for="item in tableData">
      <div class="item-top">
        <span>销售</span>
        <img src="/static/img/setting/add.png">
      </div>
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 606px"
        header-row-class-name="depart-header"
        row-class-name="depart-row"
        highlight-current-row
      >
        <el-table-column prop="index" label="序号" width="155"></el-table-column>
        <el-table-column prop="depart" label="部门" width="250"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <span class="table-delete noSelect" @click="deleteDepartDig">删除</span>
            <span class="table-edit noSelect" @click="editDepartDig">编辑</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--编辑新增弹窗-->
    <el-dialog
      title="新增"
      :modal="false"
      :visible.sync="showDepartDig"
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
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span class="from-title">岗&nbsp;&nbsp;&nbsp;位：</span>
          <el-input class="new-phone" v-model="value" placeholder="输入岗位名称"></el-input>
        </div>
        <div>
          <span class="from-title">负责人：</span>
          <el-input class="new-phone" v-model="value" placeholder="输入负责人姓名"></el-input>
        </div>
        <div class="changePsw-bottom">
          <el-button type="text" class="btn-cancel" @click="showDepartDig=false">取消</el-button>
          <el-button class="btn-save">保存</el-button>
        </div>
      </div>
    </el-dialog>

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
          <span class="delete-tip2">•岗位删除后如遇到问题，请及时联系管理员</span>
        </div>
        <div class="delete-bottom">
          <el-button type="text" class="btn-cancel" @click="showDeletwDig=false">取消</el-button>
          <el-button class="btn-save">确认删除</el-button>
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
      tableData: [
        {
          index: "1",
          depart: "销售部",
          post: "销售员"
        },
        {
          index: "2",
          depart: "销售部",
          post: "销售员"
        },
        {
          index: "3",
          depart: "销售部",
          post: "销售员"
        },
        {
          index: "4",
          depart: "销售部",
          post: "销售员"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      showDepartDig: false,
      showDeletwDig: false
    };
  },
  computed: {},
  methods: {
    handleClose(done) {
      done();
    },
    editDepartDig() {
      this.showDepartDig = true;
    },
    deleteDepartDig() {
      this.showDeletwDig = true;
    }
  }
};
</script>

<style scoped>
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
</style>

<!--无scoped 覆盖框架默认样式-->
<style lang="scss">
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
</style>

