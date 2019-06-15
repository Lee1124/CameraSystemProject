<!--本店订单-->
<template>
  <div id="orderManageTable" ref="orderManageTable" :style="{opacity:orderManageTableOpacity}">
    <!--人员查看弹框-->
    <personManageDiaLog type="list" :showPersonManageDiaLog="showPersonManageDiaLog"></personManageDiaLog>
    <!--金额明细界面-->
    <priceDetailsDiaLog :showPriceDetailsDiaLog="showPriceDetailsDiaLog"></priceDetailsDiaLog>
    <p style="display: none;">{{msg}}</p>
    <div ref="tableBox" :class="['tableBox']">
      <el-table
        :data="tableData"
        border
        :summary-method="getSummaries"
        show-summary
        sum-text="合计："
        :height="tableHeight"
        :style="{border:0,borderTop:'1px solid #DDD'}"
        :header-row-class-name="headerClassName"
        :row-class-name="rowClassName"
        ref="table"
        @cell-mouse-leave="hideRightClickMenu"
        style="width: 100%;text-align: center">
        <template v-for="(items,index) in colData">
          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id!=1&&items.id!=2&&items.id!=6&&items.id!=7&&items.id!=8
            &&items.id!=9&&items.id!=10&&items.id!=11&&items.id!=12&&items.id!=13"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==3" v-cloak>{{scope.row.HotelName}}</span>
              <span v-if="items.id==4" v-cloak>{{scope.row.WeddingName}}</span>
              <span v-if="items.id==5" v-cloak>{{scope.row.CustomerName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==1"
            width="80"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==1&&scope.row.isHeJi==undefined"><a href="javascript:void(0)"
                                                                       @click="openOrderDetails(scope.row)">详情</a></span>
              <span v-if="items.id==1&&scope.row.isHeJi">合计：</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==2"
            width="110"
            align="center">
            <template slot-scope=scope>
              <span v-if="scope.row.isCQ" style="font-weight: 700;color: red;">!</span>
              <span v-cloak>{{scope.row.OrderDateStr|changeOrderDateStr}}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            v-if="items.id==7"
            sortable="custom"
            width='100'
            align="center">
            <template slot-scope=scope>
              <span>{{scope.row.OrderState | filterOrderState}}</span>
              <div class="rightClickShadow" @contextmenu.prevent="stateRightClick($event,scope.row)"></div>
              <div class="rightClickContent" :style="{top:menuTop,left:menuLeft}" v-show="scope.row.isShowRightMenu">
                <ul>
                  <li>回馈表(已确认)</li>
                  <li>拍摄交接单(未填)</li>
                  <li>设备清单(未领用)</li>
                </ul>
              </div>
            </template>
          </el-table-column>

          <!--拍摄-->
          <el-table-column
            :label="items.name"
            v-if="items.id==9"
            sortable="custom"
            width="160"
            align="center">
            <template slot-scope=scope>
              <template v-for="(item2,index) in scope.row.PSList">
                <span class="morePS" v-if="scope.row.PSList.length<=1">{{item2.UserName}}</span>
                <span class="morePS"
                      v-if="scope.row.PSList.length>1&&index<2">{{item2.UserName}}<i>、</i></span>
              </template>
              <span v-if="scope.row.PSList.length==0"><a href="javascript:void(0)" class="commonColor"
                                                         @click="openPersonDiaLog(scope.row)">添加</a></span>
              <div class="moreImg" @click="showShotMoreMenu($event,scope.row,'haveBtn')"
                   v-if="items.id==9&&scope.row.PSList.length>2">
                <transition name="slide-fade">
                  <commonMenu-shot :rowObj="rowObj" v-show="scope.row.isShowShotMoreMenu" :shotMenuData="shotMenuData"
                                   :style="{top:moreShotMenuTop,left:moreShotMenuLeft}"></commonMenu-shot>
                </transition>
              </div>
              <div class="rightClickShadow" v-if="items.id==9&&scope.row.PSList.length<=2&&scope.row.PSList.length!=0"
                   @contextmenu.prevent="showShotMoreMenu($event,scope.row,'noBtn')">
                <transition name="slide-fade">
                  <commonMenu-shot :rowObj="rowObj" v-show="scope.row.isShowShotMoreMenu" :shotMenuData="shotMenuData"
                                   :style="{top:moreShotMenuTop,left:moreShotMenuLeft}"></commonMenu-shot>
                </transition>
              </div>

            </template>
          </el-table-column>

          <!--销售、后期、客服-->
          <el-table-column
            :label="items.name"
            v-if="items.id==8||items.id==10||items.id==11"
            width="100"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==8">
                <template v-for="(items,index) in scope.row.XSList">
                  <span v-if="index<1">{{items.UserName}}</span>
                </template>
                <span v-if="scope.row.XSList.length==0"><a href="javascript:void(0)" class="commonColor"
                                                           @click="openPersonDiaLog(scope.row)">添加</a></span>
              </span>
              <span v-if="items.id==10">
                 <template v-for="(items,index) in scope.row.HQList">
                  <span v-if="index<1">{{items.UserName}}</span>
                </template>
                <span v-if="scope.row.HQList.length==0"><a href="javascript:void(0)" class="commonColor"
                                                           @click="openPersonDiaLog(scope.row)">添加</a></span>
              </span>
              <span v-if="items.id==11">
              <template v-for="(items,index) in scope.row.KFList">
                  <span v-if="index<1">{{items.UserName}}</span>
                </template>
                <span v-if="scope.row.KFList.length==0"><a href="javascript:void(0)" class="commonColor"
                                                           @click="openPersonDiaLog(scope.row)">添加</a></span>
              </span>
              <div class="rightClickShadow" v-if="items.id==8&&scope.row.XSList.length==1"
                   @contextmenu.prevent="shotPersonRightClick($event,scope.row,'sale')">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowSaleMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="rightClickShadow" v-if="items.id==10&&scope.row.HQList.length==1"
                   @contextmenu.prevent="shotPersonRightClick($event,scope.row,'lastTime')">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowLastTimeMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="rightClickShadow" v-if="items.id==11&&scope.row.KFList.length==1"
                   @contextmenu.prevent="shotPersonRightClick($event,scope.row,'customer')">
                <transition name="slide-fade"></transition>
                <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowCustomerMenu"
                            :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
              </div>

              <div class="moreImg" @click="showPersonMoreMenu($event,scope.row,'sale')"
                   v-if="items.id==8&&scope.row.XSList.length>1">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuType="menuType" :menuData="menuData"
                              v-show="scope.row.isShowSaleMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="moreImg" @click="showPersonMoreMenu($event,scope.row,'lastTime')"
                   v-if="items.id==10&&scope.row.HQList.length>1">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowLastTimeMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="moreImg" @click="showPersonMoreMenu($event,scope.row,'customer')"
                   v-if="items.id==11&&scope.row.KFList.length>1">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowCustomerMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==6"
            sortable="custom"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==6&&scope.row.IsHavingKJ" v-cloak>{{scope.row.ProjectName}}(含快剪)</span>
              <span v-if="items.id==6&&!scope.row.IsHavingKJ" v-cloak>{{scope.row.ProjectName}}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==12||items.id==13"
            sortable="custom"
            width="80"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==12" style="cursor: pointer"
                    @click="openPriceDetails(scope.row)" v-cloak>{{scope.row.Amount}}</span>
              <span v-if="items.id==13" v-cloak>{{scope.row.Amount}}
                <span class="fillSpan"></span>
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>
<script>
  import personManageDiaLog from '../diaLog/personManageDiaLog';//人员查看
  import priceDetailsDiaLog from '../diaLog/priceDetailsDiaLog';//金额明细

  /*数据*/
  let dataObj = {
    /*api等信息*/
    api: getkevalue().apiurl,
    /*弹框显示*/
    showPersonManageDiaLog: false,
    /*金额明细*/
    showPriceDetailsDiaLog: false,
    /*加载图标*/
    // isShowMyLoading:false,
    //表格的最外层高度
    orderManageTableBoxHeight: 0,
    tableBoxHeight: 0,
    tableHeight: 'auto',
    orderManageTableOpacity: 0,
    menuTop: 0,
    menuLeft: 0,
    moreShotMenuTop: 0,
    moreShotMenuLeft: 0,
    moreSmallMenuTop: 0,
    moreSmallMenuLeft: 0,

    menuData: [],
    menuType: 'xs',
    shotMenuData: [],
    rowObj: {},
    //表头数据
    colData: [
      {name: '操作', id: 1},
      {name: '日期', id: 2},
      {name: '酒店', id: 3},
      {name: '婚庆', id: 4},
      {name: '客户', id: 5},
      {name: '项目', id: 6},
      {name: '状态', id: 7},

      {name: '销售', id: 8},
      {name: '拍摄', id: 9},
      {name: '后期', id: 10},
      {name: '客服', id: 11},

      {name: '金额', id: 12},
      {name: '合同', id: 13}
    ],
    /*表格数据*/
    tableData: [],
    tableData2: {},
    SearchStartTime: '',
    SearchEndTime: '',
    // pageIndex: 1, /*页码*/
    // pageSize: 20, /*表格每页的条数*/
    // allCount:'',/*获取的总条数*/
    // pushArr:[],
    msg: 1,
  };
  /*方法*/
  let myMethods = {
    //获取订单表格数据
    getOrderData(obj) {
      this.$parent.isShowMyLoading = true;
      if (obj != undefined) {
        this.SearchStartTime = obj.startTime;
        this.SearchEndTime = obj.endTime;
      }
      let url = this.api + '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetCameraOrderInfoList';
      let data = {
        SearchStartTime: this.SearchStartTime,
        SearchEndTime: this.SearchEndTime,
      };
      this.$Axios({
        method: 'POST',
        url: url,
        data: data,
        success(res) {
          if (res.status == 200) {
            this.$parent.isShowMyLoading = false;
            res.data.data.forEach((items, index, arr) => {
              arr[index].isShowRightMenu = false;
              arr[index].isShowShotMoreMenu = false;
              arr[index].isShowSaleMenu = false;
              arr[index].isShowLastTimeMenu = false;
              arr[index].isShowCustomerMenu = false;
              if (arr[index].OrderState == null) {
                arr[index].OrderState = '0'
              }
            });
            this.sortFn(res.data);
            this.tableData = res.data.data;
            this.tableData2 = res.data;

            this.$parent.$refs.inputSelectSearch.searchNews();
            setTimeout(() => {
              // this.tableHeight = 'auto';
              this.getDomHeight();
              this.isFixedTotalTd();
            });
          }
        }
      })
    },

    //JSON数据按照订单时间进行排序
    sortFn(arr) {
      arr.data.sort(function (a, b) {
        return new Date(b.OrderDate).getTime() - new Date(a.OrderDate).getTime()
      });
    },

    //打开金额详情
    openPriceDetails(rowObj) {
      this.rowObj = rowObj;
      this.showPriceDetailsDiaLog = true;
    },
    //打开详情
    openOrderDetails(rowObj) {
      // this.$router.push({path: '/orderManage/orderManageDetails'})
      this.$parent.isShowOrderDetailsPage = true;
      this.$parent.orderDetailsRowObj = rowObj;
    },

    //打开人员安排界面
    openPersonDiaLog(rowObj) {
      // console.log(rowObj)
      this.rowObj = rowObj;
      this.showPersonManageDiaLog = true;
    },
    //关闭弹框
    closeDialog(type) {
      this.showPersonManageDiaLog = false;
      this.showPriceDetailsDiaLog = false;
      if (type == 'selectPerson') {
        this.showPersonManageDiaLog = true;
      }
    },
    //获取合计
    getSummaries(param) {
      // console.log(param)
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计：';
          return;
        }
        let values;
        if (index == 11) {
          values = data.map(item => Number(item.Amount));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += 0;
        }

        if (index == 12) {
          values = data.map(item => Number(item.Amount));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += 0;
        }

      });
      return sums;
    },
    //鼠标移出单元格隐藏右击菜单
    hideRightClickMenu(row, column, cell, event) {
      row.isShowRightMenu = false;
      row.isShowShotMoreMenu = false;
      row.isShowSaleMenu = false;
      row.isShowLastTimeMenu = false;
      row.isShowCustomerMenu = false;
    },

    //拍摄人员--更多图标点击和右击显示更多菜单
    showShotMoreMenu(e, rowObj, type) {
      this.rowObj = rowObj;
      rowObj.isShowShotMoreMenu = true;
      this.shotMenuData = rowObj.PSList;
      if (type == 'haveBtn') {
        this.moreShotMenuTop = $(e.target).offset().top + 25 + 'px';
        this.moreShotMenuLeft = $(e.target).offset().left - 8 + 'px';
      } else if (type == 'noBtn') {
        this.moreShotMenuTop = $(e.target).offset().top + 40 + 'px';
        this.moreShotMenuLeft = $(e.target).offset().left + 100 + 'px';
      }
    },

    //销售等人员--更多图标点击显示更多菜单
    showPersonMoreMenu(e, rowObj, type) {
      this.rowObj = rowObj;
      if (type == 'sale') {
        rowObj.isShowSaleMenu = true;
        this.menuData = rowObj.XSList;
      } else if (type == 'lastTime') {
        rowObj.isShowLastTimeMenu = true;
        this.menuData = rowObj.HQList;
      } else if (type == 'customer') {
        rowObj.isShowCustomerMenu = true;
        this.menuData = rowObj.KFList;
      }
      this.moreSmallMenuTop = $(e.target).offset().top + 25 + 'px';
      this.moreSmallMenuLeft = $(e.target).offset().left - 8 + 'px';
    },

    //销售等人员--单元格的右击显示菜单
    shotPersonRightClick(e, rowObj, type) {
      this.rowObj = rowObj;
      if (type == 'sale') {
        rowObj.isShowSaleMenu = true;
        this.menuData = rowObj.XSList;
      } else if (type == 'lastTime') {
        rowObj.isShowLastTimeMenu = true;
        this.menuData = rowObj.HQList;
      } else if (type == 'customer') {
        rowObj.isShowCustomerMenu = true;
        this.menuData = rowObj.KFList;
      }
      this.moreSmallMenuTop = $(e.target).offset().top + 40 + 'px';
      this.moreSmallMenuLeft = $(e.target).offset().left + 40 + 'px';
    },

    //状态--单元格的右击显示菜单
    stateRightClick(e, rowObj) {
      rowObj.isShowRightMenu = true;
      this.menuTop = $(e.target).offset().top + 40 + 'px';
      this.menuLeft = $(e.target).offset().left + 25 + 'px';
    },
    headerClassName({row, rowIndex}) {
      return 'orderTableHeaderStyle'
    },
    rowClassName({row, rowIndex}) {
      if (rowIndex % 2 != 0) {
        return 'orderTableRowStyle orderTableRow2nStyle'
      } else {
        return 'orderTableRowStyle orderTableRow1nStyle'
      }
    },
    loadResize() {
      let that = this;
      $(window).resize(() => {
        // console.log('进来')
        that.getDomHeight();
        that.isFixedTotalTd();
      })
    },
    //获取元素高度
    getDomHeight() {
      this.orderManageTableBoxHeight = $(this.$refs.orderManageTable).height();
      this.tableBoxHeight = $(this.$refs.tableBox).height();
    },
    //判断是否表格固定高度
    isFixedTotalTd() {
      // console.log(this.tableBoxHeight)
      if (this.tableBoxHeight >= this.orderManageTableBoxHeight) {
        this.tableHeight = this.tableBoxHeight;
      }
      this.orderManageTableOpacity = 1;
    },

    // 弹框初始化
    reloadDiaLog() {
      this.showPersonManageDiaLog = false;
      /*金额明细*/
      this.showPriceDetailsDiaLog = false;
    },
  };
  export default {
    name: "orderManageTable",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      this.reloadDiaLog();
      window.openPersonDiaLog = this.openPersonDiaLog;
      this.loadResize();
      this.$nextTick(() => {
        this.$parent.setOrderTime();
        this.$parent.isShowOrderDetailsPage = false;
      })
    },
    mounted() {
      // this.tableScrollListener();
    },

    watch: {
      $route(to, from) {
        console.log('变化了')
      }
    },

    filters: {
      changeOrderDateStr(val) {
        return val.replace(/-/g, '.');
      },
      filterOrderState(val) {
        if (val == null || val == 0) {
          return '待回馈订单'
        } else if (val == 1) {
          return '拍摄待交接'
        } else if (val == 2) {
          return '后期制作'
        } else if (val == 3) {
          return '待审核'
        } else if (val == 4) {
          return '退回'
        } else if (val == 5) {
          return '待移交客户'
        } else if (val == 6) {
          return '订单完成'
        }
      }
    },
    components: {
      personManageDiaLog: personManageDiaLog,
      priceDetailsDiaLog: priceDetailsDiaLog,
      'commonMenu-shot': {
        template: `<div class="moreList">
            <ul>
                <li v-for="(items,index) in shotMenuData" v-if="index>1">{{items.UserName}}</li>
                <li class="change" @click="changePerson($event)">修改</li>
            </ul>
         </div>`,
        props: ['shotMenuData', 'rowObj'],
        data() {
          return {
            changePerson(e) {
              window.openPersonDiaLog(this.rowObj);
            }
          }
        }
      },
      'commonMenu': {
        template: `<div class="moreList">
            <ul>
                <li v-for="(items,index) in menuData" v-if="index>0">{{items.UserName}}</li>
                <li class="change" @click="changePerson($event)">修改</li>
            </ul>
         </div>`,
        props: ['menuData', 'rowObj'],
        data() {
          return {}
        },
        methods: {
          changePerson(e) {
            window.openPersonDiaLog(this.rowObj);
          }
        }
      },
    }
  }
