<!--订单管理-->
<template>
  <div id="orderManage">
    <div class="orderManage-hd" ref="orderManageHd" v-show="orderManageHd">
      <div class="orderManage-nav">
        <orderNav></orderNav>
      </div>
      <div class="orderManage-search" v-if="isShowSearch">
        <div class="searchBox clearfloat">
          <selectTime @getStartTime="getStartTime" @getEndTime="getEndTime" class="floatL"
                      ref="childSelectTime"></selectTime>
          <inputSelect class="floatL" ref="inputSelectSearch"></inputSelect>
        </div>
      </div>
    </div>
    <div class="orderManage-ct" ref="orderManageCt" v-loading="isShowMyLoading">
      <keep-alive>
        <router-view ref="ourOrderRouterView"></router-view>
      </keep-alive>
    </div>
    <!--其他公用-->
    <commonDiaLog :commonDiaLogObj="commonDiaLogObj">
      <template slot="commonDiaLog">
        <!--类型-->
        <div class="selectType">
          <div class="weddingShot">
            <button @click="selectThisType(1)">婚礼拍摄</button>
          </div>
          <div class="businessShot">
            <button @click="selectThisType(2)">活动拍摄</button>
          </div>
        </div>
        <!--/类型-->
      </template>
    </commonDiaLog>

    <!--新增订单第二步-->
    <addOrderStep2DiaLog :showAddOrderStep2DiaLog="showAddOrderStep2DiaLog" type="add"></addOrderStep2DiaLog>
    <!--新增订单下一步-->
    <addOrderStep3DiaLog :showAddOrderStep3DiaLog="showAddOrderStep3DiaLog" type="add"></addOrderStep3DiaLog>
    <!--新增订单成功-->
    <addOrderSuccessDiaLog :showAddOrderSuccessDiaLog="showAddOrderSuccessDiaLog"></addOrderSuccessDiaLog>
    <!--新增酒店-->
    <addHotelDiaLog :showAddHotelDiaLog="showAddHotelDiaLog" ref="addHotelDiaLog"></addHotelDiaLog>

    <!--订单详情页面-->
    <div class="orderDetailsPage" v-if="isShowOrderDetailsPage">
      <orderDetailsPage :orderDetailsRowObj="orderDetailsRowObj"></orderDetailsPage>
    </div>

  </div>
</template>

