<template>
  <div id="orderManageTable" ref="orderManageTable" :style="{opacity:orderManageTableOpacity}">
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
            v-if="items.id!=1&&items.id!=2&&items.id!=6&&items.id!=7&&items.id!=9&&items.id!=12&&items.id!=13"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==3">{{scope.row.hotel}}</span>
              <span v-if="items.id==4">{{scope.row.hunQ}}</span>
              <span v-if="items.id==5">{{scope.row.keHu}}</span>
              <span v-if="items.id==8">{{scope.row.xs}}</span>
              <span v-if="items.id==10">{{scope.row.hq}}</span>
              <span v-if="items.id==11">{{scope.row.kf}}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==1"
            width="80"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==1&&scope.row.isHeJi==undefined"><a href="#">详情</a></span>
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
              <div class="rightClickShadow" @contextmenu.prevent="rightClick($event,scope.row)"></div>
              <div class="rightClickContent" :style="{top:menuTop,left:menuLeft}" v-show="scope.row.isShowRightMenu">
                <ul>
                  <li>回馈表(已确认)</li>
                  <li>拍摄交接单(未填)</li>
                  <li>设备清单(未领用)</li>
                </ul>
              </div>
            </template>
          </el-table-column>

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
              <div class="moreImg" @click="showMoreMenu($event,scope.row)" v-if="scope.row.ps.length>2">
                <div class="moreList" v-show="scope.row.isShowMoreMenu" :style="{top:moreListTop,left:moreListLeft}"
                     v-if="scope.row.ps.length>2">
                  <ul>
                    <template v-for="(item2,index) in scope.row.ps">
                      <li v-if="index>1" v-text="item2"></li>
                    </template>
                    <li>修改</li>
                  </ul>
                </div>
              </div>

            </template>
          </el-table-column>

          <el-table-column
            :label="items.name"
            show-overflow-tooltip
            v-if="items.id==6||items.id==12||items.id==13"
            sortable="custom"
            align="center">
            <template slot-scope=scope>
              <span v-if="items.id==6">{{scope.row.xm}}</span>
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
    //表格的最外层高度
    orderManageTableBoxHeight: 0,
    tableBoxHeight: 0,
    tableHeight: 'auto',
    orderManageTableOpacity: 0,
    menuTop: 0,
    menuLeft: 0,
    moreListTop: 0,
    moreListLeft: 0,
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
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦', '哈哈哈'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowMoreMenu: false,
        id: 1,
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '800',
        ht: '1000',
        isCQ: false,
        isShowRightMenu: false,
        isShowMoreMenu: false,
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowMoreMenu: false,
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowMoreMenu: false,
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowMoreMenu: false,
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowMoreMenu: false,
      }, {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowMoreMenu: false,
      },
      {
        date: '2016.05.02',
        hotel: '（成都）丽思卡尔顿酒店',
        hunQ: '喜来婚礼',
        keHu: '陈建州&范玮琪',
        xm: '高清双机(含快剪)',
        zt: '待安排拍摄',
        xs: '小李',
        ps: ['小巫师', '周杰伦'],
        hq: '小娃',
        kf: '嘻嘻',
        price: '1000',
        ht: '1000',
        isCQ: true,
        isShowRightMenu: false,
        isShowMoreMenu: false,
      },
      // {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // }, {
      //   date: '2016.05.02',
      //   hotel: '（成都）丽思卡尔顿酒店',
      //   hunQ: '喜来婚礼',
      //   keHu: '陈建州&范玮琪',
      //   xm: '高清双机(含快剪)',
      //   zt: '待安排拍摄',
      //   xs: '小李',
      //   ps: '小巫师',
      //   hq: '小娃',
      //   kf: '嘻嘻',
      //   price: '1000',
      //   ht: '1000',
      // },
    ]
  };
  /*方法*/
  let myMethods = {
    //显示更多菜单
    showMoreMenu(e, rowObj) {
      rowObj.isShowMoreMenu = true;
      this.moreListTop = $(e.target).offset().top + 25 + 'px';
      this.moreListLeft = $(e.target).offset().left - 8 + 'px';
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
    //隐藏右击菜单
    hideRightClickMenu(row, column, cell, event) {
      row.isShowRightMenu = false;
      row.isShowMoreMenu = false;
    },
    //右击事件
    rightClick(e, rowObj) {
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
      this.loadResize();
      this.$nextTick(() => {
        setTimeout(() => {
          this.getDomHeight();
          this.isFixedTotalTd();
        }, 1);
      })
    },
    mounted() {
    }
  }
</script>

<style scoped>
  #orderManageTable {
    height: 100%;
  }

  .tableBox {
    max-height: 100%;
  }

  >>> .el-table__body-wrapper::-webkit-scrollbar {
    width: 3px;
    height: 5px;
    background: #E7EEF9;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
  }

  >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #CED8EA;
    width: 3px;
    height: 5px;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
  }

  >>> .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #5996F8;
  }

  >>> .el-table .descending .sort-caret.descending {
    border-top-color: #5996F8;
  }

  >>> .el-table::before {
    display: none;
  }

  >>> .el-table--border::after, .el-table--group::after {
    height: auto;
    background: #DDD;
    bottom: 54px;
  }

  >>> .orderTableHeaderStyle th {
    background: #E5E5E5;
    height: 45px;
    padding: 0;
    line-height: 45px;
    color: #808080;
    font-size: 14px;
    border-bottom: 0;
    border-color: #DDD;
  }

  >>> .orderTableHeaderStyle th:nth-last-of-type(2) {
    border: 0;
  }

  >>> .orderTableHeaderStyle th:first-of-type {
    border-left: 1px solid #DDD;
  }

  >>> .orderTableRowStyle td {
    padding: 0;
    height: 45px;
    border-top: 0;
    border-bottom: 0;
    border-color: #DDD;
    transition: all .2s;
  }

  >>> .orderTableRowStyle td:first-of-type {
    border-left: 1px solid #DDD;
  }

  >>> .orderTableRowStyle td:first-of-type a {
    color: #5996F8;
  }

  >>> .orderTableRowStyle td .fillSpan {
    position: absolute;
    height: 100%;
    width: 17px;
    top: 0;
    right: -17px;
  }

  >>> .orderTableRow1nStyle td {
    background: #F6F6F6;
  }

  >>> .orderTableRow1nStyle td .fillSpan {
    background: #F6F6F6;
  }

  >>> .orderTableRow2nStyle td {
    background: #F0F0F0;
  }

  >>> .orderTableRow2nStyle td .fillSpan {
    background: #F0F0F0;
  }

  >>> .orderTableRowStyle:hover td {
    background: #F0F4FA !important;
    color: #5996F8;
  }

  >>> .orderTableRowStyle:hover td .fillSpan {
    background: #F0F4FA !important;
  }

  >>> .el-table__footer-wrapper .has-gutter td {
    background: #F6F6F6;
    border-color: #F6F6F6;
    color: #FF0000;
    font-weight: 700;
    border-top: 1px solid #DDD;
  }

  >>> .el-table__footer-wrapper .has-gutter td:first-of-type {
    font-weight: 400;
  }

  >>> .el-table__footer-wrapper .has-gutter th.gutter {
    background: #F6F6F6;
    border: 0;
  }

  >>> .el-table .cell.el-tooltip {
    padding: 0 4px;
  }

  .rightClickShadow {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  .rightClickContent {
    position: fixed;
    z-index: 999;
    background: #fff;
    width: 120px;
    border: 1px solid rgba(220, 230, 245, 1);
    border-radius: 5px;
    padding: 10px 0;
  }

  .rightClickContent::before, .moreList::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -5px;
    left: 17px;
    border: 1px solid rgba(220, 230, 245, 1);
    border-bottom: 0;
    border-right: 0;
  }

  .rightClickContent li {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #808080;
    cursor: pointer;
    transition: all .2s;
  }

  .rightClickContent li:hover {
    color: #5996F8;
    background: #EFF3F9;
  }

  .morePS:nth-of-type(2) i {
    display: none;
  }

  .moreImg {
    display: inline-block;
    width: 30px;
    height: 18px;
    vertical-align: -4px;
    background: url("../../../../static/img/order/more1.png") no-repeat center center;
    transition: all .2s;
    cursor: pointer;
  }

  .moreImg:hover {
    background: url("../../../../static/img/order/more2.png") no-repeat center center;
  }

  .moreList {
    position: fixed;
    width: 58px;
    z-index: 999;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(220, 230, 245, 1);
    border-radius: 5px;
    font-size: 12px;
    color: #808080;
    padding: 6px 0;
  }

  .moreList li {
    height: 24px;
    line-height: 24px;
  }

  .moreList li:last-of-type {
    cursor: pointer;
    transition: all .2s;
  }

  .moreList li:last-of-type:hover {
    color: #5996F8;
    text-decoration: underline;
  }
</style>
