<!--订单详情-->
<template>
  <div id="orderManage-details" class="commonScrollStyle">
    <!--面包屑-->
    <div class="details-crumbs">
      <ul class="clearfloat">
        <li>订单<i class="el-icon-arrow-right"></i></li>
        <li>本店订单<i class="el-icon-arrow-right"></i></li>
        <li>订单详情</li>
      </ul>
      <button class="returnList" @click="returnListPage"><i class="el-icon-arrow-left"></i>返回列表</button>
    </div>
    <!--/面包屑-->

    <!--板块1-酒店信息-->
    <div class="details01"><!--板块1,酒店名称-->
      <div class="details01-hotelName" v-text="orderTitle"></div>
      <div class="details01-btText">
        <div class="state">
          <span>状态：</span>
          <span>待取碟片</span>
        </div>
        <div class="myRole">
          <span>我的角色：</span>
          <span>摄像助理</span>
        </div>
      </div>
    </div>
    <!--/板块1-酒店信息-->

    <!--内容区-->
    <div class="listContent clearfloat">
      <div class="listContent-left">
        <div class="leftBox listContent-orderState">
          <p class="title">订单状态</p>
          <ul>
            <template v-for="(items,index) in orderStateData">
              <li>
                <i class="el-icon-caret-bottom" v-show="items.isShowState"></i>
                <span v-cloak
                      :style="{backgroundColor:items.titleGgColor,color:items.titleTextColor}" @click="openThisContent(items)">{{items.title}}</span>
                <span v-cloak :style="{color:items.btTextColor}">{{items.state}}</span>
                <span v-cloak>周杰伦</span>
              </li>
            </template>
          </ul>
        </div>
        <div class="leftBox listContent-baseNews">
          <p class="title">基本信息
            <i class="el-icon-more moreIcon" @click.stop="isShowEditMenu(1)">
              <transition name="slide-fade">
                <span class="editMenu" v-show="isShowEditMenu1" @click="editNews('baseNews')">编辑</span>
              </transition>
            </i>
          </p>
          <div class="contentBox">
            <ul class="baseNews clearfloat">
              <li>
                <span>订单日期：</span>
                <span v-cloak>{{baseInInformation.OrderDateStr | OrderDateStrFn}}</span>
              </li>
              <li>
                <span>拍摄日期：</span>
                <span v-cloak>{{baseInInformation.OrderDateStr | OrderDateStrFn}}</span>
              </li>
              <li>
                <span>拍摄酒店：</span>
                <span v-text="baseInInformation.HotelName"></span>
              </li>
              <li>
                <span>类<i style="display: inline-block;width: 28px;"></i>型：</span>
                <span v-cloak>{{baseInInformation.OrderType | OrderTypeFn}}</span>
              </li>
              <li>
                <span>婚<i style="display: inline-block;width: 28px;"></i>庆：</span>
                <span v-text="baseInInformation.WeddingName"></span>
              </li>
              <li>
                <span>项<i style="display: inline-block;width: 28px;"></i>目：</span>
                <span v-text="baseInInformation.ProjectName"></span>
              </li>
              <li>
                <span>来<i style="display: inline-block;width: 28px;"></i>源：</span>
                <span v-text="baseInInformation.SourceName"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="leftBox listContent-customerNews">
          <p class="title">客户信息
            <i class="el-icon-more moreIcon" @click.stop="isShowEditMenu(2)">
              <transition name="slide-fade">
                <span class="editMenu" v-show="isShowEditMenu2" @click="editNews('customer')">编辑</span>
              </transition>
            </i>
          </p>
          <div class="contentBox">
            <ul class="KHNews clearfloat">
              <li>
                <span>新<i style="display: inline-block;width: 28px;"></i>郎：</span>
                <span v-text="customerInformation.CustomerModel.XLName"></span>
              </li>
              <li>
                <span>新郎电话：</span>
                <span v-text="customerInformation.CustomerModel.XLPhone"></span>
              </li>
              <li>
                <span>新<i style="display: inline-block;width: 28px;"></i>娘：</span>
                <span v-text="customerInformation.CustomerModel.XNName"></span>
              </li>
              <li>
                <span>新娘电话：</span>
                <span v-text="customerInformation.CustomerModel.XNPhone"></span>
              </li>
              <li>
                <span>客户说明：</span>
                <span v-text="customerInformation.CustomerModel.Remark"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="leftBox listContent-personManage">
          <p class="title">人员安排
            <i class="el-icon-more moreIcon" @click.stop="isShowEditMenu(3)">
              <transition name="slide-fade">
                <span class="editMenu" v-show="isShowEditMenu3" @click="editNews('person')">编辑</span>
              </transition>
            </i>
          </p>
          <div class="content clearfloat">
            <template v-for="(items,index) in personManageListData">
              <div class="list">
                <span class="label">{{items.name}}</span>
                <ul class="commonScrollStyle">
                  <template v-for="(items2,index2) in items.positionList">
                    <li>
                      <label v-cloak>{{items2.PostName}}：</label>
                      <div class="personBox">
                        <template v-for="(items3,index3) in items2.PostUserList">
                          <span v-cloak>{{items3.UserName}}</span>
                        </template>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="listContent-right">
        <div class="rightBox orderPrice">
          <p class="title">订单金额</p>
          <ul class="orderPriceBox">
            <li class="clearfloat">
              <div class="heTongPrice priceBox">
                <label>合同金额：</label>
                <span v-cloak>{{orderPriceObj.amout}}</span>
              </div>
              <div class="handedPrice priceBox">
                <label>已交金额：</label>
                <span v-cloak>{{orderPriceObj.Payment}}</span>
              </div>
            </li>
            <li>
              <div class="noHandedPrice priceBox">
                <label>未交金额：</label>
                <span style="color: #FF0000;" v-cloak>{{noPayPrice}}</span>
              </div>
            </li>
            <li>
              <div class="priceDetails priceBox">
                <label>金额明细：</label>
                <div class="add" @click="addPriceDetailsFn"><span>添加</span></div>
                <div class="telescopic icon1 noSelect" v-show="isShowPriceList" @click="clickIsShowPriceList(false)">
                  收起<i class="el-icon-d-arrow-left showIcon showIcon1"></i></div>
                <div class="telescopic icon2 noSelect" v-show="!isShowPriceList" @click="clickIsShowPriceList(true)">
                  展开<i class="el-icon-d-arrow-left showIcon showIcon2"></i></div>
              </div>
              <transition name="slide-fade">
                <div class="priceList" v-show="isShowPriceList">
                  <dl>
                    <template v-for="(items,index) in orderPriceObj.objlist">
                      <dd>
                        <div class="priceList-hd">
                          <span class="left" v-cloak>{{items.typename}}</span>
                          <span class="right">
                         <span v-cloak>{{items.username}}</span>
                         <span v-cloak>{{items.addtime | addtimeReturn}}</span>
                         <i class="el-icon-arrow-right"></i>
                      </span>
                        </div>
                        <div class="priceList-bt">
                          <span class="left">金额：<span v-cloak>==空缺==</span></span><!--{{items.price}}-->
                          <span class="right">状态：<span v-cloak :class="['zt']" style="color: #FF7E00" v-if="items.satename=='待审核'">{{items.satename}}</span></span>
                          <span class="right">状态：<span v-cloak :class="['zt']" style="color: #5996F8" v-if="items.satename=='已审核'">{{items.satename}}</span></span>
                        </div>
                      </dd>
                    </template>
                  </dl>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <div class="rightBox priceOut">
          <p class="title">
            <span>费用支出({{priceOutData.allPriceOut}})</span>
            <span class="icon1 displayIcon" v-show="priceOutData.isAllDisplay" @click="priceOutAllDisplay(false)">全部收起<i
              class="el-icon-d-arrow-left showIcon showIcon1"></i></span>
            <span class="icon2 displayIcon" v-show="!priceOutData.isAllDisplay" @click="priceOutAllDisplay(true)">全部展开<i
              class="el-icon-d-arrow-left showIcon showIcon2"></i></span>
          </p>
          <ul class="tableList">
            <template v-for="(items,index) in priceOutData.list">
              <li>
                <div class="tab">
                  <span class="listTitle">周杰伦的报账 ({{items.bz}})</span>
                  <span class="listIcon icon1" v-show="items.isDisplay" @click="priceOutOneDisplay(items,false)"> 收起<i
                    class="el-icon-d-arrow-left showIcon showIcon1"></i></span>
                  <span class="listIcon icon2" v-show="!items.isDisplay" @click="priceOutOneDisplay(items,true)"> 展开<i
                    class="el-icon-d-arrow-left showIcon showIcon2"></i></span>
                </div>

                <transition name="slide-fade">
                  <div class="table" v-show="items.isDisplay">
                    <el-table
                      :data="items.data"
                      border
                      max-height="158"
                      :style="{borderColor:'#DDD',borderBottom:'1px solid #DDD'}"
                      :header-row-class-name="priceOutTableHeaderClassName"
                      :row-class-name="priceOutTableRowClassName"
                      style="width: 100%">
                      <el-table-column
                        prop="number"
                        align="center"
                        show-overflow-tooltip
                        min-width="10"
                        label="编号">
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        align="center"
                        min-width="10"
                        show-overflow-tooltip
                        label="标题">
                      </el-table-column>
                      <el-table-column
                        prop="price"
                        align="center"
                        min-width="10"
                        show-overflow-tooltip
                        label="金额">
                      </el-table-column>
                      <el-table-column
                        prop="zt"
                        align="center"
                        min-width="10"
                        show-overflow-tooltip
                        label="状态">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        min-width="10"
                        label="操作">
                        <template slot-scope=scope>
                          <div class="blockBox"></div>
                          <span style="cursor:pointer;">详情</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </transition>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <!--/内容区-->

    <!--设备领取-->
    <getSheBei :showGetSheBeiDiaLog="showGetSheBeiDiaLog"></getSheBei>

    <!--基本信息-->
    <baseNewPage ref="editPersonManagePage" type="update"
                 :showAddOrderStep2DiaLog="baseInInformation.showAddOrderStep2DiaLog"></baseNewPage>
    <!--客户详情-->
    <customerPage ref="editCustomerPage" type="update"
                  :showAddOrderStep3DiaLog="customerInformation.showAddOrderStep3DiaLog"></customerPage>
    <!--人员安排-->
    <personManagePage type="details" :showPersonManageDiaLog="showPersonManageDiaLog"></personManagePage>

    <!--添加金额明细-->
    <addPriceDetailsPage :showAddPaymentRecordDiaLog="showAddPaymentRecordDiaLog" showType="true" type="details"></addPriceDetailsPage>
  </div>
