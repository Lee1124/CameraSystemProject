<template>
  <div id="orderManage">
    <div class="orderManage-hd">
      <div class="orderManage-nav">
        <orderNav></orderNav>
      </div>
      <div class="orderManage-search">
        <div class="searchBox clearfloat">
          <selectTime class="floatL"></selectTime>
          <inputSelect class="floatL"></inputSelect>
        </div>
      </div>
    </div>
    <div class="orderManage-ct">
      <router-view></router-view>
    </div>

    <!--新增-->
    <newAddOrderDiaLog :diaLogObj="diaLogObj">
      <template slot="selectType">
        <!--类型-->
        <div class="selectType" v-if="isShowSelectType">
          <div class="weddingShot">
            <button @click="selectThisType(1)">婚礼拍摄</button>
          </div>
          <div class="businessShot">
            <button @click="selectThisType(2)">商业拍摄</button>
          </div>
        </div>
        <!--/类型-->

        <!--新增-->
        <div class="addNewOrder" v-if="isShowAddNewOrder">
          <div class="title"><span>基本信息</span></div>
          <ul class="form">
            <li class="form-inner">
              <div class="formLeft">
                <label>日期：</label>
                <input type="text" placeholder="请选择酒店">
              </div>
              <div class="formRight">
                <label>城市：</label>
                <input type="text">
              </div>
            </li>
            <li class="form-inner">
              <div class="formLeft">
                <label>酒店：</label>
                <input type="text" placeholder="请选择酒店">
              </div>
              <div class="formRight">
                <label>宴会厅：</label>
                <input type="text">
              </div>
            </li>

            <li class="form-inner"> </li>
            <li class="form-inner"> </li>
            <li class="form-inner">
              <label>来源：</label>
              <span class="checkBox">
                <el-checkbox v-model="checked">微博微信咨询</el-checkbox>
                <el-checkbox v-model="checked">合作伙伴推荐</el-checkbox>
                <el-checkbox v-model="checked">网其他</el-checkbox>
              </span>
            </li>
            <li class="form-inner"> </li>
          </ul>
        </div>
        <!--/新增-->
      </template>
    </newAddOrderDiaLog>
  </div>
</template>

<script>
  import selectTime from '../common/selectTime/selectTime';
  import inputSelect from '../common/inputSelect/inputSelect';
  import orderNav from '../orderManage/orderNav';
  import newAddOrderDiaLog from '../orderManage/diaLog/newAddOrderDiaLog';
  /*数据*/
  let dataObj = {
    diaLogObj: {
      showDiaLog: false,
      diaLogWidth: '36%',
      diaLogHeight: '50%',
      diaLogMinHeight: 'auto',
      diaLogMinWidth: 'auto',
      isShowBtn1: false,
      isShowBtn2: false,
      title: '选择新增订单类型',
      btn1Text: '',
      btn2Text: '',
    },
    isShowSelectType: false,//显示选择类型内容
    isShowAddNewOrder: false,//显示选择类型内容
    checked: true
  };
  /*方法*/
  let myMethods = {
    //打开新增弹框
    openDiaLog(type) {
      if (type == 'add') {
        this.diaLogObj.showDiaLog = true;
        this.isShowSelectType = true;
      }
    },
    //关闭新增弹框
    closeDiaLog() {
      this.reloadDiaLog();
    },

    //重置弹框
    reloadDiaLog() {
      this.isShowSelectType = false;
      this.isShowAddNewOrder = false;
      this.diaLogObj.showDiaLog = false;
      this.diaLogObj.diaLogMinHeight = 'auto';
      this.diaLogObj.diaLogMinWidth = 'auto';
      this.diaLogObj.isShowBtn2 = false;
      setTimeout(() => {
        this.diaLogObj.diaLogWidth = '36%';
        this.diaLogObj.diaLogHeight = '50%';
        this.diaLogObj.title = '选择新增订单类型';
        this.diaLogObj.btn1Text = '';
        this.diaLogObj.btn2Text = '';
      }, 300);
    },
    //选择类型进行跳转
    selectThisType(type) {
      this.isShowSelectType = false;
      this.diaLogObj.showDiaLog = false;
      this.diaLogObj.diaLogWidth = '53.5%';
      this.diaLogObj.diaLogHeight = '80.5%';
      this.diaLogObj.diaLogMinHeight = '500px';
      this.diaLogObj.diaLogMinWidth = '720px';
      this.diaLogObj.isShowBtn2 = true;
      this.diaLogObj.title = '新增订单';
      this.diaLogObj.btn2Text = '下一步';
      setTimeout(() => {
        this.isShowAddNewOrder = true;
        this.diaLogObj.showDiaLog = true;
      })
    }
  };
  export default {
    name: "orderManage",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {

    },
    components: {
      selectTime: selectTime,
      inputSelect: inputSelect,
      orderNav: orderNav,
      newAddOrderDiaLog: newAddOrderDiaLog,
    }
  }
