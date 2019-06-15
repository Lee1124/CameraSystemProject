<template>
  <el-dialog
    :title="isEdit?'编辑设备':'新增设备'"
    :modal="false"
    top="0"
    :visible.sync="showAddDig"
    width="712px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    :center="true"
    custom-class="addDevice-dialog"
  >
    <div class="edit-main">
      <div class="edit-item">
        <div>
          <span class="span-title">设备类型：</span>
          <el-select
            v-model="curDevice.equitype"
            size="small"
            class="span-value"
            placeholder="请选择设备类型"
          >
            <el-option
              v-for="devType in devTypeList"
              :key="devType.id"
              :label="devType.name"
              :value="devType.id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span class="span-title">设备编号：</span>
          <el-input size="small" v-model="curDevice.code" class="span-value" placeholder="输入设备编号"></el-input>
        </div>
      </div>
      <div class="edit-item">
        <div>
          <span class="span-title">设备名称：</span>
          <el-input size="small" v-model="curDevice.name" class="span-value" placeholder="输入设备名称"></el-input>
        </div>
        <div>
          <span class="span-title">购买日期：</span>
          <el-date-picker
            v-model="curDevice.buytime"
            class="span-value"
            size="small"
            type="date"
            placeholder="请选择日期"
          ></el-date-picker>
        </div>
      </div>
      <div class="edit-item">
        <div>
          <span class="span-title">使用价格：</span>
          <el-input size="small" v-model="curDevice.useprice" class="span-value" placeholder="输入金额">
            <span slot="suffix">元</span>
          </el-input>
        </div>
      </div>
      <div class="edit-item item-image">
        <div style="display:flex">
          <span class="span-title edit-image">图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;片：</span>
          <div class="device-images">
            <div class="add-image"></div>
          </div>
        </div>
      </div>
      <div class="edit-item">
        <div>
          <span class="span-title edit-area">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：</span>
          <el-input
            type="textarea"
            v-model="curDevice.remark"
            class="edit-value"
            placeholder="请输入设备类型说明..."
          ></el-input>
        </div>
      </div>
      <div class="edit-button">
        <el-button v-if="isEdit" type="text" class="btn-cancel" @click="handleClose">取消编辑</el-button>
        <el-button v-if="isEdit" class="btn-delete" @click="deleteDevice">删除</el-button>
        <el-button v-else type="text" class="btn-cancel" @click="handleClose">取消</el-button>
        <el-button @click="saveDevice">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["isEdit", "showAddDig", "curDevice", "devTypeList"],
  data() {
    return {
      devPTypeList: []
    };
  },
  mounted() {},
  methods: {
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.$emit("closeAddDeviceDig");
    },

    /**
     * 保存信息
     */
    saveDevice() {
      this.$emit("saveDevice");
    },

    /**
     * 删除信息
     */
    deleteDevice() {
      this.$emit("deleteDevice");
    }
  }
};
</script>

<style scoped>
/*编辑弹窗*/
.edit-main {
  width: 555px;
  height: 500px;
  padding-top: 40px;
  margin: auto;
}
.edit-item {
  display: flex;
  justify-content: space-between;
}

.item-image {
  height: 102px;
  align-items: center;
}

.span-title {
  width: 75px;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #b2b2b2;
  line-height: 50px;
}

.span-value {
  width: 180px;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #4c4c4c;
  line-height: 50px;
}
.device-images {
  width: 470px;
  height: 90px;
  padding-left: 5px;
  display: flex;
}

.add-image {
  width: 126px;
  height: 90px;
  border: 1px dashed #ddd;
  border-radius: 5px;
}
.edit-image {
  line-height: 30px;
  height: 90px;
}
.edit-area {
  line-height: 30px;
  height: 100px; /*  */
}
.edit-value {
  width: 470px;
  height: 102px;
  margin-top: 14px;
  display: inline-block;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #4c4c4c;
}
.edit-button {
  margin-top: 38px;
  float: right;
}
/*保存按钮*/
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

.btn-delete {
  background: transparent;
  border: 1px #5996f8 solid;
  margin-right: 20px;
  color: #5996f8;
}
</style>
<style>
/*弹窗样式*/
.addDevice-dialog {
  width: 712px;
  height: 626px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

.addDevice-dialog .el-dialog__header {
  padding-top: 35px;
}

.addDevice-dialog .el-dialog__title {
  width: 101px;
  height: 18px;
  font-size: 17px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(157, 179, 215, 1);
  line-height: 26px;
}

.addDevice-dialog .el-dialog__body {
  padding: 0px !important;
}

.addDevice-dialog .el-dialog__headerbtn {
  top: 29px;
  font-size: 25px;
}

/*编辑弹窗*/
.addDevice-dialog .edit-value .el-textarea__inner {
  height: 100px;
}
</style>