</template>

<script>
  import getSheBei from '../diaLog/getSheBei';//设备领取
  import baseNewPage from '../diaLog/addOrderStep2DiaLog';//基本信息
  import customerPage from '../diaLog/addOrderStep3DiaLog';//客户详情
  import personManagePage from '../diaLog/personManageDiaLog';//人员安排
  import addPriceDetailsPage from '../diaLog/addPaymentRecordDiaLog';//添加金额明细
  /*数据*/
  let dataObj = {
    /*api等信息*/
    api: getkevalue().apiurl,
    orderDetailsRowObj: {},//点开订单详情保存的该行的信息
    orderTitle: '',//订单标题
    orderTitle2: '',//订单标题
    /*订单id*/
    orderId: '',
    /*===设备领取===*/
    showGetSheBeiDiaLog:false,
    /*===基本信息===*/
    baseInInformation: {
      showAddOrderStep2DiaLog: false,
      OrderDateStr: '',//订单日期
      HotelName: '',//酒店
      OrderType: '',//类型
      WeddingName: '',//婚庆
      ProjectName: '',//项目
      SourceName: '',//来源
    },
    /*===客户信息===*/
    customerInformation: {
      showAddOrderStep3DiaLog: false,
      CustomerModel: {
        Remark: "",
        XLName: "",
        XLPhone: "",
        XNName: "",
        XNPhone: "",
      }
    },

    /*===人员安排===*/
    showPersonManageDiaLog: false,

    /*===订单金额===*/
    orderPriceObj: {
      amout: '',   //合同金额
      Payment: '',   //已支付金额
      objlist: []  //交款明细列表
    },
    showAddPaymentRecordDiaLog:false,

    isShowEditMenu1: false,//是否显示基本信息编辑按钮
    isShowEditMenu2: false,//是否显示客户信息编辑按钮
    isShowEditMenu3: false,//是否显示人员安排编辑按钮
    orderStateData: [
      {
        title: '客户意向表',
        state: '超期3天执行',
        name: '周杰伦',
        isShowState: false,
        titleTextColor: '#FFA04D',
        titleGgColor: '#FFF6EB',
        btTextColor: '#FF9F2E'
      },
      {
        title: '设备领取',
        state: '正常执行',
        name: '周杰伦',
        isShowState: false,
        titleTextColor: '#5996F8',
        titleGgColor: '#EFF5FF',
        btTextColor: '#4C4C4C'
      },
      {
        title: '拍摄回传',
        state: '正常执行',
        name: '周杰伦',
        isShowState: false,
        titleTextColor: '#5996F8',
        titleGgColor: '#EFF5FF',
        btTextColor: '#4C4C4C'
      },
      {
        title: '上传初稿',
        state: '正常执行',
        name: '周杰伦',
        isShowState: false,
        titleTextColor: '#5996F8',
        titleGgColor: '#EFF5FF',
        btTextColor: '#4C4C4C'
      },
      {
        title: '审核确认',
        state: '正常执行',
        name: '周杰伦',
        isShowState: false,
        titleTextColor: '#5996F8',
        titleGgColor: '#EFF5FF',
        btTextColor: '#4C4C4C'
      },
      {
        title: '邮寄碟片',
        state: '超期五天未执行',
        name: '周杰伦',
        isShowState: true,
        titleTextColor: '#FF4200',
        titleGgColor: '#FFF1F1',
        btTextColor: '#FF4200'
      },
    ],
    /*人员安排列表数据*/
    personManageListData: [
      {name: '销售', positionList: []},
      {name: '拍摄', positionList: []},
      {name: '后期', positionList: []},
      {name: '客服', positionList: []}
    ],
    /*收起 展示金额明细*/
    isShowPriceList: true,
    /*费用支出数据*/
    priceOutData: {
      allPriceOut: '￥1437.00',
      isAllDisplay: false,
      list: [
        {
          bz: '￥30.60',
          isDisplay: true,
          data: [{number: 'CB6258421', title: '过路费', price: '15.00', zt: '待支付'}, {
            number: 'CB6258421',
            title: '过路费',
            price: '15.00',
            zt: '待支付'
          }, {number: 'CB6258421', title: '过路费', price: '15.00', zt: '待支付'}, {
            number: 'CB6258421',
            title: '过路费',
            price: '15.00',
            zt: '待支付'
          },]
        },
        {
          bz: '￥30.60',
          isDisplay: false,
          data: [{number: 'CB6258421', title: '过路费', price: '15.00', zt: '待支付'}, {
            number: 'CB6258421',
            title: '过路费',
            price: '15.00',
            zt: '待支付'
          }, {number: 'CB6258421', title: '过路费', price: '15.00', zt: '待支付'}, {
            number: 'CB6258421',
            title: '过路费',
            price: '15.00',
            zt: '待支付'
          },]
        },
        {
          bz: '￥30.60',
          isDisplay: false,
          data: [{number: 'CB6258421', title: '过路费', price: '15.00', zt: '待支付'}, {
            number: 'CB6258421',
            title: '过路费',
            price: '15.00',
            zt: '待支付'
          }, {number: 'CB6258421', title: '过路费', price: '15.00', zt: '待支付'}, {
            number: 'CB6258421',
            title: '过路费',
            price: '15.00',
            zt: '待支付'
          },]
        },
      ],
    },


  };
  /*方法*/
  let myMethods = {

    //订单状态处弹出内容
    openThisContent(itemObj){
      if (itemObj.title=='客户意向表'){
        let routeData = this.$router.resolve({
          path: "/intentionTable",
          query: {
            name:'',
          }
        });
        window.open(routeData.href, '_blank');
      }else if (itemObj.title=='设备领取'){
        this.showGetSheBeiDiaLog=true;
      }
    },

    //添加金额明细
    addPriceDetailsFn(){
      this.showAddPaymentRecordDiaLog=true;
      // this.orderTitle
    },
    closeDialog(type) {
      if (type == 'orderStep3DiaLog') {
        this.customerInformation.showAddOrderStep3DiaLog = false;
      } else if (type == 'baseNew') {
        this.baseInInformation.showAddOrderStep2DiaLog = false;
      }
      this.showPersonManageDiaLog = false;
      this.showAddPaymentRecordDiaLog=false;
      this.showGetSheBeiDiaLog=false;
    },
    //编辑
    editNews(type) {
      if (type == 'customer') {
        console.log(this.customerInformation)
        this.customerInformation.showAddOrderStep3DiaLog = true;
        this.$refs.editCustomerPage.editOpenFn(this.customerInformation);
      } else if (type == 'baseNews') {
        this.baseInInformation.showAddOrderStep2DiaLog = true;
        this.$refs.editPersonManagePage.editOpenFn(this.baseInInformation);
      } else if (type == 'person') {
        this.showPersonManageDiaLog = true;
      }
    },
    //返回列表
    returnListPage() {
      this.$parent.isShowOrderDetailsPage = false;
    },
    //点击显示编辑按钮
    isShowEditMenu(type) {
      if (type == 1) {
        this.isShowEditMenu1 = true;
        this.isShowEditMenu2 = false;
        this.isShowEditMenu3 = false;
      } else if (type == 2) {
        this.isShowEditMenu2 = true;
        this.isShowEditMenu1 = false;
        this.isShowEditMenu3 = false;
      } else if (type == 3) {
        this.isShowEditMenu3 = true;
        this.isShowEditMenu2 = false;
        this.isShowEditMenu1 = false;
      }
    },
    //费用支出是否全部展开
    priceOutAllDisplay(bool) {
      this.priceOutData.isAllDisplay = bool;
      this.priceOutData.list.forEach((item, index, arr) => {
        arr[index].isDisplay = bool
      })
    },
    //单个费用支出是否展开
    priceOutOneDisplay(itemObj, bool) {
      itemObj.isDisplay = bool;
      this.priceOutIsAllDisplay();
    },
    //单个费用支出展开后判断是否全部展开
    priceOutIsAllDisplay() {
      let storageArr = [];
      this.priceOutData.list.forEach((item, index, arr) => {
        if (arr[index].isDisplay) {
          storageArr.push(arr[index]);
        }
      });
      if (storageArr.length === this.priceOutData.list.length) {
        this.priceOutData.isAllDisplay = true;
      } else {
        this.priceOutData.isAllDisplay = false;
      }
    },

    //点击展示 或收起金额明细列表
    clickIsShowPriceList(type) {
      // console.log(type)
      this.isShowPriceList = type;
    },
    //费用支出表头类名
    priceOutTableHeaderClassName() {
      return 'priceOutTableHeaderStyle'
    },
    //费用支出表格类名
    priceOutTableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 != 0) {
        return 'priceOutTableRowStyle priceOutTableRow2nStyle'
      } else {
        return 'priceOutTableRowStyle priceOutTableRow1nStyle'
      }
    },
    //初始化事件
    loadEvent() {
      let that = this;
      $('body').click((e) => {
        that.isShowEditMenu1 = false;
        that.isShowEditMenu2 = false;
        that.isShowEditMenu3 = false;
      })
    },
    /*根据订单获取订单标题*/
    getOrderTitle() {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderTitleByOrderId';
      let data = {
        OrderId: this.orderId
      };
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.data.status) {
            this.orderTitle = res.data.data;
            this.orderTitle2 = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              customClass: 'msgTips',
              type: 'error'
            });
            return false;
          }
        }
      })
    },
    /*根据订单获取基本信息*/
    getBaseInformation() {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderBasicInfoByOrderId';
      let data = {
        OrderId: this.orderId
      };
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.data.status) {
            res.data.data.showAddOrderStep2DiaLog = false;
            this.baseInInformation = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              customClass: 'msgTips',
              type: 'error'
            });
            return false;
          }
        }
      })
    },
    /*根据订单获取客户信息*/
    getCustomerInformation() {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderInfoByCustomerInfoList';
      let data = {
        OrderId: this.orderId
      };
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.data.status) {
            res.data.data.showAddOrderStep3DiaLog = false;
            this.customerInformation = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              customClass: 'msgTips',
              type: 'error'
            });
            return false;
          }
        }
      })
    },
    /*根据订单获取人员安排列表*/
    getPersonManageList() {
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderPostUserList';
      let data = {
        OrderId: this.orderId
      };
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.data.status) {
            // console.log(res.data.data)
            this.personManageListData[0].positionList = res.data.data.XSList;
            this.personManageListData[1].positionList = res.data.data.PSList;
            this.personManageListData[2].positionList = res.data.data.HQList;
            this.personManageListData[3].positionList = res.data.data.KFList;
          } else {
            this.$message({
              message: res.data.msg,
              customClass: 'msgTips',
              type: 'error'
            });
            return false;
          }
        }
      })
    },
    /*根据订单获取订单金额*/
    getOrderPrice() {
      let url = this.api + '/xlapi/CameraManage/AmountManage/AmountOrder/showorderamount';
      let data = {
        strorderid: this.orderId
      };
      this.$Axios({
        method: 'GET',
        url: url,
        data: data,
        success(res) {
          // console.log(res)
          if (res.status == 200) {
            this.orderPriceObj=res.data;
          } else {
            this.$message({
              message: res.data.msg,
              customClass: 'msgTips',
              type: 'error'
            });
            return false;
          }
        }
      })
    }


  };
  export default {
    name: "orderManage-details",
    props: [],
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      this.orderDetailsRowObj = this.$parent.orderDetailsRowObj;//保存获取的某行信息
      this.orderId = this.$parent.orderDetailsRowObj.OrderId;//保存获取的某行orderId
      this.loadEvent();
    },
    mounted() {
      this.getOrderTitle();
      this.getBaseInformation();
      this.getCustomerInformation();
      this.getPersonManageList();
      this.getOrderPrice();
    },
    filters: {
      OrderTypeFn(val) {
        if (val == 1) {
          return '婚礼拍摄';
        } else if (val == 2) {
          return '活动拍摄';
        }
      },
      OrderDateStrFn(val) {
        return val.replace(/-/g, '.');
      },
      addtimeReturn(val){
        return val.replace(/\//g, '.');
      }
    },
    computed:{
      noPayPrice(){
        return this.orderPriceObj.amout-this.orderPriceObj.Payment
      }
    },
    components: {
      getSheBei: getSheBei,
      baseNewPage: baseNewPage,
      customerPage: customerPage,
      personManagePage: personManagePage,
      addPriceDetailsPage: addPriceDetailsPage,
    }
  }
