<template>
  <div class="user-content">
    <el-tree :data="data" node-key="id" default-expand-all>
      <div slot-scope="{ node,data }">
        <div v-if="data.isStaff" class="user-children">
          <div class="user-info">
            <img src="static\img\setting\user.png">
            <span>{{node.label}}</span>
          </div>
          <div class="user-info" v-for="staff in data.otherStaff">
            <img :src="staff.icon">
            <div>
              <span class="staff-post">{{staff.post}}</span>
              <span v-show="staff.post&&staff.post!=''">.</span>
              <span>{{staff.name}}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <span class="department-name">{{ node.label }}({{data.children.length}})</span>
        </div>
      </div>
    </el-tree>
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
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 5,
                      name: "周杰伦",
                      post: "",
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 6,
                      name: "何泓姗",
                      post: "",
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
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 9,
                      name: "胡歌",
                      post: "",
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 10,
                      name: "张碧晨",
                      post: "",
                      icon: "static\\img\\setting\\user.png"
                    },
                    {
                      id: 11,
                      name: "易烊千玺",
                      post: "",
                      icon: "static\\img\\setting\\user.png"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
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
      console.log("node", node);
      console.log("data", data);
      children.splice(index, 1);
    }
  }
};
</script>

<style scoped lang="scss">
.department-name {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: rgba(76, 76, 76, 1);
  line-height: 26px;
}

.user-children {
  display: flex;
  margin-left: 20px;
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
</style>

<!--无scoped 覆盖框架默认样式-->
<style lang="scss">
.user-content .el-tree-node__content {
  height: auto !important;
  padding: 13px 20px 13px 45px;
}
</style>

