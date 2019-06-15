<template>
  <el-dialog
    title="查看设备"
    :modal="false"
    top="0"
    :visible.sync="showLookDevDig"
    width="712px"
    :close-on-click-modal="false"
    :before-close="handleClose"
    :center="true"
    custom-class="lookDevice-dialog"
  >
    <div class="edit-main">
      <div class="edit-item">
        <div>
          <span class="span-title">设备类型：</span>
          <span class="span-value">{{getDevTypeName(curDevice.equitype)}}</span>
        </div>
        <div>
          <span class="span-title">设备编号：</span>
          <span class="span-value">{{curDevice.code}}</span>
        </div>
      </div>
      <div class="edit-item">
        <div>
          <span class="span-title">设备名称：</span>
          <span class="span-value">{{curDevice.name}}</span>
        </div>
        <div>
          <span class="span-title">购买日期：</span>
          <span class="span-value">{{curDevice.buytime}}</span>
        </div>
      </div>
      <div class="edit-item">
        <div>
          <span class="span-title">使用价格：</span>
          <span class="span-value">{{curDevice.useprice}}</span>
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
        <div style="margin-top:15px;margin-left:5px;display: flex;">
          <span class="span-title edit-area">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：</span>
          <span class="span-value span-remark">{{curDevice.remark}}</span>
        </div>
      </div>
      <div class="edit-button">
        <el-button @click="showDeviceDig">编辑</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["showLookDevDig", "curDevice", "devTypeList"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    /**
     * 根据设备类型id查找设备类型名称
     */
    getDevTypeName(typeId) {
      let type = this.devTypeList.find(t => t.id == typeId);
      if (type && type.id != "") {
        return type.name;
      }
      return "";
    },
    /**
     * 关闭弹窗
     */
    handleClose() {
      this.$emit("closeLookDeviceDig");
    },

    /**
     * 编辑设备信息
     */
    showDeviceDig() {
      this.$emit("showDeviceDig");
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
.span-remark {
  width: 460px;
  line-height: 30px;
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
  height: 60px; /*  */
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
  text-align: center;
  margin-top: 38px;
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
</style>
<style>
/*弹窗样式*/
.lookDevice-dialog {
  width: 712px;
  height: 626px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.17);
}

.lookDevice-dialog .el-dialog__header {
  padding-top: 35px;
}

.lookDevice-dialog .el-dialog__title {
  width: 101px;
  height: 18px;
  font-size: 17px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(157, 179, 215, 1);
  line-height: 26px;
}

.lookDevice-dialog .el-dialog__body {
  padding: 0px !important;
}

.lookDevice-dialog .el-dialog__headerbtn {
  top: 29px;
  font-size: 25px;
}

/*编辑弹窗*/
.lookDevice-dialog .edit-value .el-textarea__inner {
  height: 100px;
}
</style>