<script>
  import selectTime from '../common/selectTime/selectTime';
  import inputSelect from '../common/inputSelect/inputSelect';
  import orderNav from './orderNav/orderNav';
  import commonDiaLog from '../orderManage/diaLog/commonDiaLog';
  import addOrderStep2DiaLog from '../orderManage/diaLog/addOrderStep2DiaLog';
  import addOrderStep3DiaLog from '../orderManage/diaLog/addOrderStep3DiaLog';
  import addOrderSuccessDiaLog from '../orderManage/diaLog/addOrderSuccessDiaLog';
  import addHotelDiaLog from '../orderManage/diaLog/addHotelDiaLog';

  import orderDetailsPage from '../orderManage/pages/orderManage-details';

  /*数据*/
  let dataObj = {
    /*api等信息*/
    api: getkevalue().apiurl,
    /*新增订单第二步*/
    showAddOrderStep2DiaLog: false,
    /*新增订单下一步*/
    showAddOrderStep3DiaLog: false,
    /*成功界面*/
    showAddOrderSuccessDiaLog: false,
    /*新增酒店界面*/
    showAddHotelDiaLog: true,

    /*加载图标*/
    isShowMyLoading: false,

    isShowOrderDetailsPage: false,

    orderManageHd: true,
    isAddNewOrderSuccess: false,//显示新增订单成功
    checked: true,
    isShowSearch: false,
    commonDiaLogObj: {
      showDiaLog: false,
      isShowBtn1: false,
      isShowBtn2: false,
      title: '选择新增订单类型',
      btn1Text: '',
      btn2Text: '',
      type: 'addNewOrder',
      className: 'commonDiaLog addNewOrderDiaLogSelectType'
    },
    selectedTypeId: '',//选择增加的类型
    orderId: '',//添加成功后生成的orderId
    searchStartTime: '',//查询开始时间
    searchEndTime: '',//查询结束时间

    /*点开订单详情保存的该行的信息*/
    orderDetailsRowObj:{}
  };
  /*方法*/
  let myMethods = {
    //开始时间修改查询
    getStartTime(val) {
      this.searchStartTime = val;
      this.requestData();
    },
    //截止时间修改查询
    getEndTime(val) {
      this.searchEndTime = val;
      this.requestData();
    },
    //设置订单查询时间并请求第一次数据
    setOrderTime() {
      this.searchStartTime = this.$refs.childSelectTime.value1;
      this.searchEndTime = this.$refs.childSelectTime.value2;
      this.requestData();
    },
    //请求数据
    requestData() {
      this.$refs.ourOrderRouterView.tableData = [];
      this.$refs.ourOrderRouterView.pageIndex = 1;
      let data = {
        startTime: this.searchStartTime,
        endTime: this.searchEndTime,
      };
      this.$refs.ourOrderRouterView.getOrderData(data);
    },
    //创建酒店
    openAddNewHotel(valText) {
      this.showAddHotelDiaLog = true;
      setTimeout(() => {
        // this.$refs.addHotelDiaLog.$refs.childCommonInput_name.inputValue=valText
      })
    },
    //打开成功界面
    openSuccessDiaLog() {
      this.showAddOrderSuccessDiaLog = true;
      this.showAddOrderStep2DiaLog = false;
      this.showAddOrderStep3DiaLog = false;
    },
    //上一步
    openPrevStep() {
      this.showAddOrderStep2DiaLog = true;
      this.showAddOrderStep3DiaLog = false;
    },
    //打开新增订单下一步
    openAddNewOrderNext() {
      this.showAddOrderStep3DiaLog = true;
    },
    //打开新增弹框
    openDiaLog(type) {
      this.commonDiaLogObj.showDiaLog = true;
    },
    //关闭弹框
    closeDialog(type) {
      if (type == 'addHotel') {
        this.showAddHotelDiaLog = false;
      } else {
        this.commonDiaLogObj.showDiaLog = false;
        this.showAddOrderStep2DiaLog = false;
        this.showAddOrderStep3DiaLog = false;
        this.showAddOrderSuccessDiaLog = false;
      }
    },

    //初始化弹框
    reloadDiaLog() {
      this.commonDiaLogObj.showDiaLog = false;
      this.showAddOrderStep2DiaLog = false;
      this.showAddOrderStep3DiaLog = false;
      this.showAddOrderSuccessDiaLog = false;
      this.showAddHotelDiaLog = false;
    },
    //选择类型进行跳转
    selectThisType(typeVal) {
      this.selectedTypeId = typeVal;
      this.isShowSelectType = false;
      this.commonDiaLogObj.showDiaLog = false;
      this.showAddOrderStep2DiaLog = true;
    },
    //设置订单内容区的高度
    setOrderManageCtStyle() {
      let $height = $(this.$refs.orderManageHd).outerHeight() + 'px';
      $(this.$refs.orderManageCt).css({
        height: 'calc(100% - ' + $height + ')',
      })
    },
    //  判断路由
    getRouter() {
      let $path = this.$route.path;
      if ($path.indexOf('orderManageOurShop') != -1) {
        this.isShowSearch = true;
        this.orderManageHd = true;
      } else {
        this.isShowSearch = false;
      }
    }
  };
  export default {
    name: "orderManage",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      this.reloadDiaLog();//初始化弹框
      this.getRouter();
    },
    mounted() {
      this.setOrderManageCtStyle();
      setTimeout(() => {
        // this.setOrderTime();
      })
    },
    updated() {
      this.setOrderManageCtStyle();
    },
    components: {
      selectTime: selectTime,
      inputSelect: inputSelect,
      orderNav: orderNav,
      commonDiaLog: commonDiaLog,
      addOrderStep2DiaLog: addOrderStep2DiaLog,
      addOrderStep3DiaLog: addOrderStep3DiaLog,
      addOrderSuccessDiaLog: addOrderSuccessDiaLog,
      addHotelDiaLog: addHotelDiaLog,
      orderDetailsPage: orderDetailsPage,
    },
    watch: {
      $route(to, from) {
        if (to.path.indexOf('orderManageOurShop') != -1) {
          this.isShowSearch = true;
          this.orderManageHd = true;
        } else {
          this.isShowSearch = false;
        }
      },
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
    padding: 30px 35px 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
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

  /*选择类型样式*/
  >>> .addNewOrderDiaLogSelectType .el-dialog__wrapper {
    overflow: hidden;
  }

  >>> .addNewOrderDiaLogSelectType .el-dialog__body {
    height: 90%;
  }

  >>> .addNewOrderDiaLogSelectType .content {
    height: 100%;
  }

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

  /*新增订单选择类型样式*/
  >>> .addNewOrderDiaLogSelectType {
    width: 36%;
    height: 50%;
    padding: 40px;
  }

  >>> .addNewOrderDiaLogSelectType .el-dialog__header .el-dialog__title {
    color: #9DB3D7;
    font-size: 17px;
  }

  >>> .addNewOrderDiaLogSelectType .el-dialog__footer .el-button {
    padding: 0;
    width: 140px;
    height: 42px;
    background: rgba(89, 150, 248, 1);
    border-radius: 5px;
    font-size: 15px;
  }

  >>> .addNewOrderDiaLogSelectType .el-dialog__footer .el-button:hover {
    background: rgba(89, 150, 248, .9);
  }

  /*订单详情页面*/
  .orderDetailsPage {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #F6F6F6;
    z-index: 998;
  }

</style>


