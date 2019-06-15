<template>
  <div class="device-main">
    <div class="device-search">
      <div class="search-input">
        <el-input placeholder="输入设备查询" size="small" v-model="searchText" class="input-with-select">
          <div class="search-div" slot="append" @click="getAllTypeList">
            <img src="/static/img/common/search.png">
          </div>
        </el-input>
      </div>
      <div class="search-class commonScrollStyle">
        <el-collapse @change="collapseChange">
          <el-collapse-item v-for="(devType,index) in devPTypeList" :key="index" :name="devType.id">
            <template slot="title">
              <i v-if="isOpen(devType)" class="el-icon-arrow-up collapse-icon"></i>
              <i v-else class="el-icon-arrow-down collapse-icon"></i>
              {{devType.name}}
            </template>
            <div
              class="device-item"
              v-for="device in devType.deviceItemList"
              @click="selectDevType(device)"
            >
              <i class="el-icon-edit icon-style" @click="showEditDevType(device)"></i>
              <span
                :class="device.id==curDevType.id?'device-active':''"
              >{{device.name}}({{device.count}})</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-button class="add-btn" @click="showAddDevType">新增设备类型</el-button>
    </div>
    <div class="device-list">
      <div class="list-title">
        <span class="devType-name">{{curDevType.name}}({{curDevType.count}})</span>
        <el-button class="add-device" @click="showAddDeviceDig">添加</el-button>
      </div>
      <div class="device-table">
        <el-table
          :data="deviceData"
          stripe
          border
          style="width: 100%"
          :max-height="530"
          :header-row-class-name="headerClassName"
          :row-class-name="rowClassName"
        >
          <el-table-column prop="code" label="编号" width="200"></el-table-column>
          <el-table-column prop="name" label="名称" width="350"></el-table-column>
          <el-table-column prop="state" label="当前状态" width="220">
            <template slot-scope="scope">
              <span :style="scope.row.state=='不可用'?'color:red':''">{{scope.row.state}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="305">
            <template slot-scope="scope">
              <span class="table-span span-report">报损</span>
              <span class="table-span span-look" @click="showLookDeviceDig(scope.row)">查看</span>
              <span class="table-span span-use">查看使用情况</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--删除提示弹窗-->
    <deleleDig
      :showDeleteDig="showDeleteDig"
      :dataClass="deleteTypeName"
      :dataName="deleteName"
      :tipText="tipText"
      @closeDeleteDig="closeDeleteDig"
      @confirmDelete="confirmDelete"
    ></deleleDig>

    <!--添加编辑设备类型弹窗-->
    <addDevTypeDig
      :showAddDig="showAddDig"
      :curDevType="curDevType"
      :isEdit="isEdit"
      @closeAddDevTypeDig="showAddDig=false"
      @saveDevType="saveDevType"
      @deleteDevType="showDeteleDevType"
    ></addDevTypeDig>

    <!--添加编辑设备弹窗-->
    <addDeviceDig
      :showAddDig="showAddDevDig"
      :curDevice="curDevice"
      :isEdit="isEdit"
      :devTypeList="devTypeList"
      @closeAddDeviceDig="cancelEditDevice"
      @saveDevice="saveDevice"
      @deleteDevice="showDeteleDevice"
    ></addDeviceDig>

    <!--查看设备弹窗-->
    <lookDeviceDig
      :showLookDevDig="showLookDevDig"
      :curDevice="lookDevice"
      :devTypeList="devTypeList"
      @closeLookDeviceDig="showLookDevDig=false"
      @showDeviceDig="showEditDeviceDig(curDevice)"
    ></lookDeviceDig>
  </div>
</template>

<script>
import deleleDig from "../components/deleteTipDig"; //删除提示弹框
import addDevTypeDig from "../components/addDevTypeDig"; //添加、编辑设备类型弹框
import addDeviceDig from "../components/addDeviceDig"; //添加、编辑设备弹框
import lookDeviceDig from "../components/lookDeviceDig"; //查看设备弹框
export default {
  components: {
    deleleDig,
    addDevTypeDig,
    addDeviceDig,
    lookDeviceDig
  },
  data() {
    return {
      searchText: "",
      devPTypeList: [], //设备基类列表
      devTypeList: [], //设备类型列表
      openDevType: [], //打开的设备基类型
      deviceData: [], //设备列表
      showDeleteDig: false,
      showAddDig: false,
      showAddDevDig: false, //是否显示新增、编辑设备弹窗
      showLookDevDig: false, //是否显示查看设备弹窗
      curDevType: {
        pid: "",
        name: "",
        remark: ""
      },
      curDevice: {},
      lookDevice: {},
      isEdit: false,
      deleteType: "devType", //devType(设备类型) device(设备) 删除的对象类型
      deleteTypeName: "设备类型",
      deleteName: "",
      tipText: "里的所有设备"
    };
  },
  mounted() {
    this.getAllTypeList();
  },
  methods: {
    /**
     * 展开的设备类型
     */
    collapseChange(openArray) {
      this.openDevType = openArray;
    },
    /**
     * 列表是否展开
     */
    isOpen(type) {
      let devType = this.openDevType.find(dev => dev == type.id);
      if (devType) {
        return true;
      }
      return false;
    },
    /**
     * 表格自定义样式
     */
    headerClassName({ row, rowIndex }) {
      return "hotel-header";
    },
    rowClassName({ row, rowIndex }) {
      if (rowIndex % 2 != 0) {
        return "hotel-row hotel-row2";
      } else {
        return "hotel-row hotel-row1";
      }
    },
    /**
     * 确认保存设备类型
     */
    saveDevType() {
      if (this.isEdit) {
        this.equiTypeUpdate();
      } else {
        this.insertEquiType();
      }
    },
    /**
     * 确认保存设备
     */
    saveDevice() {
      if (this.isEdit) {
        this.updateEquiInfo();
      } else {
        this.insEquiInfo();
      }
    },
    /**
     * 取消编辑设备
     */
    cancelEditDevice() {
      this.showAddDevDig = false;
      if (this.isEdit) {
        this.showLookDevDig = true;
      }
    },
    /**
     * 确认删除操作
     */
    confirmDelete() {
      if (this.deleteType == "device") {
        //删除设备操作
        this.delEquiInfo();
      } else if (this.deleteType == "devType") {
        //删除设备类型操作
        this.deleteEquiType();
      }
    },
    /**
     * 取消删除操作
     */
    closeDeleteDig() {
      this.showDeleteDig = false;
      if (this.deleteType == "device") {
        //取消删除设备操作
        this.showAddDevDig = true;
      } else if (this.deleteType == "devType") {
        //删除设备类型操作
        this.showAddDig = true;
      }
    },
    /**
     * 选择设备类型
     */
    selectDevType(devType) {
      this.curDevType = clone(devType);
      this.getEquiInfoList();
    },

    // ****************弹窗相关操作****************

    /**
     * 关闭弹窗(所有)
     */
    handleClose(done) {
      done();
    },
    /**
     * 打开新增设备类型弹窗
     */
    showAddDevType() {
      this.isEdit = false;
      this.curDevType = {};
      this.showAddDig = true;
    },
    /**
     * 打开编辑设备类型弹窗
     */
    showEditDevType(device) {
      this.isEdit = true;
      this.curDevType = clone(device);
      this.showAddDig = true;
    },
    /**
     * 打开删除设备类型提示弹窗
     *
     */
    showDeteleDevType() {
      this.deleteTypeName = "设备类型";
      this.deleteType = "devType";
      this.deleteName = `包含"${this.curDevType.name}"`;
      this.tipText = "里的所有设备";
      this.showAddDig = false;
      this.showDeleteDig = true;
    },
    /**
     * 打开新增设备弹窗
     */
    showAddDeviceDig() {
      this.isEdit = false;
      this.curDevice = {};
      if (this.curDevType.id && this.curDevType.id != "") {
        this.curDevice.equitype = this.curDevType.id;
      }
      this.showAddDevDig = true;
    },
    /**
     * 打开编辑设备弹窗
     */
    showEditDeviceDig(device) {
      this.isEdit = true;
      this.curDevice = clone(device);
      this.showLookDevDig = false;
      this.showAddDevDig = true;
    },
    /**
     * 打开删除设备提示弹窗
     *
     */
    showDeteleDevice() {
      this.deleteTypeName = "设备";
      this.deleteType = "device";
      this.deleteName = `"${this.curDevice.name}"`;
      this.tipText = "设备删除后如遇到问题，请及时联系管理员";
      this.showAddDevDig = false;
      this.showDeleteDig = true;
    },
    /**
     * 显示查看设备弹窗
     */
    showLookDeviceDig(device) {
      this.curDevice = clone(device);
      this.lookDevice = clone(device);
      this.showLookDevDig = true;
    },

    // ****************API相关操作****************

    /**
     * 获取所有基类下的设备类型
     */
    getAllTypeList() {
      this.getEquiBaseList().then(res => {
        this.devTypeList = [];
        this.devPTypeList.forEach(pType => {
          this.equiTypeList(pType);
        });
      });
    },
    /**
     * 获取设备基类列表
     */
    getEquiBaseList() {
      let that = this;
      return new Promise((resolve, reject) => {
        let url =
          getkevalue().apiurl +
          "/xlapi/CameraManage/EquiManage/EquiBase/GetEquiBaseList";
        this.$Axios({
          method: "GET",
          url: url,
          success(res) {
            if (res.status == 200) {
              that.devPTypeList = res.data;
              resolve(res);
            } else {
              reject(res);
              that.$message.error("查询设备基类列表失败");
            }
          },
          error(err) {
            reject(res);
          }
        });
      });
    },
    /**
     * 根据基类id获取设备类型列表(不单独调用 仅仅在获取全部时调用)
     */
    equiTypeList(pType) {
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/EquiTypeList";
      this.$Axios({
        method: "POST",
        data: {
          baseid: pType.id,
          like: this.searchText
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            pType.deviceItemList = res.data;
            res.data.forEach(device => {
              this.devTypeList.push(device);
            });
            //重新查询列表设备列表
          } else {
            that.$message.error("查询设备类型列表失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    },
    /**
     * 添加设备类型
     */
    insertEquiType() {
      if (!this.curDevType.pid || this.curDevType.pid == "") {
        that.$message({
          message: "设备分类不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.curDevType.name || this.curDevType.name == "") {
        that.$message({
          message: "类型名称不能为空",
          type: "warning"
        });
        return;
      }
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/InsertEquiType";
      this.$Axios({
        method: "POST",
        data: {
          name: this.curDevType.name,
          remark: this.curDevType.remark,
          pid: this.curDevType.pid
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            //重新查询列表设备列表
            that.getAllTypeList();
            this.showAddDig = false;
          } else {
            that.$message.error("操作失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    },
    /**
     * 修改设备类型
     */
    equiTypeUpdate() {
      if (!this.curDevType.pid || this.curDevType.pid == "") {
        that.$message({
          message: "设备分类不能为空",
          type: "warning"
        });
        return;
      }
      if (!this.curDevType.name || this.curDevType.name == "") {
        that.$message({
          message: "类型名称不能为空",
          type: "warning"
        });
        return;
      }
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/EquiTypeUpdate";
      this.$Axios({
        method: "POST",
        data: {
          id: this.curDevType.id,
          name: this.curDevType.name,
          remark: this.curDevType.remark,
          pid: this.curDevType.pid
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            //重新查询列表设备列表
            that.getAllTypeList();
            this.showAddDig = false;
          } else {
            that.$message.error("操作失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    },
    /**
     * 删除设备类型
     */
    deleteEquiType() {
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/DeleteEquiType";
      this.$Axios({
        method: "POST",
        data: {
          id: this.curDevType.id
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            //重新查询设备类型列表
            that.getAllTypeList();
            that.showAddDig = false;
            that.showDeleteDig = false;
          } else {
            that.$message.error("操作失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    },
    /**
     * 获取设备列表
     */
    getEquiInfoList() {
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/GetEquiInfoList";
      this.$Axios({
        method: "POST",
        data: {
          page: 1,
          size: 10,
          typeid: this.curDevType.id,
          like: ""
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            that.deviceData = res.data;
          } else {
            that.$message.error("查询失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    },
    /**
     * 添加设备
     */
    insEquiInfo() {
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/InsEquiInfo";
      this.$Axios({
        method: "POST",
        data: {
          typeid: this.curDevice.equitype,
          code: this.curDevice.code,
          name: this.curDevice.name,
          buytime: this.curDevice.buytime,
          useprice: this.curDevice.useprice,
          remark: this.curDevice.remark
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            that.showAddDevDig = false;
            if (that.curDevice.equitype == that.curDevType.id) {
              that.getEquiInfoList();
            }
          } else {
            that.$message.error("操作失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    },
    /**
     * 修改设备
     */
    updateEquiInfo() {
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/UpdateEquiInfo";
      this.$Axios({
        method: "POST",
        data: {
          id: this.curDevice.id,
          typeid: this.curDevice.equitype,
          code: this.curDevice.code,
          name: this.curDevice.name,
          buytime: this.curDevice.buytime,
          useprice: this.curDevice.useprice,
          remark: this.curDevice.remark
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            that.showAddDevDig = false;
            that.lookDevice = clone(this.curDevice);
            that.showLookDevDig = true;
            that.getEquiInfoList();
          } else {
            that.$message.error("操作失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    },
    /**
     * 删除设备
     */
    delEquiInfo() {
      let that = this;
      let url =
        getkevalue().apiurl +
        "/xlapi/CameraManage/EquiManage/EquiBase/DelEquiInfo";
      this.$Axios({
        method: "POST",
        data: {
          id: this.curDevice.id
        },
        url: url,
        success(res) {
          if (res.status == 200) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            //重新查询设备类型列表
            that.getAllTypeList();
            that.showAddDevDig = false;
            that.showDeleteDig = false;
          } else {
            that.$message.error("操作失败");
          }
        },
        error(err) {
          that.$message.error(err);
        }
      });
    }
  }
};
</script>

<style scoped>
.device-main {
  width: 1525px;
  height: 680px;
  margin: 42px 0 0 48px;
  display: flex;
  justify-content: space-between;
}

.device-search {
  width: 270px;
  height: 679px;
  background: #fff;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
}

.device-list {
  width: 1200px;
  height: 680px;
  background: #fff;
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.07);
  border-radius: 5px;
}

/*搜索框*/
.search-input {
  width: 230px;
  font-size: 14px;
  color: #4c4c4c;
  margin: 23px auto 0;
}

.search-div {
  width: 40px;
  height: 24px;
  cursor: pointer;
  border-left: 1px solid #ddd;
}

.search-div img {
  margin-top: 4px;
}

/*可收缩列表*/
.search-class {
  width: 247px;
  height: 452px;
  max-height: 452px;
  overflow-y: auto;
  margin: 44px auto 40px;
}

.device-item {
  width: 247px;
  height: 51px;
  line-height: 51px;
  cursor: pointer;
  color: #1d213e;
  font-size: 14px;
  font-weight: 400;
  background: transparent;
}

.device-item:hover {
  color: #5996f8;
  background: #f0f4f9;
}
.device-item:hover .icon-style {
  display: inline;
}

.device-active {
  color: #5996f8;
  text-decoration: underline;
}

.collapse-icon {
  margin-right: 12px;
}

/*修改图标样式*/
.icon-style {
  font-size: 16px;
  color: #5996f8;
  margin-right: 30px;
  display: none;
}

.add-btn {
  width: 170px;
  height: 50px;
  border: 1px solid rgba(89, 150, 248, 1);
  border-radius: 10px;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #5996f8;
}

/*右侧列表*/
.list-title {
  width: 1080px;
  height: 91px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
}

.devType-name {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: #4c4c4c;
  line-height: 26px;
}

.add-device {
  width: 84px;
  height: 34px;
  background: #5996f8;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  border-radius: 5px;
}
/*表格区*/
.device-table {
  width: 1080px;
  height: 530px;
  margin: auto;
}
.table-span {
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  cursor: pointer;
  text-decoration: underline;
}
.span-look {
  color: #ff6600;
  margin-right: 20px;
}
.span-report {
  color: #0acf00;
  margin-right: 20px;
}
.span-use {
  color: #5996f8;
}
</style>

<style>
/*设置页面弹窗居中*/
.device-main > .el-dialog__wrapper {
  position: absolute !important;
  display: flex;
  align-items: center;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
/*搜索框样式*/
.search-input .el-input-group--append .el-input__inner {
  border-right-color: transparent;
}
.search-input .el-input-group--append .el-input__inner:hover {
  border-right-color: #c0c4cc;
}
.search-input .el-input-group--append .el-input__inner:focus {
  border-right-color: #409eff;
}

.search-input .el-input-group__append {
  background: transparent;
  padding: 0;
}

/*可收缩面板*/
.search-class .el-collapse-item__content {
  padding-bottom: 0px;
}

.search-class .el-collapse-item__header {
  font-size: 15px;
  height: 65px;
  font-weight: 500;
  color: #808080;
  padding-left: 27px;
}
.search-class .el-collapse-item__arrow {
  display: none;
}
/*表格样式*/
.hotel-header {
  height: 46px !important;
  font-size: 14px !important;
  font-family: MicrosoftYaHei;
  font-weight: bold;
  color: #808080;
  text-align: center;
}
.hotel-header th {
  text-align: center;
  background: #e5e5e5;
  padding: 0px;
}

.hotel-row td {
  text-align: center;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #808080;
  border-right: 1px solid #ddd;
  padding: 0px;
}
.hotel-row .cell {
  line-height: 46px;
}
.hotel-row:hover > td {
  background: #f0f4fa !important;
  color: #5996f8 !important;
}
.hotel-row1 td {
  background: #ffffff;
}

.hotel-row2 td {
  background: #f0f0f0;
}
</style>
