<template>
    <div id="addOrderSuccessDiaLog">
      <el-dialog
        title=""
        :visible.sync="showAddOrderSuccessDiaLog"
        custom-class="commonDiaLog addOrderSuccessDiaLog"
        :modal="false"
        :before-close="closeBefore"
        :show-close="false">
        <i class="closeIcon" @click="closeTip"></i>
        <!--成功界面-->
        <div class="addNewOrderSuccess" >
          <ul>
            <li>
              <div class="icon1"></div>
              <p class="icon1-text">订单新增成功</p>
            </li>
            <li>
              <p class="erWeiMa-text">扫描二维码发送客户填写意向表</p>
              <div class="erWeiMa"></div>
            </li>
            <li>
              <p class="hunLi-text">20190629浣花溪度假村草坪婚礼 （婚礼拍摄）</p>
            </li>
          </ul>
        </div>
        <!--/成功界面-->
      </el-dialog>
    </div>
</template>

<script>
    /*数据*/
    let dataObj = {};
    /*方法*/
    let myMethods = {
      closeBefore(){

      },
      closeTip() {
        this.$parent.closeDialog();
      },
    };
    export default {
      name: "addOrderSuccessDiaLog",
      props: ['showAddOrderSuccessDiaLog'],
      data() {
        return dataObj;
      },
      methods: myMethods,
      created() {

      },
    }
</script>

<style scoped>
  @import "../../../../static/css/commonDiaLogStyle.css";
  /*成功弹框的样式*/
  >>> .addOrderSuccessDiaLog {
    width: 36.5%;
    height: 76.5%;
    padding: 2.5%;
    min-width: 400px;
    min-height: 520px;
  }

  .addOrderSuccessDiaLog ul li {
    /*margin: 20px 0;*/
  }
  .addOrderSuccessDiaLog ul li:nth-of-type(2) {
    margin-top: 15%;
  }

  .addOrderSuccessDiaLog .icon1 {
    width: 110px;
    height: 110px;
    background: url("../../../../static/img/order/success.png") no-repeat center center;
    margin: 0 auto 10%;
  }

  .addOrderSuccessDiaLog .icon1-text {
    color: #11CA64;
    font-size: 24px;
  }

  .addOrderSuccessDiaLog .erWeiMa-text {
    color: #BBBBBB;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .addOrderSuccessDiaLog .erWeiMa {
    width: 150px;
    height: 145px;
    background: url("../../../../static/img/order/erweima.png") no-repeat center center;
    margin: 5% auto;
  }

  .addOrderSuccessDiaLog .hunLi-text {
    width: 220px;
    margin: 0 auto;
  }
</style>