</script>

<style scoped>
  @import "../../../../static/css/orderTableStyle.css";

  #orderManageTable {
    height: 100%;
  }

  >>> .el-table--border::after, .el-table--group::after {
    height: auto;
    background: #DDD;
    bottom: 72px;
  }

  .tableBox {
    max-height: 100%;
  }

  >>> .moreList ul li {
    transition: all .2s;
    height: 28px;
    line-height: 28px;
  }

  >>> .moreList ul li.change {
    cursor: pointer;
  }

  >>> .moreList ul li.change:hover {
    text-decoration: underline;
    color: #5996F8;
  }

  /*======动画======*/
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .2s;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    height: 0;
  }

  /*人员安排弹框*/
  >>> .personManageDiaLog {
    width: 610px;
    height: 400px;
    padding: 30px;
  }

  >>> .personManageDiaLog .el-dialog__header .el-dialog__title {
    color: #9DB3D7;
    font-size: 17px;
  }

  .personManageBox .list {
    width: 49%;
    height: 46%;
    float: left;
  }

  .personManageBox .list:nth-of-type(2n) {
    float: right;
  }

  .personManageBox .list:nth-of-type(3), .personManageBox .list:nth-of-type(4) {
    margin-bottom: 0;
  }

  .personManageBox .list ul li {
    height: 48px;
    line-height: 48px;
    text-align: left;
    padding-left: 15px;
    color: #808080;
    font-size: 14px;
    transition: all .2s;
  }

  .personManageBox .list ul li:hover {
    background: #F5F5F5;
  }

  .personManageBox .list ul li:nth-of-type(1) {
    padding-left: 0;
  }

  .personManageBox .list ul li:nth-of-type(1):hover {
    background: transparent;
  }

  .personManageBox .list ul li .personBox {
    display: inline-block;
    overflow-x: auto;
    line-height: 20px;
    max-width: 140px;
    white-space: nowrap;
    vertical-align: -5px;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .personManageBox .list ul li span {
    color: #4C4C4C;
    font-weight: 700;
    position: relative;
    margin-right: 12px;
  }

  .personManageBox .list ul li span .close {
    position: absolute;
    right: -8px;
    top: -8px;
    visibility: hidden;
    transition: all .2s;
    cursor: pointer;
  }

  .personManageBox .list ul li span:hover .close {
    visibility: visible;
  }

  .personManageBox .list ul li span.add {
    vertical-align: -3px;
    cursor: pointer;
    transition: all .2s;
    width: 17px;
    height: 17px;
    display: inline-block;
    background: url("../../../../static/img/order/add0.png") no-repeat center center;
    visibility: hidden;
  }

  .personManageBox .list ul li span.add:hover {
    background: url("../../../../static/img/order/add1.png") no-repeat center center;
  }

  .personManageBox .list ul li:hover .add {
    visibility: visible;
  }


</style>
