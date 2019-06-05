<template>
  <div id="orderManageTable" ref="orderManageTable" :style="{opacity:orderManageTableOpacity}">

    <!--弹框-->
    <personManageDiaLog :rowObj="rowObj" :showPersonManageDiaLog="showPersonManageDiaLog"></personManageDiaLog>

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
              <span v-if="items.id==3">{{scope.row.hotel}}</span>
              <span v-if="items.id==4">{{scope.row.hunQ}}</span>
              <span v-if="items.id==5">{{scope.row.keHu}}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==1"
            width="80"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==1&&scope.row.isHeJi==undefined"><a href="javascript:void(0)">详情</a></span>
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
              <span>{{scope.row.date}}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            v-if="items.id==7"
            sortable="custom"
            width='100'
            align="center">
            <template slot-scope=scope>
              <span>{{scope.row.zt}}</span>
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
              <template v-for="(item2,index) in scope.row.ps">
                <span class="morePS" v-if="index<=1">{{item2}}<i>、</i></span>
              </template>
              <span v-if="scope.row.ps.length==0"><a href="javascript:void(0)" class="commonColor"
                                                     @click="openPersonDiaLog(scope.row)">添加</a></span>
              <div class="moreImg" @click="showShotMoreMenu($event,scope.row,'haveBtn')"
                   v-if="items.id==9&&scope.row.ps.length>2">
                <transition name="slide-fade">
                  <commonMenu-shot :rowObj="rowObj" v-show="scope.row.isShowShotMoreMenu" :shotMenuData="shotMenuData"
                                   :style="{top:moreShotMenuTop,left:moreShotMenuLeft}"></commonMenu-shot>
                </transition>
              </div>
              <div class="rightClickShadow" v-if="items.id==9&&scope.row.ps.length<=2&&scope.row.ps.length!=0"
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
                <template v-for="(items,index) in scope.row.xs">
                  <span v-if="index<1">{{items}}</span>
                </template>
                <span v-if="scope.row.xs.length==0"><a href="javascript:void(0)" class="commonColor"
                                                       @click="openPersonDiaLog(scope.row)">添加</a></span>
              </span>
              <span v-if="items.id==10">
                 <template v-for="(items,index) in scope.row.hq">
                  <span v-if="index<1">{{items}}</span>
                </template>
                <span v-if="scope.row.hq.length==0"><a href="javascript:void(0)" class="commonColor"
                                                       @click="openPersonDiaLog(scope.row)">添加</a></span>
              </span>
              <span v-if="items.id==11">
              <template v-for="(items,index) in scope.row.kf">
                  <span v-if="index<1">{{items}}</span>
                </template>
                <span v-if="scope.row.kf.length==0"><a href="javascript:void(0)" class="commonColor"
                                                       @click="openPersonDiaLog(scope.row)">添加</a></span>
              </span>
              <div class="rightClickShadow" v-if="items.id==8&&scope.row.xs.length==1"
                   @contextmenu.prevent="shotPersonRightClick($event,scope.row,'sale')">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowSaleMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="rightClickShadow" v-if="items.id==10&&scope.row.hq.length==1"
                   @contextmenu.prevent="shotPersonRightClick($event,scope.row,'lastTime')">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowLastTimeMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="rightClickShadow" v-if="items.id==11&&scope.row.kf.length==1"
                   @contextmenu.prevent="shotPersonRightClick($event,scope.row,'customer')">
                <transition name="slide-fade"></transition>
                <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowCustomerMenu"
                            :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
              </div>

              <div class="moreImg" @click="showPersonMoreMenu($event,scope.row,'sale')"
                   v-if="items.id==8&&scope.row.xs.length>1">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuType="menuType" :menuData="menuData"
                              v-show="scope.row.isShowSaleMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="moreImg" @click="showPersonMoreMenu($event,scope.row,'lastTime')"
                   v-if="items.id==10&&scope.row.hq.length>1">
                <transition name="slide-fade">
                  <commonMenu :rowObj="rowObj" :menuData="menuData" v-show="scope.row.isShowLastTimeMenu"
                              :style="{top:moreSmallMenuTop,left:moreSmallMenuLeft}"></commonMenu>
                </transition>
              </div>
              <div class="moreImg" @click="showPersonMoreMenu($event,scope.row,'customer')"
                   v-if="items.id==11&&scope.row.kf.length>1">
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
              <span v-if="items.id==6">{{scope.row.xm}}</span>
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
              <span v-if="items.id==12">{{scope.row.price}}</span>
              <span v-if="items.id==13">{{scope.row.ht}}
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

  /*数据*/
  let dataObj = {
    //弹框数据
    showPersonManageDiaLog: false,

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
    tableData: [
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店4444444444',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: ['小花'],
        ps: ['小巫师', '周杰伦', '哈哈哈'],
        hq: ['小花', '哈哈'],
        kf: ['小花'],
        price: '100055',
        ht: '1005555',
        isCQ: true,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
        id: 1,
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店5555555555',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: ['小花', '小伙子'],
        ps: ['小巫师', '周杰伦'],
        hq: ['小花', '小伙子'],
        kf: ['小花', '小伙子'],
        price: '800',
        ht: '1000',
        isCQ: false,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店6666666666',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: [],
        ps: ['小巫师', '周杰伦'],
        hq: [],
        kf: [],
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: ['小花', '周杰伦'],
        ps: [],
        hq: ['小花'],
        kf: ['小花'],
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: ['小花'],
        ps: ['小巫师', '周杰伦'],
        hq: ['小花'],
        kf: ['小花'],
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: ['小花'],
        ps: ['小巫师', '周杰伦'],
        hq: ['小花'],
        kf: ['小花'],
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: ['小花'],
        ps: ['小巫师', '周杰伦', '呵呵呵'],
        hq: ['小花'],
        kf: ['小花'],
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: ['小花'],
        ps: ['小巫师', '周杰伦'],
        hq: ['小花'],
        kf: ['小花'],
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowShotMoreMenu: false,//拍摄
        isShowSaleMenu: false,//销售
        isShowLastTimeMenu: false,//后期
        isShowCustomerMenu: false,//客服
      },
    ]
  };
  /*方法*/
  let myMethods = {
    //打开人员安排弹框
    openPersonDiaLog(rowObj) {
      console.log(rowObj)
      this.rowObj = rowObj;
      this.showPersonManageDiaLog = true;
    },
    //关闭弹框
    closeDialog() {
      this.showPersonManageDiaLog = false;
    },
    //获取合计
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计：';
          return;
        }
        let values;
        if (index == 11) {
          values = data.map(item => Number(item.price));
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
          values = data.map(item => Number(item.ht));
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
      this.shotMenuData = rowObj.ps;
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
        this.menuData = rowObj.xs;
      } else if (type == 'lastTime') {
        rowObj.isShowLastTimeMenu = true;
        this.menuData = rowObj.hq;
      } else if (type == 'customer') {
        rowObj.isShowCustomerMenu = true;
        this.menuData = rowObj.kf;
      }
      this.moreSmallMenuTop = $(e.target).offset().top + 25 + 'px';
      this.moreSmallMenuLeft = $(e.target).offset().left - 8 + 'px';
    },

    //销售等人员--单元格的右击显示菜单
    shotPersonRightClick(e, rowObj, type) {
      this.rowObj = rowObj;
      if (type == 'sale') {
        rowObj.isShowSaleMenu = true;
        this.menuData = rowObj.xs;
      } else if (type == 'lastTime') {
        rowObj.isShowLastTimeMenu = true;
        this.menuData = rowObj.hq;
      } else if (type == 'customer') {
        rowObj.isShowCustomerMenu = true;
        this.menuData = rowObj.kf;
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
        console.log('进来')
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
      if (this.tableBoxHeight >= this.orderManageTableBoxHeight) {
        this.tableHeight = this.tableBoxHeight;
      }
      this.orderManageTableOpacity = 1;
    },
  };
  export default {
    name: "orderManageTable",
    data() {
      return dataObj;
    },
    methods: myMethods,
    created() {
      window.openPersonDiaLog = this.openPersonDiaLog;
      this.loadResize();
      this.$nextTick(() => {
        setTimeout(() => {
          this.getDomHeight();
          this.isFixedTotalTd();
        }, 1);
      })
    },
    mounted() {
    },
    components: {
      'commonMenu-shot': {
        template: `<div class="moreList">
            <ul>
                <li v-for="(items,index) in shotMenuData" v-if="index>1">{{items}}</li>
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
                <li v-for="(items,index) in menuData" v-if="index>0">{{items}}</li>
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


</style>