</script>

<style scoped>
  #orderManage {
    height: 100%;
  }

  .orderManage-hd {
    /*height: 20%;*/
    padding: 2.2% 35px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
  }

  .orderManage-ct {
    height: 80%;
    padding: 30px 35px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .orderManage-nav {
    height: 35px;
  }

  .orderManage-search {
    height: 32px;
    margin-top: 2%;
    position: relative;
  }

  .searchBox {
    position: absolute;
    bottom: 0;
  }

  @media (max-width: 1600px) {
    .orderManage-ct {
      height: 75%;
    }
  }

  /*选择类型样式*/
  .selectType {
    height: 100%;
  }

  .selectType .weddingShot, .selectType .businessShot {
    height: 50%;
    position: relative;
  }

  .selectType button {
    width: 65%;
    height: 45%;
    background: rgba(89, 150, 248, 1);
    border-radius: 35px;
    border: 0;
    outline: none;
    font-size: 18px;
    color: #fff;
    position: absolute;
    top: 60%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all .2s;
  }

  .selectType .weddingShot button {
    top: 70%;
  }

  .selectType .weddingShot button:hover {
    background: rgba(89, 150, 248, .9);
  }

  .selectType .businessShot button {
    background: rgba(228, 238, 255, 1);
    color: #5996F8;
  }

  .selectType .businessShot button:hover {
    background: rgba(228, 238, 255, .9);
  }

  /*新增*/
  .addNewOrder {
    height: 100%;
    padding: 8% 10%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  @media (max-width: 1600px) {
    .addNewOrder {
      padding: 6%;
    }
  }

  .addNewOrder .title {
    color: #5996F8;
    font-size: 14px;
    text-align: left;
  }

  .addNewOrder .title span {
    position: relative;
  }

  .addNewOrder .title span::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 17px;
    background: rgba(89, 150, 248, 1);
    left: -10px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  /*.addNewOrder .table-content {*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*}*/

  /*.addNewOrder .table-content tbody tr td {*/
  /*height: 32px!important;*/
  /*padding: 0;*/
  /*}*/

  .addNewOrder .form li {
    height: 32px;
    /*background: red;*/
    margin: 3%;
    /*padding: 0 22% 0 2%;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .addNewOrder .form li div {
    /*float: left;*/
    /*margin-right: 70px;*/
  }
  .addNewOrder .form li:nth-of-type(5) {
    justify-content: flex-start;
  }


  .addNewOrder .form li label {
    color: #808080;
    font-size: 14px;
  }
  .addNewOrder .form li input {
    width:200px;
    height:32px;
    border:1px solid rgba(221,221,221,1);
    border-radius:4px;
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #4C4C4C;
  }
  .addNewOrder .form li input::-webkit-input-placeholder {
    color: #BBB;
  }

  .checkBox {
    margin-left: 5px;
  }



</style>
