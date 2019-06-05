<template>
  <div id="newAddOrder">
    <el-dialog
      :title="diaLogObj.title"
      :visible.sync="diaLogObj.showDiaLog"
      custom-class="dialogBox2 commonDiaLog"
      :modal="false"
      :before-close="closeBefore"
      :width="diaLogObj.diaLogWidth"
      :show-close="false">
      <i class="closeIcon" @click="closeDiaLog"></i>
      <div class="content">
        <slot name="selectType"></slot>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" v-if="diaLogObj.isShowBtn1">{{diaLogObj.btn1Text}}</el-button>
        <el-button type="primary" @click="dialogVisible = false" v-if="diaLogObj.isShowBtn2">{{diaLogObj.btn2Text}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /*数据*/
  let dataObj = {};
  /*方法*/
  let myMethods = {
    //关闭弹框
    closeDiaLog() {
      this.$parent.closeDiaLog();
    },
    closeBefore() {

    }
  };
  export default {
    name: "newAddOrder",
    props: ['diaLogObj'],
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {

    },
    mounted() {
      console.log('进来了')
      $('.dialogBox2').css({
        height: this.diaLogObj.diaLogHeight,
        minHeight: this.diaLogObj.diaLogMinHeight,
        minWidth: this.diaLogObj.diaLogMinWidth
      })
    },
    updated(){
      $('.dialogBox2').css({
        height: this.diaLogObj.diaLogHeight,
        minHeight: this.diaLogObj.diaLogMinHeight,
        minWidth: this.diaLogObj.diaLogMinWidth
      })
    }
  }
</script>

<style scoped>
  @import "../../../../static/css/commonDiaLogStyle.css";

  >>> .dialogBox2 {
    padding: 40px;
  }

  >>> .el-dialog__title {
    color: #9DB3D7;
    font-size: 17px;
  }

  >>> .el-dialog__wrapper {
    overflow: hidden;
  }

  >>> .el-dialog__body {
    height: 90%;
  }

  .content {
    height: 100%;
  }

  >>> .el-dialog__footer {
    position: absolute;
    left: 50%;
    bottom: 35px;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  >>> .el-dialog__footer .el-button {
    padding: 0;
    width:140px;
    height:42px;
    background:rgba(89,150,248,1);
    border-radius:5px;
    font-size: 15px;
  }
  >>> .el-dialog__footer .el-button:hover {
    background:rgba(89,150,248,.9);
  }
</style>
