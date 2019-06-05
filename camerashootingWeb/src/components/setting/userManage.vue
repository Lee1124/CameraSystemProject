<template>
  <div class="user-content commonScrollStyle">
    <div class="div-search">
      <el-input placeholder="搜索人员" v-model="searchStr"></el-input>
      <div>
        <el-button>查询</el-button>
        <el-button class="button-add">新增</el-button>
      </div>
    </div>
    <el-tree
      :data="data"
      node-key="id"
      :expand-on-click-node="false"
      default-expand-all
      :indent="40"
      @node-collapse="iconStr='iconStr2'"
      @node-expand="iconStr='iconStr'"
      visible-arrow="false"
    >
      <div slot-scope="{ node,data }">
        <div v-if="data.isStaff" class="user-children">
          <div class="user-info">
            <img src="static\img\setting\user.png">
            <span>{{node.label}}</span>
          </div>
          <div class="user-info" v-for="staff in data.otherStaff">
            <el-popover
              placement="right-start"
              width="102"
              trigger="manual"
              popper-class="operate-popover"
              v-model="staff.showOperate"
            >
              <div class="popover-main noSelect">
                <span @click="editMoadl">编辑资料</span>
                <span @click="powerMoadl">权限设置</span>
                <span @click="deleteMoadl">删除人员</span>
              </div>
              <div slot="reference" @click="selectStaff(staff,data)">
                <img :src="staff.icon">
                <div>
                  <span class="staff-post">{{staff.post}}</span>
                  <span v-show="staff.post&&staff.post!=''">•</span>
                  <span>{{staff.name}}</span>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
        <div v-else>
          <span :class="data.isRoot?'rootNode':'department-name'">{{ node.label }}</span>
          <span
            :class="data.isRoot?'rootNode':'department-name'"
          >({{data.children[0].otherStaff?data.children[0].otherStaff.length:staffCount}})</span>
          <span class="staffName-list" v-for="name in data.children[0].otherStaff">{{ name.name}}</span>
        </div>
      </div>
    </el-tree>

    <!--新增人员弹窗-->
    <el-dialog
      title="新增员工"
      :modal="false"
      :top="0"
      :visible.sync="showAddDig"
      width="652px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="true"
      custom-class="add-dialog"
    >
      <div class="addDig-main">
        <div class="staff-img">
          <img src="/static/img/setting/user.png">
          <span class="img-tip">点击上传头像</span>
        </div>
        <div class="staff-form">
          <div class="form-item">
            <el-input v-model="formInline.user" placeholder="员工姓名"></el-input>
            <el-input v-model="formInline.user" placeholder="自动生成用户名"></el-input>
          </div>
          <div class="form-item">
            <el-input v-model="formInline.user" placeholder="手机号码"></el-input>
            <el-date-picker v-model="formInline.user" type="date" placeholder="选择入职日期"></el-date-picker>
          </div>
          <div class="form-item">
            <el-select v-model="formInline.user" placeholder="请选择部门">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="formInline.region" placeholder="请选择职务">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </div>
        </div>
        <div class="staff-button">
          <el-button type="text" class="btn-cancel" @click="showDepartDig=false">取消</el-button>
          <el-button class="btn-save">保存</el-button>
        </div>
      </div>
    </el-dialog>

    <!--删除弹窗-->
    <el-dialog
      title="删除提示"
      :modal="false"
      :top="0"
      :visible.sync="showDeletwDig"
      width="500px"
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

    <!--权限弹窗-->
    <el-dialog
      title="摄影部 易烊千玺 权限设置"
      :modal="false"
      :visible.sync="showAutDig"
      width="882px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="true"
      :top="0"
      custom-class="authority-dialog"
    >
      <div class="authority-main commonScrollStyle">
        <div class="authority-list" v-for="auth in authList">
          <span class="authority-title">订单</span>
          <el-checkbox-group v-model="checkList" class="authority-item">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="复选框 D"></el-checkbox>
            <el-checkbox label="复选框 E"></el-checkbox>
          </el-checkbox-group>
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
      data: [
        {
          id: 1,
          label: "全部人员",
          isRoot: true,
          children: [
            {
              id: 2,
              label: "销售部",
              isStaff: false,
              children: [
                {
                  id: 3,
                  label: "新员工",
                  isStaff: true,
                  otherStaff: [
                    {
                      id: 4,
                      name: "刘德华",
                      post: "总监",
                      showOperate: false,
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 5,
                      name: "周杰伦",
                      post: "",
                      showOperate: false,
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 6,
                      name: "何泓姗",
                      post: "",
                      showOperate: false,
                      icon: "static\\img\\setting\\user.png"
                    }
                  ]
                }
              ]
            },
            {
              id: 12,
              label: "行政部",
              isStaff: false,
              children: [
                {
                  id: 7,
                  label: "新员工",
                  isStaff: true,
                  otherStaff: [
                    {
                      id: 8,
                      name: "王谦",
                      post: "总监",
                      showOperate: false,
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 9,
                      name: "胡歌",
                      post: "",
                      showOperate: false,
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 10,
                      name: "张碧晨",
                      post: "",
                      showOperate: false,
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 11,
                      name: "易烊千玺",
                      post: "",
                      showOperate: false,
                      icon: "static\\img\\setting\\user.png"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      searchStr: "",
      curStaff: { id: 0 },
      showOperate: false,
      iconStr: "iconStr",
      showAddDig: false,
      showDeletwDig: false,
      showAutDig: true,
      formInline: {
        user: "",
        region: ""
      },
      checkList: ["复选框 B", "复选框 A"],
      authList: ["", "", "", "", "", ""]
    };
  },
  computed: {
    staffCount: function() {
      let count = 0;
      this.data[0].children.forEach(element => {
        if (element.children[0].otherStaff) {
          count += element.children[0].otherStaff.length;
        }
      });
      return count;
    }
  },
  methods: {
    //节点点击事件
    handleNodeClick(data) {
      console.log(data);
    },
    //添加节点
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    //移除节点
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    /**
     * 选择某个员工
     */
    selectStaff(staff, data) {
      let staffList = {};

      this.data[0].children.forEach(d => {
        if (d.children[0].id == data.id) {
          staffList = d.children[0];
        }
      });
      if (staffList) {
        let staffInfo = staffList.otherStaff.find(s => s.id == staff.id);
        if (staffInfo) {
          if (!staffInfo.showOperate) {
            this.hideAll();
            this.curStaff = staffInfo;
          }
          staffInfo.showOperate = !staffInfo.showOperate;
        }
      }
    },
    /**
     * 隐藏所有弹出框
     */
    hideAll() {
      let data = this.data[0];
      data.children.forEach(department => {
        department.children[0].otherStaff.forEach(staff => {
          staff.showOperate = false;
        });
      });
    },
    /**
     * 显示编辑资料弹窗
     */
    editMoadl() {
      this.hideAll();
      this.showAddDig = true;
    },
    /**
     * 显示权限弹窗
     */
    powerMoadl() {
      this.hideAll();
      this.showAutDig = true;
    },
    /**
     * 显示删除人员弹窗
     */
    deleteMoadl() {
      this.hideAll();
      this.showDeletwDig = true;
    },
    /**
     * 关闭弹窗
     */
    handleClose(done) {
      done();
    }
  }
};
</script>

<style scoped>
.user-content {
  margin: 5px 48px 20px 48px;
}
.div-search {
  width: 415px;
  height: 100px;
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
/*树形控件相关*/
.department-name {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(76, 76, 76, 1);
  line-height: 26px;
}

.staffName-list {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(76, 76, 76, 1);
  line-height: 26px;
  margin-left: 30px;
}

.rootNode {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(76, 76, 76, 1);
  line-height: 30px;
}
.user-children {
  display: flex;
}
.user-info {
  width: 70px;
  margin-right: 54px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.user-info span {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  line-height: 28px;
}

.staff-post {
  color: #ff0000 !important;
}

.user-info img {
  max-width: 70px;
  max-height: 70px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

/*弹出框样式*/
.popover-main {
  padding: 15px 0;
  border: 1px solid rgba(154, 182, 228, 1);
  border-radius: 5px;
}

.popover-main span {
  width: 96px;
  height: 38px;
  display: inline-block;
  background: transparent;
  color: #4c4c4c;
  margin-left: 2px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  line-height: 38px;
  text-align: center;
  cursor: pointer;
}

.popover-main span:hover {
  background: #ebf1fb;
  color: #5996f8;
}

/*弹出窗 新增用户*/
.addDig-main {
  width: 445px;
  margin: 50px auto 0;
}
.staff-img {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.staff-img img {
  max-width: 90px;
  max-height: 90px;
}

.img-tip {
  font-size: 14px;
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-top: 17px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #808080;
}

.staff-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  margin-top: 40px;
}

.form-item {
  display: flex;
  justify-content: space-between;
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
  margin: 0 auto;
}

.staff-button {
  height: 85px;
  display: flex;
  align-items: flex-end;
  float: right;
}

.btn-cancel {
  background: transparent;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999;
}

/*删除弹窗*/
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

/*权限弹窗*/
.authority-main {
  width: 740px;
  max-height: 525px;
  min-height: 200px;
  margin: 45px auto;
  overflow-y: auto;
}

.authority-title {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(76, 76, 76, 1);
}
.authority-list {
  margin-bottom: 59px;
}

.authority-main > div:last-child {
  margin-bottom: 0px;
}
</style>

<!--无scoped 覆盖框架默认样式-->
<style lang="scss">
.user-content .el-tree-node__content {
  height: auto !important;
  background: transparent !important;
  padding: 13px 20px 13px 45px;
}
.el-popover,
.el-popper {
  margin: 0 !important;
  padding: 0;
  min-width: 102px;
}
.el-popper .popper__arrow {
  border-right-color: rgba(154, 182, 228, 1) !important;
}
.iconStr {
  background-image: url("/static/img/setting/tree1.png");
}
.iconStr2 {
  background-image: url("/static/img/setting/tree2.png");
}

/*弹窗样式*/
.add-dialog {
  width: 652px;
  height: 565px;
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

/*权限弹窗*/
.authority-dialog {
  width: 882px;
  height: 695px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

/*弹窗公共样式*/
.add-dialog .el-dialog__header,
.delete-dialog .el-dialog__header,
.authority-dialog .el-dialog__header {
  padding-top: 35px;
}
.add-dialog .el-dialog__title,
.delete-dialog .el-dialog__title,
.authority-dialog .el-dialog__title {
  width: 101px;
  height: 18px;
  font-size: 17px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(157, 179, 215, 1);
  line-height: 26px;
}

.add-dialog .el-dialog__body {
  padding: 0px !important;
  height: 495px;
}
.delete-dialog .el-dialog__body,
.authority-dialog .el-dialog__body {
  padding: 0px !important;
}

.add-dialog .el-dialog__headerbtn,
.authority-dialog .el-dialog__headerbtn,
.delete-dialog .el-dialog__headerbtn {
  top: 29px;
  font-size: 25px;
}

/*新增用户 弹窗input*/
.form-item .el-input__inner,
.form-item .el-input {
  width: 200px;
  height: 36px;
  line-height: 36px;
}

/*权限弹窗 复选样式*/
.authority-item {
  margin-left: 30px;
}

.authority-item .el-checkbox {
  margin: 30px 0 0 30px;
  width: 145px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #4c4c4c;
}

.authority-item .el-checkbox__inner {
  width: 21px;
  height: 21px;
  border-radius: 50%;
}

.el-checkbox__inner::after {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  content: "";
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 11px;
  left: 5px;
  position: absolute;
  top: 1px;
  -webkit-transform: rotate(45deg) scaleY(0);
  transform: rotate(45deg) scaleY(0);
  width: 6px;
  transform-origin: center;
}
</style>

