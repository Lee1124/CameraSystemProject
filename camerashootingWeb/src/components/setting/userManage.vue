<template>
  <div class="user-content">
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
                  <span v-show="staff.post&&staff.post!=''">.</span>
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
      :visible.sync="showAddDig"
      width="652px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      :center="true"
      custom-class="add-dialog"
    >
      <div class="changePsw-main"></div>
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
      showAddDig: false
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
      console.log("编辑资料", this.curStaff.name);
      this.hideAll();
      this.showAddDig = true;
    },
    /**
     * 显示权限弹窗
     */
    powerMoadl() {
      console.log("权限", this.curStaff.name);
      this.hideAll();
    },
    /**
     * 显示删除人员弹窗
     */
    deleteMoadl() {
      console.log("删除人员", this.curStaff.name);
      this.hideAll();
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

/*弹窗样式*/
.add-dialog {
  width: 652px;
  height: 565px;
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
</style>