</script>

<style scoped>
  @import "../../../../static/css/orderTableStyle.css";

  #orderManage-details {
    height: 100%;
    padding: 20px;
    overflow: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .details-crumbs {
    text-align: left;
    position: relative;
  }

  .details-crumbs .returnList {
    position: absolute;
    right: 5px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    outline: none;
    background: transparent;
    border: 0;
    color: #999999;
    font-size: 14px;
    cursor: pointer;
  }

  .details-crumbs .returnList i {
    font-size: 16px;
    font-weight: 700;
    vertical-align: -1px;
    margin-right: 2px;
  }

  .details-crumbs .returnList:hover {
    color: #5996F8;
  }

  .details-crumbs ul li {
    float: left;
    font-size: 13px;
    color: #4C4C4C;
  }

  .details-crumbs ul li:first-of-type {
    color: #B2B2B2;
  }

  .details01 {
    width: 100%;
    height: 135px;
    margin: 20px 0;
    padding: 25px 40px;
    text-align: left;
    background: #fff;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .details01 .details01-hotelName {
    font-size: 26px;
    color: #4C4C4C;
    margin-bottom: 30px;
  }

  .details01-btText div {
    display: inline-block;
    margin-right: 30px;
    font-size: 14px;
    color: #4C4C4C;
  }

  .details01-btText div span:first-of-type {
    color: #808080;
  }

  .details01-btText div.state span:last-of-type {
    color: #5996F8;
  }

  .listContent-left {
    height: 500px;
    width: 49.2%;
    float: left;
  }

  .listContent-right {
    height: 700px;
    width: 49.2%;
    float: right;
  }

  .listContent-left .leftBox {
    height: auto;
    /*min-height: 300px;*/
    background: #fff;
    margin-bottom: 20px;
    padding: 50px 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .listContent-left .leftBox .title,
  .listContent-right .rightBox .title {
    text-align: left;
    font-size: 14px;
    color: #4C4C4C;
    position: relative;
    font-weight: 700;
  }

  .listContent-right .rightBox {
    background: #fff;
    margin-bottom: 20px;
    padding: 50px 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .listContent-orderState ul {
    display: flex;
    justify-content: space-between;
    padding: 0 1%;
    width: 100%;
    flex-wrap: wrap;
    padding-top: 30px;
  }

  .listContent-orderState ul li {
    width: 90px;
    margin-bottom: 30px;
    position: relative;
  }

  .listContent-orderState ul li i {
    position: absolute;
    top: -16px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .listContent-orderState ul li span {
    font-size: 14px;
  }

  .listContent-orderState ul li span:first-of-type {
    width: 90px;
    height: 90px;
    background: #FFF6EB;
    border-radius: 10px;
    display: inline-block;
    line-height: 90px;
    color: #FFA04D;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .listContent-orderState ul li span:nth-of-type(2) {
    margin: 20px 0 10px;
    display: inline-block;
    width: 100%;
  }

  .listContent-orderState ul li span:nth-of-type(3) {
    color: #BBBBBB;
  }

  .moreIcon {
    position: absolute;
    right: 0;
    cursor: pointer;
    font-size: 20px;
    color: #BBBBBB;
  }

  .moreIcon:hover {
    color: #5996F8;
  }

  .contentBox {
    padding: 20px 10%;
    text-align: left;
  }

  .contentBox ul li {
    width: 48%;
    margin-bottom: 20px;
    margin-right: 10px;
    float: left;
    font-size: 14px;
    color: #4C4C4C;
    text-align: left;
  }

  .contentBox ul li:nth-of-type(2n) {
    margin-right: 0;
    float: right;
  }

  .contentBox ul li:last-of-type {
    margin-bottom: 0;
  }

  .contentBox ul li span:first-of-type {
    color: #808080;
    display: inline-block;
  }

  .contentBox .KHNews li:last-of-type {
    width: auto;
  }

  /*人员安排样式*/
  .list {
    width: 50%;
    float: left;
    text-align: left;
  }

  .list .label {
    color: #808080;
    font-size: 14px;
  }

  .list:nth-of-type(2n) {
    float: right;
  }

  .list:nth-of-type(3), .list:nth-of-type(4) {
    margin-bottom: 0;
  }

  .list ul {
    height: 100px;
    overflow: auto;
    margin-top: 10px;
  }

  .list ul li {
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 15px;
    color: #808080;
    font-size: 14px;
    transition: all .2s;
  }

  .list ul li .personBox {
    display: inline-block;
    overflow-x: auto;
    line-height: 20px;
    max-width: 55%;
    white-space: nowrap;
    vertical-align: -5px;
    box-sizing: border-box;
  }

  .list ul li span {
    color: #4C4C4C;
    font-weight: 700;
    position: relative;
    margin-right: 12px;
  }

  .listContent-personManage .content {
    padding: 20px 10%;
  }

  /*订单金额*/
  .orderPriceBox {
    padding: 20px 16%;
  }

  .priceBox {
    font-size: 14px;
    color: #4C4C4C;
  }

  .priceBox label {
    color: #808080;
  }

  .heTongPrice {
    float: left;
  }

  .handedPrice {
    float: right;
  }

  .noHandedPrice {
    text-align: left;
    margin: 20px 0 40px;
  }

  .priceDetails {
    text-align: left;
    margin-bottom: 25px;
  }

  .priceDetails .add {
    display: inline-block;
    color: #BBBBBB;
    width: 17px;
    height: 17px;
    background: url("../../../../static/img/order/add0.png") no-repeat center center;
    vertical-align: -3px;
    cursor: pointer;
    margin: 0 8px 0 20px;
    position: relative;
  }

  .priceDetails span {
    position: absolute;
    right: -40px;
    width: 30px;
    top: -2px;
  }

  .priceDetails .add:hover {
    background-image: url("../../../../static/img/order/add1.png");
  }

  .priceDetails .add:hover span {
    color: #5996F8;
  }

  .priceDetails .telescopic {
    float: right;
    cursor: pointer;
  }

  i.showIcon {
    font-size: 18px;
    vertical-align: -1px;
    margin-left: 10px;
  }

  i.showIcon1 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  i.showIcon2 {
    font-size: 18px;
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }

  .icon1 {
    color: #5996F8;
    cursor: pointer;
  }

  .icon1:hover, .icon2:hover {
    color: #5996F8;
  }

  .icon2 {
    color: #BBB;
    cursor: pointer;
  }

  .priceList dl dd {
    width: 376px;
    height: 100px;
    background: rgba(246, 246, 246, 1);
    border-radius: 5px;
    padding: 0 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 auto 14px;
  }

  .priceList-hd {
    border-bottom: 1px solid #DDDDDD;
    height: 45px;
    line-height: 44px;
    text-align: left;
    font-size: 14px;
    color: #808080;
    font-weight: 700;
  }

  .priceList-hd .right {
    color: #BBBBBB;
    font-size: 13px;
    float: right;
    font-weight: 400;
  }

  .priceList-bt {
    height: 55px;
    line-height: 55px;
    text-align: left;
    font-size: 14px;
    color: #808080;
  }

  .priceList-bt .right {
    float: right;
  }

  .priceList-hd .right span:nth-of-type(2) {
    margin: 0 12px 0 5px;
  }

  .priceList-bt .zt {
    color: #FF7E00;
  }

  /*======动画======*/
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .2s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    /*height: 0;*/
  }

  /*费用支出表格样式*/
  .priceOut .title {
    position: relative;
    padding: 0 25px;
    margin-bottom: 25px;
  }

  .priceOut .title span.displayIcon {
    position: absolute;
    right: 28px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .tableList li {
    min-height: 44px;
    background: #FFF;
    line-height: 44px;
    position: relative;
    font-size: 14px;
  }

  .tableList li:nth-of-type(2n) {
    background: rgba(246, 246, 246, 1);
  }

  .tableList .listTitle {
    position: absolute;
    left: 25px;
  }

  .tableList .listIcon {
    position: absolute;
    right: 25px;
  }

  .tab {
    height: 44px;
  }

  .tableList .table {
    padding: 5px 25px;
  }

  >>> .priceOutTableHeaderStyle th {
    height: 42px;
    line-height: 42px;
    padding: 0;
    background: #66A1FF;
    color: #FFF;
    font-size: 14px;
    font-weight: 700;
    border: 0;
  }

  >>> .priceOutTableRowStyle td {
    height: 38px;
    padding: 0;
    border-bottom: 0;
    border-color: #DDD;
    font-size: 14px;
    color: #4C4C4C;
    transition: all .2s;
  }

  >>> .priceOutTableRowStyle td:last-of-type {
    border-right: 0;
    position: relative;
  }

  >>> .priceOutTableRow1nStyle td {
    background: #FFF;
  }

  >>> .priceOutTableRowStyle td .blockBox {
    content: '';
    position: absolute;
    right: -17px;
    top: 0;
    height: 100%;
    width: 17px;
    transition: all .2s;
  }

  >>> .priceOutTableRow1nStyle td .blockBox {
    background: #FFF;
  }

  >>> .priceOutTableRow2nStyle td .blockBox {
    background: #F0F5FE;
  }

  >>> .priceOutTableRow2nStyle td {
    background: #F0F5FE;
  }

  >>> .priceOutTableRowStyle:hover td {
    background: #F0F5FE !important;
    color: #5996F8;
  }

  >>> .priceOutTableRowStyle:hover td .blockBox {
    background: #F0F5FE;
  }

  >>> .el-table--border th.gutter:last-of-type {
    border-bottom: 0;
  }

  /*编辑图标*/
  .editMenu {
    position: absolute;
    right: -28px;
    top: 20px;
    width: 50px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    color: #5996F8;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(154, 182, 228, 1);
    border-radius: 5px;
    cursor: pointer;
  }

  .editMenu::before {
    content: '';
    position: absolute;
    top: -4px;
    width: 6px;
    height: 6px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    background: #fff;
    border-top: 1px solid rgba(154, 182, 228, 1);
    border-left: 1px solid rgba(154, 182, 228, 1);
  }

</style>
